'use client';

import { useEffect, useRef, useState } from 'react';

import { analytics } from '@/lib/analytics/events';
import { log } from '@/lib/log';

import styles from './ShareBar.module.css';

export type ShareBarProps = {
	url: string;
	title: string;
	articleId: string;
};

const NETWORKS = [
	{
		method: 'whatsapp',
		label: 'WhatsApp',
		href: (url: string, title: string) =>
			`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
	},
	{
		method: 'x',
		label: 'X',
		href: (url: string, title: string) =>
			`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
	},
	{
		method: 'facebook',
		label: 'Facebook',
		href: (url: string) =>
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
	},
	{
		method: 'linkedin',
		label: 'LinkedIn',
		href: (url: string) =>
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
	},
] as const;

/** Plain share URLs, no third-party SDKs (REQ-ART-009). */
export function ShareBar({ url, title, articleId }: ShareBarProps) {
	const [status, setStatus] = useState('');
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	// W7: clear the status timer on unmount.
	useEffect(() => {
		return () => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
		};
	}, []);

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(url);
			setStatus('Tautan disalin');
			analytics.share('copy_link', articleId);
		} catch {
			// Blocked by the browser or no clipboard API: the reader sees the status.
			log.warn('ShareBar::copyLink', 'clipboard unavailable');
			setStatus('Tautan tidak dapat disalin');
		}
		if (timer.current) {
			clearTimeout(timer.current);
		}
		timer.current = setTimeout(() => setStatus(''), 4000);
	}

	return (
		<div className={styles.root}>
			<p className={`type-label ${styles.label}`}>Bagikan</p>
			<ul className={styles.list}>
				{NETWORKS.map((network) => (
					<li key={network.method}>
						<a
							className={styles.button}
							href={network.href(url, title)}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => analytics.share(network.method, articleId)}
						>
							{network.label}
							<span className="visually-hidden"> (tab baru)</span>
						</a>
					</li>
				))}
				<li>
					<button type="button" className={styles.button} onClick={copyLink}>
						Salin tautan
					</button>
				</li>
			</ul>
			<p className={styles.status} aria-live="polite">
				{status}
			</p>
		</div>
	);
}
