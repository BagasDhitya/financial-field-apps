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

const VIDEO_COUNT = 6;
const INTERVIEW_COUNT = 6;

function shownIds(stories: HomeStories, also: ArticleSummary[] = []): Set<string> {
	return new Set(
		[stories.lead, ...stories.secondary, ...stories.river, ...also].flatMap((article) =>
			article ? [article.id] : [],
		),
	);
}

/**
 * REQ-HOME-005: the Video section, newest first, without the articles already
 * shown above it in the lead, the editor's picks or the river.
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
 * already shown above it (the lead, the editor's picks, the river and the
 * Video section).
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
