/** The only place an internal URL is built. Changing the URL scheme is one edit. */
export const routes = {
  home: () => "/",
  article: (slug: string) => `/articles/${slug}`,
  category: (slug: string) => `/category/${slug}`,
  author: (slug: string) => `/authors/${slug}`,
  tag: (slug: string) => `/tag/${slug}`,
  ticker: (symbol: string) => `/tickers/${symbol.toLowerCase()}`,
} as const;
