/**
 * The only place an internal URL is built (ADR-0004: Indonesian segments).
 * Changing the URL scheme is one edit here plus the route folder names.
 */
type CategoryPath = { slug: string; parentSlug?: string | null };

export const routes = {
  home: () => "/",
  article: (slug: string) => `/artikel/${slug}`,
  category: ({ slug, parentSlug }: CategoryPath) =>
    parentSlug ? `/kategori/${parentSlug}/${slug}` : `/kategori/${slug}`,
  tag: (slug: string) => `/tag/${slug}`,
  author: (slug: string) => `/penulis/${slug}`,
  latest: () => "/terbaru",
  interviews: () => "/wawancara",
  about: (slug?: string) => (slug ? `/tentang-kami/${slug}` : "/tentang-kami"),
  contact: () => "/hubungi-kami",
  search: (query?: string) =>
    query ? `/cari?q=${encodeURIComponent(query)}` : "/cari",
  searchPage: (query: string, page: number) =>
    page <= 1
      ? `/cari?q=${encodeURIComponent(query)}`
      : `/cari?q=${encodeURIComponent(query)}&halaman=${page}`,
  ticker: (symbol: string) => `/saham/${symbol.toLowerCase()}`,
  /** Path pagination (REQ-SEO-006): page 1 is the base URL itself. */
  paged: (base: string, page: number) =>
    page <= 1 ? base : `${base}/halaman/${page}`,
  exitPreview: () => "/api/preview/keluar",
} as const;

/** Trust pages under /tentang-kami, in footer order (REQ-PAGE-001). */
export const TRUST_PAGES = [
  { slug: "redaksi", label: "Redaksi" },
  { slug: "kebijakan-editorial", label: "Kebijakan Editorial" },
  { slug: "pengungkapan-afiliasi", label: "Pengungkapan Afiliasi" },
  { slug: "koreksi-berita", label: "Kebijakan Koreksi" },
  { slug: "kebijakan-privasi", label: "Kebijakan Privasi" },
  { slug: "syarat-penggunaan", label: "Syarat Penggunaan" },
] as const;

/** Segments reserved for later phases; they must 404 until built (ADR-0004). */
export const RESERVED_SEGMENTS = [
  "bandingkan",
  "penyedia",
  "produk",
  "kalkulator",
  "kamus-keuangan",
  "edukasi",
  "panduan",
] as const;
