import { ul } from './blocks';
import type { FinancialProductEntry, ProductCategoryEntry, ProviderEntry } from './types';

/**
 * The comparison catalogue (PRP-0002.p3 T36, ADR-0011, ADR-0022), fictional
 * for staging: every name says "Contoh", every link goes to example.com, and
 * the licence numbers are visibly fake, so nothing can be mistaken for a real
 * institution or offer. Must never reach production (REQ-SEED-014).
 */

/** Sections, file order = menu order. "Pinjaman" is the group (CMS-28). */
export const PRODUCT_CATEGORIES: ProductCategoryEntry[] = [
	{
		slug: 'pinjaman',
		name: 'Pinjaman',
		description:
			'Bandingkan pinjaman dari bank dan perusahaan pembiayaan: bunga, plafon, tenor, dan estimasi cicilan per bulan.',
	},
	{
		slug: 'jaminan-bpkb',
		name: 'Jaminan BPKB',
		parent: 'pinjaman',
		description:
			'Pinjaman tunai dengan BPKB kendaraan sebagai jaminan. Bandingkan bunga, plafon terhadap nilai kendaraan, tenor, dan estimasi cicilannya.',
	},
	{
		slug: 'kredit-mobil',
		name: 'Kredit Mobil',
		parent: 'pinjaman',
		description:
			'Kredit untuk membeli mobil. Bandingkan bunga, uang muka minimum, tenor, dan estimasi cicilan dari harga mobil yang Anda incar.',
	},
];

function provider(
	slug: string,
	name: string,
	legal: string,
	description: string,
	index: number,
): ProviderEntry {
	return {
		slug,
		name,
		legal_name: legal,
		regulator: 'ojk',
		license_number: `CONTOH-${String(index).padStart(3, '0')}/2026`,
		website_url: `https://example.com/${slug}`,
		description,
	};
}

export const PROVIDERS: ProviderEntry[] = [
	provider(
		'contoh-auto-finance',
		'Contoh Auto Finance',
		'PT Contoh Auto Finance',
		'Perusahaan pembiayaan fiktif untuk demo, berfokus pada kredit mobil baru dan pinjaman dengan jaminan kendaraan.',
		1,
	),
	provider(
		'contoh-bank-digital',
		'Bank Contoh Digital',
		'PT Bank Contoh Digital',
		'Bank digital fiktif untuk demo. Seluruh proses pinjaman dilakukan melalui aplikasi.',
		2,
	),
	provider(
		'contoh-bank-utama',
		'Bank Contoh Utama',
		'PT Bank Contoh Utama',
		'Bank umum fiktif untuk demo, menawarkan kredit kendaraan dan pinjaman beragunan dengan bunga efektif.',
		3,
	),
	provider(
		'contoh-dana-kendaraan',
		'Contoh Dana Kendaraan',
		'PT Contoh Dana Kendaraan',
		'Perusahaan pembiayaan fiktif untuk demo, melayani mobil bekas dan pinjaman jaminan BPKB motor maupun mobil.',
		4,
	),
	provider(
		'contoh-mitra-pembiayaan',
		'Contoh Mitra Pembiayaan',
		'PT Contoh Mitra Pembiayaan',
		'Perusahaan pembiayaan fiktif untuk demo dengan jaringan cabang di kota-kota besar.',
		5,
	),
	provider(
		'contoh-multifinance',
		'Contoh Multifinance',
		'PT Contoh Multifinance',
		'Perusahaan pembiayaan fiktif untuk demo untuk kredit mobil dan dana tunai dengan jaminan BPKB.',
		6,
	),
];

const CHECKED = '2026-11-15';

function url(providerSlug: string, product: string, page = ''): string {
	return `https://example.com/${providerSlug}/${product}${page}`;
}

export const FINANCIAL_PRODUCTS: FinancialProductEntry[] = [
	// ---- Jaminan BPKB -----------------------------------------------------------
	{
		slug: 'contoh-multifinance-dana-tunai-bpkb-mobil',
		title: 'Dana Tunai BPKB Mobil',
		product_category: 'jaminan-bpkb',
		provider: 'contoh-multifinance',
		min_income: 4_000_000,
		summary: 'Pinjaman jaminan BPKB mobil sampai 80% dari taksiran, tenor hingga 4 tahun.',
		features: [
			ul(
				'Plafon sampai 80% dari taksiran harga mobil.',
				'Mobil tetap dipakai selama pinjaman berjalan.',
				'Pelunasan dipercepat tanpa penalti setelah 12 bulan.',
			),
		],
		apply_url: url('contoh-multifinance', 'dana-tunai-bpkb-mobil'),
		// CMS-25: a fictional commercial tie, so staging shows the PR units (ADR-0024).
		is_partner: true,
		data_checked_at: CHECKED,
		source_url: url('contoh-multifinance', 'dana-tunai-bpkb-mobil', '/syarat'),
		loan_specs: {
			rate_type: 'flat',
			rate_min: 9.6,
			rate_max: 14.4,
			amount_min: 10_000_000,
			amount_max: 500_000_000,
			tenor_min: 12,
			tenor_max: 48,
			max_financing: 80,
			fees: 'Provisi 1%, administrasi Rp 750.000',
		},
	},
	{
		slug: 'contoh-auto-finance-pinjaman-jaminan-bpkb',
		title: 'Pinjaman Jaminan BPKB',
		product_category: 'jaminan-bpkb',
		provider: 'contoh-auto-finance',
		min_income: 5_000_000,
		summary: 'Bunga flat mulai 8,4% per tahun untuk mobil sampai usia 12 tahun.',
		features: [
			ul(
				'Untuk mobil dengan usia sampai 12 tahun.',
				'Survei dan taksiran di lokasi peminjam.',
				'Asuransi kendaraan dapat ikut dicicil.',
			),
		],
		apply_url: url('contoh-auto-finance', 'pinjaman-jaminan-bpkb'),
		data_checked_at: CHECKED,
		source_url: url('contoh-auto-finance', 'pinjaman-jaminan-bpkb', '/syarat'),
		loan_specs: {
			rate_type: 'flat',
			rate_min: 8.4,
			rate_max: 12,
			amount_min: 20_000_000,
			amount_max: 750_000_000,
			tenor_min: 12,
			tenor_max: 48,
			max_financing: 75,
			fees: 'Provisi 1,5%, administrasi Rp 1.000.000',
		},
	},
	{
		slug: 'contoh-dana-kendaraan-pinjaman-bpkb-motor-mobil',
		title: 'Pinjaman BPKB Motor dan Mobil',
		product_category: 'jaminan-bpkb',
		provider: 'contoh-dana-kendaraan',
		min_income: 3_000_000,
		summary: 'Plafon kecil mulai Rp 5 juta, untuk jaminan BPKB motor maupun mobil.',
		features: [
			ul(
				'Menerima BPKB motor dan mobil.',
				'Plafon mulai Rp 5.000.000.',
				'Tenor pendek mulai 6 bulan.',
			),
		],
		apply_url: url('contoh-dana-kendaraan', 'pinjaman-bpkb-motor-mobil'),
		data_checked_at: CHECKED,
		source_url: url('contoh-dana-kendaraan', 'pinjaman-bpkb-motor-mobil', '/syarat'),
		loan_specs: {
			rate_type: 'flat',
			rate_min: 12,
			rate_max: 18,
			amount_min: 5_000_000,
			amount_max: 300_000_000,
			tenor_min: 6,
			tenor_max: 36,
			max_financing: 70,
			fees: 'Administrasi Rp 500.000',
		},
	},
	{
		slug: 'contoh-bank-utama-pinjaman-beragunan-kendaraan',
		title: 'Pinjaman Beragunan Kendaraan',
		product_category: 'jaminan-bpkb',
		provider: 'contoh-bank-utama',
		min_income: 7_000_000,
		summary: 'Pinjaman bank dengan bunga efektif dan tenor sampai 5 tahun.',
		features: [
			ul(
				'Bunga efektif, sehingga bunga turun mengikuti sisa pokok.',
				'Tenor sampai 60 bulan.',
				'Cicilan didebet otomatis dari rekening.',
			),
		],
		apply_url: url('contoh-bank-utama', 'pinjaman-beragunan-kendaraan'),
		data_checked_at: CHECKED,
		source_url: url('contoh-bank-utama', 'pinjaman-beragunan-kendaraan', '/syarat'),
		loan_specs: {
			rate_type: 'efektif',
			rate_min: 11,
			rate_max: 14,
			amount_min: 50_000_000,
			amount_max: 1_000_000_000,
			tenor_min: 12,
			tenor_max: 60,
			max_financing: 70,
			fees: 'Provisi 1%, administrasi Rp 1.500.000',
		},
	},
	{
		slug: 'contoh-mitra-pembiayaan-dana-bpkb',
		title: 'Dana BPKB',
		product_category: 'jaminan-bpkb',
		provider: 'contoh-mitra-pembiayaan',
		min_income: 3_500_000,
		summary: 'Pinjaman jaminan BPKB mobil dengan tenor 1 sampai 3 tahun.',
		features: [
			ul(
				'Plafon sampai 80% dari taksiran.',
				'Tenor 12 sampai 36 bulan.',
				'Layanan di kantor cabang dan kunjungan survei.',
			),
		],
		apply_url: url('contoh-mitra-pembiayaan', 'dana-bpkb'),
		// CMS-25: a fictional commercial tie, so staging shows the PR units (ADR-0024).
		is_partner: true,
		data_checked_at: CHECKED,
		source_url: url('contoh-mitra-pembiayaan', 'dana-bpkb', '/syarat'),
		loan_specs: {
			rate_type: 'flat',
			rate_min: 10.8,
			rate_max: 15,
			amount_min: 10_000_000,
			amount_max: 400_000_000,
			tenor_min: 12,
			tenor_max: 36,
			max_financing: 80,
			fees: 'Provisi 2%, administrasi Rp 750.000',
		},
	},
	{
		slug: 'contoh-bank-digital-pinjaman-bpkb',
		title: 'Pinjaman BPKB Digital',
		product_category: 'jaminan-bpkb',
		provider: 'contoh-bank-digital',
		min_income: 4_000_000,
		summary: 'Proses lewat aplikasi, bunga efektif, tenor 6 sampai 36 bulan.',
		features: [
			ul(
				'Unggah dokumen dan tanda tangan melalui aplikasi.',
				'Bunga efektif per tahun.',
				'Tanpa biaya provisi.',
			),
		],
		apply_url: url('contoh-bank-digital', 'pinjaman-bpkb'),
		// CMS-25: a fictional commercial tie, so staging shows the PR units (ADR-0024).
		is_partner: true,
		data_checked_at: CHECKED,
		source_url: url('contoh-bank-digital', 'pinjaman-bpkb', '/syarat'),
		loan_specs: {
			rate_type: 'efektif',
			rate_min: 13,
			rate_max: 17,
			amount_min: 10_000_000,
			amount_max: 200_000_000,
			tenor_min: 6,
			tenor_max: 36,
			max_financing: 65,
			fees: 'Administrasi Rp 300.000',
		},
	},

	// ---- Kredit Mobil -------------------------------------------------------------
	{
		slug: 'contoh-auto-finance-kredit-mobil-baru',
		title: 'Kredit Mobil Baru',
		product_category: 'kredit-mobil',
		provider: 'contoh-auto-finance',
		min_income: 6_000_000,
		summary: 'Bunga flat mulai 4,5% per tahun untuk mobil baru, uang muka mulai 20%.',
		features: [
			ul(
				'Untuk mobil baru dari dealer resmi.',
				'Uang muka mulai 20%.',
				'Asuransi all risk tahun pertama dapat ikut dicicil.',
			),
		],
		apply_url: url('contoh-auto-finance', 'kredit-mobil-baru'),
		// CMS-25: a fictional commercial tie, so staging shows the PR units (ADR-0024).
		is_partner: true,
		data_checked_at: CHECKED,
		source_url: url('contoh-auto-finance', 'kredit-mobil-baru', '/syarat'),
		loan_specs: {
			rate_type: 'flat',
			rate_min: 4.5,
			rate_max: 6.5,
			amount_min: 50_000_000,
			amount_max: 1_500_000_000,
			tenor_min: 12,
			tenor_max: 60,
			down_payment_min: 20,
			fees: 'Administrasi Rp 2.500.000, asuransi sesuai harga mobil',
		},
	},
	{
		slug: 'contoh-multifinance-kredit-mobil',
		title: 'Kredit Mobil',
		product_category: 'kredit-mobil',
		provider: 'contoh-multifinance',
		min_income: 5_000_000,
		summary: 'Kredit mobil baru dan bekas dengan tenor sampai 5 tahun.',
		features: [
			ul(
				'Mobil baru dan bekas sampai usia 10 tahun.',
				'Tenor 12 sampai 60 bulan.',
				'Pilihan asuransi all risk atau total loss only.',
			),
		],
		apply_url: url('contoh-multifinance', 'kredit-mobil'),
		data_checked_at: CHECKED,
		source_url: url('contoh-multifinance', 'kredit-mobil', '/syarat'),
		loan_specs: {
			rate_type: 'flat',
			rate_min: 5,
			rate_max: 7.5,
			amount_min: 50_000_000,
			amount_max: 1_000_000_000,
			tenor_min: 12,
			tenor_max: 60,
			down_payment_min: 20,
			fees: 'Administrasi Rp 2.000.000',
		},
	},
	{
		slug: 'contoh-bank-utama-kredit-kendaraan',
		title: 'Kredit Kendaraan Bermotor',
		product_category: 'kredit-mobil',
		provider: 'contoh-bank-utama',
		min_income: 8_000_000,
		summary: 'Kredit mobil dari bank dengan bunga efektif, uang muka mulai 25%.',
		features: [
			ul(
				'Bunga efektif tetap selama tiga tahun pertama.',
				'Uang muka mulai 25%.',
				'Cicilan didebet otomatis dari rekening.',
			),
		],
		apply_url: url('contoh-bank-utama', 'kredit-kendaraan'),
		// CMS-25: a fictional commercial tie, so staging shows the PR units (ADR-0024).
		is_partner: true,
		data_checked_at: CHECKED,
		source_url: url('contoh-bank-utama', 'kredit-kendaraan', '/syarat'),
		loan_specs: {
			rate_type: 'efektif',
			rate_min: 7.5,
			rate_max: 9.5,
			amount_min: 100_000_000,
			amount_max: 2_000_000_000,
			tenor_min: 12,
			tenor_max: 60,
			down_payment_min: 25,
			fees: 'Provisi 0,5%, administrasi Rp 1.000.000',
		},
	},
	{
		slug: 'contoh-dana-kendaraan-kredit-mobil-bekas',
		title: 'Kredit Mobil Bekas',
		product_category: 'kredit-mobil',
		provider: 'contoh-dana-kendaraan',
		min_income: 4_000_000,
		summary: 'Khusus mobil bekas sampai usia 12 tahun, tenor hingga 4 tahun.',
		features: [
			ul(
				'Mobil bekas sampai usia 12 tahun.',
				'Pemeriksaan kondisi mobil sebelum persetujuan.',
				'Tenor 12 sampai 48 bulan.',
			),
		],
		apply_url: url('contoh-dana-kendaraan', 'kredit-mobil-bekas'),
		data_checked_at: CHECKED,
		source_url: url('contoh-dana-kendaraan', 'kredit-mobil-bekas', '/syarat'),
		loan_specs: {
			rate_type: 'flat',
			rate_min: 6.5,
			rate_max: 9,
			amount_min: 30_000_000,
			amount_max: 500_000_000,
			tenor_min: 12,
			tenor_max: 48,
			down_payment_min: 25,
			fees: 'Administrasi Rp 1.500.000',
		},
	},
	{
		slug: 'contoh-bank-digital-kredit-mobil',
		title: 'Kredit Mobil Digital',
		product_category: 'kredit-mobil',
		provider: 'contoh-bank-digital',
		min_income: 6_000_000,
		summary: 'Kredit mobil lewat aplikasi dengan uang muka mulai 15%.',
		features: [
			ul(
				'Uang muka mulai 15%.',
				'Bunga efektif per tahun.',
				'Simulasi dan dokumen melalui aplikasi.',
			),
		],
		apply_url: url('contoh-bank-digital', 'kredit-mobil'),
		// CMS-25: a fictional commercial tie, so staging shows the PR units (ADR-0024).
		is_partner: true,
		data_checked_at: CHECKED,
		source_url: url('contoh-bank-digital', 'kredit-mobil', '/syarat'),
		loan_specs: {
			rate_type: 'efektif',
			rate_min: 8,
			rate_max: 10.5,
			amount_min: 50_000_000,
			amount_max: 800_000_000,
			tenor_min: 12,
			tenor_max: 60,
			down_payment_min: 15,
			fees: 'Administrasi Rp 1.000.000',
		},
	},
];
