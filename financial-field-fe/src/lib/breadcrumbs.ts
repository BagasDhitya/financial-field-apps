import { routes } from '@/lib/routes';
import { absoluteUrl } from '@/lib/seo/metadata';
import type { Crumb } from '@/lib/structured-data/breadcrumb';
import type { CategorySummary } from '@/types';

export type Trail = { label: string; href: string }[];

/** First crumb of every trail (REQ-SEO-004). */
export const HOME_CRUMB = { label: 'Beranda', href: routes.home() };

/** Beranda › <parent> › <category> (REQ-SEO-004). */
export function categoryTrail(category: CategorySummary | null): Trail {
	if (!category) {
		return [HOME_CRUMB];
	}
	const trail: Trail = [HOME_CRUMB];
	if (category.parentSlug && category.parentName) {
		trail.push({
			label: category.parentName,
			href: routes.category({ slug: category.parentSlug }),
		});
	}
	trail.push({ label: category.name, href: routes.category(category) });
	return trail;
}

/** Same trail for JSON-LD, with absolute URLs (REQ-SEO-032). */
export function toSchemaCrumbs(trail: Trail, origin?: string): Crumb[] {
	return trail.map((item) => ({
		name: item.label,
		url: absoluteUrl(item.href, origin),
	}));
}
