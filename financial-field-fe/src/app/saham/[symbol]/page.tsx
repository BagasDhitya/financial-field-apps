import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTickerBySymbol } from '@/lib/content/tickers';

import { TickerView } from '@/features/ticker/TickerView';

/** Safety-net window. Keep in sync with REVALIDATE.archive (revalidate.test.ts). */
export const revalidate = 600;

/** Empty list = render each path on first request, then cache it (ISR). */
export function generateStaticParams() {
	return [];
}

/** Hidden and noindex until OQ-16 (REQ-SEO-009); not in nav or sitemap. */
export const metadata: Metadata = { robots: { index: false, follow: true } };

type Props = { params: Promise<{ symbol: string }> };

export default async function TickerPage({ params }: Props) {
	const { symbol } = await params;
	const decoded = decodeURIComponent(symbol);
	if (!/^[a-z0-9.\- ]{1,12}$/i.test(decoded)) {
		notFound();
	}
	const ticker = await getTickerBySymbol(decoded);
	if (!ticker) {
		notFound();
	}
	return <TickerView ticker={ticker} />;
}
