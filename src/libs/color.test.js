import { describe, expect, test } from "bun:test";
import { getTextColor, hexToRgb } from "./color";

describe("hexToRgb", () => {
  test("parses six-digit hex colors with or without a hash", () => {
    expect(hexToRgb("#aB09fF")).toEqual({ r: 171, g: 9, b: 255 });
    expect(hexToRgb("000000")).toEqual({ r: 0, g: 0, b: 0 });
  });

  test("preserves partial and invalid channel parsing", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 15, b: NaN });
    expect(hexToRgb("#zz1234")).toEqual({ r: NaN, g: 18, b: 52 });
  });
});

describe("getTextColor", () => {
  test("uses white for the default and dark backgrounds", () => {
    expect(getTextColor("default")).toBe("#FFFFFF");
    expect(getTextColor("#000000")).toBe("#FFFFFF");
    expect(getTextColor("#0000ff")).toBe("#FFFFFF");
  });

  test("uses black for light backgrounds", () => {
    expect(getTextColor("#ffffff")).toBe("#000000");
    expect(getTextColor("#ffff00")).toBe("#000000");
  });

  test("switches contrast choice at the grayscale boundary", () => {
    expect(getTextColor("#757575")).toBe("#FFFFFF");
    expect(getTextColor("#767676")).toBe("#000000");
  });

  test("returns black for an invalid color", () => {
    expect(getTextColor("invalid")).toBe("#000000");
  });
});
