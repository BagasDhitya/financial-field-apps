import Link from 'next/link';
import type { ReactNode } from 'react';

import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs/Breadcrumbs';
import { Container } from '@/components/Container/Container';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { Pagination } from '@/components/Pagination/Pagination';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { routes } from '@/lib/routes';
import type { ArticleSummary, Paginated } from '@/types';

import styles from './ListingView.module.css';

export type ListingViewProps = {
	title: string;
	kicker?: string;
	description?: string | null;
	breadcrumbs: BreadcrumbItem[];
	chips?: { label: string; href: string }[];
	listTitle: string;
	result: Paginated<ArticleSummary>;
	hrefFor: (page: number) => string;
	emptyLabel: string;
	aside?: ReactNode;
};

/** Category hubs, tags, Terbaru and Wawancara (REQ-LIST-001/002/004). */
export function ListingView({
	title,
	kicker,
	description,
	breadcrumbs,
	chips = [],
	listTitle,
	result,
	hrefFor,
	emptyLabel,
	aside,
}: ListingViewProps) {
	return (
		<Container className={styles.root}>
			<Breadcrumbs items={breadcrumbs} />
			<header className={styles.header}>
				{kicker ? <p className={`type-kicker ${styles.kicker}`}>{kicker}</p> : null}
				<h1 className={styles.title}>{title}</h1>
				{description ? <p className={styles.description}>{description}</p> : null}
				{chips.length > 0 ? (
					<nav aria-label={`Subtopik ${title}`}>
						<ul className={styles.chips}>
							{chips.map((chip) => (
								<li key={chip.href}>
									<Link href={chip.href} className={styles.chip}>
										{chip.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				) : null}
				{aside}
			</header>

			<section aria-labelledby="daftar-artikel">
				<SectionHeader id="daftar-artikel" title={listTitle} />
				{result.items.length > 0 ? (
					<ul className={styles.grid}>
						{result.items.map((article, index) => (
							<li key={article.id}>
								<ArticleCard
									article={article}
									preloadImage={result.page === 1 && index === 0}
								/>
							</li>
						))}
					</ul>
				) : (
					<EmptyState
						title={emptyLabel}
						links={[
							{ label: 'Artikel terbaru', href: routes.latest() },
							{ label: 'Beranda', href: routes.home() },
						]}
					/>
				)}
				<Pagination page={result.page} pageCount={result.pageCount} hrefFor={hrefFor} />
			</section>
		</Container>
	);
}
