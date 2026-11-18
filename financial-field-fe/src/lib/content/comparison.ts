import { cacheTags } from '@/lib/cms/cache-tags';
import { hasCapability } from '@/lib/cms/capabilities';
import { cmsFetch, type CmsCollection } from '@/lib/cms/client';
import { endpoints } from '@/lib/cms/endpoints';
import {
	mapProduct,
	mapProvider,
	mapProviderSummary,
	mapSection,
} from '@/lib/cms/mappers/comparison';
import type {
	StrapiFinancialProduct,
	StrapiProductCategory,
	StrapiProvider,
} from '@/lib/cms/strapi-types';
import { env } from '@/lib/env';
import { features } from '@/lib/features';
import { REVALIDATE } from '@/lib/revalidate';
import type { FinancialProduct, ProductSection, Provider, ProviderSummary } from '@/types';

/**
 * The comparison catalogue (ADR-0011, PRP-0002.p3 T09). Nothing is requested
 * unless `FEATURE_COMPARISON` is on and the CMS lets the Public role read the
 * three types (capability `comparison`, CMS-20). Each planned field is asked
 * for only with its own capability (strictParams answers 400 otherwise).
 */
export function isComparisonEnabled(): boolean {
	return features.comparison && hasCapability('comparison');
}

/** A section holds tens of products, never more than the CMS's maxLimit (ADR-0011 §4). */
const LIMIT = 100;

function sectionPopulate() {
	return {
		financial_products: { fields: ['slug'] },
		...(hasCapability('comparison-seo') ? { seo: { populate: { og_image: true } } } : {}),
		...(hasCapability('product-category-tree')
			? {
					parent: { fields: ['slug', 'name'] },
					children: {
						fields: ['slug', 'name'],
						populate: { financial_products: { fields: ['slug'] } },
					},
				}
			: {}),
	};
}

function productPopulate() {
	return {
		image: true,
		provider: { populate: { logo: true } },
		product_category: hasCapability('product-category-tree')
			? { populate: { parent: { fields: ['slug', 'name'] } } }
			: true,
		...(hasCapability('product-specs') ? { loan_specs: true } : {}),
		...(hasCapability('comparison-seo') ? { seo: { populate: { og_image: true } } } : {}),
	};
}

function sortSections(sections: ProductSection[]): ProductSection[] {
	return sections.sort((a, b) => a.navOrder - b.navOrder || a.name.localeCompare(b.name, 'id'));
}

/**
 * Every section and group that has products (REQ-NAV-006), in `nav_order`.
 * A group (CMS-28) counts the products of its sections.
 */
export async function getComparisonSections(): Promise<ProductSection[]> {
	if (!isComparisonEnabled()) {
		return [];
	}
	const result = await cmsFetch<CmsCollection<StrapiProductCategory>>({
		path: endpoints.productCategories,
		query: { populate: sectionPopulate(), pagination: { limit: LIMIT } },
		tags: [cacheTags.productSections()],
		revalidate: REVALIDATE.comparison,
	});
	const sections = result.data
		.filter((entry) => entry.slug && entry.name)
		.map((entry, index) => {
			const section = mapSection(entry, index);
			const childProducts = (entry.children ?? []).reduce(
				(sum, child) => sum + (child.financial_products ?? []).length,
				0,
			);
			return { ...section, productCount: section.productCount + childProducts };
		});
	return sortSections(sections.filter((section) => section.productCount > 0));
}

/** One section or group by slug, or null (unknown slugs are a 404). */
export async function getComparisonSection(slug: string): Promise<ProductSection | null> {
	const sections = await getComparisonSections();
	return sections.find((section) => section.slug === slug) ?? null;
}

/** Products ordered by the documented, non-paid default: provider, then title (REQ-CMP-011). */
function defaultOrder(products: FinancialProduct[]): FinancialProduct[] {
	return products.sort(
		(a, b) =>
			a.provider.name.localeCompare(b.provider.name, 'id') ||
			a.title.localeCompare(b.title, 'id'),
	);
}

async function fetchProducts(
	filters: Record<string, unknown>,
	tags: string[],
): Promise<FinancialProduct[]> {
	if (!isComparisonEnabled()) {
		return [];
	}
	const result = await cmsFetch<CmsCollection<StrapiFinancialProduct>>({
		path: endpoints.products,
		query: { filters, populate: productPopulate(), pagination: { limit: LIMIT } },
		tags: [cacheTags.products(), ...tags],
		revalidate: REVALIDATE.comparison,
	});
	return defaultOrder(
		result.data.flatMap((entry) => {
			const product = mapProduct(entry, env.siteUrl);
			return product ? [product] : [];
		}),
	);
}

/** Every published product of one section, in the default order. */
export function getProductsInSection(slug: string): Promise<FinancialProduct[]> {
	return fetchProducts({ product_category: { slug: { $eq: slug } } }, [
		cacheTags.productSection(slug),
	]);
}

/** One product by slug, or null. */
export async function getProduct(slug: string): Promise<FinancialProduct | null> {
	const products = await fetchProducts({ slug: { $eq: slug } }, [cacheTags.product(slug)]);
	return products[0] ?? null;
}

/** A provider's products, in the default order. */
export function getProductsByProvider(slug: string): Promise<FinancialProduct[]> {
	return fetchProducts({ provider: { slug: { $eq: slug } } }, [cacheTags.provider(slug)]);
}

/** Providers with at least one product, A–Z (REQ-CMP-009), with their product counts. */
export async function getProviders(): Promise<(ProviderSummary & { productCount: number })[]> {
	if (!isComparisonEnabled()) {
		return [];
	}
	const result = await cmsFetch<CmsCollection<StrapiProvider>>({
		path: endpoints.providers,
		query: {
			fields: ['name', 'slug'],
			populate: { logo: true, financial_products: { fields: ['slug'] } },
			pagination: { limit: LIMIT },
		},
		tags: [cacheTags.providers()],
		revalidate: REVALIDATE.comparison,
	});
	return result.data
		.filter((entry) => entry.slug && entry.name)
		.map((entry) => ({
			...mapProviderSummary(entry),
			productCount: (entry.financial_products ?? []).length,
		}))
		.filter((entry) => entry.productCount > 0)
		.sort((a, b) => a.name.localeCompare(b.name, 'id'));
}

/** One provider by slug with its CMS-24 profile when the CMS has it, or null. */
export async function getProvider(slug: string): Promise<Provider | null> {
	if (!isComparisonEnabled()) {
		return null;
	}
	const result = await cmsFetch<CmsCollection<StrapiProvider>>({
		path: endpoints.providers,
		query: {
			filters: { slug: { $eq: slug } },
			populate: { logo: true },
			pagination: { limit: 1 },
		},
		tags: [cacheTags.provider(slug)],
		revalidate: REVALIDATE.comparison,
	});
	const entry = result.data[0];
	return entry?.slug ? mapProvider(entry, env.siteUrl) : null;
}
