import type { MediaAsset } from './media';
import type { SeoFields } from './seo';

export type CategorySummary = {
	id: string;
	slug: string;
	name: string;
	/** Present when the category is a sub-category; builds /kategori/<parent>/<slug>. */
	parentSlug: string | null;
	parentName: string | null;
};

export type Category = CategorySummary & {
	description: string | null;
	icon: MediaAsset | null;
	parent: CategorySummary | null;
	children: CategorySummary[];
	seo: SeoFields | null;
};

/** A top-level entry of the topic panel, with its sub-categories. */
export type CategoryNode = CategorySummary & {
	description: string | null;
	navOrder: number;
	children: CategorySummary[];
};
