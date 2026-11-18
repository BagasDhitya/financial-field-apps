import Link from 'next/link';
import type { ReactNode } from 'react';

import { AdSlot } from '@/components/AdSlot/AdSlot';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { Container } from '@/components/Container/Container';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { PrLabel } from '@/components/Kicker/Kicker';
import { RiverItem } from '@/components/RiverItem/RiverItem';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { routes } from '@/lib/routes';
import type { ArticleSummary, CategoryNode, ProductSection } from '@/types';

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
	/** FEATURE_ADS: the banner under the river (ADR-0024, like financial-field.com's 【PR】 banner). */
	banner?: boolean;
	/** PR articles for "Rekomendasi" (ADR-0024); empty hides the section. */
	prArticles?: ArticleSummary[];
	/** Comparison sections for the "Bandingkan produk" tiles (FEATURE_COMPARISON); empty hides them. */
	comparisonSections?: ProductSection[];
};

/**
 * Media-first home: lead story, the widget rail, Terbaru river, the banner,
 * Video, Wawancara, "Rekomendasi" (PR), the comparison tiles, topic blocks.
 */
export function HomeView({
	heading,
	stories,
	rail,
	videos,
	interviews,
	categoryBlocks,
	now,
	banner = false,
	prArticles = [],
	comparisonSections = [],
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

			{banner ? (
				<div className={styles.banner}>
					<AdSlot
						size="320x100"
						wideSize="728x90"
						wideFrom={768}
						placement="home-banner"
					/>
				</div>
			) : null}

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

			{prArticles.length > 0 ? (
				<section
					className={styles.block}
					aria-labelledby="rekomendasi-pr"
					data-ad-placement="home-pr-articles"
				>
					<SectionHeader id="rekomendasi-pr" title="Rekomendasi" />
					<p className={`type-meta ${styles.prNote}`}>
						<PrLabel />
						Konten bersponsor dari mitra
					</p>
					<ul className={styles.grid}>
						{prArticles.map((article) => (
							<li key={article.id}>
								<ArticleCard article={article} trackAs="home_pr" />
							</li>
						))}
					</ul>
				</section>
			) : null}

			{comparisonSections.length > 0 ? (
				<section className={styles.block} aria-labelledby="bandingkan-produk">
					<SectionHeader
						id="bandingkan-produk"
						title="Bandingkan produk"
						href={routes.comparisonIndex()}
						linkLabel="Semua perbandingan"
					/>
					<ul className={styles.tiles}>
						{comparisonSections.map((section) => (
							<li key={section.id}>
								<Link
									href={routes.comparisonSection(section.slug)}
									className={styles.tile}
								>
									<span className={styles.tileTitle}>
										Bandingkan {section.name}
									</span>
									{section.description ? (
										<span className={styles.tileText}>
											{section.description}
										</span>
									) : null}
									<span className="type-meta">{section.productCount} produk</span>
								</Link>
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
