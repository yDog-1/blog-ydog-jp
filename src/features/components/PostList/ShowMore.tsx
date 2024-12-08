"use client";
import LoadingList from "@/components/elements/Loading/LoadingList/LoadingList";
import type { Content } from "@/types/Content";
import type { MicroCMSQueries } from "microcms-js-sdk";
import { useCallback, useState } from "react";
import BeforePostList from "./BeforePostList";

// microCMS SDKのqueries limitの初期値
const defaultLimit = 10;
const addOffset = 9;

type Props = {
  getMoreList: (
    offset: number,
  ) => Promise<{ contents: Content[]; totalCount: number }>;
  totalCount: number;
  firstRenderContents: Content[];
  queries?: MicroCMSQueries;
};

export default function ShowMore({
  getMoreList,
  totalCount,
  firstRenderContents,
}: Props) {
  const [offset, setOffset] = useState(defaultLimit);
  const [contents, setContents] = useState(firstRenderContents);
  const [visibleButton, setVisibleButton] = useState(
    // 1つは、大きく切り出して表示しているため、1を足す
    totalCount > firstRenderContents.length + 1,
  );
  const [loading, setLoading] = useState(false);

  const getMoreContents = useCallback(async () => {
    if (offset > totalCount) {
      return;
    }

    setLoading((loading) => !loading);
    setVisibleButton(!visibleButton);

    const list = (await getMoreList(offset)).contents;
    setContents((contents) => [...contents, ...list]);
    setOffset((offset) => offset + addOffset);
    setLoading((loading) => !loading);
    setVisibleButton(!visibleButton);

    if (offset > totalCount) {
      return;
    }
    setVisibleButton(!visibleButton);
  }, [getMoreList, offset, totalCount, visibleButton]);

  return (
    <>
      <BeforePostList contents={contents} totalCount={totalCount} />
      {visibleButton ? (
        <div>
          <button
            type="button"
            className="mx-auto mt-3 w-full rounded-lg bg-red-500 p-1 text-lg  font-bold text-slate-50"
            onClick={getMoreContents}
          >
            もっと見る
          </button>
        </div>
      ) : (
        loading && <LoadingList />
      )}
    </>
  );
}
