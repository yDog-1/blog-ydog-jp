import { NewGitHubSdk, articleVariables, isBlob, isTree } from "@/libs/gitHub";
import type {
  Article,
  ArticleFrontmatter,
  ArticleInput,
} from "@/types/Article";
import matter from "gray-matter";

export const getArticles = async () => {
  const sdk = NewGitHubSdk();
  const q = await sdk.listArticles(articleVariables);

  if (!isTree(q.repository?.object)) {
    return;
  }

  return q.repository.object.entries?.map((c) => {
    if (!isBlob(c.object) || !c.object.text) {
      return;
    }

    return parseToArticle({ name: c.name, text: c.object.text });
  });
};

function parseToArticle(input: ArticleInput): Article | undefined {
  const { content, data } = matter(input.text);

  if (!isValidArticleData(data)) {
    return undefined;
  }

  const published_at = new Date(data.published_at);
  if (!isPublished(published_at) && !isValidDate(published_at)) {
    return undefined;
  }

  const title = removeExtension(input.name);

  return {
    title,
    published_at,
    tags: data.tags,
    description: data.description,
    body: content,
  };
}

function isValidArticleData(data: unknown): data is ArticleFrontmatter {
  const d = data as ArticleFrontmatter;
  return (
    typeof d.published_at === "string" &&
    Array.isArray(d.tags) &&
    typeof d.description === "string"
  );
}

function isValidDate(date: Date): boolean {
  return Number.isNaN(date.getTime());
}

function isPublished(published_at: Date): boolean {
  return published_at <= new Date();
}

function removeExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, "");
}
