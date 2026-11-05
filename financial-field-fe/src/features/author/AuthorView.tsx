import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs/Breadcrumbs';
import { CmsImage } from '@/components/CmsImage/CmsImage';
import { Container } from '@/components/Container/Container';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import type { ArticleSummary, Author } from '@/types';

import styles from './AuthorView.module.css';

export type AuthorViewProps = {
	author: Author;
	breadcrumbs: BreadcrumbItem[];
	written: ArticleSummary[];
	reviewed: ArticleSummary[];
};

function ArticleGrid({
	id,
	title,
	articles,
}: {
	id: string;
	title: string;
	articles: ArticleSummary[];
}) {
	if (articles.length === 0) {
		return null;
	}
	return (
		<section aria-labelledby={id}>
			<SectionHeader id={id} title={title} />
			<ul className={styles.grid}>
				{articles.map((article) => (
					<li key={article.id}>
						<ArticleCard article={article} />
					</li>
				))}
			</ul>
		</section>
	);
}

/** Author profile: who they are and what they wrote or reviewed (REQ-LIST-003). */
export function AuthorView({ author, breadcrumbs, written, reviewed }: AuthorViewProps) {
	return (
		<Container className={styles.root}>
			<Breadcrumbs items={breadcrumbs} />
			<header className={styles.header}>
				{author.avatar ? (
					<span className={styles.avatar}>
						<CmsImage image={author.avatar} sizes="144px" ratio="1/1" preload />
					</span>
				) : null}
				<div className={styles.intro}>
					<h1 className={styles.name}>
						{author.fullName}
						{author.credentials ? (
							<span className={styles.credentials}>, {author.credentials}</span>
						) : null}
					</h1>
					{author.roleTitle ? <p className="type-kicker">{author.roleTitle}</p> : null}
					{author.bio ? <p className={styles.bio}>{author.bio}</p> : null}
					{author.expertise.length > 0 ? (
						<p className="type-meta">Keahlian: {author.expertise.join(', ')}</p>
					) : null}
					{author.sameAs.length > 0 ? (
						<ul className={styles.links}>
							{author.sameAs.map((url) => (
								<li key={url}>
									<a href={url} rel="noopener me">
										{new URL(url).hostname.replace(/^www\./, '')}
									</a>
								</li>
							))}
						</ul>
					) : null}
				</div>
			</header>
			<ArticleGrid id="ditulis" title="Artikel yang ditulis" articles={written} />
			<ArticleGrid id="ditinjau" title="Artikel yang ditinjau" articles={reviewed} />
		</Container>
	);
}
