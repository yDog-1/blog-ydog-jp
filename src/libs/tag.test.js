import { describe, expect, mock, test } from "bun:test";

mock.module("virtual:github-token", () => ({ githubToken: () => "" }));
const { decodeTag, encodeTag, getTagColors } = await import("./tag");

const tree = (entries) =>
  Promise.resolve({ repository: { object: { __typename: "Tree", entries } } });
const blob = (name, text) => ({ name, object: { __typename: "Blob", text } });

describe("tag URLs", () => {
  test("round trips a dotted name and decodes escaped characters", () => {
    expect(encodeTag("Node.js")).toBe("Node-js");
    expect(decodeTag("Node-js")).toBe("Node.js");
    expect(encodeTag("Bun")).toBe("Bun");
    expect(decodeTag("hello%20world")).toBe("hello world");
  });
});

describe("getTagColors", () => {
  test("maps named colors, default backgrounds, and explicit text colors", async () => {
    const colors = blob(
      "tagColor.yaml",
      "---\nlight:\n  bg: '#ffffff'\ndark:\n  bg: '#000000'\nplain:\n  bg: default\ncustom:\n  bg: '#ffffff'\n  text: '#abcdef'\n---\n",
    );
    expect(
      await getTagColors(tree([blob("other.md", colors.object.text), colors])),
    ).toEqual([
      { name: "light", bg: "#ffffff", textColor: "#000000" },
      { name: "dark", bg: "#000000", textColor: "#FFFFFF" },
      { name: "plain", bg: "#4D4D4D", textColor: "#FFFFFF" },
      { name: "custom", bg: "#ffffff", textColor: "#abcdef" },
    ]);
  });

  test("returns an empty list when the color file is absent or not a populated blob", async () => {
    expect(await getTagColors(tree([]))).toEqual([]);
    expect(
      await getTagColors(
        tree([{ name: "tagColor.yaml", object: { __typename: "Tree" } }]),
      ),
    ).toEqual([]);
    expect(await getTagColors(tree([blob("tagColor.yaml", "")]))).toEqual([]);
  });

  test("returns undefined for a non-tree and propagates source failures", async () => {
    expect(
      await getTagColors(Promise.resolve({ repository: null })),
    ).toBeUndefined();
    const error = new Error("colors unavailable");
    await expect(getTagColors(Promise.reject(error))).rejects.toBe(error);
  });
});
