import type { AuthorSummary } from "./author";
import type { CategorySummary } from "./category";
import type { MediaAsset } from "./media";
import type { TagSummary } from "./tag";
import type { StockMention } from "./ticker";

export type ArticleType = "standard" | "pr_article" | "interview" | "column";

/**
 * Strapi Blocks JSON. The structure is owned by the renderer, not by this
 * layer, so it stays opaque here. src/components/ArticleBody is the only
 * place allowed to narrow it.
 */
export type ArticleBody = readonly Record<string, unknown>[];

/** Card-sized article. What listings, rails, and related blocks consume. */
export type ArticleSummary = {
  id: string;
  slug: string;
  title: string;
  leadText: string | null;
  articleType: ArticleType;
  featuredImage: MediaAsset | null;
  primaryCategory: CategorySummary | null;
  author: AuthorSummary | null;
  publishedAt: string | null;
};

/** Full article. Only the detail route needs this. */
export type Article = ArticleSummary & {
  body: ArticleBody;
  reviewer: AuthorSummary | null;
  categories: CategorySummary[];
  tags: TagSummary[];
  stocksMentioned: StockMention[];
  updatedAt: string | null;
};
