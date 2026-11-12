import { h2, link, p, say, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Articles in Karier and its sub-categories (PRP-0002.p1 §S4.4). */
export const KARIER_ARTICLES: ArticleEntry[] = [
	{
		slug: 'wawancara-negosiasi-gaji-pertama',
		title: 'Wawancara: menegosiasikan gaji pertama setelah lulus',
		lead_text:
			'Narasumber Contoh Satu, praktisi SDM, menjelaskan cara menyiapkan data, angka, dan sikap saat menegosiasikan gaji pertama setelah lulus, termasuk kesalahan yang sering ia temui.',
		article_type: 'interview',
		featured_image: 'kategori-karier',
		primary_category: 'karier',
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-dua',
		tags: ['karier-awal', 'gaji'],
		first_published_at: '2026-08-23T02:00:00.000Z',
		last_reviewed_at: '2026-08-24T02:00:00.000Z',
		key_takeaways: [
			{
				text: 'Riset kisaran gaji untuk posisi dan kota yang sama sebelum wawancara, lalu siapkan satu angka atau rentang sempit.',
			},
			{
				text: 'Hitung kebutuhan bulanan sendiri agar tahu batas terendah yang masih masuk akal.',
			},
			{
				text: 'Nilai tawaran secara utuh: gaji pokok, tunjangan, BPJS, dan kesempatan belajar, lalu minta surat penawaran tertulis.',
			},
		],
		content: [
			p(
				'Banyak lulusan baru menerima tawaran kerja pertama tanpa bertanya apa pun soal gaji. Kami berbincang dengan Narasumber Contoh Satu, praktisi sumber daya manusia yang sudah lama mewawancarai kandidat baru, tentang cara menegosiasikan gaji pertama dengan tenang. Nama narasumber dan angka dalam wawancara ini fiktif; jawaban telah disunting agar ringkas.',
			),
			say('Penulis Contoh Dua', 'Apakah lulusan baru memang boleh menawar gaji?'),
			say(
				'Narasumber Contoh Satu',
				'Boleh, dan sebenarnya diharapkan, asalkan caranya sopan dan berdasar data. Perusahaan biasanya sudah menyiapkan rentang untuk setiap posisi. Kandidat yang bertanya dengan baik jarang kehilangan tawaran hanya karena menyebut angka.',
			),
			p(
				'Yang membuat kesan buruk justru jawaban tanpa dasar, misalnya menyebut angka tinggi hanya karena mendengar cerita teman.',
			),
			say('Penulis Contoh Dua', 'Data seperti apa yang perlu disiapkan sebelum wawancara?'),
			say(
				'Narasumber Contoh Satu',
				'Ada dua. Pertama, kisaran gaji untuk posisi dan kota yang sama, dari lowongan, survei gaji, atau alumni yang sudah bekerja. Kedua, kebutuhan bulanan Anda sendiri: sewa kamar, transportasi, makan, cicilan bila ada, dan tabungan.',
			),
			p(
				'Dari situ Anda tahu dua hal: angka yang wajar di pasar dan batas terendah yang masih bisa Anda jalani. Misalnya, dengan angka fiktif, pasar membayar Rp6 juta sampai Rp7 juta dan kebutuhan Anda Rp4,5 juta. Anda bisa menyebut Rp6,8 juta dengan tenang.',
			),
			say('Penulis Contoh Dua', 'Kapan sebaiknya angka itu disebut?'),
			say(
				'Narasumber Contoh Satu',
				'Biarkan pewawancara yang membuka topik. Kalau ditanya ekspektasi gaji, sebut satu angka atau rentang sempit, lalu jelaskan alasannya dalam satu kalimat. Hindari rentang yang terlalu lebar, karena perusahaan cenderung memilih ujung bawahnya.',
			),
			say(
				'Penulis Contoh Dua',
				'Bagaimana jika tawaran yang datang lebih rendah dari harapan?',
			),
			say(
				'Narasumber Contoh Satu',
				'Jangan langsung menolak atau menerima. Ucapkan terima kasih, minta waktu satu atau dua hari, lalu tanyakan rincian paketnya. Kadang gaji pokok tidak bisa naik, tetapi tunjangan transportasi, masa percobaan yang lebih pendek, atau jadwal evaluasi gaji setelah enam bulan masih bisa dibicarakan.',
			),
			p(
				'Lihat juga hal yang tidak tertulis di angka: kepesertaan BPJS Kesehatan dan BPJS Ketenagakerjaan, pelatihan, dan siapa yang akan membimbing Anda. Untuk pekerjaan pertama, kesempatan belajar sering sama berharganya dengan selisih beberapa ratus ribu rupiah.',
			),
			say('Penulis Contoh Dua', 'Kesalahan apa yang paling sering Anda lihat?'),
			say(
				'Narasumber Contoh Satu',
				'Ada tiga. Membandingkan diri dengan gaji teman di industri lain, lupa bahwa angka yang disebut bisa saja sebelum potongan pajak dan iuran, dan menerima tawaran lisan tanpa meminta surat penawaran tertulis.',
			),
			p(
				'Yang terakhir paling penting. Surat penawaran mencatat gaji, tunjangan, dan tanggal mulai. Tanpa itu, sulit menagih janji bila ada salah paham.',
			),
			say(
				'Penulis Contoh Dua',
				'Bagaimana jika tawaran datang dari dua perusahaan sekaligus?',
			),
			say(
				'Narasumber Contoh Satu',
				'Itu posisi yang baik, asal disikapi dengan jujur. Sampaikan kepada perusahaan yang lebih Anda minati bahwa ada tawaran lain, tanpa melebih-lebihkan angkanya. Jangan pernah mengarang tawaran yang tidak ada, karena dunia rekrutmen lebih sempit dari yang dibayangkan.',
			),
			p(
				'Bandingkan keduanya dengan daftar yang sama: gaji bersih setelah potongan, biaya dan waktu perjalanan, jenjang karier, dan suasana tim yang Anda lihat saat wawancara.',
			),
			say(
				'Penulis Contoh Dua',
				'Saran terakhir untuk pembaca yang sedang menunggu tawaran pertama?',
			),
			say(
				'Narasumber Contoh Satu',
				'Berlatihlah mengucapkan angka Anda dengan suara keras sebelum wawancara. Kedengarannya sepele, tetapi banyak kandidat gugup justru di bagian ini. Setelah bekerja, catat pencapaian Anda setiap bulan, karena catatan itulah bahan negosiasi berikutnya.',
			),
			h2('Baca juga'),
			ul(
				link(
					'/artikel/cara-membaca-slip-gaji-pph-21',
					'Cara membaca slip gaji: dari mana angka PPh 21 berasal?',
				),
				link(
					'/artikel/metode-50-30-20-untuk-gaji-umr',
					'Metode 50/30/20: apakah cocok untuk gaji UMR?',
				),
				link('/kategori/karier', 'Semua artikel di topik Karier'),
			),
		],
	},
];
