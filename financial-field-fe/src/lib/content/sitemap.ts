import { routes } from '@/lib/routes';
import { ARTICLES_PER_SITEMAP, latestDate, type SitemapUrl } from '@/lib/sitemap';

import { getArticleIndex, type ArticleIndexEntry } from './articles';
import { getAllCategoryPaths } from './categories';
import {
	getComparisonSections,
	getProviders,
	getProductsInSection,
	isComparisonEnabled,
} from './comparison';
import { getStaticPageEntries } from './pages';
import { isIndexableTag } from './tags';

export type SitemapData = {
	articles: ArticleIndexEntry[];
	categories: { slug: string; parentSlug: string | null }[];
	pages: { slug: string; updatedAt: string | null }[];
	/** Null while comparison is off: no comparison file at all (PRP-0002.p3 T31). */
	comparison: {
		sections: string[];
		products: { slug: string; checkedAt: string | null }[];
		providers: string[];
	} | null;
};

export type SitemapFile = { name: string; urls: SitemapUrl[] };

const ABOUT_SLUG = 'tentang-kami';
const CONTACT_SLUG = 'hubungi-kami';
const GLOSSARY_SLUG = 'kamus-keuangan';

function staticPagePath(slug: string): string {
	if (slug === ABOUT_SLUG) {
		return routes.about();
	}
	if (slug === CONTACT_SLUG) {
		return routes.contact();
	}
	if (slug === GLOSSARY_SLUG) {
		return routes.glossary();
	}
	return routes.about(slug);
}

/**
 * Pure: turns the article index into sitemap files (REQ-SEO-013). Only
 * canonical, indexable, non-empty URLs; lastmod from the content dates.
 */
export function buildSitemapFiles(data: SitemapData, origin: string): SitemapFile[] {
	const base = origin.replace(/\/+$/, '');
	const abs = (path: string) => `${base}${path}`;
	const indexable = data.articles.filter((article) => !article.noIndex);
	const newest = latestDate(indexable.map((article) => article.modifiedAt));

	const articleFiles: SitemapFile[] = [];
	for (let start = 0; start < indexable.length || start === 0; start += ARTICLES_PER_SITEMAP) {
		articleFiles.push({
			name: `articles-${start / ARTICLES_PER_SITEMAP + 1}`,
			urls: indexable.slice(start, start + ARTICLES_PER_SITEMAP).map((article) => ({
				loc: abs(routes.article(article.slug)),
				lastmod: article.modifiedAt,
			})),
		});
		if (indexable.length === 0) {
			break;
		}
	}

	// Categories with at least one article in them or in a child.
	const lastByCategory = new Map<string, string | null>();
	for (const article of indexable) {
		if (article.primaryCategorySlug) {
			const previous = lastByCategory.get(article.primaryCategorySlug) ?? null;
			lastByCategory.set(
				article.primaryCategorySlug,
				latestDate([previous, article.modifiedAt]),
			);
		}
	}
	const categoryUrls: SitemapUrl[] = data.categories.flatMap((category) => {
		const childDates = data.categories
			.filter((child) => child.parentSlug === category.slug)
			.map((child) => lastByCategory.get(child.slug));
		const own = lastByCategory.get(category.slug);
		const hasArticles = own !== undefined || childDates.some((date) => date !== undefined);
		return hasArticles
			? [
					{
						loc: abs(routes.category(category)),
						lastmod: latestDate([own, ...childDates]),
					},
				]
			: [];
	});

	// Tags only when indexable (≥ 3 articles, REQ-SEO-008).
	const tagArticles = new Map<string, ArticleIndexEntry[]>();
	for (const article of indexable) {
		for (const tag of article.tagSlugs) {
			tagArticles.set(tag, [...(tagArticles.get(tag) ?? []), article]);
		}
	}
	const tagUrls: SitemapUrl[] = [...tagArticles.entries()]
		.filter(([, articles]) => isIndexableTag(articles.length))
		.map(([slug, articles]) => ({
			loc: abs(routes.tag(slug)),
			lastmod: latestDate(articles.map((article) => article.modifiedAt)),
		}));

	const reviewerDates = new Map<string, string | null>();
	for (const article of indexable) {
		for (const slug of article.reviewerSlugs) {
			reviewerDates.set(
				slug,
				latestDate([reviewerDates.get(slug) ?? null, article.modifiedAt]),
			);
		}
	}
	const reviewerUrls: SitemapUrl[] = [...reviewerDates.entries()].map(([slug, lastmod]) => ({
		loc: abs(routes.reviewer(slug)),
		lastmod,
	}));

	const hasInterviews = indexable.some((article) => article.articleType === 'interview');
	const hasVideos = indexable.some((article) => article.hasVideo);
	const pageUrls: SitemapUrl[] = [
		{ loc: abs(routes.home()), lastmod: newest },
		{ loc: abs(routes.latest()), lastmod: newest },
		...(hasInterviews ? [{ loc: abs(routes.interviews()), lastmod: newest }] : []),
		...(hasVideos ? [{ loc: abs(routes.videos()), lastmod: newest }] : []),
		...data.pages.map((page) => ({
			loc: abs(staticPagePath(page.slug)),
			lastmod: page.updatedAt,
		})),
	];

	const comparisonUrls: SitemapUrl[] = data.comparison
		? [
				{ loc: abs(routes.comparisonIndex()), lastmod: null },
				...data.comparison.sections.map((slug) => ({
					loc: abs(routes.comparisonSection(slug)),
					lastmod: null,
				})),
				...data.comparison.products.map((product) => ({
					loc: abs(routes.product(product.slug)),
					lastmod: product.checkedAt,
				})),
				{ loc: abs(routes.providers()), lastmod: null },
				...data.comparison.providers.map((slug) => ({
					loc: abs(routes.provider(slug)),
					lastmod: null,
				})),
				{ loc: abs(routes.calculator()), lastmod: null },
			]
		: [];

	return [
		...articleFiles,
		{ name: 'categories', urls: categoryUrls },
		{ name: 'tags', urls: tagUrls },
		{ name: 'reviewers', urls: reviewerUrls },
		{ name: 'pages', urls: pageUrls },
		...(comparisonUrls.length > 0 ? [{ name: 'comparison', urls: comparisonUrls }] : []),
	];
}

/** Comparison paths for the sitemap: sections with products, their products, providers. */
async function getComparisonPaths(): Promise<SitemapData['comparison']> {
	if (!isComparisonEnabled()) {
		return null;
	}
	const [sections, providers] = await Promise.all([getComparisonSections(), getProviders()]);
	const leaves = sections.filter((section) => section.children.length === 0);
	const products = (
		await Promise.all(leaves.map((section) => getProductsInSection(section.slug)))
	).flat();
	return {
		sections: sections.map((section) => section.slug),
		products: products.map((product) => ({
			slug: product.slug,
			checkedAt: product.dataCheckedAt,
		})),
		providers: providers.map((provider) => provider.slug),
	};
}

/**
 * Every sitemap file for the origin: article files of ARTICLES_PER_SITEMAP
 * each, then categories, tags, reviewers, pages and, when on, comparison.
 */
export async function getSitemapFiles(origin: string): Promise<SitemapFile[]> {
	const [articles, categories, pages, comparison] = await Promise.all([
		getArticleIndex(),
		getAllCategoryPaths(),
		getStaticPageEntries(),
		getComparisonPaths(),
	]);
	return buildSitemapFiles({ articles, categories, pages, comparison }, origin);
}
