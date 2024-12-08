import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";

export default function PostCard({
  id = "",
  title = "",
  localPublishedAt = "",
  loading = false,
}) {
  return !loading ? (
    <a href={`/post/${id}`} className="group flex flex-1 flex-col">
      <h2 className="px-5 pb-10 pt-3 text-2xl font-bold group-hover:underline">
        {title}
      </h2>
      <div className="mt-auto flex justify-between px-5">
        <p className="py-3 text-sm">{localPublishedAt}</p>
        <FaArrowCircleRight
          color={"#DC2626"}
          size={"1.7em"}
          className="my-auto ml-auto"
        />
      </div>
    </a>
  ) : (
    <div className="h-[128px] w-full" />
  );
}
