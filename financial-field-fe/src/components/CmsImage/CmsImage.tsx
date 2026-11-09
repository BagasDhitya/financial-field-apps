import Image from 'next/image';

import type { MediaAsset } from '@/types';

import styles from './CmsImage.module.css';

export type CmsImageProps = {
	image: MediaAsset;
	/** Responsive `sizes` for the slot the image fills (REQ-PERF-001). */
	sizes: string;
	/** Crop box. Omit to render at the asset's own ratio. */
	ratio?: '16/9' | '4/3' | '1/1';
	/**
	 * The LCP image: eager and fetchpriority=high, never lazy (REQ-PERF-002).
	 * Next 16 recommends this over the `preload` prop for hero images.
	 */
	preload?: boolean;
	/** Card images are decorative: the title link names the card (REQ-A11Y-009). */
	decorative?: boolean;
};

/**
 * next/image for a content image (MediaAsset). With `ratio` the image fills a cropped box;
 * without it, it keeps the asset's own size. Decorative images get an empty
 * alt.
 */
export function CmsImage({
	image,
	sizes,
	ratio,
	preload = false,
	decorative = false,
}: CmsImageProps) {
	const alt = decorative ? '' : (image.alternativeText ?? '');

	if (ratio) {
		return (
			<span className={styles.box} style={{ aspectRatio: ratio }}>
				<Image
					src={image.url}
					alt={alt}
					fill
					sizes={sizes}
					loading={preload ? 'eager' : 'lazy'}
					fetchPriority={preload ? 'high' : undefined}
					className={styles.cover}
				/>
			</span>
		);
	}

	return (
		<Image
			src={image.url}
			alt={alt}
			width={image.width ?? 1200}
			height={image.height ?? 675}
			sizes={sizes}
			loading={preload ? 'eager' : 'lazy'}
			fetchPriority={preload ? 'high' : undefined}
			className={styles.natural}
		/>
	);
}
