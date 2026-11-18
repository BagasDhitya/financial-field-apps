/**
 * YouTube URLs for article videos (CMS-30). Client-safe: the player imports it
 * too. The CMS stores an `/embed/` link (`video.embedUrl`); watch and share
 * links are read as well. Only the 11-character video id leaves this module,
 * so no stored URL is ever used as an iframe or image source (REQ-SEC-010).
 */

const YOUTUBE_HOSTS = new Set([
	'youtube.com',
	'www.youtube.com',
	'm.youtube.com',
	'youtu.be',
	'youtube-nocookie.com',
	'www.youtube-nocookie.com',
]);

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

/** Path forms that carry the id as their second segment. */
const ID_PATHS = new Set(['embed', 'shorts', 'live', 'v']);

/**
 * The video id of an https YouTube link (`watch?v=`, `youtu.be/`, `embed/`,
 * `shorts/`, `live/`), or null for anything else.
 */
export function parseYouTubeId(url: string | null | undefined): string | null {
	if (!url) {
		return null;
	}
	let parsed: URL;
	try {
		parsed = new URL(url.trim());
	} catch {
		// Not a URL, so not a YouTube link: "no" is the expected answer here (W2).
		// The mapper logs a video it has to drop.
		return null;
	}
	if (parsed.protocol !== 'https:' || !YOUTUBE_HOSTS.has(parsed.hostname)) {
		return null;
	}
	const segments = parsed.pathname.split('/').filter(Boolean);
	let id: string | null | undefined = null;
	if (parsed.hostname === 'youtu.be') {
		id = segments[0];
	} else if (segments[0] === 'watch') {
		id = parsed.searchParams.get('v');
	} else if (segments[0] && ID_PATHS.has(segments[0])) {
		id = segments[1];
	}
	return id && VIDEO_ID.test(id) ? id : null;
}

/** The public watch page, for "Tonton di YouTube" and structured data. */
export function youTubeWatchUrl(id: string): string {
	return `https://www.youtube.com/watch?v=${id}`;
}

/**
 * The player, from the privacy-enhanced domain: YouTube sets no cookies until
 * the reader plays the video. Loaded only after a click (REQ-PERF-011).
 */
export function youTubeEmbedUrl(id: string, autoplay = false): string {
	return `https://www.youtube-nocookie.com/embed/${id}?rel=0${autoplay ? '&autoplay=1' : ''}`;
}

/**
 * YouTube's still images. `hq` (480×360, letterboxed 4:3) exists for every
 * video; `maxres` (1280×720) only for HD uploads, so callers fall back to `hq`.
 */
export const YOUTUBE_THUMBNAILS = {
	maxres: { file: 'maxresdefault.jpg', width: 1280, height: 720 },
	hq: { file: 'hqdefault.jpg', width: 480, height: 360 },
} as const;

export type YouTubeThumbnail = keyof typeof YOUTUBE_THUMBNAILS;

/** A still image of the video on YouTube's image host (allowed in next.config.ts). */
export function youTubeThumbnailUrl(id: string, size: YouTubeThumbnail): string {
	return `https://i.ytimg.com/vi/${id}/${YOUTUBE_THUMBNAILS[size].file}`;
}

/** 318 → "5:18", 3725 → "1:02:05" (the length shown on the player). */
export function formatDuration(seconds: number | null | undefined): string | null {
	if (!seconds || seconds <= 0 || !Number.isFinite(seconds)) {
		return null;
	}
	const total = Math.round(seconds);
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor((total % 3600) / 60);
	const rest = String(total % 60).padStart(2, '0');
	return hours > 0
		? `${hours}:${String(minutes).padStart(2, '0')}:${rest}`
		: `${minutes}:${rest}`;
}

const ISO_DURATION = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;

/**
 * "PT5M18S" → 318: the CMS stores the length as an ISO 8601 duration (the
 * hours, minutes and seconds form YouTube uses). Anything else is null.
 */
export function parseIsoDuration(value: string | null | undefined): number | null {
	const match = value?.trim().match(ISO_DURATION);
	if (!match || (!match[1] && !match[2] && !match[3])) {
		return null;
	}
	const seconds =
		Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
	return seconds > 0 ? seconds : null;
}

/** True for `https://www.youtube.com/embed/<id>`, the form the CMS stores. */
export function isYouTubeEmbedUrl(url: string | null | undefined): boolean {
	if (!url || parseYouTubeId(url) === null) {
		return false;
	}
	return new URL(url.trim()).pathname.startsWith('/embed/');
}

/** 318 → "PT5M18S", the ISO 8601 duration VideoObject takes. */
export function isoDuration(seconds: number | null | undefined): string | null {
	if (!seconds || seconds <= 0 || !Number.isFinite(seconds)) {
		return null;
	}
	const total = Math.round(seconds);
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor((total % 3600) / 60);
	const rest = total % 60;
	return `PT${hours ? `${hours}H` : ''}${minutes ? `${minutes}M` : ''}${rest ? `${rest}S` : ''}`;
}
