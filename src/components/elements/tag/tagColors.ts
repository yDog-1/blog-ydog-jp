import type { Tag } from "@/types/Tag";

export class TagColor {
  readonly isBlackText: boolean;
  readonly hsl: string;

  constructor(
    readonly tag: Tag,
    private color: [Hue: number, Saturation: number, Lightness: number],
  ) {
    this.isBlackText = this.isBlack();
    this.hsl = `hsl(${this.color[0]} ${this.color[1]}% ${this.color[2]}%)`;
  }

  private isBlack(): boolean {
    return this.color[2] > 60;
  }
}

// HSLカラーピッカーサイト "https://www.oh-benri-tools.com/tools/color/hsl-hsv-color-picker"
export const tagColors = [
  new TagColor("Next.js", [217, 33, 17]),
  new TagColor("JavaScript", [45, 93, 47]),
  new TagColor("TypeScript", [217, 91, 60]),
  new TagColor("microCMS", [215, 25, 27]),
  new TagColor("Tailwind CSS", [199, 89, 48]),
  new TagColor("SCSS", [292, 91, 73]),
  new TagColor("Notion", [222, 47, 11]),
  new TagColor("ポエム", [97, 85, 74]),
  new TagColor("感想", [312, 50, 83]),
  new TagColor("その他", [0, 0, 30]),
];
