import TagIcons from "@/components/Post/tagIcon/TagIcons";
import parseToJSX from "@/libs/post/ParseToJSX";
import type { Content } from "@/types/Content";

type Props = {
  post: Content;
};

export default function Post({ post }: Props) {
  const parsedBody = parseToJSX(post.body);
  return (
    <>
      <div className="bg-slate-200 py-16">
        <div className="container mx-auto">
          <p className="text-slate-500">{post.localPublishedAt}</p>
          <h1 className="text-4xl mt-2 font-bold">{post.title}</h1>
          <div className="mt-10 mb-8">
            <TagIcons tags={post.tags} />
          </div>
        </div>
      </div>
      <main className="flex flex-col items-center bg-white ">
        <div className="container">
          <div>{parsedBody}</div>
        </div>
      </main>
    </>
  );
}
