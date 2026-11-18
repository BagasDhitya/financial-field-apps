import { expect, test } from '@playwright/test';

test('Berita panel: keyboard open, Escape closes, focus returns (AC3)', async ({ page }) => {
	await page.goto('/');
	const trigger = page.getByRole('button', { name: 'Berita', exact: true });
	await trigger.focus();
	await page.keyboard.press('Enter');
	await expect(trigger).toHaveAttribute('aria-expanded', 'true');
	await expect(
		page
			.getByRole('navigation', { name: 'Utama' })
			.getByRole('link', { name: 'PPh 21 & Bukti Potong', exact: true }),
	).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	await expect(trigger).toBeFocused();

	await page.keyboard.press('Space');
	await expect(trigger).toHaveAttribute('aria-expanded', 'true');
	await page.mouse.click(5, 700);
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('topic panel closes on navigation', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Berita', exact: true }).click();
	await page
		.getByRole('navigation', { name: 'Utama' })
		.getByRole('link', { name: 'Investasi', exact: true })
		.click();
	await expect(page).toHaveURL(/\/kategori\/investasi$/);
	await expect(page.getByRole('button', { name: 'Berita', exact: true })).toHaveAttribute(
		'aria-expanded',
		'false',
	);
});

test('hover alone does not open the panel', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Berita', exact: true }).hover();
	await expect(page.getByRole('button', { name: 'Berita', exact: true })).toHaveAttribute(
		'aria-expanded',
		'false',
	);
});

test("the menu follows Site Navigation in the owner's order (ADR-0022)", async ({ page }) => {
	await page.goto('/');
	const nav = page.getByRole('navigation', { name: 'Utama' });
	await expect(nav.locator(':scope > ul > li')).toHaveText([
		/^Berita/,
		/^Edukasi/,
		/^Panduan/,
		/^Bandingkan/,
		/^Penyedia/,
		/^Kalkulator/,
		/^Kamus Keuangan/,
		/^Tentang Kami/,
	]);

	const bandingkan = nav.getByRole('button', { name: 'Bandingkan', exact: true });
	await bandingkan.click();
	await expect(nav.getByRole('link', { name: 'Pinjaman', exact: true })).toHaveAttribute(
		'href',
		'/bandingkan/pinjaman',
	);
	await expect(nav.getByRole('link', { name: 'Jaminan BPKB', exact: true })).toHaveAttribute(
		'href',
		'/bandingkan/jaminan-bpkb',
	);

	// Opening another entry closes the first.
	const tentang = nav.getByRole('button', { name: 'Tentang Kami', exact: true });
	await tentang.click();
	await expect(bandingkan).toHaveAttribute('aria-expanded', 'false');
	for (const name of [
		'Redaksi',
		'Metodologi Perbandingan',
		'Kebijakan Editorial',
		'Pengungkapan Afiliasi',
		'Kebijakan Privasi',
		'Hubungi Kami',
	]) {
		await expect(nav.getByRole('link', { name, exact: true })).toBeVisible();
	}

	await nav.getByRole('button', { name: 'Edukasi', exact: true }).click();
	await nav.getByRole('link', { name: 'Pinjaman Kredit', exact: true }).click();
	await expect(page).toHaveURL(/\/kategori\/edukasi\/edukasi-pinjaman-kredit$/);
	await expect(page.locator('h1')).toHaveText('Pinjaman Kredit');
});

test('the header has no search bar; /cari still works (client request)', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('banner').getByRole('search')).toHaveCount(0);
	const response = await page.goto('/cari?q=pajak');
	expect(response?.status()).toBe(200);
});

test('skip link moves focus to the content (REQ-A11Y-002)', async ({ page }) => {
	await page.goto('/');
	await page.keyboard.press('Tab');
	await expect(page.getByRole('link', { name: 'Langsung ke konten' })).toBeFocused();
});
