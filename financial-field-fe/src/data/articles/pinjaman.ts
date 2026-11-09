import { h2, link, ol, p, quote, ul } from '../blocks';
import type { ArticleEntry } from '../types';

/** Demo articles in Pinjaman and its sub-categories (PRP-0002.p1 §S4.4). */
export const PINJAMAN_ARTICLES: ArticleEntry[] = [
	{
		slug: 'pr-simulasi-kpr-rumah-pertama',
		title: 'Simulasi KPR rumah pertama bersama Bank Contoh',
		leadText:
			'Artikel bersponsor ini berisi simulasi KPR dari Bank Contoh untuk pembeli rumah pertama. Simak cara kerja, biaya, dan hal yang perlu diperhatikan dalam artikel berikut.',
		articleType: 'pr_article',
		category: 'pinjaman-kpr',
		tags: ['kpr'],
		author: 'redaksi-contoh',
		image: 'kategori-pinjaman',
		publishedAt: '2026-09-27T12:00:00.000Z',
		sponsor: {
			name: 'Sponsor Contoh',
			url: 'https://example.com',
			disclosure: 'Artikel ini dibuat atas kerja sama dengan Sponsor Contoh.',
		},
		body: [
			p(
				'Artikel bersponsor ini berisi simulasi KPR dari Bank Contoh untuk pembeli rumah pertama. Informasi produk disusun bersama Sponsor Contoh untuk pembaca Financial Field Indonesia.',
			),
			p(
				'Sponsor Contoh menyediakan ilustrasi produk untuk membantu pembaca memahami cara kerja fitur yang ditawarkan. Informasi lengkap mengenai syarat, biaya, dan manfaat tersedia di ',
				link('https://example.com/produk-contoh', 'halaman produk sponsor'),
				'. Pembaca tetap disarankan membandingkan informasi tersebut dengan sumber lain sebelum mengambil keputusan.',
			),
			h2('Cara kerja produk (ilustrasi)'),
			p(
				'Produk ilustrasi ini berkaitan dengan simulasi KPR dari Bank Contoh. Calon pengguna terlebih dahulu mendaftar dan mengisi data dasar, kemudian memilih paket yang sesuai dengan kebutuhan. Setelah itu, pengguna dapat memantau status dan riwayat transaksi melalui aplikasi contoh. Tampilan, nama fitur, dan alur pendaftaran pada produk sebenarnya dapat berbeda dari gambaran ini.',
			),
			p(
				'Menurut materi dari Sponsor Contoh, produk ini ditujukan bagi pembaca yang menginginkan proses yang praktis dan informasi biaya yang transparan. Meskipun demikian, kemudahan proses tidak selalu berarti produk tersebut paling sesuai. Kebutuhan, kemampuan bayar, dan tujuan jangka panjang tetap menjadi pertimbangan utama yang hanya dapat dinilai oleh pembaca sendiri.',
			),
			p(
				'Sebagai gambaran, misalkan biaya administrasi awal sebesar Rp 75.000 dan biaya bulanan sebesar Rp 15.000. Dalam satu tahun, total biaya yang dibayar menjadi penjumlahan keduanya. Angka seperti ini sebaiknya selalu dihitung sendiri dan dibandingkan dengan manfaat yang benar-benar Anda gunakan, bukan hanya dengan manfaat yang dijanjikan dalam materi promosi.',
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
				link('/kategori/pinjaman/pinjaman-kpr', 'topik KPR'),
				' atau lanjutkan ke ',
				link(
					'/artikel/kemampuan-bayar-pinjaman-pendidikan',
					'Pinjaman pendidikan: menghitung kemampuan bayar setelah lulus',
				),
				'.',
			),
		],
	},
	{
		slug: 'kemampuan-bayar-pinjaman-pendidikan',
		title: 'Pinjaman pendidikan: menghitung kemampuan bayar setelah lulus',
		leadText:
			'Kemampuan bayar pinjaman pendidikan sebaiknya dihitung dari perkiraan gaji awal, bukan dari harapan gaji di masa depan. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		articleType: 'standard',
		category: 'pinjaman-pendidikan',
		tags: ['pinjaman-pendidikan'],
		author: 'penulis-contoh-dua',
		reviewer: 'peninjau-contoh-dua',
		image: 'kategori-pinjaman',
		publishedAt: '2026-09-26T02:00:00.000Z',
		lastReviewedAt: '2026-09-27T02:00:00.000Z',
		keyTakeaways: [
			'Kemampuan bayar pinjaman pendidikan sebaiknya dihitung dari perkiraan gaji awal, bukan dari harapan gaji di masa depan.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang kemampuan membayar pinjaman pendidikan.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		sources: [
			{
				title: 'Panduan tentang kemampuan membayar pinjaman pendidikan',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/kemampuan-bayar-pinjaman-pendidikan',
				accessedOn: '2026-10-01',
			},
		],
		body: [
			p(
				'Kemampuan bayar pinjaman pendidikan sebaiknya dihitung dari perkiraan gaji awal, bukan dari harapan gaji di masa depan. Pembahasan tentang kemampuan membayar pinjaman pendidikan biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel ini menyusun dasar-dasarnya secara berurutan.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Pemahaman yang baik tentang kemampuan membayar pinjaman pendidikan juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu kemampuan membayar pinjaman pendidikan?'),
			p(
				'Ketika membicarakan kemampuan membayar pinjaman pendidikan, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang kemampuan membayar pinjaman pendidikan paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
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
				'Kumpulkan dokumen dan catatan yang berkaitan dengan kemampuan membayar pinjaman pendidikan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.',
			),
			p(
				'Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 8.500.000 per bulan dan memutuskan menyisihkan 5% untuk keperluan ini. Artinya, sekitar Rp 425.000 disisihkan setiap bulan, atau Rp 8.925.000 dalam 21 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 8.500.000',
				'Porsi yang disisihkan: 5% atau Rp 425.000',
				'Akumulasi dalam 21 bulan: Rp 8.925.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 10%, jumlah yang disisihkan menjadi sekitar Rp 850.000 per bulan, atau Rp 17.850.000 dalam 21 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang kemampuan membayar pinjaman pendidikan secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pinjaman/pinjaman-pendidikan', 'topik Pinjaman Pendidikan'),
				' atau lanjutkan ke ',
				link(
					'/artikel/pr-simulasi-kpr-rumah-pertama',
					'Simulasi KPR rumah pertama bersama Bank Contoh',
				),
				'.',
			),
		],
	},
	{
		slug: 'memeriksa-pinjaman-daring-legal',
		title: 'Pinjaman daring legal atau ilegal: cara memeriksa sebelum meminjam',
		leadText:
			'Sebelum meminjam secara daring, periksa status izin penyelenggara dan baca seluruh biaya yang dikenakan. Artikel ini merangkum dasar-dasarnya beserta langkah praktis yang bisa langsung dicoba.',
		articleType: 'standard',
		category: 'pinjaman-lainnya',
		tags: ['dana-darurat'],
		author: 'penulis-contoh-satu',
		reviewer: 'peninjau-contoh-satu',
		image: 'kategori-pinjaman',
		publishedAt: '2026-09-24T16:00:00.000Z',
		lastReviewedAt: '2026-09-25T16:00:00.000Z',
		keyTakeaways: [
			'Sebelum meminjam secara daring, periksa status izin penyelenggara dan baca seluruh biaya yang dikenakan.',
			'Catat angka nyata Anda sebelum membuat keputusan tentang pemeriksaan legalitas pinjaman daring.',
			'Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.',
		],
		faq: [
			{
				question: 'Apa langkah pertama terkait pemeriksaan legalitas pinjaman daring?',
				answer: 'Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting.',
			},
			{
				question: 'Apakah angka dalam artikel ini bisa dipakai langsung?',
				answer: 'Tidak. Angka dalam artikel ini adalah gambaran sederhana; hitung kembali dengan data Anda sendiri.',
			},
		],
		sources: [
			{
				title: 'Panduan tentang pemeriksaan legalitas pinjaman daring',
				publisher: 'Lembaga Contoh',
				url: 'https://example.org/sumber/memeriksa-pinjaman-daring-legal',
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
				'Sebelum meminjam secara daring, periksa status izin penyelenggara dan baca seluruh biaya yang dikenakan. Banyak pembaca bertanya tentang pemeriksaan legalitas pinjaman daring, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.',
			),
			p(
				'Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.',
			),
			p(
				'Pemahaman yang baik tentang pemeriksaan legalitas pinjaman daring juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.',
			),
			h2('Apa itu pemeriksaan legalitas pinjaman daring?'),
			p(
				'Ketika membicarakan pemeriksaan legalitas pinjaman daring, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.',
			),
			p(
				'Dalam praktiknya, pemahaman tentang pemeriksaan legalitas pinjaman daring paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.',
			),
			p(
				'Perlu diingat juga bahwa aturan dan ketentuan dapat berubah dari waktu ke waktu. Karena itu, pastikan informasi yang Anda gunakan masih berlaku, terutama jika keputusan yang akan diambil melibatkan jumlah uang yang besar atau jangka waktu yang panjang.',
			),
			h2('Bagaimana caranya?'),
			p(
				'Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.',
			),
			ol(
				'Kumpulkan dokumen dan catatan yang berkaitan dengan pemeriksaan legalitas pinjaman daring.',
				'Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.',
				'Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.',
				'Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.',
			),
			p(
				'Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang pemeriksaan legalitas pinjaman daring mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.',
			),
			h2('Contoh perhitungan'),
			p(
				'Misalkan sebuah keluarga memiliki penghasilan Rp 7.000.000 per bulan dan memutuskan menyisihkan 10% untuk keperluan ini. Artinya, sekitar Rp 700.000 disisihkan setiap bulan, atau Rp 13.300.000 dalam 19 bulan.',
			),
			ul(
				'Penghasilan bulanan: Rp 7.000.000',
				'Porsi yang disisihkan: 10% atau Rp 700.000',
				'Akumulasi dalam 19 bulan: Rp 13.300.000',
			),
			p(
				'Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi 15%, jumlah yang disisihkan menjadi sekitar Rp 1.050.000 per bulan, atau Rp 19.950.000 dalam 19 bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.',
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
				'Menunda peninjauan sampai masalah sudah terlanjur besar.',
				'Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.',
				'Mencampur dana untuk tujuan berbeda dalam satu rekening.',
				'Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.',
			),
			p(
				'Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang pemeriksaan legalitas pinjaman daring secara berkala, misalnya setiap tiga bulan.',
			),
			p(
				'Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami pemeriksaan legalitas pinjaman daring, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.',
			),
			p(
				'Ingin membaca topik serupa? Lihat kumpulan artikel di ',
				link('/kategori/pinjaman/pinjaman-lainnya', 'topik Pinjaman Lainnya'),
				' atau lanjutkan ke ',
				link(
					'/artikel/pr-simulasi-kpr-rumah-pertama',
					'Simulasi KPR rumah pertama bersama Bank Contoh',
				),
				'.',
			),
		],
	},
];
