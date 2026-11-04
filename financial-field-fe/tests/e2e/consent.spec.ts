import { expect, test } from "@playwright/test";

/** AC15 / REQ-ANL-001: nothing loads before consent; one page_view per navigation after. */
test("GA4 waits for consent and counts page views once", async ({ page }) => {
  const gaRequests: string[] = [];
  await page.route(
    /googletagmanager\.com|google-analytics\.com/,
    async (route) => {
      gaRequests.push(route.request().url());
      await route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: "",
      });
    },
  );

  await page.goto("/");
  await expect(page.getByRole("button", { name: "Terima" })).toBeVisible();
  expect(gaRequests).toEqual([]);

  await page.getByRole("button", { name: "Terima" }).click();
  await expect.poll(() => gaRequests.length).toBeGreaterThan(0);

  const pageViews = () =>
    page.evaluate(
      () =>
        (window.dataLayer ?? []).filter((entry) => {
          const args = Array.from(entry as ArrayLike<unknown>);
          return args[0] === "event" && args[1] === "page_view";
        }).length,
    );
  expect(await pageViews()).toBe(1);

  await page
    .getByRole("link", { name: "Terbaru", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/terbaru$/);
  await expect.poll(pageViews).toBe(2);
});

test("rejecting keeps analytics off", async ({ page }) => {
  const gaRequests: string[] = [];
  page.on("request", (request) => {
    if (/googletagmanager|google-analytics/.test(request.url())) {
      gaRequests.push(request.url());
    }
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Tolak" }).click();
  await page.goto("/terbaru");
  expect(gaRequests).toEqual([]);
  await expect(page.getByRole("button", { name: "Tolak" })).toHaveCount(0);
});
