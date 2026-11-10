import { h2, link, ol, p, quote, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Articles in Hari Tua and its sub-categories (PRP-0002.p1 §S4.4). */
export const HARI_TUA_ARTICLES: ArticleEntry[] = [
	{
		slug: 'biaya-merawat-orang-tua-lansia',
		title: 'Merawat orang tua lanjut usia: memperkirakan biaya bulanan',
		lead_text:
			'Biaya merawat orang tua lansia dapat diperkirakan dari kebutuhan kesehatan, tenaga pendamping, dan kebutuhan harian. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-hari-tua',
		featured_video: {
			url: 'https://www.youtube.com/watch?v=XqXgSTzCKHU',
			title: '‘Generasi Sandwich’, Biayai Kebutuhan Orang Tua, Anak & Diri Sendiri',
			channel_name: 'CNN Indonesia',
			uploaded_at: '2021-11-27T04:30:04.000Z',
			duration_seconds: 165,
			caption:
				'CNN Indonesia tentang generasi sandwich, yang menanggung kebutuhan orang tua, anak, dan diri sendiri, serta saran perencana keuangan untuk mencatat pemasukan dan pengeluaran setiap bulan.',
		},
		primary_category: 'hari-tua-perawatan',
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-satu',
		tags: ['lansia'],
		first_published_at: '2026-09-09T02:00:00.000Z',
		last_reviewed_at: '2026-09-10T02:00:00.000Z',
		key_takeaways: [
			{
				text: 'Biaya merawat orang tua lansia dapat diperkirakan dari kebutuhan kesehatan, tenaga pendamping, dan kebutuhan harian.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang biaya merawat orang tua lansia.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang biaya merawat orang tua lansia',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/biaya-merawat-orang-tua-lansia',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Biaya merawat orang tua lansia dapat diperkirakan dari kebutuhan kesehatan, tenaga pendamping, dan kebutuhan harian. Banyak pembaca bertanya tentang biaya merawat orang tua lansia, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami biaya merawat orang tua lansia tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu biaya merawat orang tua lansia?'),
			p(
				'Biaya merawat orang tua lansia pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang biaya merawat orang tua lansia paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Misalkan sebuah keluarga memiliki penghasilan Rp 7.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 675.000 disisihkan setiap bulan, atau Rp 12.150.000 dalam 18 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 7.500.000',
				'Porsi yang disisihkan: 9% atau Rp 675.000',
				'Akumulasi dalam 18 bulan: Rp 12.150.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 1.050.000 per bulan, atau Rp 18.900.000 dalam 18 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
			),
			p(
				'Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.',
			),
			quote(
				'Mulailah dari langkah kecil yang bisa dilakukan minggu ini, bukan dari rencana besar yang sulit dijalankan.',
			),
			p(
				'Bila memungkinkan, otomatiskan langkah yang berulang, misalnya dengan pemindahan dana terjadwal pada tanggal gajian. Dengan begitu, rencana berjalan tanpa harus diingat setiap bulan, dan Anda dapat memusatkan perhatian pada keputusan yang benar-benar membutuhkan pertimbangan.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang biaya merawat orang tua lansia secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami biaya merawat orang tua lansia, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/hari-tua/hari-tua-perawatan', 'topik Perawatan Lansia'),
				' atau lanjutkan ke ',
				link(
					'/artikel/persiapan-lima-tahun-sebelum-berhenti-kerja',
					'Persiapan finansial lima tahun sebelum berhenti bekerja',
				),
				'.',
			),
		],
	},
	{
		slug: 'persiapan-lima-tahun-sebelum-berhenti-kerja',
		title: 'Persiapan finansial lima tahun sebelum berhenti bekerja',
		lead_text:
			'Lima tahun sebelum berhenti bekerja adalah waktu yang baik untuk melunasi utang, menghitung kebutuhan, dan merapikan aset.',
		article_type: 'standard',
		featured_image: 'kategori-hari-tua',
		primary_category: 'hari-tua-pensiun-kerja',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-dua',
		tags: ['pensiun'],
		first_published_at: '2026-09-07T16:00:00.000Z',
		last_reviewed_at: '2026-09-08T16:00:00.000Z',
		key_takeaways: [
			{
				text: 'Lima tahun sebelum berhenti bekerja adalah waktu yang baik untuk melunasi utang, menghitung kebutuhan, dan merapikan aset.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang persiapan finansial sebelum berhenti bekerja.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question:
					'Apa langkah pertama terkait persiapan finansial sebelum berhenti bekerja?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang persiapan finansial sebelum berhenti bekerja perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang persiapan finansial sebelum berhenti bekerja',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/persiapan-lima-tahun-sebelum-berhenti-kerja',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Lima tahun sebelum berhenti bekerja adalah waktu yang baik untuk melunasi utang, menghitung kebutuhan, dan merapikan aset. Banyak pembaca bertanya tentang persiapan finansial sebelum berhenti bekerja, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Pemahaman yang baik tentang persiapan finansial sebelum berhenti bekerja juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu persiapan finansial sebelum berhenti bekerja?'),
			p(
				'Persiapan finansial sebelum berhenti bekerja pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang persiapan finansial sebelum berhenti bekerja paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait persiapan finansial sebelum berhenti bekerja. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan persiapan finansial sebelum berhenti bekerja.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 6.500.000 per bulan dan memutuskan menyisihkan 5% untuk keperluan ini. Artinya, sekitar Rp 325.000 disisihkan setiap bulan, atau Rp 2.925.000 dalam 9 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 6.500.000',
				'Porsi yang disisihkan: 5% atau Rp 325.000',
				'Akumulasi dalam 9 bulan: Rp 2.925.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 10%, jumlah yang disisihkan menjadi sekitar Rp 650.000 per bulan, atau Rp 5.850.000 dalam 9 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang persiapan finansial sebelum berhenti bekerja secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/hari-tua/hari-tua-pensiun-kerja', 'topik Berhenti Bekerja'),
				' atau lanjutkan ke ',
				link(
					'/artikel/biaya-merawat-orang-tua-lansia',
					'Merawat orang tua lanjut usia: memperkirakan biaya bulanan',
				),
				'.',
			),
		],
	},
	{
		slug: 'kolom-pensiun-adalah-bab-baru',
		title: 'Kolom: pensiun bukan akhir, melainkan bab baru',
		lead_text:
			'Kolom ini membahas pensiun sebagai awal babak baru yang tetap memerlukan rencana. Simak catatan dan ajakan sederhana untuk mulai merencanakan dalam kolom berikut.',
		article_type: 'column',
		featured_image: 'kategori-hari-tua',
		primary_category: 'hari-tua-kehidupan-kedua',
		author: 'redaksi-contoh',
		tags: ['pensiun'],
		first_published_at: '2026-09-06T06:00:00.000Z',
		content: [
			p(
				'Kolom ini membahas pensiun sebagai awal babak baru yang tetap memerlukan rencana. Saya menulis kolom ini sebagai catatan pribadi, untuk mengajak pembaca berhenti sejenak dan memikirkan kehidupan setelah pensiun. Topik ini jarang dibicarakan di meja makan, padahal hampir semua keluarga berhadapan dengannya. Kita lebih sering membicarakan harga barang atau rencana liburan daripada keputusan yang dampaknya terasa bertahun-tahun ke depan. Melalui tulisan singkat ini, saya ingin berbagi beberapa pengamatan sederhana yang mungkin berguna. Tidak ada rumus khusus di sini, hanya pengalaman sehari-hari yang barangkali terasa akrab bagi banyak pembaca, terutama mereka yang baru mulai mengatur keuangan keluarga sendiri.',
			),
			p(
				'Ada masa ketika saya menganggap urusan keuangan cukup dipikirkan saat ada masalah. Selama gaji masuk dan tagihan terbayar, rasanya semua baik-baik saja. Ternyata, justru saat keadaan tenang kita punya ruang terbaik untuk merencanakan. Ketika masalah sudah datang, pilihan yang tersedia biasanya lebih sedikit dan keputusan harus diambil dengan tergesa-gesa. Pelajaran itu, yang kini terasa sangat sederhana, saya dapatkan dengan cara yang kurang menyenangkan, dan sejak itu saya berusaha merencanakan lebih awal, walaupun hanya dengan beberapa baris catatan di buku kecil yang selalu saya bawa.',
			),
			h2('Yang berubah ketika saya mulai menulis rencana'),
			p(
				'Menuliskan rencana membuat saya lebih jujur terhadap angka. Pengeluaran yang dulu terasa kecil ternyata cukup besar jika dijumlahkan dalam setahun. Biaya langganan yang jarang dipakai, jajan di sela pekerjaan, dan belanja dadakan, semuanya terlihat jelas di atas kertas. Saya tidak langsung menghapus semuanya; saya hanya memilih mana yang benar-benar memberi manfaat, lalu mengalihkan sisanya untuk tujuan yang lebih penting. Perubahan kecil itu ternyata cukup untuk membuat akhir bulan terasa lebih lega, dan yang lebih penting, membuat saya merasa memegang kendali atas uang saya sendiri.',
			),
			quote(
				'Rencana yang sederhana dan dijalankan lebih berharga daripada rencana sempurna yang hanya disimpan.',
			),
			p(
				'Tentu, setiap orang memiliki jalannya sendiri. Ada yang nyaman dengan tabel yang rinci, ada pula yang cukup dengan catatan singkat di ponsel. Namun saya percaya, membicarakan kehidupan setelah pensiun dengan keluarga sejak awal membuat banyak keputusan menjadi lebih ringan. Ketika semua orang memahami tujuan yang sama, godaan untuk menyimpang dari rencana juga lebih mudah ditahan, karena ada yang saling mengingatkan dan saling menyemangati ketika semangat mulai menurun. Percakapan pertama memang terasa canggung, tetapi percakapan berikutnya biasanya mengalir dengan sendirinya.',
			),
			p(
				'Jika Anda membaca kolom ini sampai selesai, cobalah menulis satu tujuan keuangan hari ini. Satu kalimat sudah cukup sebagai permulaan, misalnya berapa yang ingin disisihkan bulan depan atau satu kebiasaan yang ingin dikurangi. Simpan tulisan itu di tempat yang mudah terlihat, lalu baca kembali sebulan kemudian. Anda mungkin akan terkejut melihat seberapa jauh satu kalimat sederhana dapat membawa perubahan, terutama jika kalimat itu dibaca ulang bersama orang-orang terdekat. Mulailah hari ini, karena waktu terbaik untuk merencanakan memang selalu sekarang, bukan nanti ketika keadaan memaksa kita untuk segera memutuskan.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/hari-tua/hari-tua-kehidupan-kedua', 'topik Kehidupan Kedua'),
				' atau lanjutkan ke ',
				link(
					'/artikel/biaya-merawat-orang-tua-lansia',
					'Merawat orang tua lanjut usia: memperkirakan biaya bulanan',
				),
				'.',
			),
		],
	},
	{
		slug: 'menyederhanakan-aset-di-usia-senja',
		title: 'Menyederhanakan aset di usia senja: rekening, polis, dan dokumen',
		lead_text:
			'Menyederhanakan aset di usia senja memudahkan pengelolaan sehari-hari dan membantu keluarga di kemudian hari. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-hari-tua',
		primary_category: 'hari-tua-lainnya',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		tags: ['lansia', 'warisan-keluarga'],
		first_published_at: '2026-09-04T20:00:00.000Z',
		last_reviewed_at: '2026-09-05T20:00:00.000Z',
		key_takeaways: [
			{
				text: 'Menyederhanakan aset di usia senja memudahkan pengelolaan sehari-hari dan membantu keluarga di kemudian hari.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang penyederhanaan aset di usia senja.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang penyederhanaan aset di usia senja',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/menyederhanakan-aset-di-usia-senja',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Menyederhanakan aset di usia senja memudahkan pengelolaan sehari-hari dan membantu keluarga di kemudian hari. Pembahasan tentang penyederhanaan aset di usia senja biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami penyederhanaan aset di usia senja tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu penyederhanaan aset di usia senja?'),
			p(
				'Secara sederhana, penyederhanaan aset di usia senja adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang penyederhanaan aset di usia senja paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan penyederhanaan aset di usia senja.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 315.000 disisihkan setiap bulan, atau Rp 6.300.000 dalam 20 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.500.000',
				'Porsi yang disisihkan: 9% atau Rp 315.000',
				'Akumulasi dalam 20 bulan: Rp 6.300.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 490.000 per bulan, atau Rp 9.800.000 dalam 20 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang penyederhanaan aset di usia senja secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/hari-tua/hari-tua-lainnya', 'topik Hari Tua Lainnya'),
				' atau lanjutkan ke ',
				link(
					'/artikel/biaya-merawat-orang-tua-lansia',
					'Merawat orang tua lanjut usia: memperkirakan biaya bulanan',
				),
				'.',
			),
		],
	},
];
