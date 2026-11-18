import type { ReactNode } from 'react';

import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { Container } from '@/components/Container/Container';
import { EmptyState } from '@/components/EmptyState/EmptyState';
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
	/**
	 * The rail beside the lead (ADR-0022): the loan finder, the PR spot and the
	 * newsletter box, each already gated by its flag. Empty puts the river there.
	 */
	rail: ReactNode[];
	/** Articles with a video, not already above (REQ-HOME-005); empty hides the section. */
	videos: ArticleSummary[];
	/** Interviews, not already above (REQ-HOME-006); empty hides the section. */
	interviews: ArticleSummary[];
	categoryBlocks: CategoryBlock[];
	now: Date;
};

/** Media-first home: lead story, the widget rail, Terbaru river, Video, Wawancara, topic blocks. */
export function HomeView({
	heading,
	stories,
	rail,
	videos,
	interviews,
	categoryBlocks,
	now,
}: HomeViewProps) {
	const { lead, river } = stories;
	const hasRail = rail.length > 0;

	return (
		<Container className={styles.root}>
			<h1 className="visually-hidden">{heading}</h1>

			{lead ? (
				<div className={hasRail ? styles.top : styles.topNoRail}>
					<div className={styles.lead}>
						<ArticleCard article={lead} variant="lead" headingLevel={2} preloadImage />
					</div>
					{hasRail ? (
						<aside
							className={styles.rail}
							aria-label="Bandingkan, sponsor, dan newsletter"
						>
							{rail}
						</aside>
					) : null}
					{river.length > 0 ? (
						<section className={styles.riverBlock} aria-labelledby="terbaru">
							<SectionHeader id="terbaru" title="Terbaru" href={routes.latest()} />
							<ul className={styles.river}>
								{river.map((article) => (
									<RiverItem key={article.id} article={article} now={now} />
								))}
							</ul>
						</section>
					) : null}
				</div>
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

			{interviews.length > 0 ? (
				<section className={styles.block} aria-labelledby="wawancara">
					<SectionHeader
						id="wawancara"
						title="Wawancara"
						href={routes.interviews()}
						linkLabel="Semua wawancara"
					/>
					<ul className={styles.grid}>
						{interviews.map((article) => (
							<li key={article.id}>
								<ArticleCard article={article} trackAs="home_interview" />
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
