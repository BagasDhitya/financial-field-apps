import { expect, test } from '@playwright/test';

import { expectNoSeriousA11yViolations } from './helpers';

/**
 * The home widgets and the comparison pages (ADR-0022, PRP-0002.p3 T21–T26),
 * on the fictional catalogue in the CMS developer's schema.
 */

test.describe('home rail', () => {
	test('the finder opens Kredit Mobil with its answers, never in the URL (AC6)', async ({
		page,
	}) => {
		const requests: string[] = [];
		page.on('request', (request) => requests.push(request.url()));
		await page.goto('/');
		const finder = page.getByRole('region', { name: 'Cari Kredit Mobil Cocok' });
		await finder.getByLabel('Harga Mobil').selectOption('400000000');
		await finder.getByLabel('Uang Muka (DP)').fill('25');
		await finder.getByLabel('Tenor Kredit').selectOption('36');
		await finder.getByRole('button', { name: /Mulai Bandingkan/ }).click();

		await expect(page).toHaveURL(/\/bandingkan\/kredit-mobil$/);
		await expect(page.getByRole('heading', { name: 'Hasil perbandingan' })).toBeVisible();
		await expect(page.getByLabel('Harga mobil')).toHaveValue('400000000');
		await expect(page.getByText('Pokok pinjaman: Rp 300.000.000')).toBeVisible();
		await expect(page.getByRole('status').first()).toContainText('produk sesuai');
		for (const url of requests) {
			expect(url).not.toContain('400000000');
		}

		await page.getByRole('button', { name: 'Hapus jawaban' }).click();
		await expect(
			page.getByRole('heading', { name: 'Semua produk Kredit Mobil' }),
		).toBeVisible();
		const stored = await page.evaluate(() => Object.keys(sessionStorage));
		expect(stored.filter((key) => key.startsWith('ffid:bandingkan:'))).toEqual([]);
	});

	test('shows the PR spot with its label and a newsletter box that sends nothing', async ({
		page,
	}) => {
		await page.goto('/');
		const pr = page.getByRole('region', { name: 'Konten bersponsor' });
		await expect(pr.getByText(/^PR/).first()).toBeVisible();
		await expect(pr.getByRole('img', { name: 'Ruang iklan' })).toBeVisible();

		const before = page.url();
		const newsletter = page.getByRole('region', { name: 'Dapatkan Insight Keuangan Terbaru' });
		await newsletter.getByLabel('Alamat email').fill('pembaca@example.com');
		await newsletter.getByRole('button', { name: 'Berlangganan' }).click();
		await expect(newsletter.getByRole('status')).toContainText('tidak disimpan');
		expect(page.url()).toBe(before);
	});

	test("the editors' picks are gone from the rail; cards mark verified articles", async ({
		page,
	}) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { name: 'Pilihan editor' })).toHaveCount(0);
		await expect(page.getByText('Terverifikasi').first()).toBeVisible();
	});
});

test.describe('comparison section', () => {
	test('lists every product without JavaScript, provider then title (AC4)', async ({
		browser,
	}) => {
		const context = await browser.newContext({ javaScriptEnabled: false });
		const page = await context.newPage();
		await page.goto('/bandingkan/jaminan-bpkb');
		const providers = await page
			.locator('table tbody th [class*="provider"]')
			.allTextContents();
		expect(providers).toHaveLength(6);
		expect([...providers].sort((a, b) => a.localeCompare(b, 'id'))).toEqual(providers);
		await context.close();
	});

	test('answers re-sort by estimate and explain the rest', async ({ page }) => {
		await page.goto('/bandingkan/jaminan-bpkb');
		await page.getByLabel('Taksiran nilai kendaraan').selectOption('100000000');
		await page.getByLabel('Jumlah pinjaman').selectOption('75000000');
		await page.getByLabel('Tenor').selectOption('24');
		await page
			.getByRole('main')
			.getByRole('button', { name: 'Bandingkan', exact: true })
			.click();
		await expect(page.getByRole('heading', { name: 'Hasil perbandingan' })).toBeFocused();

		const estimates = await page
			.locator('table')
			.first()
			.locator('tbody td:nth-last-child(2) span:first-child')
			.allTextContents();
		const numbers = estimates.map((text) => Number(text.replace(/\D/g, '')));
		expect(numbers.length).toBeGreaterThan(0);
		expect([...numbers].sort((a, b) => a - b)).toEqual(numbers);

		await page.getByText(/^Produk lain/).click();
		await expect(
			page.getByText('Pinjaman maksimal 70% dari nilai kendaraan').first(),
		).toBeVisible();
	});

	test('"Kunjungi situs resmi" is sponsored, opens a new tab and carries UTM (AC7)', async ({
		page,
	}) => {
		await page.goto('/bandingkan/kredit-mobil');
		const link = page.locator('table a[data-outbound]').first();
		await expect(link).toHaveAttribute('rel', 'sponsored noopener');
		await expect(link).toHaveAttribute('target', '_blank');
		const href = new URL((await link.getAttribute('href')) ?? '');
		expect(href.hostname).toBe('example.com');
		expect(href.searchParams.get('utm_campaign')).toBe('bandingkan-kredit-mobil');
		expect(href.searchParams.get('utm_source')).toBe('financialfieldindonesia');
	});

	test('no "Ajukan", "Apply", "Cairkan" or "Daftar kredit" anywhere (AC11)', async ({ page }) => {
		for (const path of [
			'/bandingkan',
			'/bandingkan/kredit-mobil',
			'/bandingkan/jaminan-bpkb',
			'/produk/contoh-multifinance-dana-tunai-bpkb-mobil',
			'/penyedia/contoh-multifinance',
			'/kalkulator/cicilan-kredit',
		]) {
			await page.goto(path);
			const text = (await page.locator('main').innerText()).toLowerCase();
			for (const word of ['ajukan', 'apply', 'cairkan', 'daftar kredit']) {
				expect(text, `${path}: ${word}`).not.toContain(word);
			}
		}
	});

	test('the table and its survey pass axe after answering', async ({ page }) => {
		await page.goto('/bandingkan/kredit-mobil');
		await page
			.getByRole('main')
			.getByRole('button', { name: 'Bandingkan', exact: true })
			.click();
		await expectNoSeriousA11yViolations(page);
	});
});

test('calculator: the worked example to the rupiah (AC17)', async ({ page }) => {
	await page.goto('/kalkulator/cicilan-kredit');
	await expect(page.getByText('Rp 3.226.719', { exact: true })).toBeVisible();
	await page.getByLabel('Flat').check();
	await expect(page.getByText('Rp 3.611.111', { exact: true })).toBeVisible();
	await expect(page.getByText(/Setara bunga efektif/)).toBeVisible();
});

test('Kamus Keuangan: a letter index and anchored terms', async ({ page }) => {
	await page.goto('/kamus-keuangan');
	await page.getByRole('navigation', { name: 'Huruf' }).getByRole('link', { name: 'B' }).click();
	await expect(page).toHaveURL(/#huruf-b$/);
	await expect(page.locator('#bunga-flat dt')).toHaveText('Bunga flat');
});

test("the local API serves the catalogue in the CMS developer's shape (ADR-0011)", async ({
	request,
}) => {
	const body = await (
		await request.get(
			'/api/financial-products?filters[product_category][slug][$eq]=kredit-mobil&fields[0]=title&fields[1]=slug&fields[2]=min_income&fields[3]=annual_fee&fields[4]=apply_url&populate[product_category][fields][0]=slug&populate[provider][fields][0]=name',
		)
	).json();
	expect(body.meta.pagination.total).toBe(5);
	expect(Object.keys(body.data[0])).toEqual([
		'id',
		'documentId',
		'title',
		'slug',
		'min_income',
		'annual_fee',
		'apply_url',
		'product_category',
		'provider',
	]);
	const invalid = await request.get('/api/providers?fields[0]=bogus');
	expect(invalid.status()).toBe(400);
});
