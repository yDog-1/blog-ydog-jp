import { afterAll, afterEach, expect, mock, test } from "bun:test";
import { GraphQLClient } from "graphql-request";

const originalToken = process.env.GITHUB_TOKEN;
process.env.GITHUB_TOKEN = "test-token";

const { getArticles } = await import("./article");
const { decodeTag, encodeTag, getTagColors } = await import("./tag");
const { articleVariables, getArticleData, isBlob, isTree, NewGitHubSdk } =
  await import("./gitHub");
const originalFetch = globalThis.fetch;
const denyNetwork = () => {
  throw new Error("unexpected network request");
};
globalThis.fetch = denyNetwork;

afterEach(() => {
  globalThis.fetch = denyNetwork;
  process.env.GITHUB_TOKEN = "test-token";
});
afterAll(() => {
  globalThis.fetch = originalFetch;
  if (originalToken === undefined) delete process.env.GITHUB_TOKEN;
  else process.env.GITHUB_TOKEN = originalToken;
});

const article = (date, description = "description") =>
  `---\ntitle: TITLE_PLACEHOLDER\npublished: true\npublished_at: ${date}\ntopics: [TypeScript]\ndescription: ${description}\n---\nBody`;
const blob = (name, text) => ({ name, object: { __typename: "Blob", text: text.replace("TITLE_PLACEHOLDER", name.replace(/\.md$/, "")) } });

function serve(entries) {
  const requests = [];
  globalThis.fetch = async (url, options) => {
    requests.push({
      url: String(url),
      headers: new Headers(options.headers),
      body: JSON.parse(options.body),
    });
    return Response.json({
      data: { repository: { object: { __typename: "Tree", entries } } },
    });
  };
  return requests;
}

test("article and tag consumers share the GitHub response and preserve their output", async () => {
  const requests = serve([
    blob("old.md", article("2020-01-01")),
    blob("new.md", article("2022-01-01", "newest")),
    blob("future.md", article("2999-01-01")),
    blob("invalid.md", "---\ntags: []\n---\ninvalid"),
    blob("empty.md", ""),
    { name: "directory", object: { __typename: "Tree" } },
    blob(
      "tagColor.yaml",
      "---\nTypeScript:\n  bg: '#ffffff'\nplain:\n  bg: default\ncustom:\n  bg: '#000000'\n  text: '#abcdef'\n---\n",
    ),
  ]);
  const data = getArticleData();
  const [articles, colors] = await Promise.all([
    getArticles(data),
    getTagColors(data),
  ]);
  expect(articles.map(({ title }) => title)).toEqual(["new", "old"]);
  expect(articles[0]).toEqual({
    title: "new",
    publishedAt: new Date("2022-01-01"),
    tags: ["TypeScript"],
    description: "newest",
    body: "Body",
  });
  expect(colors).toEqual([
    { name: "TypeScript", bg: "#ffffff", textColor: "#000000" },
    { name: "plain", bg: "#4D4D4D", textColor: "#FFFFFF" },
    { name: "custom", bg: "#000000", textColor: "#abcdef" },
  ]);
  expect(requests).toHaveLength(1);
  expect(requests[0].url).toBe("https://api.github.com/graphql");
  expect(requests[0].headers.get("authorization")).toBe("Bearer test-token");
  expect(requests[0].body.variables).toEqual({
    owner: "yDog-1",
    name: "articles",
  });
});

test("missing token throws without making a request", () => {
  const requests = serve([]);
  process.env.GITHUB_TOKEN = "";
  expect(() => getArticleData()).toThrow("GITHUB_TOKEN is not set");
  expect(requests).toHaveLength(0);
});

test("SDK uses the injected client and resolves the token per request", async () => {
  let currentToken = "first";
  const headers = [];
  const client = new GraphQLClient("https://example.invalid/graphql", {
    fetch: async (_url, options) => {
      headers.push(new Headers(options.headers).get("authorization"));
      return Response.json({ data: { repository: null } });
    },
  });
  const sdk = NewGitHubSdk(client, () => currentToken);
  await sdk.listArticles(articleVariables);
  currentToken = "second";
  await sdk.listArticles(articleVariables);
  expect(headers).toEqual(["Bearer first", "Bearer second"]);
});

test("article and tag data handle non-trees, missing entries and missing tag colors", async () => {
  const nonTree = Promise.resolve({
    repository: { object: { __typename: "Blob", text: "" } },
  });
  expect(await getArticles(nonTree)).toBeUndefined();
  expect(await getTagColors(nonTree)).toBeUndefined();
  const noEntries = Promise.resolve({
    repository: { object: { __typename: "Tree", entries: null } },
  });
  expect(await getArticles(noEntries)).toBeUndefined();
  expect(await getTagColors(noEntries)).toEqual([]);
});

test("articles skip invalid dates and missing frontmatter and propagate failures", async () => {
  const data = Promise.resolve({
    repository: {
      object: {
        __typename: "Tree",
        entries: [
          blob("bad-date.md", article("not-a-date")),
          blob(
            "missing.md",
            "---\npublished_at: 2020-01-01\ntags: []\n---\nbody",
          ),
          blob("valid.md", article("2020-01-01")),
        ],
      },
    },
  });
  expect((await getArticles(data)).map(({ title }) => title)).toEqual([
    "valid",
  ]);
  await expect(
    getArticles(Promise.reject(new Error("unavailable"))),
  ).rejects.toThrow("unavailable");
  await expect(
    getTagColors(Promise.reject(new Error("unavailable"))),
  ).rejects.toThrow("unavailable");
});

test("tag encoding and GitHub object guards retain their edge behavior", () => {
  expect(encodeTag("a.b.c")).toBe("a-b.c");
  expect(decodeTag("a-b-c")).toBe("a.b-c");
  expect(decodeTag("hello%20world")).toBe("hello world");
  expect(isTree({ __typename: "Tree" })).toBe(true);
  expect(isTree(null)).toBe(false);
  expect(isBlob({ __typename: "Blob" })).toBe(true);
  expect(isBlob(undefined)).toBe(false);
});
