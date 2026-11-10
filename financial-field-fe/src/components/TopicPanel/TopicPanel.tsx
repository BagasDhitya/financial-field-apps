'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { analytics } from '@/lib/analytics/events';
import { routes } from '@/lib/routes';
import type { CategoryNode } from '@/types';

import { Icon } from '../Icon/Icon';

import styles from './TopicPanel.module.css';

export type TopicPanelProps = {
	label: string;
	categories: CategoryNode[];
};

/**
 * The single "Artikel" entry (REQ-NAV-001/002/003): a disclosure button that
 * opens every FF topic. Click, Enter or Space open it; Esc, an outside click,
 * a second activation or a route change close it; focus returns to the button.
 * Never opens on hover alone.
 */
export function TopicPanel({ label, categories }: TopicPanelProps) {
	const pathname = usePathname();
	// Open state is tied to the path it was opened on, so any navigation closes
	// the panel without an effect (W7: state follows the route).
	const [openOn, setOpenOn] = useState<string | null>(null);
	const open = openOn === pathname;
	const panelId = useId();
	const rootRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const close = useCallback((returnFocus: boolean) => {
		setOpenOn(null);
		if (returnFocus) {
			buttonRef.current?.focus();
		}
	}, []);

	useEffect(() => {
		if (!open) {
			return;
		}
		function onKey(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				close(true);
			}
		}
		function onPointer(event: PointerEvent) {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				close(false);
			}
		}
		document.addEventListener('keydown', onKey);
		document.addEventListener('pointerdown', onPointer);
		// W7: every listener added here is removed here.
		return () => {
			document.removeEventListener('keydown', onKey);
			document.removeEventListener('pointerdown', onPointer);
		};
	}, [open, close]);

	function toggle() {
		if (open) {
			setOpenOn(null);
			return;
		}
		analytics.navOpen('desktop_panel');
		setOpenOn(pathname);
	}

	return (
		<div ref={rootRef} className={styles.root}>
			<button
				ref={buttonRef}
				type="button"
				className={styles.trigger}
				aria-expanded={open}
				aria-controls={panelId}
				onClick={toggle}
			>
				{label}
				<span className={open ? styles.chevronOpen : styles.chevron}>
					<Icon name="chevron-down" size={16} />
				</span>
			</button>
			<div id={panelId} className={styles.panel} hidden={!open}>
				<div className={styles.inner}>
					<ul className={styles.columns}>
						{categories.map((category) => (
							<li key={category.id} className={styles.column}>
								<Link href={routes.category(category)} className={styles.parent}>
									{category.name}
								</Link>
								{category.children.length > 0 ? (
									<ul className={styles.children}>
										{category.children.map((child) => (
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
						<li>
							<Link href={routes.latest()}>Terbaru</Link>
						</li>
						<li>
							<Link href={routes.interviews()}>Wawancara</Link>
						</li>
						<li>
							<Link href={routes.videos()}>Video</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
