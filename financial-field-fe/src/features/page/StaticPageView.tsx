import type { ReactNode } from 'react';

import { ArticleBody } from '@/components/ArticleBody/ArticleBody';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs/Breadcrumbs';
import { Container } from '@/components/Container/Container';
import { DateTime } from '@/components/DateTime/DateTime';
import type { StaticPage } from '@/types';

import styles from './StaticPageView.module.css';

export type StaticPageViewProps = {
	page: StaticPage;
	breadcrumbs: BreadcrumbItem[];
	siteOrigin: string;
	children?: ReactNode;
};

/** Trust and legal pages (REQ-PAGE-001). */
export function StaticPageView({ page, breadcrumbs, siteOrigin, children }: StaticPageViewProps) {
	return (
		<Container className={styles.root}>
			<Breadcrumbs items={breadcrumbs} />
			<article className={styles.article}>
				<h1 className={styles.title}>{page.title}</h1>
				{page.updatedAt ? (
					<p className="type-meta">
						Terakhir diperbarui <DateTime iso={page.updatedAt} />
					</p>
				) : null}
				<ArticleBody body={page.body} siteOrigin={siteOrigin} />
				{children}
			</article>
		</Container>
	);
}
