import type { ArticleSummary } from '@/types';

export type HomeStories = {
	lead: ArticleSummary | null;
	river: ArticleSummary[];
};

const RIVER_COUNT = 8;

/**
 * REQ-HOME-001/002: the lead is the first featured article (or the latest);
 * the river is the latest articles after it. The rail beside them holds the
 * widgets (ADR-0022), so featured 2–4 no longer have a slot there. No article
 * appears twice above the category blocks.
 */
export function selectHomeStories(
	featured: ArticleSummary[],
	latest: ArticleSummary[],
): HomeStories {
	const valid = (article: ArticleSummary) => Boolean(article.slug && article.title);
	const lead = featured.find(valid) ?? latest.find(valid) ?? null;
	const river = latest
		.filter((article) => valid(article) && article.id !== lead?.id)
		.slice(0, RIVER_COUNT);
	return { lead, river };
}

const VIDEO_COUNT = 6;
const INTERVIEW_COUNT = 6;

function shownIds(stories: HomeStories, also: ArticleSummary[] = []): Set<string> {
	return new Set(
		[stories.lead, ...stories.river, ...also].flatMap((article) =>
			article ? [article.id] : [],
		),
	);
}

/**
 * REQ-HOME-005: the Video section, newest first, without the articles already
 * shown above it in the lead or the river.
 */
export function selectHomeVideos(videos: ArticleSummary[], stories: HomeStories): ArticleSummary[] {
	const shown = shownIds(stories);
	return videos
		.filter((article) => article.video && article.slug && article.title)
		.filter((article) => !shown.has(article.id))
		.slice(0, VIDEO_COUNT);
}

/**
 * REQ-HOME-006: the Wawancara section, newest first, without the articles
 * already shown above it (the lead, the river and the Video section).
 */
export function selectHomeInterviews(
	interviews: ArticleSummary[],
	stories: HomeStories,
	videos: ArticleSummary[],
): ArticleSummary[] {
	const shown = shownIds(stories, videos);
	return interviews
		.filter((article) => article.articleType === 'interview' && article.slug && article.title)
		.filter((article) => !shown.has(article.id))
		.slice(0, INTERVIEW_COUNT);
}
