import type { AdPlacement, AdSize } from '@/lib/ads';

import styles from './AdSlot.module.css';

export type AdSlotProps = {
	/** IAB size (SPC-ui-design-system §AdSlot). */
	size?: AdSize;
	/** A second size on wider screens (the article rail's 300×600, the home banner's 728×90). */
	wideSize?: AdSize;
	/** Where `wideSize` starts: 1280 px (default) or 768 px. */
	wideFrom?: 768 | 1280;
	/** Where it sits; becomes `data-ad-placement` for later analytics (ADR-0024). */
	placement: AdPlacement;
};

function SizeText({ size, className }: { size: AdSize; className?: string }) {
	const [width, height] = size.split('x');
	return (
		<span className={className ? `${styles.size} ${className}` : styles.size}>
			{width} × {height}
		</span>
	);
}

/**
 * A reserved ad space (SPC-ui-design-system, ADR-0024). The box keeps its size
 * so a future ad causes no layout shift; until an ad network is chosen it
 * shows its size and "Iklan / PR". Rendered only with FEATURE_ADS.
 */
export function AdSlot({ size = '300x250', wideSize, wideFrom = 1280, placement }: AdSlotProps) {
	const sizeClass = styles[`s${size}`];
	const wideClass = wideSize ? styles[`wide${wideSize}`] : '';
	const fromClass = wideSize && wideFrom === 768 ? styles.from768 : '';
	return (
		<div
			className={[styles.slot, sizeClass, wideClass, fromClass].filter(Boolean).join(' ')}
			role="img"
			aria-label="Ruang iklan"
			data-ad-placement={placement}
			data-ad-size={wideSize ? `${size} ${wideSize}` : size}
		>
			{wideSize ? (
				<>
					<SizeText size={size} className={styles.narrowOnly} />
					<SizeText size={wideSize} className={styles.wideOnly} />
				</>
			) : (
				<SizeText size={size} />
			)}
			<span className="type-label">Iklan / PR</span>
		</div>
	);
}
