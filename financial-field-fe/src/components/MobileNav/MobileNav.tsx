'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { analytics } from '@/lib/analytics/events';
import { routes } from '@/lib/routes';
import type { MainMenuEntry } from '@/types';

import { Icon } from '../Icon/Icon';
import { SearchField } from '../SearchField/SearchField';

import styles from './MobileNav.module.css';

export type MobileNavProps = {
	entries: MainMenuEntry[];
};

/**
 * Below 1024 px (REQ-NAV-004, ADR-0022): a native modal <dialog> gives focus
 * trapping, Esc to close and an inert background. The same entries as the
 * desktop row, as an exclusive accordion; Berita's topics nest inside it.
 */
export function MobileNav({ entries }: MobileNavProps) {
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
					<nav aria-label="Menu utama">
						<ul className={styles.entries}>
							{entries.map((entry) => (
								<li key={entry.label}>
									{entry.kind === 'link' ? (
										<Link href={entry.href} className={styles.summary}>
											{entry.label}
										</Link>
									) : (
										<details name="ffid-menu" className={styles.entry}>
											<summary className={styles.summary}>
												{entry.label}
											</summary>
											{entry.kind === 'topics' ? (
												<div className={styles.body}>
													<ul className={styles.topics}>
														{entry.topics.map((topic) => (
															<li key={topic.id}>
																{topic.children.length > 0 ? (
																	<details
																		name="ffid-topik"
																		className={styles.topic}
																	>
																		<summary
																			className={
																				styles.topicSummary
																			}
																		>
																			{topic.name}
																		</summary>
																		<ul
																			className={
																				styles.children
																			}
																		>
																			<li>
																				<Link
																					href={routes.category(
																						topic,
																					)}
																				>
																					Semua{' '}
																					{topic.name}
																				</Link>
																			</li>
																			{topic.children.map(
																				(child) => (
																					<li
																						key={
																							child.id
																						}
																					>
																						<Link
																							href={routes.category(
																								child,
																							)}
																						>
																							{
																								child.name
																							}
																						</Link>
																					</li>
																				),
																			)}
																		</ul>
																	</details>
																) : (
																	<Link
																		href={routes.category(
																			topic,
																		)}
																		className={
																			styles.topicSummary
																		}
																	>
																		{topic.name}
																	</Link>
																)}
															</li>
														))}
													</ul>
													<ul className={styles.views}>
														{entry.views.map((view) => (
															<li key={view.href}>
																<Link href={view.href}>
																	{view.label}
																</Link>
															</li>
														))}
													</ul>
												</div>
											) : (
												<div className={styles.body}>
													{entry.groups.map((group, index) => (
														<div key={group.heading?.href ?? index}>
															{group.heading ? (
																<Link
																	href={group.heading.href}
																	className={styles.groupHeading}
																>
																	{group.heading.label}
																</Link>
															) : null}
															<ul className={styles.children}>
																{group.links.map((link) => (
																	<li key={link.href}>
																		<Link href={link.href}>
																			{link.label}
																		</Link>
																	</li>
																))}
															</ul>
														</div>
													))}
													{entry.footer ? (
														<Link
															href={entry.footer.href}
															className={styles.footer}
														>
															{entry.footer.label}
														</Link>
													) : null}
												</div>
											)}
										</details>
									)}
								</li>
							))}
						</ul>
					</nav>
				</div>
			</dialog>
		</div>
	);
}
