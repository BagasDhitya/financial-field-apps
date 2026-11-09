import { h2, link, ol, p, quote, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Demo articles in Investasi and its sub-categories (PRP-0002.p1 §S4.4). */
export const INVESTASI_ARTICLES: ArticleEntry[] = [
	{
		slug: 'investasi-rutin-reksa-dana-pemula',
		title: 'Investasi rutin bulanan di reksa dana untuk pemula',
		leadText:
			'Investasi rutin bulanan membantu pemula membangun kebiasaan dan mengurangi tekanan untuk menebak waktu terbaik membeli. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		articleType: 'standard',
		category: 'investasi-reksa-dana',
		tags: ['reksa-dana', 'investasi-pemula'],
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		image: 'kategori-investasi',
		publishedAt: '2026-09-23T06:00:00.000Z',
		lastReviewedAt: '2026-09-24T06:00:00.000Z',
		keyTakeaways: [
			'Investasi rutin bulanan membantu pemula membangun kebiasaan dan mengurangi tekanan untuk menebak waktu terbaik membeli.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang investasi rutin bulanan di reksa dana.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait investasi rutin bulanan di reksa dana?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang investasi rutin bulanan di reksa dana perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang investasi rutin bulanan di reksa dana',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/investasi-rutin-reksa-dana-pemula',
				accessedOn: '2026-10-01',
			},
		],
		body: [
			p(
				'Investasi rutin bulanan membantu pemula membangun kebiasaan dan mengurangi tekanan untuk menebak waktu terbaik membeli. Pembahasan tentang investasi rutin bulanan di reksa dana biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami investasi rutin bulanan di reksa dana tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu investasi rutin bulanan di reksa dana?'),
			p(
				'Ketika membicarakan investasi rutin bulanan di reksa dana, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang investasi rutin bulanan di reksa dana paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan investasi rutin bulanan di reksa dana.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 4.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 405.000 disisihkan setiap bulan, atau Rp 4.050.000 dalam 10 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 4.500.000',
				'Porsi yang disisihkan: 9% atau Rp 405.000',
				'Akumulasi dalam 10 bulan: Rp 4.050.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 630.000 per bulan, atau Rp 6.300.000 dalam 10 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang investasi rutin bulanan di reksa dana secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link(
					'/kategori/investasi/investasi-reksa-dana',
					'topik Reksa Dana & Investasi Rutin',
				),
				' atau lanjutkan ke ',
				link(
					'/artikel/imbal-hasil-properti-sewa',
					'Membeli properti untuk disewakan: hitungan sederhana imbal hasil',
				),
				'.',
			),
		],
	},
	{
		slug: 'imbal-hasil-properti-sewa',
		title: 'Membeli properti untuk disewakan: hitungan sederhana imbal hasil',
		leadText:
			'Imbal hasil properti sewa dihitung dari pendapatan sewa bersih dibandingkan harga dan biaya kepemilikan properti. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		articleType: 'standard',
		category: 'investasi-properti',
		tags: ['investasi-pemula'],
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-dua',
		image: 'kategori-investasi',
		publishedAt: '2026-09-21T20:00:00.000Z',
		lastReviewedAt: '2026-09-22T20:00:00.000Z',
		keyTakeaways: [
			'Imbal hasil properti sewa dihitung dari pendapatan sewa bersih dibandingkan harga dan biaya kepemilikan properti.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang imbal hasil properti sewa.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		sources: [
			{
				title: 'Panduan tentang imbal hasil properti sewa',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/imbal-hasil-properti-sewa',
				accessedOn: '2026-10-01',
			},
		],
		body: [
			p(
				'Imbal hasil properti sewa dihitung dari pendapatan sewa bersih dibandingkan harga dan biaya kepemilikan properti. Topik imbal hasil properti sewa sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami imbal hasil properti sewa tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu imbal hasil properti sewa?'),
			p(
				'Secara sederhana, imbal hasil properti sewa adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang imbal hasil properti sewa paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Kumpulkan dokumen dan catatan yang berkaitan dengan imbal hasil properti sewa.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 6.500.000 per bulan dan memutuskan menyisihkan 9% untuk keperluan ini. Artinya, sekitar Rp 585.000 disisihkan setiap bulan, atau Rp 11.700.000 dalam 20 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 6.500.000',
				'Porsi yang disisihkan: 9% atau Rp 585.000',
				'Akumulasi dalam 20 bulan: Rp 11.700.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 14%, jumlah yang disisihkan menjadi sekitar Rp 910.000 per bulan, atau Rp 18.200.000 dalam 20 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang imbal hasil properti sewa secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/investasi/investasi-properti', 'topik Investasi Properti'),
				' atau lanjutkan ke ',
				link(
					'/artikel/investasi-rutin-reksa-dana-pemula',
					'Investasi rutin bulanan di reksa dana untuk pemula',
				),
				'.',
			),
		],
	},
	{
		slug: 'wawancara-sepuluh-tahun-investasi-saham',
		title: 'Wawancara: pelajaran dari sepuluh tahun berinvestasi saham',
		leadText:
			'Narasumber Contoh berbagi pengalaman tentang disiplin dan kesabaran dalam berinvestasi saham. Simak pengalaman, kesalahan yang sering terjadi, dan sarannya dalam wawancara berikut.',
		articleType: 'interview',
		category: 'investasi-saham-valas',
		tags: ['saham', 'investasi-pemula'],
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-satu',
		image: 'kategori-investasi',
		publishedAt: '2026-09-20T10:00:00.000Z',
		lastReviewedAt: '2026-09-21T10:00:00.000Z',
		keyTakeaways: [
			'Narasumber Contoh berbagi pengalaman tentang disiplin dan kesabaran dalam berinvestasi saham.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang pengalaman berinvestasi saham.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		body: [
			p(
				'Narasumber Contoh berbagi pengalaman tentang disiplin dan kesabaran dalam berinvestasi saham. Dalam percakapan berikut, Narasumber Contoh menceritakan pengalamannya tentang pengalaman berinvestasi saham, kesalahan yang pernah dilihatnya, dan kebiasaan yang menurutnya paling membantu bagi pembaca yang baru memulai. Jawaban telah disunting agar ringkas, tanpa mengubah maksud yang ingin disampaikan.',
			),
			h2('Bagaimana awalnya Anda tertarik pada pengalaman berinvestasi saham?'),
			p(
				'Awalnya karena kebutuhan sendiri. Beberapa tahun lalu saya membuat beberapa keputusan keuangan tanpa rencana, dan hasilnya kurang memuaskan. Sejak itu saya merasa perlu memahami pengalaman berinvestasi saham dengan lebih serius. Saya mulai dari hal sederhana: membaca, mencatat, dan bertanya kepada orang yang lebih berpengalaman, sedikit demi sedikit, tanpa target yang berlebihan.',
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
				link('/kategori/investasi/investasi-saham-valas', 'topik Saham & Valas'),
				' atau lanjutkan ke ',
				link(
					'/artikel/investasi-rutin-reksa-dana-pemula',
					'Investasi rutin bulanan di reksa dana untuk pemula',
				),
				'.',
			),
		],
	},
	{
		slug: 'emas-deposito-atau-obligasi-ritel',
		title: 'Emas, deposito, atau obligasi ritel: membandingkan risiko secara umum',
		leadText:
			'Emas, deposito, dan obligasi ritel memiliki profil risiko dan likuiditas berbeda sehingga cocok untuk tujuan yang berbeda.',
		articleType: 'standard',
		category: 'investasi-lainnya',
		tags: ['investasi-pemula', 'reksa-dana'],
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-dua',
		image: 'kategori-investasi',
		publishedAt: '2026-09-19T00:00:00.000Z',
		lastReviewedAt: '2026-09-20T00:00:00.000Z',
		keyTakeaways: [
			'Emas, deposito, dan obligasi ritel memiliki profil risiko dan likuiditas berbeda sehingga cocok untuk tujuan yang berbeda.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang perbandingan emas, deposito, dan obligasi ritel.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		faq: [
			{
				question:
					'Apa langkah pertama terkait perbandingan emas, deposito, dan obligasi ritel?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
			{
				question:
					'Seberapa sering rencana tentang perbandingan emas, deposito, dan obligasi ritel perlu ditinjau?',
				answer: 'Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang perbandingan emas, deposito, dan obligasi ritel',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/emas-deposito-atau-obligasi-ritel',
				accessedOn: '2026-10-01',
			},
		],
		body: [
			p(
				'Emas, deposito, dan obligasi ritel memiliki profil risiko dan likuiditas berbeda sehingga cocok untuk tujuan yang berbeda. Banyak pembaca bertanya tentang perbandingan emas, deposito, dan obligasi ritel, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Pemahaman yang baik tentang perbandingan emas, deposito, dan obligasi ritel juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu perbandingan emas, deposito, dan obligasi ritel?'),
			p(
				'Secara sederhana, perbandingan emas, deposito, dan obligasi ritel adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang perbandingan emas, deposito, dan obligasi ritel paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan perbandingan emas, deposito, dan obligasi ritel.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 8.500.000 per bulan dan memutuskan menyisihkan 7% untuk keperluan ini. Artinya, sekitar Rp 595.000 disisihkan setiap bulan, atau Rp 7.735.000 dalam 13 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 8.500.000',
				'Porsi yang disisihkan: 7% atau Rp 595.000',
				'Akumulasi dalam 13 bulan: Rp 7.735.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 12%, jumlah yang disisihkan menjadi sekitar Rp 1.020.000 per bulan, atau Rp 13.260.000 dalam 13 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang perbandingan emas, deposito, dan obligasi ritel secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/investasi/investasi-lainnya', 'topik Investasi Lainnya'),
				' atau lanjutkan ke ',
				link(
					'/artikel/investasi-rutin-reksa-dana-pemula',
					'Investasi rutin bulanan di reksa dana untuk pemula',
				),
				'.',
			),
		],
	},
	{
		slug: 'menjual-tanah-warisan',
		title: 'Menjual tanah warisan: langkah administratif yang perlu disiapkan',
		leadText:
			'Menjual tanah warisan memerlukan kesepakatan ahli waris dan kelengkapan dokumen sebelum transaksi dilakukan. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		articleType: 'standard',
		category: 'investasi-properti-lahan',
		tags: ['warisan-keluarga'],
		author: 'penulis-contoh-tiga',
		reviewer: 'peninjau-contoh-satu',
		image: 'kategori-investasi',
		publishedAt: '2026-09-17T14:00:00.000Z',
		lastReviewedAt: '2026-09-18T14:00:00.000Z',
		keyTakeaways: [
			'Menjual tanah warisan memerlukan kesepakatan ahli waris dan kelengkapan dokumen sebelum transaksi dilakukan.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang penjualan tanah warisan.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		sources: [
			{
				title: 'Panduan tentang penjualan tanah warisan',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/menjual-tanah-warisan',
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
				'Menjual tanah warisan memerlukan kesepakatan ahli waris dan kelengkapan dokumen sebelum transaksi dilakukan. Topik penjualan tanah warisan sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Artikel ini disusun untuk pembaca yang ingin memahami penjualan tanah warisan tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan sederhana, dan daftar kesalahan yang sering terjadi.',
			),
			h2('Apa itu penjualan tanah warisan?'),
			p(
				'Penjualan tanah warisan pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang penjualan tanah warisan paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Perlu diingat juga bahwa aturan dan ketentuan dapat berubah dari waktu ke waktu. Karena itu, pastikan informasi yang Anda gunakan masih berlaku, terutama jika keputusan yang akan diambil melibatkan jumlah uang yang besar atau jangka waktu yang panjang.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Kumpulkan dokumen dan catatan yang berkaitan dengan penjualan tanah warisan.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 5.000.000 per bulan dan memutuskan menyisihkan 10% untuk keperluan ini. Artinya, sekitar Rp 500.000 disisihkan setiap bulan, atau Rp 6.500.000 dalam 13 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 5.000.000',
				'Porsi yang disisihkan: 10% atau Rp 500.000',
				'Akumulasi dalam 13 bulan: Rp 6.500.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 15%, jumlah yang disisihkan menjadi sekitar Rp 750.000 per bulan, atau Rp 9.750.000 dalam 13 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang penjualan tanah warisan secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/investasi/investasi-properti-lahan', 'topik Jual Properti & Lahan'),
				' atau lanjutkan ke ',
				link(
					'/artikel/investasi-rutin-reksa-dana-pemula',
					'Investasi rutin bulanan di reksa dana untuk pemula',
				),
				'.',
			),
		],
	},
];
