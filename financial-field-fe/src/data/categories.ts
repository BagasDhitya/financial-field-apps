import type { CategoryEntry } from './types';

/**
 * The topic tree (PRP-0002.p1 §S4.1): 13 top-level categories and 46
 * sub-categories, in menu order. Labels are working translations of the FF JP
 * topics until the client confirms them (OQ-06). Sub-category slugs carry their
 * parent's prefix so every slug is unique.
 */
export const CATEGORIES: CategoryEntry[] = [
	{
		slug: 'penghasilan',
		name: 'Penghasilan & Gaji',
		description:
			'Kumpulan artikel tentang penghasilan dan gaji: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [],
	},
	{
		slug: 'warisan',
		name: 'Warisan',
		description:
			'Kumpulan artikel tentang warisan dan perencanaan harta keluarga: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [
			{
				slug: 'warisan-wasiat',
				name: 'Surat Wasiat',
				description:
					'Kumpulan artikel tentang surat wasiat: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'warisan-pajak-biaya',
				name: 'Pajak & Biaya Warisan',
				description:
					'Kumpulan artikel tentang pajak dan biaya warisan: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'warisan-hibah',
				name: 'Hibah',
				description:
					'Kumpulan artikel tentang hibah kepada keluarga: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'warisan-pemakaman',
				name: 'Pemakaman',
				description:
					'Kumpulan artikel tentang perencanaan biaya pemakaman: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'warisan-lainnya',
				name: 'Warisan Lainnya',
				description:
					'Kumpulan artikel tentang topik warisan lainnya: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
		],
	},
	{
		slug: 'pajak',
		name: 'Pajak',
		description:
			'Kumpulan artikel tentang pajak pribadi: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [
			{
				slug: 'pajak-pengurang',
				name: 'Pengurang Pajak',
				description:
					'Kumpulan artikel tentang pengurang penghasilan kena pajak: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'pajak-pph21',
				name: 'PPh 21 & Bukti Potong',
				description:
					'Kumpulan artikel tentang PPh 21 dan bukti potong: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'pajak-spt-tahunan',
				name: 'SPT Tahunan',
				description:
					'Kumpulan artikel tentang pelaporan SPT Tahunan: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'pajak-zakat-donasi',
				name: 'Zakat & Donasi',
				description:
					'Kumpulan artikel tentang zakat dan donasi sebagai pengurang pajak: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'pajak-lainnya',
				name: 'Pajak Lainnya',
				description:
					'Kumpulan artikel tentang topik pajak lainnya: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
		],
	},
	{
		slug: 'pensiun',
		name: 'Pensiun',
		description:
			'Kumpulan artikel tentang program dan dana pensiun: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [
			{
				slug: 'pensiun-pemerintah',
				name: 'Program Pensiun Pemerintah',
				description:
					'Kumpulan artikel tentang program pensiun pemerintah: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'pensiun-pemberi-kerja',
				name: 'Dana Pensiun Pemberi Kerja',
				description:
					'Kumpulan artikel tentang dana pensiun dari pemberi kerja: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'pensiun-dplk',
				name: 'DPLK',
				description:
					'Kumpulan artikel tentang dana pensiun lembaga keuangan: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'pensiun-lainnya',
				name: 'Pensiun Lainnya',
				description:
					'Kumpulan artikel tentang topik pensiun lainnya: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
		],
	},
	{
		slug: 'asuransi',
		name: 'Asuransi',
		description:
			'Kumpulan artikel tentang asuransi untuk keluarga: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [
			{
				slug: 'asuransi-jiwa',
				name: 'Asuransi Jiwa',
				description:
					'Kumpulan artikel tentang asuransi jiwa: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'asuransi-umum',
				name: 'Asuransi Umum',
				description:
					'Kumpulan artikel tentang asuransi umum dan kerugian: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'asuransi-kendaraan',
				name: 'Asuransi Kendaraan',
				description:
					'Kumpulan artikel tentang asuransi kendaraan: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'asuransi-pendidikan',
				name: 'Asuransi Pendidikan',
				description:
					'Kumpulan artikel tentang asuransi pendidikan anak: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'asuransi-kesehatan',
				name: 'Asuransi Kesehatan',
				description:
					'Kumpulan artikel tentang asuransi kesehatan: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'asuransi-lainnya',
				name: 'Asuransi Lainnya',
				description:
					'Kumpulan artikel tentang topik asuransi lainnya: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
		],
	},
	{
		slug: 'pinjaman',
		name: 'Pinjaman',
		description:
			'Kumpulan artikel tentang pinjaman dan cicilan: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [
			{
				slug: 'pinjaman-kpr',
				name: 'KPR',
				description:
					'Kumpulan artikel tentang kredit pemilikan rumah: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'pinjaman-pendidikan',
				name: 'Pinjaman Pendidikan',
				description:
					'Kumpulan artikel tentang pinjaman pendidikan: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'pinjaman-lainnya',
				name: 'Pinjaman Lainnya',
				description:
					'Kumpulan artikel tentang topik pinjaman lainnya: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
		],
	},
	{
		slug: 'investasi',
		name: 'Investasi',
		description:
			'Kumpulan artikel tentang investasi untuk pemula: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [
			{
				slug: 'investasi-reksa-dana',
				name: 'Reksa Dana & Investasi Rutin',
				description:
					'Kumpulan artikel tentang reksa dana dan investasi rutin: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'investasi-properti',
				name: 'Investasi Properti',
				description:
					'Kumpulan artikel tentang investasi properti: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'investasi-saham-valas',
				name: 'Saham & Valas',
				description:
					'Kumpulan artikel tentang saham dan valuta asing: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'investasi-lainnya',
				name: 'Investasi Lainnya',
				description:
					'Kumpulan artikel tentang topik investasi lainnya: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'investasi-properti-lahan',
				name: 'Jual Properti & Lahan',
				description:
					'Kumpulan artikel tentang penjualan properti dan pemanfaatan lahan: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
		],
	},
	{
		slug: 'gaya-hidup',
		name: 'Gaya Hidup',
		description:
			'Kumpulan artikel tentang keuangan dalam kehidupan sehari-hari: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [
			{
				slug: 'gaya-hidup-anak',
				name: 'Anak & Keluarga',
				description:
					'Kumpulan artikel tentang biaya membesarkan anak: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'gaya-hidup-rumah',
				name: 'Perabot & Rumah',
				description:
					'Kumpulan artikel tentang perabot dan kebutuhan rumah: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'gaya-hidup-nontunai',
				name: 'Nontunai',
				description:
					'Kumpulan artikel tentang pembayaran nontunai: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'gaya-hidup-hewan',
				name: 'Hewan Peliharaan',
				description:
					'Kumpulan artikel tentang biaya hewan peliharaan: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'gaya-hidup-lainnya',
				name: 'Gaya Hidup Lainnya',
				description:
					'Kumpulan artikel tentang topik gaya hidup lainnya: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
		],
	},
	{
		slug: 'hari-tua',
		name: 'Hari Tua',
		description:
			'Kumpulan artikel tentang persiapan keuangan hari tua: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [
			{
				slug: 'hari-tua-perawatan',
				name: 'Perawatan Lansia',
				description:
					'Kumpulan artikel tentang biaya perawatan lansia: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'hari-tua-pensiun-kerja',
				name: 'Berhenti Bekerja',
				description:
					'Kumpulan artikel tentang persiapan berhenti bekerja: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'hari-tua-kehidupan-kedua',
				name: 'Kehidupan Kedua',
				description:
					'Kumpulan artikel tentang kehidupan setelah pensiun: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'hari-tua-lainnya',
				name: 'Hari Tua Lainnya',
				description:
					'Kumpulan artikel tentang topik hari tua lainnya: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
		],
	},
	{
		slug: 'keuangan-keluarga',
		name: 'Keuangan Keluarga',
		description:
			'Kumpulan artikel tentang anggaran dan tabungan keluarga: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [
			{
				slug: 'keluarga-anggaran',
				name: 'Evaluasi Anggaran',
				description:
					'Kumpulan artikel tentang evaluasi anggaran keluarga: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'keluarga-menabung',
				name: 'Menabung',
				description:
					'Kumpulan artikel tentang kebiasaan menabung: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'keluarga-rencana-hidup',
				name: 'Rencana Hidup',
				description:
					'Kumpulan artikel tentang rencana keuangan jangka panjang: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'keluarga-cara-bekerja',
				name: 'Cara Bekerja',
				description:
					'Kumpulan artikel tentang penghasilan dari berbagai cara bekerja: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'keluarga-lainnya',
				name: 'Keuangan Keluarga Lainnya',
				description:
					'Kumpulan artikel tentang topik keuangan keluarga lainnya: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'keluarga-tagihan-ponsel',
				name: 'Tagihan Ponsel & Internet',
				description:
					'Kumpulan artikel tentang tagihan ponsel dan internet: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
		],
	},
	{
		slug: 'karier',
		name: 'Karier',
		description:
			'Kumpulan artikel tentang karier dan penghasilan: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [],
	},
	{
		slug: 'kartu-kredit',
		name: 'Kartu Kredit',
		description:
			'Kumpulan artikel tentang penggunaan kartu kredit: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [],
	},
	{
		slug: 'bisnis',
		name: 'Bisnis',
		description:
			'Kumpulan artikel tentang keuangan usaha kecil: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
		children: [
			{
				slug: 'bisnis-pembiayaan',
				name: 'Pembiayaan Usaha',
				description:
					'Kumpulan artikel tentang pembiayaan usaha: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'bisnis-pemasaran',
				name: 'Pemasaran',
				description:
					'Kumpulan artikel tentang pemasaran usaha kecil: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
			{
				slug: 'bisnis-lainnya',
				name: 'Bisnis Lainnya',
				description:
					'Kumpulan artikel tentang topik bisnis lainnya: penjelasan dasar, langkah praktis, contoh perhitungan sederhana, dan kesalahan yang sering terjadi.',
			},
		],
	},
];
