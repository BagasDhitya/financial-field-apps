import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { Container } from '@/components/Container/Container';
import { JsonLd } from '@/components/JsonLd/JsonLd';
import { ProviderLogo } from '@/components/ProviderLogo/ProviderLogo';
import { HOME_CRUMB } from '@/lib/breadcrumbs';
import { getProviders, isComparisonEnabled } from '@/lib/content/comparison';
import { routes } from '@/lib/routes';
import { buildMetadata } from '@/lib/seo/metadata';

import styles from '@/features/comparison/ComparisonPages.module.css';
import { comparisonGraph } from '@/features/comparison/jsonld';

/** Safety-net window. Keep in sync with REVALIDATE.comparison (revalidate.test.ts). */
export const revalidate = 86400;

const TITLE = 'Penyedia';
const DESCRIPTION =
	'Bank dan perusahaan pembiayaan yang produknya ada di halaman Bandingkan, dari A sampai Z.';

export function generateMetadata(): Metadata {
	if (!isComparisonEnabled()) {
		notFound();
	}
	return buildMetadata({ title: TITLE, description: DESCRIPTION, path: routes.providers() });
}

/** /penyedia (PRP-0002.p3 T25): providers with at least one product, A–Z. */
export default async function ProvidersPage() {
	if (!isComparisonEnabled()) {
		notFound();
	}
	const providers = await getProviders();
	const trail = [HOME_CRUMB, { label: TITLE, href: routes.providers() }];

	return (
		<Container className={styles.root}>
			<JsonLd data={comparisonGraph(routes.providers(), trail, TITLE, DESCRIPTION)} />
			<Breadcrumbs items={trail} />
			<header className={styles.header}>
				<h1 className={styles.title}>{TITLE}</h1>
				<p className={styles.dek}>{DESCRIPTION}</p>
			</header>
			<ul className={styles.grid}>
				{providers.map((provider) => (
					<li key={provider.id}>
						<Link href={routes.provider(provider.slug)} className={styles.tile}>
							<span className={styles.tileHead}>
								<ProviderLogo provider={provider} />
								<h2 className={styles.tileTitle}>{provider.name}</h2>
							</span>
							<p className="type-meta">{provider.productCount} produk</p>
						</Link>
					</li>
				))}
			</ul>
		</Container>
	);
}
