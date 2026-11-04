import { describe, expect, it } from "vitest";

import type { ArticleSummary } from "@/types";

import { rankRelated } from "./related";

function article(
  id: string,
  category: string | null,
  publishedAt: string,
): ArticleSummary {
  return {
    id,
    slug: id,
    title: id,
    leadText: null,
    articleType: "standard",
    featuredImage: null,
    primaryCategory: category
      ? {
          id: category,
          slug: category,
          name: category,
          parentSlug: null,
          parentName: null,
        }
      : null,
    author: null,
    publishedAt,
  };
}

describe("rankRelated (REQ-ART-006)", () => {
  const current = {
    id: "self",
    tagSlugs: ["a", "b"],
    primaryCategorySlug: "pajak",
  };

  it("ranks by shared tags, then same category, then recency, excluding self", () => {
    const ranked = rankRelated(current, [
      { article: article("self", "pajak", "2026-11-03"), tagSlugs: ["a", "b"] },
      { article: article("one-tag-old", null, "2026-01-01"), tagSlugs: ["a"] },
      {
        article: article("two-tags", null, "2025-01-01"),
        tagSlugs: ["a", "b"],
      },
      {
        article: article("one-tag-same-cat", "pajak", "2025-06-01"),
        tagSlugs: ["b"],
      },
      { article: article("cat-only-new", "pajak", "2026-10-01"), tagSlugs: [] },
      {
        article: article("unrelated", "investasi", "2026-11-01"),
        tagSlugs: ["z"],
      },
    ]);
    expect(ranked.map((item) => item.id)).toEqual([
      "two-tags",
      "one-tag-same-cat",
      "one-tag-old",
      "cat-only-new",
    ]);
  });

  it("caps the list at six and removes duplicates", () => {
    const candidates = Array.from({ length: 10 }, (_, index) => ({
      article: article(`a${index % 8}`, "pajak", `2026-10-0${index % 9}`),
      tagSlugs: [],
    }));
    const ranked = rankRelated(current, candidates);
    expect(ranked).toHaveLength(6);
    expect(new Set(ranked.map((item) => item.id)).size).toBe(6);
  });
});
