import type { CapabilitySet } from '../capabilities';
import { cmsCapabilities } from '../capabilities';

const SEO_POPULATE = { populate: { og_image: true } } as const;

const CATEGORY_WITH_PARENT = {
	populate: { parent_category: { fields: ['slug', 'name'] } },
} as const;

/** Relations and media a card needs, on every CMS. Kept minimal: listings fetch many. */
const ARTICLE_SUMMARY_POPULATE = {
	featured_image: true,
	primary_category: CATEGORY_WITH_PARENT,
	author: { populate: { avatar: true } },
} as const;

const SUMMARY_BASE_FIELDS = ['title', 'slug', 'lead_text', 'article_type', 'publishedAt'] as const;

/** Card fields. Never includes `content`, which would drag the body into lists. */
export function articleSummaryFields(caps: CapabilitySet = cmsCapabilities): string[] {
	return caps.has('dates')
		? [...SUMMARY_BASE_FIELDS, 'first_published_at']
		: [...SUMMARY_BASE_FIELDS];
}

/** Newest first, by first publication when the CMS has it (CMS-09). */
export function articleSort(caps: CapabilitySet = cmsCapabilities): string[] {
	return caps.has('dates')
		? ['first_published_at:desc', 'publishedAt:desc']
		: ['publishedAt:desc'];
}

/**
 * Card relations and media, plus the video's link once the CMS has videos
 * (CMS-30): a card needs to know only that there is one, and which.
 */
export function articleSummaryPopulate(caps: CapabilitySet = cmsCapabilities) {
	return {
		...ARTICLE_SUMMARY_POPULATE,
		...(caps.has('video') ? { featured_video: { fields: ['url'] } } : {}),
	};
}

/** Query fragment for card-sized articles. */
export function articleSummaryQuery(caps: CapabilitySet = cmsCapabilities) {
	return {
		fields: articleSummaryFields(caps),
		populate: articleSummaryPopulate(caps),
	};
}

/**
 * Only articles with a video (CMS-30). The component is filtered on its
 * required `url`, as Strapi filters a component's fields.
 */
export const WITH_VIDEO_FILTER = { featured_video: { url: { $notNull: true } } } as const;

/**
 * Everything the article detail route renders. No `fields` list, so scalar
 * fields (sponsor_*, dates) arrive automatically once they exist; only
 * components and relations need a gated populate key.
 */
export function articleDetailPopulate(caps: CapabilitySet = cmsCapabilities) {
	return {
		...ARTICLE_SUMMARY_POPULATE,
		reviewer: { populate: { avatar: true } },
		categories: CATEGORY_WITH_PARENT,
		tags: true,
		stocks_mentioned: true,
		...(caps.has('seo') ? { seo: SEO_POPULATE } : {}),
		...(caps.has('faq') ? { faq: true } : {}),
		...(caps.has('sources') ? { sources: true } : {}),
		...(caps.has('takeaways') ? { key_takeaways: true } : {}),
		...(caps.has('corrections') ? { corrections: true } : {}),
		...(caps.has('video') ? { featured_video: true } : {}),
	};
}

/**
 * The `seo` populate entry when the seo capability is on, otherwise nothing
 * (strictParams rejects unknown keys).
 */
export function seoPopulate(caps: CapabilitySet = cmsCapabilities) {
	return caps.has('seo') ? { seo: SEO_POPULATE } : {};
}
