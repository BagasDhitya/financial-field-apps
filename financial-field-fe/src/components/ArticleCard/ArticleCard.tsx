import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { ArticleSummary } from '@/types';

import { CmsImage } from '../CmsImage/CmsImage';
import { DateTime } from '../DateTime/DateTime';
import { Kicker } from '../Kicker/Kicker';

import styles from './ArticleCard.module.css';

export type ArticleCardVariant = 'lead' | 'standard' | 'compact' | 'text';

export type ArticleCardProps = {
	article: ArticleSummary;
	variant?: ArticleCardVariant;
	headingLevel?: 2 | 3;
	/** Only for the page's LCP card. */
	preloadImage?: boolean;
	/** Analytics: which surface the card sits on (select_content). */
	trackAs?: string;
};

const IMAGE_SIZES: Record<ArticleCardVariant, string> = {
	lead: '(min-width: 1024px) 60vw, 100vw',
	standard: '(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
	compact: '96px',
	text: '0px',
};

/**
 * One bordered, sharp card (I1, I3). The whole card is a single link: the
 * title link stretches over it, so screen readers hear the title once.
 */
export function ArticleCard({
	article,
	variant = 'standard',
	headingLevel = 3,
	preloadImage = false,
	trackAs,
}: ArticleCardProps) {
	if (!article.slug || !article.title) {
		return null;
	}
	const Heading = headingLevel === 2 ? 'h2' : 'h3';
	const isPr = article.articleType === 'pr_article';
	const showImage = variant !== 'text' && article.featuredImage;

	return (
		<article className={`${styles.card} ${styles[variant]}`}>
			{showImage && article.featuredImage ? (
				<div className={styles.media}>
					<CmsImage
						image={article.featuredImage}
						sizes={IMAGE_SIZES[variant]}
						ratio={variant === 'compact' ? '1/1' : '16/9'}
						preload={preloadImage}
						decorative
					/>
				</div>
			) : null}
			<div className={styles.body}>
				<Kicker category={article.primaryCategory} isPr={isPr} />
				<Heading className={styles.title}>
					<Link
						href={routes.article(article.slug)}
						className={styles.titleLink}
						{...(trackAs
							? {
									'data-track': 'select_content',
									'data-content-type': trackAs,
									'data-item-id': article.id,
								}
							: {})}
					>
						{article.title}
					</Link>
				</Heading>
				{variant === 'lead' || variant === 'standard' ? (
					article.leadText ? (
						<p className={styles.dek}>{article.leadText}</p>
					) : null
				) : null}
				<p className={`type-meta ${styles.meta}`}>
					{variant === 'lead' && article.author ? (
						<span>{article.author.fullName}</span>
					) : null}
					<DateTime iso={article.publishedAt} />
				</p>
			</div>
		</article>
	);
}
