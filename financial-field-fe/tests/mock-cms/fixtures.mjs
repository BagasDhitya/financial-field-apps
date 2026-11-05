/**
 * Synthetic CMS data in Strapi 5 REST shape, matching the Phase 1 contract
 * (SPC-content-model, every CMS-nn applied). No real people, no personal
 * data (REQ-TEST-003). Dates are fixed so tests are deterministic.
 */

const media = (name, alt) => ({
	url: `/uploads/${name}.png`,
	mime: 'image/png',
	width: 1600,
	height: 900,
	alternativeText: alt,
});

export const authors = [
	{
		documentId: 'author-writer',
		full_name: 'Penulis Satu',
		slug: 'penulis-satu',
		role_title: 'Jurnalis keuangan',
		credentials: null,
		bio: 'Penulis Satu adalah penulis contoh untuk pengujian situs.',
		avatar: media('avatar-penulis', 'Foto Penulis Satu'),
		same_as: [{ url: 'https://www.linkedin.com/in/contoh-penulis' }],
		expertise: ['Pajak', 'Gaji'],
		is_reviewer: false,
	},
	{
		documentId: 'author-cfp',
		full_name: 'Peninjau Dua',
		slug: 'peninjau-dua',
		role_title: 'Perencana keuangan',
		credentials: 'CFP®',
		bio: 'Peninjau Dua adalah peninjau contoh bersertifikat untuk pengujian.',
		avatar: null,
		same_as: [],
		expertise: ['Perencanaan keuangan'],
		is_reviewer: true,
	},
];

const top = (documentId, slug, name, nav_order, description) => ({
	documentId,
	slug,
	name,
	nav_order,
	show_in_nav: true,
	description,
	parent_category: null,
	seo: null,
});

export const categories = [
	top('cat-pajak', 'pajak', 'Pajak', 1, 'Panduan pajak untuk karyawan dan pelaku usaha.'),
	top('cat-investasi', 'investasi', 'Investasi', 2, 'Dasar-dasar investasi untuk pemula.'),
	top('cat-asuransi', 'asuransi', 'Asuransi', 3, 'Memilih asuransi yang sesuai kebutuhan.'),
	top('cat-pinjaman', 'pinjaman', 'Pinjaman', 4, 'Memahami pinjaman dan cicilan.'),
	top(
		'cat-kosong',
		'kosong',
		'Kategori Kosong',
		5,
		'Kategori tanpa artikel untuk menguji keadaan kosong.',
	),
	{
		documentId: 'cat-pph',
		slug: 'pph',
		name: 'PPh',
		nav_order: 1,
		show_in_nav: true,
		description: 'Pajak penghasilan.',
		parent_category: { documentId: 'cat-pajak', slug: 'pajak', name: 'Pajak' },
		seo: null,
	},
];

const categoryRef = (slug) => {
	const found = categories.find((category) => category.slug === slug);
	return {
		documentId: found.documentId,
		slug: found.slug,
		name: found.name,
		parent_category: found.parent_category,
	};
};

export const tags = [
	{
		documentId: 'tag-karyawan',
		slug: 'pajak-karyawan',
		name: 'Pajak karyawan',
		description: 'Pajak untuk karyawan.',
	},
	{
		documentId: 'tag-reksa',
		slug: 'reksa-dana',
		name: 'Reksa dana',
		description: null,
	},
];

const tagRef = (slug) => tags.find((tag) => tag.slug === slug);

const paragraph = (text) => ({
	type: 'paragraph',
	children: [{ type: 'text', text }],
});

const day = (n) => `2026-10-${String(n).padStart(2, '0')}T03:00:00.000Z`;

function article(n, overrides = {}) {
	const slug = overrides.slug ?? `artikel-contoh-${n}`;
	return {
		documentId: `article-${n}`,
		slug,
		title: overrides.title ?? `Artikel contoh nomor ${n} tentang keuangan pribadi`,
		lead_text:
			overrides.lead_text ??
			`Ringkasan artikel contoh nomor ${n} yang menjawab pertanyaan utama secara singkat.`,
		article_type: 'standard',
		publishedAt: day(30 - n),
		first_published_at: day(30 - n),
		content_updated_at: null,
		last_reviewed_at: null,
		editorial_status: 'approved',
		featured_image: media(`artikel-${n}`, `Ilustrasi artikel ${n}`),
		primary_category: categoryRef(
			overrides.category ?? ['pajak', 'investasi', 'pinjaman'][n % 3],
		),
		author: authors[0],
		reviewer: null,
		categories: [],
		tags: [],
		stocks_mentioned: [],
		seo: null,
		sponsor_name: null,
		sponsor_url: null,
		sponsor_disclosure: null,
		faq: [],
		sources: [],
		key_takeaways: [],
		corrections: [],
		content: [paragraph(`Isi artikel contoh nomor ${n}. `.repeat(40))],
		...overrides,
		...(overrides.category ? { primary_category: categoryRef(overrides.category) } : {}),
	};
}

export const articles = [
	article(1, {
		slug: 'cara-menghitung-pph-21',
		title: 'Cara menghitung PPh 21 karyawan dengan contoh',
		lead_text:
			'PPh 21 dihitung dari penghasilan neto setahun dikurangi PTKP, lalu dikalikan tarif progresif.',
		category: 'pph',
		reviewer: authors[1],
		last_reviewed_at: day(29),
		content_updated_at: day(30),
		tags: [tagRef('pajak-karyawan')],
		key_takeaways: [
			{ text: 'PTKP mengurangi penghasilan kena pajak.' },
			{ text: 'Tarif PPh 21 bersifat progresif.' },
		],
		faq: [
			{
				question: 'Apa itu PTKP?',
				answer: 'Penghasilan tidak kena pajak, batas yang dikurangkan dari penghasilan neto.',
			},
			{
				question: 'Kapan PPh 21 dipotong?',
				answer: 'Setiap bulan oleh pemberi kerja.',
			},
		],
		sources: [
			{
				title: 'Peraturan contoh tentang PPh 21',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/peraturan',
				accessed_on: '2026-10-01',
			},
		],
		corrections: [{ date: '2026-10-27', note: 'Contoh koreksi pada angka tarif.' }],
		seo: {
			meta_title: 'Cara Menghitung PPh 21 Karyawan',
			meta_description:
				'Langkah menghitung PPh 21 karyawan dari penghasilan neto, PTKP, dan tarif progresif, lengkap dengan contoh.',
			focus_keyword: 'cara menghitung pph 21',
			og_image: null,
			canonical_url: null,
			no_index: false,
		},
		content: [
			{
				type: 'heading',
				level: 1,
				children: [{ type: 'text', text: 'Langkah menghitung' }],
			},
			paragraph('Mulailah dari penghasilan bruto setahun. '.repeat(30)),
			{
				type: 'paragraph',
				children: [
					{ type: 'text', text: 'Baca juga ' },
					{
						type: 'link',
						url: '/kategori/pajak',
						children: [{ type: 'text', text: 'topik Pajak' }],
					},
					{ type: 'text', text: ' dan ' },
					{
						type: 'link',
						url: 'https://example.org/sumber',
						children: [{ type: 'text', text: 'sumber resmi' }],
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
						children: [{ type: 'text', text: 'Hitung penghasilan neto' }],
					},
					{
						type: 'list-item',
						children: [{ type: 'text', text: 'Kurangi PTKP' }],
					},
				],
			},
		],
	}),
	article(2, {
		slug: 'pr-asuransi-kesehatan-keluarga',
		title: 'Asuransi kesehatan keluarga dari sponsor contoh',
		article_type: 'pr_article',
		category: 'asuransi',
		sponsor_name: 'Sponsor Contoh',
		sponsor_url: 'https://example.com',
		sponsor_disclosure: 'Artikel ini dibuat atas kerja sama dengan Sponsor Contoh.',
		content: [
			{
				type: 'paragraph',
				children: [
					{ type: 'text', text: 'Kunjungi ' },
					{
						type: 'link',
						url: 'https://example.com/produk',
						children: [{ type: 'text', text: 'situs sponsor' }],
					},
					{ type: 'text', text: '.' },
				],
			},
		],
	}),
	article(3, {
		slug: 'wawancara-perencana-keuangan',
		title: 'Wawancara dengan perencana keuangan contoh',
		article_type: 'interview',
		category: 'investasi',
		tags: [tagRef('reksa-dana')],
	}),
	article(4, { tags: [tagRef('pajak-karyawan')], category: 'pajak' }),
	article(5, { tags: [tagRef('pajak-karyawan')], category: 'pph' }),
	article(6, { featured_image: null }),
	article(7, { author: null, primary_category: null, category: undefined }),
	...Array.from({ length: 10 }, (_, index) => article(index + 8)),
];
// article(7) must have no category at all.
articles[6].primary_category = null;

export const draftOnly = article(30, {
	slug: 'draf-belum-terbit',
	title: 'Draf artikel yang belum terbit',
	publishedAt: null,
	first_published_at: null,
	editorial_status: 'fact_checked',
});

export const siteNavigation = {
	documentId: 'nav',
	menu_item: [],
	featured_articles: [articles[0], articles[1], articles[2], articles[3]],
};

const page = (slug, title, group = 'tentang-kami') => ({
	documentId: `page-${slug}`,
	slug,
	title,
	group,
	updatedAt: '2026-09-01T00:00:00.000Z',
	seo: null,
	body: [paragraph(`Isi halaman ${title} untuk pengujian.`)],
});

export const staticPages = [
	page('tentang-kami', 'Tentang Financial Field Indonesia'),
	page('redaksi', 'Redaksi'),
	page('kebijakan-editorial', 'Kebijakan Editorial'),
	page('pengungkapan-afiliasi', 'Pengungkapan Afiliasi'),
	page('koreksi-berita', 'Kebijakan Koreksi'),
	page('kebijakan-privasi', 'Kebijakan Privasi', 'legal'),
	page('syarat-penggunaan', 'Syarat Penggunaan', 'legal'),
	page('hubungi-kami', 'Hubungi Kami'),
];

export const siteSetting = {
	documentId: 'site',
	site_name: 'Financial Field Indonesia',
	tagline: 'Artikel dan panduan keuangan pribadi',
	description: 'Situs contoh untuk pengujian.',
	logo: null,
	default_og_image: null,
	social_links: [{ platform: 'Instagram', url: 'https://www.instagram.com/example' }],
	contact_email: 'redaksi@example.org',
	default_pr_disclosure: 'Artikel ini adalah konten bersponsor.',
};

export const redirects = [
	{
		from_path: '/artikel/slug-lama',
		to_path: '/artikel/slug-tengah',
		status_code: 301,
	},
	{
		from_path: '/artikel/slug-tengah',
		to_path: '/artikel/cara-menghitung-pph-21',
		status_code: 301,
	},
];

export const stockTickers = [];
