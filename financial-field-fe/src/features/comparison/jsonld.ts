import { toSchemaCrumbs, type Trail } from '@/lib/breadcrumbs';
import { env } from '@/lib/env';
import { absoluteUrl } from '@/lib/seo/metadata';
import { buildPageGraph } from '@/lib/structured-data/registry';

/**
 * WebPage + BreadcrumbList for a comparison page. Product and list markup
 * (`FinancialProduct`, `ItemList`) waits for the search gallery re-check
 * (PRP-0002.p3 T03, T30); ratings, reviews and offers are never emitted
 * (REQ-SEO-051).
 */
export function comparisonGraph(path: string, trail: Trail, name: string, description?: string) {
	return buildPageGraph({
		kind: 'info',
		type: 'WebPage',
		origin: env.siteUrl,
		url: absoluteUrl(path),
		crumbs: toSchemaCrumbs(trail),
		name,
		description,
	});
}
