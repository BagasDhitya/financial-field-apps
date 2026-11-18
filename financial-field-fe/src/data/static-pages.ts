import { h2, link, ol, p, ul } from './blocks';
import { GLOSSARY } from './glossary';
import type { StaticPageEntry } from './types';

/** One line until the client sends the real text (OQ-13). */
const PLACEHOLDER = [p('Informasi lengkap untuk halaman ini sedang disiapkan oleh redaksi.')];

/**
 * Trust, legal and reference pages (PRP-0002.p1 §S1, planned CMS-13):
 * /tentang-kami, its sub-pages, /hubungi-kami and /kamus-keuangan. Redaksi and
 * Metodologi Perbandingan describe how this site works, so they have demo
 * text; the legal pages wait for the client (OQ-13).
 */
export const STATIC_PAGES: StaticPageEntry[] = [
	{
		slug: 'tentang-kami',
		title: 'Tentang Financial Field Indonesia',
		group: 'tentang-kami',
		body: PLACEHOLDER,
		updatedAt: '2026-11-09T02:00:00.000Z',
	},
	{
		slug: 'redaksi',
		title: 'Redaksi',
		group: 'tentang-kami',
		body: [
			p(
				'Artikel Financial Field Indonesia ditulis oleh Tim Redaksi Financial Field. Kami tidak mencantumkan nama penulis satu per satu: setiap artikel adalah hasil kerja tim, dari riset, penulisan, sampai penyuntingan.',
			),
			h2('Artikel terverifikasi'),
			p(
				'Sebagian artikel juga diperiksa oleh seorang peninjau: perencana keuangan atau analis yang menguasai topiknya. Peninjau memeriksa angka, aturan yang dikutip, dan kewajaran saran. Artikel yang sudah diperiksa diberi tanda Terverifikasi, lengkap dengan nama peninjau dan tanggal pemeriksaannya.',
			),
			p(
				'Artikel tanpa tanda itu tetap melewati penyuntingan redaksi, tetapi belum diperiksa oleh peninjau. Cara kerja kami dijelaskan lebih lanjut di ',
				link('/tentang-kami/kebijakan-editorial', 'Kebijakan Editorial'),
				'.',
			),
			h2('Para peninjau'),
			p(
				'Profil lengkap setiap peninjau, termasuk latar belakang dan pandangan keuangannya, dapat dibuka dari daftar berikut.',
			),
		],
		updatedAt: '2026-11-18T02:00:00.000Z',
	},
	{
		slug: 'metodologi-perbandingan',
		title: 'Metodologi Perbandingan',
		group: 'tentang-kami',
		body: [
			p(
				'Halaman Bandingkan membantu pembaca melihat beberapa produk pinjaman secara berdampingan. Halaman ini menjelaskan dari mana datanya, bagaimana urutannya ditentukan, dan bagaimana estimasi cicilan dihitung.',
			),
			h2('Sumber data'),
			p(
				'Data produk dicatat oleh redaksi dari halaman resmi setiap penyedia. Setiap produk menampilkan tanggal terakhir datanya diperiksa. Bunga, biaya, dan syarat dapat berubah sewaktu-waktu, jadi pastikan kembali di situs resmi penyedia sebelum mengambil keputusan.',
			),
			h2('Urutan produk'),
			ul(
				'Tanpa jawaban, produk diurutkan menurut nama penyedia, lalu nama produk.',
				'Setelah Anda mengisi kebutuhan, produk yang sesuai diurutkan dari estimasi cicilan terendah.',
				'Produk yang tidak sesuai dengan jawaban Anda tetap ditampilkan di bagian "Produk lain".',
				'Tidak ada penyedia yang membayar untuk mendapat urutan lebih atas.',
			),
			h2('Cara estimasi cicilan dihitung'),
			p(
				'Estimasi memakai bunga terendah yang diumumkan penyedia dan metode bunganya. Untuk bunga flat, cicilan = pokok ÷ tenor + pokok × bunga per tahun ÷ 12. Untuk bunga efektif, cicilan dihitung dengan rumus anuitas. Estimasi belum termasuk provisi, administrasi, dan asuransi, sehingga penawaran sebenarnya bisa berbeda.',
			),
			h2('Kapan sebuah produk dianggap sesuai'),
			ol(
				'Jumlah pinjaman berada di antara plafon minimum dan maksimum produk.',
				'Tenor yang Anda pilih tersedia untuk produk tersebut.',
				'Untuk kredit mobil, uang muka Anda tidak kurang dari uang muka minimum produk.',
				'Penghasilan Anda tidak kurang dari syarat penghasilan minimum, bila Anda mengisinya.',
			),
			p(
				'"Sesuai" hanya berarti cocok dengan syarat yang diumumkan, bukan jaminan permohonan disetujui. Keputusan tetap ada pada penyedia.',
			),
			h2('Privasi jawaban Anda'),
			p(
				'Jawaban yang Anda isi hanya disimpan di peramban Anda selama sesi berlangsung. Jawaban tidak dikirim ke server kami, tidak masuk ke alamat halaman, dan tidak dicatat oleh analitik.',
			),
			h2('Tautan ke penyedia'),
			p(
				'Tombol "Kunjungi situs resmi" membuka halaman produk di situs penyedia. Hubungan komersial dengan penyedia, bila ada, dijelaskan di ',
				link('/tentang-kami/pengungkapan-afiliasi', 'Pengungkapan Afiliasi'),
				'.',
			),
		],
		updatedAt: '2026-11-18T02:00:00.000Z',
	},
	{
		slug: 'kebijakan-editorial',
		title: 'Kebijakan Editorial',
		group: 'tentang-kami',
		body: PLACEHOLDER,
		updatedAt: '2026-11-09T02:00:00.000Z',
	},
	{
		slug: 'pengungkapan-afiliasi',
		title: 'Pengungkapan Afiliasi',
		group: 'tentang-kami',
		body: PLACEHOLDER,
		updatedAt: '2026-11-09T02:00:00.000Z',
	},
	{
		slug: 'koreksi-berita',
		title: 'Kebijakan Koreksi',
		group: 'tentang-kami',
		body: PLACEHOLDER,
		updatedAt: '2026-11-09T02:00:00.000Z',
	},
	{
		slug: 'kebijakan-privasi',
		title: 'Kebijakan Privasi',
		group: 'legal',
		body: PLACEHOLDER,
		updatedAt: '2026-11-09T02:00:00.000Z',
	},
	{
		slug: 'syarat-penggunaan',
		title: 'Syarat Penggunaan',
		group: 'legal',
		body: PLACEHOLDER,
		updatedAt: '2026-11-09T02:00:00.000Z',
	},
	{
		slug: 'hubungi-kami',
		title: 'Hubungi Kami',
		group: 'tentang-kami',
		body: PLACEHOLDER,
		updatedAt: '2026-11-09T02:00:00.000Z',
	},
	{
		slug: 'kamus-keuangan',
		title: 'Kamus Keuangan',
		group: 'referensi',
		body: GLOSSARY,
		updatedAt: '2026-11-18T02:00:00.000Z',
	},
];
