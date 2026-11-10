import { h2, link, ol, p, quote, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Articles in Pajak and its sub-categories (PRP-0002.p1 §S4.4). */
export const PAJAK_ARTICLES: ArticleEntry[] = [
	{
		slug: 'apa-saja-pengurang-penghasilan-kena-pajak',
		title: 'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
		lead_text:
			'Pengurang penghasilan kena pajak adalah pos yang mengurangi dasar pengenaan pajak sebelum tarif dihitung. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=lwNXYFoSjxU',
			title: 'Keringanan PPh 21 Diperluas & PTKP Dikaji Naik',
			channel_name: 'CNN Indonesia',
			uploaded_at: '2026-10-07T06:45:32.000Z',
			duration_seconds: 391,
			caption:
				'Berita CNN Indonesia: pemerintah berencana melanjutkan keringanan PPh 21 bagi pekerja bergaji di bawah Rp10 juta per bulan pada 2027, sambil mengkaji penyesuaian batas Penghasilan Tidak Kena Pajak (PTKP), salah satu pengurang utama dalam pajak karyawan.',
		},
		primary_category: 'pajak-pengurang',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-satu',
		tags: ['pajak-karyawan', 'gaji'],
		first_published_at: '2026-11-09T00:00:00.000Z',
		last_reviewed_at: '2026-11-09T01:00:00.000Z',
		key_takeaways: [
			{
				text: 'Pengurang penghasilan kena pajak adalah pos yang mengurangi dasar pengenaan pajak sebelum tarif dihitung.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang pengurang penghasilan kena pajak.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait pengurang penghasilan kena pajak?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang pengurang penghasilan kena pajak',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/apa-saja-pengurang-penghasilan-kena-pajak',
				accessed_on: '2026-10-01',
			},
			{
				title: 'Panduan umum keuangan keluarga',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/panduan-umum',
				accessed_on: '2026-10-15',
			},
		],
		content: [
			p(
				'Pengurang penghasilan kena pajak adalah pos yang mengurangi dasar pengenaan pajak sebelum tarif dihitung. Pembahasan tentang pengurang penghasilan kena pajak biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Mengapa pengurang penghasilan kena pajak penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu pengurang penghasilan kena pajak?'),
			p(
				'Secara sederhana, pengurang penghasilan kena pajak adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pengurang penghasilan kena pajak paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Satu hal yang sering terlupa adalah faktor waktu. Banyak aturan dan produk keuangan memiliki tenggat, masa tunggu, atau periode tertentu. Mengetahui jadwal tersebut sejak awal membuat Anda punya cukup ruang untuk menyiapkan dokumen dan dana yang dibutuhkan.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Kumpulkan dokumen dan catatan yang berkaitan dengan pengurang penghasilan kena pajak.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang pengurang penghasilan kena pajak mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.000.000 per bulan dan memutuskan menyisihkan 6% untuk keperluan ini. Artinya, sekitar Rp 180.000 disisihkan setiap bulan, atau Rp 1.800.000 dalam 10 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.000.000',
				'Porsi yang disisihkan: 6% atau Rp 180.000',
				'Akumulasi dalam 10 bulan: Rp 1.800.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 11%, jumlah yang disisihkan menjadi sekitar Rp 330.000 per bulan, atau Rp 3.300.000 dalam 10 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Catatan yang sederhana tetapi rutin lebih berguna daripada catatan lengkap yang hanya dibuat sekali.',
			),
			p(
				'Bila memungkinkan, otomatiskan langkah yang berulang, misalnya dengan pemindahan dana terjadwal pada tanggal gajian. Dengan begitu, rencana berjalan tanpa harus diingat setiap bulan, dan Anda dapat memusatkan perhatian pada keputusan yang benar-benar membutuhkan pertimbangan.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pengurang penghasilan kena pajak secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami pengurang penghasilan kena pajak, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-pengurang', 'topik Pengurang Pajak'),
				' atau lanjutkan ke ',
				link(
					'/artikel/cara-membaca-slip-gaji-pph-21',
					'Cara membaca slip gaji: dari mana angka PPh 21 berasal?',
				),
				'.',
			),
		],
	},
	{
		slug: 'cara-membaca-slip-gaji-pph-21',
		title: 'Cara membaca slip gaji: dari mana angka PPh 21 berasal?',
		lead_text:
			'Angka PPh 21 di slip gaji berasal dari penghasilan bruto yang dikurangi pengurang tertentu, lalu dikenai tarif. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=gqHcGFd0FNg',
			title: 'Heboh Hitungan Pajak Baru TER PPh 21 bikin Gaji Turun, Benarkah?',
			channel_name: 'CNBC Indonesia',
			uploaded_at: '2024-01-29T06:07:49.000Z',
			duration_seconds: 318,
			caption:
				'Liputan CNBC Indonesia tentang skema tarif efektif rata-rata (TER) PPh 21 yang mulai berlaku Januari 2024, saat sebagian pegawai mendapati gaji bersihnya turun. Konteks yang berguna sebelum membaca angka PPh 21 di slip gaji Anda.',
		},
		primary_category: 'pajak-pph21',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		tags: ['pajak-karyawan', 'gaji'],
		first_published_at: '2026-11-07T14:00:00.000Z',
		last_reviewed_at: '2026-11-08T14:00:00.000Z',
		key_takeaways: [
			{
				text: 'Angka PPh 21 di slip gaji berasal dari penghasilan bruto yang dikurangi pengurang tertentu, lalu dikenai tarif.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang potongan PPh 21 pada slip gaji.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait potongan PPh 21 pada slip gaji?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang potongan PPh 21 pada slip gaji perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang potongan PPh 21 pada slip gaji',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/cara-membaca-slip-gaji-pph-21',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Angka PPh 21 di slip gaji berasal dari penghasilan bruto yang dikurangi pengurang tertentu, lalu dikenai tarif. Banyak pembaca bertanya tentang potongan PPh 21 pada slip gaji, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Mengapa potongan PPh 21 pada slip gaji penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu potongan PPh 21 pada slip gaji?'),
			p(
				'Secara sederhana, potongan PPh 21 pada slip gaji adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang potongan PPh 21 pada slip gaji paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait potongan PPh 21 pada slip gaji. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
				'Tetapkan tanggal untuk meninjau ulang keputusan yang sudah diambil.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang potongan PPh 21 pada slip gaji mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 7.500.000 per bulan dan memutuskan menyisihkan 7% untuk keperluan ini. Artinya, sekitar Rp 525.000 disisihkan setiap bulan, atau Rp 12.075.000 dalam 23 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 7.500.000',
				'Porsi yang disisihkan: 7% atau Rp 525.000',
				'Akumulasi dalam 23 bulan: Rp 12.075.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 12%, jumlah yang disisihkan menjadi sekitar Rp 900.000 per bulan, atau Rp 20.700.000 dalam 23 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Mulailah dari langkah kecil yang bisa dilakukan minggu ini, bukan dari rencana besar yang sulit dijalankan.',
			),
			p(
				'Jangan ragu menyesuaikan rencana ketika kondisi berubah. Kenaikan penghasilan, tambahan tanggungan, atau kebutuhan mendesak adalah alasan yang wajar untuk meninjau kembali porsi dan prioritas. Yang penting, setiap perubahan dicatat agar Anda tetap tahu alasan di balik keputusan tersebut.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang potongan PPh 21 pada slip gaji secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami potongan PPh 21 pada slip gaji, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-pph21', 'topik PPh 21 & Bukti Potong'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'langkah-mengisi-spt-tahunan-pertama',
		title: 'Langkah mengisi SPT Tahunan pribadi untuk pertama kali',
		lead_text:
			'Mengisi SPT Tahunan pertama kali dimulai dari menyiapkan bukti potong dan daftar harta, lalu mengisi formulir secara berurutan.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=vfXixW3BNqM',
			title: 'Tutorial Coretax Resmi : Panduan SPT Tahunan Wajib Pajak Orang Pribadi - Karyawan',
			channel_name: 'Direktorat Jenderal Pajak',
			uploaded_at: '2025-09-29T07:52:49.000Z',
			duration_seconds: 1006,
			caption:
				'Tutorial resmi Direktorat Jenderal Pajak untuk melaporkan SPT Tahunan karyawan dengan satu pemberi kerja melalui Coretax: dari menyiapkan dokumen dan membuat konsep SPT hingga mengisi dan menyampaikannya.',
		},
		primary_category: 'pajak-spt-tahunan',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-dua',
		tags: ['spt'],
		first_published_at: '2026-11-06T04:00:00.000Z',
		content_updated_at: '2026-11-09T01:00:00.000Z',
		last_reviewed_at: '2026-11-07T04:00:00.000Z',
		key_takeaways: [
			{
				text: 'Mengisi SPT Tahunan pertama kali dimulai dari menyiapkan bukti potong dan daftar harta, lalu mengisi formulir secara berurutan.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang pengisian SPT Tahunan pertama.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait pengisian SPT Tahunan pertama?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang pengisian SPT Tahunan pertama perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang pengisian SPT Tahunan pertama',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/langkah-mengisi-spt-tahunan-pertama',
				accessed_on: '2026-10-01',
			},
		],
		corrections: [
			{
				date: '2026-10-20',
				note: 'angka pada contoh perhitungan diperbaiki agar konsisten dengan teks.',
			},
		],
		content: [
			p(
				'Mengisi SPT Tahunan pertama kali dimulai dari menyiapkan bukti potong dan daftar harta, lalu mengisi formulir secara berurutan. Pembahasan tentang pengisian SPT Tahunan pertama biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Mengapa pengisian SPT Tahunan pertama penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu pengisian SPT Tahunan pertama?'),
			p(
				'Pengisian SPT Tahunan pertama pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pengisian SPT Tahunan pertama paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait pengisian SPT Tahunan pertama. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan pengisian SPT Tahunan pertama.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.500.000 per bulan dan memutuskan menyisihkan 7% untuk keperluan ini. Artinya, sekitar Rp 245.000 disisihkan setiap bulan, atau Rp 1.470.000 dalam 6 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.500.000',
				'Porsi yang disisihkan: 7% atau Rp 245.000',
				'Akumulasi dalam 6 bulan: Rp 1.470.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 12%, jumlah yang disisihkan menjadi sekitar Rp 420.000 per bulan, atau Rp 2.520.000 dalam 6 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Catatan yang sederhana tetapi rutin lebih berguna daripada catatan lengkap yang hanya dibuat sekali.',
			),
			p(
				'Jangan ragu menyesuaikan rencana ketika kondisi berubah. Kenaikan penghasilan, tambahan tanggungan, atau kebutuhan mendesak adalah alasan yang wajar untuk meninjau kembali porsi dan prioritas. Yang penting, setiap perubahan dicatat agar Anda tetap tahu alasan di balik keputusan tersebut.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pengisian SPT Tahunan pertama secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-spt-tahunan', 'topik SPT Tahunan'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'zakat-dan-sumbangan-pengurang-pajak',
		title: 'Apakah zakat dan sumbangan bisa mengurangi pajak?',
		lead_text:
			'Zakat dan sumbangan tertentu dapat diperhitungkan sebagai pengurang jika dibayarkan melalui lembaga yang memenuhi syarat.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=BEwz-GpVvWA',
			title: 'Ngobrolin Zakat Pengurang Pajak?',
			channel_name: 'KPP Pratama Yogyakarta',
			uploaded_at: '2025-08-20T06:23:52.000Z',
			duration_seconds: 1216,
			caption:
				'Siniar KPP Pratama Yogyakarta, kantor Direktorat Jenderal Pajak, tentang zakat yang dibayarkan melalui BAZNAS sebagai pengurang dalam penghitungan Pajak Penghasilan dan cara memanfaatkannya.',
		},
		primary_category: 'pajak-zakat-donasi',
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-satu',
		tags: ['spt'],
		first_published_at: '2026-11-04T18:00:00.000Z',
		last_reviewed_at: '2026-11-05T18:00:00.000Z',
		key_takeaways: [
			{
				text: 'Zakat dan sumbangan tertentu dapat diperhitungkan sebagai pengurang jika dibayarkan melalui lembaga yang memenuhi syarat.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang zakat dan sumbangan sebagai pengurang pajak.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question:
					'Apa langkah pertama terkait zakat dan sumbangan sebagai pengurang pajak?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang zakat dan sumbangan sebagai pengurang pajak perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang zakat dan sumbangan sebagai pengurang pajak',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/zakat-dan-sumbangan-pengurang-pajak',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Zakat dan sumbangan tertentu dapat diperhitungkan sebagai pengurang jika dibayarkan melalui lembaga yang memenuhi syarat. Banyak pembaca bertanya tentang zakat dan sumbangan sebagai pengurang pajak, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Pemahaman yang baik tentang zakat dan sumbangan sebagai pengurang pajak juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu zakat dan sumbangan sebagai pengurang pajak?'),
			p(
				'Ketika membicarakan zakat dan sumbangan sebagai pengurang pajak, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang zakat dan sumbangan sebagai pengurang pajak paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Perlu diingat juga bahwa aturan dan ketentuan dapat berubah dari waktu ke waktu. Karena itu, pastikan informasi yang Anda gunakan masih berlaku, terutama jika keputusan yang akan diambil melibatkan jumlah uang yang besar atau jangka waktu yang panjang.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
				'Tetapkan tanggal untuk meninjau ulang keputusan yang sudah diambil.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan zakat dan sumbangan sebagai pengurang pajak.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 6.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 585.000 disisihkan setiap bulan, atau Rp 12.285.000 dalam 21 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 6.500.000',
				'Porsi yang disisihkan: 9% atau Rp 585.000',
				'Akumulasi dalam 21 bulan: Rp 12.285.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 910.000 per bulan, atau Rp 19.110.000 dalam 21 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang zakat dan sumbangan sebagai pengurang pajak secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-zakat-donasi', 'topik Zakat & Donasi'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'jatuh-tempo-pajak-kendaraan',
		title: 'Pajak kendaraan bermotor: kapan jatuh tempo dan cara membayarnya?',
		lead_text:
			'Tanggal jatuh tempo pajak kendaraan tercantum di dokumen kendaraan dan sebaiknya dicatat di kalender keluarga. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=IgavgIkqpqw',
			title: '2 Pajak Baru Kendaraan Bermotor Berlaku Mulai 5 Januari 2025',
			channel_name: 'CNBC Indonesia',
			uploaded_at: '2025-01-06T03:12:51.000Z',
			duration_seconds: 88,
			caption:
				'Berita CNBC Indonesia saat dua pajak baru kendaraan bermotor mulai berlaku pada 5 Januari 2025. Rinciannya tercantum pada tagihan pajak kendaraan Anda.',
		},
		primary_category: 'pajak-lainnya',
		author: 'penulis-contoh-dua',
		tags: ['anggaran-bulanan'],
		first_published_at: '2026-11-03T08:00:00.000Z',
		key_takeaways: [
			{
				text: 'Tanggal jatuh tempo pajak kendaraan tercantum di dokumen kendaraan dan sebaiknya dicatat di kalender keluarga.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang jatuh tempo pajak kendaraan bermotor.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang jatuh tempo pajak kendaraan bermotor',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/jatuh-tempo-pajak-kendaraan',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Tanggal jatuh tempo pajak kendaraan tercantum di dokumen kendaraan dan sebaiknya dicatat di kalender keluarga. Banyak pembaca bertanya tentang jatuh tempo pajak kendaraan bermotor, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami jatuh tempo pajak kendaraan bermotor tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu jatuh tempo pajak kendaraan bermotor?'),
			p(
				'Secara sederhana, jatuh tempo pajak kendaraan bermotor adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang jatuh tempo pajak kendaraan bermotor paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait jatuh tempo pajak kendaraan bermotor. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan jatuh tempo pajak kendaraan bermotor.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 4.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 405.000 disisihkan setiap bulan, atau Rp 9.720.000 dalam 24 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 4.500.000',
				'Porsi yang disisihkan: 9% atau Rp 405.000',
				'Akumulasi dalam 24 bulan: Rp 9.720.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 630.000 per bulan, atau Rp 15.120.000 dalam 24 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Mulailah dari langkah kecil yang bisa dilakukan minggu ini, bukan dari rencana besar yang sulit dijalankan.',
			),
			p(
				'Jangan ragu menyesuaikan rencana ketika kondisi berubah. Kenaikan penghasilan, tambahan tanggungan, atau kebutuhan mendesak adalah alasan yang wajar untuk meninjau kembali porsi dan prioritas. Yang penting, setiap perubahan dicatat agar Anda tetap tahu alasan di balik keputusan tersebut.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang jatuh tempo pajak kendaraan bermotor secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami jatuh tempo pajak kendaraan bermotor, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-lainnya', 'topik Pajak Lainnya'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'gaji-naik-potongan-pajak-ikut-naik',
		title: 'Gaji naik, apakah potongan pajak ikut naik? Simulasi sederhana',
		lead_text:
			'Ketika gaji naik, potongan pajak biasanya ikut naik, tetapi kenaikannya tidak selalu sebanding dengan kenaikan gaji. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=DFWIrR_te-M',
			title: 'DJP Jamin Tak Ada Tambahan Pajak Baru di TER PPh 21 Hanya Permudah Perhitungan',
			channel_name: 'CNBC Indonesia',
			uploaded_at: '2024-01-29T07:49:29.000Z',
			duration_seconds: 636,
			caption:
				'Direktur Penyuluhan, Pelayanan, dan Hubungan Masyarakat DJP menjelaskan di CNBC Indonesia bahwa TER PPh 21 hanya mempermudah penghitungan bulanan oleh pemberi kerja dan tidak menambah total pajak yang dibayar.',
		},
		primary_category: 'pajak-pph21',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-dua',
		tags: ['pajak-karyawan', 'gaji'],
		first_published_at: '2026-11-01T22:00:00.000Z',
		content_updated_at: '2026-11-04T22:00:00.000Z',
		last_reviewed_at: '2026-11-02T22:00:00.000Z',
		key_takeaways: [
			{
				text: 'Ketika gaji naik, potongan pajak biasanya ikut naik, tetapi kenaikannya tidak selalu sebanding dengan kenaikan gaji.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang kenaikan gaji dan potongan pajak.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang kenaikan gaji dan potongan pajak',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/gaji-naik-potongan-pajak-ikut-naik',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Ketika gaji naik, potongan pajak biasanya ikut naik, tetapi kenaikannya tidak selalu sebanding dengan kenaikan gaji. Topik kenaikan gaji dan potongan pajak sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami kenaikan gaji dan potongan pajak tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu kenaikan gaji dan potongan pajak?'),
			p(
				'Ketika membicarakan kenaikan gaji dan potongan pajak, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang kenaikan gaji dan potongan pajak paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Satu hal yang sering terlupa adalah faktor waktu. Banyak aturan dan produk keuangan memiliki tenggat, masa tunggu, atau periode tertentu. Mengetahui jadwal tersebut sejak awal membuat Anda punya cukup ruang untuk menyiapkan dokumen dan dana yang dibutuhkan.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan kenaikan gaji dan potongan pajak.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 4.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 405.000 disisihkan setiap bulan, atau Rp 6.885.000 dalam 17 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 4.500.000',
				'Porsi yang disisihkan: 9% atau Rp 405.000',
				'Akumulasi dalam 17 bulan: Rp 6.885.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 630.000 per bulan, atau Rp 10.710.000 dalam 17 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Mulailah dari langkah kecil yang bisa dilakukan minggu ini, bukan dari rencana besar yang sulit dijalankan.',
			),
			p(
				'Konsistensi biasanya lebih menentukan daripada besarnya angka. Rencana yang dijalankan setiap bulan, meskipun kecil, memberi hasil yang lebih dapat diandalkan daripada rencana besar yang sering tertunda. Jika suatu bulan rencana tidak berjalan, cukup lanjutkan pada bulan berikutnya tanpa perlu memulai dari awal.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang kenaikan gaji dan potongan pajak secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-pph21', 'topik PPh 21 & Bukti Potong'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'kesalahan-umum-lapor-spt',
		title: 'Kesalahan umum saat lapor SPT dan cara menghindarinya',
		lead_text:
			'Kesalahan lapor SPT yang paling sering adalah data harta yang tidak lengkap dan bukti potong yang terlewat. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=2UZan2cIl8M',
			title: 'DJP Hapus Denda Telat Lapor SPT Orang Pribadi Hingga 30 April 2026',
			channel_name: 'CNN Indonesia',
			uploaded_at: '2026-03-30T08:30:01.000Z',
			duration_seconds: 116,
			caption:
				'Berita CNN Indonesia: DJP memperpanjang batas pelaporan SPT Tahunan orang pribadi tahun pajak 2025 hingga 30 April 2026 tanpa denda keterlambatan. Terlambat melapor termasuk kesalahan yang paling sering terjadi.',
		},
		primary_category: 'pajak-spt-tahunan',
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-satu',
		tags: ['spt'],
		first_published_at: '2026-10-31T12:00:00.000Z',
		last_reviewed_at: '2026-11-01T12:00:00.000Z',
		key_takeaways: [
			{
				text: 'Kesalahan lapor SPT yang paling sering adalah data harta yang tidak lengkap dan bukti potong yang terlewat.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang kesalahan saat melaporkan SPT.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait kesalahan saat melaporkan SPT?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang kesalahan saat melaporkan SPT perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang kesalahan saat melaporkan SPT',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/kesalahan-umum-lapor-spt',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Kesalahan lapor SPT yang paling sering adalah data harta yang tidak lengkap dan bukti potong yang terlewat. Banyak pembaca bertanya tentang kesalahan saat melaporkan SPT, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami kesalahan saat melaporkan SPT tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu kesalahan saat melaporkan SPT?'),
			p(
				'Secara sederhana, kesalahan saat melaporkan SPT adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang kesalahan saat melaporkan SPT paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait kesalahan saat melaporkan SPT. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
				'Tetapkan tanggal untuk meninjau ulang keputusan yang sudah diambil.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 5.500.000 per bulan dan memutuskan menyisihkan 5% untuk keperluan ini. Artinya, sekitar Rp 275.000 disisihkan setiap bulan, atau Rp 4.125.000 dalam 15 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 5.500.000',
				'Porsi yang disisihkan: 5% atau Rp 275.000',
				'Akumulasi dalam 15 bulan: Rp 4.125.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 10%, jumlah yang disisihkan menjadi sekitar Rp 550.000 per bulan, atau Rp 8.250.000 dalam 15 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Mulailah dari langkah kecil yang bisa dilakukan minggu ini, bukan dari rencana besar yang sulit dijalankan.',
			),
			p(
				'Jangan ragu menyesuaikan rencana ketika kondisi berubah. Kenaikan penghasilan, tambahan tanggungan, atau kebutuhan mendesak adalah alasan yang wajar untuk meninjau kembali porsi dan prioritas. Yang penting, setiap perubahan dicatat agar Anda tetap tahu alasan di balik keputusan tersebut.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang kesalahan saat melaporkan SPT secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-spt-tahunan', 'topik SPT Tahunan'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'dokumen-pajak-yang-perlu-disimpan',
		title: 'Menyimpan bukti potong: dokumen apa saja yang perlu disimpan?',
		lead_text:
			'Bukti potong, bukti pembayaran, dan dokumen harta sebaiknya disimpan rapi selama beberapa tahun. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		primary_category: 'pajak-pengurang',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-dua',
		tags: ['pajak-karyawan'],
		first_published_at: '2026-10-30T02:00:00.000Z',
		last_reviewed_at: '2026-10-31T02:00:00.000Z',
		key_takeaways: [
			{
				text: 'Bukti potong, bukti pembayaran, dan dokumen harta sebaiknya disimpan rapi selama beberapa tahun.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang penyimpanan dokumen pajak.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang penyimpanan dokumen pajak',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/dokumen-pajak-yang-perlu-disimpan',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Bukti potong, bukti pembayaran, dan dokumen harta sebaiknya disimpan rapi selama beberapa tahun. Topik penyimpanan dokumen pajak sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Pemahaman yang baik tentang penyimpanan dokumen pajak juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu penyimpanan dokumen pajak?'),
			p(
				'Ketika membicarakan penyimpanan dokumen pajak, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang penyimpanan dokumen pajak paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Satu hal yang sering terlupa adalah faktor waktu. Banyak aturan dan produk keuangan memiliki tenggat, masa tunggu, atau periode tertentu. Mengetahui jadwal tersebut sejak awal membuat Anda punya cukup ruang untuk menyiapkan dokumen dan dana yang dibutuhkan.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan penyimpanan dokumen pajak.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 5.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 495.000 disisihkan setiap bulan, atau Rp 9.405.000 dalam 19 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 5.500.000',
				'Porsi yang disisihkan: 9% atau Rp 495.000',
				'Akumulasi dalam 19 bulan: Rp 9.405.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 770.000 per bulan, atau Rp 14.630.000 dalam 19 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Mulailah dari langkah kecil yang bisa dilakukan minggu ini, bukan dari rencana besar yang sulit dijalankan.',
			),
			p(
				'Konsistensi biasanya lebih menentukan daripada besarnya angka. Rencana yang dijalankan setiap bulan, meskipun kecil, memberi hasil yang lebih dapat diandalkan daripada rencana besar yang sering tertunda. Jika suatu bulan rencana tidak berjalan, cukup lanjutkan pada bulan berikutnya tanpa perlu memulai dari awal.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang penyimpanan dokumen pajak secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami penyimpanan dokumen pajak, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-pengurang', 'topik Pengurang Pajak'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'pajak-hadiah-undian-dan-bonus',
		title: 'Pajak atas hadiah undian dan bonus: yang perlu diketahui',
		lead_text:
			'Hadiah undian dan bonus umumnya tetap dikenai pajak, sehingga jumlah yang diterima bisa lebih kecil dari yang diumumkan.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		primary_category: 'pajak-lainnya',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-satu',
		tags: ['gaji'],
		first_published_at: '2026-10-28T16:00:00.000Z',
		last_reviewed_at: '2026-10-29T16:00:00.000Z',
		key_takeaways: [
			{
				text: 'Hadiah undian dan bonus umumnya tetap dikenai pajak, sehingga jumlah yang diterima bisa lebih kecil dari yang diumumkan.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang pajak atas hadiah dan bonus.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang pajak atas hadiah dan bonus',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/pajak-hadiah-undian-dan-bonus',
				accessed_on: '2026-10-01',
			},
			{
				title: 'Panduan umum keuangan keluarga',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/panduan-umum',
				accessed_on: '2026-10-15',
			},
		],
		content: [
			p(
				'Hadiah undian dan bonus umumnya tetap dikenai pajak, sehingga jumlah yang diterima bisa lebih kecil dari yang diumumkan. Banyak pembaca bertanya tentang pajak atas hadiah dan bonus, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Mengapa pajak atas hadiah dan bonus penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu pajak atas hadiah dan bonus?'),
			p(
				'Ketika membicarakan pajak atas hadiah dan bonus, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pajak atas hadiah dan bonus paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Perlu diingat juga bahwa aturan dan ketentuan dapat berubah dari waktu ke waktu. Karena itu, pastikan informasi yang Anda gunakan masih berlaku, terutama jika keputusan yang akan diambil melibatkan jumlah uang yang besar atau jangka waktu yang panjang.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan pajak atas hadiah dan bonus.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 6.000.000 per bulan dan memutuskan menyisihkan 6% untuk keperluan ini. Artinya, sekitar Rp 360.000 disisihkan setiap bulan, atau Rp 7.920.000 dalam 22 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 6.000.000',
				'Porsi yang disisihkan: 6% atau Rp 360.000',
				'Akumulasi dalam 22 bulan: Rp 7.920.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 11%, jumlah yang disisihkan menjadi sekitar Rp 660.000 per bulan, atau Rp 14.520.000 dalam 22 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pajak atas hadiah dan bonus secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami pajak atas hadiah dan bonus, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-lainnya', 'topik Pajak Lainnya'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'kalender-pajak-pribadi',
		title: 'Kalender pajak pribadi: tanggal penting sepanjang tahun',
		lead_text:
			'Kalender pajak pribadi membantu mengingat tanggal lapor dan bayar sehingga tidak ada denda yang tidak perlu. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		primary_category: 'pajak',
		author: 'redaksi-contoh',
		reviewer: 'peninjau-contoh-satu',
		tags: ['spt', 'anggaran-bulanan'],
		first_published_at: '2026-10-27T06:00:00.000Z',
		last_reviewed_at: '2026-10-28T06:00:00.000Z',
		key_takeaways: [
			{
				text: 'Kalender pajak pribadi membantu mengingat tanggal lapor dan bayar sehingga tidak ada denda yang tidak perlu.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang kalender pajak pribadi.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Kalender pajak pribadi membantu mengingat tanggal lapor dan bayar sehingga tidak ada denda yang tidak perlu. Banyak pembaca bertanya tentang kalender pajak pribadi, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Pemahaman yang baik tentang kalender pajak pribadi juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu kalender pajak pribadi?'),
			p(
				'Ketika membicarakan kalender pajak pribadi, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang kalender pajak pribadi paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Perlu diingat juga bahwa aturan dan ketentuan dapat berubah dari waktu ke waktu. Karena itu, pastikan informasi yang Anda gunakan masih berlaku, terutama jika keputusan yang akan diambil melibatkan jumlah uang yang besar atau jangka waktu yang panjang.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan kalender pajak pribadi.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 8.500.000 per bulan dan memutuskan menyisihkan 7% untuk keperluan ini. Artinya, sekitar Rp 595.000 disisihkan setiap bulan, atau Rp 13.090.000 dalam 22 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 8.500.000',
				'Porsi yang disisihkan: 7% atau Rp 595.000',
				'Akumulasi dalam 22 bulan: Rp 13.090.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 12%, jumlah yang disisihkan menjadi sekitar Rp 1.020.000 per bulan, atau Rp 22.440.000 dalam 22 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Catatan yang sederhana tetapi rutin lebih berguna daripada catatan lengkap yang hanya dibuat sekali.',
			),
			p(
				'Konsistensi biasanya lebih menentukan daripada besarnya angka. Rencana yang dijalankan setiap bulan, meskipun kecil, memberi hasil yang lebih dapat diandalkan daripada rencana besar yang sering tertunda. Jika suatu bulan rencana tidak berjalan, cukup lanjutkan pada bulan berikutnya tanpa perlu memulai dari awal.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang kalender pajak pribadi secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak', 'topik Pajak'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'pajak-pekerja-lepas-vs-karyawan',
		title: 'Pekerja lepas dan pajak: apa bedanya dengan karyawan tetap?',
		lead_text:
			'Pekerja lepas biasanya lebih banyak mengurus pencatatan pajaknya sendiri dibandingkan karyawan tetap. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=XAfcjOiVcX0',
			title: 'Panduan Pemberitahuan Penggunaan Norma Penghitungan Penghasilan Neto (NPPN)',
			channel_name: 'Direktorat Jenderal Pajak',
			uploaded_at: '2026-02-04T08:25:47.000Z',
			duration_seconds: 565,
			caption:
				'Panduan resmi Direktorat Jenderal Pajak tentang Norma Penghitungan Penghasilan Neto (NPPN): syarat penggunaannya bagi pekerja bebas yang tidak menyelenggarakan pembukuan, dan cara menyampaikan pemberitahuannya melalui Coretax.',
		},
		primary_category: 'pajak-pph21',
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-dua',
		tags: ['gaji'],
		first_published_at: '2026-10-25T20:00:00.000Z',
		last_reviewed_at: '2026-10-26T20:00:00.000Z',
		key_takeaways: [
			{
				text: 'Pekerja lepas biasanya lebih banyak mengurus pencatatan pajaknya sendiri dibandingkan karyawan tetap.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang pajak pekerja lepas.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait pajak pekerja lepas?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang pajak pekerja lepas',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/pajak-pekerja-lepas-vs-karyawan',
				accessed_on: '2026-10-01',
			},
			{
				title: 'Panduan umum keuangan keluarga',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/panduan-umum',
				accessed_on: '2026-10-15',
			},
		],
		content: [
			p(
				'Pekerja lepas biasanya lebih banyak mengurus pencatatan pajaknya sendiri dibandingkan karyawan tetap. Pembahasan tentang pajak pekerja lepas biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami pajak pekerja lepas tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu pajak pekerja lepas?'),
			p(
				'Pajak pekerja lepas pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pajak pekerja lepas paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Perlu diingat juga bahwa aturan dan ketentuan dapat berubah dari waktu ke waktu. Karena itu, pastikan informasi yang Anda gunakan masih berlaku, terutama jika keputusan yang akan diambil melibatkan jumlah uang yang besar atau jangka waktu yang panjang.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan pajak pekerja lepas.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang pajak pekerja lepas mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 6.000.000 per bulan dan memutuskan menyisihkan 6% untuk keperluan ini. Artinya, sekitar Rp 360.000 disisihkan setiap bulan, atau Rp 4.680.000 dalam 13 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 6.000.000',
				'Porsi yang disisihkan: 6% atau Rp 360.000',
				'Akumulasi dalam 13 bulan: Rp 4.680.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 11%, jumlah yang disisihkan menjadi sekitar Rp 660.000 per bulan, atau Rp 8.580.000 dalam 13 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Mulailah dari langkah kecil yang bisa dilakukan minggu ini, bukan dari rencana besar yang sulit dijalankan.',
			),
			p(
				'Konsistensi biasanya lebih menentukan daripada besarnya angka. Rencana yang dijalankan setiap bulan, meskipun kecil, memberi hasil yang lebih dapat diandalkan daripada rencana besar yang sering tertunda. Jika suatu bulan rencana tidak berjalan, cukup lanjutkan pada bulan berikutnya tanpa perlu memulai dari awal.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pajak pekerja lepas secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami pajak pekerja lepas, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-pph21', 'topik PPh 21 & Bukti Potong'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'arti-spt-nihil-kurang-lebih-bayar',
		title: 'SPT nihil, kurang bayar, lebih bayar: apa artinya?',
		lead_text:
			'Status SPT menunjukkan selisih antara pajak terutang dan pajak yang sudah dipotong atau dibayar. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		primary_category: 'pajak-spt-tahunan',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		tags: ['spt'],
		first_published_at: '2026-10-24T10:00:00.000Z',
		last_reviewed_at: '2026-10-25T10:00:00.000Z',
		key_takeaways: [
			{
				text: 'Status SPT menunjukkan selisih antara pajak terutang dan pajak yang sudah dipotong atau dibayar.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang status SPT nihil, kurang bayar, dan lebih bayar.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question:
					'Apa langkah pertama terkait status SPT nihil, kurang bayar, dan lebih bayar?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang status SPT nihil, kurang bayar, dan lebih bayar',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/arti-spt-nihil-kurang-lebih-bayar',
				accessed_on: '2026-10-01',
			},
			{
				title: 'Panduan umum keuangan keluarga',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/panduan-umum',
				accessed_on: '2026-10-15',
			},
		],
		content: [
			p(
				'Status SPT menunjukkan selisih antara pajak terutang dan pajak yang sudah dipotong atau dibayar. Pembahasan tentang status SPT nihil, kurang bayar, dan lebih bayar biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Pemahaman yang baik tentang status SPT nihil, kurang bayar, dan lebih bayar juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu status SPT nihil, kurang bayar, dan lebih bayar?'),
			p(
				'Ketika membicarakan status SPT nihil, kurang bayar, dan lebih bayar, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang status SPT nihil, kurang bayar, dan lebih bayar paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait status SPT nihil, kurang bayar, dan lebih bayar. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan status SPT nihil, kurang bayar, dan lebih bayar.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 4.000.000 per bulan dan memutuskan menyisihkan 10% untuk keperluan ini. Artinya, sekitar Rp 400.000 disisihkan setiap bulan, atau Rp 4.800.000 dalam 12 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 4.000.000',
				'Porsi yang disisihkan: 10% atau Rp 400.000',
				'Akumulasi dalam 12 bulan: Rp 4.800.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 15%, jumlah yang disisihkan menjadi sekitar Rp 600.000 per bulan, atau Rp 7.200.000 dalam 12 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Ajak anggota keluarga yang terlibat sejak awal agar rencana lebih mudah dijalankan bersama.',
			),
			p(
				'Jangan ragu menyesuaikan rencana ketika kondisi berubah. Kenaikan penghasilan, tambahan tanggungan, atau kebutuhan mendesak adalah alasan yang wajar untuk meninjau kembali porsi dan prioritas. Yang penting, setiap perubahan dicatat agar Anda tetap tahu alasan di balik keputusan tersebut.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang status SPT nihil, kurang bayar, dan lebih bayar secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-spt-tahunan', 'topik SPT Tahunan'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'bukti-setor-zakat-yang-perlu-diminta',
		title: 'Bukti setor zakat: format apa yang perlu diminta dari lembaga?',
		lead_text:
			'Bukti setor zakat perlu memuat identitas pembayar, jumlah, tanggal, dan nama lembaga penerima. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		primary_category: 'pajak-zakat-donasi',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-dua',
		tags: ['spt'],
		first_published_at: '2026-10-23T00:00:00.000Z',
		last_reviewed_at: '2026-10-24T00:00:00.000Z',
		key_takeaways: [
			{
				text: 'Bukti setor zakat perlu memuat identitas pembayar, jumlah, tanggal, dan nama lembaga penerima.',
			},
			{ text: 'Catat angka nyata Anda sebelum membuat keputusan tentang bukti setor zakat.' },
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang bukti setor zakat',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/bukti-setor-zakat-yang-perlu-diminta',
				accessed_on: '2026-10-01',
			},
			{
				title: 'Panduan umum keuangan keluarga',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/panduan-umum',
				accessed_on: '2026-10-15',
			},
		],
		content: [
			p(
				'Bukti setor zakat perlu memuat identitas pembayar, jumlah, tanggal, dan nama lembaga penerima. Topik bukti setor zakat sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Pemahaman yang baik tentang bukti setor zakat juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu bukti setor zakat?'),
			p(
				'Ketika membicarakan bukti setor zakat, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang bukti setor zakat paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Satu hal yang sering terlupa adalah faktor waktu. Banyak aturan dan produk keuangan memiliki tenggat, masa tunggu, atau periode tertentu. Mengetahui jadwal tersebut sejak awal membuat Anda punya cukup ruang untuk menyiapkan dokumen dan dana yang dibutuhkan.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Kumpulkan dokumen dan catatan yang berkaitan dengan bukti setor zakat.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang bukti setor zakat mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.000.000 per bulan dan memutuskan menyisihkan 10% untuk keperluan ini. Artinya, sekitar Rp 300.000 disisihkan setiap bulan, atau Rp 2.100.000 dalam 7 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.000.000',
				'Porsi yang disisihkan: 10% atau Rp 300.000',
				'Akumulasi dalam 7 bulan: Rp 2.100.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 15%, jumlah yang disisihkan menjadi sekitar Rp 450.000 per bulan, atau Rp 3.150.000 dalam 7 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Catatan yang sederhana tetapi rutin lebih berguna daripada catatan lengkap yang hanya dibuat sekali.',
			),
			p(
				'Konsistensi biasanya lebih menentukan daripada besarnya angka. Rencana yang dijalankan setiap bulan, meskipun kecil, memberi hasil yang lebih dapat diandalkan daripada rencana besar yang sering tertunda. Jika suatu bulan rencana tidak berjalan, cukup lanjutkan pada bulan berikutnya tanpa perlu memulai dari awal.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang bukti setor zakat secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami bukti setor zakat, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak/pajak-zakat-donasi', 'topik Zakat & Donasi'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
	{
		slug: 'panduan-istilah-pajak-pribadi-untuk-pemula',
		title: 'Panduan lengkap memahami istilah pajak pribadi yang sering membingungkan pembayar pajak pemula di Indonesia',
		lead_text:
			'Istilah pajak menjadi lebih mudah dipahami jika dikelompokkan menurut tahap: penghasilan, pengurang, tarif, dan pelaporan.',
		article_type: 'standard',
		featured_image: 'kategori-pajak',
		primary_category: 'pajak',
		author: 'redaksi-contoh',
		reviewer: 'peninjau-contoh-satu',
		tags: ['pajak-karyawan'],
		first_published_at: '2026-10-21T14:00:00.000Z',
		last_reviewed_at: '2026-10-22T14:00:00.000Z',
		key_takeaways: [
			{
				text: 'Istilah pajak menjadi lebih mudah dipahami jika dikelompokkan menurut tahap: penghasilan, pengurang, tarif, dan pelaporan.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang istilah pajak pribadi.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Istilah pajak menjadi lebih mudah dipahami jika dikelompokkan menurut tahap: penghasilan, pengurang, tarif, dan pelaporan. Pembahasan tentang istilah pajak pribadi biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami istilah pajak pribadi tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu istilah pajak pribadi?'),
			p(
				'Ketika membicarakan istilah pajak pribadi, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang istilah pajak pribadi paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait istilah pajak pribadi. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tetapkan tanggal untuk meninjau ulang keputusan yang sudah diambil.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang istilah pajak pribadi mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 8.000.000 per bulan dan memutuskan menyisihkan 10% untuk keperluan ini. Artinya, sekitar Rp 800.000 disisihkan setiap bulan, atau Rp 15.200.000 dalam 19 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 8.000.000',
				'Porsi yang disisihkan: 10% atau Rp 800.000',
				'Akumulasi dalam 19 bulan: Rp 15.200.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 15%, jumlah yang disisihkan menjadi sekitar Rp 1.200.000 per bulan, atau Rp 22.800.000 dalam 19 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Mulailah dari langkah kecil yang bisa dilakukan minggu ini, bukan dari rencana besar yang sulit dijalankan.',
			),
			p(
				'Jangan ragu menyesuaikan rencana ketika kondisi berubah. Kenaikan penghasilan, tambahan tanggungan, atau kebutuhan mendesak adalah alasan yang wajar untuk meninjau kembali porsi dan prioritas. Yang penting, setiap perubahan dicatat agar Anda tetap tahu alasan di balik keputusan tersebut.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang istilah pajak pribadi secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pajak', 'topik Pajak'),
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
