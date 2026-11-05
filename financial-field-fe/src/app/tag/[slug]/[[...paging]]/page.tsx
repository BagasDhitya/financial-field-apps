import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { JsonLd } from '@/components/JsonLd/JsonLd';
import { HOME_CRUMB, toSchemaCrumbs } from '@/lib/breadcrumbs';
import { getArticlesByTag } from '@/lib/content/articles';
import { getTagBySlug, isIndexableTag } from '@/lib/content/tags';
import { env } from '@/lib/env';
import { parsePageSegments } from '@/lib/pagination';
import { routes } from '@/lib/routes';
import { isValidSlug } from '@/lib/security';
import { absoluteUrl, buildMetadata, composeDescription } from '@/lib/seo/metadata';
import { buildPageGraph } from '@/lib/structured-data/registry';

import { ListingView } from '@/features/listing/ListingView';

/** Safety-net window. Keep in sync with REVALIDATE.archive (revalidate.test.ts). */
export const revalidate = 600;

/** Empty list = render each path on first request, then cache it (ISR). */
export function generateStaticParams() {
	return [];
}

type Props = { params: Promise<{ slug: string; paging?: string[] }> };

async function load(slug: string, paging: string[] = []) {
	const parsed = parsePageSegments(paging);
	if (!isValidSlug(slug) || parsed.kind === 'invalid') {
		notFound();
	}
	const base = routes.tag(slug);
	if (parsed.kind === 'redirect-first') {
		permanentRedirect(base);
	}
	const tag = await getTagBySlug(slug);
	if (!tag) {
		notFound();
	}
	const page = parsed.page;
	const result = await getArticlesByTag(slug, page);
	if (page > 1 && page > result.pageCount) {
		notFound();
	}
	return { tag, page, base, result };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug, paging } = await params;
	const { tag, page, base, result } = await load(slug, paging);
	return buildMetadata({
		title: page > 1 ? `${tag.name} – Halaman ${page}` : tag.name,
		description: composeDescription(
			tag.description,
			`Kumpulan artikel Financial Field Indonesia tentang ${tag.name}, dari yang paling baru terbit.`,
		),
		path: routes.paged(base, page),
		seo: page > 1 ? null : tag.seo,
		// REQ-SEO-008: thin tag pages stay out of the index.
		noIndex: !isIndexableTag(result.total),
	});
}

export default async function TagPage({ params }: Props) {
	const { slug, paging } = await params;
	const { tag, page, base, result } = await load(slug, paging);
	const trail = [HOME_CRUMB, { label: tag.name, href: base }];

	return (
		<>
			<JsonLd
				data={buildPageGraph({
					kind: 'collection',
					origin: env.siteUrl,
					url: absoluteUrl(routes.paged(base, page)),
					crumbs: toSchemaCrumbs(trail),
					name: tag.name,
					description: tag.description,
				})}
			/>
			<ListingView
				title={tag.name}
				kicker="Topik"
				description={tag.description}
				breadcrumbs={trail}
				listTitle={`Artikel tentang ${tag.name}`}
				result={result}
				hrefFor={(target) => routes.paged(base, target)}
				emptyLabel={`Belum ada artikel tentang ${tag.name}.`}
			/>
		</>
	);
}
