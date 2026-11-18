import { ArticleBody } from '@/components/ArticleBody/ArticleBody';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs/Breadcrumbs';
import { Container } from '@/components/Container/Container';
import { DateTime } from '@/components/DateTime/DateTime';
import type { GlossaryGroup } from '@/lib/blocks';
import type { ArticleBody as Body } from '@/types';

import styles from './GlossaryView.module.css';

export type GlossaryViewProps = {
	title: string;
	intro: Body;
	groups: GlossaryGroup[];
	updatedAt: string | null;
	breadcrumbs: BreadcrumbItem[];
	siteOrigin: string;
};

/**
 * Kamus Keuangan (ADR-0022): a letter index, then each letter's terms as a
 * definition list. Every term has its own anchor, so articles can link to
 * `/kamus-keuangan#bunga-flat`.
 */
export function GlossaryView({
	title,
	intro,
	groups,
	updatedAt,
	breadcrumbs,
	siteOrigin,
}: GlossaryViewProps) {
	const total = groups.reduce((sum, group) => sum + group.terms.length, 0);
	return (
		<Container className={styles.root}>
			<Breadcrumbs items={breadcrumbs} />
			<header className={styles.header}>
				<h1 className={styles.title}>{title}</h1>
				<p className="type-meta">
					{total} istilah
					{updatedAt ? (
						<>
							{' · '}Terakhir diperbarui <DateTime iso={updatedAt} />
						</>
					) : null}
				</p>
				<ArticleBody body={intro} siteOrigin={siteOrigin} />
			</header>
			<nav aria-label="Huruf" className={styles.index}>
				<ul>
					{groups.map((group) => (
						<li key={group.anchor}>
							<a href={`#${group.anchor}`}>{group.letter}</a>
						</li>
					))}
				</ul>
			</nav>
			<div className={styles.groups}>
				{groups.map((group) => (
					<section
						key={group.anchor}
						aria-labelledby={group.anchor}
						className={styles.group}
					>
						<h2 id={group.anchor} className={styles.letter}>
							{group.letter}
						</h2>
						<dl className={styles.terms}>
							{group.terms.map((term) => (
								<div key={term.anchor} id={term.anchor} className={styles.term}>
									<dt>{term.term}</dt>
									<dd>{term.definition}</dd>
								</div>
							))}
						</dl>
					</section>
				))}
			</div>
		</Container>
	);
}
