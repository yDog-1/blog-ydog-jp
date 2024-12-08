import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import type { Blog } from "./Blog";

export interface Content extends MicroCMSDate, Blog, MicroCMSContentId {
  localPublishedAt: string;
}
