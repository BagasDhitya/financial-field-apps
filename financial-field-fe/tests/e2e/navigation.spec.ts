import { expect, test } from "@playwright/test";

test("topic panel: keyboard open, Escape closes, focus returns (AC3)", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Artikel" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page
      .getByRole("navigation", { name: "Utama" })
      .getByRole("link", { name: "PPh", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();

  await page.keyboard.press("Space");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.mouse.click(5, 700);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("topic panel closes on navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Artikel" }).click();
  await page
    .getByRole("navigation", { name: "Utama" })
    .getByRole("link", { name: "Investasi", exact: true })
    .click();
  await expect(page).toHaveURL(/\/kategori\/investasi$/);
  await expect(page.getByRole("button", { name: "Artikel" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("hover alone does not open the panel", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Artikel" }).hover();
  await expect(page.getByRole("button", { name: "Artikel" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("skip link moves focus to the content (REQ-A11Y-002)", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Langsung ke konten" }),
  ).toBeFocused();
});
