import { h2, link, p } from '../blocks';
import type { ArticleEntry } from '../types';

/** Articles in Karier and its sub-categories (PRP-0002.p1 §S4.4). */
export const KARIER_ARTICLES: ArticleEntry[] = [
	{
		slug: 'wawancara-negosiasi-gaji-pertama',
		title: 'Wawancara: menegosiasikan gaji pertama setelah lulus',
		lead_text:
			'Narasumber Contoh berbagi pengalaman tentang menyiapkan data dan sikap saat menegosiasikan gaji pertama. Simak pengalaman, kesalahan yang sering terjadi, dan sarannya dalam wawancara berikut.',
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
				text: 'Narasumber Contoh berbagi pengalaman tentang menyiapkan data dan sikap saat menegosiasikan gaji pertama.',
			},
			{
				text: 'Catat angka nyata Anda sebelum membuat keputusan tentang negosiasi gaji pertama.',
			},
			{ text: 'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.' },
		],
		content: [
			p(
				'Narasumber Contoh berbagi pengalaman tentang menyiapkan data dan sikap saat menegosiasikan gaji pertama. Dalam percakapan berikut, Narasumber Contoh menceritakan pengalamannya tentang negosiasi gaji pertama, kesalahan yang pernah dilihatnya, dan kebiasaan yang menurutnya paling membantu bagi pembaca yang baru memulai. Jawaban telah disunting agar ringkas, tanpa mengubah maksud yang ingin disampaikan.',
			),
			h2('Bagaimana awalnya Anda tertarik pada negosiasi gaji pertama?'),
			p(
				'Awalnya karena kebutuhan sendiri. Beberapa tahun lalu saya membuat beberapa keputusan keuangan tanpa rencana, dan hasilnya kurang memuaskan. Sejak itu saya merasa perlu memahami negosiasi gaji pertama dengan lebih serius. Saya mulai dari hal sederhana: membaca, mencatat, dan bertanya kepada orang yang lebih berpengalaman, sedikit demi sedikit, tanpa target yang berlebihan.',
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
				link('/kategori/karier', 'topik Karier'),
				' atau lanjutkan ke ',
				link(
					'/artikel/apa-saja-pengurang-penghasilan-kena-pajak',
					'Apa saja pengurang penghasilan kena pajak bagi karyawan?',
				),
				'.',
			),
		],
	},
];
