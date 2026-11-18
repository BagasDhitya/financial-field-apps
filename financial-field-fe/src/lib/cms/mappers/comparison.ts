import { firstListItems } from '@/lib/blocks';
import { log } from '@/lib/log';
import { guardOutboundUrl } from '@/lib/outbound';
import type {
	FinancialProduct,
	LoanSpecs,
	ProductSection,
	Provider,
	ProviderSummary,
	SectionSummary,
} from '@/types';

import type {
	StrapiFinancialProduct,
	StrapiLoanSpecs,
	StrapiProductCategory,
	StrapiProvider,
} from '../strapi-types';

import { mapMedia, resolveBodyMedia } from './media';
import { mapSeo } from './seo';

/**
 * The comparison catalogue (ADR-0011, PRP-0002.p3 T08). CMS names stay here:
 * `apply_url` → `officialUrl` through the outbound guard, `min_income` →
 * `minIncome`, `annual_fee` → `annualFeeText`. A product without a title,
 * slug, section or provider is not rendered anywhere (AC13): null, logged.
 */

function nonEmpty(value: string | null | undefined): string | null {
	const trimmed = value?.trim();
	return trimmed ? trimmed : null;
}

function positive(value: number | null | undefined): number | null {
	return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;
}

export function mapSectionSummary(entry: StrapiProductCategory): SectionSummary {
	return {
		id: entry.documentId,
		slug: entry.slug ?? '',
		name: entry.name ?? '',
		parentSlug: entry.parent?.slug ?? null,
		parentName: entry.parent?.name ?? null,
	};
}

/** A section, or a group of sections when CMS-28 gives it children. */
export function mapSection(entry: StrapiProductCategory, index: number): ProductSection {
	const children = (entry.children ?? []).filter((child) => child.slug).map(mapSectionSummary);
	return {
		...mapSectionSummary(entry),
		description: nonEmpty(entry.description),
		navOrder: entry.nav_order ?? index + 1,
		children,
		productCount: (entry.financial_products ?? []).length,
		seo: mapSeo(entry.seo),
	};
}

export function mapProviderSummary(entry: StrapiProvider): ProviderSummary {
	return {
		id: entry.documentId,
		slug: entry.slug ?? '',
		name: entry.name ?? '',
		logo: mapMedia(entry.logo),
	};
}

const REGULATORS = new Set(['ojk', 'bi', 'lainnya']);

export function mapProvider(entry: StrapiProvider, origin: string): Provider {
	const regulator = entry.regulator ?? '';
	return {
		...mapProviderSummary(entry),
		legalName: nonEmpty(entry.legal_name),
		regulator: REGULATORS.has(regulator) ? (regulator as Provider['regulator']) : null,
		licenseNumber: nonEmpty(entry.license_number),
		websiteUrl: guardOutboundUrl(entry.website_url, origin),
		description: nonEmpty(entry.description),
	};
}

/** Loan terms, or null when any required number is missing or out of order (W2). */
export function mapLoanSpecs(entry: StrapiLoanSpecs | null | undefined): LoanSpecs | null {
	if (!entry) {
		return null;
	}
	const rateType =
		entry.rate_type === 'flat' || entry.rate_type === 'efektif' ? entry.rate_type : null;
	const numbers = [
		positive(entry.rate_min),
		positive(entry.rate_max),
		positive(entry.amount_min),
		positive(entry.amount_max),
		positive(entry.tenor_min),
		positive(entry.tenor_max),
	];
	if (!rateType || numbers.some((value) => value === null)) {
		return null;
	}
	const [rateMin, rateMax, amountMin, amountMax, tenorMin, tenorMax] = numbers as number[];
	if (rateMin! > rateMax! || amountMin! > amountMax! || tenorMin! > tenorMax!) {
		return null;
	}
	return {
		rateType,
		rateMin: rateMin!,
		rateMax: rateMax!,
		amountMin: amountMin!,
		amountMax: amountMax!,
		tenorMin: tenorMin!,
		tenorMax: tenorMax!,
		downPaymentMin: positive(entry.down_payment_min),
		maxFinancing: positive(entry.max_financing),
		fees: nonEmpty(entry.fees),
	};
}

export function mapProduct(entry: StrapiFinancialProduct, origin: string): FinancialProduct | null {
	const missing = [
		entry.title ? null : 'title',
		entry.slug ? null : 'slug',
		entry.product_category?.slug ? null : 'product_category',
		entry.provider?.slug ? null : 'provider',
	].filter(Boolean);
	if (missing.length > 0 || !entry.product_category || !entry.provider) {
		log.warn('cms::mapProduct', 'product dropped: missing required data', {
			id: entry.documentId,
			missing: missing.join(','),
		});
		return null;
	}
	const features = resolveBodyMedia(entry.features ?? []);
	const officialUrl = guardOutboundUrl(entry.apply_url, origin);
	if (entry.apply_url && !officialUrl) {
		log.warn('cms::mapProduct', 'apply_url hidden: failed the outbound guard', {
			id: entry.documentId,
		});
	}
	return {
		id: entry.documentId,
		slug: entry.slug ?? '',
		title: entry.title ?? '',
		summary: nonEmpty(entry.summary),
		section: mapSectionSummary(entry.product_category),
		provider: mapProviderSummary(entry.provider),
		minIncome: positive(entry.min_income),
		annualFeeText: nonEmpty(entry.annual_fee),
		features,
		featureHighlights: firstListItems(features, 3),
		officialUrl,
		image: mapMedia(entry.image),
		dataCheckedAt: entry.data_checked_at ?? entry.updatedAt ?? null,
		sourceUrl: guardOutboundUrl(entry.source_url, origin),
		isPartner: entry.is_partner === true,
		loan: mapLoanSpecs(entry.loan_specs),
		seo: mapSeo(entry.seo),
	};
}
