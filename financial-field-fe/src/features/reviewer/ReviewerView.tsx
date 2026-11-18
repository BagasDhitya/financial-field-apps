import Link from 'next/link';

import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs/Breadcrumbs';
import { Container } from '@/components/Container/Container';
import { Icon } from '@/components/Icon/Icon';
import { PersonMark } from '@/components/PersonMark/PersonMark';
import { SectionHeader } from '@/components/SectionHeader/SectionHeader';
import { routes } from '@/lib/routes';
import type { ArticleSummary, Author } from '@/types';

import styles from './ReviewerView.module.css';

export type ReviewerViewProps = {
	reviewer: Author;
	breadcrumbs: BreadcrumbItem[];
	reviewed: ArticleSummary[];
	/** All the articles they reviewed, not just this page's cards. */
	reviewedTotal: number;
};

function Paragraphs({
	id,
	title,
	paragraphs,
}: {
	id: string;
	title: string;
	paragraphs: string[];
}) {
	if (paragraphs.length === 0) {
		return null;
	}
	return (
		<section aria-labelledby={id} className={styles.section}>
			<h2 id={id} className={styles.heading}>
				{title}
			</h2>
			<div className={styles.prose}>
				{paragraphs.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>
		</section>
	);
}

/**
 * A reviewer's profile (ADR-0022, REQ-LIST-003): who they are, their
 * background, how they think about money, and the articles they verified.
 * Writers are a team and have no page.
 */
export function ReviewerView({
	reviewer,
	breadcrumbs,
	reviewed,
	reviewedTotal,
}: ReviewerViewProps) {
	return (
		<Container className={styles.root}>
			<Breadcrumbs items={breadcrumbs} />
			<header className={styles.header}>
				<PersonMark person={reviewer} size={144} preload />
				<div className={styles.intro}>
					<p className={`type-kicker ${styles.kicker}`}>
						Peninjau{reviewer.roleTitle ? ` · ${reviewer.roleTitle}` : ''}
					</p>
					<h1 className={styles.name}>
						{reviewer.fullName}
						{reviewer.credentials ? (
							<span className={styles.credentials}>, {reviewer.credentials}</span>
						) : null}
					</h1>
					{reviewer.bio ? <p className={styles.bio}>{reviewer.bio}</p> : null}
					<p className={styles.count}>
						<Icon name="verified" size={20} />
						Telah memverifikasi {reviewedTotal} artikel
					</p>
				</div>
			</header>

			<div className={styles.body}>
				<div className={styles.main}>
					<Paragraphs
						id="latar-belakang"
						title="Latar belakang"
						paragraphs={reviewer.background}
					/>
					<Paragraphs
						id="pandangan-keuangan"
						title="Pandangan keuangan"
						paragraphs={reviewer.financialView}
					/>
				</div>
				<aside className={styles.facts} aria-label="Ringkasan profil">
					{reviewer.expertise.length > 0 ? (
						<div>
							<h2 className={`type-label ${styles.factTitle}`}>Keahlian</h2>
							<ul className={styles.chips}>
								{reviewer.expertise.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					) : null}
					{reviewer.credentials ? (
						<div>
							<h2 className={`type-label ${styles.factTitle}`}>Kredensial</h2>
							<p className={styles.fact}>{reviewer.credentials}</p>
						</div>
					) : null}
					<div>
						<h2 className={`type-label ${styles.factTitle}`}>Peran di redaksi</h2>
						<p className={styles.fact}>
							Memeriksa angka, aturan, dan saran sebelum artikel diberi tanda
							Terverifikasi. Lihat{' '}
							<Link href={routes.about('kebijakan-editorial')}>
								Kebijakan Editorial
							</Link>
							.
						</p>
					</div>
					{reviewer.sameAs.length > 0 ? (
						<div>
							<h2 className={`type-label ${styles.factTitle}`}>Tautan</h2>
							<ul className={styles.links}>
								{reviewer.sameAs.map((url) => (
									<li key={url}>
										<a href={url} rel="noopener me">
											{new URL(url).hostname.replace(/^www\./, '')}
										</a>
									</li>
								))}
							</ul>
						</div>
					) : null}
				</aside>
			</div>

			{reviewed.length > 0 ? (
				<section aria-labelledby="ditinjau">
					<SectionHeader id="ditinjau" title="Artikel yang diverifikasi" />
					<ul className={styles.grid}>
						{reviewed.map((article) => (
							<li key={article.id}>
								<ArticleCard article={article} />
							</li>
						))}
					</ul>
				</section>
			) : null}
		</Container>
	);
}
