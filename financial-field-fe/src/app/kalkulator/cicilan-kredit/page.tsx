import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { Container } from '@/components/Container/Container';
import { InstallmentCalculator } from '@/components/InstallmentCalculator/InstallmentCalculator';
import { JsonLd } from '@/components/JsonLd/JsonLd';
import { HOME_CRUMB } from '@/lib/breadcrumbs';
import { isComparisonEnabled } from '@/lib/content/comparison';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';

import styles from '@/features/comparison/ComparisonPages.module.css';
import { comparisonGraph } from '@/features/comparison/jsonld';

const TITLE = 'Kalkulator cicilan kredit';
const DESCRIPTION =
	'Hitung cicilan per bulan, total bunga, dan jadwal angsuran untuk bunga flat atau efektif.';

export function generateMetadata(): Metadata {
	if (!isComparisonEnabled()) {
		notFound();
	}
	return buildMetadata({ title: TITLE, description: DESCRIPTION, path: routes.calculator() });
}

/** /kalkulator/cicilan-kredit (PRP-0002.p3 T26): static page, the calculator is a client island. */
export default function CalculatorPage() {
	if (!isComparisonEnabled()) {
		notFound();
	}
	const trail = [HOME_CRUMB, { label: 'Kalkulator Cicilan Kredit', href: routes.calculator() }];
	return (
		<Container className={styles.root}>
			<JsonLd data={comparisonGraph(routes.calculator(), trail, TITLE, DESCRIPTION)} />
			<Breadcrumbs items={trail} />
			<header className={styles.header}>
				<p className={`type-kicker ${styles.kicker}`}>Kalkulator</p>
				<h1 className={styles.title}>Cicilan Kredit</h1>
				<p className={styles.dek}>{DESCRIPTION}</p>
			</header>
			<InstallmentCalculator />
			<aside className={styles.box} aria-labelledby="catatan">
				<h2 id="catatan">Catatan</h2>
				<p>
					Hasil kalkulator adalah ilustrasi. Cicilan sebenarnya bergantung pada penawaran
					penyedia, termasuk provisi, administrasi, dan asuransi. Perbedaan bunga flat dan
					efektif dijelaskan di{' '}
					<Link href={routes.article('bunga-flat-dan-bunga-efektif')}>
						bunga flat dan bunga efektif
					</Link>
					.
				</p>
				<ul className={styles.links}>
					<li>
						<Link href={routes.comparisonIndex()}>Bandingkan penawaran</Link>
					</li>
					<li>
						<Link href={routes.glossary()}>Kamus Keuangan</Link>
					</li>
				</ul>
			</aside>
		</Container>
	);
}
