import type { Category, CategoryNode } from '@/types';

import { categories, categoryTree, findCategory } from './store';

/** The topic tree for the "Artikel" panel and the footer (REQ-NAV-002). */
export async function getCategoryTree(): Promise<CategoryNode[]> {
	return categoryTree;
}

/** Category by slug with its parent and children, or null. */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
	return findCategory(slug) ?? null;
}

/** Every category slug with its parent, for the sitemap. */
export async function getAllCategoryPaths(): Promise<
	{ slug: string; parentSlug: string | null }[]
> {
	return categories.map((category) => ({
		slug: category.slug,
		parentSlug: category.parentSlug,
	}));
}
