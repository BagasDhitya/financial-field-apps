import { h2, link, ol, p, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/**
 * Edukasi › Pinjaman Kredit and Panduan › Pinjaman Kredit (ADR-0022): four
 * explainers and four step-by-step guides. Numbers are worked examples, not
 * offers; sources are fictional placeholders like the rest of the demo.
 */
export const EDUKASI_PANDUAN_ARTICLES: ArticleEntry[] = [
	{
		slug: 'bunga-flat-dan-bunga-efektif',
		title: 'Bunga flat dan bunga efektif: kenapa angka kecil bisa lebih mahal',
		lead_text:
			'Bunga flat 10% per tahun setara dengan bunga efektif sekitar 18% untuk pinjaman 3 tahun. Artikel ini menjelaskan cara kedua metode dihitung dan cara membandingkannya dengan adil.',
		article_type: 'standard',
		featured_image: 'kategori-pinjaman',
		primary_category: 'edukasi-pinjaman-kredit',
		categories: ['edukasi-pinjaman-kredit', 'pinjaman'],
		author: 'tim-redaksi',
		reviewer: 'peninjau-contoh-tiga',
		tags: ['bunga-pinjaman', 'kredit-kendaraan'],
		first_published_at: '2026-11-11T02:00:00.000Z',
		last_reviewed_at: '2026-11-10T09:00:00.000Z',
		key_takeaways: [
			{ text: 'Bunga flat dihitung dari pokok awal selama seluruh tenor.' },
			{
				text: 'Bunga efektif dihitung dari sisa pokok, sehingga bunganya turun setiap bulan.',
			},
			{
				text: 'Bandingkan penawaran dari total yang dibayar, bukan dari angka bunganya saja.',
			},
		],
		faq: [
			{
				question: 'Apakah bunga flat selalu lebih mahal?',
				answer: 'Pada angka yang sama, ya. Bunga flat 10% per tahun lebih mahal daripada bunga efektif 10% per tahun karena bunganya tidak ikut turun ketika pokok berkurang.',
			},
			{
				question: 'Metode mana yang dipakai kredit kendaraan?',
				answer: 'Penawaran kredit kendaraan biasanya menyebut bunga flat, sedangkan KPR dan banyak pinjaman bank memakai bunga efektif. Tanyakan metodenya bila tidak tertulis.',
			},
		],
		sources: [
			{
				title: 'Penjelasan metode perhitungan bunga pinjaman',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/metode-bunga-pinjaman',
				accessed_on: '2026-11-05',
			},
		],
		content: [
			p(
				'Dua penawaran pinjaman bisa sama-sama menyebut bunga 10% per tahun, tetapi total yang Anda bayar berbeda jauh. Penyebabnya adalah metode perhitungan bunga: flat atau efektif. Memahami bedanya membuat Anda bisa membandingkan penawaran dengan adil.',
			),
			h2('Cara kerja bunga flat'),
			p(
				'Pada bunga flat, bunga dihitung dari pokok awal dan besarnya sama setiap bulan sampai lunas. Contohnya pinjaman Rp 100.000.000 dengan tenor 36 bulan dan bunga flat 10% per tahun. Bunga per bulan adalah Rp 100.000.000 × 10% ÷ 12 = Rp 833.333. Cicilan pokoknya Rp 100.000.000 ÷ 36 = Rp 2.777.778. Cicilan per bulan menjadi Rp 3.611.111, dan total bunga selama tiga tahun Rp 30.000.000.',
			),
			h2('Cara kerja bunga efektif'),
			p(
				'Pada bunga efektif, bunga dihitung dari sisa pokok yang belum dibayar. Di awal tenor porsi bunga besar, lalu mengecil seiring pokok berkurang. Dengan metode anuitas, cicilannya tetap sama setiap bulan. Untuk pinjaman yang sama dengan bunga efektif 10% per tahun, cicilannya sekitar Rp 3.226.719 per bulan dan total bunganya sekitar Rp 16.161.874.',
			),
			h2('Mengubah bunga flat menjadi bunga efektif'),
			p(
				'Cicilan Rp 3.611.111 dari contoh bunga flat tadi sama dengan cicilan pinjaman berbunga efektif sekitar 17,9% per tahun. Jadi bunga flat 10% bukan "lebih murah" daripada bunga efektif 15%; justru sebaliknya. Semakin panjang tenornya, semakin besar selisih ini.',
			),
			ul(
				'Minta penyedia menyebut metode bunga secara tertulis.',
				'Hitung total yang dibayar: cicilan × tenor, ditambah semua biaya di awal.',
				'Gunakan kalkulator cicilan untuk mencoba kedua metode dengan angka yang sama.',
			),
			h2('Yang sering terlewat'),
			p(
				'Angka bunga hanya satu bagian dari biaya pinjaman. Biaya provisi, administrasi, dan asuransi bisa menambah beban cukup besar. Pembahasannya ada di ',
				link('/artikel/biaya-pinjaman-selain-bunga', 'biaya pinjaman selain bunga'),
				'. Untuk istilah yang belum familier, lihat juga ',
				link(
					'/kategori/edukasi/edukasi-pinjaman-kredit',
					'kumpulan artikel edukasi pinjaman',
				),
				'.',
			),
		],
	},
	{
		slug: 'cara-kerja-pinjaman-jaminan-bpkb',
		title: 'Pinjaman jaminan BPKB: cara kerja, plafon, dan risikonya',
		lead_text:
			'Pinjaman jaminan BPKB memakai bukti kepemilikan kendaraan sebagai agunan, sementara kendaraannya tetap Anda pakai. Plafonnya mengikuti taksiran nilai kendaraan, dan risikonya adalah kehilangan kendaraan bila cicilan macet.',
		article_type: 'standard',
		featured_image: 'kategori-pinjaman',
		primary_category: 'edukasi-pinjaman-kredit',
		categories: ['edukasi-pinjaman-kredit', 'pinjaman-lainnya'],
		author: 'tim-redaksi',
		reviewer: 'peninjau-contoh-tiga',
		tags: ['jaminan-bpkb', 'bunga-pinjaman'],
		first_published_at: '2026-11-12T02:00:00.000Z',
		last_reviewed_at: '2026-11-11T08:00:00.000Z',
		key_takeaways: [
			{
				text: 'BPKB disimpan oleh penyedia sampai pinjaman lunas; kendaraan tetap dipakai pemiliknya.',
			},
			{ text: 'Plafon biasanya berupa persentase dari taksiran harga pasar kendaraan.' },
			{ text: 'Kendaraan dapat ditarik bila kewajiban tidak dipenuhi sesuai perjanjian.' },
		],
		sources: [
			{
				title: 'Ketentuan umum pembiayaan dengan jaminan kendaraan',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/pembiayaan-jaminan-kendaraan',
				accessed_on: '2026-11-05',
			},
		],
		content: [
			p(
				'Pinjaman jaminan BPKB adalah pinjaman tunai yang memakai Buku Pemilik Kendaraan Bermotor (BPKB) sebagai agunan. Selama pinjaman berjalan, BPKB disimpan oleh penyedia, sedangkan kendaraannya tetap Anda gunakan sehari-hari.',
			),
			h2('Bagaimana plafon ditentukan'),
			p(
				'Penyedia menaksir harga pasar kendaraan berdasarkan merek, tipe, tahun, dan kondisinya. Plafon pinjaman biasanya berupa persentase dari taksiran itu, misalnya sampai 70–80%. Mobil yang ditaksir Rp 150.000.000 dengan batas 80% berarti plafon paling besar Rp 120.000.000. Penyedia juga melihat penghasilan dan riwayat kredit Anda, jadi plafon yang disetujui bisa lebih kecil.',
			),
			h2('Bunga dan tenor'),
			p(
				'Penawaran jaminan BPKB umumnya menyebut bunga flat per bulan atau per tahun, dengan tenor sekitar 6 sampai 48 bulan. Karena memakai agunan, bunganya cenderung lebih rendah daripada pinjaman tanpa agunan. Tetap ubah angka flat menjadi bunga efektif sebelum membandingkan; caranya dijelaskan di ',
				link('/artikel/bunga-flat-dan-bunga-efektif', 'bunga flat dan bunga efektif'),
				'.',
			),
			h2('Risiko yang perlu dipahami'),
			ul(
				'Kendaraan menjadi jaminan fidusia: bila cicilan macet, penyedia dapat menariknya sesuai perjanjian dan aturan yang berlaku.',
				'Biaya di awal (provisi, administrasi, asuransi) mengurangi dana yang benar-benar Anda terima.',
				'Pelunasan lebih cepat bisa dikenai penalti; tanyakan besarnya sebelum tanda tangan.',
			),
			h2('Kapan pinjaman ini masuk akal'),
			p(
				'Pinjaman jaminan BPKB cocok untuk kebutuhan yang jelas dan terukur, misalnya modal usaha dengan perkiraan arus kas, bukan untuk menutup utang konsumtif lain. Pastikan cicilannya masih aman dibanding penghasilan; panduan menghitungnya ada di ',
				link(
					'/artikel/menghitung-batas-cicilan-aman',
					'cara menghitung batas cicilan aman',
				),
				'.',
			),
		],
	},
	{
		slug: 'riwayat-kredit-di-slik-ojk',
		title: 'Riwayat kredit di SLIK OJK: apa yang dicatat dan kenapa penting',
		lead_text:
			'SLIK OJK mencatat pinjaman dan kartu kredit Anda beserta ketepatan pembayarannya. Penyedia melihat catatan ini sebelum memberi pinjaman baru, jadi keterlambatan kecil pun bisa berpengaruh.',
		article_type: 'standard',
		featured_image: 'kategori-kartu-kredit',
		primary_category: 'edukasi-pinjaman-kredit',
		categories: ['edukasi-pinjaman-kredit', 'kartu-kredit'],
		author: 'tim-redaksi',
		reviewer: 'peninjau-contoh-tiga',
		tags: ['kartu-kredit', 'bunga-pinjaman'],
		first_published_at: '2026-11-13T02:00:00.000Z',
		last_reviewed_at: '2026-11-12T07:00:00.000Z',
		key_takeaways: [
			{ text: 'SLIK berisi daftar fasilitas kredit dan kualitas pembayarannya per bulan.' },
			{ text: 'Anda bisa meminta salinan riwayat kredit sendiri melalui layanan resmi OJK.' },
			{
				text: 'Cara terbaik memperbaiki catatan adalah membayar tepat waktu secara konsisten.',
			},
		],
		content: [
			p(
				'Setiap kali Anda memakai kartu kredit, kredit kendaraan, KPR, atau pinjaman lain dari lembaga yang diawasi OJK, datanya dilaporkan ke Sistem Layanan Informasi Keuangan (SLIK). Catatan inilah yang dilihat penyedia ketika menilai permohonan pinjaman baru.',
			),
			h2('Apa yang tercatat'),
			ul(
				'Nama penyedia dan jenis fasilitas, misalnya kartu kredit atau kredit kendaraan.',
				'Plafon, sisa pokok, dan tanggal mulai serta jatuh tempo.',
				'Kualitas pembayaran setiap bulan, dari lancar sampai macet.',
			),
			h2('Kenapa keterlambatan berpengaruh'),
			p(
				'Kualitas pembayaran dikelompokkan menurut lamanya tunggakan. Catatan "dalam perhatian khusus" atau lebih buruk membuat penyedia menilai risiko Anda lebih tinggi. Akibatnya permohonan bisa ditolak, plafon dikurangi, atau bunga yang ditawarkan lebih tinggi.',
			),
			h2('Cara melihat catatan sendiri'),
			p(
				'Anda dapat meminta salinan riwayat kredit pribadi melalui layanan resmi OJK, baik daring maupun di kantor OJK, tanpa perantara. Waspadai pihak yang menawarkan jasa "membersihkan" catatan SLIK dengan bayaran; catatan hanya berubah bila data dari penyedia diperbaiki atau kewajibannya dilunasi.',
			),
			h2('Menjaga catatan tetap baik'),
			ol(
				'Pasang pengingat atau autodebet beberapa hari sebelum jatuh tempo.',
				'Bayar tagihan kartu kredit penuh bila mampu, minimal tepat waktu.',
				'Tutup fasilitas yang tidak dipakai setelah memastikan tidak ada sisa tagihan.',
				[
					'Periksa juga legalitas penyedia sebelum meminjam; lihat ',
					link(
						'/artikel/memeriksa-pinjaman-daring-legal',
						'cara memeriksa pinjaman daring legal',
					),
					'.',
				],
			),
		],
	},
	{
		slug: 'biaya-pinjaman-selain-bunga',
		title: 'Biaya pinjaman selain bunga: provisi, administrasi, asuransi, dan denda',
		lead_text:
			'Biaya di luar bunga bisa menambah beberapa persen pada total pinjaman. Kenali provisi, administrasi, asuransi, dan denda sebelum membandingkan penawaran.',
		article_type: 'standard',
		featured_image: 'kategori-pinjaman',
		primary_category: 'edukasi-pinjaman-kredit',
		author: 'tim-redaksi',
		tags: ['bunga-pinjaman'],
		first_published_at: '2026-11-14T02:00:00.000Z',
		content: [
			p(
				'Ketika membandingkan pinjaman, angka bunga sering menjadi satu-satunya perhatian. Padahal ada biaya lain yang dibayar di awal atau selama tenor, dan jumlahnya bisa cukup besar.',
			),
			h2('Biaya di awal'),
			ul(
				'Provisi: persentase dari plafon, misalnya 1–3%, dipotong saat dana diterima.',
				'Administrasi: biaya tetap untuk memproses permohonan dan dokumen.',
				'Biaya fidusia atau notaris untuk pinjaman beragunan kendaraan.',
				'Asuransi jiwa kredit dan asuransi kendaraan, bila disyaratkan.',
			),
			p(
				'Contohnya, pinjaman Rp 50.000.000 dengan provisi 2% dan administrasi Rp 750.000 berarti Anda hanya menerima Rp 48.250.000, tetapi tetap mencicil pokok Rp 50.000.000.',
			),
			h2('Biaya selama tenor'),
			ul(
				'Denda keterlambatan, biasanya per hari atau per bulan dari cicilan yang tertunggak.',
				'Penalti pelunasan dipercepat, bila Anda melunasi sebelum tenor selesai.',
				'Biaya perubahan data atau penggantian dokumen.',
			),
			h2('Cara membandingkan dengan adil'),
			p(
				'Jumlahkan semua biaya di awal dengan total cicilan, lalu bandingkan angka totalnya. Penawaran dengan bunga sedikit lebih tinggi tetapi tanpa provisi bisa lebih murah secara keseluruhan. Penjelasan tentang metode bunga ada di ',
				link('/artikel/bunga-flat-dan-bunga-efektif', 'bunga flat dan bunga efektif'),
				'.',
			),
		],
	},
	{
		slug: 'menghitung-batas-cicilan-aman',
		title: 'Cara menghitung batas cicilan aman dari gaji bulanan',
		lead_text:
			'Total cicilan sebaiknya tidak lebih dari sepertiga penghasilan bersih. Panduan ini menghitung batas itu langkah demi langkah, termasuk cicilan yang sudah berjalan.',
		article_type: 'standard',
		featured_image: 'kategori-keuangan-keluarga',
		primary_category: 'panduan-pinjaman-kredit',
		categories: ['panduan-pinjaman-kredit', 'pinjaman'],
		author: 'tim-redaksi',
		reviewer: 'peninjau-contoh-tiga',
		tags: ['anggaran-bulanan', 'bunga-pinjaman'],
		first_published_at: '2026-11-15T02:00:00.000Z',
		last_reviewed_at: '2026-11-14T08:00:00.000Z',
		key_takeaways: [
			{ text: 'Mulai dari penghasilan bersih, bukan gaji kotor.' },
			{
				text: 'Kurangi dulu cicilan yang sudah berjalan sebelum menghitung ruang untuk pinjaman baru.',
			},
			{ text: 'Sisakan ruang untuk dana darurat dan kebutuhan pokok.' },
		],
		content: [
			p(
				'Patokan yang banyak dipakai perencana keuangan dan penyedia pinjaman adalah rasio cicilan terhadap penghasilan: total cicilan sebaiknya tidak lebih dari sekitar 30–35% penghasilan bersih bulanan. Berikut cara menghitungnya.',
			),
			h2('Langkah 1: tentukan penghasilan bersih'),
			p(
				'Gunakan gaji yang benar-benar diterima setelah pajak dan iuran, bukan gaji kotor. Bila penghasilan Anda tidak tetap, pakai rata-rata enam bulan terakhir atau angka bulan terendah. Cara membaca komponennya dijelaskan di ',
				link('/artikel/gaji-kotor-vs-gaji-bersih', 'gaji kotor vs gaji bersih'),
				'.',
			),
			h2('Langkah 2: hitung batas total cicilan'),
			p(
				'Kalikan penghasilan bersih dengan 30%. Untuk penghasilan bersih Rp 10.000.000, batasnya Rp 3.000.000 per bulan.',
			),
			h2('Langkah 3: kurangi cicilan yang sudah berjalan'),
			p(
				'Jumlahkan cicilan yang sedang berjalan, termasuk paylater dan cicilan kartu kredit. Bila sudah ada cicilan Rp 1.200.000, ruang untuk pinjaman baru tinggal Rp 1.800.000 per bulan.',
			),
			h2('Langkah 4: ubah menjadi plafon pinjaman'),
			p(
				'Dengan cicilan maksimal Rp 1.800.000, tenor 36 bulan, dan bunga efektif 12% per tahun, plafon yang masih aman sekitar Rp 54.000.000. Coba angka Anda sendiri dengan kalkulator cicilan, lalu bandingkan dengan penawaran yang ada.',
			),
			h2('Daftar periksa sebelum meminjam'),
			ul(
				'Dana darurat minimal tiga bulan pengeluaran sudah tersedia atau tetap bisa dicicil.',
				'Tujuan pinjaman jelas dan sepadan dengan biayanya.',
				'Anda masih sanggup membayar bila penghasilan turun 10–20%.',
			),
		],
	},
	{
		slug: 'menyiapkan-dokumen-pinjaman-bpkb',
		title: 'Menyiapkan dokumen untuk pinjaman jaminan BPKB',
		lead_text:
			'Dokumen yang lengkap mempercepat survei dan penaksiran kendaraan. Siapkan identitas, dokumen kendaraan, dan bukti penghasilan sebelum menghubungi penyedia.',
		article_type: 'standard',
		featured_image: 'kategori-pinjaman',
		primary_category: 'panduan-pinjaman-kredit',
		categories: ['panduan-pinjaman-kredit', 'pinjaman-lainnya'],
		author: 'tim-redaksi',
		reviewer: 'peninjau-contoh-tiga',
		tags: ['jaminan-bpkb'],
		first_published_at: '2026-11-16T02:00:00.000Z',
		last_reviewed_at: '2026-11-15T07:00:00.000Z',
		key_takeaways: [
			{ text: 'Nama di BPKB dan STNK sebaiknya sama dengan nama peminjam.' },
			{ text: 'Pajak kendaraan harus aktif dan kendaraan dalam kondisi layak.' },
			{ text: 'Simpan salinan semua dokumen yang Anda serahkan.' },
		],
		content: [
			p(
				'Proses pinjaman jaminan BPKB biasanya terdiri atas pemeriksaan dokumen, survei ke rumah atau tempat usaha, dan penaksiran kendaraan. Dokumen yang lengkap sejak awal membuat proses ini lebih cepat. Cara kerja pinjamannya sendiri dijelaskan di ',
				link('/artikel/cara-kerja-pinjaman-jaminan-bpkb', 'pinjaman jaminan BPKB'),
				'.',
			),
			h2('Dokumen identitas'),
			ul(
				'KTP peminjam dan pasangan (bila sudah menikah).',
				'Kartu Keluarga.',
				'NPWP, terutama untuk plafon yang lebih besar.',
			),
			h2('Dokumen kendaraan'),
			ul(
				'BPKB asli atas nama peminjam.',
				'STNK yang masih berlaku dengan pajak tahunan sudah dibayar.',
				'Faktur pembelian atau bukti balik nama bila kendaraan pernah dijual-beli.',
			),
			h2('Bukti penghasilan'),
			ul(
				'Karyawan: slip gaji tiga bulan terakhir dan surat keterangan kerja.',
				'Wirausaha: mutasi rekening enam bulan terakhir dan bukti usaha.',
				'Tagihan listrik atau air sebagai bukti alamat tempat tinggal.',
			),
			h2('Sebelum tanda tangan'),
			ol(
				'Minta rincian plafon, bunga, tenor, dan semua biaya secara tertulis.',
				'Pastikan penyedia terdaftar dan diawasi OJK.',
				'Baca ketentuan keterlambatan, penarikan kendaraan, dan pelunasan dipercepat.',
				'Simpan salinan perjanjian dan tanda terima BPKB.',
			),
		],
	},
	{
		slug: 'membandingkan-penawaran-kredit-mobil',
		title: 'Langkah membandingkan penawaran kredit mobil sebelum tanda tangan',
		lead_text:
			'Bandingkan kredit mobil dari total uang muka pertama, cicilan, dan total biaya sampai lunas. Panduan ini memberi lima langkah dan contoh untuk mobil Rp 300 juta.',
		article_type: 'standard',
		featured_image: 'kategori-pinjaman',
		primary_category: 'panduan-pinjaman-kredit',
		categories: ['panduan-pinjaman-kredit', 'pinjaman'],
		author: 'tim-redaksi',
		reviewer: 'peninjau-contoh-tiga',
		tags: ['kredit-kendaraan', 'bunga-pinjaman'],
		first_published_at: '2026-11-17T02:00:00.000Z',
		last_reviewed_at: '2026-11-16T08:00:00.000Z',
		key_takeaways: [
			{
				text: 'Total Down Payment (TDP) mencakup uang muka, cicilan pertama, dan biaya awal.',
			},
			{
				text: 'Bunga flat kredit mobil perlu diubah ke bunga efektif agar bisa dibandingkan.',
			},
			{ text: 'Asuransi kendaraan sering wajib dan ikut menambah biaya.' },
		],
		content: [
			p(
				'Iklan kredit mobil biasanya menonjolkan uang muka ringan atau cicilan rendah. Dua angka itu tidak cukup untuk memilih. Berikut lima langkah membandingkan penawaran dengan adil.',
			),
			h2('1. Samakan harga, uang muka, dan tenor'),
			p(
				'Bandingkan penawaran untuk mobil, uang muka, dan tenor yang sama. Contoh: harga Rp 300.000.000, uang muka 20% (Rp 60.000.000), dan tenor 48 bulan. Pokok pinjamannya Rp 240.000.000.',
			),
			h2('2. Hitung cicilan dan total bunga'),
			p(
				'Dengan bunga flat 5% per tahun, bunga per bulan adalah Rp 1.000.000 dan cicilan pokok Rp 5.000.000, sehingga cicilannya Rp 6.000.000 per bulan. Total bunganya Rp 48.000.000 selama empat tahun, setara bunga efektif sekitar 9,2% per tahun.',
			),
			h2('3. Hitung Total Down Payment'),
			p(
				'TDP adalah uang yang Anda bayar di awal: uang muka, cicilan pertama, biaya administrasi, dan sering kali premi asuransi tahun pertama. Penawaran dengan uang muka sama bisa punya TDP berbeda.',
			),
			h2('4. Periksa asuransi dan biaya lain'),
			ul(
				'Jenis asuransi kendaraan yang disyaratkan: all risk atau total loss only.',
				'Apakah premi dibayar di awal atau ikut dicicil.',
				'Biaya provisi, administrasi, dan fidusia.',
			),
			h2('5. Bandingkan total sampai lunas'),
			p(
				'Jumlahkan TDP dengan semua cicilan berikutnya. Penawaran dengan total terendah untuk syarat yang sama biasanya yang paling hemat. Pastikan juga cicilannya masih di bawah batas aman; lihat ',
				link(
					'/artikel/menghitung-batas-cicilan-aman',
					'cara menghitung batas cicilan aman',
				),
				'.',
			),
		],
	},
	{
		slug: 'mengecek-izin-perusahaan-pembiayaan',
		title: 'Cara mengecek izin perusahaan pembiayaan di OJK',
		lead_text:
			'Sebelum meminjam, pastikan perusahaan pembiayaan atau bank terdaftar dan diawasi OJK. Pemeriksaannya cukup beberapa menit lewat kanal resmi OJK.',
		article_type: 'standard',
		featured_image: 'kategori-pinjaman',
		primary_category: 'panduan-pinjaman-kredit',
		author: 'tim-redaksi',
		tags: ['jaminan-bpkb', 'kredit-kendaraan'],
		first_published_at: '2026-11-17T06:00:00.000Z',
		content: [
			p(
				'Penyedia pinjaman yang berizin wajib mengikuti aturan tentang transparansi biaya, penagihan, dan perlindungan data. Karena itu, langkah pertama sebelum meminjam adalah memastikan penyedianya terdaftar dan diawasi OJK.',
			),
			h2('Langkah pemeriksaan'),
			ol(
				'Catat nama resmi perusahaan, bukan hanya nama merek atau aplikasinya.',
				'Cari nama tersebut di daftar lembaga jasa keuangan berizin di situs resmi OJK.',
				'Bila ragu, tanyakan ke layanan konsumen OJK melalui kontak resminya.',
				'Cocokkan alamat situs, aplikasi, dan nomor kontak penyedia dengan data resminya.',
			),
			h2('Tanda bahaya'),
			ul(
				'Meminta biaya di muka sebelum dana diterima.',
				'Meminta akses ke seluruh kontak atau galeri ponsel.',
				'Tidak mencantumkan bunga, biaya, dan denda secara jelas.',
				'Menghubungi lewat pesan pribadi dengan penawaran yang terlalu mudah.',
			),
			p(
				'Untuk pinjaman daring, ada pemeriksaan tambahan yang dijelaskan di ',
				link(
					'/artikel/memeriksa-pinjaman-daring-legal',
					'cara memeriksa pinjaman daring legal',
				),
				'.',
			),
		],
	},
];
