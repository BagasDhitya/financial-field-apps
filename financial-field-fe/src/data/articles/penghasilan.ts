import { h2, link, ol, p, quote, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Demo articles in Penghasilan & Gaji and its sub-categories (PRP-0002.p1 §S4.4). */
export const PENGHASILAN_ARTICLES: ArticleEntry[] = [
	{
		slug: 'gaji-kotor-vs-gaji-bersih',
		title: 'Gaji kotor vs gaji bersih: kenapa angkanya berbeda?',
		leadText:
			'Gaji bersih lebih kecil dari gaji kotor karena ada potongan pajak, iuran, dan potongan lain sebelum gaji dibayarkan. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		articleType: 'standard',
		category: 'penghasilan',
		tags: ['gaji', 'pajak-karyawan'],
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		image: 'kategori-penghasilan',
		publishedAt: '2026-10-20T04:00:00.000Z',
		lastReviewedAt: '2026-10-21T04:00:00.000Z',
		keyTakeaways: [
			'Gaji bersih lebih kecil dari gaji kotor karena ada potongan pajak, iuran, dan potongan lain sebelum gaji dibayarkan.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang perbedaan gaji kotor dan gaji bersih.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait perbedaan gaji kotor dan gaji bersih?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang perbedaan gaji kotor dan gaji bersih',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/gaji-kotor-vs-gaji-bersih',
				accessedOn: '2026-10-01',
			},
			{
				title: 'Panduan umum keuangan keluarga',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/panduan-umum',
				accessedOn: '2026-10-15',
			},
		],
		body: [
			p(
				'Gaji bersih lebih kecil dari gaji kotor karena ada potongan pajak, iuran, dan potongan lain sebelum gaji dibayarkan. Pembahasan tentang perbedaan gaji kotor dan gaji bersih biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami perbedaan gaji kotor dan gaji bersih tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu perbedaan gaji kotor dan gaji bersih?'),
			p(
				'Secara sederhana, perbedaan gaji kotor dan gaji bersih adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang perbedaan gaji kotor dan gaji bersih paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Satu hal yang sering terlupa adalah faktor waktu. Banyak aturan dan produk keuangan memiliki tenggat, masa tunggu, atau periode tertentu. Mengetahui jadwal tersebut sejak awal membuat Anda punya cukup ruang untuk menyiapkan dokumen dan dana yang dibutuhkan.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Kumpulkan dokumen dan catatan yang berkaitan dengan perbedaan gaji kotor dan gaji bersih.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 7.000.000 per bulan dan memutuskan menyisihkan 8% untuk keperluan ini. Artinya, sekitar Rp 560.000 disisihkan setiap bulan, atau Rp 11.200.000 dalam 20 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 7.000.000',
				'Porsi yang disisihkan: 8% atau Rp 560.000',
				'Akumulasi dalam 20 bulan: Rp 11.200.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 13%, jumlah yang disisihkan menjadi sekitar Rp 910.000 per bulan, atau Rp 18.200.000 dalam 20 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Ajak anggota keluarga yang terlibat sejak awal agar rencana lebih mudah dijalankan bersama.',
			),
			p(
				'Bila memungkinkan, otomatiskan langkah yang berulang, misalnya dengan pemindahan dana terjadwal pada tanggal gajian. Dengan begitu, rencana berjalan tanpa harus diingat setiap bulan, dan Anda dapat memusatkan perhatian pada keputusan yang benar-benar membutuhkan pertimbangan.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang perbedaan gaji kotor dan gaji bersih secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami perbedaan gaji kotor dan gaji bersih, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/penghasilan', 'topik Penghasilan & Gaji'),
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
