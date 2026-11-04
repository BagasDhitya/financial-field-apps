import { describe, expect, it } from "vitest";

import {
  buildSitemapIndex,
  buildUrlset,
  escapeXml,
  latestDate,
} from "./sitemap";

describe("sitemap XML", () => {
  it("escapes XML entities", () => {
    expect(escapeXml(`a&b<"'>`)).toBe("a&amp;b&lt;&quot;&apos;&gt;");
  });

  it("writes urlset with valid lastmod only", () => {
    const xml = buildUrlset([
      { loc: "https://x.test/a", lastmod: "2026-10-01T00:00:00Z" },
      { loc: "https://x.test/b", lastmod: "garbage" },
    ]);
    expect(xml).toContain(
      "<url><loc>https://x.test/a</loc><lastmod>2026-10-01T00:00:00.000Z</lastmod></url>",
    );
    expect(xml).toContain("<url><loc>https://x.test/b</loc></url>");
  });

  it("writes a sitemap index", () => {
    expect(
      buildSitemapIndex([{ loc: "https://x.test/sitemaps/tags.xml" }]),
    ).toContain(
      "<sitemap><loc>https://x.test/sitemaps/tags.xml</loc></sitemap>",
    );
  });

  it("picks the latest date", () => {
    expect(latestDate([null, "2026-01-01", "2026-03-01", undefined])).toBe(
      "2026-03-01",
    );
    expect(latestDate([])).toBeNull();
  });
});
