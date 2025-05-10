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
  const data = await sdk.listArticles(articleVariables);

  if (!isTree(data.repository?.object)) {
    return;
  }

  const articles = data.repository.object.entries?.map((c) => {
    if (!isBlob(c.object) || !c.object.text) {
      return;
    }

    return parseToArticle({ name: c.name, text: c.object.text });
  });
  return articles?.sort((a, b) => {
    if (!a || !b) return 0;
    return b.publishedAt.getTime() - a.publishedAt.getTime();
  });
}

/**
 * タイトルから未公開の記事を取得する
 * @param githubToken GitHubのアクセストークン
 * @param title 記事のタイトル（拡張子なし）
 * @returns 記事データ、または未公開や存在しない場合はundefined
 */
export async function getUnpublishedArticleByTitle(
  // githubToken: string,
  title: string,
): Promise<Article | undefined> {
  console.log("getUnpublishedArticleByTitle: ", title);
  const sdk = NewGitHubSdk();
  const data = await sdk.listArticles(articleVariables);

  if (!isTree(data.repository?.object)) {
    return undefined;
  }

  // ファイル拡張子(.md)を追加してエントリを検索
  const articleEntry = data.repository.object.entries?.find(
    (entry) => entry.name === `${title}.md`,
  );

  if (
    !articleEntry ||
    !isBlob(articleEntry.object) ||
    !articleEntry.object.text
  ) {
    return undefined;
  }

  const article = parseToArticle({
    name: articleEntry.name,
    text: articleEntry.object.text,
    isPreview: true,
  });

  // 記事がundefinedか、すでに公開済みの場合はundefinedを返す
  if (!article || isPublished(article.publishedAt)) {
    return undefined;
  }

  return article;
}

function parseToArticle(input: ArticleInput): Article | undefined {
  const { content, data } = matter(input.text);
  const isPreview = input.isPreview ?? false;

  if (!isValidArticleData(data)) {
    return undefined;
  }

  // プレビュー用の日付
  const bigFuture = 100000000000000;
  const published_at = new Date(data.published_at || bigFuture);
  if (
    (!isPublished(published_at) || !isValidDate(published_at)) &&
    !isPreview
  ) {
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
  return !Number.isNaN(date.getTime());
}

function isPublished(published_at: Date): boolean {
  return published_at <= new Date();
}

function removeExtension(filename: string): string {
  return filename.replace(/\.[^/.]+$/, "");
}
