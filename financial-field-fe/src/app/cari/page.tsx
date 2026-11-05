import type { Metadata } from 'next';

import { SearchAnalytics } from '@/components/SearchAnalytics/SearchAnalytics';
import { searchArticles } from '@/lib/content/articles';
import { log } from '@/lib/log';
import { parsePageParam } from '@/lib/pagination';
import { isSearchable, normalizeQuery } from '@/lib/search';

import { SearchView } from '@/features/search/SearchView';

/** Search is dynamic, uncached and never indexed (REQ-SEO-007, REQ-SRCH-001). */
export const metadata: Metadata = {
	title: 'Cari artikel',
	robots: { index: false, follow: true },
};

type Props = {
	searchParams: Promise<{ q?: string | string[]; halaman?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: Props) {
	const params = await searchParams;
	const query = normalizeQuery(params.q);
	const page = parsePageParam(params.halaman);

	let result = null;
	if (isSearchable(query)) {
		try {
			result = await searchArticles(query, page);
		} catch (error) {
			// W3: never log the query itself, only its length.
			log.error(
				'app::SearchPage',
				`search failed (query length ${query.length})`,
				String(error),
			);
			throw error;
		}
	}

	return (
		<>
			<SearchView query={query} result={result} />
			{result ? <SearchAnalytics term={query} /> : null}
		</>
	);
}
