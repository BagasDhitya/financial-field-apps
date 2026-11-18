export type StrapiMedia = {
	url?: string | null;
	alternativeText?: string | null;
	caption?: string | null;
	width?: number | null;
	height?: number | null;
	mime?: string | null;
};

export type StrapiSeo = {
	meta_title?: string | null;
	meta_description?: string | null;
	focus_keyword?: string | null;
	og_image?: StrapiMedia | null;
	canonical_url?: string | null;
	no_index?: boolean | null;
};

export type StrapiCategory = {
	documentId: string;
	name?: string | null;
	slug?: string | null;
	description?: string | null;
	nav_order?: number | null;
	show_in_nav?: boolean | null;
	icon?: StrapiMedia | null;
	parent_category?: StrapiCategory | null;
	categories?: StrapiCategory[] | null;
	seo?: StrapiSeo | null;
};

export type StrapiLink = { url?: string | null; label?: string | null };

export type StrapiAuthor = {
	documentId: string;
	full_name?: string | null;
	slug?: string | null;
	role_title?: string | null;
	credentials?: string | null;
	avatar?: StrapiMedia | null;
	bio?: string | null;
	same_as?: StrapiLink[] | null;
	expertise?: unknown;
	background?: string | null;
	financial_view?: string | null;
	seo?: StrapiSeo | null;
};

export type StrapiTag = {
	documentId: string;
	name?: string | null;
	slug?: string | null;
	description?: string | null;
	seo?: StrapiSeo | null;
};

export type StrapiTicker = {
	documentId: string;
	ticker_symbol?: string | null;
	company_name?: string | null;
};

export type StrapiFaqItem = {
	question?: string | null;
	answer?: string | null;
};

export type StrapiSource = {
	title?: string | null;
	publisher?: string | null;
	url?: string | null;
	accessed_on?: string | null;
};

export type StrapiTakeaway = { text?: string | null };

export type StrapiCorrection = { date?: string | null; note?: string | null };

export type StrapiVideo = {
	title?: string | null;
	channel?: string | null;
	/** Datetime, stored in UTC. */
	uploadedAt?: string | null;
	/** ISO 8601 duration, e.g. `PT1M30S`. */
	duration?: string | null;
	caption?: string | null;
	/** `https://www.youtube.com/embed/<id>`. */
	embedUrl?: string | null;
};

/** `article.chat-bubble` (CMS-31). */
export type StrapiChatBubble = {
	speaker_name?: string | null;
	speaker_role?: string | null;
	speaker_avatar?: StrapiMedia | null;
	message?: string | null;
	position?: string | null;
};

export type StrapiArticle = {
	documentId: string;
	title?: string | null;
	slug?: string | null;
	lead_text?: string | null;
	content?: readonly Record<string, unknown>[] | null;
	article_type?: string | null;
	publishedAt?: string | null;
	updatedAt?: string | null;
	first_published_at?: string | null;
	content_updated_at?: string | null;
	last_reviewed_at?: string | null;
	editorial_status?: string | null;
	featured_image?: StrapiMedia | null;
	primary_category?: StrapiCategory | null;
	author?: StrapiAuthor | null;
	reviewer?: StrapiAuthor | null;
	categories?: StrapiCategory[] | null;
	tags?: StrapiTag[] | null;
	stocks_mentioned?: StrapiTicker[] | null;
	seo?: StrapiSeo | null;
	sponsor_name?: string | null;
	sponsor_url?: string | null;
	sponsor_disclosure?: string | null;
	faq?: StrapiFaqItem[] | null;
	sources?: StrapiSource[] | null;
	key_takeaways?: StrapiTakeaway[] | null;
	corrections?: StrapiCorrection[] | null;
	interview_dialogues?: StrapiChatBubble[] | null;
	video?: StrapiVideo | null;
};

export type StrapiMenuItem = {
	label?: string | null;
	url?: string | null;
	category_ref?: StrapiCategory[] | null;
};

export type StrapiNavigation = {
	menu_item?: StrapiMenuItem[] | null;
	featured_articles?: StrapiArticle[] | null;
};

export type StrapiStaticPage = {
	documentId: string;
	title?: string | null;
	slug?: string | null;
	group?: string | null;
	body?: readonly Record<string, unknown>[] | null;
	seo?: StrapiSeo | null;
	updatedAt?: string | null;
};

export type StrapiSiteSettings = {
	site_name?: string | null;
	tagline?: string | null;
	description?: string | null;
	logo?: StrapiMedia | null;
	default_og_image?: StrapiMedia | null;
	social_links?: { platform?: string | null; url?: string | null }[] | null;
	contact_email?: string | null;
	default_pr_disclosure?: string | null;
};

/** `product-specs.loan` (planned CMS-26). */
export type StrapiLoanSpecs = {
	rate_type?: string | null;
	rate_min?: number | null;
	rate_max?: number | null;
	amount_min?: number | null;
	amount_max?: number | null;
	tenor_min?: number | null;
	tenor_max?: number | null;
	down_payment_min?: number | null;
	max_financing?: number | null;
	fees?: string | null;
};

/** api::provider.provider (ADR-0011), plus the planned CMS-24 fields. */
export type StrapiProvider = {
	documentId: string;
	name?: string | null;
	slug?: string | null;
	logo?: StrapiMedia | null;
	legal_name?: string | null;
	regulator?: string | null;
	license_number?: string | null;
	website_url?: string | null;
	description?: string | null;
	financial_products?: StrapiFinancialProduct[] | null;
};

/** api::product-category.product-category, plus the planned CMS-23 and CMS-28 fields. */
export type StrapiProductCategory = {
	documentId: string;
	name?: string | null;
	slug?: string | null;
	description?: string | null;
	nav_order?: number | null;
	show_in_nav?: boolean | null;
	seo?: StrapiSeo | null;
	parent?: StrapiProductCategory | null;
	children?: StrapiProductCategory[] | null;
	financial_products?: StrapiFinancialProduct[] | null;
};

/** api::financial-product.financial-product, plus the planned CMS-23, 25 and 26 fields. */
export type StrapiFinancialProduct = {
	documentId: string;
	title?: string | null;
	slug?: string | null;
	min_income?: number | null;
	annual_fee?: string | null;
	features?: Record<string, unknown>[] | null;
	apply_url?: string | null;
	image?: StrapiMedia | null;
	product_category?: StrapiProductCategory | null;
	provider?: StrapiProvider | null;
	summary?: string | null;
	seo?: StrapiSeo | null;
	data_checked_at?: string | null;
	source_url?: string | null;
	is_partner?: boolean | null;
	loan_specs?: StrapiLoanSpecs | null;
	updatedAt?: string | null;
};
