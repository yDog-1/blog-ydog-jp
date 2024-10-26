import { getList } from "@/libs/microcms";
import { notFound } from "next/navigation";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { Content } from "@/types/Content";
import FirstPost from "@/features/components/PostList/FirstPost";
import ShowMore from "@/features/components/PostList/ShowMore";

export async function getMoreList(
	offset: number,
): Promise<{ contents: Content[]; totalCount: number }> {
	"use server";
	return getList({ offset: offset });
}

type Props = { queries?: MicroCMSQueries };

export default async function TopPage({ queries }: Props) {
	const { contents, totalCount } = await getList(queries);
	if (!contents || contents.length === 0) {
		return notFound();
	}
	const firstContent = contents[0];
	const otherContents = contents.slice(1);
	return (
		<div>
			<FirstPost firstContent={firstContent} />
			<ShowMore
				getMoreList={getMoreList}
				totalCount={totalCount}
				firstRenderContents={otherContents}
			/>
		</div>
	);
}
