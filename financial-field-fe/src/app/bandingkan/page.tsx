import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { Container } from '@/components/Container/Container';
import { JsonLd } from '@/components/JsonLd/JsonLd';
import { HOME_CRUMB } from '@/lib/breadcrumbs';
import { getComparisonSections, isComparisonEnabled } from '@/lib/content/comparison';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';

import styles from '@/features/comparison/ComparisonPages.module.css';
import { comparisonGraph } from '@/features/comparison/jsonld';

/** Safety-net window. Keep in sync with REVALIDATE.comparison (revalidate.test.ts). */
export const revalidate = 86400;

const TITLE = 'Bandingkan produk keuangan';
const DESCRIPTION =
	'Bandingkan pinjaman dari bank dan perusahaan pembiayaan: bunga, plafon, tenor, dan estimasi cicilan, dengan metode yang terbuka.';

export function generateMetadata(): Metadata {
	if (!isComparisonEnabled()) {
		notFound();
	}
	return buildMetadata({
		title: TITLE,
		description: DESCRIPTION,
		path: routes.comparisonIndex(),
	});
}

/** /bandingkan (PRP-0002.p3 T20): every group with its sections, then loose sections. */
export default async function ComparisonIndexPage() {
	if (!isComparisonEnabled()) {
		notFound();
	}
	const sections = await getComparisonSections();
	const groups = sections.filter((section) => section.children.length > 0);
	const loose = sections.filter(
		(section) => section.children.length === 0 && !section.parentSlug,
	);
	const trail = [HOME_CRUMB, { label: 'Bandingkan', href: routes.comparisonIndex() }];

	return (
		<Container className={styles.root}>
			<JsonLd data={comparisonGraph(routes.comparisonIndex(), trail, TITLE, DESCRIPTION)} />
			<Breadcrumbs items={trail} />
			<header className={styles.header}>
				<h1 className={styles.title}>Bandingkan</h1>
				<p className={styles.dek}>{DESCRIPTION}</p>
				<p className="type-meta">
					Cara kami menyusun perbandingan:{' '}
					<Link href={routes.about('metodologi-perbandingan')}>
						Metodologi Perbandingan
					</Link>
				</p>
			</header>
			{groups.map((group) => (
				<section key={group.id} aria-labelledby={`grup-${group.slug}`}>
					<h2 id={`grup-${group.slug}`} className={styles.groupTitle}>
						<Link href={routes.comparisonSection(group.slug)}>{group.name}</Link>
					</h2>
					<ul className={styles.grid}>
						{sections
							.filter((section) => section.parentSlug === group.slug)
							.map((section) => (
								<li key={section.id}>
									<Link
										href={routes.comparisonSection(section.slug)}
										className={styles.tile}
									>
										<h3 className={styles.tileTitle}>{section.name}</h3>
										{section.description ? <p>{section.description}</p> : null}
										<p className="type-meta">{section.productCount} produk</p>
									</Link>
								</li>
							))}
					</ul>
				</section>
			))}
			{loose.length > 0 ? (
				<ul className={styles.grid}>
					{loose.map((section) => (
						<li key={section.id}>
							<Link
								href={routes.comparisonSection(section.slug)}
								className={styles.tile}
							>
								<h2 className={styles.tileTitle}>{section.name}</h2>
								{section.description ? <p>{section.description}</p> : null}
								<p className="type-meta">{section.productCount} produk</p>
							</Link>
						</li>
					))}
				</ul>
			) : null}
		</Container>
	);
}
