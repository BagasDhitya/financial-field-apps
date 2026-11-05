import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { JsonLd } from '@/components/JsonLd/JsonLd';
import { categoryTrail, toSchemaCrumbs } from '@/lib/breadcrumbs';
import { getArticlesInCategories } from '@/lib/content/articles';
import { getCategoryBySlug } from '@/lib/content/categories';
import { env } from '@/lib/env';
import { parsePageSegments } from '@/lib/pagination';
import { routes } from '@/lib/routes';
import { isValidSlug } from '@/lib/security';
import { absoluteUrl, buildMetadata, composeDescription } from '@/lib/seo/metadata';
import { buildPageGraph } from '@/lib/structured-data/registry';

import { ListingView } from '@/features/listing/ListingView';

/** Safety-net window. Keep in sync with REVALIDATE.categoryListing (revalidate.test.ts). */
export const revalidate = 120;

/** Empty list = render each path on first request, then cache it (ISR). */
export function generateStaticParams() {
	return [];
}

type Props = { params: Promise<{ segments: string[] }> };

/**
 * /kategori/<slug>[/<sub>][/halaman/<n>] (ADR-0004). Wrong parent paths and
 * /halaman/1 are redirected to the canonical URL.
 */
async function load(segments: string[]) {
	const pagingAt = segments.indexOf('halaman');
	const path = pagingAt === -1 ? segments : segments.slice(0, pagingAt);
	const paging = parsePageSegments(pagingAt === -1 ? [] : segments.slice(pagingAt));
	if (
		path.length < 1 ||
		path.length > 2 ||
		!path.every(isValidSlug) ||
		paging.kind === 'invalid'
	) {
		notFound();
	}

	const category = await getCategoryBySlug(path[path.length - 1] ?? '');
	if (!category) {
		notFound();
	}

	const base = routes.category(category);
	const page = paging.kind === 'page' ? paging.page : 1;
	if (base !== `/kategori/${path.join('/')}` || paging.kind === 'redirect-first') {
		permanentRedirect(routes.paged(base, page));
	}

	const result = await getArticlesInCategories(
		[category.slug, ...category.children.map((child) => child.slug)],
		page,
	);
	if (page > 1 && page > result.pageCount) {
		notFound();
	}
	return { category, page, base, result };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { segments } = await params;
	const { category, page, base } = await load(segments);
	const suffix = page > 1 ? ` – Halaman ${page}` : '';
	return buildMetadata({
		title: `${category.name}: Artikel & Panduan${suffix}`,
		description: composeDescription(
			category.description,
			`Kumpulan artikel dan panduan ${category.name} terbaru dari Financial Field Indonesia, ditulis untuk pembaca di Indonesia.`,
		),
		path: routes.paged(base, page),
		seo: page > 1 ? null : category.seo,
	});
}

export default async function CategoryPage({ params }: Props) {
	const { segments } = await params;
	const { category, page, base, result } = await load(segments);
	const trail = categoryTrail(category);

	return (
		<>
			<JsonLd
				data={buildPageGraph({
					kind: 'collection',
					origin: env.siteUrl,
					url: absoluteUrl(routes.paged(base, page)),
					crumbs: toSchemaCrumbs(trail),
					name: category.name,
					description: category.description,
				})}
			/>
			<ListingView
				title={category.name}
				kicker={category.parent ? category.parent.name : 'Topik'}
				description={category.description}
				breadcrumbs={trail}
				chips={category.children.map((child) => ({
					label: child.name,
					href: routes.category(child),
				}))}
				listTitle={`Artikel di ${category.name}`}
				result={result}
				hrefFor={(target) => routes.paged(base, target)}
				emptyLabel={`Belum ada artikel di ${category.name}.`}
			/>
		</>
	);
}
