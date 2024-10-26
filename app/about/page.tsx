import Image from "next/image";
import { getBasicMetadata } from "@/app/metadata";

export const metadata = getBasicMetadata({
	title: "About",
	description: "yDogとは誰なのかについて説明します。",
	path: "/about",
});

type History = {
	year: number;
	month: number;
	sentence: string;
};

const histories: History[] = [
	{ year: 2001, month: 1, sentence: "誕生" },
	{ year: 2019, month: 3, sentence: "工業高校卒業、某繊維大手企業に就職" },
	{ year: 2023, month: 6, sentence: "Javascriptの学習を開始" },
	{ year: 2023, month: 10, sentence: "Next.jsの学習を開始" },
	{ year: 2024, month: 1, sentence: "ITの道へ進むことを決意" },
];

export default function Page() {
	return (
		<main className="flex">
			<div className="my-10">
				<div className="mx-3 grid grid-cols-1 md:grid-cols-2 md:justify-between">
					<div className="flex flex-col items-center md:mt-16 ">
						<Image
							src="/images/yDog.png"
							alt="yDog icon"
							width={480}
							height={480}
						/>
						<h1 className="text-3xl">yDog</h1>
					</div>
					<div>
						<h2 className=" mb-4 mt-12 text-center text-xl font-bold md:mt-0">
							来歴
						</h2>
						<ul className="flex w-full flex-col">
							{histories.map((h) => {
								return (
									<li key={h.sentence} className="grid grid-cols-3">
										<p>{`${h.year}年${h.month}月`}</p>
										<div className="col-span-2">{h.sentence}</div>
									</li>
								);
							})}
						</ul>
						<div className="mt-10">
							<p>yDogという名前で2023年10月に頃に活動を始めました。</p>
							<p>
								このサイトを通じて私が切磋琢磨する様子を皆様にお届けできたらと思います。
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
