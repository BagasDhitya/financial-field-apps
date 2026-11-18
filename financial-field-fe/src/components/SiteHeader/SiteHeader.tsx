import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { MainMenuEntry } from '@/types';

import { Container } from '../Container/Container';
import { Icon } from '../Icon/Icon';
import { MainNav } from '../MainNav/MainNav';
import { MobileNav } from '../MobileNav/MobileNav';
import { Wordmark } from '../Wordmark/Wordmark';

import styles from './SiteHeader.module.css';

export type SiteHeaderProps = {
	/** The menu from Site Navigation (ADR-0022): Berita, Edukasi, … Tentang Kami. */
	menu: MainMenuEntry[];
};

/**
 * The brand on the first row; the menu on its own row from 1024 px (B6,
 * REQ-NAV-001, ADR-0022). Below that, a search icon and the Menu sheet. The
 * search bar at the top right was removed at the client's request
 * (2026-11-18); search itself stays at /cari.
 */
export function SiteHeader({ menu }: SiteHeaderProps) {
	return (
		<header className={styles.root}>
			<Container className={styles.bar}>
				<Wordmark />
				<div className={styles.mobile}>
					<Link href={routes.search()} className={styles.searchIcon}>
						<Icon name="search" title="Cari" />
					</Link>
					<MobileNav entries={menu} />
				</div>
			</Container>
			<div className={styles.navRow}>
				<Container>
					<nav aria-label="Utama">
						<MainNav entries={menu} />
					</nav>
				</Container>
			</div>
		</header>
	);
}
