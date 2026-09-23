import { cacheTags } from "@/lib/cms/cache-tags";
import { cmsFetch, type CmsCollection } from "@/lib/cms/client";
import { endpoints } from "@/lib/cms/endpoints";
import { mapArticleSummary } from "@/lib/cms/mappers/article";
import { mapStockTicker } from "@/lib/cms/mappers/ticker";
import {
  ARTICLE_SUMMARY_FIELDS,
  ARTICLE_SUMMARY_POPULATE,
} from "@/lib/cms/queries/articles";
import type { StrapiArticle, StrapiTicker } from "@/lib/cms/strapi-types";
import { REVALIDATE } from "@/lib/revalidate";
import type { StockTicker } from "@/types";

type StrapiTickerEntry = StrapiTicker & {
  articles?: StrapiArticle[] | null;
};

export async function getTickerBySymbol(
  symbol: string,
): Promise<StockTicker | null> {
  const result = await cmsFetch<CmsCollection<StrapiTickerEntry>>({
    path: endpoints.tickers,
    query: {
      filters: { ticker_symbol: { $eqi: symbol } },
      populate: {
        articles: {
          fields: ARTICLE_SUMMARY_FIELDS,
          populate: ARTICLE_SUMMARY_POPULATE,
        },
      },
      pagination: { limit: 1 },
    },
    tags: [cacheTags.ticker(symbol)],
    revalidate: REVALIDATE.archive,
  });

  const entry = result.data[0];
  if (!entry) return null;

  return mapStockTicker(entry, (entry.articles ?? []).map(mapArticleSummary));
}
