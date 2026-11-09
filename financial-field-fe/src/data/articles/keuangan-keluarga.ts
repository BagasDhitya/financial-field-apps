import { h2, link, ol, p, quote, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Articles in Keuangan Keluarga and its sub-categories (PRP-0002.p1 §S4.4). */
export const KEUANGAN_KELUARGA_ARTICLES: ArticleEntry[] = [
	{
		slug: 'metode-50-30-20-untuk-gaji-umr',
		title: 'Metode 50/30/20: apakah cocok untuk gaji UMR?',
		lead_text:
			'Metode 50/30/20 bisa dipakai sebagai titik awal, tetapi proporsinya sering perlu disesuaikan untuk penghasilan terbatas.',
		article_type: 'standard',
		featured_image: 'kategori-keuangan-keluarga',
		primary_category: 'keluarga-anggaran',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-dua',
		tags: ['anggaran-bulanan', 'gaji'],
		first_published_at: '2026-09-03T10:00:00.000Z',
		last_reviewed_at: '2026-09-04T10:00:00.000Z',
		key_takeaways: [
			{
				text: 'Metode 50/30/20 bisa dipakai sebagai titik awal, tetapi proporsinya sering perlu disesuaikan untuk penghasilan terbatas.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang metode anggaran 50/30/20.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait metode anggaran 50/30/20?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang metode anggaran 50/30/20 perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang metode anggaran 50/30/20',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/metode-50-30-20-untuk-gaji-umr',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Metode 50/30/20 bisa dipakai sebagai titik awal, tetapi proporsinya sering perlu disesuaikan untuk penghasilan terbatas. Topik metode anggaran 50/30/20 sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Mengapa metode anggaran 50/30/20 penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu metode anggaran 50/30/20?'),
			p(
				'Metode anggaran 50/30/20 pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang metode anggaran 50/30/20 paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan metode anggaran 50/30/20.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 4.500.000 per bulan dan memutuskan menyisihkan 7% untuk keperluan ini. Artinya, sekitar Rp 315.000 disisihkan setiap bulan, atau Rp 5.355.000 dalam 17 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 4.500.000',
				'Porsi yang disisihkan: 7% atau Rp 315.000',
				'Akumulasi dalam 17 bulan: Rp 5.355.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 12%, jumlah yang disisihkan menjadi sekitar Rp 540.000 per bulan, atau Rp 9.180.000 dalam 17 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang metode anggaran 50/30/20 secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami metode anggaran 50/30/20, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/keuangan-keluarga/keluarga-anggaran', 'topik Evaluasi Anggaran'),
				' atau lanjutkan ke ',
				link(
					'/artikel/berapa-besar-dana-darurat',
					'Dana darurat: berapa besar dan di mana menyimpannya?',
				),
				'.',
			),
		],
	},
	{
		slug: 'berapa-besar-dana-darurat',
		title: 'Dana darurat: berapa besar dan di mana menyimpannya?',
		lead_text:
			'Dana darurat umumnya disiapkan beberapa kali pengeluaran bulanan dan disimpan di tempat yang mudah dicairkan. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-keuangan-keluarga',
		primary_category: 'keluarga-menabung',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		tags: ['dana-darurat'],
		first_published_at: '2026-09-02T00:00:00.000Z',
		content_updated_at: '2026-09-05T00:00:00.000Z',
		last_reviewed_at: '2026-09-03T00:00:00.000Z',
		key_takeaways: [
			{
				text: 'Dana darurat umumnya disiapkan beberapa kali pengeluaran bulanan dan disimpan di tempat yang mudah dicairkan.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang besaran dan penyimpanan dana darurat.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait besaran dan penyimpanan dana darurat?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang besaran dan penyimpanan dana darurat perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang besaran dan penyimpanan dana darurat',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/berapa-besar-dana-darurat',
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
				'Dana darurat umumnya disiapkan beberapa kali pengeluaran bulanan dan disimpan di tempat yang mudah dicairkan. Banyak pembaca bertanya tentang besaran dan penyimpanan dana darurat, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Mengapa besaran dan penyimpanan dana darurat penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu besaran dan penyimpanan dana darurat?'),
			p(
				'Besaran dan penyimpanan dana darurat pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang besaran dan penyimpanan dana darurat paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan besaran dan penyimpanan dana darurat.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang besaran dan penyimpanan dana darurat mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 8.500.000 per bulan dan memutuskan menyisihkan 7% untuk keperluan ini. Artinya, sekitar Rp 595.000 disisihkan setiap bulan, atau Rp 11.900.000 dalam 20 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 8.500.000',
				'Porsi yang disisihkan: 7% atau Rp 595.000',
				'Akumulasi dalam 20 bulan: Rp 11.900.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 12%, jumlah yang disisihkan menjadi sekitar Rp 1.020.000 per bulan, atau Rp 20.400.000 dalam 20 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang besaran dan penyimpanan dana darurat secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/keuangan-keluarga/keluarga-menabung', 'topik Menabung'),
				' atau lanjutkan ke ',
				link(
					'/artikel/metode-50-30-20-untuk-gaji-umr',
					'Metode 50/30/20: apakah cocok untuk gaji UMR?',
				),
				'.',
			),
		],
	},
	{
		slug: 'kolom-rencana-keuangan-satu-halaman',
		title: 'Kolom: menulis rencana keuangan keluarga dalam satu halaman',
		lead_text:
			'Kolom ini mengajak keluarga merangkum rencana keuangan dalam satu halaman yang mudah dibaca bersama. Simak catatan dan ajakan sederhana untuk mulai merencanakan dalam kolom berikut.',
		article_type: 'column',
		featured_image: 'kategori-keuangan-keluarga',
		primary_category: 'keluarga-rencana-hidup',
		author: 'redaksi-contoh',
		tags: ['keluarga-muda'],
		first_published_at: '2026-08-31T14:00:00.000Z',
		content: [
			p(
				'Kolom ini mengajak keluarga merangkum rencana keuangan dalam satu halaman yang mudah dibaca bersama. Saya menulis kolom ini sebagai catatan pribadi, untuk mengajak pembaca berhenti sejenak dan memikirkan rencana keuangan keluarga satu halaman. Topik ini jarang dibicarakan di meja makan, padahal hampir semua keluarga berhadapan dengannya. Kita lebih sering membicarakan harga barang atau rencana liburan daripada keputusan yang dampaknya terasa bertahun-tahun ke depan. Melalui tulisan singkat ini, saya ingin berbagi beberapa pengamatan sederhana yang mungkin berguna. Tidak ada rumus khusus di sini, hanya pengalaman sehari-hari yang barangkali terasa akrab bagi banyak pembaca, terutama mereka yang baru mulai mengatur keuangan keluarga sendiri.',
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
				'Tentu, setiap orang memiliki jalannya sendiri. Ada yang nyaman dengan tabel yang rinci, ada pula yang cukup dengan catatan singkat di ponsel. Namun saya percaya, membicarakan rencana keuangan keluarga satu halaman dengan keluarga sejak awal membuat banyak keputusan menjadi lebih ringan. Ketika semua orang memahami tujuan yang sama, godaan untuk menyimpang dari rencana juga lebih mudah ditahan, karena ada yang saling mengingatkan dan saling menyemangati ketika semangat mulai menurun. Percakapan pertama memang terasa canggung, tetapi percakapan berikutnya biasanya mengalir dengan sendirinya.',
			),
			p(
				'Jika Anda membaca kolom ini sampai selesai, cobalah menulis satu tujuan keuangan hari ini. Satu kalimat sudah cukup sebagai permulaan, misalnya berapa yang ingin disisihkan bulan depan atau satu kebiasaan yang ingin dikurangi. Simpan tulisan itu di tempat yang mudah terlihat, lalu baca kembali sebulan kemudian. Anda mungkin akan terkejut melihat seberapa jauh satu kalimat sederhana dapat membawa perubahan, terutama jika kalimat itu dibaca ulang bersama orang-orang terdekat. Mulailah hari ini, karena waktu terbaik untuk merencanakan memang selalu sekarang, bukan nanti ketika keadaan memaksa kita untuk segera memutuskan.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/keuangan-keluarga/keluarga-rencana-hidup', 'topik Rencana Hidup'),
				' atau lanjutkan ke ',
				link(
					'/artikel/metode-50-30-20-untuk-gaji-umr',
					'Metode 50/30/20: apakah cocok untuk gaji UMR?',
				),
				'.',
			),
		],
	},
	{
		slug: 'mencatat-penghasilan-kerja-sampingan',
		title: 'Kerja sampingan: mencatat penghasilan tambahan dengan rapi',
		lead_text:
			'Penghasilan kerja sampingan sebaiknya dicatat terpisah agar mudah dipantau dan dilaporkan. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-keuangan-keluarga',
		primary_category: 'keluarga-cara-bekerja',
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-dua',
		tags: ['gaji', 'umkm'],
		first_published_at: '2026-08-30T04:00:00.000Z',
		last_reviewed_at: '2026-08-31T04:00:00.000Z',
		key_takeaways: [
			{
				text: 'Penghasilan kerja sampingan sebaiknya dicatat terpisah agar mudah dipantau dan dilaporkan.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang pencatatan penghasilan kerja sampingan.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang pencatatan penghasilan kerja sampingan',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/mencatat-penghasilan-kerja-sampingan',
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
				'Penghasilan kerja sampingan sebaiknya dicatat terpisah agar mudah dipantau dan dilaporkan. Pembahasan tentang pencatatan penghasilan kerja sampingan biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Pemahaman yang baik tentang pencatatan penghasilan kerja sampingan juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu pencatatan penghasilan kerja sampingan?'),
			p(
				'Ketika membicarakan pencatatan penghasilan kerja sampingan, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pencatatan penghasilan kerja sampingan paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Perlu diingat juga bahwa aturan dan ketentuan dapat berubah dari waktu ke waktu. Karena itu, pastikan informasi yang Anda gunakan masih berlaku, terutama jika keputusan yang akan diambil melibatkan jumlah uang yang besar atau jangka waktu yang panjang.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Kumpulkan dokumen dan catatan yang berkaitan dengan pencatatan penghasilan kerja sampingan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.000.000 per bulan dan memutuskan menyisihkan 6% untuk keperluan ini. Artinya, sekitar Rp 180.000 disisihkan setiap bulan, atau Rp 4.320.000 dalam 24 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.000.000',
				'Porsi yang disisihkan: 6% atau Rp 180.000',
				'Akumulasi dalam 24 bulan: Rp 4.320.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 11%, jumlah yang disisihkan menjadi sekitar Rp 330.000 per bulan, atau Rp 7.920.000 dalam 24 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pencatatan penghasilan kerja sampingan secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/keuangan-keluarga/keluarga-cara-bekerja', 'topik Cara Bekerja'),
				' atau lanjutkan ke ',
				link(
					'/artikel/metode-50-30-20-untuk-gaji-umr',
					'Metode 50/30/20: apakah cocok untuk gaji UMR?',
				),
				'.',
			),
		],
	},
	{
		slug: 'mengatur-pos-sosial-keluarga',
		title: 'Arisan, iuran keluarga, dan uang kondangan: mengatur pos sosial',
		lead_text:
			'Pengeluaran sosial seperti arisan dan kondangan lebih terkendali jika diberi pos anggaran tersendiri. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-keuangan-keluarga',
		primary_category: 'keluarga-lainnya',
		author: 'penulis-contoh-satu',
		tags: ['anggaran-bulanan'],
		first_published_at: '2026-08-28T18:00:00.000Z',
		key_takeaways: [
			{
				text: 'Pengeluaran sosial seperti arisan dan kondangan lebih terkendali jika diberi pos anggaran tersendiri.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang pos pengeluaran sosial keluarga.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Pengeluaran sosial seperti arisan dan kondangan lebih terkendali jika diberi pos anggaran tersendiri. Banyak pembaca bertanya tentang pos pengeluaran sosial keluarga, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Mengapa pos pengeluaran sosial keluarga penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu pos pengeluaran sosial keluarga?'),
			p(
				'Pos pengeluaran sosial keluarga pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pos pengeluaran sosial keluarga paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait pos pengeluaran sosial keluarga. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
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
				'Misalkan sebuah keluarga memiliki penghasilan Rp 8.000.000 per bulan dan memutuskan menyisihkan 8% untuk keperluan ini. Artinya, sekitar Rp 640.000 disisihkan setiap bulan, atau Rp 5.120.000 dalam 8 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 8.000.000',
				'Porsi yang disisihkan: 8% atau Rp 640.000',
				'Akumulasi dalam 8 bulan: Rp 5.120.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 13%, jumlah yang disisihkan menjadi sekitar Rp 1.040.000 per bulan, atau Rp 8.320.000 dalam 8 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pos pengeluaran sosial keluarga secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami pos pengeluaran sosial keluarga, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link(
					'/kategori/keuangan-keluarga/keluarga-lainnya',
					'topik Keuangan Keluarga Lainnya',
				),
				' atau lanjutkan ke ',
				link(
					'/artikel/metode-50-30-20-untuk-gaji-umr',
					'Metode 50/30/20: apakah cocok untuk gaji UMR?',
				),
				'.',
			),
		],
	},
	{
		slug: 'menekan-tagihan-ponsel-internet',
		title: 'Menekan tagihan ponsel dan internet tanpa mengorbankan kebutuhan',
		lead_text:
			'Tagihan ponsel dan internet dapat ditekan dengan meninjau pemakaian nyata dan memilih paket yang sesuai. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-keuangan-keluarga',
		primary_category: 'keluarga-tagihan-ponsel',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		tags: ['anggaran-bulanan'],
		first_published_at: '2026-08-27T08:00:00.000Z',
		last_reviewed_at: '2026-08-28T08:00:00.000Z',
		key_takeaways: [
			{
				text: 'Tagihan ponsel dan internet dapat ditekan dengan meninjau pemakaian nyata dan memilih paket yang sesuai.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang tagihan ponsel dan internet.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait tagihan ponsel dan internet?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang tagihan ponsel dan internet perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang tagihan ponsel dan internet',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/menekan-tagihan-ponsel-internet',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Tagihan ponsel dan internet dapat ditekan dengan meninjau pemakaian nyata dan memilih paket yang sesuai. Banyak pembaca bertanya tentang tagihan ponsel dan internet, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami tagihan ponsel dan internet tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu tagihan ponsel dan internet?'),
			p(
				'Secara sederhana, tagihan ponsel dan internet adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang tagihan ponsel dan internet paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 315.000 disisihkan setiap bulan, atau Rp 2.835.000 dalam 9 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.500.000',
				'Porsi yang disisihkan: 9% atau Rp 315.000',
				'Akumulasi dalam 9 bulan: Rp 2.835.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 490.000 per bulan, atau Rp 4.410.000 dalam 9 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang tagihan ponsel dan internet secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link(
					'/kategori/keuangan-keluarga/keluarga-tagihan-ponsel',
					'topik Tagihan Ponsel & Internet',
				),
				' atau lanjutkan ke ',
				link(
					'/artikel/metode-50-30-20-untuk-gaji-umr',
					'Metode 50/30/20: apakah cocok untuk gaji UMR?',
				),
				'.',
			),
		],
	},
	{
		slug: 'menabung-dengan-rekening-terpisah',
		title: 'Menabung dengan rekening terpisah: cara membagi pos tabungan',
		lead_text:
			'Rekening terpisah membantu memisahkan tujuan tabungan sehingga dana tidak mudah terpakai untuk keperluan lain. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		featured_image: 'kategori-keuangan-keluarga',
		primary_category: 'keluarga-menabung',
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-dua',
		tags: ['dana-darurat'],
		first_published_at: '2026-08-25T22:00:00.000Z',
		content_updated_at: '2026-08-28T22:00:00.000Z',
		last_reviewed_at: '2026-08-26T22:00:00.000Z',
		key_takeaways: [
			{
				text: 'Rekening terpisah membantu memisahkan tujuan tabungan sehingga dana tidak mudah terpakai untuk keperluan lain.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang menabung dengan rekening terpisah.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		sources: [
			{
				title: 'Panduan tentang menabung dengan rekening terpisah',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/menabung-dengan-rekening-terpisah',
				accessed_on: '2026-10-01',
			},
		],
		content: [
			p(
				'Rekening terpisah membantu memisahkan tujuan tabungan sehingga dana tidak mudah terpakai untuk keperluan lain. Topik menabung dengan rekening terpisah sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Pemahaman yang baik tentang menabung dengan rekening terpisah juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu menabung dengan rekening terpisah?'),
			p(
				'Menabung dengan rekening terpisah pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang menabung dengan rekening terpisah paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan menabung dengan rekening terpisah.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 8.500.000 per bulan dan memutuskan menyisihkan 7% untuk keperluan ini. Artinya, sekitar Rp 595.000 disisihkan setiap bulan, atau Rp 14.280.000 dalam 24 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 8.500.000',
				'Porsi yang disisihkan: 7% atau Rp 595.000',
				'Akumulasi dalam 24 bulan: Rp 14.280.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 12%, jumlah yang disisihkan menjadi sekitar Rp 1.020.000 per bulan, atau Rp 24.480.000 dalam 24 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang menabung dengan rekening terpisah secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/keuangan-keluarga/keluarga-menabung', 'topik Menabung'),
				' atau lanjutkan ke ',
				link(
					'/artikel/metode-50-30-20-untuk-gaji-umr',
					'Metode 50/30/20: apakah cocok untuk gaji UMR?',
				),
				'.',
			),
		],
	},
	{
		slug: 'tantangan-menabung-52-minggu',
		title: 'Tantangan menabung 52 minggu: hitungan dan tipsnya',
		lead_text:
			'Tantangan menabung 52 minggu menaikkan jumlah tabungan sedikit demi sedikit setiap minggu selama setahun. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		article_type: 'standard',
		primary_category: 'keluarga-menabung',
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-satu',
		tags: ['dana-darurat'],
		first_published_at: '2026-08-24T12:00:00.000Z',
		last_reviewed_at: '2026-08-25T12:00:00.000Z',
		key_takeaways: [
			{
				text: 'Tantangan menabung 52 minggu menaikkan jumlah tabungan sedikit demi sedikit setiap minggu selama setahun.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang tantangan menabung 52 minggu.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Tantangan menabung 52 minggu menaikkan jumlah tabungan sedikit demi sedikit setiap minggu selama setahun. Banyak pembaca bertanya tentang tantangan menabung 52 minggu, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami tantangan menabung 52 minggu tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu tantangan menabung 52 minggu?'),
			p(
				'Secara sederhana, tantangan menabung 52 minggu adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang tantangan menabung 52 minggu paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
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
				'Ajak anggota keluarga yang terlibat sejak awal agar rencana lebih mudah dijalankan bersama.',
			),
			p(
				'Konsistensi biasanya lebih menentukan daripada besarnya angka. Rencana yang dijalankan setiap bulan, meskipun kecil, memberi hasil yang lebih dapat diandalkan daripada rencana besar yang sering tertunda. Jika suatu bulan rencana tidak berjalan, cukup lanjutkan pada bulan berikutnya tanpa perlu memulai dari awal.',
			),
			h2('Kesalahan yang sering terjadi'),
			ul(
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang tantangan menabung 52 minggu secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami tantangan menabung 52 minggu, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/keuangan-keluarga/keluarga-menabung', 'topik Menabung'),
				' atau lanjutkan ke ',
				link(
					'/artikel/metode-50-30-20-untuk-gaji-umr',
					'Metode 50/30/20: apakah cocok untuk gaji UMR?',
				),
				'.',
			),
		],
	},
];
