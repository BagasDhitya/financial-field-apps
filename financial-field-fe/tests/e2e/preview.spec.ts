import { expect, test } from '@playwright/test';

test('preview rejects bad secrets and unsafe slugs (AC19)', async ({ request }) => {
	expect(
		(await request.get('/api/preview?secret=salah&slug=a', { maxRedirects: 0 })).status(),
	).toBe(401);
	expect(
		(
			await request.get('/api/preview?secret=e2e-preview-secret&slug=//evil.example', {
				maxRedirects: 0,
			})
		).status(),
	).toBe(400);
});

test('preview shows drafts with status, noindex and no analytics (AC14)', async ({ page }) => {
	const analyticsRequests: string[] = [];
	page.on('request', (request) => {
		if (/googletagmanager|google-analytics/.test(request.url())) {
			analyticsRequests.push(request.url());
		}
	});
	await page
		.context()
		.addCookies([{ name: 'ffid_consent', value: 'granted', url: 'http://localhost:3100' }]);

	await page.goto('/api/preview?secret=e2e-preview-secret&slug=draf-belum-terbit');
	await expect(page).toHaveURL(/\/artikel\/draf-belum-terbit$/);
	await expect(page.getByRole('status')).toContainText('Status: Sudah dicek CFP');
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
	expect(analyticsRequests).toEqual([]);

	await page.getByRole('link', { name: 'Keluar dari pratinjau' }).click();
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Halaman tidak ditemukan');
});
