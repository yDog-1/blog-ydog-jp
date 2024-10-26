import type { Metadata } from "next";

type MetaImage = { url: string; width: number; height: number; alt: string };

export function getBasicMetadata({
	path,
	title = "yDog Tech Blog",
	description = "フロントエンドエンジニアを目指すyDogのブログです。",
	image = {
		url: "/opengraph-image.png?862c688aad63163e",
		width: 2544,
		height: 1272,
		alt: "yDog icon",
	},
}: {
	path: string;
	title?: string;
	description?: string;
	image?: MetaImage;
}): Metadata {
	const siteName = "yDog Tech Blog";
	const formatTitle = title === siteName ? title : `${title} | yDog Tech Blog`;
	return {
		title: formatTitle,
		description,
		alternates: {
			canonical: path,
		},
		openGraph: {
			title: formatTitle,
			description,
			url: path,
			siteName,
			locale: "ja_JP",
			type: "website",
			images: image,
		},
		twitter: {
			title: formatTitle,
			description,
			card: "summary_large_image",
			creator: "@yDog_1",
			images: image,
		},
	};
}
