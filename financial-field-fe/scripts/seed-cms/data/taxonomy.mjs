/**
 * PRP-0002.p1 §S4.1–§S4.2: every FF JP article topic as a working FFID
 * category (labels pending OQ-06; † adapted topics pending OQ-33), and the
 * locked tag vocabulary. `jp` records the source topic for traceability.
 */

/** @typedef {{ slug: string, name: string, jp: string, description: string, adapted?: boolean }} Sub */
/** @typedef {{ slug: string, name: string, jp: string, description: string, subs: Sub[] }} Top */

const d = (topic) =>
	`Artikel contoh tentang ${topic}: penjelasan dasar, langkah praktis, dan contoh angka fiktif untuk menguji situs Financial Field Indonesia.`;

/** @type {Top[]} */
export const CATEGORIES = [
	{
		slug: 'penghasilan',
		name: 'Penghasilan & Gaji',
		jp: '年収',
		description: d('penghasilan dan gaji'),
		subs: [],
	},
	{
		slug: 'warisan',
		name: 'Warisan',
		jp: '相続',
		description: d('warisan dan perencanaan harta keluarga'),
		subs: [
			{
				slug: 'warisan-wasiat',
				name: 'Surat Wasiat',
				jp: '遺言書',
				description: d('surat wasiat'),
			},
			{
				slug: 'warisan-pajak-biaya',
				name: 'Pajak & Biaya Warisan',
				jp: '相続税',
				description: d('pajak dan biaya warisan'),
				adapted: true,
			},
			{
				slug: 'warisan-hibah',
				name: 'Hibah',
				jp: '贈与',
				description: d('hibah kepada keluarga'),
			},
			{
				slug: 'warisan-pemakaman',
				name: 'Pemakaman',
				jp: '葬儀',
				description: d('perencanaan biaya pemakaman'),
			},
			{
				slug: 'warisan-lainnya',
				name: 'Warisan Lainnya',
				jp: 'その他相続',
				description: d('topik warisan lainnya'),
			},
		],
	},
	{
		slug: 'pajak',
		name: 'Pajak',
		jp: '税金',
		description: d('pajak pribadi'),
		subs: [
			{
				slug: 'pajak-pengurang',
				name: 'Pengurang Pajak',
				jp: '控除',
				description: d('pengurang penghasilan kena pajak'),
			},
			{
				slug: 'pajak-pph21',
				name: 'PPh 21 & Bukti Potong',
				jp: '年末調整',
				description: d('PPh 21 dan bukti potong'),
				adapted: true,
			},
			{
				slug: 'pajak-spt-tahunan',
				name: 'SPT Tahunan',
				jp: '確定申告',
				description: d('pelaporan SPT Tahunan'),
			},
			{
				slug: 'pajak-zakat-donasi',
				name: 'Zakat & Donasi',
				jp: 'ふるさと納税',
				description: d('zakat dan donasi sebagai pengurang pajak'),
				adapted: true,
			},
			{
				slug: 'pajak-lainnya',
				name: 'Pajak Lainnya',
				jp: 'その他税金',
				description: d('topik pajak lainnya'),
			},
		],
	},
	{
		slug: 'pensiun',
		name: 'Pensiun',
		jp: '年金',
		description: d('program dan dana pensiun'),
		subs: [
			{
				slug: 'pensiun-pemerintah',
				name: 'Program Pensiun Pemerintah',
				jp: '国民年金',
				description: d('program pensiun pemerintah'),
				adapted: true,
			},
			{
				slug: 'pensiun-pemberi-kerja',
				name: 'Dana Pensiun Pemberi Kerja',
				jp: '厚生年金',
				description: d('dana pensiun dari pemberi kerja'),
				adapted: true,
			},
			{
				slug: 'pensiun-dplk',
				name: 'DPLK',
				jp: 'iDeCo',
				description: d('dana pensiun lembaga keuangan'),
				adapted: true,
			},
			{
				slug: 'pensiun-lainnya',
				name: 'Pensiun Lainnya',
				jp: 'その他年金',
				description: d('topik pensiun lainnya'),
			},
		],
	},
	{
		slug: 'asuransi',
		name: 'Asuransi',
		jp: '保険',
		description: d('asuransi untuk keluarga'),
		subs: [
			{
				slug: 'asuransi-jiwa',
				name: 'Asuransi Jiwa',
				jp: '生命保険',
				description: d('asuransi jiwa'),
			},
			{
				slug: 'asuransi-umum',
				name: 'Asuransi Umum',
				jp: '損害保険',
				description: d('asuransi umum dan kerugian'),
			},
			{
				slug: 'asuransi-kendaraan',
				name: 'Asuransi Kendaraan',
				jp: '自動車保険',
				description: d('asuransi kendaraan'),
			},
			{
				slug: 'asuransi-pendidikan',
				name: 'Asuransi Pendidikan',
				jp: '学資保険',
				description: d('asuransi pendidikan anak'),
			},
			{
				slug: 'asuransi-kesehatan',
				name: 'Asuransi Kesehatan',
				jp: '医療保険',
				description: d('asuransi kesehatan'),
			},
			{
				slug: 'asuransi-lainnya',
				name: 'Asuransi Lainnya',
				jp: 'その他保険',
				description: d('topik asuransi lainnya'),
			},
		],
	},
	{
		slug: 'pinjaman',
		name: 'Pinjaman',
		jp: 'ローン',
		description: d('pinjaman dan cicilan'),
		subs: [
			{
				slug: 'pinjaman-kpr',
				name: 'KPR',
				jp: '住宅ローン',
				description: d('kredit pemilikan rumah'),
			},
			{
				slug: 'pinjaman-pendidikan',
				name: 'Pinjaman Pendidikan',
				jp: '教育ローン',
				description: d('pinjaman pendidikan'),
			},
			{
				slug: 'pinjaman-lainnya',
				name: 'Pinjaman Lainnya',
				jp: 'その他ローン',
				description: d('topik pinjaman lainnya'),
			},
		],
	},
	{
		slug: 'investasi',
		name: 'Investasi',
		jp: '資産運用',
		description: d('investasi untuk pemula'),
		subs: [
			{
				slug: 'investasi-reksa-dana',
				name: 'Reksa Dana & Investasi Rutin',
				jp: 'NISA',
				description: d('reksa dana dan investasi rutin'),
				adapted: true,
			},
			{
				slug: 'investasi-properti',
				name: 'Investasi Properti',
				jp: '不動産投資',
				description: d('investasi properti'),
			},
			{
				slug: 'investasi-saham-valas',
				name: 'Saham & Valas',
				jp: '株・株式・FX投資',
				description: d('saham dan valuta asing'),
			},
			{
				slug: 'investasi-lainnya',
				name: 'Investasi Lainnya',
				jp: 'その他資産運用',
				description: d('topik investasi lainnya'),
			},
			{
				slug: 'investasi-properti-lahan',
				name: 'Jual Properti & Lahan',
				jp: '不動産売却・土地活用・注文住宅',
				description: d('penjualan properti dan pemanfaatan lahan'),
			},
		],
	},
	{
		slug: 'gaya-hidup',
		name: 'Gaya Hidup',
		jp: '暮らし',
		description: d('keuangan dalam kehidupan sehari-hari'),
		subs: [
			{
				slug: 'gaya-hidup-anak',
				name: 'Anak & Keluarga',
				jp: '子育て',
				description: d('biaya membesarkan anak'),
			},
			{
				slug: 'gaya-hidup-rumah',
				name: 'Perabot & Rumah',
				jp: '家具・片付け',
				description: d('perabot dan kebutuhan rumah'),
			},
			{
				slug: 'gaya-hidup-nontunai',
				name: 'Nontunai',
				jp: 'キャッシュレス',
				description: d('pembayaran nontunai'),
			},
			{
				slug: 'gaya-hidup-hewan',
				name: 'Hewan Peliharaan',
				jp: 'ペット',
				description: d('biaya hewan peliharaan'),
			},
			{
				slug: 'gaya-hidup-lainnya',
				name: 'Gaya Hidup Lainnya',
				jp: 'その他暮らし',
				description: d('topik gaya hidup lainnya'),
			},
		],
	},
	{
		slug: 'hari-tua',
		name: 'Hari Tua',
		jp: '老後',
		description: d('persiapan keuangan hari tua'),
		subs: [
			{
				slug: 'hari-tua-perawatan',
				name: 'Perawatan Lansia',
				jp: '介護',
				description: d('biaya perawatan lansia'),
			},
			{
				slug: 'hari-tua-pensiun-kerja',
				name: 'Berhenti Bekerja',
				jp: '定年・退職',
				description: d('persiapan berhenti bekerja'),
			},
			{
				slug: 'hari-tua-kehidupan-kedua',
				name: 'Kehidupan Kedua',
				jp: 'セカンドライフ',
				description: d('kehidupan setelah pensiun'),
			},
			{
				slug: 'hari-tua-lainnya',
				name: 'Hari Tua Lainnya',
				jp: 'その他老後',
				description: d('topik hari tua lainnya'),
			},
		],
	},
	{
		slug: 'keuangan-keluarga',
		name: 'Keuangan Keluarga',
		jp: '家計',
		description: d('anggaran dan tabungan keluarga'),
		subs: [
			{
				slug: 'keluarga-anggaran',
				name: 'Evaluasi Anggaran',
				jp: '家計の見直し',
				description: d('evaluasi anggaran keluarga'),
			},
			{
				slug: 'keluarga-menabung',
				name: 'Menabung',
				jp: '貯金',
				description: d('kebiasaan menabung'),
			},
			{
				slug: 'keluarga-rencana-hidup',
				name: 'Rencana Hidup',
				jp: 'ライフプラン',
				description: d('rencana keuangan jangka panjang'),
			},
			{
				slug: 'keluarga-cara-bekerja',
				name: 'Cara Bekerja',
				jp: '働き方',
				description: d('penghasilan dari berbagai cara bekerja'),
			},
			{
				slug: 'keluarga-lainnya',
				name: 'Keuangan Keluarga Lainnya',
				jp: 'その他家計',
				description: d('topik keuangan keluarga lainnya'),
			},
			{
				slug: 'keluarga-tagihan-ponsel',
				name: 'Tagihan Ponsel & Internet',
				jp: 'スマホの見直し',
				description: d('tagihan ponsel dan internet'),
			},
		],
	},
	{
		slug: 'karier',
		name: 'Karier',
		jp: 'キャリア',
		description: d('karier dan penghasilan'),
		subs: [],
	},
	{
		slug: 'kartu-kredit',
		name: 'Kartu Kredit',
		jp: 'クレカ',
		description: d('penggunaan kartu kredit'),
		subs: [],
	},
	{
		slug: 'bisnis',
		name: 'Bisnis',
		jp: 'ビジネス',
		description: d('keuangan usaha kecil'),
		subs: [
			{
				slug: 'bisnis-pembiayaan',
				name: 'Pembiayaan Usaha',
				jp: '融資',
				description: d('pembiayaan usaha'),
			},
			{
				slug: 'bisnis-pemasaran',
				name: 'Pemasaran',
				jp: 'マーケティング',
				description: d('pemasaran usaha kecil'),
			},
			{
				slug: 'bisnis-lainnya',
				name: 'Bisnis Lainnya',
				jp: 'その他ビジネス',
				description: d('topik bisnis lainnya'),
			},
		],
	},
];

/** Marker on every seed article; hidden from TagList and sitemaps (T63). */
export const MARKER_TAG = 'data-contoh';

/** §S4.2: 21 tags including the marker. */
export const TAGS = [
	[MARKER_TAG, 'Data contoh'],
	['pajak-karyawan', 'Pajak karyawan'],
	['spt', 'SPT'],
	['dana-darurat', 'Dana darurat'],
	['anggaran-bulanan', 'Anggaran bulanan'],
	['reksa-dana', 'Reksa dana'],
	['saham', 'Saham'],
	['kpr', 'KPR'],
	['kartu-kredit', 'Kartu kredit'],
	['asuransi-kesehatan', 'Asuransi kesehatan'],
	['asuransi-jiwa', 'Asuransi jiwa'],
	['pensiun', 'Pensiun'],
	['warisan-keluarga', 'Warisan keluarga'],
	['umkm', 'UMKM'],
	['gaji', 'Gaji'],
	['investasi-pemula', 'Investasi pemula'],
	['nontunai', 'Nontunai'],
	['keluarga-muda', 'Keluarga muda'],
	['lansia', 'Lansia'],
	['pinjaman-pendidikan', 'Pinjaman pendidikan'],
	['karier-awal', 'Karier awal'],
].map(([slug, name]) => ({
	slug,
	name,
	description: `Topik contoh: ${name.toLowerCase()}. Bagian dari data contoh untuk pengujian situs.`,
}));

/** Flat list: parents first, then children (write order, §S4.8). */
export function allCategories() {
	const parents = CATEGORIES.map(({ subs: _subs, ...top }) => ({
		...top,
		parent: null,
	}));
	const children = CATEGORIES.flatMap((top) =>
		top.subs.map((sub) => ({ ...sub, parent: top.slug })),
	);
	return [...parents, ...children];
}

/** The top-level slug a category belongs to (itself when top-level). */
export function topLevelOf(slug) {
	const top = CATEGORIES.find(
		(category) => category.slug === slug || category.subs.some((sub) => sub.slug === slug),
	);
	return top ? top.slug : null;
}

/**
 * Display name for a category slug. Falls back to the slug, so a payload never
 * carries an empty name.
 */
export function categoryName(slug) {
	return allCategories().find((category) => category.slug === slug)?.name ?? slug;
}
