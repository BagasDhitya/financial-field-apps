import { h2, link, ol, p, quote, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Articles in Warisan and its sub-categories (PRP-0002.p1 §S4.4). */
export const WARISAN_ARTICLES: ArticleEntry[] = [
	{
		slug: 'pentingnya-surat-wasiat',
		title: 'Mengapa surat wasiat penting meski harta tidak banyak?',
		lead_text:
			'Surat wasiat membantu keluarga memahami keinginan pemilik harta dan mengurangi potensi perselisihan. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-warisan',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=1I4CFABDcsA',
			title: 'Hindari Ribut-ribut Harta Warisan, Surat Wasiat Jadi Kunci?',
			channel_name: 'CNBC Indonesia',
			uploaded_at: '2023-06-29T09:00:01.000Z',
			duration_seconds: 677,
			caption:
				'Dialog CNBC Indonesia dengan seorang praktisi hukum tentang hal yang perlu diperhatikan pewaris dan ahli waris agar pembagian harta warisan tidak berujung sengketa, termasuk peran surat wasiat.',
		},
		primary_category: 'warisan-wasiat',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-dua',
		tags: ['warisan-keluarga'],
		first_published_at: '2026-10-18T18:00:00.000Z',
		last_reviewed_at: '2026-10-19T18:00:00.000Z',
		key_takeaways: [
			{
				text: 'Surat wasiat membantu keluarga memahami keinginan pemilik harta dan mengurangi potensi perselisihan.',
			},
			{ text: 'Catat angka nyata Anda sebelum membuat keputusan tentang surat wasiat.' },
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait surat wasiat?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang surat wasiat',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/pentingnya-surat-wasiat',
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
				'Surat wasiat membantu keluarga memahami keinginan pemilik harta dan mengurangi potensi perselisihan. Pembahasan tentang surat wasiat biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Pemahaman yang baik tentang surat wasiat juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu surat wasiat?'),
			p(
				'Ketika membicarakan surat wasiat, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang surat wasiat paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Satu hal yang sering terlupa adalah faktor waktu. Banyak aturan dan produk keuangan memiliki tenggat, masa tunggu, atau periode tertentu. Mengetahui jadwal tersebut sejak awal membuat Anda punya cukup ruang untuk menyiapkan dokumen dan dana yang dibutuhkan.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Kumpulkan dokumen dan catatan yang berkaitan dengan surat wasiat.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 7.000.000 per bulan dan memutuskan menyisihkan 6% untuk keperluan ini. Artinya, sekitar Rp 420.000 disisihkan setiap bulan, atau Rp 5.880.000 dalam 14 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 7.000.000',
				'Porsi yang disisihkan: 6% atau Rp 420.000',
				'Akumulasi dalam 14 bulan: Rp 5.880.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 11%, jumlah yang disisihkan menjadi sekitar Rp 770.000 per bulan, atau Rp 10.780.000 dalam 14 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang surat wasiat secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/warisan/warisan-wasiat', 'topik Surat Wasiat'),
				' atau lanjutkan ke ',
				link(
					'/artikel/biaya-mengurus-warisan-properti',
					'Biaya apa saja yang muncul saat mengurus warisan properti?',
				),
				'.',
			),
		],
	},
	{
		slug: 'biaya-mengurus-warisan-properti',
		title: 'Biaya apa saja yang muncul saat mengurus warisan properti?',
		lead_text:
			'Mengurus warisan properti memunculkan biaya administrasi, biaya jasa, dan kemungkinan pajak yang perlu diperkirakan sejak awal.',
		article_type: 'standard',
		featured_image: 'kategori-warisan',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=nMyh-W5Q6Gs',
			title: 'Cara dan Biaya Balik Nama Sertifikat Tanah Warisan Terbaru, Selesai dalam 10 Hari',
			channel_name: 'Kompas.com',
			uploaded_at: '2026-08-13T07:40:24.000Z',
			duration_seconds: 296,
			caption:
				'Kompas.com menjelaskan cara dan biaya balik nama sertifikat tanah warisan menurut aturan terbaru Kementerian ATR/BPN, dengan target penyelesaian paling lama 10 hari.',
		},
		primary_category: 'warisan-pajak-biaya',
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-satu',
		tags: ['warisan-keluarga'],
		first_published_at: '2026-10-17T08:00:00.000Z',
		last_reviewed_at: '2026-10-18T08:00:00.000Z',
		key_takeaways: [
			{
				text: 'Mengurus warisan properti memunculkan biaya administrasi, biaya jasa, dan kemungkinan pajak yang perlu diperkirakan sejak awal.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang biaya pengurusan warisan properti.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang biaya pengurusan warisan properti',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/biaya-mengurus-warisan-properti',
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
				'Mengurus warisan properti memunculkan biaya administrasi, biaya jasa, dan kemungkinan pajak yang perlu diperkirakan sejak awal. Banyak pembaca bertanya tentang biaya pengurusan warisan properti, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Pemahaman yang baik tentang biaya pengurusan warisan properti juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu biaya pengurusan warisan properti?'),
			p(
				'Biaya pengurusan warisan properti pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang biaya pengurusan warisan properti paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Satu hal yang sering terlupa adalah faktor waktu. Banyak aturan dan produk keuangan memiliki tenggat, masa tunggu, atau periode tertentu. Mengetahui jadwal tersebut sejak awal membuat Anda punya cukup ruang untuk menyiapkan dokumen dan dana yang dibutuhkan.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Kumpulkan dokumen dan catatan yang berkaitan dengan biaya pengurusan warisan properti.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.000.000 per bulan dan memutuskan menyisihkan 6% untuk keperluan ini. Artinya, sekitar Rp 180.000 disisihkan setiap bulan, atau Rp 1.080.000 dalam 6 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.000.000',
				'Porsi yang disisihkan: 6% atau Rp 180.000',
				'Akumulasi dalam 6 bulan: Rp 1.080.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 11%, jumlah yang disisihkan menjadi sekitar Rp 330.000 per bulan, atau Rp 1.980.000 dalam 6 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang biaya pengurusan warisan properti secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami biaya pengurusan warisan properti, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/warisan/warisan-pajak-biaya', 'topik Pajak & Biaya Warisan'),
				' atau lanjutkan ke ',
				link(
					'/artikel/pentingnya-surat-wasiat',
					'Mengapa surat wasiat penting meski harta tidak banyak?',
				),
				'.',
			),
		],
	},
	{
		slug: 'hibah-kepada-anak-semasa-hidup',
		title: 'Hibah kepada anak semasa hidup: hal yang perlu dipertimbangkan',
		lead_text:
			'Hibah semasa hidup perlu mempertimbangkan keadilan antar anak, dokumen, dan kebutuhan pemberi hibah di masa depan. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-warisan',
		primary_category: 'warisan-hibah',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-dua',
		tags: ['warisan-keluarga', 'keluarga-muda'],
		first_published_at: '2026-10-15T22:00:00.000Z',
		last_reviewed_at: '2026-10-16T22:00:00.000Z',
		key_takeaways: [
			{
				text: 'Hibah semasa hidup perlu mempertimbangkan keadilan antar anak, dokumen, dan kebutuhan pemberi hibah di masa depan.',
			},
			{ text: 'Catat angka nyata Anda sebelum membuat keputusan tentang hibah kepada anak.' },
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang hibah kepada anak',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/hibah-kepada-anak-semasa-hidup',
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
				'Hibah semasa hidup perlu mempertimbangkan keadilan antar anak, dokumen, dan kebutuhan pemberi hibah di masa depan. Banyak pembaca bertanya tentang hibah kepada anak, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami hibah kepada anak tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu hibah kepada anak?'),
			p(
				'Ketika membicarakan hibah kepada anak, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang hibah kepada anak paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait hibah kepada anak. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tetapkan tanggal untuk meninjau ulang keputusan yang sudah diambil.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan hibah kepada anak.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 5.000.000 per bulan dan memutuskan menyisihkan 6% untuk keperluan ini. Artinya, sekitar Rp 300.000 disisihkan setiap bulan, atau Rp 5.700.000 dalam 19 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 5.000.000',
				'Porsi yang disisihkan: 6% atau Rp 300.000',
				'Akumulasi dalam 19 bulan: Rp 5.700.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 11%, jumlah yang disisihkan menjadi sekitar Rp 550.000 per bulan, atau Rp 10.450.000 dalam 19 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang hibah kepada anak secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/warisan/warisan-hibah', 'topik Hibah'),
				' atau lanjutkan ke ',
				link(
					'/artikel/pentingnya-surat-wasiat',
					'Mengapa surat wasiat penting meski harta tidak banyak?',
				),
				'.',
			),
		],
	},
	{
		slug: 'merencanakan-biaya-pemakaman',
		title: 'Merencanakan biaya pemakaman tanpa membebani keluarga',
		lead_text:
			'Merencanakan biaya pemakaman lebih awal membuat keluarga tidak harus mengambil keputusan besar dalam waktu singkat. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-warisan',
		primary_category: 'warisan-pemakaman',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-satu',
		tags: ['warisan-keluarga'],
		first_published_at: '2026-10-14T12:00:00.000Z',
		last_reviewed_at: '2026-10-15T12:00:00.000Z',
		key_takeaways: [
			{
				text: 'Merencanakan biaya pemakaman lebih awal membuat keluarga tidak harus mengambil keputusan besar dalam waktu singkat.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang perencanaan biaya pemakaman.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Merencanakan biaya pemakaman lebih awal membuat keluarga tidak harus mengambil keputusan besar dalam waktu singkat. Banyak pembaca bertanya tentang perencanaan biaya pemakaman, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami perencanaan biaya pemakaman tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu perencanaan biaya pemakaman?'),
			p(
				'Ketika membicarakan perencanaan biaya pemakaman, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang perencanaan biaya pemakaman paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan perencanaan biaya pemakaman.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang perencanaan biaya pemakaman mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.000.000 per bulan dan memutuskan menyisihkan 8% untuk keperluan ini. Artinya, sekitar Rp 240.000 disisihkan setiap bulan, atau Rp 2.400.000 dalam 10 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.000.000',
				'Porsi yang disisihkan: 8% atau Rp 240.000',
				'Akumulasi dalam 10 bulan: Rp 2.400.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 13%, jumlah yang disisihkan menjadi sekitar Rp 390.000 per bulan, atau Rp 3.900.000 dalam 10 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang perencanaan biaya pemakaman secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/warisan/warisan-pemakaman', 'topik Pemakaman'),
				' atau lanjutkan ke ',
				link(
					'/artikel/pentingnya-surat-wasiat',
					'Mengapa surat wasiat penting meski harta tidak banyak?',
				),
				'.',
			),
		],
	},
	{
		slug: 'membuka-percakapan-soal-warisan',
		title: 'Cara membuka percakapan soal warisan dengan keluarga',
		lead_text:
			'Percakapan soal warisan lebih mudah dimulai dari tujuan bersama keluarga, bukan dari pembagian angka. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		primary_category: 'warisan-lainnya',
		author: 'penulis-contoh-tiga',
		tags: ['warisan-keluarga'],
		first_published_at: '2026-10-13T02:00:00.000Z',
		key_takeaways: [
			{
				text: 'Percakapan soal warisan lebih mudah dimulai dari tujuan bersama keluarga, bukan dari pembagian angka.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang percakapan keluarga soal warisan.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Percakapan soal warisan lebih mudah dimulai dari tujuan bersama keluarga, bukan dari pembagian angka. Banyak pembaca bertanya tentang percakapan keluarga soal warisan, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami percakapan keluarga soal warisan tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu percakapan keluarga soal warisan?'),
			p(
				'Ketika membicarakan percakapan keluarga soal warisan, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang percakapan keluarga soal warisan paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait percakapan keluarga soal warisan. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tetapkan tanggal untuk meninjau ulang keputusan yang sudah diambil.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan percakapan keluarga soal warisan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.000.000 per bulan dan memutuskan menyisihkan 8% untuk keperluan ini. Artinya, sekitar Rp 240.000 disisihkan setiap bulan, atau Rp 2.160.000 dalam 9 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.000.000',
				'Porsi yang disisihkan: 8% atau Rp 240.000',
				'Akumulasi dalam 9 bulan: Rp 2.160.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 13%, jumlah yang disisihkan menjadi sekitar Rp 390.000 per bulan, atau Rp 3.510.000 dalam 9 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang percakapan keluarga soal warisan secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/warisan/warisan-lainnya', 'topik Warisan Lainnya'),
				' atau lanjutkan ke ',
				link(
					'/artikel/pentingnya-surat-wasiat',
					'Mengapa surat wasiat penting meski harta tidak banyak?',
				),
				'.',
			),
		],
	},
];
