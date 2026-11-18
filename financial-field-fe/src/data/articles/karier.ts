import { p } from '../blocks';
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
		author: 'tim-redaksi',
		tags: ['karier-awal', 'gaji'],
		first_published_at: '2026-08-23T02:00:00.000Z',
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
		],
		interview_dialogues: [
			{
				speaker_name: 'Redaksi',
				speaker_role: 'Financial Field Indonesia',
				message: 'Apakah lulusan baru memang boleh menawar gaji?',
				position: 'left',
			},
			{
				speaker_name: 'Narasumber Contoh Satu',
				speaker_role: 'Praktisi SDM',
				message:
					'Boleh, dan sebenarnya diharapkan, asalkan caranya sopan dan berdasar data. Perusahaan biasanya sudah menyiapkan rentang untuk setiap posisi. Kandidat yang bertanya dengan baik jarang kehilangan tawaran hanya karena menyebut angka.\n\nYang membuat kesan buruk justru jawaban tanpa dasar, misalnya menyebut angka tinggi hanya karena mendengar cerita teman.',
				position: 'right',
			},
			{
				speaker_name: 'Redaksi',
				speaker_role: 'Financial Field Indonesia',
				message: 'Data seperti apa yang perlu disiapkan sebelum wawancara?',
				position: 'left',
			},
			{
				speaker_name: 'Narasumber Contoh Satu',
				speaker_role: 'Praktisi SDM',
				message:
					'Ada dua. Pertama, kisaran gaji untuk posisi dan kota yang sama, dari lowongan, survei gaji, atau alumni yang sudah bekerja. Kedua, kebutuhan bulanan Anda sendiri: sewa kamar, transportasi, makan, cicilan bila ada, dan tabungan.\n\nDari situ Anda tahu dua hal: angka yang wajar di pasar dan batas terendah yang masih bisa Anda jalani. Misalnya, dengan angka fiktif, pasar membayar Rp6 juta sampai Rp7 juta dan kebutuhan Anda Rp4,5 juta. Anda bisa menyebut Rp6,8 juta dengan tenang.',
				position: 'right',
			},
			{
				speaker_name: 'Redaksi',
				speaker_role: 'Financial Field Indonesia',
				message: 'Kapan sebaiknya angka itu disebut?',
				position: 'left',
			},
			{
				speaker_name: 'Narasumber Contoh Satu',
				speaker_role: 'Praktisi SDM',
				message:
					'Biarkan pewawancara yang membuka topik. Kalau ditanya ekspektasi gaji, sebut satu angka atau rentang sempit, lalu jelaskan alasannya dalam satu kalimat. Hindari rentang yang terlalu lebar, karena perusahaan cenderung memilih ujung bawahnya.',
				position: 'right',
			},
			{
				speaker_name: 'Redaksi',
				speaker_role: 'Financial Field Indonesia',
				message: 'Bagaimana jika tawaran yang datang lebih rendah dari harapan?',
				position: 'left',
			},
			{
				speaker_name: 'Narasumber Contoh Satu',
				speaker_role: 'Praktisi SDM',
				message:
					'Jangan langsung menolak atau menerima. Ucapkan terima kasih, minta waktu satu atau dua hari, lalu tanyakan rincian paketnya. Kadang gaji pokok tidak bisa naik, tetapi tunjangan transportasi, masa percobaan yang lebih pendek, atau jadwal evaluasi gaji setelah enam bulan masih bisa dibicarakan.\n\nLihat juga hal yang tidak tertulis di angka: kepesertaan BPJS Kesehatan dan BPJS Ketenagakerjaan, pelatihan, dan siapa yang akan membimbing Anda. Untuk pekerjaan pertama, kesempatan belajar sering sama berharganya dengan selisih beberapa ratus ribu rupiah.',
				position: 'right',
			},
			{
				speaker_name: 'Redaksi',
				speaker_role: 'Financial Field Indonesia',
				message: 'Kesalahan apa yang paling sering Anda lihat?',
				position: 'left',
			},
			{
				speaker_name: 'Narasumber Contoh Satu',
				speaker_role: 'Praktisi SDM',
				message:
					'Ada tiga. Membandingkan diri dengan gaji teman di industri lain, lupa bahwa angka yang disebut bisa saja sebelum potongan pajak dan iuran, dan menerima tawaran lisan tanpa meminta surat penawaran tertulis.\n\nYang terakhir paling penting. Surat penawaran mencatat gaji, tunjangan, dan tanggal mulai. Tanpa itu, sulit menagih janji bila ada salah paham.',
				position: 'right',
			},
			{
				speaker_name: 'Redaksi',
				speaker_role: 'Financial Field Indonesia',
				message: 'Bagaimana jika tawaran datang dari dua perusahaan sekaligus?',
				position: 'left',
			},
			{
				speaker_name: 'Narasumber Contoh Satu',
				speaker_role: 'Praktisi SDM',
				message:
					'Itu posisi yang baik, asal disikapi dengan jujur. Sampaikan kepada perusahaan yang lebih Anda minati bahwa ada tawaran lain, tanpa melebih-lebihkan angkanya. Jangan pernah mengarang tawaran yang tidak ada, karena dunia rekrutmen lebih sempit dari yang dibayangkan.\n\nBandingkan keduanya dengan daftar yang sama: gaji bersih setelah potongan, biaya dan waktu perjalanan, jenjang karier, dan suasana tim yang Anda lihat saat wawancara.',
				position: 'right',
			},
			{
				speaker_name: 'Redaksi',
				speaker_role: 'Financial Field Indonesia',
				message: 'Saran terakhir untuk pembaca yang sedang menunggu tawaran pertama?',
				position: 'left',
			},
			{
				speaker_name: 'Narasumber Contoh Satu',
				speaker_role: 'Praktisi SDM',
				message:
					'Berlatihlah mengucapkan angka Anda dengan suara keras sebelum wawancara. Kedengarannya sepele, tetapi banyak kandidat gugup justru di bagian ini. Setelah bekerja, catat pencapaian Anda setiap bulan, karena catatan itulah bahan negosiasi berikutnya.',
				position: 'right',
			},
		],
	},
];
