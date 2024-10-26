import TagPage from "@/features/components/TagPageList/TagPageList";
import type { Tag } from "@/types/Tag";
import type { Metadata } from "next";
import { getBasicMetadata } from "@/app/metadata";

export async function generateMetadata(props: {
	params: Promise<{ tagName: string }>;
}): Promise<Metadata> {
	const params = await props.params;

	const { tagName } = params;

	const description = `${tagName}タグのついたページ一覧`;

	return getBasicMetadata({
		title: `${tagName}ページ一覧`,
		description,
		path: `/tag/${tagName}`,
	});
}

type Props = {
	params: Promise<{ tagName: Tag }>;
};

export default async function Page(props: Props) {
	const params = await props.params;

	const { tagName } = params;

	return (
		<main>
			<TagPage tagName={tagName} />
		</main>
	);
}
