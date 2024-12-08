import type { Content } from "@/types/Content";
import { FaArrowCircleRight } from "react-icons/fa";

export default function FirstPost(props: { firstContent: Content }) {
	const { firstContent } = props;
	return (
		<>
			<div>
				<div className="relative mt-10 flex rounded-lg bg-slate-50 duration-100">
					<a
						href={`/post/${firstContent.id}`}
						className="group flex flex-1 flex-col"
					>
						<h2 className="px-5 pb-10 pt-3 text-2xl font-bold group-hover:underline md:text-5xl">
							{firstContent.title}
						</h2>
						<div className="mt-auto flex justify-between px-5">
							<p className="py-3 text-sm">{firstContent.localPublishedAt}</p>
							<FaArrowCircleRight
								color={"#DC2626"}
								size={"1.7em"}
								className="my-auto ml-auto"
							/>
						</div>
					</a>
				</div>
			</div>
		</>
	);
}
