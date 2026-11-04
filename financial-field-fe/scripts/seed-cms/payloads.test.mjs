import { describe, expect, it } from "vitest";

import { CMS_CAPABILITIES as TS_CAPABILITIES } from "../../src/lib/cms/capabilities";

import { CMS_CAPABILITIES, parseCapabilities } from "./capabilities.mjs";
import { ARTICLES, DRAFTS } from "./data/articles.mjs";
import { AUTHORS } from "./data/people.mjs";
import { CATEGORIES, MARKER_TAG, TAGS } from "./data/taxonomy.mjs";
import {
  articlePayload,
  authorPayload,
  categoryPath,
  categoryPayload,
  publishedAtFor,
  tagPayload,
  tagSlugsFor,
} from "./payloads.mjs";

const NONE = parseCapabilities("");
const ALL = parseCapabilities("all");
const now = new Date("2026-11-04T10:00:00Z");
const ids = {
  category: "c1",
  author: "a1",
  reviewer: "r1",
  tags: ["t0", "t1"],
  image: 7,
};
const ctx = {
  ids,
  related: null,
  featured: false,
  isNew: true,
  refreshDates: false,
  now,
};
const BASE_KEYS = [
  "article_type",
  "author",
  "categories",
  "content",
  "featured_image",
  "lead_text",
  "primary_category",
  "reviewer",
  "tags",
  "title",
];

const row = (predicate) => ARTICLES.find(predicate);

describe("capabilities parity", () => {
  it("matches the frontend list exactly (same gate, REQ-SEED-006)", () => {
    expect([...CMS_CAPABILITIES]).toEqual([...TS_CAPABILITIES]);
    expect(ALL.size).toBe(TS_CAPABILITIES.length);
    expect(parseCapabilities("faq, unknown").has("faq")).toBe(true);
    expect(parseCapabilities("faq, unknown").size).toBe(1);
  });
});

describe("articlePayload (REQ-SEED-006, AC-S9)", () => {
  it("sends only today's schema fields when no capability is on", () => {
    for (const r of [...ARTICLES, ...DRAFTS]) {
      expect(Object.keys(articlePayload(r, ctx, NONE)).sort()).toEqual(
        BASE_KEYS,
      );
    }
  });

  it("adds each rich field only for rows with that variant", () => {
    const withF = row((r) => r.variants.includes("F"));
    const withoutF = row((r) => !r.variants.includes("F"));
    expect(articlePayload(withF, ctx, ALL).faq.length).toBeGreaterThanOrEqual(
      2,
    );
    expect(articlePayload(withoutF, ctx, ALL).faq).toBeUndefined();
    expect(
      articlePayload(
        row((r) => r.variants.includes("Src")),
        ctx,
        ALL,
      ).sources,
    ).toBeDefined();
    expect(
      articlePayload(
        row((r) => r.variants.includes("K")),
        ctx,
        ALL,
      ).key_takeaways,
    ).toHaveLength(3);
    expect(
      articlePayload(
        row((r) => r.variants.includes("Cor")),
        ctx,
        ALL,
      ).corrections,
    ).toHaveLength(1);
  });

  it("marks every article no_index and gives meta only to featured ones", () => {
    const r = ARTICLES[0];
    expect(articlePayload(r, ctx, ALL).seo).toEqual({ no_index: true });
    const featured = articlePayload(r, { ...ctx, featured: true }, ALL).seo;
    expect(featured.no_index).toBe(true);
    expect(featured.meta_title.length).toBeLessThanOrEqual(70);
    expect(featured.meta_description.length).toBeLessThanOrEqual(160);
  });

  it("adds sponsor fields to PR articles only", () => {
    expect(
      articlePayload(
        row((r) => r.type === "PR"),
        ctx,
        ALL,
      ).sponsor_name,
    ).toBe("Sponsor Contoh");
    expect(
      articlePayload(
        row((r) => r.type === "S"),
        ctx,
        ALL,
      ).sponsor_name,
    ).toBeUndefined();
  });

  it("sets first_published_at only on create or --refresh-dates; reviewed rows get last_reviewed_at", () => {
    const r = ARTICLES[2];
    expect(articlePayload(r, ctx, ALL).first_published_at).toBe(
      publishedAtFor(r.n, now),
    );
    expect(
      articlePayload(r, { ...ctx, isNew: false }, ALL).first_published_at,
    ).toBeUndefined();
    expect(
      articlePayload(r, { ...ctx, isNew: false, refreshDates: true }, ALL)
        .first_published_at,
    ).toBeDefined();
    expect(
      articlePayload(r, { ...ctx, ids: { ...ids, reviewer: null } }, ALL)
        .last_reviewed_at,
    ).toBeNull();
  });

  it("spreads dates 34 h apart with row 1 inside the last day (§4.6)", () => {
    const first = Date.parse(publishedAtFor(1, now));
    expect(now.getTime() - first).toBeLessThan(24 * 3_600_000);
    expect(first - Date.parse(publishedAtFor(2, now))).toBe(34 * 3_600_000);
  });

  it("uses the draft's editorial status, approved for published rows", () => {
    expect(articlePayload(DRAFTS[1], ctx, ALL).editorial_status).toBe(
      "changes_requested",
    );
    expect(articlePayload(ARTICLES[0], ctx, ALL).editorial_status).toBe(
      "approved",
    );
  });

  it("drops the featured image for NoImg rows and clears the reviewer relation when none", () => {
    const noImg = articlePayload(
      row((r) => r.variants.includes("NoImg")),
      ctx,
      NONE,
    );
    expect(noImg.featured_image).toBeNull();
    expect(
      articlePayload(
        ARTICLES[0],
        { ...ctx, ids: { ...ids, reviewer: null } },
        NONE,
      ).reviewer,
    ).toEqual({ set: [] });
  });

  it("always tags the marker first", () => {
    expect(tagSlugsFor(ARTICLES[0])[0]).toBe(MARKER_TAG);
  });
});

describe("other payloads", () => {
  it("gate category, tag and author extras", () => {
    const top = CATEGORIES[0];
    expect(Object.keys(categoryPayload(top, null, NONE, 1)).sort()).toEqual([
      "name",
      "parent_category",
    ]);
    expect(categoryPayload(top, null, ALL, 1).show_in_nav).toBe(true);
    expect(Object.keys(tagPayload(TAGS[1], NONE))).toEqual(["name"]);
    expect(tagPayload(TAGS[1], ALL).description).toBeTruthy();
    expect(Object.keys(authorPayload(AUTHORS[0], 3, NONE)).sort()).toEqual([
      "avatar",
      "bio",
      "full_name",
      "role_title",
    ]);
    expect(authorPayload(AUTHORS[4], 3, ALL).is_reviewer).toBe(true);
  });

  it("builds nested category paths", () => {
    expect(categoryPath("pajak-pph21")).toBe("pajak/pajak-pph21");
    expect(categoryPath("penghasilan")).toBe("penghasilan");
  });
});
