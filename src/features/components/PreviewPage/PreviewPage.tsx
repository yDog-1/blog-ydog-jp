// "use client";
// import Loading from "@/components/elements/Loading/Loading";
// import Post from "@/features/components/Post/Post";
// import type { Content } from "@/types/Content";
// import { useEffect, useState } from "react";
// import getPostDetail from "./getPostDetail";

// export default function PreviewPage() {
// 	const contentId = usePathname().replace("/preview/", "");
// 	const draftKey = useSearchParams().get("draftKey");
// 	if (typeof draftKey !== "string") notFound();
// 	const [post, setPost] = useState<Content>();

// 	useEffect(() => {
// 		const previewPost = async () => {
// 			const prePost = await getPostDetail(contentId, draftKey);
// 			setPost(prePost);
// 		};
// 		previewPost();
// 	}, [contentId, draftKey]);

// 	if (!post)
// 		return (
// 			<div className="m-auto flex content-center justify-center">
// 				<Loading />
// 			</div>
// 		);

// 	return <Post post={post} />;
// }
