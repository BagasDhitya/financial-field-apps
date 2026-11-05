import { toIsoWib } from '@/lib/format';
import { truncateAtWord } from '@/lib/text';
import type { Article } from '@/types';

import { schemaIds } from './ids';
import { buildPerson } from './person';
import type { JsonLdNode } from './types';

type ArticleInput = {
	origin: string;
	url: string;
	article: Article;
	hasBreadcrumb: boolean;
};

/**
 * Article + WebPage (SPC-seo §6). `reviewedBy`/`lastReviewed` appear only
 * when a fact-check is recorded (REQ-SEO-035). Returns [] when the article
 * lacks the minimum (title, slug) instead of emitting partial data (W2).
 */
export function buildArticleNodes({
	origin,
	url,
	article,
	hasBreadcrumb,
}: ArticleInput): JsonLdNode[] {
	if (!article.title || !article.slug) {
		return [];
	}

	const author = article.author ? buildPerson(origin, article.author) : null;
	const reviewer =
		article.reviewer && article.lastReviewedAt ? buildPerson(origin, article.reviewer) : null;
	const published = toIsoWib(article.publishedAt);
	const modified = toIsoWib(article.contentUpdatedAt ?? article.publishedAt);

	const webPage: JsonLdNode = {
		'@type': 'WebPage',
		'@id': schemaIds.webpage(url),
		url,
		name: article.title,
		inLanguage: 'id-ID',
		isPartOf: { '@id': schemaIds.website(origin) },
		...(hasBreadcrumb ? { breadcrumb: { '@id': schemaIds.breadcrumb(url) } } : {}),
		...(reviewer
			? {
					reviewedBy: reviewer,
					lastReviewed: toIsoWib(article.lastReviewedAt)?.slice(0, 10),
				}
			: {}),
	};

	const articleNode: JsonLdNode = {
		'@type': 'Article',
		'@id': schemaIds.article(url),
		headline: truncateAtWord(article.title, 110),
		...(article.leadText ? { description: article.leadText } : {}),
		...(article.featuredImage ? { image: [article.featuredImage.url] } : {}),
		...(published ? { datePublished: published } : {}),
		...(modified ? { dateModified: modified } : {}),
		author: author ?? { '@id': schemaIds.organization(origin) },
		publisher: { '@id': schemaIds.organization(origin) },
		mainEntityOfPage: { '@id': schemaIds.webpage(url) },
		...(article.primaryCategory ? { articleSection: article.primaryCategory.name } : {}),
		...(article.tags.length > 0
			? { keywords: article.tags.map((tag) => tag.name).join(', ') }
			: {}),
		inLanguage: 'id-ID',
		isAccessibleForFree: true,
		...(article.sources.length > 0
			? {
					citation: article.sources.map((source) => ({
						'@type': 'CreativeWork',
						name: source.title,
						...(source.url ? { url: source.url } : {}),
						...(source.publisher
							? {
									publisher: {
										'@type': 'Organization',
										name: source.publisher,
									},
								}
							: {}),
					})),
				}
			: {}),
	};

	return [webPage, articleNode];
}
