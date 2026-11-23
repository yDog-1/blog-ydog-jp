import matter from "gray-matter";
import { getArticleData, isBlob, isTree } from "@/libs/gitHub";
import type { Article, ArticleFrontmatter, ArticleInput } from "@/types/Article";

export async function getArticles(dataPromise = getArticleData()) {
  const data = await dataPromise;
  if (!isTree(data.repository?.object)) return;

  return data.repository.object.entries
    ?.flatMap((entry) => {
      if (!entry.name.endsWith(".md") || !isBlob(entry.object) || !entry.object.text) return [];
      const article = parseToArticle({ name: entry.name, text: entry.object.text });
      return article && article.published ? [article.article] : [];
    })
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

function parseToArticle(input: ArticleInput): { article: Article; published: boolean } | undefined {
  const { content, data } = matter(input.text);
  if (!isValidArticleData(data)) return;
  const publishedAt = data.published_at ? new Date(data.published_at) : new Date();
  if (Number.isNaN(publishedAt.getTime())) return;
  return {
    article: {
      title: data.title,
      publishedAt,
      tags: data.topics,
      description: data.description ?? "",
      body: content,
    },
    published: data.published && publishedAt <= new Date(),
  };
}

function isValidArticleData(data: unknown): data is ArticleFrontmatter {
  if (typeof data !== "object" || data === null) return false;
  if (!("title" in data && "topics" in data && "published" in data)) return false;
  return typeof data.title === "string" &&
    Array.isArray(data.topics) && data.topics.every((topic: unknown) => typeof topic === "string") &&
    typeof data.published === "boolean" &&
    (!("published_at" in data) || typeof data.published_at === "string" || data.published_at instanceof Date) &&
    (!("description" in data) || typeof data.description === "string");
}
