/**
 * Trust-page placeholders and Site Settings (PRP-0002.p1b §1). Sent only when
 * the `static-pages` / `site-settings` capabilities are on. Real text comes
 * from the client (OQ-13).
 */
export const STATIC_PAGES = [
  ["tentang-kami", "Tentang Financial Field Indonesia", "tentang-kami"],
  ["redaksi", "Redaksi", "tentang-kami"],
  ["kebijakan-editorial", "Kebijakan Editorial", "tentang-kami"],
  ["pengungkapan-afiliasi", "Pengungkapan Afiliasi", "tentang-kami"],
  ["koreksi-berita", "Kebijakan Koreksi", "tentang-kami"],
  ["kebijakan-privasi", "Kebijakan Privasi", "legal"],
  ["syarat-penggunaan", "Syarat Penggunaan", "legal"],
  ["hubungi-kami", "Hubungi Kami", "tentang-kami"],
].map(([slug, title, group]) => ({ slug, title, group }));

export const PLACEHOLDER_TEXT =
  "Konten contoh, menunggu teks dari klien (OQ-13). Halaman ini dibuat otomatis untuk menguji tata letak situs Financial Field Indonesia.";

export const SITE_SETTINGS = {
  tagline: "Artikel dan panduan keuangan pribadi",
  description:
    "Financial Field Indonesia menyajikan artikel dan panduan keuangan pribadi. Konten di lingkungan ini adalah data contoh untuk pengujian.",
  contact_email: "redaksi@example.org",
  default_pr_disclosure: "Artikel ini adalah konten bersponsor (contoh).",
  social_links: [
    {
      platform: "Instagram (contoh)",
      url: "https://example.org/sosial/instagram",
    },
  ],
};
