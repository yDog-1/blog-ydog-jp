import { describe, expect, test } from "bun:test";
import { formatDateJapanese } from "./date";

describe("formatDateJapanese", () => {
  test("formats local calendar dates without zero padding", () => {
    expect(formatDateJapanese(new Date(2024, 0, 1, 23, 59))).toBe("2024年1月1日");
    expect(formatDateJapanese(new Date(2023, 11, 31))).toBe("2023年12月31日");
  });

  test("formats leap day", () => {
    expect(formatDateJapanese(new Date(2024, 1, 29))).toBe("2024年2月29日");
  });

  test("reflects invalid dates", () => {
    expect(formatDateJapanese(new Date(NaN))).toBe("NaN年NaN月NaN日");
  });
});
