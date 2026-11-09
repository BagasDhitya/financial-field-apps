import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/JsonLd/JsonLd';
import { blocksToPlainText } from '@/lib/blocks';
import { categoryTrail, toSchemaCrumbs } from '@/lib/breadcrumbs';
import {
	getArticleBySlug,
	getRecentArticleSlugs,
	getRelatedArticles,
} from '@/lib/content/articles';
import { getSiteSettings } from '@/lib/content/site';
import { env } from '@/lib/env';
import { features } from '@/lib/features';
import { countWords, readingTimeMinutes, toIsoWib, wordBucket } from '@/lib/format';
import { routes } from '@/lib/routes';
import { isValidSlug } from '@/lib/security';
import { absoluteUrl, buildMetadata } from '@/lib/seo/metadata';
import { buildPageGraph } from '@/lib/structured-data/registry';
import type { Article } from '@/types';

import { ArticleView } from '@/features/article/ArticleView';

/** Safety-net window. Keep in sync with REVALIDATE.article (revalidate.test.ts). */
export const revalidate = 300;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string): Promise<Article | null> {
	return isValidSlug(slug) ? getArticleBySlug(slug) : null;
}

/** Pre-render the 100 most recent; the rest render on first request. */
export async function generateStaticParams() {
	const slugs = await getRecentArticleSlugs(100);
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const article = await load(slug);
	if (!article) {
		return {};
	}
	return buildMetadata({
		title: article.title,
		description: article.leadText,
		path: routes.article(article.slug),
		seo: article.seo,
		image: article.featuredImage,
		fallbackImagePath: `/og/artikel/${article.slug}`,
		type: 'article',
		article: {
			publishedTime: toIsoWib(article.publishedAt),
			modifiedTime: toIsoWib(article.contentUpdatedAt ?? article.publishedAt),
			section: article.primaryCategory?.name ?? null,
			tags: article.tags.map((tag) => tag.name),
			authors: article.author ? [absoluteUrl(routes.author(article.author.slug))] : [],
		},
	});
}

export default async function ArticlePage({ params }: Props) {
	const { slug } = await params;
	const article = await load(slug);
	if (!article) {
		notFound();
	}
	const [related, settings] = await Promise.all([getRelatedArticles(article), getSiteSettings()]);

	const url = absoluteUrl(routes.article(article.slug));
	const words = countWords(blocksToPlainText(article.body));
	const trail = [
		...categoryTrail(article.primaryCategory),
		{ label: article.title, href: routes.article(article.slug) },
	];

	return (
		<>
			<JsonLd
				data={buildPageGraph({
					kind: 'article',
					origin: env.siteUrl,
					url,
					crumbs: toSchemaCrumbs(trail),
					article,
					faqSchema: features.faqSchema,
				})}
			/>
			<ArticleView
				article={article}
				related={related}
				breadcrumbs={trail}
				url={url}
				siteOrigin={env.siteUrl}
				readingMinutes={readingTimeMinutes(words)}
				defaultPrDisclosure={settings.defaultPrDisclosure}
				analyticsParams={{
					article_id: article.id,
					primary_category: article.primaryCategory?.slug ?? 'none',
					article_type: article.articleType,
					author_id: article.author?.id ?? 'none',
					has_reviewer: article.reviewer !== null && article.lastReviewedAt !== null,
					word_bucket: wordBucket(words),
				}}
			/>
		</>
	);
}
