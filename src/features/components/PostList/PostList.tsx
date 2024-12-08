import PostCard from "./PostCard";

export default function PostList({
  id = "",
  title = "",
  localPublishedAt = "",
  loading = false,
}) {
  return !loading ? (
    <li className="floatButtom mt-1 flex rounded-lg bg-slate-50 duration-100 active:bg-slate-200 md:mx-0">
      <PostCard id={id} title={title} localPublishedAt={localPublishedAt} />
    </li>
  ) : (
    <li className="mt-1 flex rounded-lg md:mx-0">
      <PostCard
        id={id}
        title={title}
        localPublishedAt={localPublishedAt}
        loading={loading}
      />
    </li>
  );
}
