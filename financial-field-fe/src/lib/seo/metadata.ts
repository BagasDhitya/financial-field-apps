import type { Metadata } from 'next';

import { env } from '@/lib/env';
import { truncateAtWord } from '@/lib/text';
import type { MediaAsset, SeoFields } from '@/types';

/** Public brand name. Never "FFID" in UI or schema. */
export const BRAND = 'Financial Field Indonesia';

const TITLE_MAX = 70;
const DESCRIPTION_MAX = 160;

/** Absolute URL on the site origin (canonical, OG, sitemap). */
export function absoluteUrl(path: string, origin: string = env.siteUrl): string {
	if (/^https?:\/\//.test(path)) {
		return path;
	}
	const base = origin.replace(/\/+$/, '');
	return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * `<title>` pattern (SPC-seo §5): "<title> | Financial Field Indonesia"; the
 * suffix is dropped when the total would exceed 70 characters (REQ-SEO-020).
 */
export function buildTitle(title: string, brand: string = BRAND): string {
	const clean = title.replace(/\s+/g, ' ').trim();
	if (!clean) {
		return brand;
	}
	const withBrand = `${clean} | ${brand}`;
	return withBrand.length <= TITLE_MAX ? withBrand : truncateAtWord(clean, TITLE_MAX);
}

/** First non-empty candidate, cut to 160 characters at a word boundary. */
export function buildDescription(...candidates: (string | null | undefined)[]): string | undefined {
	const first = candidates.find((candidate) => candidate?.trim());
	return first ? truncateAtWord(first, DESCRIPTION_MAX) : undefined;
}

const DESCRIPTION_MIN = 50;

/**
 * A primary description that is too short (or missing) is extended with a
 * template sentence, so no indexable page ships a thin description.
 */
export function composeDescription(primary: string | null | undefined, fallback: string): string {
	const clean = primary?.replace(/\s+/g, ' ').trim() ?? '';
	if (clean.length >= DESCRIPTION_MIN) {
		return clean;
	}
	if (!clean) {
		return fallback;
	}
	return `${/[.!?]$/.test(clean) ? clean : `${clean}.`} ${fallback}`;
}

export type MetadataInput = {
	title: string;
	description?: string | null;
	/** Canonical path of this page (self-canonical, REQ-SEO-016). */
	path: string;
	seo?: SeoFields | null;
	image?: MediaAsset | null;
	/** Generated card used when neither seo.ogImage nor image exists (T44). */
	fallbackImagePath?: string;
	type?: 'website' | 'article' | 'profile';
	noIndex?: boolean;
	article?: {
		publishedTime: string | null;
		modifiedTime: string | null;
		section: string | null;
		tags: string[];
		authors: string[];
	};
};

/** Default social card (generated brand card, T44). */
export const DEFAULT_OG_IMAGE = {
	url: '/og',
	width: 1200,
	height: 630,
	alt: BRAND,
};

/**
 * Next.js Metadata for a page. Content seo fields win over page defaults; the title
 * and description are cut to 70 and 160 characters; the canonical is absolute.
 */
export function buildMetadata(input: MetadataInput): Metadata {
	const seo = input.seo ?? null;
	const title = buildTitle(seo?.metaTitle ?? input.title);
	const description = buildDescription(seo?.metaDescription, input.description);
	const canonical = absoluteUrl(seo?.canonicalUrl ?? input.path);
	const image = seo?.ogImage ?? input.image ?? null;
	const images = image
		? [
				{
					url: image.url,
					width: image.width ?? undefined,
					height: image.height ?? undefined,
					alt: image.alternativeText ?? input.title,
				},
			]
		: [
				{
					...DEFAULT_OG_IMAGE,
					url: absoluteUrl(input.fallbackImagePath ?? DEFAULT_OG_IMAGE.url),
					alt: input.fallbackImagePath ? input.title : DEFAULT_OG_IMAGE.alt,
				},
			];
	const noIndex = input.noIndex === true || seo?.noIndex === true;
	const ogType = input.type === 'article' ? 'article' : 'website';

	return {
		title: { absolute: title },
		description,
		alternates: { canonical },
		robots: noIndex ? { index: false, follow: true } : undefined,
		openGraph: {
			type: ogType,
			url: canonical,
			title,
			description,
			siteName: BRAND,
			locale: 'id_ID',
			images,
			...(ogType === 'article' && input.article
				? {
						publishedTime: input.article.publishedTime ?? undefined,
						modifiedTime: input.article.modifiedTime ?? undefined,
						section: input.article.section ?? undefined,
						tags: input.article.tags,
						authors: input.article.authors,
					}
				: {}),
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: images.map((item) => item.url),
		},
	};
}
