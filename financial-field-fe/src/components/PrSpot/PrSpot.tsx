import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { ArticleSummary } from '@/types';

import { AdSlot } from '../AdSlot/AdSlot';
import { PrLabel } from '../Kicker/Kicker';

import styles from './PrSpot.module.css';

export type PrSpotProps = {
	/** The newest PR article (`article_type = pr_article`), or null for the ad space only. */
	article: ArticleSummary | null;
};

/**
 * The rail's sponsored spot (ADR-0022): the newest PR article, labelled PR on
 * every surface (REQ-ART-003), above a reserved 300×250 ad space.
 */
export function PrSpot({ article }: PrSpotProps) {
	return (
		<section className={styles.root} aria-label="Konten bersponsor">
			{article ? (
				<div className={styles.text}>
					<p className={styles.heading}>
						<PrLabel />
						<Link
							href={routes.article(article.slug)}
							className={styles.title}
							data-track="select_content"
							data-content-type="home_pr"
							data-item-id={article.id}
						>
							{article.title}
						</Link>
					</p>
					{article.leadText ? <p className={styles.lead}>{article.leadText}</p> : null}
				</div>
			) : null}
			<AdSlot />
		</section>
	);
}
