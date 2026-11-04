import { describe, expect, it } from "vitest";

import {
  countWords,
  formatDateWib,
  formatRelativeWib,
  formatRupiah,
  formatTimeWib,
  isLaterDayWib,
  readingTimeMinutes,
  toIsoWib,
  wordBucket,
} from "./format";

describe("format (REQ-LOC-002/003, REQ-ART-008)", () => {
  it("formats dates in WIB, id-ID long style", () => {
    expect(formatDateWib("2026-11-03T03:00:00Z")).toBe("3 November 2026");
    // 20:00 UTC on 2 Nov is already 3 Nov in Jakarta.
    expect(formatDateWib("2026-11-02T20:00:00Z")).toBe("3 November 2026");
  });

  it("returns null for missing or invalid dates", () => {
    expect(formatDateWib(null)).toBeNull();
    expect(formatDateWib("not-a-date")).toBeNull();
  });

  it("formats times with the WIB suffix", () => {
    expect(formatTimeWib("2026-11-03T07:30:00Z")).toBe("14.30 WIB");
  });

  it("uses relative time only under 24 hours", () => {
    const now = new Date("2026-11-03T12:00:00Z");
    expect(formatRelativeWib("2026-11-03T10:00:00Z", now)).toBe("2 jam lalu");
    expect(formatRelativeWib("2026-11-03T11:45:00Z", now)).toBe(
      "15 menit lalu",
    );
    expect(formatRelativeWib("2026-11-02T11:00:00Z", now)).toBeNull();
  });

  it("emits ISO 8601 with the +07:00 offset", () => {
    expect(toIsoWib("2026-11-03T03:00:00.000Z")).toBe(
      "2026-11-03T10:00:00+07:00",
    );
  });

  it("detects a later calendar day in WIB", () => {
    expect(isLaterDayWib("2026-11-01T03:00:00Z", "2026-11-01T10:00:00Z")).toBe(
      false,
    );
    expect(isLaterDayWib("2026-11-01T03:00:00Z", "2026-11-02T03:00:00Z")).toBe(
      true,
    );
    expect(isLaterDayWib("2026-11-01T03:00:00Z", null)).toBe(false);
  });

  it("formats rupiah without decimals", () => {
    expect(formatRupiah(1_250_000).replace(/\s/g, " ")).toBe("Rp 1.250.000");
  });

  it("computes reading time as words / 200, rounded up, min 1", () => {
    expect(readingTimeMinutes(0)).toBe(1);
    expect(readingTimeMinutes(200)).toBe(1);
    expect(readingTimeMinutes(201)).toBe(2);
    expect(countWords("  satu  dua\ntiga ")).toBe(3);
  });

  it("buckets word counts for analytics", () => {
    expect(wordBucket(499)).toBe("<500");
    expect(wordBucket(1500)).toBe("1000-2000");
    expect(wordBucket(2500)).toBe(">2000");
  });
});
