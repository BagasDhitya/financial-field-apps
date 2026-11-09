import type { Tag, TagSummary } from '@/types';

import type { StrapiTag } from '../strapi-types';

import { mapSeo } from './seo';

/** Slugs of the populated tags, skipping any without a slug. */
export function mapTagSlugs(
	tags: readonly { slug?: string | null }[] | null | undefined,
): string[] {
	return (tags ?? []).flatMap((tag) => (tag.slug ? [tag.slug] : []));
}

/** Tag name and slug for chips and lists. */
export function mapTagSummary(entry: StrapiTag): TagSummary {
	return {
		id: entry.documentId,
		slug: entry.slug ?? '',
		name: entry.name ?? '',
	};
}

/** Tag page data. Description and seo arrive with CMS-19 and CMS-01. */
export function mapTag(entry: StrapiTag): Tag {
	return {
		...mapTagSummary(entry),
		description: entry.description ?? null,
		seo: mapSeo(entry.seo),
	};
}
