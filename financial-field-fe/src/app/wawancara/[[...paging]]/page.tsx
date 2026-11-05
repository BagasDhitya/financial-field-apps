import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

import { JsonLd } from '@/components/JsonLd/JsonLd';
import { HOME_CRUMB, toSchemaCrumbs } from '@/lib/breadcrumbs';
import { getInterviewArticles } from '@/lib/content/articles';
import { env } from '@/lib/env';
import { parsePageSegments } from '@/lib/pagination';
import { routes } from '@/lib/routes';
import { absoluteUrl, buildMetadata } from '@/lib/seo/metadata';
import { buildPageGraph } from '@/lib/structured-data/registry';

import { ListingView } from '@/features/listing/ListingView';

/** Safety-net window. Keep in sync with REVALIDATE.archive (revalidate.test.ts). */
export const revalidate = 600;

/** Empty list = render each path on first request, then cache it (ISR). */
export function generateStaticParams() {
	return [];
}

type Props = { params: Promise<{ paging?: string[] }> };

const TITLE = 'Wawancara';
const DESCRIPTION =
	'Wawancara Financial Field Indonesia dengan pakar dan pelaku keuangan tentang pengelolaan uang sehari-hari.';

async function load(paging: string[] = []) {
	const parsed = parsePageSegments(paging);
	if (parsed.kind === 'invalid') {
		notFound();
	}
	const base = routes.interviews();
	if (parsed.kind === 'redirect-first') {
		permanentRedirect(base);
	}
	const page = parsed.page;
	const result = await getInterviewArticles(page);
	if (page > 1 && page > result.pageCount) {
		notFound();
	}
	return { page, base, result };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { paging } = await params;
	const { page, base } = await load(paging);
	return buildMetadata({
		title: page > 1 ? `${TITLE} – Halaman ${page}` : TITLE,
		description: DESCRIPTION,
		path: routes.paged(base, page),
	});
}

export default async function ListingPage({ params }: Props) {
	const { paging } = await params;
	const { page, base, result } = await load(paging);
	const trail = [HOME_CRUMB, { label: TITLE, href: base }];

	return (
		<>
			<JsonLd
				data={buildPageGraph({
					kind: 'collection',
					origin: env.siteUrl,
					url: absoluteUrl(routes.paged(base, page)),
					crumbs: toSchemaCrumbs(trail),
					name: TITLE,
					description: DESCRIPTION,
				})}
			/>
			<ListingView
				title={TITLE}
				kicker="Rubrik"
				description={DESCRIPTION}
				breadcrumbs={trail}
				listTitle="Semua wawancara"
				result={result}
				hrefFor={(target) => routes.paged(base, target)}
				emptyLabel="Belum ada wawancara yang terbit."
			/>
		</>
	);
}
