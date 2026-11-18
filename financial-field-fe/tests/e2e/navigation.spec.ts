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
	await expect(bandingkan).toHaveAttribute('aria-expanded', 'true');
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

test('no search in the header or the mobile menu; /cari still works (client request)', async ({
	page,
}) => {
	await page.goto('/');
	await expect(page.getByRole('banner').getByRole('search')).toHaveCount(0);

	// Mobile (2026-11-19): no search icon in the header bar, no field in the Menu sheet.
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	const banner = page.getByRole('banner');
	await expect(banner.getByRole('link', { name: 'Cari' })).toHaveCount(0);
	await expect(banner.locator('a[href^="/cari"]')).toHaveCount(0);
	await page.getByRole('button', { name: 'Menu' }).click();
	const sheet = page.getByRole('dialog', { name: 'Menu' });
	await expect(sheet).toBeVisible();
	await expect(sheet.getByRole('search')).toHaveCount(0);
	await expect(sheet.getByRole('searchbox')).toHaveCount(0);

	const response = await page.goto('/cari?q=pajak');
	expect(response?.status()).toBe(200);
	await expect(page.getByRole('main').getByRole('searchbox')).toBeVisible();
});

test('skip link moves focus to the content (REQ-A11Y-002)', async ({ page }) => {
	await page.goto('/');
	await page.keyboard.press('Tab');
	await expect(page.getByRole('link', { name: 'Langsung ke konten' })).toBeFocused();
});

test('Bandingkan is the highlighted menu entry, on desktop and mobile (client request)', async ({
	page,
}) => {
	const filled = 'rgb(0, 58, 160)';
	const paper = 'rgb(255, 255, 255)';

	await page.setViewportSize({ width: 1280, height: 800 });
	await page.goto('/');
	const nav = page.getByRole('navigation', { name: 'Utama' });
	const bandingkan = nav.getByRole('button', { name: 'Bandingkan', exact: true });
	await expect(bandingkan).toHaveCSS('background-color', filled);
	await expect(bandingkan).toHaveCSS('color', paper);
	// No other entry is filled.
	for (const name of ['Berita', 'Edukasi', 'Penyedia', 'Tentang Kami']) {
		await expect(nav.getByRole('button', { name, exact: true })).not.toHaveCSS(
			'background-color',
			filled,
		);
	}
	// Keyboard: it is still a disclosure button that opens and closes.
	await bandingkan.focus();
	await page.keyboard.press('Enter');
	await expect(bandingkan).toHaveAttribute('aria-expanded', 'true');
	await expect(nav.getByRole('link', { name: 'Semua perbandingan' })).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(bandingkan).toHaveAttribute('aria-expanded', 'false');
	await expect(bandingkan).toBeFocused();

	await page.setViewportSize({ width: 390, height: 844 });
	await page.getByRole('button', { name: 'Menu' }).click();
	const sheet = page.getByRole('dialog', { name: 'Menu' });
	const row = sheet.locator('summary', { hasText: /^Bandingkan$/ });
	await expect(row).toHaveCSS('background-color', filled);
	await row.click();
	await expect(sheet.getByRole('link', { name: 'Jaminan BPKB', exact: true })).toBeVisible();
});
