import { expect, test } from "@playwright/test";

test("path pagination and page-1 redirect (REQ-SEO-006)", async ({
  page,
  request,
}) => {
  await page.goto("/terbaru");
  await expect(page.getByRole("navigation", { name: "Halaman" })).toBeVisible();
  await page.getByRole("link", { name: "Berikutnya →" }).click();
  await expect(page).toHaveURL(/\/terbaru\/halaman\/2$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3100/terbaru/halaman/2",
  );

  const first = await request.get("/terbaru/halaman/1", { maxRedirects: 0 });
  expect(first.status()).toBe(301);
  expect(first.headers().location).toMatch(/\/terbaru$/);

  expect((await request.get("/terbaru/halaman/99")).status()).toBe(404);
});

test("sub-category without its parent redirects to the canonical path", async ({
  request,
}) => {
  const response = await request.get("/kategori/pph", { maxRedirects: 0 });
  expect([301, 308]).toContain(response.status());
  expect(response.headers().location).toMatch(/\/kategori\/pajak\/pph$/);
});

test("thin tags are noindex, rich tags are indexable (REQ-SEO-008)", async ({
  page,
}) => {
  await page.goto("/tag/reksa-dana");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await page.goto("/tag/pajak-karyawan");
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test("search: short query shows the form only; results are noindex (AC20)", async ({
  page,
}) => {
  await page.goto("/cari?q=a");
  await expect(page.getByText("Masukkan minimal 2 karakter.")).toBeVisible();
  await page.goto("/cari?q=pajak");
  await expect(page.getByText(/hasil untuk “pajak”/)).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});
