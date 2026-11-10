import type { MediaKey } from './media';

/**
 * Entry types for the hardcoded content. Every field is named after its Strapi
 * attribute (financial-field-cms schema, plus the planned CMS-nn fields in
 * SPC-content-model), so the local API in src/lib/cms/local answers exactly
 * like the CMS. Relations are slugs and images are MEDIA keys; the local API
 * resolves both. An optional field left out means "none".
 */

/** Strapi Blocks, written with the helpers in src/data/blocks.ts. */
export type BlocksEntry = readonly Record<string, unknown>[];

/** The fields of a Strapi upload file the frontend reads. */
export type MediaEntry = {
	name: string;
	/** A path under public/ (same origin) or an absolute URL. */
	url: string;
	alternativeText: string | null;
	width: number;
	height: number;
	mime: string;
};

/** `shared.seo` component (planned CMS-01). */
export type SeoEntry = {
	meta_title?: string;
	meta_description?: string;
	focus_keyword?: string;
	og_image?: MediaKey;
	canonical_url?: string;
	no_index?: boolean;
};

/**
 * `article.video` component (planned CMS-30): a YouTube video shown at the top
 * of the article. Everything but `url` is copied from the video's YouTube page,
 * so the credit and the structured data match what readers see there.
 */
export type VideoEntry = {
	/** The watch link, `https://www.youtube.com/watch?v=<id>`. */
	url: string;
	/** The title as published on YouTube. */
	title: string;
	/** The channel that published it: the credit line. */
	channel_name: string;
	/** ISO 8601, YouTube's publish time. */
	uploaded_at: string;
	duration_seconds: number;
	/** One or two sentences from the editor: what the video shows and why it is here. */
	caption: string;
};

/** An Article (api::article.article). */
export type ArticleEntry = {
	slug: string;
	title: string;
	/** 120–220 characters, answer first (REQ-GEO-001). */
	lead_text: string;
	article_type: 'standard' | 'pr_article' | 'interview' | 'column';
	featured_image?: MediaKey;
	/** Planned CMS-30. Shown in place of the featured image at the top of the article. */
	featured_video?: VideoEntry;
	/** Category slug, top-level or sub-category. */
	primary_category: string;
	/** Category slugs; left out means `[primary_category]`. */
	categories?: string[];
	/** Writer profile slug. */
	author: string;
	/** Writer profile slug. Shown only together with `last_reviewed_at` (REQ-ART-002). */
	reviewer?: string;
	/** Tag slugs. */
	tags: string[];
	/** Ticker symbols (src/data/stock-tickers.ts). */
	stocks_mentioned?: string[];
	/** ISO 8601, first publication (planned CMS-09). Also the entry's `publishedAt`. */
	first_published_at: string;
	/** ISO 8601, last substantive update (planned CMS-09). */
	content_updated_at?: string;
	/** ISO 8601, when the reviewer's fact-check was recorded (planned CMS-09). */
	last_reviewed_at?: string;
	/** PR articles only (planned CMS-06). */
	sponsor_name?: string;
	sponsor_url?: string;
	sponsor_disclosure?: string;
	seo?: SeoEntry;
	/** Planned CMS-10. */
	key_takeaways?: { text: string }[];
	/** Planned CMS-07. */
	faq?: { question: string; answer: string }[];
	/** Planned CMS-08. */
	sources?: { title: string; publisher: string; url: string; accessed_on: string }[];
	/** Planned CMS-10. */
	corrections?: { date: string; note: string }[];
	content: BlocksEntry;
};

/** A Category (api::category.category). The file order is the menu order. */
export type CategoryEntry = {
	slug: string;
	name: string;
	/** Planned CMS-12. */
	description: string;
	/** Parent slug for a sub-category. */
	parent_category?: string;
	/** Planned CMS-12; left out means shown. */
	show_in_nav?: boolean;
	icon?: MediaKey;
	seo?: SeoEntry;
};

/** A Tag (api::tag.tag). */
export type TagEntry = {
	slug: string;
	name: string;
	/** Planned CMS-19. */
	description: string;
	seo?: SeoEntry;
};

/** A Writer Profile (api::writer-profile.writer-profile). */
export type WriterProfileEntry = {
	slug: string;
	full_name: string;
	role_title: string;
	avatar?: MediaKey;
	bio: string;
	/** Public credential text such as "CFP®" (planned CMS-11). */
	credentials?: string;
	/** Profile links (planned CMS-11). */
	same_as: { url: string; label: string }[];
	/** Planned CMS-11. */
	expertise: string[];
	seo?: SeoEntry;
};

/** A Stock Ticker (api::stock-ticker.stock-ticker). */
export type StockTickerEntry = {
	ticker_symbol: string;
	company_name: string;
};

/** A Static Page (planned CMS-13). */
export type StaticPageEntry = {
	slug: string;
	title: string;
	group: 'tentang-kami' | 'legal';
	body: BlocksEntry;
	/** ISO 8601; the entry's `updatedAt`. */
	updatedAt: string;
	seo?: SeoEntry;
};

/** The Site Setting single type (planned CMS-14). */
export type SiteSettingEntry = {
	tagline: string;
	description: string;
	contact_email: string;
	default_pr_disclosure: string;
	social_links: { platform: string; url: string }[];
	logo?: MediaKey;
	default_og_image?: MediaKey;
};

/** The Site Navigation single type (api::site-navigation.site-navigation). */
export type SiteNavigationEntry = {
	/** `navigation.menu-item`: `category_ref` holds category slugs. */
	menu_item: { label: string; url?: string; category_ref?: string[] }[];
	/** Article slugs, lead first. */
	featured_articles: string[];
};
