import StyleTag from "@/components/elements/tag/StyleTag";
import { encodeTag } from "@/libs/tag";

type Props = {
  tag: string;
};

export default function TagIcon({ tag }: Props) {
  const language = tag;
  return (
    <li key={tag} className="drop-shadow-lg *:rounded-md">
      <StyleTag tagName={language}>
        <a className="p-2" href={`/tag/${encodeTag(language)}`}>
          {tag}
        </a>
      </StyleTag>
    </li>
  );
}
