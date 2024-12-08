import StyleTag from "@/components/elements/tag/StyleTag";
import type { Tag } from "@/types/Tag";

type Props = {
  tag: Tag;
};

export default function TagIcon({ tag }: Props) {
  const language = tag;
  return (
    <li key={tag} className="drop-shadow-lg *:rounded-md">
      <StyleTag tagName={language}>
        <a className="p-2" href={`/tag/${language}`}>
          {tag}
        </a>
      </StyleTag>
    </li>
  );
}
