import { h2, link, ol, p, quote, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Demo articles in Asuransi and its sub-categories (PRP-0002.p1 §S4.4). */
export const ASURANSI_ARTICLES: ArticleEntry[] = [
	{
		slug: 'asuransi-jiwa-berjangka-atau-seumur-hidup',
		title: 'Asuransi jiwa berjangka atau seumur hidup: mana yang sesuai?',
		leadText:
			'Asuransi jiwa berjangka cocok untuk perlindungan murni dalam periode tertentu, sedangkan seumur hidup memberi perlindungan lebih panjang dengan premi lebih tinggi.',
		articleType: 'standard',
		category: 'asuransi-jiwa',
		tags: ['asuransi-jiwa'],
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-satu',
		image: 'kategori-asuransi',
		publishedAt: '2026-10-06T00:00:00.000Z',
		lastReviewedAt: '2026-10-07T00:00:00.000Z',
		keyTakeaways: [
			'Asuransi jiwa berjangka cocok untuk perlindungan murni dalam periode tertentu, sedangkan seumur hidup memberi perlindungan lebih panjang dengan premi lebih tinggi.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang pilihan asuransi jiwa berjangka dan seumur hidup.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		faq: [
			{
				question:
					'Apa langkah pertama terkait pilihan asuransi jiwa berjangka dan seumur hidup?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang pilihan asuransi jiwa berjangka dan seumur hidup',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/asuransi-jiwa-berjangka-atau-seumur-hidup',
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
				'Asuransi jiwa berjangka cocok untuk perlindungan murni dalam periode tertentu, sedangkan seumur hidup memberi perlindungan lebih panjang dengan premi lebih tinggi. Pembahasan tentang pilihan asuransi jiwa berjangka dan seumur hidup biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami pilihan asuransi jiwa berjangka dan seumur hidup tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu pilihan asuransi jiwa berjangka dan seumur hidup?'),
			p(
				'Secara sederhana, pilihan asuransi jiwa berjangka dan seumur hidup adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pilihan asuransi jiwa berjangka dan seumur hidup paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait pilihan asuransi jiwa berjangka dan seumur hidup. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Kumpulkan dokumen dan catatan yang berkaitan dengan pilihan asuransi jiwa berjangka dan seumur hidup.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang pilihan asuransi jiwa berjangka dan seumur hidup mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 5.000.000 per bulan dan memutuskan menyisihkan 8% untuk keperluan ini. Artinya, sekitar Rp 400.000 disisihkan setiap bulan, atau Rp 2.800.000 dalam 7 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 5.000.000',
				'Porsi yang disisihkan: 8% atau Rp 400.000',
				'Akumulasi dalam 7 bulan: Rp 2.800.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 13%, jumlah yang disisihkan menjadi sekitar Rp 650.000 per bulan, atau Rp 4.550.000 dalam 7 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pilihan asuransi jiwa berjangka dan seumur hidup secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/asuransi/asuransi-jiwa', 'topik Asuransi Jiwa'),
				' atau lanjutkan ke ',
				link(
					'/artikel/asuransi-rumah-dari-kebakaran',
					'Asuransi rumah dari kebakaran: apa yang biasanya ditanggung?',
				),
				'.',
			),
		],
	},
	{
		slug: 'asuransi-rumah-dari-kebakaran',
		title: 'Asuransi rumah dari kebakaran: apa yang biasanya ditanggung?',
		leadText:
			'Asuransi kebakaran rumah umumnya menanggung kerusakan bangunan, sementara isi rumah sering memerlukan perluasan jaminan.',
		articleType: 'standard',
		category: 'asuransi-umum',
		tags: ['keluarga-muda'],
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-dua',
		image: 'kategori-asuransi',
		publishedAt: '2026-10-04T14:00:00.000Z',
		lastReviewedAt: '2026-10-05T14:00:00.000Z',
		keyTakeaways: [
			'Asuransi kebakaran rumah umumnya menanggung kerusakan bangunan, sementara isi rumah sering memerlukan perluasan jaminan.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang asuransi rumah dari kebakaran.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		sources: [
			{
				title: 'Panduan tentang asuransi rumah dari kebakaran',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/asuransi-rumah-dari-kebakaran',
				accessedOn: '2026-10-01',
			},
		],
		body: [
			p(
				'Asuransi kebakaran rumah umumnya menanggung kerusakan bangunan, sementara isi rumah sering memerlukan perluasan jaminan. Banyak pembaca bertanya tentang asuransi rumah dari kebakaran, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Mengapa asuransi rumah dari kebakaran penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu asuransi rumah dari kebakaran?'),
			p(
				'Secara sederhana, asuransi rumah dari kebakaran adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang asuransi rumah dari kebakaran paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait asuransi rumah dari kebakaran. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
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
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang asuransi rumah dari kebakaran mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.500.000 per bulan dan memutuskan menyisihkan 5% untuk keperluan ini. Artinya, sekitar Rp 175.000 disisihkan setiap bulan, atau Rp 1.225.000 dalam 7 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.500.000',
				'Porsi yang disisihkan: 5% atau Rp 175.000',
				'Akumulasi dalam 7 bulan: Rp 1.225.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 10%, jumlah yang disisihkan menjadi sekitar Rp 350.000 per bulan, atau Rp 2.450.000 dalam 7 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang asuransi rumah dari kebakaran secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami asuransi rumah dari kebakaran, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/asuransi/asuransi-umum', 'topik Asuransi Umum'),
				' atau lanjutkan ke ',
				link(
					'/artikel/asuransi-jiwa-berjangka-atau-seumur-hidup',
					'Asuransi jiwa berjangka atau seumur hidup: mana yang sesuai?',
				),
				'.',
			),
		],
	},
	{
		slug: 'all-risk-atau-tlo',
		title: 'All risk atau TLO: memilih jenis asuransi mobil',
		leadText:
			'All risk menanggung kerusakan kecil hingga besar, sedangkan TLO hanya menanggung kerugian total dengan premi yang lebih rendah.',
		articleType: 'standard',
		category: 'asuransi-kendaraan',
		tags: ['anggaran-bulanan'],
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		image: 'kategori-asuransi',
		publishedAt: '2026-10-03T04:00:00.000Z',
		lastReviewedAt: '2026-10-04T04:00:00.000Z',
		keyTakeaways: [
			'All risk menanggung kerusakan kecil hingga besar, sedangkan TLO hanya menanggung kerugian total dengan premi yang lebih rendah.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang pilihan asuransi mobil all risk dan TLO.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait pilihan asuransi mobil all risk dan TLO?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang pilihan asuransi mobil all risk dan TLO',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/all-risk-atau-tlo',
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
				'All risk menanggung kerusakan kecil hingga besar, sedangkan TLO hanya menanggung kerugian total dengan premi yang lebih rendah. Topik pilihan asuransi mobil all risk dan TLO sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Pemahaman yang baik tentang pilihan asuransi mobil all risk dan TLO juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu pilihan asuransi mobil all risk dan TLO?'),
			p(
				'Secara sederhana, pilihan asuransi mobil all risk dan TLO adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pilihan asuransi mobil all risk dan TLO paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan pilihan asuransi mobil all risk dan TLO.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.000.000 per bulan dan memutuskan menyisihkan 8% untuk keperluan ini. Artinya, sekitar Rp 240.000 disisihkan setiap bulan, atau Rp 1.440.000 dalam 6 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.000.000',
				'Porsi yang disisihkan: 8% atau Rp 240.000',
				'Akumulasi dalam 6 bulan: Rp 1.440.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 13%, jumlah yang disisihkan menjadi sekitar Rp 390.000 per bulan, atau Rp 2.340.000 dalam 6 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pilihan asuransi mobil all risk dan TLO secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/asuransi/asuransi-kendaraan', 'topik Asuransi Kendaraan'),
				' atau lanjutkan ke ',
				link(
					'/artikel/asuransi-jiwa-berjangka-atau-seumur-hidup',
					'Asuransi jiwa berjangka atau seumur hidup: mana yang sesuai?',
				),
				'.',
			),
		],
	},
	{
		slug: 'asuransi-pendidikan-anak',
		title: 'Asuransi pendidikan anak: kelebihan dan hal yang perlu dicek',
		leadText:
			'Asuransi pendidikan perlu dicek dari sisi manfaat, jangka waktu, dan biaya, lalu dibandingkan dengan menabung biasa. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		articleType: 'standard',
		category: 'asuransi-pendidikan',
		tags: ['keluarga-muda', 'pinjaman-pendidikan'],
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-dua',
		image: 'kategori-asuransi',
		publishedAt: '2026-10-01T18:00:00.000Z',
		lastReviewedAt: '2026-10-02T18:00:00.000Z',
		keyTakeaways: [
			'Asuransi pendidikan perlu dicek dari sisi manfaat, jangka waktu, dan biaya, lalu dibandingkan dengan menabung biasa.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang asuransi pendidikan anak.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		sources: [
			{
				title: 'Panduan tentang asuransi pendidikan anak',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/asuransi-pendidikan-anak',
				accessedOn: '2026-10-01',
			},
		],
		body: [
			p(
				'Asuransi pendidikan perlu dicek dari sisi manfaat, jangka waktu, dan biaya, lalu dibandingkan dengan menabung biasa. Topik asuransi pendidikan anak sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.',
			),
			p(
				'Pemahaman yang baik tentang asuransi pendidikan anak juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu asuransi pendidikan anak?'),
			p(
				'Ketika membicarakan asuransi pendidikan anak, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang asuransi pendidikan anak paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait asuransi pendidikan anak. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan asuransi pendidikan anak.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang asuransi pendidikan anak mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 3.500.000 per bulan dan memutuskan menyisihkan 5% untuk keperluan ini. Artinya, sekitar Rp 175.000 disisihkan setiap bulan, atau Rp 2.625.000 dalam 15 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 3.500.000',
				'Porsi yang disisihkan: 5% atau Rp 175.000',
				'Akumulasi dalam 15 bulan: Rp 2.625.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 10%, jumlah yang disisihkan menjadi sekitar Rp 350.000 per bulan, atau Rp 5.250.000 dalam 15 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang asuransi pendidikan anak secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/asuransi/asuransi-pendidikan', 'topik Asuransi Pendidikan'),
				' atau lanjutkan ke ',
				link(
					'/artikel/asuransi-jiwa-berjangka-atau-seumur-hidup',
					'Asuransi jiwa berjangka atau seumur hidup: mana yang sesuai?',
				),
				'.',
			),
		],
	},
	{
		slug: 'pr-asuransi-kesehatan-keluarga-contoh',
		title: 'Asuransi kesehatan keluarga: ilustrasi manfaat dari Sponsor Contoh',
		leadText:
			'Artikel bersponsor ini menggambarkan produk asuransi kesehatan dari Sponsor Contoh. Simak cara kerja, biaya, dan hal yang perlu diperhatikan dalam artikel berikut.',
		articleType: 'pr_article',
		category: 'asuransi-kesehatan',
		tags: ['asuransi-kesehatan'],
		author: 'redaksi-contoh',
		image: 'kategori-asuransi',
		publishedAt: '2026-09-30T08:00:00.000Z',
		sponsor: {
			name: 'Sponsor Contoh',
			url: 'https://example.com',
			disclosure: 'Artikel ini dibuat atas kerja sama dengan Sponsor Contoh.',
		},
		body: [
			p(
				'Artikel bersponsor ini menggambarkan produk asuransi kesehatan dari Sponsor Contoh. Informasi produk disusun bersama Sponsor Contoh untuk pembaca Financial Field Indonesia.',
			),
			p(
				'Sponsor Contoh menyediakan ilustrasi produk untuk membantu pembaca memahami cara kerja fitur yang ditawarkan. Informasi lengkap mengenai syarat, biaya, dan manfaat tersedia di ',
				link('https://example.com/produk-contoh', 'halaman produk sponsor'),
				'. Pembaca tetap disarankan membandingkan informasi tersebut dengan sumber lain sebelum mengambil keputusan.',
			),
			h2('Cara kerja produk (ilustrasi)'),
			p(
				'Produk ilustrasi ini berkaitan dengan asuransi kesehatan keluarga dari Sponsor Contoh. Calon pengguna terlebih dahulu mendaftar dan mengisi data dasar, kemudian memilih paket yang sesuai dengan kebutuhan. Setelah itu, pengguna dapat memantau status dan riwayat transaksi melalui aplikasi contoh. Tampilan, nama fitur, dan alur pendaftaran pada produk sebenarnya dapat berbeda dari gambaran ini.',
			),
			p(
				'Menurut materi dari Sponsor Contoh, produk ini ditujukan bagi pembaca yang menginginkan proses yang praktis dan informasi biaya yang transparan. Meskipun demikian, kemudahan proses tidak selalu berarti produk tersebut paling sesuai. Kebutuhan, kemampuan bayar, dan tujuan jangka panjang tetap menjadi pertimbangan utama yang hanya dapat dinilai oleh pembaca sendiri.',
			),
			p(
				'Sebagai gambaran, misalkan biaya administrasi awal sebesar Rp 125.000 dan biaya bulanan sebesar Rp 25.000. Dalam satu tahun, total biaya yang dibayar menjadi penjumlahan keduanya. Angka seperti ini sebaiknya selalu dihitung sendiri dan dibandingkan dengan manfaat yang benar-benar Anda gunakan, bukan hanya dengan manfaat yang dijanjikan dalam materi promosi.',
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
				link('/kategori/asuransi/asuransi-kesehatan', 'topik Asuransi Kesehatan'),
				' atau lanjutkan ke ',
				link(
					'/artikel/asuransi-jiwa-berjangka-atau-seumur-hidup',
					'Asuransi jiwa berjangka atau seumur hidup: mana yang sesuai?',
				),
				'.',
			),
		],
	},
	{
		slug: 'bagian-polis-yang-wajib-dipahami',
		title: 'Membaca polis asuransi: bagian yang wajib dipahami sebelum tanda tangan',
		leadText:
			'Bagian polis yang paling penting dibaca adalah manfaat, pengecualian, masa tunggu, dan cara pengajuan klaim. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		articleType: 'standard',
		category: 'asuransi-lainnya',
		tags: ['asuransi-jiwa', 'asuransi-kesehatan'],
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-satu',
		image: 'kategori-asuransi',
		publishedAt: '2026-09-28T22:00:00.000Z',
		lastReviewedAt: '2026-09-29T22:00:00.000Z',
		keyTakeaways: [
			'Bagian polis yang paling penting dibaca adalah manfaat, pengecualian, masa tunggu, dan cara pengajuan klaim.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang isi polis asuransi.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait isi polis asuransi?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question: 'Seberapa sering rencana tentang isi polis asuransi perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang isi polis asuransi',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/bagian-polis-yang-wajib-dipahami',
				accessedOn: '2026-10-01',
			},
		],
		body: [
			p(
				'Bagian polis yang paling penting dibaca adalah manfaat, pengecualian, masa tunggu, dan cara pengajuan klaim. Banyak pembaca bertanya tentang isi polis asuransi, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Mengapa isi polis asuransi penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.',
			),
			h2('Apa itu isi polis asuransi?'),
			p(
				'Secara sederhana, isi polis asuransi adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang isi polis asuransi paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 5.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 495.000 disisihkan setiap bulan, atau Rp 8.910.000 dalam 18 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 5.500.000',
				'Porsi yang disisihkan: 9% atau Rp 495.000',
				'Akumulasi dalam 18 bulan: Rp 8.910.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 770.000 per bulan, atau Rp 13.860.000 dalam 18 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang isi polis asuransi secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/asuransi/asuransi-lainnya', 'topik Asuransi Lainnya'),
				' atau lanjutkan ke ',
				link(
					'/artikel/asuransi-jiwa-berjangka-atau-seumur-hidup',
					'Asuransi jiwa berjangka atau seumur hidup: mana yang sesuai?',
				),
				'.',
			),
		],
	},
];
