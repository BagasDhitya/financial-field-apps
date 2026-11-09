import type {
	ArticleBody,
	ArticleType,
	Correction,
	FaqItem,
	SeoFields,
	Source,
	Sponsor,
	StaticPage,
} from '@/types';

import type { MediaKey } from './media';

/**
 * One article as it is written in src/data/articles. Relations are slugs that
 * src/lib/content resolves; an unknown slug stops the build. Optional fields
 * left out mean "none".
 */
export type ArticleEntry = {
	slug: string;
	title: string;
	/** 120–220 characters, answer first (REQ-GEO-001). */
	leadText: string;
	articleType: ArticleType;
	/** Primary category slug, top-level or sub-category (src/data/categories.ts). */
	category: string;
	/** Tag slugs (src/data/tags.ts). */
	tags: string[];
	/** Author slug (src/data/authors.ts). */
	author: string;
	/** Reviewer slug. Shown only together with `lastReviewedAt` (REQ-ART-002). */
	reviewer?: string;
	/** Featured image key (src/data/media.ts); left out for no image. */
	image?: MediaKey;
	/** ISO 8601, first publication. */
	publishedAt: string;
	/** ISO 8601, last substantive update. */
	contentUpdatedAt?: string;
	/** ISO 8601, when the reviewer's fact-check was recorded. */
	lastReviewedAt?: string;
	/** Ticker symbols (src/data/tickers.ts). */
	stocks?: string[];
	seo?: Partial<SeoFields>;
	/** PR articles only (`pr_article`). */
	sponsor?: Sponsor;
	keyTakeaways?: string[];
	faq?: FaqItem[];
	sources?: Source[];
	corrections?: Correction[];
	/** Strapi Blocks, written with the helpers in src/data/blocks.ts. */
	body: ArticleBody;
};

/** A sub-category: it takes its parent from the entry it is listed under. */
export type SubCategoryEntry = {
	slug: string;
	name: string;
	description: string;
};

/** A top-level category with its sub-categories, in menu order. */
export type CategoryEntry = SubCategoryEntry & {
	children: SubCategoryEntry[];
};

export type TagEntry = {
	slug: string;
	name: string;
	description: string;
};

export type AuthorEntry = {
	slug: string;
	fullName: string;
	roleTitle: string;
	/** Public credential text such as "CFP®". */
	credentials?: string;
	avatar?: MediaKey;
	bio: string;
	/** Profile links (http or https). */
	sameAs: string[];
	expertise: string[];
};

export type StaticPageEntry = Pick<StaticPage, 'slug' | 'title' | 'group' | 'body'> & {
	/** ISO 8601. */
	updatedAt: string;
};

export type TickerEntry = {
	symbol: string;
	companyName: string;
};
