import { ArticleAnalytics } from '@/components/ArticleAnalytics/ArticleAnalytics';
import { ArticleBody } from '@/components/ArticleBody/ArticleBody';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { AuthorBox } from '@/components/AuthorBox/AuthorBox';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs/Breadcrumbs';
import { Byline } from '@/components/Byline/Byline';
import { CmsImage } from '@/components/CmsImage/CmsImage';
import { Container } from '@/components/Container/Container';
import { CorrectionNotice } from '@/components/CorrectionNotice/CorrectionNotice';
import { FaqList } from '@/components/FaqList/FaqList';
import { GoldenSplit } from '@/components/GoldenSplit/GoldenSplit';
import { KeyTakeaways } from '@/components/KeyTakeaways/KeyTakeaways';
import { Kicker } from '@/components/Kicker/Kicker';
import { PreviewBanner } from '@/components/PreviewBanner/PreviewBanner';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { ShareBar } from '@/components/ShareBar/ShareBar';
import { SourcesList } from '@/components/SourcesList/SourcesList';
import { SponsorDisclosure } from '@/components/SponsorDisclosure/SponsorDisclosure';
import { TagList } from '@/components/TagList/TagList';
import type { ArticleEventParams } from '@/lib/analytics/events';
import type { Article, ArticleSummary, EditorialStatus } from '@/types';

import styles from './ArticleView.module.css';

export type ArticleViewProps = {
	article: Article;
	related: ArticleSummary[];
	breadcrumbs: BreadcrumbItem[];
	url: string;
	siteOrigin: string;
	readingMinutes: number;
	defaultPrDisclosure: string;
	analyticsParams: ArticleEventParams | null;
	preview: { status: EditorialStatus | null } | null;
};

/** Article template (REQ-ART-001…011). Order follows SPC-functional §6. */
export function ArticleView({
	article,
	related,
	breadcrumbs,
	url,
	siteOrigin,
	readingMinutes,
	defaultPrDisclosure,
	analyticsParams,
	preview,
}: ArticleViewProps) {
	const isPr = article.articleType === 'pr_article';
	const reviewed = article.reviewer !== null && article.lastReviewedAt !== null;

	return (
		<>
			{preview ? <PreviewBanner status={preview.status} slug={article.slug} /> : null}
			<Container className={styles.root}>
				<Breadcrumbs items={breadcrumbs} />
				<article className={styles.article}>
					<header className={styles.header}>
						<Kicker category={article.primaryCategory} isPr={isPr} />
						<h1 className={styles.title}>{article.title}</h1>
						{article.leadText ? <p className={styles.dek}>{article.leadText}</p> : null}
						<Byline
							author={article.author}
							reviewer={article.reviewer}
							lastReviewedAt={article.lastReviewedAt}
							publishedAt={article.publishedAt}
							contentUpdatedAt={article.contentUpdatedAt}
							readingMinutes={readingMinutes}
						/>
					</header>

					{article.featuredImage ? (
						<figure className={styles.hero}>
							<CmsImage
								image={article.featuredImage}
								sizes="(min-width: 1280px) 77rem, 100vw"
								ratio="16/9"
								preload
							/>
						</figure>
					) : null}

					<GoldenSplit
						railLabel="Artikel terkait"
						main={
							<div className={styles.main}>
								{isPr ? (
									<SponsorDisclosure
										sponsor={article.sponsor}
										defaultText={defaultPrDisclosure}
									/>
								) : null}
								<KeyTakeaways items={article.keyTakeaways} />
								<div className={styles.bodyWrap}>
									<ArticleBody
										body={article.body}
										siteOrigin={siteOrigin}
										sponsored={isPr}
									/>
									{analyticsParams ? (
										<ArticleAnalytics params={analyticsParams} />
									) : null}
								</div>
								<FaqList items={article.faq} />
								<CorrectionNotice corrections={article.corrections} />
								<SourcesList sources={article.sources} />
								<TagList tags={article.tags} />
								<ShareBar url={url} title={article.title} articleId={article.id} />
								<div className={styles.people}>
									{article.author ? (
										<AuthorBox person={article.author} role="Penulis" />
									) : null}
									{reviewed && article.reviewer ? (
										<AuthorBox person={article.reviewer} role="Peninjau" />
									) : null}
								</div>
							</div>
						}
						rail={
							related.length > 0 ? (
								<section
									aria-labelledby="artikel-terkait"
									className={styles.related}
								>
									<SectionHeader id="artikel-terkait" title="Artikel terkait" />
									<ul className={styles.relatedList}>
										{related.map((item) => (
											<li key={item.id}>
												<ArticleCard
													article={item}
													variant="compact"
													trackAs="related_article"
												/>
											</li>
										))}
									</ul>
								</section>
							) : null
						}
					/>
				</article>
			</Container>
		</>
	);
}
