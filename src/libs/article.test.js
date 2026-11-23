import { describe, expect, test } from "bun:test";

const { getArticles } = await import("./article");

const blob = (name, text) => ({ name, object: { __typename: "Blob", text: text.replace("TITLE_PLACEHOLDER", name.replace(/\.md$/, "")) } });
const tree = (entries) =>
  Promise.resolve({ repository: { object: { __typename: "Tree", entries } } });
const markdown = (date, tags = "[Bun, TypeScript]") =>
  `---\ntitle: TITLE_PLACEHOLDER\npublished: true\npublished_at: ${date}\ntopics: ${tags}\ndescription: An article\n---\n# Content\n`;

describe("getArticles", () => {
  test("parses published articles and orders them newest first", async () => {
    const data = tree([
      blob("older.post.md", markdown("2020-01-01")),
      blob("future.md", markdown("2999-01-01")),
      blob("newer.md", markdown("2023-03-04")),
      blob("empty.md", ""),
      { name: "folder", object: { __typename: "Tree" } },
      blob("missing.md", "---\ntags: []\ndescription: missing date\n---\n"),
      blob("bad-date.md", markdown("not-a-date")),
    ]);

    expect(await getArticles(data)).toEqual([
      {
        title: "newer",
        publishedAt: new Date("2023-03-04"),
        tags: ["Bun", "TypeScript"],
        description: "An article",
        body: "# Content\n",
      },
      {
        title: "older.post",
        publishedAt: new Date("2020-01-01"),
        tags: ["Bun", "TypeScript"],
        description: "An article",
        body: "# Content\n",
      },
    ]);
  });

  test("uses Zenn titles and topics, and excludes drafts even with a past date", async () => {
    const data = tree([
      blob("english-slug.md", "---\ntitle: 日本語の題名\nemoji: 🐱\ntype: tech\ntopics: [Go]\npublished: true\npublished_at: 2020-01-01\n---\n本文"),
      blob("unpublished-draft.md", "---\ntitle: 下書き\ntopics: []\npublished: false\npublished_at: 2020-01-01\n---\n下書き本文"),
    ]);
    const articles = await getArticles(data);
    expect(articles.map(({ title }) => title)).toEqual(["日本語の題名"]);
    expect(articles[0].tags).toEqual(["Go"]);
  });

  test("includes only selected drafts in a preview", async () => {
    const old = process.env.ARTICLES_PREVIEW_FILES;
    process.env.ARTICLES_PREVIEW_FILES = "selected.md";
    try {
      const draft = markdown("2020-01-01").replace("published: true", "published: false");
      const articles = await getArticles(tree([blob("selected.md", draft), blob("other.md", draft)]));
      expect(articles.map(({ title }) => title)).toEqual(["selected"]);
    } finally {
      if (old === undefined) delete process.env.ARTICLES_PREVIEW_FILES;
      else process.env.ARTICLES_PREVIEW_FILES = old;
    }
  });

  test("returns no articles for an empty tree and undefined for a non-tree", async () => {
    expect(await getArticles(tree([]))).toEqual([]);
    expect(
      await getArticles(Promise.resolve({ repository: null })),
    ).toBeUndefined();
  });

  test("propagates a data source failure", async () => {
    const error = new Error("source unavailable");
    await expect(getArticles(Promise.reject(error))).rejects.toBe(error);
  });
});
