import { expect, test } from '@playwright/test';

import { expectNoHorizontalScroll } from './helpers';

for (const width of [360, 390, 768]) {
	test(`no horizontal scroll and bordered cards at ${width}px (AC4)`, async ({ page }) => {
		await page.setViewportSize({ width, height: 800 });
		for (const path of ['/', '/artikel/cara-menghitung-pph-21', '/kategori/pajak']) {
			await page.goto(path);
			await expectNoHorizontalScroll(page);
		}
		await page.goto('/kategori/pajak');
		const border = await page
			.locator('article')
			.first()
			.evaluate((node) => getComputedStyle(node).borderTopWidth);
		expect(border).toBe(width < 768 ? '2px' : '1px');
	});
}

test('mobile sheet opens as a dialog, topics expand, Escape closes (REQ-NAV-004)', async ({
	page,
}) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Menu' }).click();
	const dialog = page.getByRole('dialog', { name: 'Menu' });
	await expect(dialog).toBeVisible();
	await dialog.getByText('Pajak', { exact: true }).click();
	await expect(dialog.getByRole('link', { name: 'PPh', exact: true })).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(dialog).toBeHidden();
});

test('no element has rounded corners (REQ-UI-001)', async ({ page }) => {
	await page.goto('/');
	const rounded = await page.evaluate(
		() =>
			[...document.querySelectorAll('body *')].filter(
				(node) => getComputedStyle(node).borderRadius !== '0px',
			).length,
	);
	expect(rounded).toBe(0);
});
