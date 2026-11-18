import type { WriterProfileEntry } from './types';

/**
 * Writer Profiles (PRP-0002.p1 §S4.3, ADR-0022). Articles are written by the
 * team, one profile with no page of its own; each reviewer (peninjau) has a
 * full public profile. Everyone here is fictional: names say "Contoh" and
 * links point to example.org, so nobody is mistaken for a real person
 * (REQ-SEED-007).
 */
export const WRITER_PROFILES: WriterProfileEntry[] = [
	{
		slug: 'tim-redaksi',
		full_name: 'Tim Redaksi Financial Field',
		role_title: 'Redaksi',
		bio: 'Artikel Financial Field Indonesia ditulis bersama oleh tim redaksi. Setiap artikel melewati penyuntingan, dan artikel bertanda Terverifikasi juga diperiksa oleh seorang peninjau ahli.',
		same_as: [],
		expertise: [],
	},
	{
		slug: 'peninjau-contoh-satu',
		full_name: 'Peninjau Contoh Satu',
		role_title: 'Perencana keuangan',
		avatar: 'avatar-peninjau-contoh-satu',
		bio: 'Perencana keuangan yang meninjau artikel pajak, pensiun, dan pengelolaan keuangan keluarga di Financial Field Indonesia.',
		credentials: 'CFP®',
		same_as: [{ url: 'https://example.org/profil/peninjau-contoh-satu', label: 'Profil' }],
		expertise: ['Perencanaan keuangan', 'Pajak pribadi', 'Dana pensiun'],
		background: `Peninjau Contoh Satu menempuh pendidikan akuntansi dan memulai karier di bagian layanan nasabah prioritas sebuah bank. Di sana ia melihat langsung bagaimana keputusan kecil, seperti menunda pelaporan pajak atau mencairkan dana pensiun lebih awal, berdampak besar beberapa tahun kemudian.

Selama lebih dari sepuluh tahun berikutnya ia bekerja sebagai perencana keuangan independen untuk keluarga muda dan pekerja lepas. Pekerjaannya sehari-hari adalah menyusun anggaran rumah tangga, menghitung kebutuhan dana pensiun, dan membantu klien memahami kewajiban pajak pribadi mereka.

Di Financial Field Indonesia ia meninjau artikel sebelum terbit: memeriksa angka dan contoh perhitungan, mencocokkan aturan yang dikutip dengan sumber resminya, dan memastikan saran yang diberikan masuk akal bagi pembaca dengan penghasilan rata-rata.`,
		financial_view: `Menurutnya, perencanaan keuangan selalu dimulai dari arus kas, bukan dari produk. Sebelum memilih reksa dana, asuransi, atau pinjaman, seseorang perlu tahu berapa uang yang benar-benar masuk dan keluar setiap bulan.

Ia lebih menyukai langkah sederhana yang bisa dijalankan terus-menerus daripada strategi rumit yang hanya bertahan sebulan. Dana darurat, pencatatan pengeluaran, dan pelaporan pajak tepat waktu adalah tiga kebiasaan yang ia anggap paling berpengaruh.

Ia juga berhati-hati terhadap janji imbal hasil tinggi. Setiap angka yang terdengar terlalu bagus, katanya, perlu dibandingkan dengan risikonya dan dengan sumber yang bisa dicek ulang.`,
	},
	{
		slug: 'peninjau-contoh-dua',
		full_name: 'Peninjau Contoh Dua',
		role_title: 'Perencana keuangan',
		avatar: 'avatar-peninjau-contoh-dua',
		bio: 'Perencana keuangan yang meninjau artikel asuransi, investasi, dan warisan di Financial Field Indonesia.',
		credentials: 'CFP®',
		same_as: [{ url: 'https://example.org/profil/peninjau-contoh-dua', label: 'Profil' }],
		expertise: ['Asuransi', 'Investasi ritel', 'Perencanaan warisan'],
		background: `Peninjau Contoh Dua berlatar belakang pendidikan manajemen keuangan. Ia pernah bekerja di perusahaan asuransi jiwa, menangani klaim dan penjelasan polis kepada nasabah, sebelum pindah ke sebuah perusahaan manajemen investasi.

Pengalaman di dua sisi itu membuatnya terbiasa membaca dokumen panjang: polis, prospektus, dan fund fact sheet. Kini ia bekerja sebagai perencana keuangan yang membantu keluarga menyusun proteksi, investasi jangka panjang, dan rencana pembagian harta.

Di Financial Field Indonesia ia meninjau artikel tentang asuransi, investasi, dan warisan. Fokusnya adalah memastikan istilah dijelaskan dengan benar, risiko disebutkan dengan jujur, dan contoh perhitungan bisa diulang oleh pembaca.`,
		financial_view: `Ia memandang asuransi sebagai alat untuk memindahkan risiko yang tidak sanggup ditanggung sendiri, bukan sebagai investasi. Karena itu ia biasanya menyarankan proteksi dasar lebih dulu, baru kemudian produk lain.

Untuk investasi, ia menganjurkan cara yang membosankan tetapi konsisten: biaya rendah, tujuan yang jelas, dan jangka waktu yang sesuai. Ia mengingatkan bahwa imbal hasil masa lalu tidak menjamin hasil di masa depan.

Soal warisan, ia percaya percakapan terbuka dalam keluarga sama pentingnya dengan dokumen hukumnya. Rencana yang tidak pernah dibicarakan sering kali justru memicu sengketa.`,
	},
	{
		slug: 'peninjau-contoh-tiga',
		full_name: 'Peninjau Contoh Tiga',
		role_title: 'Analis kredit',
		avatar: 'avatar-peninjau-contoh-tiga',
		bio: 'Analis kredit yang meninjau artikel pinjaman, kartu kredit, dan pembiayaan kendaraan di Financial Field Indonesia.',
		same_as: [{ url: 'https://example.org/profil/peninjau-contoh-tiga', label: 'Profil' }],
		expertise: ['Kredit dan pembiayaan', 'Pinjaman beragunan', 'Kartu kredit'],
		background: `Peninjau Contoh Tiga memulai karier sebagai analis kredit di sebuah perusahaan pembiayaan kendaraan. Tugasnya menilai kemampuan bayar calon debitur, memeriksa dokumen agunan, dan menghitung struktur cicilan.

Setelah itu ia bekerja di unit manajemen risiko sebuah bank, menangani kebijakan kartu kredit dan pinjaman tanpa agunan. Dari sana ia belajar bahwa sebagian besar masalah kredit macet berawal dari cicilan yang sejak awal terlalu berat dibanding penghasilan.

Di Financial Field Indonesia ia meninjau artikel edukasi dan panduan seputar pinjaman, kartu kredit, dan pembiayaan. Ia memeriksa cara perhitungan bunga, biaya yang sering terlewat, serta kesesuaian penjelasan dengan aturan yang berlaku.`,
		financial_view: `Baginya, utang bukan hal yang buruk selama tujuannya jelas dan cicilannya terukur. Patokan yang ia pakai: total cicilan sebaiknya tidak lebih dari sepertiga penghasilan bersih bulanan.

Ia selalu meminta pembaca membandingkan biaya total, bukan hanya angka bunga. Bunga flat yang terlihat kecil bisa lebih mahal daripada bunga efektif yang tampak lebih besar, apalagi setelah ditambah biaya provisi, administrasi, dan asuransi.

Ia juga mengingatkan untuk hanya meminjam dari penyedia yang terdaftar dan diawasi OJK, membaca perjanjian sampai selesai, dan menyimpan salinannya.`,
	},
];
