import type { SeoFields } from '@/types';

import type { StrapiSeo } from '../strapi-types';

import { mapMedia } from './media';

function clean(value: string | null | undefined): string | null {
	const trimmed = value?.trim();
	return trimmed ? trimmed : null;
}

/**
 * SEO component (CMS-01). Blank strings become null, so callers fall back to
 * the page's own title and lead.
 */
export function mapSeo(entry: StrapiSeo | null | undefined): SeoFields | null {
	if (!entry) {
		return null;
	}
	return {
		metaTitle: clean(entry.meta_title),
		metaDescription: clean(entry.meta_description),
		focusKeyword: clean(entry.focus_keyword),
		ogImage: mapMedia(entry.og_image),
		canonicalUrl: clean(entry.canonical_url),
		noIndex: entry.no_index === true,
	};
}
