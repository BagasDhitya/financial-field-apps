'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { analytics } from '@/lib/analytics/events';
import { log } from '@/lib/log';
import {
	formatDuration,
	youTubeEmbedUrl,
	youTubeThumbnailUrl,
	youTubeWatchUrl,
	type YouTubeThumbnail,
} from '@/lib/video';
import type { ArticleVideo } from '@/types';

import { Icon } from '../Icon/Icon';

import styles from './VideoPlayer.module.css';

export type VideoPlayerProps = {
	video: ArticleVideo;
	/** For the `video_start` event. */
	articleId: string;
	/** The page's LCP element: load the still eagerly (REQ-PERF-002). */
	preload?: boolean;
	sizes: string;
};

/** What the embedded player may use; nothing beyond YouTube's own embed code. */
const PLAYER_ALLOW =
	'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

/**
 * A YouTube video that loads on request (REQ-PERF-011, ADR-0019): the video's
 * still and a play button until the reader presses it, then the player from
 * youtube-nocookie.com. Nothing is requested from YouTube before that click;
 * the still comes through this site's image optimizer.
 */
export function VideoPlayer({ video, articleId, preload = false, sizes }: VideoPlayerProps) {
	const [playing, setPlaying] = useState(false);
	const [still, setStill] = useState<YouTubeThumbnail>('maxres');
	const frame = useRef<HTMLIFrameElement>(null);
	const duration = formatDuration(video.durationSeconds);

	// The button the reader pressed is gone; move focus to the player in its place.
	useEffect(() => {
		if (playing) {
			frame.current?.focus();
		}
	}, [playing]);

	if (playing) {
		return (
			<div className={styles.frame}>
				<iframe
					ref={frame}
					className={styles.player}
					src={youTubeEmbedUrl(video.id, true)}
					title={`Video: ${video.title}`}
					allow={PLAYER_ALLOW}
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
			</div>
		);
	}

	return (
		<div className={styles.frame}>
			<Image
				src={youTubeThumbnailUrl(video.id, still)}
				alt=""
				fill
				sizes={sizes}
				loading={preload ? 'eager' : 'lazy'}
				fetchPriority={preload ? 'high' : undefined}
				className={styles.still}
				onError={() => {
					// Only HD uploads have the large still; every video has `hq`.
					if (still === 'maxres') {
						log.warn('VideoPlayer::still', 'no HD still, using hq', { id: video.id });
						setStill('hq');
					}
				}}
			/>
			<button
				type="button"
				className={styles.play}
				aria-label={`Putar video: ${video.title}${duration ? ` (${duration})` : ''}`}
				onClick={() => {
					setPlaying(true);
					analytics.videoStart(youTubeWatchUrl(video.id), articleId);
				}}
			>
				<span className={styles.mark} aria-hidden="true">
					<Icon name="play" size={24} />
				</span>
				<span className={`type-label ${styles.label}`} aria-hidden="true">
					Putar video
					{duration ? <span className={styles.duration}>{duration}</span> : null}
				</span>
			</button>
		</div>
	);
}
