import Github from "@/components/elements/logo/Github";
import X from "@/components/elements/logo/X";
import ContactList from "@/features/components/Contact/ContactList/ContactList";
import type { ContactList as ContactListType } from "@/types/ContactList";
import type { Metadata } from "next";
import { getBasicMetadata } from "@/app/metadata";

const description = "yDogの連絡先";

export const metadata: Metadata = getBasicMetadata({
	title: "Contact",
	description,
	path: "/contact",
});

const logoList: ContactListType[] = [
	{
		href: "https://x.com/yDog_1",
		id: "yDog_1",
		logo: { SVG: X },
	},
	{
		href: "https://github.com/yDog-1",
		id: "yDog-1",
		logo: { SVG: Github },
	},
];

export default function Page() {
	return (
		<main className="flex">
			<div className="my-10 flex flex-1 flex-col items-center justify-center">
				<ul className=" flex justify-center gap-16">
					{logoList.map((prop) => {
						return (
							<ContactList
								href={prop.href}
								id={prop.id}
								logo={prop.logo}
								key={prop.href}
							/>
						);
					})}
				</ul>
				<a href="mailto:ydog-1@outlook.jp" className=" mt-10 text-2xl">
					ydog-1@outlook.jp
				</a>
			</div>
		</main>
	);
}
