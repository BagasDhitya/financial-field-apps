import { h2, link, ol, p, quote, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Articles in Pensiun and its sub-categories (PRP-0002.p1 §S4.4). */
export const PENSIUN_ARTICLES: ArticleEntry[] = [
	{
		slug: 'manfaat-program-pensiun-pemerintah',
		title: 'Mengenal manfaat program pensiun pemerintah bagi pekerja',
		lead_text:
			'Program pensiun pemerintah memberi dasar perlindungan di hari tua, tetapi biasanya perlu dilengkapi tabungan pribadi. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pensiun',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=MuYDRq4tw5I',
			title: 'Jaminan Pensiun Cair di Usia 59 Tahun, Pekerja Rugi atau Untung? | Liputan 6',
			channel_name: 'Liputan6',
			uploaded_at: '2025-01-09T06:54:41.000Z',
			duration_seconds: 170,
			caption:
				'Liputan 6 SCTV: sejak Januari 2025 usia pensiun pekerja menjadi 59 tahun, yang memengaruhi kapan peserta BPJS Ketenagakerjaan dapat mencairkan Jaminan Pensiun.',
		},
		primary_category: 'pensiun-pemerintah',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		tags: ['pensiun'],
		first_published_at: '2026-10-11T16:00:00.000Z',
		last_reviewed_at: '2026-10-12T16:00:00.000Z',
		key_takeaways: [
			{
				text: 'Program pensiun pemerintah memberi dasar perlindungan di hari tua, tetapi biasanya perlu dilengkapi tabungan pribadi.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang program pensiun pemerintah.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait program pensiun pemerintah?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang program pensiun pemerintah perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang program pensiun pemerintah',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/manfaat-program-pensiun-pemerintah',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Program pensiun pemerintah memberi dasar perlindungan di hari tua, tetapi biasanya perlu dilengkapi tabungan pribadi. Banyak pembaca bertanya tentang program pensiun pemerintah, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami program pensiun pemerintah tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu program pensiun pemerintah?'),
			p(
				'Program pensiun pemerintah pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang program pensiun pemerintah paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait program pensiun pemerintah. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
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
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang program pensiun pemerintah mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 7.500.000 per bulan dan memutuskan menyisihkan 5% untuk keperluan ini. Artinya, sekitar Rp 375.000 disisihkan setiap bulan, atau Rp 3.000.000 dalam 8 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 7.500.000',
				'Porsi yang disisihkan: 5% atau Rp 375.000',
				'Akumulasi dalam 8 bulan: Rp 3.000.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 10%, jumlah yang disisihkan menjadi sekitar Rp 750.000 per bulan, atau Rp 6.000.000 dalam 8 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang program pensiun pemerintah secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami program pensiun pemerintah, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pensiun/pensiun-pemerintah', 'topik Program Pensiun Pemerintah'),
				' atau lanjutkan ke ',
				link(
					'/artikel/dana-pensiun-kantor-saat-pindah-kerja',
					'Dana pensiun dari kantor: apa yang terjadi saat pindah kerja?',
				),
				'.',
			),
		],
	},
	{
		slug: 'dana-pensiun-kantor-saat-pindah-kerja',
		title: 'Dana pensiun dari kantor: apa yang terjadi saat pindah kerja?',
		lead_text:
			'Saat pindah kerja, dana pensiun dari kantor lama perlu dicek statusnya agar tidak terlupakan. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pensiun',
		primary_category: 'pensiun-pemberi-kerja',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-dua',
		tags: ['pensiun', 'karier-awal'],
		first_published_at: '2026-10-10T06:00:00.000Z',
		last_reviewed_at: '2026-10-11T06:00:00.000Z',
		key_takeaways: [
			{
				text: 'Saat pindah kerja, dana pensiun dari kantor lama perlu dicek statusnya agar tidak terlupakan.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang dana pensiun pemberi kerja saat pindah kerja.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang dana pensiun pemberi kerja saat pindah kerja',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/dana-pensiun-kantor-saat-pindah-kerja',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Saat pindah kerja, dana pensiun dari kantor lama perlu dicek statusnya agar tidak terlupakan. Pembahasan tentang dana pensiun pemberi kerja saat pindah kerja biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Pemahaman yang baik tentang dana pensiun pemberi kerja saat pindah kerja juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu dana pensiun pemberi kerja saat pindah kerja?'),
			p(
				'Secara sederhana, dana pensiun pemberi kerja saat pindah kerja adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang dana pensiun pemberi kerja saat pindah kerja paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Perlu diingat juga bahwa aturan dan ketentuan dapat berubah dari waktu ke waktu. Karena itu, pastikan informasi yang Anda gunakan masih berlaku, terutama jika keputusan yang akan diambil melibatkan jumlah uang yang besar atau jangka waktu yang panjang.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan dana pensiun pemberi kerja saat pindah kerja.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 5.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 495.000 disisihkan setiap bulan, atau Rp 5.940.000 dalam 12 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 5.500.000',
				'Porsi yang disisihkan: 9% atau Rp 495.000',
				'Akumulasi dalam 12 bulan: Rp 5.940.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 770.000 per bulan, atau Rp 9.240.000 dalam 12 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Ajak anggota keluarga yang terlibat sejak awal agar rencana lebih mudah dijalankan bersama.',
			),
			p(
				'Konsistensi biasanya lebih menentukan daripada besarnya angka. Rencana yang dijalankan setiap bulan, meskipun kecil, memberi hasil yang lebih dapat diandalkan daripada rencana besar yang sering tertunda. Jika suatu bulan rencana tidak berjalan, cukup lanjutkan pada bulan berikutnya tanpa perlu memulai dari awal.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang dana pensiun pemberi kerja saat pindah kerja secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pensiun/pensiun-pemberi-kerja', 'topik Dana Pensiun Pemberi Kerja'),
				' atau lanjutkan ke ',
				link(
					'/artikel/manfaat-program-pensiun-pemerintah',
					'Mengenal manfaat program pensiun pemerintah bagi pekerja',
				),
				'.',
			),
		],
	},
	{
		slug: 'dplk-untuk-pekerja-mandiri',
		title: 'DPLK untuk pekerja mandiri: cara kerja dan pertimbangannya',
		lead_text:
			'DPLK memungkinkan pekerja mandiri menyisihkan dana pensiun secara rutin dengan aturan penarikan tertentu. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pensiun',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=IMOkRUu_Iag',
			title: 'Jurus DPLK Tambah Perserta Dana Pensiunan & Tingkatkan Aset',
			channel_name: 'CNBC Indonesia',
			uploaded_at: '2023-10-17T07:22:21.000Z',
			duration_seconds: 383,
			caption:
				'Ketua Umum Perkumpulan DPLK menjelaskan di CNBC Indonesia bahwa peserta DPLK memilih sendiri instrumen investasinya dari pilihan yang disediakan, serta upaya industri menambah jumlah peserta.',
		},
		primary_category: 'pensiun-dplk',
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-satu',
		tags: ['pensiun'],
		first_published_at: '2026-10-08T20:00:00.000Z',
		last_reviewed_at: '2026-10-09T20:00:00.000Z',
		key_takeaways: [
			{
				text: 'DPLK memungkinkan pekerja mandiri menyisihkan dana pensiun secara rutin dengan aturan penarikan tertentu.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang DPLK untuk pekerja mandiri.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang DPLK untuk pekerja mandiri',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/dplk-untuk-pekerja-mandiri',
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
				'DPLK memungkinkan pekerja mandiri menyisihkan dana pensiun secara rutin dengan aturan penarikan tertentu. Pembahasan tentang DPLK untuk pekerja mandiri biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami DPLK untuk pekerja mandiri tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu DPLK untuk pekerja mandiri?'),
			p(
				'DPLK untuk pekerja mandiri pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang DPLK untuk pekerja mandiri paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Satu hal yang sering terlupa adalah faktor waktu. Banyak aturan dan produk keuangan memiliki tenggat, masa tunggu, atau periode tertentu. Mengetahui jadwal tersebut sejak awal membuat Anda punya cukup ruang untuk menyiapkan dokumen dan dana yang dibutuhkan.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tetapkan tanggal untuk meninjau ulang keputusan yang sudah diambil.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan DPLK untuk pekerja mandiri.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 5.000.000 per bulan dan memutuskan menyisihkan 10% untuk keperluan ini. Artinya, sekitar Rp 500.000 disisihkan setiap bulan, atau Rp 3.000.000 dalam 6 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 5.000.000',
				'Porsi yang disisihkan: 10% atau Rp 500.000',
				'Akumulasi dalam 6 bulan: Rp 3.000.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 15%, jumlah yang disisihkan menjadi sekitar Rp 750.000 per bulan, atau Rp 4.500.000 dalam 6 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang DPLK untuk pekerja mandiri secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pensiun/pensiun-dplk', 'topik DPLK'),
				' atau lanjutkan ke ',
				link(
					'/artikel/manfaat-program-pensiun-pemerintah',
					'Mengenal manfaat program pensiun pemerintah bagi pekerja',
				),
				'.',
			),
		],
	},
	{
		slug: 'menghitung-kebutuhan-dana-pensiun',
		title: 'Berapa dana pensiun yang cukup? Cara menghitung kebutuhan kasar',
		lead_text:
			'Kebutuhan dana pensiun dapat diperkirakan dari pengeluaran bulanan saat ini, perkiraan inflasi, dan lama masa pensiun. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-pensiun',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=fXuVH71b0-4',
			title: 'Cara Mempersiapkan Dana Pensiun, Simak Perhitungannya!',
			channel_name: 'CNBC Indonesia',
			uploaded_at: '2024-09-16T09:00:40.000Z',
			duration_seconds: 878,
			caption:
				'Financial Expert CNBC Indonesia membahas cara mempersiapkan dana pensiun dan menghitung kebutuhannya dalam program Investime.',
		},
		primary_category: 'pensiun-lainnya',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-dua',
		tags: ['pensiun', 'investasi-pemula'],
		first_published_at: '2026-10-07T10:00:00.000Z',
		content_updated_at: '2026-10-10T10:00:00.000Z',
		last_reviewed_at: '2026-10-08T10:00:00.000Z',
		key_takeaways: [
			{
				text: 'Kebutuhan dana pensiun dapat diperkirakan dari pengeluaran bulanan saat ini, perkiraan inflasi, dan lama masa pensiun.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang kebutuhan dana pensiun.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait kebutuhan dana pensiun?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question: 'Seberapa sering rencana tentang kebutuhan dana pensiun perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang kebutuhan dana pensiun',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/menghitung-kebutuhan-dana-pensiun',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Kebutuhan dana pensiun dapat diperkirakan dari pengeluaran bulanan saat ini, perkiraan inflasi, dan lama masa pensiun. Topik kebutuhan dana pensiun sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Mengapa kebutuhan dana pensiun penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu kebutuhan dana pensiun?'),
			p(
				'Ketika membicarakan kebutuhan dana pensiun, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang kebutuhan dana pensiun paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan kebutuhan dana pensiun.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 5.500.000 per bulan dan memutuskan menyisihkan 5% untuk keperluan ini. Artinya, sekitar Rp 275.000 disisihkan setiap bulan, atau Rp 3.300.000 dalam 12 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 5.500.000',
				'Porsi yang disisihkan: 5% atau Rp 275.000',
				'Akumulasi dalam 12 bulan: Rp 3.300.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 10%, jumlah yang disisihkan menjadi sekitar Rp 550.000 per bulan, atau Rp 6.600.000 dalam 12 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang kebutuhan dana pensiun secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pensiun/pensiun-lainnya', 'topik Pensiun Lainnya'),
				' atau lanjutkan ke ',
				link(
					'/artikel/manfaat-program-pensiun-pemerintah',
					'Mengenal manfaat program pensiun pemerintah bagi pekerja',
				),
				'.',
			),
		],
	},
];
