import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
	return (
		<footer className="mt-10 bg-red-600 py-3">
			<div className="bg-red-600 text-slate-50">
				<div>
					<ul className=" grid grid-cols-7 gap-2 md:grid-cols-5 md:gap-5 ">
						<li className=" col-span-3 my-auto md:col-span-1 ">
							<Link href="/">
								<Image
									priority={true}
									src="/images/yDog.png"
									width={120}
									height={120}
									alt="yDog"
									className="mx-auto md:ml-0"
								/>
							</Link>
						</li>
						<li className=" col-span-4 flex-auto text-slate-50 md:col-span-4 ">
							<ul className=" grid grid-flow-row grid-cols-1 text-lg">
								<li className="flex flex-col items-end gap-2">
									<Link href="/about" className="md:hover:underline">
										About
									</Link>
								</li>{" "}
								<li className="flex flex-col items-end gap-2">
									<Link href="/contact" className="md:hover:underline">
										Contact
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};
