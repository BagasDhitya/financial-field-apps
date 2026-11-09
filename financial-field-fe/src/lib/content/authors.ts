import { cacheTags } from '@/lib/cms/cache-tags';
import { hasCapability } from '@/lib/cms/capabilities';
import { cmsFetch, type CmsCollection } from '@/lib/cms/client';
import { endpoints } from '@/lib/cms/endpoints';
import { mapAuthor } from '@/lib/cms/mappers/author';
import { seoPopulate } from '@/lib/cms/queries/articles';
import type { StrapiAuthor } from '@/lib/cms/strapi-types';
import { REVALIDATE } from '@/lib/revalidate';
import type { Author } from '@/types';

/**
 * Author by slug, or null. `same_as` is requested only with the `author-
 * profile` capability.
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
 * Every author slug for the sitemap (the first 100, enough for the current
 * team).
 */
export async function getAllAuthorSlugs(): Promise<string[]> {
	const result = await cmsFetch<CmsCollection<StrapiAuthor>>({
		path: endpoints.authors,
		query: { fields: ['slug'], pagination: { limit: 100 } },
		tags: [cacheTags.authors()],
		revalidate: REVALIDATE.sitemap,
	});
	return result.data.flatMap((entry) => (entry.slug ? [entry.slug] : []));
}
