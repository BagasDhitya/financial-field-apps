import type {
  Article,
  ArticleSummary,
  StockMention,
  TagSummary,
} from "@/types";

import type { StrapiArticle, StrapiTag, StrapiTicker } from "../strapi-types";

import { mapAuthorSummary } from "./author";
import { mapCategorySummary } from "./category";
import { mapMedia } from "./media";

const ARTICLE_TYPES = [
  "standard",
  "pr_article",
  "interview",
  "column",
] as const;

function mapTagSummary(entry: StrapiTag): TagSummary {
  return {
    id: entry.documentId,
    slug: entry.slug ?? "",
    name: entry.name ?? "",
  };
}

function mapStockMention(entry: StrapiTicker): StockMention {
  return {
    id: entry.documentId,
    symbol: entry.ticker_symbol ?? "",
    companyName: entry.company_name ?? "",
  };
}

/**
 * Every field is optional in the CMS (see docs/0001 §18.2), so each one is
 * defended here rather than at dozens of render sites.
 */
export function mapArticleSummary(entry: StrapiArticle): ArticleSummary {
  return {
    id: entry.documentId,
    slug: entry.slug ?? "",
    title: entry.title ?? "",
    leadText: entry.lead_text ?? null,
    articleType: ARTICLE_TYPES.includes(entry.article_type as never)
      ? (entry.article_type as ArticleSummary["articleType"])
      : "standard",
    featuredImage: mapMedia(entry.featured_image),
    primaryCategory: entry.primary_category
      ? mapCategorySummary(entry.primary_category)
      : null,
    author: entry.author ? mapAuthorSummary(entry.author) : null,
    publishedAt: entry.publishedAt ?? null,
  };
}

export function mapArticle(entry: StrapiArticle): Article {
  return {
    ...mapArticleSummary(entry),
    body: entry.content ?? [],
    reviewer: entry.reviewer ? mapAuthorSummary(entry.reviewer) : null,
    categories: (entry.categories ?? []).map(mapCategorySummary),
    tags: (entry.tags ?? []).map(mapTagSummary),
    stocksMentioned: (entry.stocks_mentioned ?? []).map(mapStockMention),
    updatedAt: entry.updatedAt ?? null,
  };
}
