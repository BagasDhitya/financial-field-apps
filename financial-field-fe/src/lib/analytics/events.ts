/**
 * GA4 event helpers (SPC-analytics §3). Client-safe. Every helper is a no-op
 * when gtag is absent (no consent, blocked, or analytics disabled), so
 * analytics can never break a page (REQ-ANL-006).
 */
import { log } from '@/lib/log';

type Gtag = (...args: unknown[]) => void;

declare global {
	// Declaration merging requires an interface here.
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Window {
		dataLayer?: unknown[];
		gtag?: Gtag;
	}
}

/** Fired on window once gtag is defined (after consent). */
export const ANALYTICS_READY_EVENT = 'ffid:analytics-ready';

const EMAIL_PATTERN = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_PATTERN = /(?:\+?\d[\s.-]?){8,}/;

/**
 * REQ-ANL-003 / REQ-SRCH-002: lower-case, collapse spaces, max 50 chars, and
 * drop anything that looks like an email address or phone number.
 */
export function sanitizeSearchTerm(term: string): string | null {
	const clean = term.toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 50);
	if (!clean || EMAIL_PATTERN.test(clean) || PHONE_PATTERN.test(clean)) {
		return null;
	}
	return clean;
}

export type EventParams = Record<string, string | number | boolean>;

/**
 * Sends a GA4 event when gtag is loaded, which happens only after consent
 * (ADR-0008). Otherwise it does nothing.
 */
export function track(event: string, params: EventParams = {}): void {
	if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
		return;
	}
	try {
		window.gtag('event', event, params);
	} catch {
		// Analytics must never break the page: the event is dropped.
		log.warn('analytics::track', `gtag failed for ${event}`);
	}
}

export type ArticleEventParams = {
	article_id: string;
	primary_category: string;
	article_type: string;
	author_id: string;
	has_reviewer: boolean;
	word_bucket: string;
};

/**
 * Typed helpers for the GA4 events in SPC-analytics, so event and parameter
 * names are spelled in one place.
 */
export const analytics = {
	articleView: (params: ArticleEventParams) => track('article_view', params),
	articleRead: (params: ArticleEventParams) => track('article_read', params),
	selectContent: (contentType: string, itemId: string) =>
		track('select_content', { content_type: contentType, item_id: itemId }),
	search: (term: string) => {
		const searchTerm = sanitizeSearchTerm(term);
		if (searchTerm) {
			track('search', { search_term: searchTerm });
		}
	},
	share: (method: string, itemId: string) =>
		track('share', { method, content_type: 'article', item_id: itemId }),
	navOpen: (surface: 'desktop_panel' | 'mobile_sheet') => track('nav_open', { surface }),
	videoStart: (videoUrl: string, itemId: string) =>
		track('video_start', { video_provider: 'youtube', video_url: videoUrl, item_id: itemId }),
};
