import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { CategoryNode } from '@/types';

import { Container } from '../Container/Container';
import { Icon } from '../Icon/Icon';
import { MobileNav } from '../MobileNav/MobileNav';
import { SearchField } from '../SearchField/SearchField';
import { TopicPanel } from '../TopicPanel/TopicPanel';
import { Wordmark } from '../Wordmark/Wordmark';

import styles from './SiteHeader.module.css';

export type SiteHeaderProps = {
	categories: CategoryNode[];
	/** The single top-level article entry; label pending OQ-07. */
	articleLabel?: string;
};

/** Brand, one "Artikel" panel, Tentang Kami, search (B6, REQ-NAV-001). */
export function SiteHeader({ categories, articleLabel = 'Artikel' }: SiteHeaderProps) {
	return (
		<header className={styles.root}>
			<Container className={styles.bar}>
				<Wordmark />
				<nav aria-label="Utama" className={styles.nav}>
					<TopicPanel label={articleLabel} categories={categories} />
					<Link href={routes.about()} className={styles.link}>
						Tentang Kami
					</Link>
				</nav>
				<div className={styles.search}>
					<SearchField />
				</div>
				<div className={styles.mobile}>
					<Link href={routes.search()} className={styles.searchIcon}>
						<Icon name="search" title="Cari" />
					</Link>
					<MobileNav label={articleLabel} categories={categories} />
				</div>
			</Container>
		</header>
	);
}
