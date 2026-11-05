import type { ArticleSummary, StockMention, StockTicker } from '@/types';

import type { StrapiTicker } from '../strapi-types';

/** A ticker as mentioned in an article: symbol and company name only. */
export function mapStockMention(entry: StrapiTicker): StockMention {
	return {
		id: entry.documentId,
		symbol: entry.ticker_symbol ?? '',
		companyName: entry.company_name ?? '',
	};
}

/** Ticker page data. The caller maps the articles first. */
export function mapStockTicker(entry: StrapiTicker, articles: ArticleSummary[]): StockTicker {
	return {
		...mapStockMention(entry),
		articles,
	};
}
