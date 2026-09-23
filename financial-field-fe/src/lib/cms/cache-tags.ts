export const cacheTags = {
  articles: () => "articles",
  article: (slug: string) => `article:${slug}`,
  categories: () => "categories",
  category: (slug: string) => `category:${slug}`,
  tags: () => "tags",
  tag: (slug: string) => `tag:${slug}`,
  authors: () => "authors",
  author: (slug: string) => `author:${slug}`,
  tickers: () => "tickers",
  ticker: (symbol: string) => `ticker:${symbol.toLowerCase()}`,
  navigation: () => "navigation",
} as const;
