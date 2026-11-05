'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { analytics } from '@/lib/analytics/events';
import { routes, TRUST_PAGES } from '@/lib/routes';
import type { CategoryNode } from '@/types';

import { Icon } from '../Icon/Icon';
import { SearchField } from '../SearchField/SearchField';

import styles from './MobileNav.module.css';

export type MobileNavProps = {
	label: string;
	categories: CategoryNode[];
};

/**
 * Below 1024 px (REQ-NAV-004): a native modal <dialog> gives focus trapping,
 * Esc to close and an inert background. Topics are an exclusive accordion.
 */
export function MobileNav({ label, categories }: MobileNavProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const pathname = usePathname();

	useEffect(() => {
		dialogRef.current?.close();
	}, [pathname]);

	function open() {
		dialogRef.current?.showModal();
		analytics.navOpen('mobile_sheet');
	}

	function close() {
		dialogRef.current?.close();
	}

	return (
		<div className={styles.root}>
			<button type="button" className={styles.trigger} onClick={open} aria-haspopup="dialog">
				<Icon name="menu" />
				<span>Menu</span>
			</button>
			<dialog ref={dialogRef} className={styles.sheet} aria-label="Menu" data-ffid-sheet="">
				<div className={styles.top}>
					<p className="type-label">Menu</p>
					<button type="button" className={styles.close} onClick={close}>
						<Icon name="close" title="Tutup menu" />
					</button>
				</div>
				<div className={styles.content}>
					<SearchField variant="full" id="cari-mobile" />
					<nav aria-label="Topik">
						<p className={`type-label ${styles.section}`}>{label}</p>
						<ul className={styles.topics}>
							{categories.map((category) => (
								<li key={category.id}>
									{category.children.length > 0 ? (
										<details name="ffid-topik" className={styles.topic}>
											<summary className={styles.summary}>
												{category.name}
											</summary>
											<ul className={styles.children}>
												<li>
													<Link href={routes.category(category)}>
														Semua {category.name}
													</Link>
												</li>
												{category.children.map((child) => (
													<li key={child.id}>
														<Link href={routes.category(child)}>
															{child.name}
														</Link>
													</li>
												))}
											</ul>
										</details>
									) : (
										<Link
											href={routes.category(category)}
											className={styles.summary}
										>
											{category.name}
										</Link>
									)}
								</li>
							))}
							<li>
								<Link href={routes.latest()} className={styles.summary}>
									Terbaru
								</Link>
							</li>
							<li>
								<Link href={routes.interviews()} className={styles.summary}>
									Wawancara
								</Link>
							</li>
						</ul>
					</nav>
					<nav aria-label="Tentang kami">
						<ul className={styles.trust}>
							<li>
								<Link href={routes.about()}>Tentang Kami</Link>
							</li>
							{TRUST_PAGES.map((page) => (
								<li key={page.slug}>
									<Link href={routes.about(page.slug)}>{page.label}</Link>
								</li>
							))}
							<li>
								<Link href={routes.contact()}>Hubungi Kami</Link>
							</li>
						</ul>
					</nav>
				</div>
			</dialog>
		</div>
	);
}
