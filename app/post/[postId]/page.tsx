import Post from "@/features/components/Post/Post";
import { getDetail, getList } from "@/libs/microcms";
import { Metadata } from "next";
import { getBasicMetadata } from "@/app/metadata";

// metadataを動的に適用
export async function generateMetadata(
  props: {
    params: Promise<{ postId: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;

  const {
    postId
  } = params;

  // fetch data
  const post = await getDetail(postId);
  const reg = /<("[^"]*"|'[^']*'|[^'">])*>/g;
  // bodyからhtml要素を取り除いて、スペースに、連続したスペースを1つにする

  const description = post.body.replace(reg, " ").replace(/ +/g, " ");

  return getBasicMetadata({
    title: post.title,
    description,
    path: `/post/${post.id}`,
  });
}

// 動的ルーティングを静的に生成
export async function generateStaticParams() {
  const contents = (await getList()).contents;

  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });

  return paths;
}

export default async function Page(
  props: {
    params: Promise<{ postId: string }>;
  }
) {
  const params = await props.params;

  const {
    postId
  } = params;

  const post = await getDetail(postId);
  return <Post post={post} />;
}
