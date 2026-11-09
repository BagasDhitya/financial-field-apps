import type { StockTicker } from '@/types';

import { articles, findTicker, toSummary } from './store';

/**
 * Ticker by symbol (case-insensitive) with the articles that mention it, or
 * null.
 */
export async function getTickerBySymbol(symbol: string): Promise<StockTicker | null> {
	const ticker = findTicker(symbol);
	if (!ticker) {
		return null;
	}
	return {
		...ticker,
		articles: articles
			.filter((article) => article.stocksMentioned.some((stock) => stock.id === ticker.id))
			.map(toSummary),
	};
}
