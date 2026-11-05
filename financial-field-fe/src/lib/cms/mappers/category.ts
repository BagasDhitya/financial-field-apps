import type { Category, CategoryNode, CategorySummary } from '@/types';

import type { StrapiCategory } from '../strapi-types';

import { mapMedia } from './media';
import { mapSeo } from './seo';

/**
 * Category with its parent's slug and name: enough to build its URL with
 * routes.category.
 */
export function mapCategorySummary(entry: StrapiCategory): CategorySummary {
	return {
		id: entry.documentId,
		slug: entry.slug ?? '',
		name: entry.name ?? '',
		parentSlug: entry.parent_category?.slug ?? null,
		parentName: entry.parent_category?.name ?? null,
	};
}

/**
 * Category page data. Children without a slug are dropped; the rest get this
 * category as their parent.
 */
export function mapCategory(entry: StrapiCategory): Category {
	const summary = mapCategorySummary(entry);
	return {
		...summary,
		description: entry.description ?? null,
		icon: mapMedia(entry.icon),
		parent: entry.parent_category ? mapCategorySummary(entry.parent_category) : null,
		children: (entry.categories ?? [])
			.filter((child) => child.slug)
			.map((child) => ({
				...mapCategorySummary(child),
				parentSlug: summary.slug,
				parentName: summary.name,
			})),
		seo: mapSeo(entry.seo),
	};
}

/**
 * Builds the two-level topic tree from a flat category list. Top level =
 * entries without a parent, ordered by `nav_order` then name. Entries marked
 * `show_in_nav: false` are left out (CMS-12).
 */
export function buildCategoryTree(entries: StrapiCategory[]): CategoryNode[] {
	const visible = entries.filter(
		(entry) => entry.slug && entry.name && entry.show_in_nav !== false,
	);
	const byOrder = (a: StrapiCategory, b: StrapiCategory) =>
		(a.nav_order ?? Number.MAX_SAFE_INTEGER) - (b.nav_order ?? Number.MAX_SAFE_INTEGER) ||
		(a.name ?? '').localeCompare(b.name ?? '', 'id');

	return visible
		.filter((entry) => !entry.parent_category)
		.sort(byOrder)
		.map((parent) => ({
			...mapCategorySummary(parent),
			description: parent.description ?? null,
			navOrder: parent.nav_order ?? 0,
			children: visible
				.filter((child) => child.parent_category?.slug === parent.slug)
				.sort(byOrder)
				.map((child) => mapCategorySummary(child)),
		}));
}
