import Link from 'next/link';

import { routes } from '@/lib/routes';
import type { ArticleSummary } from '@/types';

import { DateTime } from '../DateTime/DateTime';
import { PrLabel } from '../Kicker/Kicker';

import styles from './RiverItem.module.css';

export type RiverItemProps = {
	article: ArticleSummary;
	now?: Date;
};

const NEW_WINDOW_MS = 24 * 60 * 60 * 1000;

/** One row of the "Terbaru" river: time, kicker, headline (B4, B7). */
export function RiverItem({ article, now = new Date() }: RiverItemProps) {
	if (!article.slug || !article.title) {
		return null;
	}
	const published = article.publishedAt ? new Date(article.publishedAt) : null;
	const isNew = published !== null && now.getTime() - published.getTime() < NEW_WINDOW_MS;

	return (
		<li className={styles.item}>
			<p className={`type-meta ${styles.time}`}>
				{isNew ? (
					<span className={styles.new}>
						<span className={styles.dot} aria-hidden="true" />
						Baru
					</span>
				) : null}
				<DateTime iso={article.publishedAt} format="relative" now={now} />
			</p>
			<p className={styles.line}>
				{article.articleType === 'pr_article' ? <PrLabel /> : null}
				{article.primaryCategory ? (
					<span className={`type-kicker ${styles.kicker}`}>
						{article.primaryCategory.name}
					</span>
				) : null}
			</p>
			<h3 className={styles.title}>
				<Link
					href={routes.article(article.slug)}
					data-track="select_content"
					data-content-type="river"
					data-item-id={article.id}
				>
					{article.title}
				</Link>
			</h3>
		</li>
	);
}
