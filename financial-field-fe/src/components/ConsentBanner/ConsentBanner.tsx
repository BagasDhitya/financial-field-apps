'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import {
	CONSENT_ATTRIBUTE,
	CONSENT_CHANGE_EVENT,
	CONSENT_OPEN_EVENT,
	parseConsent,
	serializeConsent,
	type ConsentChoice,
} from '@/lib/analytics/consent';

import styles from './ConsentBanner.module.css';

export type ConsentBannerProps = { privacyHref: string };

/** Reopened from the footer: shown again even when a choice exists. */
let reopened = false;
const listeners = new Set<() => void>();

function emit() {
	listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	function reopen() {
		reopened = true;
		document.documentElement.removeAttribute(CONSENT_ATTRIBUTE);
		emit();
	}
	window.addEventListener(CONSENT_OPEN_EVENT, reopen);
	return () => {
		listeners.delete(listener);
		window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
	};
}

function isVisible(): boolean {
	return reopened || parseConsent(document.cookie) === null;
}

function choose(choice: ConsentChoice) {
	document.cookie = serializeConsent(choice, window.location.protocol === 'https:');
	reopened = false;
	document.documentElement.setAttribute(CONSENT_ATTRIBUTE, choice);
	window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: choice }));
	emit();
}

/**
 * Opt-in analytics consent (ADR-0008, REQ-PRIV-002). An overlay (no layout
 * shift), equal-weight buttons, nothing pre-selected; reopened from the
 * footer. Rendered on the server so it paints with the page; CSS hides it
 * before paint when <html data-ffid-consent> exists (CONSENT_BOOT_SCRIPT).
 */
export function ConsentBanner({ privacyHref }: ConsentBannerProps) {
	const visible = useSyncExternalStore(subscribe, isVisible, () => true);

	if (!visible) {
		return null;
	}

	return (
		<section className={styles.root} aria-labelledby="consent-title">
			<div className={styles.inner}>
				<div className={styles.text}>
					<h2 id="consent-title" className={`type-label ${styles.title}`}>
						Cookie analitik
					</h2>
					<p>
						Kami ingin memakai Google Analytics untuk memahami cara situs ini digunakan.
						Cookie analitik hanya dipasang jika Anda setuju. Baca{' '}
						<Link href={privacyHref}>Kebijakan Privasi</Link>.
					</p>
				</div>
				<div className={styles.actions}>
					<button type="button" className="button" onClick={() => choose('granted')}>
						Terima
					</button>
					<button type="button" className="button" onClick={() => choose('denied')}>
						Tolak
					</button>
				</div>
			</div>
		</section>
	);
}

/** Footer link that reopens the banner so the choice can change any time. */
export function ConsentSettingsButton() {
	return (
		<button
			type="button"
			className={styles.settings}
			onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
		>
			Pengaturan cookie
		</button>
	);
}
