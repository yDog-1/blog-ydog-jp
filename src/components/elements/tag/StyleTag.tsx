import type { Tag } from "@/types/Tag";
import { TagColor, tagColors } from "./tagColors";

const blackText = "#0f172a";
const whiteText = "#f8fafc";

export default function StyleTag({
  children,
  tagName,
}: {
  children: React.ReactNode;
  tagName: string;
}) {
  const tag =
    tagColors.find((tag) => tag.tag === tagName) ??
    new TagColor(tagName as Tag, [0, 0, 50]);

  const textColor = tag.isBlackText ? blackText : whiteText;
  return (
    <div
      style={{
        backgroundColor: `${tag.hsl}`,
        color: `${textColor}`,
      }}
    >
      {children}
    </div>
  );
}
