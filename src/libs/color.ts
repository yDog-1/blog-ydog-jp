function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const normalized = c / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function hexToRgb(hex: string): {
  r: number;
  g: number;
  b: number;
} {
  const sanitizedHex = hex.replace("#", "");
  return {
    r: Number.parseInt(sanitizedHex.slice(0, 2), 16),
    g: Number.parseInt(sanitizedHex.slice(2, 4), 16),
    b: Number.parseInt(sanitizedHex.slice(4, 6), 16),
  };
}

export function getTextColor(bgHex: string): textColor {
  if (bgHex === "default") return textWhite;

  const { r, g, b } = hexToRgb(bgHex);
  const bgLuminance = getLuminance(r, g, b);
  const whiteLuminance = getLuminance(255, 255, 255);
  const blackLuminance = getLuminance(0, 0, 0);

  const whiteContrast = getContrastRatio(whiteLuminance, bgLuminance);
  const blackContrast = getContrastRatio(blackLuminance, bgLuminance);

  return whiteContrast > blackContrast ? textWhite : textBlack;
}

export const textBlack = "#000000";
export const textWhite = "#FFFFFF";

export type textColor = typeof textBlack | typeof textWhite;
