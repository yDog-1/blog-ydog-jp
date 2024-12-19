"use server";

import { getDetail } from "@/libs/microcms";
import type { Content } from "@/types/Content";

//server action用関数
export default async function getPostDetail(
  contentId: string,
  draftKey: string,
): Promise<Content> {
  return getDetail(contentId, { draftKey: draftKey }, { cache: "no-store" });
}
