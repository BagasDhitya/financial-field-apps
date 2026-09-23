import type { ArticleSummary, StockMention, StockTicker } from "@/types";

import type { StrapiTicker } from "../strapi-types";

export function mapStockMention(entry: StrapiTicker): StockMention {
  return {
    id: entry.documentId,
    symbol: entry.ticker_symbol ?? "",
    companyName: entry.company_name ?? "",
  };
}

export function mapStockTicker(
  entry: StrapiTicker,
  articles: ArticleSummary[],
): StockTicker {
  return {
    ...mapStockMention(entry),
    articles,
  };
}
