import { cacheTags } from '@/lib/cms/cache-tags';
import { hasCapability } from '@/lib/cms/capabilities';
import { cmsFetch, type CmsCollection } from '@/lib/cms/client';
import { endpoints } from '@/lib/cms/endpoints';
import { mapAuthor, mapAuthorSummary } from '@/lib/cms/mappers/author';
import { seoPopulate } from '@/lib/cms/queries/articles';
import type { StrapiAuthor } from '@/lib/cms/strapi-types';
import { REVALIDATE } from '@/lib/revalidate';
import type { Author, AuthorSummary } from '@/types';

/**
 * A writer profile by slug, or null: the reviewer pages use it (ADR-0022).
 * `same_as` is requested only with the `author-profile` capability; the
 * profile's text fields arrive with the scalars once the CMS has them.
 */
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
	const result = await cmsFetch<CmsCollection<StrapiAuthor>>({
		path: endpoints.authors,
		query: {
			filters: { slug: { $eq: slug } },
			populate: {
				avatar: true,
				...(hasCapability('author-profile') ? { same_as: true } : {}),
				...seoPopulate(),
			},
			pagination: { limit: 1 },
		},
		tags: [cacheTags.author(slug)],
		revalidate: REVALIDATE.archive,
	});

	const entry = result.data[0];
	return entry ? mapAuthor(entry) : null;
}

/**
 * Everyone who reviewed at least one article, A–Z: the reviewers listed on the
 * Redaksi page (ADR-0022). `article` is the CMS's inverse of Article
 * `reviewer`.
 */
export async function getReviewers(): Promise<AuthorSummary[]> {
	const result = await cmsFetch<CmsCollection<StrapiAuthor & { article?: unknown[] | null }>>({
		path: endpoints.authors,
		query: {
			populate: { avatar: true, article: { fields: ['slug'] } },
			pagination: { limit: 100 },
		},
		tags: [cacheTags.authors()],
		revalidate: REVALIDATE.archive,
	});
	return result.data
		.filter((entry) => entry.slug && (entry.article ?? []).length > 0)
		.map(mapAuthorSummary)
		.sort((a, b) => a.fullName.localeCompare(b.fullName, 'id'));
}
