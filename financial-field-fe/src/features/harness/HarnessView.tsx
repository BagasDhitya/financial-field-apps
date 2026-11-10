import type { ReactNode } from 'react';

import {
	articleFixture,
	checker,
	harnessNow,
	summary,
	videoFixture,
	writer,
} from '@/components/__fixtures__/domain';
import { ArticleBody } from '@/components/ArticleBody/ArticleBody';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { Byline } from '@/components/Byline/Byline';
import { Container } from '@/components/Container/Container';
import { CorrectionNotice } from '@/components/CorrectionNotice/CorrectionNotice';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { FaqList } from '@/components/FaqList/FaqList';
import { KeyTakeaways } from '@/components/KeyTakeaways/KeyTakeaways';
import { Kicker, PrLabel } from '@/components/Kicker/Kicker';
import { Pagination } from '@/components/Pagination/Pagination';
import { RiverItem } from '@/components/RiverItem/RiverItem';
import { SearchField } from '@/components/SearchField/SearchField';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { SourcesList } from '@/components/SourcesList/SourcesList';
import { SponsorDisclosure } from '@/components/SponsorDisclosure/SponsorDisclosure';
import { TagList } from '@/components/TagList/TagList';
import { VideoEmbed } from '@/components/VideoEmbed/VideoEmbed';

import styles from './HarnessView.module.css';

function Specimen({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className={styles.specimen} aria-label={title}>
			<h2 className={`type-label ${styles.title}`}>{title}</h2>
			{children}
		</section>
	);
}

/** Component harness (conventions W9): every variant and state in one place. */
export function HarnessView() {
	const pr = summary({
		id: 'pr',
		articleType: 'pr_article',
		title: 'Contoh artikel bersponsor',
	});
	const noImage = summary({
		id: 'noimg',
		author: null,
		primaryCategory: null,
		title: 'Kartu tanpa gambar, penulis, dan kategori',
	});
	const withVideo = (id: string, title: string) =>
		summary({
			id,
			title,
			video: { provider: videoFixture.provider, id: videoFixture.id },
			featuredImage: {
				url: '/images/kategori/pajak.png',
				alternativeText: null,
				width: 1600,
				height: 900,
				mime: 'image/png',
			},
		});

	return (
		<Container className={styles.root}>
			<h1>Harness komponen</h1>
			<Specimen title="ArticleCard — lead / standard / compact / text">
				<div className={styles.cards}>
					<ArticleCard article={summary()} variant="lead" headingLevel={2} />
					<ArticleCard article={summary({ id: 's' })} />
					<ArticleCard article={pr} />
					<ArticleCard article={noImage} />
					<ArticleCard article={summary({ id: 'c' })} variant="compact" />
					<ArticleCard article={summary({ id: 't' })} variant="text" />
				</div>
			</Specimen>
			<Specimen title="ArticleCard — video: featured image + mark / still / compact / text">
				<div className={styles.cards}>
					<ArticleCard article={withVideo('v1', 'Artikel dengan video di daftar')} />
					<ArticleCard
						article={withVideo('v2', 'Artikel dengan video di bagian Video')}
						media="video"
					/>
					<ArticleCard
						article={withVideo('v3', 'Video, kartu ringkas')}
						variant="compact"
					/>
					<ArticleCard article={withVideo('v4', 'Video, kartu teks')} variant="text" />
				</div>
			</Specimen>
			<Specimen title="VideoEmbed — still and play button; the player loads on click">
				<VideoEmbed video={videoFixture} articleId="harness" />
			</Specimen>
			<Specimen title="Kicker / PR label / Video label">
				<Kicker category={summary().primaryCategory} />
				<Kicker category={summary().primaryCategory} isPr />
				<Kicker category={summary().primaryCategory} isVideo />
				<PrLabel size="large" />
			</Specimen>
			<Specimen title="RiverItem">
				<ul className={styles.plain}>
					<RiverItem article={summary()} now={harnessNow} />
					<RiverItem
						article={summary({
							id: 'old',
							publishedAt: '2026-10-20T03:00:00Z',
						})}
						now={harnessNow}
					/>
					<RiverItem article={pr} now={harnessNow} />
					<RiverItem article={withVideo('rv', 'Baris dengan video')} now={harnessNow} />
				</ul>
			</Specimen>
			<Specimen title="SectionHeader">
				<SectionHeader title="Terbaru" href="/terbaru" />
			</Specimen>
			<Specimen title="Byline — with and without reviewer">
				<Byline
					author={writer}
					reviewer={checker}
					lastReviewedAt={articleFixture.lastReviewedAt}
					publishedAt="2026-10-01T03:00:00Z"
					contentUpdatedAt="2026-11-02T03:00:00Z"
					readingMinutes={4}
				/>
				<Byline
					author={writer}
					reviewer={checker}
					lastReviewedAt={null}
					publishedAt="2026-10-01T03:00:00Z"
					contentUpdatedAt={null}
					readingMinutes={1}
				/>
			</Specimen>
			<Specimen title="Article extras">
				<SponsorDisclosure
					sponsor={{
						name: 'Sponsor Contoh',
						url: 'https://example.com',
						disclosure: null,
					}}
					defaultText="Artikel ini adalah konten bersponsor."
				/>
				<KeyTakeaways items={articleFixture.keyTakeaways} />
				<ArticleBody body={articleFixture.body} siteOrigin="http://localhost:3000" />
				<FaqList items={articleFixture.faq} />
				<CorrectionNotice corrections={articleFixture.corrections} />
				<SourcesList sources={articleFixture.sources} />
				<TagList tags={articleFixture.tags} />
			</Specimen>
			<Specimen title="Breadcrumbs / Pagination">
				<Breadcrumbs
					items={[
						{ label: 'Beranda', href: '/' },
						{ label: 'Pajak', href: '/kategori/pajak' },
						{ label: 'Artikel', href: '/artikel/x' },
					]}
				/>
				<Pagination page={4} pageCount={9} hrefFor={(page) => `/terbaru/halaman/${page}`} />
			</Specimen>
			<Specimen title="SearchField / EmptyState">
				<SearchField variant="full" id="harness-search" />
				<EmptyState
					title="Belum ada artikel di Pajak."
					links={[{ label: 'Artikel terbaru', href: '/terbaru' }]}
				/>
			</Specimen>
		</Container>
	);
}
