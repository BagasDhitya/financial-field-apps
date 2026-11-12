import { h2, link, ol, p, quote, say, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Articles in Bisnis and its sub-categories (PRP-0002.p1 §S4.4). */
export const BISNIS_ARTICLES: ArticleEntry[] = [
	{
		slug: 'modal-usaha-kecil',
		title: 'Modal usaha kecil: menabung, meminjam, atau mencari mitra?',
		lead_text:
			'Pilihan modal usaha kecil bergantung pada besar kebutuhan, kecepatan, dan seberapa besar kendali yang ingin dipertahankan.',
		article_type: 'standard',
		featured_image: 'kategori-bisnis',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=PHAuC9Jq6AA',
			title: 'Isu UMKM Sulit Dapat KUR, Menkeu Purbaya Bakal Investigasi',
			channel_name: 'CNBC Indonesia',
			uploaded_at: '2025-11-05T08:30:12.000Z',
			duration_seconds: 168,
			caption:
				'Berita CNBC Indonesia: Menteri Keuangan akan menyelidiki keluhan UMKM yang sulit mengakses Kredit Usaha Rakyat (KUR), salah satunya karena persyaratan agunan.',
		},
		primary_category: 'bisnis-pembiayaan',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-satu',
		tags: ['umkm'],
		first_published_at: '2026-08-20T06:00:00.000Z',
		content_updated_at: '2026-08-23T06:00:00.000Z',
		last_reviewed_at: '2026-08-21T06:00:00.000Z',
		key_takeaways: [
			{
				text: 'Pilihan modal usaha kecil bergantung pada besar kebutuhan, kecepatan, dan seberapa besar kendali yang ingin dipertahankan.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang pilihan modal usaha kecil.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait pilihan modal usaha kecil?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang pilihan modal usaha kecil',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/modal-usaha-kecil',
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
				'Pilihan modal usaha kecil bergantung pada besar kebutuhan, kecepatan, dan seberapa besar kendali yang ingin dipertahankan. Topik pilihan modal usaha kecil sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Pemahaman yang baik tentang pilihan modal usaha kecil juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu pilihan modal usaha kecil?'),
			p(
				'Pilihan modal usaha kecil pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pilihan modal usaha kecil paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan pilihan modal usaha kecil.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang pilihan modal usaha kecil mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
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
				'Catatan yang sederhana tetapi rutin lebih berguna daripada catatan lengkap yang hanya dibuat sekali.',
			),
			p(
				'Konsistensi biasanya lebih menentukan daripada besarnya angka. Rencana yang dijalankan setiap bulan, meskipun kecil, memberi hasil yang lebih dapat diandalkan daripada rencana besar yang sering tertunda. Jika suatu bulan rencana tidak berjalan, cukup lanjutkan pada bulan berikutnya tanpa perlu memulai dari awal.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pilihan modal usaha kecil secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/bisnis/bisnis-pembiayaan', 'topik Pembiayaan Usaha'),
				' atau lanjutkan ke ',
				link(
					'/artikel/pemasaran-usaha-rumahan-minim-anggaran',
					'Pemasaran usaha rumahan dengan anggaran minim',
				),
				'.',
			),
		],
	},
	{
		slug: 'pemasaran-usaha-rumahan-minim-anggaran',
		title: 'Pemasaran usaha rumahan dengan anggaran minim',
		lead_text:
			'Usaha rumahan dapat dipasarkan dengan anggaran minim melalui pelanggan pertama, ulasan, dan konsistensi konten. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-bisnis',
		primary_category: 'bisnis-pemasaran',
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-dua',
		tags: ['umkm'],
		first_published_at: '2026-08-18T20:00:00.000Z',
		last_reviewed_at: '2026-08-19T20:00:00.000Z',
		key_takeaways: [
			{
				text: 'Usaha rumahan dapat dipasarkan dengan anggaran minim melalui pelanggan pertama, ulasan, dan konsistensi konten.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang pemasaran usaha rumahan.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang pemasaran usaha rumahan',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/pemasaran-usaha-rumahan-minim-anggaran',
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
				'Usaha rumahan dapat dipasarkan dengan anggaran minim melalui pelanggan pertama, ulasan, dan konsistensi konten. Banyak pembaca bertanya tentang pemasaran usaha rumahan, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami pemasaran usaha rumahan tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu pemasaran usaha rumahan?'),
			p(
				'Ketika membicarakan pemasaran usaha rumahan, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pemasaran usaha rumahan paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 8.000.000 per bulan dan memutuskan menyisihkan 10% untuk keperluan ini. Artinya, sekitar Rp 800.000 disisihkan setiap bulan, atau Rp 8.800.000 dalam 11 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 8.000.000',
				'Porsi yang disisihkan: 10% atau Rp 800.000',
				'Akumulasi dalam 11 bulan: Rp 8.800.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 15%, jumlah yang disisihkan menjadi sekitar Rp 1.200.000 per bulan, atau Rp 13.200.000 dalam 11 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pemasaran usaha rumahan secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/bisnis/bisnis-pemasaran', 'topik Pemasaran'),
				' atau lanjutkan ke ',
				link(
					'/artikel/modal-usaha-kecil',
					'Modal usaha kecil: menabung, meminjam, atau mencari mitra?',
				),
				'.',
			),
		],
	},
	{
		slug: 'wawancara-memisahkan-uang-pribadi-dan-usaha',
		title: 'Wawancara: memisahkan uang pribadi dan uang usaha',
		lead_text:
			'Narasumber Contoh Tiga, pemilik usaha katering rumahan, menceritakan mengapa ia memisahkan rekening pribadi dan usaha, serta cara menggaji diri sendiri setiap bulan.',
		article_type: 'interview',
		featured_image: 'kategori-bisnis',
		primary_category: 'bisnis-lainnya',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		tags: ['umkm'],
		first_published_at: '2026-08-17T10:00:00.000Z',
		last_reviewed_at: '2026-08-18T10:00:00.000Z',
		key_takeaways: [
			{ text: 'Buka rekening khusus usaha dan arahkan semua pembayaran pelanggan ke sana.' },
			{
				text: 'Tetapkan gaji bulanan untuk diri sendiri, bukan mengambil uang usaha setiap kali perlu.',
			},
			{
				text: 'Catat penerimaan dan pengeluaran usaha setiap hari agar laba sebenarnya terlihat.',
			},
		],
		content: [
			p(
				'Narasumber Contoh Tiga memulai usaha katering dari dapur rumahnya lima tahun lalu. Pada tahun kedua pesanan ramai, tetapi uangnya selalu terasa habis. Kami berbincang tentang langkah yang akhirnya membuat keuangan usahanya lebih jelas. Nama narasumber dan angka dalam wawancara ini fiktif; jawaban telah disunting agar ringkas.',
			),
			say(
				'Penulis Contoh Dua',
				'Apa tanda bahwa uang pribadi dan uang usaha Anda tercampur?',
			),
			say(
				'Narasumber Contoh Tiga',
				'Saya tidak bisa menjawab pertanyaan sederhana: bulan ini usaha saya untung atau rugi? Uang belanja bahan, uang sekolah anak, dan uang dari pelanggan masuk dan keluar dari rekening yang sama.',
			),
			p(
				'Saya merasa usahanya ramai, tetapi tabungan keluarga tidak bertambah. Ternyata sebagian keuntungan habis untuk kebutuhan rumah tanpa pernah tercatat.',
			),
			say('Penulis Contoh Dua', 'Langkah pertama apa yang Anda ambil?'),
			say(
				'Narasumber Contoh Tiga',
				'Membuka rekening kedua, khusus untuk usaha. Semua pembayaran pelanggan, termasuk lewat QRIS, saya arahkan ke rekening itu. Belanja bahan, gas, dan kemasan juga dibayar dari sana.',
			),
			p(
				'Butuh disiplin di bulan-bulan awal, karena kebiasaan lama selalu menggoda. Setelah tiga bulan, saya bisa melihat dengan jelas berapa uang yang masuk dan ke mana perginya.',
			),
			say('Penulis Contoh Dua', 'Lalu bagaimana Anda mengambil uang untuk kebutuhan rumah?'),
			say(
				'Narasumber Contoh Tiga',
				'Saya menggaji diri sendiri. Setiap tanggal satu, sejumlah tetap dipindahkan dari rekening usaha ke rekening pribadi, misalnya Rp4 juta, angka fiktif. Kalau laba bulan itu lebih besar, kelebihannya tetap di rekening usaha sebagai cadangan atau untuk membeli peralatan.',
			),
			p(
				'Dengan cara ini, keluarga punya penghasilan yang bisa diperkirakan, dan usaha tidak kekurangan modal kerja saat pesanan sepi.',
			),
			say('Penulis Contoh Dua', 'Bagaimana Anda mencatat keuangan usaha?'),
			say(
				'Narasumber Contoh Tiga',
				'Awalnya di buku tulis, sekarang di lembar kerja sederhana di ponsel. Setiap malam saya catat penerimaan dan pengeluaran hari itu, lengkap dengan foto nota bila ada. Waktunya kurang dari sepuluh menit.',
			),
			p(
				'Catatan ini juga berguna ketika saya mengajukan pembiayaan usaha. Pemberi pinjaman ingin melihat arus kas, bukan sekadar cerita bahwa usaha sedang ramai.',
			),
			say('Penulis Contoh Dua', 'Bagaimana dengan pajak usaha Anda?'),
			say(
				'Narasumber Contoh Tiga',
				'Sejak omzet mulai stabil, saya mendaftarkan usaha dan mencari tahu kewajiban pajak untuk usaha kecil. Karena uang usaha sudah terpisah, menghitung omzet bulanan menjadi mudah: cukup lihat mutasi rekening usaha dan catatan harian.',
			),
			p(
				'Saran saya, tanyakan langsung ke kantor pajak terdekat atau saluran resmi DJP tentang aturan yang berlaku untuk usaha Anda, karena ketentuannya bisa berubah.',
			),
			say(
				'Penulis Contoh Dua',
				'Apa kesalahan yang pernah Anda buat setelah memisahkan rekening?',
			),
			say(
				'Narasumber Contoh Tiga',
				'Meminjam dari rekening usaha untuk keperluan rumah, lalu lupa mengembalikannya. Sekarang setiap pinjaman seperti itu saya catat sebagai utang pribadi kepada usaha, lengkap dengan tanggal pengembaliannya.',
			),
			say('Penulis Contoh Dua', 'Apa saran Anda untuk pemilik usaha kecil lain?'),
			say(
				'Narasumber Contoh Tiga',
				'Jangan menunggu usaha besar untuk mulai rapi. Justru saat masih kecil, memisahkan uang paling mudah dilakukan. Mulailah dengan satu rekening, satu catatan harian, dan satu tanggal gajian untuk diri sendiri.',
			),
			h2('Baca juga'),
			ul(
				link(
					'/artikel/modal-usaha-kecil',
					'Modal usaha kecil: menabung, meminjam, atau mencari mitra?',
				),
				link(
					'/artikel/mencatat-penghasilan-kerja-sampingan',
					'Kerja sampingan: mencatat penghasilan tambahan dengan rapi',
				),
				link('/kategori/bisnis', 'Semua artikel di topik Bisnis'),
			),
		],
	},
];
