import type { Metadata } from 'next';

import { LoanFinder } from '@/components/LoanFinder/LoanFinder';
import { NewsletterSignup } from '@/components/NewsletterSignup/NewsletterSignup';
import { PrSpot } from '@/components/PrSpot/PrSpot';
import {
	getArticlesInCategories,
	getInterviewArticles,
	getLatestArticles,
	getPrArticles,
	getVideoArticles,
} from '@/lib/content/articles';
import { getCategoryTree } from '@/lib/content/categories';
import { getComparisonSection, getComparisonSections } from '@/lib/content/comparison';
import { getSiteNavigation } from '@/lib/content/navigation';
import { getSiteSettings } from '@/lib/content/site';
import { features } from '@/lib/features';
import { routes } from '@/lib/routes';
import { BRAND, buildMetadata, composeDescription } from '@/lib/seo/metadata';

import { HomeView } from '@/features/home/HomeView';
import {
	selectHomeInterviews,
	selectHomePrArticles,
	selectHomeStories,
	selectHomeVideos,
} from '@/features/home/select';

/** Safety-net window. Keep in sync with REVALIDATE.home (revalidate.test.ts). */
export const revalidate = 60;

const BLOCK_SIZE = 3;

/** The comparison section the home finder opens (the owner's widget, ADR-0022). */
const FINDER_SECTION = 'kredit-mobil';

/** Enough for the 6 videos after the up to 12 stories above them are taken out. */
const VIDEO_CANDIDATES = 18;

/** Enough for the 6 interviews after the stories and the videos above them are taken out. */
const INTERVIEW_CANDIDATES = 24;

export async function generateMetadata(): Promise<Metadata> {
	const settings = await getSiteSettings();
	return buildMetadata({
		title: `${BRAND}: ${settings.tagline}`,
		description: composeDescription(
			settings.description,
			'Artikel dan panduan keuangan pribadi: pajak, investasi, asuransi, pinjaman, dan pengelolaan uang sehari-hari.',
		),
		path: routes.home(),
	});
}

export default async function Home() {
	const [navigation, latest, videos, interviews, categories, settings, finder, pr, sections] =
		await Promise.all([
			getSiteNavigation(),
			getLatestArticles(1, 20),
			getVideoArticles(1, VIDEO_CANDIDATES),
			getInterviewArticles(1, INTERVIEW_CANDIDATES),
			getCategoryTree(),
			getSiteSettings(),
			getComparisonSection(FINDER_SECTION),
			// The PR spot takes the newest; "Rekomendasi" up to 5 of the rest (ADR-0024).
			features.ads ? getPrArticles(6) : Promise.resolve(null),
			// Empty while comparison is off.
			getComparisonSections(),
		]);

	const blocks = await Promise.all(
		categories.map(async (category) => {
			const result = await getArticlesInCategories(
				[category.slug, ...category.children.map((child) => child.slug)],
				1,
				BLOCK_SIZE,
			);
			return { category, articles: result.items };
		}),
	);

	const stories = selectHomeStories(navigation.featuredArticles, latest.items);
	const prSpot = pr?.items[0] ?? null;

	// Each widget shows only when its flag (and, for the finder, its section) is on.
	const rail = [
		finder ? (
			<LoanFinder
				key="finder"
				sectionSlug={finder.slug}
				href={routes.comparisonSection(finder.slug)}
			/>
		) : null,
		features.ads ? <PrSpot key="pr" article={prSpot} /> : null,
		features.newsletter ? <NewsletterSignup key="newsletter" /> : null,
	].filter(Boolean);
	const homeVideos = selectHomeVideos(videos.items, stories);
	const homeInterviews = selectHomeInterviews(interviews.items, stories, homeVideos);

	return (
		<HomeView
			heading={`${BRAND}: ${settings.tagline}`}
			stories={stories}
			rail={rail}
			videos={homeVideos}
			interviews={homeInterviews}
			categoryBlocks={blocks.filter((block) => block.articles.length > 0)}
			now={new Date()}
			banner={features.ads}
			prArticles={selectHomePrArticles(pr?.items ?? [], stories, [
				...homeVideos,
				...homeInterviews,
				...(prSpot ? [prSpot] : []),
			])}
			comparisonSections={sections.filter((section) => section.children.length === 0)}
		/>
	);
}
