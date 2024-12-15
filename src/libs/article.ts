import { NewGitHubSdk, articleVariables, isBlob, isTree } from "@/libs/gitHub";
import type {
  Article,
  ArticleFrontmatter,
  ArticleInput,
} from "@/types/Article";
import matter from "gray-matter";

export const articles = await getArticles();

async function getArticles() {
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
}

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
    publishedAt: published_at,
    tags: data.tags,
    description: data.description,
    body: content,
  };
}

function isValidArticleData(data: unknown): data is ArticleFrontmatter {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  if (
    !("published_at" in data && "tags" in data && "description" in data) ||
    data.published_at === null
  ) {
    return false;
  }
  return (
    typeof (
      data.published_at === "string" || data.published_at instanceof Date
    ) &&
    Array.isArray(data.tags) &&
    typeof data.description === "string"
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
