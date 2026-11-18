'use client';

import { useEffect, useRef, useState } from 'react';

import {
	POPUP_OPEN_ATTRIBUTE,
	hasScrolledPast,
	markPopupShown,
	registerArticleView,
} from '@/lib/ads';

import { AdSlot } from '../AdSlot/AdSlot';
import { Icon } from '../Icon/Icon';
import { AdLabel } from '../Kicker/Kicker';

import styles from './AdPopup.module.css';

function sessionStore(): Storage | null {
	try {
		return window.sessionStorage;
	} catch {
		// Storage blocked: no pop-up (W2).
		return null;
	}
}

/**
 * The soft pop-up (ADR-0024, placement `article-popup`). Never a full-screen
 * interstitial: from 1024 px a closable 300×250 box bottom right, below that a
 * closable 320×100 bar on the bottom edge. It appears once per session, never
 * on the session's first article, only after the reader is halfway through
 * the body and never while the consent banner is on screen (so the two never
 * stack). It doesn't take focus; Esc or the close button dismiss it. Fixed
 * position, so no layout shift. Rendered only with FEATURE_ADS.
 */
export type AdPopupProps = {
	/** Harness only: render it open and in the page flow, without the session rules. */
	preview?: boolean;
};

export function AdPopup({ preview = false }: AdPopupProps) {
	const [open, setOpen] = useState(preview);
	// Strict Mode runs effects twice in development; count the view once.
	const eligible = useRef<boolean | null>(null);

	useEffect(() => {
		const storage = preview ? null : sessionStore();
		if (!storage) {
			return;
		}
		if (eligible.current === null) {
			eligible.current = registerArticleView(storage);
		}
		if (!eligible.current) {
			return;
		}
		function check() {
			const body = document.querySelector('[data-article-body]');
			// Wait while the consent banner is on screen (its heading id), so the two never stack.
			if (!body || document.getElementById('consent-title')) {
				return;
			}
			if (hasScrolledPast(body.getBoundingClientRect(), window.innerHeight)) {
				window.removeEventListener('scroll', check);
				eligible.current = false;
				if (storage) {
					markPopupShown(storage);
				}
				setOpen(true);
			}
		}
		window.addEventListener('scroll', check, { passive: true });
		// W7: every listener added here is removed here.
		return () => window.removeEventListener('scroll', check);
	}, [preview]);

	useEffect(() => {
		if (!open) {
			return;
		}
		// The article rail's ad hides (its space kept) while this shows: never two ads at once.
		const root = document.documentElement;
		if (!preview) {
			root.setAttribute(POPUP_OPEN_ATTRIBUTE, '');
		}
		function onKey(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		}
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('keydown', onKey);
			root.removeAttribute(POPUP_OPEN_ATTRIBUTE);
		};
	}, [open, preview]);

	if (!open) {
		return null;
	}

	return (
		<aside
			className={preview ? `${styles.root} ${styles.preview}` : styles.root}
			aria-label="Iklan"
			data-ad-popup=""
		>
			<div className={styles.bar}>
				<AdLabel />
				<button type="button" className={styles.close} onClick={() => setOpen(false)}>
					<Icon name="close" size={20} title="Tutup iklan" />
				</button>
			</div>
			<div className={styles.wide}>
				<AdSlot size="300x250" placement="article-popup" />
			</div>
			<div className={styles.narrow}>
				<AdSlot size="320x100" placement="article-popup" />
			</div>
		</aside>
	);
}
