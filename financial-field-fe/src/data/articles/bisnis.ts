import { h2, link, ol, p, quote, ul } from '../blocks';
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
			'Narasumber Contoh berbagi pengalaman tentang manfaat memisahkan rekening pribadi dan rekening usaha. Simak pengalaman, kesalahan yang sering terjadi, dan sarannya dalam wawancara berikut.',
		article_type: 'interview',
		featured_image: 'kategori-bisnis',
		primary_category: 'bisnis-lainnya',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		tags: ['umkm'],
		first_published_at: '2026-08-17T10:00:00.000Z',
		last_reviewed_at: '2026-08-18T10:00:00.000Z',
		key_takeaways: [
			{
				text: 'Narasumber Contoh berbagi pengalaman tentang manfaat memisahkan rekening pribadi dan rekening usaha.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang pemisahan uang pribadi dan uang usaha.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Narasumber Contoh berbagi pengalaman tentang manfaat memisahkan rekening pribadi dan rekening usaha. Dalam percakapan berikut, Narasumber Contoh menceritakan pengalamannya tentang pemisahan uang pribadi dan uang usaha, kesalahan yang pernah dilihatnya, dan kebiasaan yang menurutnya paling membantu bagi pembaca yang baru memulai. Jawaban telah disunting agar ringkas, tanpa mengubah maksud yang ingin disampaikan.',
			),
			h2('Bagaimana awalnya Anda tertarik pada pemisahan uang pribadi dan uang usaha?'),
			p(
				'Awalnya karena kebutuhan sendiri. Beberapa tahun lalu saya membuat beberapa keputusan keuangan tanpa rencana, dan hasilnya kurang memuaskan. Sejak itu saya merasa perlu memahami pemisahan uang pribadi dan uang usaha dengan lebih serius. Saya mulai dari hal sederhana: membaca, mencatat, dan bertanya kepada orang yang lebih berpengalaman, sedikit demi sedikit, tanpa target yang berlebihan.',
			),
			p(
				'Yang paling saya pelajari dari masa itu adalah bahwa memulai dengan pertanyaan sederhana jauh lebih mudah daripada menunggu sampai merasa benar-benar siap. Perasaan siap itu sering tidak pernah datang. Jadi, saya memilih untuk mulai dengan pengetahuan yang ada, lalu memperbaikinya sambil berjalan.',
			),
			h2('Kesalahan apa yang paling sering Anda lihat?'),
			p(
				'Terburu-buru. Banyak orang ingin hasil yang cepat, lalu mengambil keputusan berdasarkan cerita teman atau unggahan di media sosial tanpa melihat kondisi sendiri. Padahal, apa yang cocok untuk orang lain belum tentu cocok untuk kita, karena penghasilan, tanggungan, dan tujuan setiap orang berbeda.',
			),
			p(
				'Kesalahan berikutnya adalah tidak mencatat. Tanpa catatan, sulit mengetahui apakah sebuah rencana berjalan atau tidak. Banyak orang merasa sudah berhemat, tetapi ketika angkanya dilihat, ternyata pengeluaran justru naik. Catatan yang sederhana sudah cukup, asalkan dibuat secara rutin dan jujur.',
			),
			h2('Kebiasaan apa yang paling membantu Anda?'),
			p(
				'Meninjau rencana secara rutin. Saya menyisihkan sekitar tiga puluh menit setiap akhir bulan untuk melihat angka, membandingkannya dengan rencana, dan menyesuaikan langkah untuk bulan berikutnya. Waktunya tidak lama, tetapi manfaatnya terasa karena masalah kecil bisa terlihat sebelum menjadi besar.',
			),
			p(
				'Kebiasaan kecil ini memang terasa membosankan pada awalnya. Namun setelah beberapa bulan, saya mulai melihat pola: pengeluaran mana yang selalu muncul, kapan kebutuhan besar biasanya datang, dan berapa sebenarnya yang bisa disisihkan. Pola inilah yang kemudian membuat rencana saya lebih realistis.',
			),
			h2('Apa saran Anda untuk pembaca yang baru mulai?'),
			p(
				'Mulailah dari langkah yang bisa dilakukan minggu ini. Tidak perlu sempurna; yang penting konsisten. Misalnya, catat semua pengeluaran selama satu minggu, lalu lihat hasilnya bersama keluarga. Dari situ biasanya muncul satu atau dua hal yang bisa langsung diperbaiki tanpa harus mengubah gaya hidup secara drastis. Setelah itu, tambahkan satu kebiasaan baru setiap bulan.',
			),
			p(
				'Dan jangan ragu bertanya kepada orang yang lebih memahami topiknya sebelum mengambil keputusan besar. Bertanya bukan tanda tidak tahu, melainkan cara untuk mengurangi risiko. Terakhir, sesuaikan setiap saran dengan kondisi Anda sendiri.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/bisnis/bisnis-lainnya', 'topik Bisnis Lainnya'),
				' atau lanjutkan ke ',
				link(
					'/artikel/modal-usaha-kecil',
					'Modal usaha kecil: menabung, meminjam, atau mencari mitra?',
				),
				'.',
			),
		],
	},
];
