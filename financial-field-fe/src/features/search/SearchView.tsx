import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { Container } from '@/components/Container/Container';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { Pagination } from '@/components/Pagination/Pagination';
import { SearchField } from '@/components/SearchField/SearchField';
import { formatNumber } from '@/lib/format';
import { routes } from '@/lib/routes';
import type { ArticleSummary, Paginated } from '@/types';

import styles from './SearchView.module.css';

export type SearchViewProps = {
	query: string;
	result: Paginated<ArticleSummary> | null;
};

/** /cari: plain form, results, polite live count (REQ-SRCH-001, REQ-A11Y-012). */
export function SearchView({ query, result }: SearchViewProps) {
	return (
		<Container className={styles.root}>
			<h1 className={styles.title}>Cari artikel</h1>
			<div className={styles.form}>
				<SearchField variant="full" defaultValue={query} id="cari-halaman" />
			</div>
			<p className={styles.status} aria-live="polite">
				{result
					? `${formatNumber(result.total)} hasil untuk “${query}”`
					: query
						? 'Masukkan minimal 2 karakter.'
						: ''}
			</p>
			{result && result.items.length > 0 ? (
				<>
					<ul className={styles.grid}>
						{result.items.map((article) => (
							<li key={article.id}>
								<ArticleCard article={article} />
							</li>
						))}
					</ul>
					<Pagination
						page={result.page}
						pageCount={result.pageCount}
						hrefFor={(page) => routes.searchPage(query, page)}
					/>
				</>
			) : null}
			{result && result.items.length === 0 ? (
				<EmptyState
					title="Tidak ada artikel yang cocok."
					links={[
						{ label: 'Artikel terbaru', href: routes.latest() },
						{ label: 'Beranda', href: routes.home() },
					]}
				/>
			) : null}
		</Container>
	);
}
