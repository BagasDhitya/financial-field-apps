import type { Metadata } from 'next';

import { getArticlesInCategories, getLatestArticles } from '@/lib/content/articles';
import { getCategoryTree } from '@/lib/content/categories';
import { getSiteNavigation } from '@/lib/content/navigation';
import { getSiteSettings } from '@/lib/content/site';
import { routes } from '@/lib/routes';
import { BRAND, buildMetadata, composeDescription } from '@/lib/seo/metadata';

import { HomeView } from '@/features/home/HomeView';
import { selectHomeStories } from '@/features/home/select';

/** Safety-net window. Keep in sync with REVALIDATE.home (revalidate.test.ts). */
export const revalidate = 60;

const BLOCK_SIZE = 3;

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
	const [navigation, latest, categories, settings] = await Promise.all([
		getSiteNavigation(),
		getLatestArticles(1, 20),
		getCategoryTree(),
		getSiteSettings(),
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

	return (
		<HomeView
			heading={`${BRAND}: ${settings.tagline}`}
			stories={selectHomeStories(navigation.featuredArticles, latest.items)}
			categoryBlocks={blocks.filter((block) => block.articles.length > 0)}
			now={new Date()}
		/>
	);
}
