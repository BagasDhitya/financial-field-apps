import type { AuthorSummary } from './author';
import type { CategorySummary } from './category';
import type { MediaAsset } from './media';
import type { SeoFields } from './seo';
import type { TagSummary } from './tag';
import type { StockMention } from './ticker';

export type ArticleType = 'standard' | 'pr_article' | 'interview' | 'column';

/**
 * Strapi Blocks JSON. The structure is owned by the renderer, not by this
 * layer, so it stays opaque here. src/lib/blocks.ts is the only place allowed
 * to narrow it.
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
	/** First publication (CMS-09 `first_published_at`, else Strapi `publishedAt`). */
	publishedAt: string | null;
};

export type Sponsor = {
	name: string;
	url: string | null;
	disclosure: string | null;
};

export type FaqItem = { question: string; answer: string };

export type Source = {
	title: string;
	publisher: string | null;
	url: string | null;
	accessedOn: string | null;
};

export type Correction = { date: string | null; note: string };

/** Full article. Only the detail route needs this. */
export type Article = ArticleSummary & {
	body: ArticleBody;
	reviewer: AuthorSummary | null;
	categories: CategorySummary[];
	tags: TagSummary[];
	stocksMentioned: StockMention[];
	/** Last substantive update (CMS-09 `content_updated_at`); null when never updated. */
	contentUpdatedAt: string | null;
	/** When the CFP fact-check was recorded (CMS-05/09); null = not fact-checked. */
	lastReviewedAt: string | null;
	seo: SeoFields | null;
	sponsor: Sponsor | null;
	keyTakeaways: string[];
	faq: FaqItem[];
	sources: Source[];
	corrections: Correction[];
};

/** Approval states (ADR-0003). Only the preview banner ever shows these. */
export type EditorialStatus =
	'draft' | 'submitted' | 'changes_requested' | 'fact_checked' | 'approved' | 'rejected';
