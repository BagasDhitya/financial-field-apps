/** Fields needed to render a card. Kept minimal — listings fetch many of these. */
export const ARTICLE_SUMMARY_POPULATE = {
  featured_image: true,
  primary_category: true,
  author: { populate: { avatar: true } },
} as const;

/** Everything the article detail route renders. */
export const ARTICLE_DETAIL_POPULATE = {
  ...ARTICLE_SUMMARY_POPULATE,
  reviewer: { populate: { avatar: true } },
  categories: true,
  tags: true,
  stocks_mentioned: true,
} as const;

export const ARTICLE_SUMMARY_FIELDS = [
  "title",
  "slug",
  "lead_text",
  "article_type",
  "publishedAt",
] as const;
