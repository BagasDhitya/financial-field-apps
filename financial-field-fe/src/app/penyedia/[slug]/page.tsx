import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { ComparisonDisclosure } from '@/components/ComparisonDisclosure/ComparisonDisclosure';
import { Container } from '@/components/Container/Container';
import { JsonLd } from '@/components/JsonLd/JsonLd';
import { ProviderLogo } from '@/components/ProviderLogo/ProviderLogo';
import { HOME_CRUMB } from '@/lib/breadcrumbs';
import { formatRateRange, formatTenorRange, rateTypeLabel } from '@/lib/comparison/format';
import { getProductsByProvider, getProvider, isComparisonEnabled } from '@/lib/content/comparison';
import { routes } from '@/lib/routes';
import { isValidSlug } from '@/lib/security';
import { buildMetadata } from '@/lib/seo/metadata';

import styles from '@/features/comparison/ComparisonPages.module.css';
import { comparisonGraph } from '@/features/comparison/jsonld';

/** Safety-net window. Keep in sync with REVALIDATE.comparison (revalidate.test.ts). */
export const revalidate = 86400;

/** Empty list = render each path on first request, then cache it (ISR). */
export function generateStaticParams() {
	return [];
}

type Props = { params: Promise<{ slug: string }> };

const REGULATORS = {
	ojk: 'Otoritas Jasa Keuangan (OJK)',
	bi: 'Bank Indonesia',
	lainnya: 'Lainnya',
};

async function load(slug: string) {
	if (!isComparisonEnabled() || !isValidSlug(slug)) {
		notFound();
	}
	const [provider, products] = await Promise.all([
		getProvider(slug),
		getProductsByProvider(slug),
	]);
	if (!provider) {
		notFound();
	}
	return { provider, products };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const { provider, products } = await load(slug);
	return buildMetadata({
		title: `${provider.name}: produk dan profil`,
		description:
			provider.description ??
			`Produk ${provider.name} yang dapat dibandingkan di Financial Field Indonesia.`,
		path: routes.provider(provider.slug),
		image: provider.logo,
		// A provider without products is thin (REQ-SEO-053).
		noIndex: products.length === 0,
	});
}

/** /penyedia/<slug> (PRP-0002.p3 T25, REQ-CMP-009): the profile (CMS-24) and the products. */
export default async function ProviderPage({ params }: Props) {
	const { slug } = await params;
	const { provider, products } = await load(slug);
	const path = routes.provider(provider.slug);
	const trail = [
		HOME_CRUMB,
		{ label: 'Penyedia', href: routes.providers() },
		{ label: provider.name, href: path },
	];

	return (
		<Container className={styles.root}>
			<JsonLd
				data={comparisonGraph(
					path,
					trail,
					provider.name,
					provider.description ?? undefined,
				)}
			/>
			<Breadcrumbs items={trail} />
			<header className={styles.providerHead}>
				<ProviderLogo provider={provider} size="large" />
				<div className={styles.header}>
					<p className={`type-kicker ${styles.kicker}`}>Penyedia</p>
					<h1 className={styles.title}>{provider.name}</h1>
					{provider.description ? (
						<p className={styles.dek}>{provider.description}</p>
					) : null}
				</div>
			</header>
			<ComparisonDisclosure demo={provider.slug.startsWith('contoh-')} />
			<div className={styles.split}>
				<section aria-labelledby="produk">
					<h2 id="produk" className={styles.groupTitle}>
						Produk
					</h2>
					<ul className={styles.grid}>
						{products.map((product) => (
							<li key={product.id}>
								<Link href={routes.product(product.slug)} className={styles.tile}>
									<p className="type-meta">{product.section?.name}</p>
									<h3 className={styles.tileTitle}>{product.title}</h3>
									{product.loan ? (
										<p>
											Bunga {formatRateRange(product.loan)}{' '}
											{rateTypeLabel(product.loan).toLowerCase()}, tenor{' '}
											{formatTenorRange(product.loan)}
										</p>
									) : null}
								</Link>
							</li>
						))}
					</ul>
				</section>
				<aside className={styles.box} aria-labelledby="profil">
					<h2 id="profil">Profil</h2>
					<dl className={styles.facts}>
						{provider.legalName ? (
							<div>
								<dt>Nama resmi</dt>
								<dd>{provider.legalName}</dd>
							</div>
						) : null}
						{provider.regulator ? (
							<div>
								<dt>Diawasi oleh</dt>
								<dd>{REGULATORS[provider.regulator]}</dd>
							</div>
						) : null}
						{provider.licenseNumber ? (
							<div>
								<dt>Nomor izin</dt>
								<dd>{provider.licenseNumber}</dd>
							</div>
						) : null}
					</dl>
					{provider.websiteUrl ? (
						<p>
							<a href={provider.websiteUrl} target="_blank" rel="sponsored noopener">
								Situs resmi {provider.name}
								<span className="visually-hidden"> (tab baru)</span>
							</a>
						</p>
					) : null}
				</aside>
			</div>
		</Container>
	);
}
