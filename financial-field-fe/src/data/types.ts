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
 * `article.video` component (CMS-30, built by the CMS developer as Article
 * `video`): a YouTube video shown at the top of the article. Everything but
 * `embedUrl` is copied from the video's YouTube page, so the credit and the
 * structured data match what readers see there.
 */
export type VideoEntry = {
	/** The title as published on YouTube; the article title is the fallback. */
	title: string;
	/** The channel that published it: the credit line. */
	channel: string;
	/** ISO 8601 in UTC, YouTube's publish time; shown in WIB. */
	uploadedAt: string;
	/** ISO 8601 duration, e.g. `PT10M26S`. */
	duration: string;
	/** One or two sentences from the editor: what the video shows and why it is here. */
	caption: string;
	/** The embed link, `https://www.youtube.com/embed/<id>`. */
	embedUrl: string;
};

/**
 * `article.chat-bubble` component (CMS-31, in the CMS as `interview_dialogues`):
 * one turn of an interview. `position` puts the bubble on the left (the
 * interviewer, by convention) or the right (the guest).
 */
export type ChatBubbleEntry = {
	speaker_name: string;
	/** A job or role shown next to the name, e.g. "Perencana keuangan". */
	speaker_role?: string;
	speaker_avatar?: MediaKey;
	/** Plain text; a blank line starts a new paragraph. */
	message: string;
	position: 'left' | 'right';
};

/** An Article (api::article.article). */
export type ArticleEntry = {
	slug: string;
	title: string;
	/** 120–220 characters, answer first (REQ-GEO-001). */
	lead_text: string;
	article_type: 'standard' | 'pr_article' | 'interview' | 'column';
	featured_image?: MediaKey;
	/** CMS-30 (`video`). Shown in place of the featured image at the top of the article. */
	video?: VideoEntry;
	/** CMS-31. An interview's turns, shown as speech bubbles after the body. */
	interview_dialogues?: ChatBubbleEntry[];
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
	/** Planned CMS-11 (ADR-0022): education and career, for the reviewer page. Blank lines split paragraphs. */
	background?: string;
	/** Planned CMS-11 (ADR-0022): how the reviewer thinks about money. Blank lines split paragraphs. */
	financial_view?: string;
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
	group: 'tentang-kami' | 'legal' | 'referensi';
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

/** `product-specs.loan` (planned CMS-26, shape pending OQ-35): a loan's published terms. */
export type LoanSpecsEntry = {
	rate_type: 'flat' | 'efektif';
	/** Percent per year, as advertised; the lowest and highest. */
	rate_min: number;
	rate_max: number;
	/** Rupiah. */
	amount_min: number;
	amount_max: number;
	/** Months. */
	tenor_min: number;
	tenor_max: number;
	/** Car loans: the lowest down payment, in percent of the price. */
	down_payment_min?: number;
	/** Collateral loans: the highest loan, in percent of the vehicle's appraised value. */
	max_financing?: number;
	/** Other costs as the provider words them, e.g. "Provisi 1%, administrasi Rp 500.000". */
	fees?: string;
};

/** A Provider (api::provider.provider). */
export type ProviderEntry = {
	slug: string;
	name: string;
	logo?: MediaKey;
	/** Planned CMS-24. */
	legal_name: string;
	regulator: 'ojk' | 'bi' | 'lainnya';
	license_number: string;
	website_url: string;
	description: string;
};

/** A Product Category (api::product-category.product-category): one comparison section. */
export type ProductCategoryEntry = {
	slug: string;
	name: string;
	/** Planned CMS-23. */
	description: string;
	/** Planned CMS-28: the group it sits under, e.g. "pinjaman". */
	parent?: string;
	show_in_nav?: boolean;
	seo?: SeoEntry;
};

/** A Financial Product (api::financial-product.financial-product). */
export type FinancialProductEntry = {
	slug: string;
	title: string;
	/** Product category slug. */
	product_category: string;
	/** Provider slug. */
	provider: string;
	/** Monthly net income in Rupiah (OQ-36 asks the CMS developer to confirm the unit). */
	min_income?: number;
	/** Shown as written; loans usually have none. */
	annual_fee?: string;
	features: BlocksEntry;
	/** The product's own page at the provider (shown as "Kunjungi situs resmi"). */
	apply_url: string;
	image?: MediaKey;
	/** Planned CMS-23. */
	summary: string;
	/** Planned CMS-25: when the numbers were last checked against `source_url`. */
	data_checked_at: string;
	source_url: string;
	is_partner?: boolean;
	/** Planned CMS-26. */
	loan_specs?: LoanSpecsEntry;
	seo?: SeoEntry;
};
