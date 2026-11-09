import { expect, test } from '@playwright/test';

import { jsonLdTypes } from './helpers';

test.describe('article page', () => {
	test('byline shows author and CFP reviewer with dates (AC5)', async ({ page }) => {
		await page.goto('/artikel/langkah-mengisi-spt-tahunan-pertama');
		await expect(page.getByText('Ditulis oleh')).toBeVisible();
		await expect(page.getByText('Ditinjau oleh')).toBeVisible();
		await expect(
			page.getByRole('link', { name: 'Peninjau Contoh Dua' }).first(),
		).toHaveAttribute('href', '/penulis/peninjau-contoh-dua');
		await expect(page.getByText(/Diperbarui/)).toBeVisible();
	});

	test('structured data matches the template (AC8, REQ-SEO-030)', async ({ page }) => {
		await page.goto('/artikel/langkah-mengisi-spt-tahunan-pertama');
		const types = await jsonLdTypes(page);
		for (const type of [
			'NewsMediaOrganization',
			'WebSite',
			'WebPage',
			'Article',
			'FAQPage',
			'BreadcrumbList',
		]) {
			expect(types).toContain(type);
		}
	});

	test('metadata: title, description, canonical, OG (AC7)', async ({ page }) => {
		await page.goto('/artikel/langkah-mengisi-spt-tahunan-pertama');
		// 54 characters: the brand suffix would pass 70, so it is dropped (REQ-SEO-020).
		await expect(page).toHaveTitle('Langkah mengisi SPT Tahunan pribadi untuk pertama kali');
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'http://localhost:3100/artikel/langkah-mengisi-spt-tahunan-pertama',
		);
		await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
			'content',
			'article',
		);
		await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
			'content',
			'summary_large_image',
		);
		const description = await page.locator('meta[name="description"]').getAttribute('content');
		expect(description?.length).toBeLessThanOrEqual(160);
	});

	test('body headings start at h2 and extras render', async ({ page }) => {
		await page.goto('/artikel/langkah-mengisi-spt-tahunan-pertama');
		await expect(
			page.getByRole('heading', { level: 2, name: 'Bagaimana caranya?' }),
		).toBeVisible();
		await expect(
			page.getByRole('heading', { level: 3, name: 'Bagaimana caranya?' }),
		).toHaveCount(0);
		await expect(page.getByRole('heading', { name: 'Poin penting' })).toBeVisible();
		await expect(
			page.getByRole('heading', { name: 'Pertanyaan yang sering diajukan' }),
		).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Koreksi' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Sumber' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Artikel terkait' })).toBeVisible();
	});

	test('PR article is labelled and links are sponsored (AC6)', async ({ page }) => {
		await page.goto('/artikel/pr-asuransi-kesehatan-keluarga-contoh');
		await expect(page.getByText('Konten bersponsor', { exact: true })).toBeVisible();
		await expect(
			page.getByText('Artikel ini dibuat atas kerja sama dengan Sponsor Contoh.'),
		).toBeVisible();
		await expect(page.getByRole('link', { name: /situs Sponsor Contoh/ })).toHaveAttribute(
			'rel',
			'sponsored noopener',
		);
		await expect(page.getByText('Ditinjau oleh')).toHaveCount(0);
	});

	test('article without image or reviewer still renders (AC21)', async ({ page }) => {
		const response = await page.goto('/artikel/membuka-percakapan-soal-warisan');
		expect(response?.status()).toBe(200);
		await expect(page.getByText('Ditulis oleh')).toBeVisible();
		await expect(page.getByText('Ditinjau oleh')).toHaveCount(0);
	});
});

test('articles without an image get a generated per-article card (T44)', async ({
	page,
	request,
}) => {
	await page.goto('/artikel/membuka-percakapan-soal-warisan');
	await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
		'content',
		'http://localhost:3100/og/artikel/membuka-percakapan-soal-warisan',
	);
	const card = await request.get('/og/artikel/membuka-percakapan-soal-warisan');
	expect(card.status()).toBe(200);
	expect(card.headers()['content-type']).toContain('image/png');
	expect((await card.body()).length).toBeLessThan(300_000);
	expect((await request.get('/og/artikel/tidak-ada')).status()).toBe(404);
});
