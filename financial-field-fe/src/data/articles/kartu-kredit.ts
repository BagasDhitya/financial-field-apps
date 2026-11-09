import { h2, link, p, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Demo articles in Kartu Kredit and its sub-categories (PRP-0002.p1 §S4.4). */
export const KARTU_KREDIT_ARTICLES: ArticleEntry[] = [
	{
		slug: 'pr-kartu-kredit-cashback-contoh',
		title: 'Kartu kredit dengan cashback dari Penerbit Contoh: cara kerja dan biayanya',
		leadText:
			'Artikel bersponsor ini menjelaskan kartu kredit dengan cashback dari Penerbit Contoh. Simak cara kerja, biaya, dan hal yang perlu diperhatikan dalam artikel berikut.',
		articleType: 'pr_article',
		category: 'kartu-kredit',
		tags: ['kartu-kredit'],
		author: 'redaksi-contoh',
		image: 'kategori-kartu-kredit',
		publishedAt: '2026-08-21T16:00:00.000Z',
		sponsor: {
			name: 'Sponsor Contoh',
			url: 'https://example.com',
			disclosure: 'Artikel ini dibuat atas kerja sama dengan Sponsor Contoh.',
		},
		body: [
			p(
				'Artikel bersponsor ini menjelaskan kartu kredit dengan cashback dari Penerbit Contoh. Informasi produk disusun bersama Sponsor Contoh untuk pembaca Financial Field Indonesia.',
			),
			p(
				'Sponsor Contoh menyediakan ilustrasi produk untuk membantu pembaca memahami cara kerja fitur yang ditawarkan. Informasi lengkap mengenai syarat, biaya, dan manfaat tersedia di ',
				link('https://example.com/produk-contoh', 'halaman produk sponsor'),
				'. Pembaca tetap disarankan membandingkan informasi tersebut dengan sumber lain sebelum mengambil keputusan.',
			),
			h2('Cara kerja produk (ilustrasi)'),
			p(
				'Produk ilustrasi ini berkaitan dengan kartu kredit cashback dari Penerbit Contoh. Calon pengguna terlebih dahulu mendaftar dan mengisi data dasar, kemudian memilih paket yang sesuai dengan kebutuhan. Setelah itu, pengguna dapat memantau status dan riwayat transaksi melalui aplikasi contoh. Tampilan, nama fitur, dan alur pendaftaran pada produk sebenarnya dapat berbeda dari gambaran ini.',
			),
			p(
				'Menurut materi dari Sponsor Contoh, produk ini ditujukan bagi pembaca yang menginginkan proses yang praktis dan informasi biaya yang transparan. Meskipun demikian, kemudahan proses tidak selalu berarti produk tersebut paling sesuai. Kebutuhan, kemampuan bayar, dan tujuan jangka panjang tetap menjadi pertimbangan utama yang hanya dapat dinilai oleh pembaca sendiri.',
			),
			p(
				'Sebagai gambaran, misalkan biaya administrasi awal sebesar Rp 75.000 dan biaya bulanan sebesar Rp 15.000. Dalam satu tahun, total biaya yang dibayar menjadi penjumlahan keduanya. Angka seperti ini sebaiknya selalu dihitung sendiri dan dibandingkan dengan manfaat yang benar-benar Anda gunakan, bukan hanya dengan manfaat yang dijanjikan dalam materi promosi.',
			),
			p(
				'Calon pengguna disarankan membaca syarat dan ketentuan secara lengkap. Perhatikan terutama biaya yang dikenakan di awal, biaya rutin, serta konsekuensi jika terjadi keterlambatan atau pembatalan. Informasi semacam ini sering tercantum di bagian akhir dokumen dan mudah terlewat ketika perhatian tertuju pada manfaat utama yang ditonjolkan dalam materi promosi.',
			),
			h2('Yang perlu diperhatikan'),
			ul(
				'Baca seluruh biaya dan ketentuan, bukan hanya manfaat utama yang ditonjolkan.',
				'Bandingkan dengan setidaknya dua produk lain yang sejenis.',
				'Pastikan produk sesuai dengan kebutuhan dan kemampuan bayar Anda.',
				'Periksa apakah penyedia terdaftar dan diawasi oleh otoritas yang berwenang.',
				'Simpan salinan perjanjian dan bukti transaksi di tempat yang aman.',
			),
			p(
				'Dalam artikel ini, label PR ditampilkan dengan jelas, nama sponsor diungkapkan, dan tautan ke situs sponsor ditandai sebagai tautan bersponsor. Ketiga hal tersebut membantu pembaca membedakan konten bersponsor dari artikel redaksi biasa, sehingga setiap informasi dapat dinilai dengan sudut pandang yang tepat. Jika ada bagian yang terasa kurang jelas, pembaca dapat menghubungi redaksi melalui halaman kontak untuk meminta klarifikasi atau menyampaikan masukan tentang cara penyajian konten bersponsor.',
			),
			p(
				'Simulasi tambahan dapat dilihat di ',
				link('https://example.com/simulasi-contoh', 'situs Sponsor Contoh'),
				'. Hasil simulasi bersifat ilustratif dan dapat berbeda dengan penawaran yang sebenarnya, sehingga sebaiknya digunakan hanya sebagai gambaran awal. Untuk keputusan akhir, mintalah penjelasan tertulis langsung dari penyedia dan simpan dokumen tersebut bersama catatan keuangan Anda.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/kartu-kredit', 'topik Kartu Kredit'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
];
