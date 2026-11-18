import type { ArticleBody } from './article';
import type { MediaAsset } from './media';
import type { SeoFields } from './seo';

/** A section's place in the menu: its own name and, under CMS-28, its group. */
export type SectionSummary = {
	id: string;
	slug: string;
	name: string;
	parentSlug: string | null;
	parentName: string | null;
};

/** A Product Category (ADR-0011): one comparison section, or a group of sections (CMS-28). */
export type ProductSection = SectionSummary & {
	description: string | null;
	navOrder: number;
	/** Sections under a group; empty for a section. */
	children: SectionSummary[];
	/** Published products in it (a group counts its sections' products). */
	productCount: number;
	seo: SeoFields | null;
};

export type ProviderSummary = {
	id: string;
	slug: string;
	name: string;
	logo: MediaAsset | null;
};

/** A Provider (ADR-0011) with its planned CMS-24 profile. */
export type Provider = ProviderSummary & {
	legalName: string | null;
	regulator: 'ojk' | 'bi' | 'lainnya' | null;
	licenseNumber: string | null;
	websiteUrl: string | null;
	description: string | null;
};

/** A loan's published terms (planned CMS-26). Percentages are per year. */
export type LoanSpecs = {
	rateType: 'flat' | 'efektif';
	rateMin: number;
	rateMax: number;
	amountMin: number;
	amountMax: number;
	tenorMin: number;
	tenorMax: number;
	downPaymentMin: number | null;
	maxFinancing: number | null;
	fees: string | null;
};

/** A Financial Product (ADR-0011). */
export type FinancialProduct = {
	id: string;
	slug: string;
	title: string;
	summary: string | null;
	section: SectionSummary | null;
	provider: ProviderSummary;
	/** Monthly net income in Rupiah (OQ-36). */
	minIncome: number | null;
	/** `annual_fee`, shown as written. */
	annualFeeText: string | null;
	features: ArticleBody;
	/** The first three feature list items, for cards and the table. */
	featureHighlights: string[];
	/** `apply_url` after the outbound guard (REQ-SEC-009); null hides the button. */
	officialUrl: string | null;
	image: MediaAsset | null;
	/** CMS-25; else the entry's `updatedAt`. */
	dataCheckedAt: string | null;
	sourceUrl: string | null;
	isPartner: boolean;
	loan: LoanSpecs | null;
	seo: SeoFields | null;
};
