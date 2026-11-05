import type { ArticleSummary } from '@/types';

export type RelatedCandidate = {
	article: ArticleSummary;
	tagSlugs: string[];
};

/** Related articles shown under an article (REQ-ART-006). */
export const RELATED_LIMIT = 6;

/**
 * REQ-ART-006: rank by shared tags (desc), then same primary category, then
 * recency; exclude the current article; cap at six.
 */
export function rankRelated(
	current: {
		id: string;
		tagSlugs: string[];
		primaryCategorySlug: string | null;
	},
	candidates: RelatedCandidate[],
	limit = RELATED_LIMIT,
): ArticleSummary[] {
	const currentTags = new Set(current.tagSlugs);
	const seen = new Set<string>([current.id]);

	return candidates
		.filter((candidate) => {
			if (seen.has(candidate.article.id) || !candidate.article.slug) {
				return false;
			}
			seen.add(candidate.article.id);
			return true;
		})
		.map((candidate) => ({
			article: candidate.article,
			sharedTags: candidate.tagSlugs.filter((slug) => currentTags.has(slug)).length,
			sameCategory:
				current.primaryCategorySlug !== null &&
				candidate.article.primaryCategory?.slug === current.primaryCategorySlug,
		}))
		.filter((item) => item.sharedTags > 0 || item.sameCategory)
		.sort(
			(a, b) =>
				b.sharedTags - a.sharedTags ||
				Number(b.sameCategory) - Number(a.sameCategory) ||
				(b.article.publishedAt ?? '').localeCompare(a.article.publishedAt ?? ''),
		)
		.slice(0, limit)
		.map((item) => item.article);
}
