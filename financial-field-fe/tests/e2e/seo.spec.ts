import { expect, test } from "@playwright/test";

test("robots.txt follows ADR-0005 in production (AC10)", async ({
  request,
}) => {
  const body = await (await request.get("/robots.txt")).text();
  expect(body).toContain("Disallow: /api/");
  expect(body).toContain("User-Agent: OAI-SearchBot");
  expect(body).toContain("Sitemap: http://localhost:3100/sitemap.xml");
});

test("sitemap index and files list only indexable URLs (AC9)", async ({
  request,
}) => {
  const index = await (await request.get("/sitemap.xml")).text();
  for (const name of ["articles-1", "categories", "tags", "authors", "pages"]) {
    expect(index).toContain(`/sitemaps/${name}.xml`);
  }
  const tags = await (await request.get("/sitemaps/tags.xml")).text();
  expect(tags).toContain("/tag/pajak-karyawan");
  expect(tags).not.toContain("/tag/reksa-dana");
  const categories = await (
    await request.get("/sitemaps/categories.xml")
  ).text();
  expect(categories).toContain("/kategori/pajak/pph");
  expect(categories).not.toContain("/kategori/kosong");
  const articles = await (await request.get("/sitemaps/articles-1.xml")).text();
  expect(articles).toContain("<lastmod>");
  expect(articles).not.toContain("draf-belum-terbit");
});

test("CMS redirect chains resolve in one hop (AC11)", async ({ request }) => {
  const response = await request.get("/artikel/slug-lama", { maxRedirects: 0 });
  expect(response.status()).toBe(301);
  expect(response.headers().location).toMatch(
    /\/artikel\/cara-menghitung-pph-21$/,
  );
});

test("security headers are present (AC19, REQ-SEC-001)", async ({
  request,
}) => {
  const headers = (await request.get("/")).headers();
  expect(headers["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("webhook rejects a wrong secret and plans tags for a publish", async ({
  request,
}) => {
  expect((await request.post("/api/revalidate", { data: {} })).status()).toBe(
    401,
  );
  const response = await request.post("/api/revalidate", {
    headers: { authorization: "Bearer e2e-revalidate-secret" },
    data: {
      event: "entry.publish",
      model: "article",
      entry: { slug: "cara-menghitung-pph-21", publishedAt: "2026-10-01" },
    },
  });
  expect(await response.json()).toMatchObject({
    revalidated: true,
    tags: ["articles", "navigation", "article:cara-menghitung-pph-21"],
  });
});
