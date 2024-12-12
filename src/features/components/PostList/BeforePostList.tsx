import type { Content } from "@/types/Content";
import type { MicroCMSQueries } from "microcms-js-sdk";
import PostList from "./PostList";

type Props = {
  contents?: Content[];
  queries?: MicroCMSQueries;
  totalCount: number;
};

export default function ChildrenPostList({ contents }: Props) {
  if (!contents || contents.length === 0) {
    return;
  }
  return (
    <ul className="mt-3 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-3">
      {contents.map((post) => (
        <PostList
          key={post.id}
          id={post.id}
          title={post.title}
          localPublishedAt={post.localPublishedAt}
        />
      ))}
    </ul>
  );
}
