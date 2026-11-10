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
	url?: string | null;
	title?: string | null;
	channel_name?: string | null;
	uploaded_at?: string | null;
	duration_seconds?: number | null;
	caption?: string | null;
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
	featured_video?: StrapiVideo | null;
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
