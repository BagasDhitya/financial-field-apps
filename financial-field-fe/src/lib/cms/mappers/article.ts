import type {
  Article,
  ArticleSummary,
  ArticleType,
  EditorialStatus,
} from "@/types";

import type { StrapiArticle } from "../strapi-types";

import { mapAuthorSummary } from "./author";
import { mapCategorySummary } from "./category";
import { mapMedia, resolveBodyMedia } from "./media";
import { mapSeo } from "./seo";
import { HIDDEN_TAG_SLUGS, mapTagSummary } from "./tag";
import { mapStockMention } from "./ticker";

const ARTICLE_TYPES: readonly ArticleType[] = [
  "standard",
  "pr_article",
  "interview",
  "column",
];

const EDITORIAL_STATUSES: readonly EditorialStatus[] = [
  "draft",
  "submitted",
  "changes_requested",
  "fact_checked",
  "approved",
  "rejected",
];

function nonEmpty(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function toArticleType(value: string | null | undefined): ArticleType {
  return ARTICLE_TYPES.find((type) => type === value) ?? "standard";
}

/**
 * Every field is optional in the CMS until CMS-02 lands, so each one is
 * defended here rather than at dozens of render sites (W2: never throw).
 */
export function mapArticleSummary(entry: StrapiArticle): ArticleSummary {
  return {
    id: entry.documentId,
    slug: entry.slug ?? "",
    title: entry.title ?? "",
    leadText: nonEmpty(entry.lead_text),
    articleType: toArticleType(entry.article_type),
    featuredImage: mapMedia(entry.featured_image),
    primaryCategory: entry.primary_category?.slug
      ? mapCategorySummary(entry.primary_category)
      : null,
    author: entry.author?.slug ? mapAuthorSummary(entry.author) : null,
    publishedAt: entry.first_published_at ?? entry.publishedAt ?? null,
  };
}

export function mapArticle(entry: StrapiArticle): Article {
  const summary = mapArticleSummary(entry);
  const reviewer = entry.reviewer?.slug
    ? mapAuthorSummary(entry.reviewer)
    : null;
  const sponsorName = nonEmpty(entry.sponsor_name);

  return {
    ...summary,
    body: resolveBodyMedia(entry.content ?? []),
    reviewer,
    // A reviewer without a recorded fact-check date is not shown publicly
    // (REQ-ART-002, REQ-SEO-035), so the date gates the reviewer.
    lastReviewedAt: reviewer ? (entry.last_reviewed_at ?? null) : null,
    categories: (entry.categories ?? [])
      .filter((category) => category.slug)
      .map(mapCategorySummary),
    tags: (entry.tags ?? [])
      .filter((tag) => tag.slug && !HIDDEN_TAG_SLUGS.has(tag.slug))
      .map(mapTagSummary),
    stocksMentioned: (entry.stocks_mentioned ?? []).map(mapStockMention),
    contentUpdatedAt: entry.content_updated_at ?? null,
    seo: mapSeo(entry.seo),
    sponsor:
      summary.articleType === "pr_article" && sponsorName
        ? {
            name: sponsorName,
            url: nonEmpty(entry.sponsor_url),
            disclosure: nonEmpty(entry.sponsor_disclosure),
          }
        : null,
    keyTakeaways: (entry.key_takeaways ?? [])
      .map((item) => nonEmpty(item.text))
      .filter((text): text is string => text !== null)
      .slice(0, 5),
    faq: (entry.faq ?? []).flatMap((item) => {
      const question = nonEmpty(item.question);
      const answer = nonEmpty(item.answer);
      return question && answer ? [{ question, answer }] : [];
    }),
    sources: (entry.sources ?? []).flatMap((item) => {
      const title = nonEmpty(item.title);
      return title
        ? [
            {
              title,
              publisher: nonEmpty(item.publisher),
              url: nonEmpty(item.url),
              accessedOn: item.accessed_on ?? null,
            },
          ]
        : [];
    }),
    corrections: (entry.corrections ?? [])
      .flatMap((item) => {
        const note = nonEmpty(item.note);
        return note ? [{ date: item.date ?? null, note }] : [];
      })
      .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")),
  };
}

/**
 * Preview-only (REQ-CMS-001). Kept out of `mapArticle` so the public Article
 * type can never carry the approval state.
 */
export function mapEditorialStatus(
  entry: StrapiArticle,
): EditorialStatus | null {
  return (
    EDITORIAL_STATUSES.find((status) => status === entry.editorial_status) ??
    null
  );
}
