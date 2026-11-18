import { expect, test } from '@playwright/test';

import { expectNoSeriousA11yViolations } from './helpers';

/** AC2 + AC17: every Phase 1 route renders with one H1 and no serious axe issues. */
const ROUTES: [string, RegExp][] = [
	['/', /Financial Field Indonesia/],
	['/artikel/cara-membaca-slip-gaji-pph-21', /Cara membaca slip gaji/],
	['/artikel/wawancara-negosiasi-gaji-pertama', /menegosiasikan gaji pertama/],
	['/artikel/kolom-pensiun-adalah-bab-baru', /pensiun bukan akhir/],
	['/kategori/pajak', /^Pajak$/],
	['/kategori/pajak/pajak-pph21', /^PPh 21 & Bukti Potong$/],
	['/tag/pajak-karyawan', /Pajak karyawan/],
	['/peninjau/peninjau-contoh-dua', /Peninjau Contoh Dua/],
	['/peninjau/peninjau-contoh-tiga', /Peninjau Contoh Tiga/],
	['/kategori/edukasi/edukasi-pinjaman-kredit', /^Pinjaman Kredit$/],
	['/kategori/panduan/panduan-pinjaman-kredit', /^Pinjaman Kredit$/],
	['/artikel/bunga-flat-dan-bunga-efektif', /Bunga flat dan bunga efektif/],
	['/bandingkan', /^Bandingkan$/],
	['/bandingkan/pinjaman', /^Pinjaman$/],
	['/bandingkan/jaminan-bpkb', /^Jaminan BPKB$/],
	['/bandingkan/kredit-mobil', /^Kredit Mobil$/],
	['/produk/contoh-auto-finance-kredit-mobil-baru', /^Kredit Mobil Baru$/],
	['/penyedia', /^Penyedia$/],
	['/penyedia/contoh-bank-utama', /^Bank Contoh Utama$/],
	['/kalkulator/cicilan-kredit', /^Cicilan Kredit$/],
	['/kamus-keuangan', /^Kamus Keuangan$/],
	['/tentang-kami/metodologi-perbandingan', /Metodologi Perbandingan/],
	['/terbaru', /Artikel Terbaru/],
	['/wawancara', /Wawancara/],
	['/video', /^Video$/],
	['/tentang-kami', /Tentang Financial Field Indonesia/],
	['/tentang-kami/redaksi', /Redaksi/],
	['/cari?q=pajak', /Cari artikel/],
	['/hubungi-kami', /Hubungi Kami/],
];

for (const [path, heading] of ROUTES) {
	test(`${path} renders`, async ({ page }) => {
		const response = await page.goto(path);
		expect(response?.status()).toBe(200);
		await expect(page.locator('h1')).toHaveCount(1);
		await expect(page.locator('h1')).toHaveText(heading);
		await expectNoSeriousA11yViolations(page);
	});
}

test('reserved, legacy and retired paths are 404 (ADR-0004, ADR-0022)', async ({ request }) => {
	for (const path of [
		'/bandingkan/tidak-ada',
		'/penyedia/x',
		'/produk',
		'/produk/tidak-ada',
		'/kalkulator',
		'/edukasi',
		'/panduan',
		// Writers are a team without pages; only reviewers have one.
		'/penulis/peninjau-contoh-satu',
		'/peninjau/tim-redaksi',
		// Pages with their own URL are never served twice.
		'/tentang-kami/kamus-keuangan',
		'/tentang-kami/hubungi-kami',
		'/articles/cara-membaca-slip-gaji-pph-21',
		'/category/pajak',
		'/authors/penulis-contoh-satu',
		'/api/preview',
		'/api/revalidate',
	]) {
		const response = await request.get(path);
		expect(response.status(), path).toBe(404);
	}
});

test('custom 404 offers search and topics (REQ-PAGE-002)', async ({ page }) => {
	const response = await page.goto('/artikel/tidak-ada');
	expect(response?.status()).toBe(404);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Halaman tidak ditemukan');
	await expect(page.locator('#cari-404')).toBeVisible();
});

test('harness is never served in production (T19)', async ({ request }) => {
	expect((await request.get('/harness')).status()).toBe(404);
});
