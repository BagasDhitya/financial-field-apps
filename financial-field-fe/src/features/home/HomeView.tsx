import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { Container } from '@/components/Container/Container';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { GoldenSplit } from '@/components/GoldenSplit/GoldenSplit';
import { RiverItem } from '@/components/RiverItem/RiverItem';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { routes } from '@/lib/routes';
import type { ArticleSummary, CategoryNode } from '@/types';

import styles from './HomeView.module.css';
import type { HomeStories } from './select';

export type CategoryBlock = {
	category: CategoryNode;
	articles: ArticleSummary[];
};

export type HomeViewProps = {
	heading: string;
	stories: HomeStories;
	/** Articles with a video, not already above (REQ-HOME-005); empty hides the section. */
	videos: ArticleSummary[];
	categoryBlocks: CategoryBlock[];
	now: Date;
};

/** Media-first home: lead story, editor picks, Terbaru river, Video, topic blocks. */
export function HomeView({ heading, stories, videos, categoryBlocks, now }: HomeViewProps) {
	const { lead, secondary, river } = stories;

	return (
		<Container className={styles.root}>
			<h1 className="visually-hidden">{heading}</h1>

			{lead ? (
				<GoldenSplit
					railLabel="Pilihan editor dan artikel terbaru"
					main={
						<ArticleCard article={lead} variant="lead" headingLevel={2} preloadImage />
					}
					rail={
						<div className={styles.rail}>
							{secondary.length > 0 ? (
								<section aria-labelledby="pilihan-editor">
									<SectionHeader id="pilihan-editor" title="Pilihan editor" />
									<ul className={styles.stack}>
										{secondary.map((article) => (
											<li key={article.id}>
												<ArticleCard
													article={article}
													variant="compact"
													trackAs="home_featured"
												/>
											</li>
										))}
									</ul>
								</section>
							) : null}
							{river.length > 0 ? (
								<section aria-labelledby="terbaru">
									<SectionHeader
										id="terbaru"
										title="Terbaru"
										href={routes.latest()}
									/>
									<ul className={styles.river}>
										{river.map((article) => (
											<RiverItem
												key={article.id}
												article={article}
												now={now}
											/>
										))}
									</ul>
								</section>
							) : null}
						</div>
					}
				/>
			) : (
				<EmptyState
					title="Belum ada artikel yang terbit."
					links={[
						{
							label: 'Tentang Financial Field Indonesia',
							href: routes.about(),
						},
					]}
				/>
			)}

			{videos.length > 0 ? (
				<section className={styles.block} aria-labelledby="video">
					<SectionHeader
						id="video"
						title="Video"
						href={routes.videos()}
						linkLabel="Semua video"
					/>
					<ul className={styles.grid}>
						{videos.map((article) => (
							<li key={article.id}>
								<ArticleCard article={article} media="video" trackAs="home_video" />
							</li>
						))}
					</ul>
				</section>
			) : null}

			{categoryBlocks.map(({ category, articles }) => (
				<section
					key={category.id}
					className={styles.block}
					aria-labelledby={`topik-${category.slug}`}
				>
					<SectionHeader
						id={`topik-${category.slug}`}
						title={category.name}
						href={routes.category(category)}
					/>
					<ul className={styles.grid}>
						{articles.map((article) => (
							<li key={article.id}>
								<ArticleCard article={article} trackAs="home_category" />
							</li>
						))}
					</ul>
				</section>
			))}
		</Container>
	);
}
