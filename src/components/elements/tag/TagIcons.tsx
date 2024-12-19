import TagIcon from "@/components/elements/tag/TagIcon";
import { decodeTag } from "@/libs/tag";

type Props = { tags: string[] };

export default function TagIcons({ tags }: Props) {
  return (
    <ul className="flex flex-wrap gap-1 text-center">
      {tags.map((t) => {
        const tag = decodeTag(t);
        return <TagIcon key={tag} tag={tag} />;
      })}
    </ul>
  );
}
