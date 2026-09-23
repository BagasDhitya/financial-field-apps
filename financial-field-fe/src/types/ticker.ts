import type { ArticleSummary } from "./article";

export type StockMention = {
  id: string;
  symbol: string;
  companyName: string;
};

export type StockTicker = StockMention & {
  articles: ArticleSummary[];
};
