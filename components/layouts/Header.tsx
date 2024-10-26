import Link from "next/link";
import X from "../elements/logo/X";
import Github from "../elements/logo/Github";

export const Header = () => {
	const darkMode = false;
	const iconSize = 15;
	return (
		<header className=" bg-red-600 py-3 md:pb-5 md:pt-10">
			<div>
				<div className="flex flex-col text-slate-50 md:flex-row">
					<Link href="/" className="flex items-center font-extrabold">
						<h1 className=" px-3 pb-3 text-4xl text-slate-50 md:p-0 md:text-3xl ">
							yDog Tech Blog
						</h1>
					</Link>
					<div className="ml-auto flex md:-mb-1">
						<ul className="mb-2 mt-auto flex items-end space-x-3 md:m-0 md:mb-1">
							<li className="px-2 text-lg md:hover:underline">
								<Link href="/">TOP</Link>
							</li>
							<li className="rounded md:hover:bg-slate-950">
								<a
									href="https://x.com/yDog_1"
									target="_blank"
									rel="noopener noreferrer"
									className="block p-1"
								>
									<X width={iconSize} height={iconSize} darkMode={darkMode} />
								</a>
							</li>
							<li className=" rounded md:hover:bg-slate-950">
								<a
									href="https://github.com/yDog-1"
									target="_blank"
									rel="noopener noreferrer"
									className="block p-1"
								>
									<Github
										width={iconSize}
										height={iconSize}
										darkMode={darkMode}
									/>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};
