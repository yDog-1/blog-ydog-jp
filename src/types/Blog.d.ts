import type { MicroCMSDate } from "microcms-js-sdk";
import type { Tag } from "./Tag";

//ブログの型定義
export interface Blog extends MicroCMSDate {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  localPublishedAt: string;
}
