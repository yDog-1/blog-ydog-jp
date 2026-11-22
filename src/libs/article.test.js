import { describe, expect, mock, test } from "bun:test";

mock.module("virtual:github-token", () => ({ githubToken: () => "" }));
const { getArticles, getUnpublishedArticleByTitle } = await import("./article");

const blob = (name, text) => ({ name, object: { __typename: "Blob", text } });
const tree = (entries) =>
  Promise.resolve({ repository: { object: { __typename: "Tree", entries } } });
const markdown = (date, tags = "[Bun, TypeScript]") =>
  `---\npublished_at: ${date}\ntags: ${tags}\ndescription: An article\n---\n# Content\n`;

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

describe("getUnpublishedArticleByTitle", () => {
  test("returns the matching future article with parsed content", async () => {
    const data = tree([blob("draft.md", markdown("2999-01-01", "[Draft]"))]);
    expect(await getUnpublishedArticleByTitle("draft", data)).toEqual({
      title: "draft",
      publishedAt: new Date("2999-01-01"),
      tags: ["Draft"],
      description: "An article",
      body: "# Content\n",
    });
  });

  test("excludes published, missing, non-blob, empty, and incomplete entries", async () => {
    const data = tree([
      blob("published.md", markdown("2020-01-01")),
      { name: "folder.md", object: { __typename: "Tree" } },
      blob("empty.md", ""),
      blob("incomplete.md", "---\ntags: []\n---\n"),
    ]);
    for (const title of [
      "published",
      "missing",
      "folder",
      "empty",
      "incomplete",
    ]) {
      expect(await getUnpublishedArticleByTitle(title, data)).toBeUndefined();
    }
    expect(
      await getUnpublishedArticleByTitle(
        "draft",
        Promise.resolve({ repository: null }),
      ),
    ).toBeUndefined();
  });

  test("propagates a data source failure", async () => {
    const error = new Error("preview unavailable");
    await expect(
      getUnpublishedArticleByTitle("draft", Promise.reject(error)),
    ).rejects.toBe(error);
  });
});
