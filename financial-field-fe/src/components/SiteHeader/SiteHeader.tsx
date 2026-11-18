import type { MainMenuEntry } from '@/types';

import { Container } from '../Container/Container';
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
 * REQ-NAV-001, ADR-0022). Below that, the Menu sheet. The header has no
 * search at any width: the desktop bar (2026-11-18) and the mobile icon
 * (2026-11-19) were removed at the client's request; /cari stays.
 */
export function SiteHeader({ menu }: SiteHeaderProps) {
	return (
		<header className={styles.root}>
			<Container className={styles.bar}>
				<Wordmark />
				<div className={styles.mobile}>
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
