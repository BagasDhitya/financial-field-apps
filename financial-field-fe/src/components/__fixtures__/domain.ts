import type {
  Article,
  ArticleSummary,
  AuthorSummary,
  CategoryNode,
} from "@/types";

/** Synthetic data only: no real people, no personal data (REQ-TEST-003). */
const HOUR = 60 * 60 * 1000;

export const harnessNow = new Date("2026-11-03T08:00:00Z");

export const writer: AuthorSummary = {
  id: "author-1",
  slug: "contoh-penulis",
  fullName: "Contoh Penulis",
  roleTitle: "Penulis keuangan",
  credentials: null,
  avatar: null,
};

export const checker: AuthorSummary = {
  id: "author-2",
  slug: "contoh-peninjau",
  fullName: "Contoh Peninjau",
  roleTitle: "Perencana keuangan",
  credentials: "CFP®",
  avatar: null,
};

const category = {
  id: "cat-1",
  slug: "pajak",
  name: "Pajak",
  parentSlug: null,
  parentName: null,
};

export function summary(
  overrides: Partial<ArticleSummary> = {},
): ArticleSummary {
  return {
    id: overrides.id ?? "article-1",
    slug: "cara-menghitung-pajak-penghasilan",
    title: "Cara menghitung pajak penghasilan karyawan dengan benar",
    leadText:
      "Pajak penghasilan karyawan dihitung dari penghasilan neto setahun dikurangi PTKP. Berikut langkahnya.",
    articleType: "standard",
    featuredImage: null,
    primaryCategory: category,
    author: writer,
    publishedAt: new Date(harnessNow.getTime() - 3 * HOUR).toISOString(),
    ...overrides,
  };
}

export const articleFixture: Article = {
  ...summary(),
  body: [
    {
      type: "paragraph",
      children: [
        { type: "text", text: "Paragraf pembuka dengan " },
        { type: "text", text: "teks tebal", bold: true },
        { type: "text", text: "." },
      ],
    },
    {
      type: "heading",
      level: 2,
      children: [{ type: "text", text: "Apa itu PTKP?" }],
    },
    {
      type: "paragraph",
      children: [
        { type: "text", text: "Tautan internal ke " },
        {
          type: "link",
          url: "/kategori/pajak",
          children: [{ type: "text", text: "topik Pajak" }],
        },
        { type: "text", text: "." },
      ],
    },
    {
      type: "list",
      format: "unordered",
      children: [
        {
          type: "list-item",
          children: [{ type: "text", text: "Butir pertama" }],
        },
        {
          type: "list-item",
          children: [{ type: "text", text: "Butir kedua" }],
        },
      ],
    },
    {
      type: "quote",
      children: [
        { type: "text", text: "Kutipan contoh untuk gaya blockquote." },
      ],
    },
  ],
  reviewer: checker,
  lastReviewedAt: new Date(harnessNow.getTime() - 2 * HOUR).toISOString(),
  categories: [category],
  tags: [
    { id: "tag-1", slug: "pph-21", name: "PPh 21" },
    { id: "tag-2", slug: "karyawan", name: "Karyawan" },
  ],
  stocksMentioned: [],
  contentUpdatedAt: null,
  seo: null,
  sponsor: null,
  keyTakeaways: ["Poin penting pertama.", "Poin penting kedua."],
  faq: [
    {
      question: "Pertanyaan contoh pertama?",
      answer: "Jawaban contoh pertama.",
    },
    { question: "Pertanyaan contoh kedua?", answer: "Jawaban contoh kedua." },
  ],
  sources: [
    {
      title: "Contoh sumber resmi",
      publisher: "Lembaga Contoh",
      url: "https://example.org/sumber",
      accessedOn: "2026-10-01",
    },
  ],
  corrections: [
    { date: "2026-11-01", note: "Contoh koreksi angka pada paragraf kedua." },
  ],
};

export const categoriesFixture: CategoryNode[] = [
  {
    ...category,
    description: null,
    navOrder: 1,
    children: [
      {
        id: "cat-2",
        slug: "pph",
        name: "PPh",
        parentSlug: "pajak",
        parentName: "Pajak",
      },
    ],
  },
  {
    id: "cat-3",
    slug: "investasi",
    name: "Investasi",
    parentSlug: null,
    parentName: null,
    description: null,
    navOrder: 2,
    children: [],
  },
];
