import { describe, expect, it } from "vitest";

import { isValidSlug, safeEqual } from "./security";

describe("security", () => {
  it("compares secrets in constant time, rejecting empty values", () => {
    expect(safeEqual("abc", "abc")).toBe(true);
    expect(safeEqual("abd", "abc")).toBe(false);
    expect(safeEqual("abcdef", "abc")).toBe(false);
    expect(safeEqual("", "abc")).toBe(false);
    expect(safeEqual(null, "abc")).toBe(false);
  });

  it("accepts only lowercase hyphenated slugs", () => {
    expect(isValidSlug("cara-hitung-pajak-2026")).toBe(true);
    expect(isValidSlug("../etc/passwd")).toBe(false);
    expect(isValidSlug("//evil.example")).toBe(false);
    expect(isValidSlug("Upper")).toBe(false);
    expect(isValidSlug(null)).toBe(false);
  });
});
