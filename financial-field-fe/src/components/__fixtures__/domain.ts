import type {
	Article,
	ArticleSummary,
	ArticleVideo,
	AuthorSummary,
	CategoryNode,
	DialogueTurn,
	FinancialProduct,
	MainMenuEntry,
} from '@/types';

/** Synthetic data only: no real people, no personal data (REQ-TEST-003). */
const HOUR = 60 * 60 * 1000;

export const harnessNow = new Date('2026-11-03T08:00:00Z');

/** The writing team: articles carry it as their author, with no profile page (ADR-0022). */
export const writer: AuthorSummary = {
	id: 'author-1',
	slug: 'tim-redaksi-contoh',
	fullName: 'Tim Redaksi Contoh',
	roleTitle: 'Redaksi',
	credentials: null,
	avatar: null,
};

export const checker: AuthorSummary = {
	id: 'author-2',
	slug: 'contoh-peninjau',
	fullName: 'Contoh Peninjau',
	roleTitle: 'Perencana keuangan',
	credentials: 'CFP®',
	avatar: null,
};

const category = {
	id: 'cat-1',
	slug: 'pajak',
	name: 'Pajak',
	parentSlug: null,
	parentName: null,
};

/** A public institutional video, so the harness shows a real still (no people's data). */
export const videoFixture: ArticleVideo = {
	provider: 'youtube',
	id: 'vfXixW3BNqM',
	title: 'Tutorial Coretax Resmi : Panduan SPT Tahunan Wajib Pajak Orang Pribadi - Karyawan',
	channelName: 'Direktorat Jenderal Pajak',
	uploadedAt: '2025-09-29T07:52:49.000Z',
	durationSeconds: 1006,
	caption:
		'Keterangan video dari redaksi: apa yang ditampilkan video dan mengapa ada di artikel ini.',
};

/** Interview turns (CMS-31): left and right, a role, a two-paragraph message, no avatars. */
export const dialogueFixture: DialogueTurn[] = [
	{
		speakerName: 'Contoh Penulis',
		speakerRole: 'Penulis keuangan',
		avatar: null,
		paragraphs: ['Pertanyaan pertama dari pewawancara?'],
		position: 'left',
	},
	{
		speakerName: 'Narasumber Contoh',
		speakerRole: 'Perencana keuangan',
		avatar: null,
		paragraphs: [
			'Jawaban narasumber, paragraf pertama.',
			'Paragraf kedua dari jawaban yang sama.',
		],
		position: 'right',
	},
	{
		speakerName: 'Narasumber Tanpa Peran',
		speakerRole: null,
		avatar: null,
		paragraphs: ['Giliran tanpa peran: hanya nama yang tampil.'],
		position: 'right',
	},
];

export function summary(overrides: Partial<ArticleSummary> = {}): ArticleSummary {
	return {
		id: overrides.id ?? 'article-1',
		slug: 'cara-menghitung-pajak-penghasilan',
		title: 'Cara menghitung pajak penghasilan karyawan dengan benar',
		leadText:
			'Pajak penghasilan karyawan dihitung dari penghasilan neto setahun dikurangi PTKP. Berikut langkahnya.',
		articleType: 'standard',
		featuredImage: null,
		video: null,
		primaryCategory: category,
		author: writer,
		verified: true,
		publishedAt: new Date(harnessNow.getTime() - 3 * HOUR).toISOString(),
		...overrides,
	};
}

export const articleFixture: Article = {
	...summary(),
	video: null,
	dialogue: [],
	body: [
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'Paragraf pembuka dengan ' },
				{ type: 'text', text: 'teks tebal', bold: true },
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'heading',
			level: 2,
			children: [{ type: 'text', text: 'Apa itu PTKP?' }],
		},
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'Tautan internal ke ' },
				{
					type: 'link',
					url: '/kategori/pajak',
					children: [{ type: 'text', text: 'topik Pajak' }],
				},
				{ type: 'text', text: '.' },
			],
		},
		{
			type: 'list',
			format: 'unordered',
			children: [
				{
					type: 'list-item',
					children: [{ type: 'text', text: 'Butir pertama' }],
				},
				{
					type: 'list-item',
					children: [{ type: 'text', text: 'Butir kedua' }],
				},
			],
		},
		{
			type: 'quote',
			children: [{ type: 'text', text: 'Kutipan contoh untuk gaya blockquote.' }],
		},
	],
	reviewer: checker,
	lastReviewedAt: new Date(harnessNow.getTime() - 2 * HOUR).toISOString(),
	categories: [category],
	tags: [
		{ id: 'tag-1', slug: 'pph-21', name: 'PPh 21' },
		{ id: 'tag-2', slug: 'karyawan', name: 'Karyawan' },
	],
	stocksMentioned: [],
	contentUpdatedAt: null,
	seo: null,
	sponsor: null,
	keyTakeaways: ['Poin penting pertama.', 'Poin penting kedua.'],
	faq: [
		{
			question: 'Pertanyaan contoh pertama?',
			answer: 'Jawaban contoh pertama.',
		},
		{ question: 'Pertanyaan contoh kedua?', answer: 'Jawaban contoh kedua.' },
	],
	sources: [
		{
			title: 'Contoh sumber resmi',
			publisher: 'Lembaga Contoh',
			url: 'https://example.org/sumber',
			accessedOn: '2026-10-01',
		},
	],
	corrections: [{ date: '2026-11-01', note: 'Contoh koreksi angka pada paragraf kedua.' }],
};

export const categoriesFixture: CategoryNode[] = [
	{
		...category,
		description: null,
		navOrder: 1,
		children: [
			{
				id: 'cat-2',
				slug: 'pph',
				name: 'PPh',
				parentSlug: 'pajak',
				parentName: 'Pajak',
			},
		],
	},
	{
		id: 'cat-3',
		slug: 'investasi',
		name: 'Investasi',
		parentSlug: null,
		parentName: null,
		description: null,
		navOrder: 2,
		children: [],
	},
];

/** The header menu as the owner ordered it (ADR-0022), trimmed for tests and the harness. */
export const menuFixture: MainMenuEntry[] = [
	{
		kind: 'topics',
		label: 'Berita',
		topics: categoriesFixture,
		views: [
			{ label: 'Terbaru', href: '/terbaru' },
			{ label: 'Wawancara', href: '/wawancara' },
			{ label: 'Video', href: '/video' },
		],
	},
	{
		kind: 'menu',
		label: 'Bandingkan',
		groups: [
			{
				heading: { label: 'Pinjaman', href: '/bandingkan/pinjaman' },
				links: [{ label: 'Jaminan BPKB', href: '/bandingkan/jaminan-bpkb' }],
			},
		],
		footer: { label: 'Semua perbandingan', href: '/bandingkan' },
	},
	{ kind: 'link', label: 'Kamus Keuangan', href: '/kamus-keuangan' },
	{
		kind: 'menu',
		label: 'Tentang Kami',
		groups: [{ heading: null, links: [{ label: 'Redaksi', href: '/tentang-kami/redaksi' }] }],
		footer: null,
	},
];

/** A fictional loan product for the comparison specimens (ADR-0022). */
export const productFixture: FinancialProduct = {
	id: 'product-1',
	slug: 'contoh-penyedia-kredit-mobil',
	title: 'Kredit Mobil Contoh',
	summary: 'Bunga flat mulai 5% per tahun, uang muka mulai 20%.',
	section: {
		id: 'section-1',
		slug: 'kredit-mobil',
		name: 'Kredit Mobil',
		parentSlug: 'pinjaman',
		parentName: 'Pinjaman',
	},
	provider: { id: 'provider-1', slug: 'contoh-penyedia', name: 'Penyedia Contoh', logo: null },
	minIncome: 5_000_000,
	annualFeeText: null,
	features: [],
	featureHighlights: ['Uang muka mulai 20%.', 'Tenor sampai 60 bulan.'],
	officialUrl: 'https://example.com/contoh-penyedia/kredit-mobil',
	image: null,
	dataCheckedAt: '2026-11-15',
	sourceUrl: null,
	isPartner: false,
	loan: {
		rateType: 'flat',
		rateMin: 5,
		rateMax: 7.5,
		amountMin: 50_000_000,
		amountMax: 1_000_000_000,
		tenorMin: 12,
		tenorMax: 60,
		downPaymentMin: 20,
		maxFinancing: null,
		fees: 'Administrasi Rp 2.000.000',
	},
	seo: null,
};
