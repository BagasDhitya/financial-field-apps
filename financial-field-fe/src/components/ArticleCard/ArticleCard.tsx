import Link from 'next/link';

import { routes } from '@/lib/routes';
import { YOUTUBE_THUMBNAILS, youTubeThumbnailUrl } from '@/lib/video';
import type { ArticleSummary, MediaAsset } from '@/types';

import { CmsImage } from '../CmsImage/CmsImage';
import { DateTime } from '../DateTime/DateTime';
import { Icon } from '../Icon/Icon';
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
	/**
	 * `video`: a video article shows the video's still instead of its featured
	 * image (the Video section and /video). Elsewhere it keeps the featured
	 * image and gets the play mark.
	 */
	media?: 'image' | 'video';
};

const IMAGE_SIZES: Record<ArticleCardVariant, string> = {
	lead: '(min-width: 1024px) 60vw, 100vw',
	standard: '(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
	compact: '96px',
	text: '0px',
};

/**
 * The video's still as a card image: `hq`, which every video has, cropped to the
 * card (the crop removes its letterbox bars). Served through the optimizer.
 */
function videoStill(id: string): MediaAsset {
	return {
		url: youTubeThumbnailUrl(id, 'hq'),
		alternativeText: null,
		width: YOUTUBE_THUMBNAILS.hq.width,
		height: YOUTUBE_THUMBNAILS.hq.height,
		mime: 'image/jpeg',
	};
}

/**
 * One bordered, sharp card (I1, I3). The whole card is a single link: the
 * title link stretches over it, so screen readers hear the title once (with
 * "video" when the article has one).
 */
export function ArticleCard({
	article,
	variant = 'standard',
	headingLevel = 3,
	preloadImage = false,
	trackAs,
	media = 'image',
}: ArticleCardProps) {
	if (!article.slug || !article.title) {
		return null;
	}
	const Heading = headingLevel === 2 ? 'h2' : 'h3';
	const isPr = article.articleType === 'pr_article';
	const image =
		media === 'video' && article.video ? videoStill(article.video.id) : article.featuredImage;
	const showImage = variant !== 'text' && image;

	return (
		<article className={`${styles.card} ${styles[variant]}`}>
			{showImage && image ? (
				<div className={styles.media}>
					<div className={styles.frame}>
						<CmsImage
							image={image}
							sizes={IMAGE_SIZES[variant]}
							ratio={variant === 'compact' ? '1/1' : '16/9'}
							preload={preloadImage}
							decorative
						/>
						{article.video ? (
							<span className={styles.video} aria-hidden="true">
								<Icon name="play" size={16} />
								{variant === 'compact' ? null : (
									<span className="type-label">Video</span>
								)}
							</span>
						) : null}
					</div>
				</div>
			) : null}
			<div className={styles.body}>
				<Kicker
					category={article.primaryCategory}
					isPr={isPr}
					isVideo={article.video !== null && !showImage}
				/>
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
						{article.video ? <span className="visually-hidden"> (video)</span> : null}
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
