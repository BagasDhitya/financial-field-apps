import { formatDateWib, formatRelativeWib, formatTimeWib } from '@/lib/format';

export type DateTimeProps = {
	iso: string | null;
	/** "date": 3 November 2026 · "datetime": + 14.30 WIB · "relative": 2 jam lalu (falls back to date). */
	format?: 'date' | 'datetime' | 'relative';
	now?: Date;
};

/** `<time datetime>` in WIB (REQ-LOC-002, REQ-A11Y-017). */
export function DateTime({ iso, format = 'date', now }: DateTimeProps) {
	const date = formatDateWib(iso);
	if (!iso || !date) {
		return null;
	}
	let label = date;
	if (format === 'datetime') {
		label = `${date}, ${formatTimeWib(iso)}`;
	}
	if (format === 'relative') {
		label = formatRelativeWib(iso, now) ?? date;
	}
	return <time dateTime={iso}>{label}</time>;
}
