import type { Tag } from "@/types/Tag";
import Link from "next/link";
import StyleTag from "@/components/elements/tag/StyleTag";

type Props = {
	tag: Tag;
};

export default function TagIcon({ tag }: Props) {
	const language = tag;
	return (
		<li key={tag} className="drop-shadow-lg *:rounded-md">
			<StyleTag tagName={language}>
				<Link className="p-2" href={`/tag/${language}`}>
					{tag}
				</Link>
			</StyleTag>
		</li>
	);
}
