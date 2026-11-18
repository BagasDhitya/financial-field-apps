import { h2, h3, p } from './blocks';
import type { BlocksEntry } from './types';

/**
 * The Kamus Keuangan body (ADR-0022): written as an ordinary Static Page, an
 * `h2` per letter and an `h3` per term followed by its definition, so the CMS
 * can hold it as is. src/lib/blocks.ts `toGlossary` reads it back.
 */
const TERMS: [term: string, definition: string][] = [
	[
		'Agunan',
		'Aset yang diserahkan sebagai jaminan pinjaman, misalnya BPKB kendaraan atau sertifikat rumah. Bila pinjaman tidak dibayar, penyedia dapat menjual agunan sesuai perjanjian.',
	],
	[
		'Amortisasi',
		'Pelunasan pokok pinjaman secara bertahap melalui cicilan. Jadwal amortisasi menunjukkan porsi pokok dan bunga pada setiap cicilan.',
	],
	[
		'Angsuran',
		'Pembayaran rutin, biasanya bulanan, yang terdiri atas sebagian pokok pinjaman dan bunganya. Disebut juga cicilan.',
	],
	[
		'Anuitas',
		'Metode cicilan dengan jumlah tetap setiap bulan untuk pinjaman berbunga efektif. Porsi bunganya besar di awal dan mengecil seiring berkurangnya pokok.',
	],
	[
		'Asuransi jiwa kredit',
		'Asuransi yang melunasi sisa pinjaman bila peminjam meninggal dunia. Sering disyaratkan untuk pinjaman dengan tenor panjang.',
	],
	[
		'BI-Rate',
		'Suku bunga acuan yang ditetapkan Bank Indonesia. Perubahannya memengaruhi bunga simpanan dan pinjaman, terutama yang berbunga mengambang.',
	],
	[
		'BPKB',
		'Buku Pemilik Kendaraan Bermotor, bukti kepemilikan kendaraan. Dalam kredit kendaraan dan pinjaman jaminan BPKB, buku ini disimpan penyedia sampai pinjaman lunas.',
	],
	[
		'Bunga efektif',
		'Bunga yang dihitung dari sisa pokok pinjaman. Karena pokok berkurang setiap bulan, bunga yang dibayar juga berkurang.',
	],
	[
		'Bunga flat',
		'Bunga yang dihitung dari pokok awal selama seluruh tenor. Pada angka yang sama, bunga flat lebih mahal daripada bunga efektif.',
	],
	[
		'Bunga mengambang',
		'Bunga yang dapat berubah mengikuti suku bunga pasar atau acuan tertentu, sehingga cicilan bisa naik atau turun. Lawannya adalah bunga tetap.',
	],
	[
		'Bunga tetap',
		'Bunga yang besarnya tidak berubah selama periode yang disepakati, sehingga cicilan dapat diperkirakan sejak awal.',
	],
	[
		'Dana darurat',
		'Tabungan untuk kebutuhan mendadak, umumnya setara tiga sampai dua belas bulan pengeluaran. Dana ini sebaiknya ada sebelum mengambil pinjaman baru.',
	],
	[
		'Debitur',
		'Pihak yang menerima pinjaman dan wajib membayarnya kembali. Pihak yang memberi pinjaman disebut kreditur.',
	],
	[
		'Denda keterlambatan',
		'Biaya tambahan bila cicilan dibayar melewati jatuh tempo. Besarnya tercantum dalam perjanjian, biasanya per hari atau per bulan.',
	],
	[
		'Fidusia',
		'Pengalihan hak kepemilikan suatu benda sebagai jaminan, sementara bendanya tetap dikuasai pemilik. Kredit kendaraan dan pinjaman jaminan BPKB umumnya memakai jaminan fidusia.',
	],
	[
		'Kolektibilitas',
		'Penggolongan kualitas pembayaran pinjaman, dari lancar sampai macet, berdasarkan lamanya tunggakan. Status ini tercatat di SLIK OJK.',
	],
	[
		'KPR',
		'Kredit Pemilikan Rumah, pinjaman untuk membeli rumah dengan rumah itu sendiri sebagai agunan. Tenornya bisa mencapai belasan sampai puluhan tahun.',
	],
	[
		'Kredit macet',
		'Pinjaman yang tidak dibayar dalam waktu lama sesuai batas yang diatur. Kredit macet tercatat dalam riwayat kredit dan menyulitkan pinjaman berikutnya.',
	],
	['Kreditur', 'Pihak yang memberi pinjaman, misalnya bank atau perusahaan pembiayaan.'],
	[
		'KTA',
		'Kredit Tanpa Agunan, pinjaman tunai yang tidak memerlukan jaminan. Bunganya biasanya lebih tinggi daripada pinjaman beragunan.',
	],
	[
		'OJK',
		'Otoritas Jasa Keuangan, lembaga yang mengatur dan mengawasi bank, perusahaan pembiayaan, asuransi, dan lembaga jasa keuangan lain di Indonesia.',
	],
	[
		'Paylater',
		'Layanan beli sekarang bayar nanti yang membagi pembayaran belanja menjadi cicilan. Cicilannya tercatat sebagai utang dan dapat masuk riwayat kredit.',
	],
	[
		'Pelunasan dipercepat',
		'Melunasi pinjaman sebelum tenor berakhir. Sebagian penyedia mengenakan penalti, jadi periksa ketentuannya di perjanjian.',
	],
	[
		'Perusahaan pembiayaan',
		'Lembaga keuangan bukan bank yang membiayai pembelian kendaraan, barang, atau modal usaha. Disebut juga multifinance, dan diawasi OJK.',
	],
	['Plafon', 'Jumlah pinjaman paling besar yang dapat diberikan kepada seorang peminjam.'],
	[
		'Pokok pinjaman',
		'Jumlah uang yang dipinjam, di luar bunga dan biaya. Cicilan mengurangi pokok sedikit demi sedikit sampai habis.',
	],
	[
		'Provisi',
		'Biaya yang dikenakan saat pinjaman disetujui, biasanya berupa persentase dari plafon dan dipotong dari dana yang diterima.',
	],
	[
		'Rasio cicilan terhadap penghasilan',
		'Perbandingan total cicilan bulanan dengan penghasilan bersih. Banyak perencana keuangan menyarankan rasio ini tidak lebih dari sekitar sepertiga.',
	],
	[
		'Restrukturisasi',
		'Perubahan syarat pinjaman, seperti tenor atau besar cicilan, untuk membantu peminjam yang kesulitan membayar. Dilakukan atas kesepakatan dengan penyedia.',
	],
	[
		'SLIK',
		'Sistem Layanan Informasi Keuangan milik OJK yang mencatat fasilitas kredit seseorang dan kualitas pembayarannya. Penyedia memakainya untuk menilai permohonan pinjaman.',
	],
	[
		'Taksiran',
		'Perkiraan harga pasar agunan, misalnya kendaraan, yang dipakai penyedia untuk menentukan plafon pinjaman.',
	],
	[
		'TDP',
		'Total Down Payment, jumlah yang dibayar di awal kredit kendaraan: uang muka, cicilan pertama, dan biaya-biaya awal.',
	],
	[
		'Tenor',
		'Jangka waktu pinjaman, biasanya dalam bulan. Tenor yang lebih panjang membuat cicilan lebih kecil tetapi total bunga lebih besar.',
	],
	[
		'Uang muka',
		'Bagian harga barang yang dibayar sendiri di awal, sisanya dibiayai pinjaman. Disebut juga DP (down payment).',
	],
];

function glossaryBody(): BlocksEntry {
	const intro = [
		p(
			'Istilah keuangan yang sering muncul dalam artikel dan halaman perbandingan Financial Field Indonesia, terutama seputar pinjaman dan kredit. Penjelasannya ringkas; artikel di kategori Edukasi membahas setiap topik lebih dalam.',
		),
	];
	const blocks: BlocksEntry[number][] = [...intro];
	let letter = '';
	for (const [term, definition] of [...TERMS].sort(([a], [b]) => a.localeCompare(b, 'id'))) {
		const first = term[0]?.toUpperCase() ?? '';
		if (first !== letter) {
			letter = first;
			blocks.push(h2(letter));
		}
		blocks.push(h3(term), p(definition));
	}
	return blocks;
}

export const GLOSSARY: BlocksEntry = glossaryBody();
