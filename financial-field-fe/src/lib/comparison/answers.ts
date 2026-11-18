/**
 * Survey answers for a comparison section (PRP-0002.p3 §4.4, REQ-PRIV-005).
 * They live in component state and `sessionStorage` only: never in a URL,
 * analytics or a request. The home finder writes them here and the section
 * page resumes from them, so "Mulai Bandingkan" lands on the section with the
 * reader's numbers already filled in (ADR-0022). Client-safe.
 */

/** What a reader can tell us. Every field is optional; the page fills defaults. */
export type LoanAnswers = {
	/** Car price (kredit mobil) in Rupiah. */
	price?: number;
	/** Down payment in percent of the price (kredit mobil). */
	downPayment?: number;
	/** Appraised vehicle value (jaminan BPKB) in Rupiah. */
	vehicleValue?: number;
	/** Amount wanted (jaminan BPKB) in Rupiah. */
	amount?: number;
	/** Months. */
	tenor?: number;
	/** Monthly net income in Rupiah, when given. */
	income?: number;
};

const PREFIX = 'ffid:bandingkan:';
const FIELDS = ['price', 'downPayment', 'vehicleValue', 'amount', 'tenor', 'income'] as const;

function clean(value: unknown): LoanAnswers {
	if (typeof value !== 'object' || value === null) {
		return {};
	}
	const answers: LoanAnswers = {};
	for (const field of FIELDS) {
		const raw = (value as Record<string, unknown>)[field];
		if (typeof raw === 'number' && Number.isFinite(raw) && raw >= 0) {
			answers[field] = raw;
		}
	}
	return answers;
}

/**
 * The saved answers for a section as stored (a string, so React can compare
 * snapshots), or null when none or storage is blocked.
 */
export function storedAnswers(section: string): string | null {
	try {
		return window.sessionStorage.getItem(`${PREFIX}${section}`);
	} catch {
		// Storage can be blocked (private mode, settings): the survey starts empty (W2).
		return null;
	}
}

/** Stored answers back to values; anything unreadable is dropped. */
export function parseAnswers(raw: string | null): LoanAnswers {
	if (!raw) {
		return {};
	}
	try {
		return clean(JSON.parse(raw));
	} catch {
		// A damaged entry is treated as no answers (W2).
		return {};
	}
}

/** Saves the answers for this session; silently skipped when storage is blocked. */
export function saveAnswers(section: string, answers: LoanAnswers): void {
	try {
		window.sessionStorage.setItem(`${PREFIX}${section}`, JSON.stringify(clean(answers)));
	} catch {
		// Without storage the answers simply aren't remembered (W2).
	}
}

/** "Hapus jawaban" (AC6): forgets the answers for a section. */
export function clearAnswers(section: string): void {
	try {
		window.sessionStorage.removeItem(`${PREFIX}${section}`);
	} catch {
		// Nothing was stored if storage is blocked (W2).
	}
}
