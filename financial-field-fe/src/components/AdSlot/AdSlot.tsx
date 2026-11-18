import styles from './AdSlot.module.css';

export type AdSlotProps = {
	/** IAB size; only the medium rectangle is used today. */
	size?: '300x250';
};

/**
 * A reserved ad space (SPC-ui-design-system, Phase 2). The box keeps its size
 * so a future ad causes no layout shift; until an ad network is chosen it
 * shows its size and "Iklan / PR". Rendered only with FEATURE_ADS.
 */
export function AdSlot({ size = '300x250' }: AdSlotProps) {
	const [width, height] = size.split('x');
	return (
		<div className={styles.slot} role="img" aria-label="Ruang iklan">
			<span className={styles.size}>
				{width} × {height}
			</span>
			<span className="type-label">Iklan / PR</span>
		</div>
	);
}
