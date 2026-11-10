import { youTubeWatchUrl } from '@/lib/video';
import type { ArticleVideo } from '@/types';

import { DateTime } from '../DateTime/DateTime';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

import styles from './VideoEmbed.module.css';

export type VideoEmbedProps = {
	video: ArticleVideo;
	articleId: string;
	/** PR articles: every outbound link is `rel="sponsored"` (REQ-SEO-024). */
	sponsored?: boolean;
};

/**
 * The video at the top of an article, in place of the featured image
 * (REQ-ART-012): the player, the editor's caption, and a credit with the
 * video's title, channel, date and a link to it on YouTube. The link works
 * without JavaScript.
 */
export function VideoEmbed({ video, articleId, sponsored = false }: VideoEmbedProps) {
	return (
		<figure className={styles.root}>
			<VideoPlayer
				video={video}
				articleId={articleId}
				sizes="(min-width: 1280px) 77rem, 100vw"
				preload
			/>
			<figcaption className={styles.caption}>
				{video.caption ? <p className={styles.text}>{video.caption}</p> : null}
				{/* The spaces between the parts are where a narrow screen breaks the line. */}
				<p className={`type-meta ${styles.credit}`}>
					<span>“{video.title}”</span>{' '}
					{video.channelName ? <span>{video.channelName}</span> : null}{' '}
					{video.uploadedAt ? (
						<span>
							<DateTime iso={video.uploadedAt} />
						</span>
					) : null}{' '}
					<span>
						<a
							href={youTubeWatchUrl(video.id)}
							rel={sponsored ? 'sponsored noopener' : 'noopener'}
							className={styles.link}
						>
							Tonton di YouTube
						</a>
					</span>
				</p>
			</figcaption>
		</figure>
	);
}
