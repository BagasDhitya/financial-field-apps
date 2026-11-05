const TIME_ZONE = 'Asia/Jakarta';
const WIB_OFFSET_MINUTES = 7 * 60;

const DATE_FORMAT = new Intl.DateTimeFormat('id-ID', {
	dateStyle: 'long',
	timeZone: TIME_ZONE,
});

const TIME_FORMAT = new Intl.DateTimeFormat('id-ID', {
	hour: '2-digit',
	minute: '2-digit',
	hour12: false,
	timeZone: TIME_ZONE,
});

const RUPIAH_FORMAT = new Intl.NumberFormat('id-ID', {
	style: 'currency',
	currency: 'IDR',
	maximumFractionDigits: 0,
});

const NUMBER_FORMAT = new Intl.NumberFormat('id-ID');

function parseDate(iso: string | null | undefined): Date | null {
	if (!iso) {
		return null;
	}
	const date = new Date(iso);
	return Number.isNaN(date.getTime()) ? null : date;
}

/** "3 November 2026" in WIB (REQ-LOC-002). */
export function formatDateWib(iso: string | null | undefined): string | null {
	const date = parseDate(iso);
	return date ? DATE_FORMAT.format(date) : null;
}

/** "14.30 WIB" (REQ-LOC-002). */
export function formatTimeWib(iso: string | null | undefined): string | null {
	const date = parseDate(iso);
	return date ? `${TIME_FORMAT.format(date)} WIB` : null;
}

/**
 * "2 jam lalu" for items under 24 hours old, otherwise null so the caller
 * falls back to the date (REQ-LOC-002: relative times only in the river).
 */
export function formatRelativeWib(
	iso: string | null | undefined,
	now: Date = new Date(),
): string | null {
	const date = parseDate(iso);
	if (!date) {
		return null;
	}
	const minutes = Math.floor((now.getTime() - date.getTime()) / 60_000);
	if (minutes < 0 || minutes >= 24 * 60) {
		return null;
	}
	if (minutes < 1) {
		return 'Baru saja';
	}
	if (minutes < 60) {
		return `${minutes} menit lalu`;
	}
	return `${Math.floor(minutes / 60)} jam lalu`;
}

/** ISO 8601 with the WIB offset, as Google recommends for article dates. */
export function toIsoWib(iso: string | null | undefined): string | null {
	const date = parseDate(iso);
	if (!date) {
		return null;
	}
	const shifted = new Date(date.getTime() + WIB_OFFSET_MINUTES * 60_000);
	return `${shifted.toISOString().slice(0, 19)}+07:00`;
}

/** True when b is at least one calendar day (WIB) after a. */
export function isLaterDayWib(a: string | null | undefined, b: string | null | undefined): boolean {
	const first = toIsoWib(a);
	const second = toIsoWib(b);
	if (!first || !second) {
		return false;
	}
	return second.slice(0, 10) > first.slice(0, 10);
}

/** "Rp 1.250.000" (REQ-LOC-003). */
export function formatRupiah(value: number): string {
	return RUPIAH_FORMAT.format(value);
}

/** Indonesian digit grouping, for example "1.250.000". */
export function formatNumber(value: number): string {
	return NUMBER_FORMAT.format(value);
}

/**
 * Whitespace-separated words, for reading time and the analytics word bucket.
 */
export function countWords(text: string): number {
	const trimmed = text.trim();
	return trimmed ? trimmed.split(/\s+/).length : 0;
}

/** Words ÷ 200, rounded up, minimum 1 (REQ-ART-008). */
export function readingTimeMinutes(wordCount: number): number {
	return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Coarse length bucket for analytics (SPC-analytics), so exact word counts are
 * never sent.
 */
export function wordBucket(wordCount: number): string {
	if (wordCount < 500) {
		return '<500';
	}
	if (wordCount < 1000) {
		return '500-1000';
	}
	if (wordCount < 2000) {
		return '1000-2000';
	}
	return '>2000';
}
