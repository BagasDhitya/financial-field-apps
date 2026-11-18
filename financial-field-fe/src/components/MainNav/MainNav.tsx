'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { analytics } from '@/lib/analytics/events';
import { routes } from '@/lib/routes';
import type { MainMenuEntry } from '@/types';

import { Icon } from '../Icon/Icon';

import styles from './MainNav.module.css';

export type MainNavProps = {
	entries: MainMenuEntry[];
};

type OpenState = { index: number; path: string } | null;

/**
 * The desktop menu row (≥ 1024 px, REQ-NAV-001…003, ADR-0022). Every entry
 * with sub-items is a disclosure button: click, Enter or Space open it; Esc,
 * an outside click, a second activation, another entry or a route change
 * close it, and Esc returns focus. Nothing opens on hover. Berita opens the
 * full-width topic panel; the rest open a dropdown under their button.
 */
export function MainNav({ entries }: MainNavProps) {
	const pathname = usePathname();
	// Open state is tied to the path it was opened on, so navigation closes it
	// without an effect (W7: state follows the route).
	const [open, setOpen] = useState<OpenState>(null);
	const openIndex = open && open.path === pathname ? open.index : null;
	const baseId = useId();
	const rootRef = useRef<HTMLUListElement>(null);
	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const close = useCallback((returnFocus: boolean, index: number | null) => {
		setOpen(null);
		if (returnFocus && index !== null) {
			buttonRefs.current[index]?.focus();
		}
	}, []);

	useEffect(() => {
		if (openIndex === null) {
			return;
		}
		function onKey(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				close(true, openIndex);
			}
		}
		function onPointer(event: PointerEvent) {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				close(false, null);
			}
		}
		document.addEventListener('keydown', onKey);
		document.addEventListener('pointerdown', onPointer);
		// W7: every listener added here is removed here.
		return () => {
			document.removeEventListener('keydown', onKey);
			document.removeEventListener('pointerdown', onPointer);
		};
	}, [openIndex, close]);

	function toggle(index: number) {
		if (openIndex === index) {
			setOpen(null);
			return;
		}
		analytics.navOpen('desktop_panel');
		setOpen({ index, path: pathname });
	}

	return (
		<ul ref={rootRef} className={styles.root}>
			{entries.map((entry, index) => {
				if (entry.kind === 'link') {
					return (
						<li key={entry.label} className={styles.item}>
							<Link
								href={entry.href}
								className={styles.link}
								aria-current={pathname === entry.href ? 'page' : undefined}
							>
								{entry.label}
							</Link>
						</li>
					);
				}
				const isOpen = openIndex === index;
				const panelId = `${baseId}-${index}`;
				const alignEnd = index >= entries.length - 2;
				return (
					<li
						key={entry.label}
						className={entry.kind === 'topics' ? styles.itemWide : styles.item}
					>
						<button
							ref={(node) => {
								buttonRefs.current[index] = node;
							}}
							type="button"
							className={styles.trigger}
							aria-expanded={isOpen}
							aria-controls={panelId}
							onClick={() => toggle(index)}
						>
							{entry.label}
							<span className={isOpen ? styles.chevronOpen : styles.chevron}>
								<Icon name="chevron-down" size={16} />
							</span>
						</button>
						{entry.kind === 'topics' ? (
							<div id={panelId} className={styles.panel} hidden={!isOpen}>
								<div className={styles.panelInner}>
									<ul className={styles.columns}>
										{entry.topics.map((topic) => (
											<li key={topic.id} className={styles.column}>
												<Link
													href={routes.category(topic)}
													className={styles.parent}
												>
													{topic.name}
												</Link>
												{topic.children.length > 0 ? (
													<ul className={styles.children}>
														{topic.children.map((child) => (
															<li key={child.id}>
																<Link href={routes.category(child)}>
																	{child.name}
																</Link>
															</li>
														))}
													</ul>
												) : null}
											</li>
										))}
									</ul>
									<ul className={styles.views}>
										{entry.views.map((view) => (
											<li key={view.href}>
												<Link href={view.href}>{view.label}</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
						) : (
							<div
								id={panelId}
								className={alignEnd ? styles.dropdownEnd : styles.dropdown}
								hidden={!isOpen}
							>
								{entry.groups.map((group, groupIndex) => (
									<div
										key={group.heading?.href ?? groupIndex}
										className={styles.group}
									>
										{group.heading ? (
											<Link
												href={group.heading.href}
												className={styles.heading}
											>
												{group.heading.label}
											</Link>
										) : null}
										<ul
											className={group.heading ? styles.nested : styles.links}
										>
											{group.links.map((link) => (
												<li key={link.href}>
													<Link href={link.href}>{link.label}</Link>
												</li>
											))}
										</ul>
									</div>
								))}
								{entry.footer ? (
									<Link href={entry.footer.href} className={styles.footer}>
										{entry.footer.label}
										<Icon name="arrow-right" size={16} />
									</Link>
								) : null}
							</div>
						)}
					</li>
				);
			})}
		</ul>
	);
}
