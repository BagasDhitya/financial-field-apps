import type { ArticleSummary } from '@/types';

export type HomeStories = {
	lead: ArticleSummary | null;
	secondary: ArticleSummary[];
	river: ArticleSummary[];
};

const SECONDARY_COUNT = 3;
const RIVER_COUNT = 8;

/**
 * REQ-HOME-001/002: the lead is the first featured article (or the latest);
 * the secondary stack is featured 2–4; the river is the latest articles. No
 * article appears twice above the category blocks.
 */
export function selectHomeStories(
	featured: ArticleSummary[],
	latest: ArticleSummary[],
): HomeStories {
	const valid = (article: ArticleSummary) => Boolean(article.slug && article.title);
	const featuredValid = featured.filter(valid);
	const latestValid = latest.filter(valid);

	const used = new Set<string>();
	const take = (article: ArticleSummary | undefined) => {
		if (!article || used.has(article.id)) {
			return null;
		}
		used.add(article.id);
		return article;
	};

	const lead = take(featuredValid[0]) ?? take(latestValid[0]);

	const secondary: ArticleSummary[] = [];
	for (const article of featuredValid.slice(1)) {
		if (secondary.length >= SECONDARY_COUNT) {
			break;
		}
		const picked = take(article);
		if (picked) {
			secondary.push(picked);
		}
	}

	const river: ArticleSummary[] = [];
	for (const article of latestValid) {
		if (river.length >= RIVER_COUNT) {
			break;
		}
		const picked = take(article);
		if (picked) {
			river.push(picked);
		}
	}

	return { lead, secondary, river };
}
