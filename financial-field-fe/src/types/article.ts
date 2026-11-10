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

/** A video an article carries (CMS-30). Only YouTube, by its 11-character id. */
export type VideoRef = {
	provider: 'youtube';
	id: string;
};

/** The video at the top of an article, with the credit taken from YouTube. */
export type ArticleVideo = VideoRef & {
	title: string;
	channelName: string | null;
	uploadedAt: string | null;
	durationSeconds: number | null;
	caption: string | null;
};

/** Card-sized article. What listings, rails, and related blocks consume. */
export type ArticleSummary = {
	id: string;
	slug: string;
	title: string;
	leadText: string | null;
	articleType: ArticleType;
	featuredImage: MediaAsset | null;
	/** Set when the article has a video (CMS-30): cards show a play mark. */
	video: VideoRef | null;
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
export type Article = Omit<ArticleSummary, 'video'> & {
	/** Shown in place of the featured image (CMS-30); null = none or not a YouTube link. */
	video: ArticleVideo | null;
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
