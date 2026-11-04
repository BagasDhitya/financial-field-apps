import { describe, expect, it } from "vitest";

import { ARTICLES, DRAFTS, FEATURED } from "./data/articles.mjs";
import {
  PLACEHOLDER_TEXT,
  SITE_SETTINGS,
  STATIC_PAGES,
} from "./data/pages.mjs";
import { AUTHORS, authorByCode } from "./data/people.mjs";
import {
  CATEGORIES,
  MARKER_TAG,
  TAGS,
  allCategories,
  categoryName,
  topLevelOf,
} from "./data/taxonomy.mjs";
import { realDataHits } from "./safety.mjs";

const unique = (values) => new Set(values).size === values.length;

describe("taxonomy (PRP-0002.p1b §4.1–§4.2, T64)", () => {
  it("has 13 top-level and 46 sub-categories with unique slugs", () => {
    const all = allCategories();
    expect(CATEGORIES).toHaveLength(13);
    expect(all.filter((category) => category.parent)).toHaveLength(46);
    expect(all).toHaveLength(59);
    expect(unique(all.map((category) => category.slug))).toBe(true);
  });

  it("lists parents before children, and every parent exists", () => {
    const seen = new Set();
    for (const category of allCategories()) {
      if (category.parent) {
        expect(seen.has(category.parent)).toBe(true);
      }
      seen.add(category.slug);
    }
  });

  it("gives every category a 120–200 character description and a name", () => {
    for (const category of allCategories()) {
      expect(category.name.length).toBeGreaterThan(0);
      expect(category.description.length).toBeGreaterThanOrEqual(120);
      expect(category.description.length).toBeLessThanOrEqual(200);
    }
  });

  it("has the locked 21-tag vocabulary including the marker", () => {
    expect(TAGS).toHaveLength(21);
    expect(unique(TAGS.map((tag) => tag.slug))).toBe(true);
    expect(TAGS.map((tag) => tag.slug)).toContain(MARKER_TAG);
  });

  it("resolves the top level and name of a sub-category", () => {
    expect(topLevelOf("pajak-pph21")).toBe("pajak");
    expect(topLevelOf("pajak")).toBe("pajak");
    expect(categoryName("pajak")).toBeTruthy();
  });
});

describe("people (§4.3, T65)", () => {
  it("has 4 writers and 2 reviewers with unique slugs, all fictional", () => {
    expect(AUTHORS).toHaveLength(6);
    expect(unique(AUTHORS.map((author) => author.slug))).toBe(true);
    expect(
      AUTHORS.filter((author) => author.reviewer).map((author) => author.code),
    ).toEqual(["R1", "R2"]);
    for (const author of AUTHORS) {
      expect(author.full_name).toMatch(/Contoh/);
      expect(author.bio).toMatch(/fiktif/);
    }
    expect(authorByCode("W1")?.slug).toBe("penulis-contoh-satu");
  });
});

describe("catalog (§4.4, T66–T68)", () => {
  const categorySlugs = new Set(
    allCategories().map((category) => category.slug),
  );
  const tagSlugs = new Set(TAGS.map((tag) => tag.slug));

  it("has 60 published rows numbered 1–60 and 4 drafts, all slugs unique", () => {
    expect(ARTICLES).toHaveLength(60);
    expect(ARTICLES.map((row) => row.n)).toEqual(
      Array.from({ length: 60 }, (_, i) => i + 1),
    );
    expect(DRAFTS.map((row) => row.draft)).toEqual([
      "submitted",
      "changes_requested",
      "fact_checked",
      "approved",
    ]);
    expect(unique([...ARTICLES, ...DRAFTS].map((row) => row.slug))).toBe(true);
  });

  it("references only known categories, tags and people; reviewers are R codes", () => {
    for (const row of [...ARTICLES, ...DRAFTS]) {
      expect(categorySlugs.has(row.category), row.slug).toBe(true);
      for (const tag of row.tags) {
        expect(tagSlugs.has(tag), `${row.slug}: ${tag}`).toBe(true);
      }
      expect(row.tags).not.toContain(MARKER_TAG);
      expect(authorByCode(row.author), row.slug).toBeTruthy();
      if (row.reviewer) {
        expect(authorByCode(row.reviewer)?.reviewer, row.slug).toBe(true);
      }
    }
  });

  it("covers every category with ≥ 1 published article (REQ-SEED-001)", () => {
    const count = new Map();
    for (const row of ARTICLES) {
      for (const slug of new Set([row.category, topLevelOf(row.category)])) {
        count.set(slug, (count.get(slug) ?? 0) + 1);
      }
    }
    const empty = allCategories().filter(
      (category) => !count.get(category.slug),
    );
    expect(empty.map((category) => category.slug)).toEqual([]);
    expect(count.get("pajak")).toBe(14);
  });

  it("matches the type counts: 52 standard, 3 PR, 3 interviews, 2 columns", () => {
    const types = {};
    for (const row of ARTICLES) {
      types[row.type] = (types[row.type] ?? 0) + 1;
    }
    expect(types).toEqual({ S: 52, PR: 3, I: 3, C: 2 });
    expect(
      ARTICLES.filter((row) => row.type === "C").every((row) => !row.reviewer),
    ).toBe(true);
  });

  it("hits the designed tag thresholds (REQ-SEO-008)", () => {
    const count = {};
    for (const row of ARTICLES) {
      for (const tag of row.tags) {
        count[tag] = (count[tag] ?? 0) + 1;
      }
    }
    for (const tag of [
      "pajak-karyawan",
      "dana-darurat",
      "anggaran-bulanan",
      "investasi-pemula",
      "pensiun",
    ]) {
      expect(count[tag], tag).toBeGreaterThanOrEqual(3);
    }
    for (const tag of ["kartu-kredit", "karier-awal", "lansia"]) {
      expect(count[tag], tag).toBeGreaterThanOrEqual(1);
      expect(count[tag], tag).toBeLessThanOrEqual(2);
    }
  });

  it("has the variant rows the site needs to exercise", () => {
    const has = (variant) =>
      ARTICLES.filter((row) => row.variants.includes(variant)).map(
        (row) => row.n,
      );
    expect(has("NoImg")).toEqual([20, 55]);
    expect(has("Long")).toEqual([14]);
    expect(
      ARTICLES.find((row) => row.n === 14)?.title.length,
    ).toBeGreaterThanOrEqual(100);
    for (const variant of ["F", "Src", "K", "Cor", "U"]) {
      expect(has(variant).length, variant).toBeGreaterThan(0);
    }
  });

  it("features four existing published articles", () => {
    expect(FEATURED).toHaveLength(4);
    for (const slug of FEATURED) {
      expect(
        ARTICLES.some((row) => row.slug === slug),
        slug,
      ).toBe(true);
    }
  });
});

describe("pages and settings (T65)", () => {
  it("are placeholders that point at OQ-13", () => {
    expect(STATIC_PAGES.length).toBeGreaterThan(0);
    expect(PLACEHOLDER_TEXT).toMatch(/OQ-13/);
    expect(SITE_SETTINGS.contact_email).toMatch(/@example\.org$/);
  });
});

describe("no real contact data anywhere in the seed data (REQ-SEED-007)", () => {
  it("finds no non-example emails, phone numbers or hosts", () => {
    const text = JSON.stringify({
      CATEGORIES,
      TAGS,
      AUTHORS,
      ARTICLES,
      DRAFTS,
      STATIC_PAGES,
      SITE_SETTINGS,
    });
    expect(realDataHits(text)).toEqual([]);
  });

  it("does flag real-looking data", () => {
    expect(realDataHits("hubungi budi@gmail.com")).toHaveLength(1);
    expect(realDataHits("telepon 0812-3456-7890")).toHaveLength(1);
    expect(realDataHits("lihat https://bank-nyata.co.id/promo")).toHaveLength(
      1,
    );
    expect(
      realDataHits("redaksi@example.org dan https://example.com/x"),
    ).toEqual([]);
  });
});
