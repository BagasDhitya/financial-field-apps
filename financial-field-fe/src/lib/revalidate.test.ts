import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { REVALIDATE } from "./revalidate";

const APP = path.resolve(__dirname, "../app");

/** Route files must use literals (static analysis), so they are checked here. */
const ROUTES: [string, number][] = [
  ["page.tsx", REVALIDATE.home],
  ["artikel/[slug]/page.tsx", REVALIDATE.article],
  ["kategori/[...segments]/page.tsx", REVALIDATE.categoryListing],
  ["tag/[slug]/[[...paging]]/page.tsx", REVALIDATE.archive],
  ["terbaru/[[...paging]]/page.tsx", REVALIDATE.archive],
  ["wawancara/[[...paging]]/page.tsx", REVALIDATE.archive],
  ["penulis/[slug]/page.tsx", REVALIDATE.archive],
  ["saham/[symbol]/page.tsx", REVALIDATE.archive],
  ["tentang-kami/[[...slug]]/page.tsx", REVALIDATE.staticPage],
  ["hubungi-kami/page.tsx", REVALIDATE.staticPage],
  ["og/artikel/[slug]/route.tsx", REVALIDATE.article],
  ["sitemap.xml/route.ts", REVALIDATE.sitemap],
  ["sitemaps/[file]/route.ts", REVALIDATE.sitemap],
];

describe("route revalidate literals match REVALIDATE", () => {
  it.each(ROUTES)("%s", (file, expected) => {
    const source = readFileSync(path.join(APP, file), "utf8");
    const match = source.match(/export const revalidate = ([\d_]+);/);
    expect(match?.[1]?.replace(/_/g, "")).toBe(String(expected));
  });
});
