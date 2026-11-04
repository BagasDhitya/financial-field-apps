/**
 * Deterministic content builders (PRP-0002.p1b §4.5). Same row in, same
 * Strapi Blocks out: variation comes from a hash of the slug, never from
 * randomness, so re-runs are stable (REQ-SEED-004). All text is original and
 * fictional; every figure is labelled *fiktif*.
 */

export const DISCLAIMER =
  "Artikel contoh: dibuat otomatis untuk menguji situs Financial Field Indonesia. Bukan saran keuangan. Nama, angka, dan lembaga dalam artikel ini fiktif.";

const RUPIAH = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/** FNV-1a 32-bit. */
export function hash(value) {
  let h = 0x811c9dc5;
  for (const char of value) {
    h ^= char.codePointAt(0) ?? 0;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

function pick(list, seed, salt) {
  return list[hash(`${seed}:${salt}`) % list.length];
}

function rupiah(amount) {
  return RUPIAH.format(amount).replace(/ /g, " ");
}

// ---- Blocks helpers -------------------------------------------------------

const text = (value, modifiers = {}) => ({
  type: "text",
  text: value,
  ...modifiers,
});
const paragraph = (...children) => ({
  type: "paragraph",
  children: children.map((c) => (typeof c === "string" ? text(c) : c)),
});
const heading = (level, value) => ({
  type: "heading",
  level,
  children: [text(value)],
});
const list = (format, items) => ({
  type: "list",
  format,
  children: items.map((item) => ({
    type: "list-item",
    children: [text(item)],
  })),
});
const quote = (value) => ({ type: "quote", children: [text(value)] });
const link = (url, value) => ({ type: "link", url, children: [text(value)] });
const disclaimer = () => paragraph(text(DISCLAIMER, { italic: true }));

// ---- Leads and metadata ---------------------------------------------------

/** 120–220 characters, answer first (REQ-GEO-001). */
export function buildLead(row) {
  let lead = row.answer;
  if (lead.length < 120) {
    lead = `${lead} Artikel contoh ini memakai angka fiktif dan disusun untuk menguji tampilan situs.`;
  }
  if (lead.length > 220) {
    const cut = lead.slice(0, 219);
    lead = `${cut.slice(0, cut.lastIndexOf(" "))}…`;
  }
  return lead;
}

function figures(row) {
  const base = 3_000_000 + (hash(row.slug) % 12) * 500_000;
  const share = 5 + (hash(`${row.slug}:share`) % 6);
  const months = 6 + (hash(`${row.slug}:months`) % 19);
  return {
    base,
    share,
    months,
    part: Math.round((base * share) / 100 / 1000) * 1000,
  };
}

// ---- Templates ------------------------------------------------------------

const OPENERS = [
  (t) =>
    `Banyak pembaca bertanya tentang ${t}, terutama ketika pertama kali harus mengambil keputusan sendiri. Pertanyaannya sering sederhana, tetapi jawabannya bergantung pada kebiasaan dan kondisi keuangan masing-masing.`,
  (t) =>
    `Topik ${t} sering terdengar rumit karena istilahnya banyak dan informasinya tersebar. Padahal, jika dipecah menjadi beberapa langkah kecil, sebagian besar orang dapat memahaminya dalam satu kali baca.`,
  (t) =>
    `Pembahasan tentang ${t} biasanya muncul pada momen tertentu, misalnya saat penghasilan berubah atau saat keluarga bertambah. Artikel contoh ini menyusun dasar-dasarnya secara berurutan.`,
];

const CONTEXT = [
  "Setiap keluarga memiliki kebutuhan dan prioritas yang berbeda. Karena itu, contoh dalam artikel ini sebaiknya dibaca sebagai gambaran cara berpikir, bukan sebagai angka yang harus diikuti.",
  "Kondisi setiap orang berbeda, mulai dari penghasilan, tanggungan, hingga tujuan jangka panjang. Gunakan penjelasan berikut sebagai kerangka, lalu sesuaikan dengan data Anda sendiri.",
  "Tidak ada satu jawaban yang cocok untuk semua orang. Yang bisa diseragamkan adalah urutan langkahnya: memahami posisi saat ini, menentukan tujuan, lalu memantau hasilnya secara berkala.",
];

const WHY = [
  (t) =>
    `Mengapa ${t} penting? Karena keputusan yang berkaitan dengannya biasanya berulang setiap bulan atau setiap tahun. Kesalahan kecil yang terus diulang dapat menjadi beban besar dalam jangka panjang, sedangkan kebiasaan baik yang dijaga sejak awal akan terasa manfaatnya bertahun-tahun kemudian.`,
  (t) =>
    `Artikel ini disusun untuk pembaca yang ingin memahami ${t} tanpa harus membaca dokumen teknis yang panjang. Penjelasannya dibagi menjadi pengertian dasar, langkah praktis, contoh perhitungan dengan angka fiktif, dan daftar kesalahan yang sering terjadi.`,
  (t) =>
    `Pemahaman yang baik tentang ${t} juga membantu ketika Anda perlu berdiskusi dengan pihak lain, misalnya pasangan, keluarga, atau perencana keuangan. Dengan bahasa yang sama, diskusi menjadi lebih singkat dan keputusan lebih mudah disepakati bersama.`,
];

const WHAT_IS = [
  (t) =>
    `Secara sederhana, ${t} adalah bagian dari pengelolaan keuangan pribadi yang memengaruhi berapa banyak uang yang tersisa setiap bulan. Memahaminya membantu Anda membuat keputusan yang lebih tenang dan tidak terburu-buru.`,
  (t) =>
    `${capitalize(t)} pada dasarnya menyangkut cara uang masuk, uang keluar, dan aturan yang menyertainya. Ketiganya saling terkait, sehingga perubahan pada satu bagian biasanya terasa pada bagian lain.`,
  (t) =>
    `Ketika membicarakan ${t}, ada dua hal yang perlu dipisahkan: aturan umum yang berlaku untuk semua orang, dan pilihan pribadi yang bisa Anda sesuaikan. Artikel ini lebih banyak membahas bagian kedua.`,
];

const TERMS = [
  (t) =>
    `Sebelum melangkah lebih jauh, biasakan membaca istilah yang muncul dalam dokumen atau formulir terkait ${t}. Jika ada istilah yang belum jelas, catat dan cari penjelasannya dari sumber resmi. Kebiasaan ini mencegah salah paham yang sering baru disadari ketika keputusan sudah diambil.`,
  () =>
    "Satu hal yang sering terlupa adalah faktor waktu. Banyak aturan dan produk keuangan memiliki tenggat, masa tunggu, atau periode tertentu. Mengetahui jadwal tersebut sejak awal membuat Anda punya cukup ruang untuk menyiapkan dokumen dan dana yang dibutuhkan.",
  () =>
    "Perlu diingat juga bahwa aturan dan ketentuan dapat berubah dari waktu ke waktu. Karena itu, pastikan informasi yang Anda gunakan masih berlaku, terutama jika keputusan yang akan diambil melibatkan jumlah uang yang besar atau jangka waktu yang panjang.",
];

const STEPS = [
  (t) => `Kumpulkan dokumen dan catatan yang berkaitan dengan ${t}.`,
  () => "Tuliskan angka penghasilan dan pengeluaran bulanan apa adanya.",
  () =>
    "Tentukan satu tujuan utama yang ingin dicapai dalam enam bulan ke depan.",
  () => "Bandingkan beberapa pilihan, lalu catat kelebihan dan kekurangannya.",
  () => "Tetapkan tanggal untuk meninjau ulang keputusan yang sudah diambil.",
  () => "Simpan semua bukti dan catatan di satu tempat yang mudah ditemukan.",
];

const STEP_NOTES = [
  (t) =>
    `Langkah pertama sering dianggap remeh, padahal dari situlah semua keputusan berikutnya bergantung. Tanpa data yang lengkap, rencana tentang ${t} mudah meleset. Sebaliknya, langkah terakhir memastikan rencana tetap relevan ketika penghasilan, kebutuhan, atau aturan berubah.`,
  () =>
    "Jika salah satu langkah terasa berat, pecah lagi menjadi tugas yang lebih kecil. Misalnya, alih-alih mengumpulkan semua dokumen sekaligus, kumpulkan satu jenis dokumen setiap hari. Cara ini membuat kemajuan tetap terasa dan mengurangi kemungkinan rencana berhenti di tengah jalan.",
  () =>
    "Urutan langkah di atas bisa diulang setiap tahun. Pada putaran kedua dan seterusnya, prosesnya biasanya jauh lebih cepat karena sebagian besar catatan sudah tersedia. Yang perlu diperbarui hanya angka dan kondisi yang berubah sejak peninjauan terakhir.",
];

const MISTAKES = [
  "Mengambil keputusan hanya berdasarkan cerita orang lain tanpa melihat kondisi sendiri.",
  "Tidak mencatat angka sehingga sulit mengetahui apakah rencana berjalan.",
  "Menunda peninjauan sampai masalah sudah terlanjur besar.",
  "Mengabaikan biaya kecil yang jika dijumlahkan ternyata cukup besar.",
  "Mencampur dana untuk tujuan berbeda dalam satu rekening.",
];

const TIPS = [
  "Mulailah dari langkah kecil yang bisa dilakukan minggu ini, bukan dari rencana besar yang sulit dijalankan.",
  "Catatan yang sederhana tetapi rutin lebih berguna daripada catatan lengkap yang hanya dibuat sekali.",
  "Ajak anggota keluarga yang terlibat sejak awal agar rencana lebih mudah dijalankan bersama.",
];

const AFTER_TIP = [
  "Konsistensi biasanya lebih menentukan daripada besarnya angka. Rencana yang dijalankan setiap bulan, meskipun kecil, memberi hasil yang lebih dapat diandalkan daripada rencana besar yang sering tertunda. Jika suatu bulan rencana tidak berjalan, cukup lanjutkan pada bulan berikutnya tanpa perlu memulai dari awal.",
  "Jangan ragu menyesuaikan rencana ketika kondisi berubah. Kenaikan penghasilan, tambahan tanggungan, atau kebutuhan mendesak adalah alasan yang wajar untuk meninjau kembali porsi dan prioritas. Yang penting, setiap perubahan dicatat agar Anda tetap tahu alasan di balik keputusan tersebut.",
  "Bila memungkinkan, otomatiskan langkah yang berulang, misalnya dengan pemindahan dana terjadwal pada tanggal gajian. Dengan begitu, rencana berjalan tanpa harus diingat setiap bulan, dan Anda dapat memusatkan perhatian pada keputusan yang benar-benar membutuhkan pertimbangan.",
];

const AVOID = [
  (t) =>
    `Jika Anda merasa ragu, tidak ada salahnya meminta pendapat dari pihak yang memahami ${t}, misalnya perencana keuangan bersertifikat atau petugas resmi dari lembaga terkait. Siapkan catatan dan pertanyaan sebelum berkonsultasi agar waktu yang tersedia dapat dimanfaatkan dengan baik.`,
  () =>
    "Cara lain untuk menghindari kesalahan adalah menulis alasan setiap keputusan penting. Catatan singkat seperti ini sangat membantu ketika Anda meninjau ulang rencana beberapa bulan kemudian, karena Anda dapat menilai apakah alasan tersebut masih berlaku atau sudah perlu diganti.",
  () =>
    "Ingat pula bahwa membandingkan diri dengan orang lain jarang membantu. Setiap rumah tangga memiliki penghasilan, kewajiban, dan tujuan yang berbeda. Ukuran keberhasilan yang paling berguna adalah kemajuan Anda sendiri dibandingkan dengan kondisi beberapa bulan sebelumnya.",
];

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function closing(row, ctx) {
  const children = [
    "Ingin membaca topik serupa? Lihat kumpulan artikel di ",
    link(`/kategori/${ctx.categoryPath}`, `topik ${ctx.categoryName}`),
  ];
  if (ctx.related) {
    children.push(
      " atau lanjutkan ke ",
      link(`/artikel/${ctx.related.slug}`, ctx.related.title),
    );
  }
  children.push(".");
  return paragraph(...children);
}

function standardBody(row, ctx) {
  const t = row.topic;
  const { base, share, months, part } = figures(row);
  const higher = Math.round((base * (share + 5)) / 100 / 1000) * 1000;
  const steps = [0, 1, 2, 3, 4, 5]
    .sort((x, y) => hash(`${row.slug}:step${x}`) - hash(`${row.slug}:step${y}`))
    .slice(0, 4 + (hash(row.slug) % 2))
    .map((index) => STEPS[index](t));
  const mistakes = [...MISTAKES]
    .sort((x, y) => hash(`${row.slug}${x}`) - hash(`${row.slug}${y}`))
    .slice(0, 4);
  return [
    disclaimer(),
    paragraph(row.answer, " ", pick(OPENERS, row.slug, "open")(t)),
    paragraph(pick(CONTEXT, row.slug, "context")),
    paragraph(pick(WHY, row.slug, "why")(t)),
    heading(2, `Apa itu ${t}?`),
    paragraph(pick(WHAT_IS, row.slug, "what")(t)),
    paragraph(
      `Dalam praktiknya, pemahaman tentang ${t} paling terasa manfaatnya saat Anda menyusun anggaran tahunan. Dengan gambaran yang jelas, keputusan kecil setiap bulan menjadi lebih konsisten dan mudah dijelaskan kepada keluarga.`,
    ),
    paragraph(pick(TERMS, row.slug, "terms")(t)),
    heading(2, "Bagaimana caranya?"),
    paragraph(
      "Langkah berikut dapat dijadikan urutan kerja. Tidak semua langkah harus selesai dalam satu hari; yang penting urutannya dijaga.",
    ),
    list("ordered", steps),
    paragraph(pick(STEP_NOTES, row.slug, "notes")(t)),
    heading(2, "Contoh perhitungan (angka fiktif)"),
    paragraph(
      `Misalkan sebuah keluarga contoh memiliki penghasilan ${rupiah(base)} per bulan dan memutuskan menyisihkan ${share}% untuk keperluan ini. Artinya, sekitar ${rupiah(part)} disisihkan setiap bulan, atau ${rupiah(part * months)} dalam ${months} bulan.`,
    ),
    list("unordered", [
      `Penghasilan bulanan (fiktif): ${rupiah(base)}`,
      `Porsi yang disisihkan: ${share}% atau ${rupiah(part)}`,
      `Akumulasi dalam ${months} bulan: ${rupiah(part * months)}`,
    ]),
    paragraph(
      `Dari contoh tersebut terlihat bahwa jumlah yang kecil setiap bulan dapat terkumpul menjadi angka yang berarti. Jika porsinya dinaikkan menjadi ${share + 5}%, jumlah yang disisihkan menjadi sekitar ${rupiah(higher)} per bulan, atau ${rupiah(higher * months)} dalam ${months} bulan. Sebaliknya, jika porsinya diturunkan, waktu yang dibutuhkan untuk mencapai tujuan yang sama akan lebih lama.`,
    ),
    paragraph(
      "Angka di atas sengaja dibuat sederhana dan tidak memperhitungkan inflasi, biaya, atau perubahan aturan. Gunakan angka Anda sendiri untuk mendapatkan gambaran yang lebih sesuai.",
    ),
    quote(pick(TIPS, row.slug, "tip")),
    paragraph(pick(AFTER_TIP, row.slug, "after")),
    heading(2, "Kesalahan yang sering terjadi"),
    list("unordered", mistakes),
    paragraph(
      `Sebagian besar kesalahan di atas dapat dihindari dengan satu kebiasaan: meninjau catatan tentang ${t} secara berkala, misalnya setiap tiga bulan.`,
    ),
    paragraph(pick(AVOID, row.slug, "avoid")(t)),
    closing(row, ctx),
    disclaimer(),
  ];
}

function interviewBody(row, ctx) {
  const t = row.topic;
  const qa = [
    [
      `Bagaimana awalnya Anda tertarik pada ${t}?`,
      `Awalnya karena kebutuhan sendiri. Beberapa tahun lalu saya membuat beberapa keputusan keuangan tanpa rencana, dan hasilnya kurang memuaskan. Sejak itu saya merasa perlu memahami ${t} dengan lebih serius. Saya mulai dari hal sederhana: membaca, mencatat, dan bertanya kepada orang yang lebih berpengalaman, sedikit demi sedikit, tanpa target yang berlebihan.`,
      "Yang paling saya pelajari dari masa itu adalah bahwa memulai dengan pertanyaan sederhana jauh lebih mudah daripada menunggu sampai merasa benar-benar siap. Perasaan siap itu sering tidak pernah datang. Jadi, saya memilih untuk mulai dengan pengetahuan yang ada, lalu memperbaikinya sambil berjalan.",
    ],
    [
      "Kesalahan apa yang paling sering Anda lihat?",
      "Terburu-buru. Banyak orang ingin hasil yang cepat, lalu mengambil keputusan berdasarkan cerita teman atau unggahan di media sosial tanpa melihat kondisi sendiri. Padahal, apa yang cocok untuk orang lain belum tentu cocok untuk kita, karena penghasilan, tanggungan, dan tujuan setiap orang berbeda.",
      "Kesalahan berikutnya adalah tidak mencatat. Tanpa catatan, sulit mengetahui apakah sebuah rencana berjalan atau tidak. Banyak orang merasa sudah berhemat, tetapi ketika angkanya dilihat, ternyata pengeluaran justru naik. Catatan yang sederhana sudah cukup, asalkan dibuat secara rutin dan jujur.",
    ],
    [
      "Kebiasaan apa yang paling membantu Anda?",
      "Meninjau rencana secara rutin. Saya menyisihkan sekitar tiga puluh menit setiap akhir bulan untuk melihat angka, membandingkannya dengan rencana, dan menyesuaikan langkah untuk bulan berikutnya. Waktunya tidak lama, tetapi manfaatnya terasa karena masalah kecil bisa terlihat sebelum menjadi besar.",
      "Kebiasaan kecil ini memang terasa membosankan pada awalnya. Namun setelah beberapa bulan, saya mulai melihat pola: pengeluaran mana yang selalu muncul, kapan kebutuhan besar biasanya datang, dan berapa sebenarnya yang bisa disisihkan. Pola inilah yang kemudian membuat rencana saya lebih realistis.",
    ],
    [
      "Apa saran Anda untuk pembaca yang baru mulai?",
      "Mulailah dari langkah yang bisa dilakukan minggu ini. Tidak perlu sempurna; yang penting konsisten. Misalnya, catat semua pengeluaran selama satu minggu, lalu lihat hasilnya bersama keluarga. Dari situ biasanya muncul satu atau dua hal yang bisa langsung diperbaiki tanpa harus mengubah gaya hidup secara drastis. Setelah itu, tambahkan satu kebiasaan baru setiap bulan.",
      "Dan jangan ragu bertanya kepada orang yang lebih memahami topiknya sebelum mengambil keputusan besar. Bertanya bukan tanda tidak tahu, melainkan cara untuk mengurangi risiko. Terakhir, ingatlah bahwa semua cerita dalam wawancara contoh ini fiktif, jadi sesuaikan setiap saran dengan kondisi Anda sendiri.",
    ],
  ];
  return [
    disclaimer(),
    paragraph(
      row.answer,
      ` Narasumber Contoh adalah tokoh fiktif; wawancara ini disusun untuk menguji tampilan rubrik wawancara. Dalam percakapan berikut, Narasumber Contoh menceritakan pengalamannya tentang ${t}, kesalahan yang pernah dilihatnya, dan kebiasaan yang menurutnya paling membantu bagi pembaca yang baru memulai. Jawaban telah disunting agar ringkas, tanpa mengubah maksud yang ingin disampaikan. Nama, tempat, dan angka dalam wawancara ini tidak merujuk pada orang atau lembaga nyata.`,
    ),
    ...qa.flatMap(([question, first, second]) => [
      heading(2, question),
      paragraph(first),
      paragraph(second),
    ]),
    closing(row, ctx),
    disclaimer(),
  ];
}

function columnBody(row, ctx) {
  const t = row.topic;
  return [
    disclaimer(),
    paragraph(
      `${row.answer} Saya menulis kolom ini sebagai catatan pribadi yang fiktif, untuk mengajak pembaca berhenti sejenak dan memikirkan ${t}. Topik ini jarang dibicarakan di meja makan, padahal hampir semua keluarga berhadapan dengannya. Kita lebih sering membicarakan harga barang atau rencana liburan daripada keputusan yang dampaknya terasa bertahun-tahun ke depan. Melalui tulisan singkat ini, saya ingin berbagi beberapa pengamatan sederhana yang mungkin berguna. Tidak ada rumus khusus di sini, hanya pengalaman sehari-hari yang barangkali terasa akrab bagi banyak pembaca, terutama mereka yang baru mulai mengatur keuangan keluarga sendiri.`,
    ),
    paragraph(
      "Ada masa ketika saya menganggap urusan keuangan cukup dipikirkan saat ada masalah. Selama gaji masuk dan tagihan terbayar, rasanya semua baik-baik saja. Ternyata, justru saat keadaan tenang kita punya ruang terbaik untuk merencanakan. Ketika masalah sudah datang, pilihan yang tersedia biasanya lebih sedikit dan keputusan harus diambil dengan tergesa-gesa. Pelajaran itu, yang kini terasa sangat sederhana, saya dapatkan dengan cara yang kurang menyenangkan, dan sejak itu saya berusaha merencanakan lebih awal, walaupun hanya dengan beberapa baris catatan di buku kecil yang selalu saya bawa.",
    ),
    heading(2, "Yang berubah ketika saya mulai menulis rencana"),
    paragraph(
      "Menuliskan rencana membuat saya lebih jujur terhadap angka. Pengeluaran yang dulu terasa kecil ternyata cukup besar jika dijumlahkan dalam setahun. Biaya langganan yang jarang dipakai, jajan di sela pekerjaan, dan belanja dadakan, semuanya terlihat jelas di atas kertas. Saya tidak langsung menghapus semuanya; saya hanya memilih mana yang benar-benar memberi manfaat, lalu mengalihkan sisanya untuk tujuan yang lebih penting. Perubahan kecil itu ternyata cukup untuk membuat akhir bulan terasa lebih lega, dan yang lebih penting, membuat saya merasa memegang kendali atas uang saya sendiri.",
    ),
    quote(
      "Rencana yang sederhana dan dijalankan lebih berharga daripada rencana sempurna yang hanya disimpan.",
    ),
    paragraph(
      `Tentu, setiap orang memiliki jalannya sendiri. Ada yang nyaman dengan tabel yang rinci, ada pula yang cukup dengan catatan singkat di ponsel. Namun saya percaya, membicarakan ${t} dengan keluarga sejak awal membuat banyak keputusan menjadi lebih ringan. Ketika semua orang memahami tujuan yang sama, godaan untuk menyimpang dari rencana juga lebih mudah ditahan, karena ada yang saling mengingatkan dan saling menyemangati ketika semangat mulai menurun. Percakapan pertama memang terasa canggung, tetapi percakapan berikutnya biasanya mengalir dengan sendirinya.`,
    ),
    paragraph(
      "Jika Anda membaca kolom ini sampai selesai, cobalah menulis satu tujuan keuangan hari ini. Satu kalimat sudah cukup sebagai permulaan, misalnya berapa yang ingin disisihkan bulan depan atau satu kebiasaan yang ingin dikurangi. Simpan tulisan itu di tempat yang mudah terlihat, lalu baca kembali sebulan kemudian. Anda mungkin akan terkejut melihat seberapa jauh satu kalimat sederhana dapat membawa perubahan, terutama jika kalimat itu dibaca ulang bersama orang-orang terdekat. Mulailah hari ini, karena waktu terbaik untuk merencanakan memang selalu sekarang, bukan nanti ketika keadaan memaksa kita untuk segera memutuskan.",
    ),
    closing(row, ctx),
    disclaimer(),
  ];
}

function prBody(row, ctx) {
  return [
    disclaimer(),
    paragraph(
      `${row.answer} Seluruh produk, angka, dan lembaga dalam artikel ini fiktif. Artikel ini merupakan konten bersponsor contoh yang disusun untuk menguji label PR, pengungkapan sponsor, dan atribut tautan bersponsor di situs Financial Field Indonesia.`,
    ),
    paragraph(
      "Sponsor Contoh menyediakan ilustrasi produk untuk membantu pembaca memahami cara kerja fitur yang ditawarkan. Informasi lengkap mengenai syarat, biaya, dan manfaat tersedia di ",
      link("https://example.com/produk-contoh", "halaman produk sponsor"),
      ". Pembaca tetap disarankan membandingkan informasi tersebut dengan sumber lain sebelum mengambil keputusan.",
    ),
    heading(2, "Cara kerja produk (ilustrasi)"),
    paragraph(
      `Produk ilustrasi ini berkaitan dengan ${row.topic}. Calon pengguna terlebih dahulu mendaftar dan mengisi data dasar, kemudian memilih paket yang sesuai dengan kebutuhan. Setelah itu, pengguna dapat memantau status dan riwayat transaksi melalui aplikasi contoh. Semua langkah ini hanya ilustrasi dan tidak menggambarkan produk nyata mana pun. Tampilan, nama fitur, dan alur pendaftaran pada produk sebenarnya dapat berbeda dari gambaran ini.`,
    ),
    paragraph(
      "Menurut materi dari Sponsor Contoh, produk ini ditujukan bagi pembaca yang menginginkan proses yang praktis dan informasi biaya yang transparan. Meskipun demikian, kemudahan proses tidak selalu berarti produk tersebut paling sesuai. Kebutuhan, kemampuan bayar, dan tujuan jangka panjang tetap menjadi pertimbangan utama yang hanya dapat dinilai oleh pembaca sendiri.",
    ),
    paragraph(
      `Sebagai gambaran dengan angka fiktif, misalkan biaya administrasi awal sebesar ${rupiah(50_000 + (hash(row.slug) % 5) * 25_000)} dan biaya bulanan sebesar ${rupiah(15_000 + (hash(`${row.slug}:fee`) % 4) * 5_000)}. Dalam satu tahun, total biaya yang dibayar menjadi penjumlahan keduanya. Angka seperti ini sebaiknya selalu dihitung sendiri dan dibandingkan dengan manfaat yang benar-benar Anda gunakan, bukan hanya dengan manfaat yang dijanjikan dalam materi promosi.`,
    ),
    paragraph(
      "Calon pengguna disarankan membaca syarat dan ketentuan secara lengkap. Perhatikan terutama biaya yang dikenakan di awal, biaya rutin, serta konsekuensi jika terjadi keterlambatan atau pembatalan. Informasi semacam ini sering tercantum di bagian akhir dokumen dan mudah terlewat ketika perhatian tertuju pada manfaat utama yang ditonjolkan dalam materi promosi.",
    ),
    heading(2, "Yang perlu diperhatikan"),
    list("unordered", [
      "Baca seluruh biaya dan ketentuan, bukan hanya manfaat utama yang ditonjolkan.",
      "Bandingkan dengan setidaknya dua produk lain yang sejenis.",
      "Pastikan produk sesuai dengan kebutuhan dan kemampuan bayar Anda.",
      "Periksa apakah penyedia terdaftar dan diawasi oleh otoritas yang berwenang.",
      "Simpan salinan perjanjian dan bukti transaksi di tempat yang aman.",
    ]),
    paragraph(
      "Dalam artikel contoh ini, label PR ditampilkan dengan jelas, nama sponsor diungkapkan, dan tautan ke situs sponsor ditandai sebagai tautan bersponsor. Ketiga hal tersebut membantu pembaca membedakan konten bersponsor dari artikel redaksi biasa, sehingga setiap informasi dapat dinilai dengan sudut pandang yang tepat. Jika ada bagian yang terasa kurang jelas, pembaca dapat menghubungi redaksi melalui halaman kontak untuk meminta klarifikasi atau menyampaikan masukan tentang cara penyajian konten bersponsor.",
    ),
    paragraph(
      "Simulasi tambahan dapat dilihat di ",
      link("https://example.com/simulasi-contoh", "situs Sponsor Contoh"),
      ". Hasil simulasi bersifat ilustratif dan dapat berbeda dengan penawaran yang sebenarnya, sehingga sebaiknya digunakan hanya sebagai gambaran awal. Untuk keputusan akhir, mintalah penjelasan tertulis langsung dari penyedia dan simpan dokumen tersebut bersama catatan keuangan Anda.",
    ),
    closing(row, ctx),
    disclaimer(),
  ];
}

const TEMPLATES = {
  S: standardBody,
  I: interviewBody,
  C: columnBody,
  PR: prBody,
};

/**
 * @param {import("./data/articles.mjs").SeedArticle} row
 * @param {{ categoryName: string, categoryPath: string, related: { slug: string, title: string } | null }} ctx
 */
export function buildBody(row, ctx) {
  return TEMPLATES[row.type](row, ctx);
}

// ---- Rich fields (sent only with their capability) --------------------------

export function buildFaq(row) {
  const t = row.topic;
  const items = [
    {
      question: `Apa langkah pertama terkait ${t}?`,
      answer:
        "Langkah pertama adalah mencatat kondisi saat ini, lalu menentukan satu tujuan yang paling penting. Jawaban ini contoh fiktif.",
    },
    {
      question: "Apakah angka dalam artikel ini bisa dipakai langsung?",
      answer:
        "Tidak. Semua angka dalam artikel contoh ini fiktif dan hanya untuk menguji tampilan situs.",
    },
    {
      question: `Seberapa sering rencana tentang ${t} perlu ditinjau?`,
      answer:
        "Peninjauan berkala, misalnya setiap tiga bulan, membantu rencana tetap sesuai kondisi. Jawaban ini contoh fiktif.",
    },
  ];
  return items.slice(0, 2 + (hash(row.slug) % 2));
}

export function buildSources(row) {
  const sources = [
    {
      title: `Sumber contoh tentang ${row.topic}`,
      publisher: "Lembaga Contoh",
      url: `https://example.org/sumber/${row.slug}`,
      accessed_on: "2026-10-01",
    },
  ];
  if (hash(row.slug) % 2 === 0) {
    sources.push({
      title: "Panduan umum contoh keuangan keluarga",
      publisher: "Lembaga Contoh",
      url: "https://example.org/sumber/panduan-umum",
      accessed_on: "2026-10-15",
    });
  }
  return sources;
}

export function buildTakeaways(row) {
  return [
    {
      text:
        row.answer.length <= 200 ? row.answer : `${row.answer.slice(0, 196)}…`,
    },
    {
      text: `Catat angka nyata Anda sebelum membuat keputusan tentang ${row.topic}.`,
    },
    {
      text: "Tinjau kembali rencana secara berkala dan sesuaikan bila kondisi berubah.",
    },
  ];
}

export function buildCorrection() {
  return [
    {
      date: "2026-10-20",
      note: "Contoh koreksi: angka pada contoh perhitungan diperbaiki agar konsisten dengan teks.",
    },
  ];
}

/** Plain text of a Blocks body, for verification and word counts. */
export function blocksText(blocks) {
  const walk = (nodes) =>
    nodes
      .map((node) =>
        node.type === "text" ? node.text : walk(node.children ?? []),
      )
      .join("");
  return blocks.map((block) => walk(block.children ?? [])).join("\n");
}
