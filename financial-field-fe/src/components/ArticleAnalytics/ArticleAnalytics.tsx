'use client';

import { useEffect, useRef } from 'react';

import { analytics, ANALYTICS_READY_EVENT, type ArticleEventParams } from '@/lib/analytics/events';

import styles from './ArticleAnalytics.module.css';

export type ArticleAnalyticsProps = { params: ArticleEventParams };

function whenReady(callback: () => void): () => void {
	if (typeof window.gtag === 'function') {
		callback();
		return () => {};
	}
	window.addEventListener(ANALYTICS_READY_EVENT, callback, { once: true });
	return () => window.removeEventListener(ANALYTICS_READY_EVENT, callback);
}

/**
 * `article_view` on mount and `article_read` once a sentinel at 75% of the
 * body scrolls into view (SPC-analytics §3). Renders only the sentinel.
 */
export function ArticleAnalytics({ params }: ArticleAnalyticsProps) {
	const sentinel = useRef<HTMLSpanElement>(null);
	const read = useRef(false);

	useEffect(() => {
		const stop = whenReady(() => analytics.articleView(params));
		const node = sentinel.current;
		if (!node || typeof IntersectionObserver === 'undefined') {
			return stop;
		}
		const observer = new IntersectionObserver((entries) => {
			if (!read.current && entries.some((entry) => entry.isIntersecting)) {
				read.current = true;
				analytics.articleRead(params);
				observer.disconnect();
			}
		});
		observer.observe(node);
		return () => {
			stop();
			observer.disconnect();
		};
	}, [params]);

	return <span ref={sentinel} className={styles.sentinel} aria-hidden="true" />;
}
