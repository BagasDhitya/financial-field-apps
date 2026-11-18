import { expect, test, type Page } from '@playwright/test';

/**
 * The lead relay form, UI only (ADR-0025). Nothing the reader types may leave
 * the browser: no request, no URL change, no storage.
 */

const PRODUCT = '/produk/contoh-bank-utama-kredit-kendaraan';

async function openForm(page: Page) {
	const trigger = page.getByRole('button', { name: /^Saya ingin tahu lebih lanjut/ }).first();
	await trigger.click();
	const dialog = page.getByRole('dialog', {
		name: 'Saya ingin tahu lebih lanjut tentang produk ini',
	});
	await expect(dialog).toBeVisible();
	return { trigger, dialog };
}

async function fillValid(page: Page) {
	const dialog = page.locator('dialog[open]');
	await dialog.getByLabel(/^Nama lengkap/).fill('Siti Rahmawati');
	await dialog.getByLabel(/^Nomor WhatsApp/).fill('812 3456 7890');
	await dialog.getByLabel(/^Email/).fill('siti@contoh.co.id');
	await dialog.getByLabel(/^Kota/).selectOption('Bandung');
}

test('the product page offers the form next to the outbound button, never "Ajukan"', async ({
	page,
}) => {
	await page.goto(PRODUCT);
	const { dialog } = await openForm(page);
	await expect(dialog.getByText(/^Bank Contoh Utama – Kredit Kendaraan Bermotor$/)).toBeVisible();
	await expect(dialog).toContainText('Ini bukan pengajuan kredit.');
	await expect(dialog).not.toContainText(/ajukan/i);
	await expect(dialog.getByRole('link', { name: 'Kebijakan Privasi' })).toHaveAttribute(
		'href',
		'/tentang-kami/kebijakan-privasi',
	);
	// Both consents start unticked.
	await expect(dialog.getByRole('checkbox')).toHaveCount(2);
	for (const box of await dialog.getByRole('checkbox').all()) {
		await expect(box).not.toBeChecked();
	}
});

test('"Kirim permintaan" stays disabled until every field is valid and consent A is ticked', async ({
	page,
}) => {
	await page.goto(PRODUCT);
	const { dialog } = await openForm(page);
	const send = dialog.getByRole('button', { name: 'Kirim permintaan' });
	await expect(send).toBeDisabled();

	await fillValid(page);
	await expect(send).toBeDisabled();
	// Consent B alone is not enough.
	await dialog.getByLabel(/Saya bersedia menerima/).check();
	await expect(send).toBeDisabled();
	await dialog.getByLabel(/Saya setuju data saya diteruskan ke Bank Contoh Utama/).check();
	await expect(send).toBeEnabled();
	await dialog.getByLabel(/Saya setuju data saya diteruskan/).uncheck();
	await expect(send).toBeDisabled();
	await dialog.getByLabel(/Saya setuju data saya diteruskan/).check();

	// A bad number disables it again and says why, under the field.
	const whatsapp = dialog.getByLabel(/^Nomor WhatsApp/);
	await whatsapp.fill('0812345678');
	await whatsapp.blur();
	await expect(send).toBeDisabled();
	const error = dialog.getByText('Tulis tanpa angka 0 di depan, misalnya 812 3456 7890.');
	await expect(error).toBeVisible();
	await expect(whatsapp).toHaveAttribute('aria-invalid', 'true');
	const errorId = await error.getAttribute('id');
	await expect(whatsapp).toHaveAttribute('aria-describedby', new RegExp(errorId ?? 'x'));
});

test('sending makes no request, changes no URL and stores nothing', async ({ page }) => {
	await page.goto(PRODUCT);
	await page.waitForLoadState('networkidle');
	const { dialog } = await openForm(page);
	await fillValid(page);
	await dialog.getByLabel(/Saya setuju data saya diteruskan/).check();

	const requests: string[] = [];
	page.on('request', (request) => requests.push(`${request.method()} ${request.url()}`));
	const before = page.url();
	await dialog.getByRole('button', { name: 'Kirim permintaan' }).click();

	await expect(
		dialog.getByRole('heading', { name: 'Terima kasih, tim mitra akan menghubungi Anda' }),
	).toBeFocused();
	await page.waitForTimeout(500);
	expect(requests).toEqual([]);
	expect(page.url()).toBe(before);
	const stored = await page.evaluate(() =>
		JSON.stringify({ ...window.localStorage, ...window.sessionStorage }),
	);
	expect(stored).not.toContain('Siti');
	expect(stored).not.toContain('812');
	expect(await page.evaluate(() => document.cookie)).not.toContain('Siti');
});

test('keyboard: focus stays inside, Esc closes, focus returns, the page does not scroll', async ({
	page,
}) => {
	await page.goto(PRODUCT);
	const { trigger, dialog } = await openForm(page);
	await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
	expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
	// The page behind is inert: Tab moves through the dialog and may leave for the
	// browser's own controls (document.body), but never reaches the page.
	let inside = 0;
	for (let step = 0; step < 25; step += 1) {
		await page.keyboard.press('Tab');
		const where = await dialog.evaluate((el) =>
			el.contains(document.activeElement)
				? 'inside'
				: document.activeElement === document.body || !document.activeElement
					? 'browser'
					: 'page',
		);
		expect(where).not.toBe('page');
		inside += where === 'inside' ? 1 : 0;
	}
	expect(inside).toBeGreaterThan(10);
	await page.keyboard.press('Escape');
	await expect(dialog).toBeHidden();
	await expect(trigger).toBeFocused();
	await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');

	// "Batal" closes too, and what was typed is gone on reopening.
	await openForm(page);
	await page
		.locator('dialog[open]')
		.getByLabel(/^Nama lengkap/)
		.fill('Siti');
	await page.locator('dialog[open]').getByRole('button', { name: 'Batal' }).click();
	const again = await openForm(page);
	await expect(again.dialog.getByLabel(/^Nama lengkap/)).toHaveValue('');
});

test('below 768 px the form is a full-height sheet', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto(PRODUCT);
	const { dialog } = await openForm(page);
	const box = await dialog.boundingBox();
	expect(Math.round(box?.x ?? -1)).toBe(0);
	expect(Math.round(box?.y ?? -1)).toBe(0);
	expect(Math.round(box?.width ?? 0)).toBe(390);
	expect(Math.round(box?.height ?? 0)).toBe(844);
	await dialog.getByRole('button', { name: 'Tutup formulir' }).click();
	await expect(dialog).toBeHidden();
});

test('each product in the comparison results opens the form for that product', async ({ page }) => {
	await page.goto('/bandingkan/kredit-mobil');
	const row = page.locator('main table tbody tr').filter({ hasText: 'Contoh Multifinance' });
	await row.getByRole('button', { name: /^Saya ingin tahu lebih lanjut/ }).click();
	const dialog = page.locator('dialog[open]');
	await expect(dialog).toContainText('Contoh Multifinance');
	await expect(dialog).toContainText('Kredit Mobil');
	await expect(
		dialog.getByLabel(/Saya setuju data saya diteruskan ke Contoh Multifinance/),
	).toBeVisible();
});
