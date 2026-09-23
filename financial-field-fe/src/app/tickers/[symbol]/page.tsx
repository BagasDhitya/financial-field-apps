import { notFound } from "next/navigation";

import { getTickerBySymbol } from "@/lib/content/tickers";

import { TickerView } from "@/features/ticker/TickerView";

/** Safety-net window. Keep in sync with REVALIDATE.archive. */
export const revalidate = 600;

export default async function TickerPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const ticker = await getTickerBySymbol(decodeURIComponent(symbol));

  if (!ticker) notFound();

  return <TickerView ticker={ticker} />;
}
