import { h2, link, ol, p, quote, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Articles in Gaya Hidup and its sub-categories (PRP-0002.p1 §S4.4). */
export const GAYA_HIDUP_ARTICLES: ArticleEntry[] = [
	{
		slug: 'biaya-tahun-pertama-anak',
		title: 'Biaya membesarkan anak di tahun pertama: daftar yang sering terlupa',
		lead_text:
			'Biaya tahun pertama anak tidak hanya kebutuhan harian, tetapi juga kesehatan, perlengkapan, dan perubahan penghasilan keluarga.',
		article_type: 'standard',
		featured_image: 'kategori-gaya-hidup',
		primary_category: 'gaya-hidup-anak',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-dua',
		tags: ['keluarga-muda', 'anggaran-bulanan'],
		first_published_at: '2026-09-16T04:00:00.000Z',
		last_reviewed_at: '2026-09-17T04:00:00.000Z',
		key_takeaways: [
			{
				text: 'Biaya tahun pertama anak tidak hanya kebutuhan harian, tetapi juga kesehatan, perlengkapan, dan perubahan penghasilan keluarga.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang biaya tahun pertama anak.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang biaya tahun pertama anak',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/biaya-tahun-pertama-anak',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Biaya tahun pertama anak tidak hanya kebutuhan harian, tetapi juga kesehatan, perlengkapan, dan perubahan penghasilan keluarga. Pembahasan tentang biaya tahun pertama anak biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Mengapa biaya tahun pertama anak penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu biaya tahun pertama anak?'),
			p(
				'Biaya tahun pertama anak pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang biaya tahun pertama anak paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait biaya tahun pertama anak. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan biaya tahun pertama anak.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 6.500.000 per bulan dan memutuskan menyisihkan 5% untuk keperluan ini. Artinya, sekitar Rp 325.000 disisihkan setiap bulan, atau Rp 6.500.000 dalam 20 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 6.500.000',
				'Porsi yang disisihkan: 5% atau Rp 325.000',
				'Akumulasi dalam 20 bulan: Rp 6.500.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 10%, jumlah yang disisihkan menjadi sekitar Rp 650.000 per bulan, atau Rp 13.000.000 dalam 20 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang biaya tahun pertama anak secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami biaya tahun pertama anak, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/gaya-hidup/gaya-hidup-anak', 'topik Anak & Keluarga'),
				' atau lanjutkan ke ',
				link(
					'/artikel/membeli-perabot-tanpa-utang',
					'Membeli perabot tanpa utang: strategi menabung bertahap',
				),
				'.',
			),
		],
	},
	{
		slug: 'membeli-perabot-tanpa-utang',
		title: 'Membeli perabot tanpa utang: strategi menabung bertahap',
		lead_text:
			'Perabot dapat dibeli tanpa utang dengan menabung bertahap sesuai prioritas ruangan dan kebutuhan. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-gaya-hidup',
		primary_category: 'gaya-hidup-rumah',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		tags: ['anggaran-bulanan'],
		first_published_at: '2026-09-14T18:00:00.000Z',
		last_reviewed_at: '2026-09-15T18:00:00.000Z',
		key_takeaways: [
			{
				text: 'Perabot dapat dibeli tanpa utang dengan menabung bertahap sesuai prioritas ruangan dan kebutuhan.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang pembelian perabot tanpa utang.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Perabot dapat dibeli tanpa utang dengan menabung bertahap sesuai prioritas ruangan dan kebutuhan. Topik pembelian perabot tanpa utang sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami pembelian perabot tanpa utang tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu pembelian perabot tanpa utang?'),
			p(
				'Ketika membicarakan pembelian perabot tanpa utang, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pembelian perabot tanpa utang paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Satu hal yang sering terlupa adalah faktor waktu. Banyak aturan dan produk keuangan memiliki tenggat, masa tunggu, atau periode tertentu. Mengetahui jadwal tersebut sejak awal membuat Anda punya cukup ruang untuk menyiapkan dokumen dan dana yang dibutuhkan.',
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
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 7.500.000 per bulan dan memutuskan menyisihkan 5% untuk keperluan ini. Artinya, sekitar Rp 375.000 disisihkan setiap bulan, atau Rp 6.000.000 dalam 16 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 7.500.000',
				'Porsi yang disisihkan: 5% atau Rp 375.000',
				'Akumulasi dalam 16 bulan: Rp 6.000.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 10%, jumlah yang disisihkan menjadi sekitar Rp 750.000 per bulan, atau Rp 12.000.000 dalam 16 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pembelian perabot tanpa utang secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/gaya-hidup/gaya-hidup-rumah', 'topik Perabot & Rumah'),
				' atau lanjutkan ke ',
				link(
					'/artikel/biaya-tahun-pertama-anak',
					'Biaya membesarkan anak di tahun pertama: daftar yang sering terlupa',
				),
				'.',
			),
		],
	},
	{
		slug: 'keamanan-dompet-digital',
		title: 'Dompet digital dan keamanan: kebiasaan sederhana agar saldo aman',
		lead_text:
			'Saldo dompet digital lebih aman jika kode rahasia dijaga, notifikasi diaktifkan, dan saldo besar tidak disimpan terlalu lama.',
		article_type: 'standard',
		featured_image: 'kategori-gaya-hidup',
		primary_category: 'gaya-hidup-nontunai',
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-dua',
		tags: ['nontunai'],
		first_published_at: '2026-09-13T08:00:00.000Z',
		last_reviewed_at: '2026-09-14T08:00:00.000Z',
		key_takeaways: [
			{
				text: 'Saldo dompet digital lebih aman jika kode rahasia dijaga, notifikasi diaktifkan, dan saldo besar tidak disimpan terlalu lama.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang keamanan dompet digital.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait keamanan dompet digital?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang keamanan dompet digital',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/keamanan-dompet-digital',
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
				'Saldo dompet digital lebih aman jika kode rahasia dijaga, notifikasi diaktifkan, dan saldo besar tidak disimpan terlalu lama. Topik keamanan dompet digital sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Mengapa keamanan dompet digital penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu keamanan dompet digital?'),
			p(
				'Keamanan dompet digital pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang keamanan dompet digital paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Perlu diingat juga bahwa aturan dan ketentuan dapat berubah dari waktu ke waktu. Karena itu, pastikan informasi yang Anda gunakan masih berlaku, terutama jika keputusan yang akan diambil melibatkan jumlah uang yang besar atau jangka waktu yang panjang.',
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
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 6.000.000 per bulan dan memutuskan menyisihkan 10% untuk keperluan ini. Artinya, sekitar Rp 600.000 disisihkan setiap bulan, atau Rp 9.600.000 dalam 16 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 6.000.000',
				'Porsi yang disisihkan: 10% atau Rp 600.000',
				'Akumulasi dalam 16 bulan: Rp 9.600.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 15%, jumlah yang disisihkan menjadi sekitar Rp 900.000 per bulan, atau Rp 14.400.000 dalam 16 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang keamanan dompet digital secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami keamanan dompet digital, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/gaya-hidup/gaya-hidup-nontunai', 'topik Nontunai'),
				' atau lanjutkan ke ',
				link(
					'/artikel/biaya-tahun-pertama-anak',
					'Biaya membesarkan anak di tahun pertama: daftar yang sering terlupa',
				),
				'.',
			),
		],
	},
	{
		slug: 'anggaran-memelihara-hewan',
		title: 'Berapa anggaran memelihara kucing atau anjing per bulan?',
		lead_text:
			'Anggaran hewan peliharaan mencakup makanan, perawatan rutin, kesehatan, dan dana cadangan untuk kebutuhan mendadak. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-gaya-hidup',
		primary_category: 'gaya-hidup-hewan',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-satu',
		tags: ['anggaran-bulanan'],
		first_published_at: '2026-09-11T22:00:00.000Z',
		last_reviewed_at: '2026-09-12T22:00:00.000Z',
		key_takeaways: [
			{
				text: 'Anggaran hewan peliharaan mencakup makanan, perawatan rutin, kesehatan, dan dana cadangan untuk kebutuhan mendadak.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang anggaran memelihara hewan.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Anggaran hewan peliharaan mencakup makanan, perawatan rutin, kesehatan, dan dana cadangan untuk kebutuhan mendadak. Banyak pembaca bertanya tentang anggaran memelihara hewan, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami anggaran memelihara hewan tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu anggaran memelihara hewan?'),
			p(
				'Secara sederhana, anggaran memelihara hewan adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang anggaran memelihara hewan paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait anggaran memelihara hewan. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Kumpulkan dokumen dan catatan yang berkaitan dengan anggaran memelihara hewan.',
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
				'Mulailah dari langkah kecil yang bisa dilakukan minggu ini, bukan dari rencana besar yang sulit dijalankan.',
			),
			p(
				'Jangan ragu menyesuaikan rencana ketika kondisi berubah. Kenaikan penghasilan, tambahan tanggungan, atau kebutuhan mendesak adalah alasan yang wajar untuk meninjau kembali porsi dan prioritas. Yang penting, setiap perubahan dicatat agar Anda tetap tahu alasan di balik keputusan tersebut.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang anggaran memelihara hewan secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/gaya-hidup/gaya-hidup-hewan', 'topik Hewan Peliharaan'),
				' atau lanjutkan ke ',
				link(
					'/artikel/biaya-tahun-pertama-anak',
					'Biaya membesarkan anak di tahun pertama: daftar yang sering terlupa',
				),
				'.',
			),
		],
	},
	{
		slug: 'liburan-hemat-tanpa-paylater',
		title: 'Liburan hemat tanpa paylater: merencanakan dari jauh hari',
		lead_text:
			'Liburan tanpa paylater dimulai dengan menentukan anggaran total dan menabung khusus beberapa bulan sebelumnya. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-gaya-hidup',
		primary_category: 'gaya-hidup-lainnya',
		author: 'penulis-contoh-dua',
		tags: ['nontunai', 'dana-darurat'],
		first_published_at: '2026-09-10T12:00:00.000Z',
		key_takeaways: [
			{
				text: 'Liburan tanpa paylater dimulai dengan menentukan anggaran total dan menabung khusus beberapa bulan sebelumnya.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang liburan tanpa paylater.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Liburan tanpa paylater dimulai dengan menentukan anggaran total dan menabung khusus beberapa bulan sebelumnya. Topik liburan tanpa paylater sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami liburan tanpa paylater tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu liburan tanpa paylater?'),
			p(
				'Secara sederhana, liburan tanpa paylater adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang liburan tanpa paylater paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait liburan tanpa paylater. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
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
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang liburan tanpa paylater mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 8.000.000 per bulan dan memutuskan menyisihkan 8% untuk keperluan ini. Artinya, sekitar Rp 640.000 disisihkan setiap bulan, atau Rp 13.440.000 dalam 21 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 8.000.000',
				'Porsi yang disisihkan: 8% atau Rp 640.000',
				'Akumulasi dalam 21 bulan: Rp 13.440.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 13%, jumlah yang disisihkan menjadi sekitar Rp 1.040.000 per bulan, atau Rp 21.840.000 dalam 21 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang liburan tanpa paylater secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami liburan tanpa paylater, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/gaya-hidup/gaya-hidup-lainnya', 'topik Gaya Hidup Lainnya'),
				' atau lanjutkan ke ',
				link(
					'/artikel/biaya-tahun-pertama-anak',
					'Biaya membesarkan anak di tahun pertama: daftar yang sering terlupa',
				),
				'.',
			),
		],
	},
];
