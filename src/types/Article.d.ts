export type Article = {
  title: string;
  published_at: Date;
  tags: string[];
  description: string;
  body: string;
};

type ArticleInput = {
  name: string;
  text: string;
};

type ArticleFrontmatter = {
  title: string;
  published_at: string;
  tags: string[];
  description: string;
};