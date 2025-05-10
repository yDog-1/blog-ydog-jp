import type { TagColor } from "@/types/Color";
import matter from "gray-matter";
import { getTextColor } from "./color";
import { NewGitHubSdk, articleVariables, isBlob, isTree } from "./gitHub";

// . が使用できないため、- と入力したものを . に変換する
export const decodeTag = (tagName: string) => {
  if (tagName.includes("-")) {
    return tagName.replace("-", ".");
  }
  return decodeURI(tagName);
};

export const encodeTag = (tagName: string) => {
  if (tagName.includes(".")) {
    return tagName.replace(".", "-");
  }
  return tagName;
};

export async function getTagColors(): Promise<TagColor[] | undefined> {
  const sdk = NewGitHubSdk();
  const data = await sdk.listArticles(articleVariables);

  if (!isTree(data.repository?.object)) {
    return;
  }

  const tagColorFile = data.repository.object.entries?.find((c) => {
    return isBlob(c.object) && c.object.text && c.name === "tagColor.md";
  });

  if (
    !tagColorFile?.object ||
    !isBlob(tagColorFile.object) ||
    !tagColorFile.object.text
  ) {
    return [];
  }
  const { data: frontmatter } = matter(tagColorFile.object.text);

  return Object.entries(frontmatter).map(([name, value]) => {
    value as { bg: string };
    const bg =
      value.bg === "default"
        ? defaultTagColor // default ならグレー
        : value.bg;

    return {
      name,
      bg,
      textColor: value.text ?? getTextColor(value.bg),
    };
  });
}

export const defaultTagColor = "#4D4D4D";

