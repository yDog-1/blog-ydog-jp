import styles from "@/features/components/Post/Post.module.scss";
import parseToJSX from "@/libs/post/ParseToJSX";
import TagIcons from "@/features/components/Post/tagIcon/TagIcons";
import type { Content } from "@/types/Content";

type Props = {
	post: Content;
};

export default function Post({ post }: Props) {
	const parsedBody = parseToJSX(post.body);
	return (
		<>
			<div className={styles.head}>
				<div className="*:m-3">
					<p>{post.localPublishedAt}</p>
					<h1>{post.title}</h1>
					<TagIcons tags={post.tags} />
				</div>
			</div>
			<main className=" flex flex-col items-center bg-white ">
				<div>
					<div className={styles.post}>{parsedBody}</div>
				</div>
			</main>
		</>
	);
}
