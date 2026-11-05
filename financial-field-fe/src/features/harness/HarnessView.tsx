import type { ReactNode } from 'react';

import {
	articleFixture,
	checker,
	harnessNow,
	summary,
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
import { PreviewBanner } from '@/components/PreviewBanner/PreviewBanner';
import { RiverItem } from '@/components/RiverItem/RiverItem';
import { SearchField } from '@/components/SearchField/SearchField';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { SourcesList } from '@/components/SourcesList/SourcesList';
import { SponsorDisclosure } from '@/components/SponsorDisclosure/SponsorDisclosure';
import { TagList } from '@/components/TagList/TagList';

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
			<Specimen title="Kicker / PR label">
				<Kicker category={summary().primaryCategory} />
				<Kicker category={summary().primaryCategory} isPr />
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
			<Specimen title="SearchField / EmptyState / PreviewBanner">
				<SearchField variant="full" id="harness-search" />
				<EmptyState
					title="Belum ada artikel di Pajak."
					links={[{ label: 'Artikel terbaru', href: '/terbaru' }]}
				/>
				<PreviewBanner status="fact_checked" slug="contoh" />
			</Specimen>
		</Container>
	);
}
