import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { getBasicMetadata } from "./metadata";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const ZenKakuGothicNew = Zen_Kaku_Gothic_New({
	weight: "400",
	subsets: ["latin"],
});

const url = process.env.VERCEL_URL
	? "https://www.blog.ydog.jp/"
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(url),
	...(() => getBasicMetadata({ path: "/" }))(),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<head>
				<GoogleAnalytics gaId="G-CCXN6BJ87D" />
			</head>
			<body
				className={`${ZenKakuGothicNew.className} flex min-h-screen flex-col`}
			>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
