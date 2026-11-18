import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AdSlot } from '@/components/AdSlot/AdSlot';
import { ArticleBody } from '@/components/ArticleBody/ArticleBody';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { ComparisonDisclosure } from '@/components/ComparisonDisclosure/ComparisonDisclosure';
import { Container } from '@/components/Container/Container';
import { DateTime } from '@/components/DateTime/DateTime';
import { JsonLd } from '@/components/JsonLd/JsonLd';
import { PrLabel } from '@/components/Kicker/Kicker';
import { LeadRelayForm } from '@/components/LeadRelayForm/LeadRelayForm';
import { OutboundLink } from '@/components/OutboundLink/OutboundLink';
import { ProviderLogo } from '@/components/ProviderLogo/ProviderLogo';
import { HOME_CRUMB } from '@/lib/breadcrumbs';
import {
	formatAmountRange,
	formatPercent,
	formatRateRange,
	formatTenorRange,
	rateTypeLabel,
} from '@/lib/comparison/format';
import {
	getComparisonSection,
	getProduct,
	getProductsInSection,
	isComparisonEnabled,
} from '@/lib/content/comparison';
import { env } from '@/lib/env';
import { features } from '@/lib/features';
import { formatRupiah } from '@/lib/format';
import { leadProductOf } from '@/lib/lead';
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

async function load(slug: string) {
	if (!isComparisonEnabled() || !isValidSlug(slug)) {
		notFound();
	}
	const product = await getProduct(slug);
	if (!product) {
		notFound();
	}
	return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const product = await load(slug);
	return buildMetadata({
		title: `${product.title} dari ${product.provider.name}`,
		description:
			product.summary ??
			`${product.title} dari ${product.provider.name}: bunga, plafon, tenor, dan syarat.`,
		path: routes.product(product.slug),
		seo: product.seo,
		image: product.image,
	});
}

/** /produk/<slug> (PRP-0002.p3 T24, REQ-CMP-008): the facts, features, link out and siblings. */
export default async function ProductPage({ params }: Props) {
	const { slug } = await params;
	const product = await load(slug);
	const sectionSlug = product.section?.slug ?? '';
	const [section, siblings] = await Promise.all([
		sectionSlug ? getComparisonSection(sectionSlug) : Promise.resolve(null),
		sectionSlug ? getProductsInSection(sectionSlug) : Promise.resolve([]),
	]);
	const path = routes.product(product.slug);
	const trail = [
		HOME_CRUMB,
		{ label: 'Bandingkan', href: routes.comparisonIndex() },
		...(section ? [{ label: section.name, href: routes.comparisonSection(section.slug) }] : []),
		{ label: product.title, href: path },
	];
	const loan = product.loan;
	const others = siblings.filter((sibling) => sibling.id !== product.id).slice(0, 6);

	return (
		<Container className={styles.root}>
			<JsonLd
				data={comparisonGraph(
					path,
					trail,
					`${product.title} dari ${product.provider.name}`,
					product.summary ?? undefined,
				)}
			/>
			<Breadcrumbs items={trail} />
			<header className={styles.providerHead}>
				<ProviderLogo provider={product.provider} size="large" />
				<div className={styles.header}>
					<p className={`type-kicker ${styles.kicker}`}>
						<Link href={routes.provider(product.provider.slug)}>
							{product.provider.name}
						</Link>
						{/* CMS-25 `is_partner`: a commercial tie is always shown (ADR-0024). */}
						{product.isPartner ? <PrLabel /> : null}
					</p>
					<h1 className={styles.title}>{product.title}</h1>
					{product.summary ? <p className={styles.dek}>{product.summary}</p> : null}
					{product.dataCheckedAt ? (
						<p className="type-meta">
							Data diperiksa <DateTime iso={product.dataCheckedAt} />
							{product.sourceUrl ? (
								<>
									{' '}
									dari{' '}
									<a
										href={product.sourceUrl}
										rel="noopener nofollow"
										target="_blank"
									>
										halaman resmi penyedia
									</a>
								</>
							) : null}
						</p>
					) : null}
				</div>
			</header>
			<ComparisonDisclosure demo={product.provider.slug.startsWith('contoh-')} />
			<div className={styles.split}>
				<div className={styles.box}>
					<h2>Ringkasan produk</h2>
					<dl className={styles.facts}>
						{loan ? (
							<>
								<div>
									<dt>Bunga per tahun</dt>
									<dd>
										{formatRateRange(loan)} ({rateTypeLabel(loan).toLowerCase()}
										)
									</dd>
								</div>
								<div>
									<dt>Plafon</dt>
									<dd>{formatAmountRange(loan)}</dd>
								</div>
								<div>
									<dt>Tenor</dt>
									<dd>{formatTenorRange(loan)}</dd>
								</div>
								{loan.downPaymentMin !== null ? (
									<div>
										<dt>Uang muka minimum</dt>
										<dd>{formatPercent(loan.downPaymentMin)}</dd>
									</div>
								) : null}
								{loan.maxFinancing !== null ? (
									<div>
										<dt>Pembiayaan maksimum</dt>
										<dd>
											{formatPercent(loan.maxFinancing)} dari taksiran
											kendaraan
										</dd>
									</div>
								) : null}
								{loan.fees ? (
									<div>
										<dt>Biaya lain</dt>
										<dd>{loan.fees}</dd>
									</div>
								) : null}
							</>
						) : null}
						<div>
							<dt>Penghasilan minimum</dt>
							<dd>
								{product.minIncome
									? `${formatRupiah(product.minIncome)} per bulan`
									: 'Tidak disebutkan'}
							</dd>
						</div>
						{product.annualFeeText ? (
							<div>
								<dt>Iuran tahunan</dt>
								<dd>{product.annualFeeText}</dd>
							</div>
						) : null}
					</dl>
					<div className={styles.ctaRow}>
						{product.officialUrl && sectionSlug ? (
							<OutboundLink
								href={product.officialUrl}
								section={sectionSlug}
								productSlug={product.slug}
								providerName={product.provider.name}
							/>
						) : null}
						{/* ADR-0025: the relay form, next to the outbound button. */}
						<LeadRelayForm product={leadProductOf(product)} />
					</div>
				</div>
				<aside className={styles.box} aria-labelledby="langkah">
					<h2 id="langkah">Langkah berikutnya</h2>
					<ul className={styles.links}>
						{section ? (
							<li>
								<Link href={routes.comparisonSection(section.slug)}>
									Bandingkan dengan produk {section.name} lain
								</Link>
							</li>
						) : null}
						<li>
							<Link href={routes.calculator()}>Hitung cicilan sendiri</Link>
						</li>
						<li>
							<Link href={routes.provider(product.provider.slug)}>
								Tentang {product.provider.name}
							</Link>
						</li>
					</ul>
					{features.ads ? <AdSlot placement="product-rail" /> : null}
				</aside>
			</div>
			{product.features.length > 0 ? (
				<section aria-labelledby="fitur">
					<h2 id="fitur" className={styles.groupTitle}>
						Fitur
					</h2>
					<ArticleBody body={product.features} siteOrigin={env.siteUrl} />
				</section>
			) : null}
			{features.ads && product.officialUrl && sectionSlug ? (
				// The outbound button again after the main sections, like
				// financial-field.com's product pages (ADR-0024).
				<p className={styles.repeatCta}>
					<OutboundLink
						href={product.officialUrl}
						section={sectionSlug}
						productSlug={product.slug}
						providerName={product.provider.name}
					/>
				</p>
			) : null}
			{others.length > 0 && section ? (
				<section aria-labelledby="produk-lain">
					<h2 id="produk-lain" className={styles.groupTitle}>
						Produk {section.name} lainnya
					</h2>
					<ul className={styles.grid}>
						{others.map((other) => (
							<li key={other.id}>
								<Link href={routes.product(other.slug)} className={styles.tile}>
									<p className="type-meta">{other.provider.name}</p>
									<h3 className={styles.tileTitle}>{other.title}</h3>
									{other.loan ? (
										<p>
											Bunga {formatRateRange(other.loan)}{' '}
											{rateTypeLabel(other.loan).toLowerCase()}, tenor{' '}
											{formatTenorRange(other.loan)}
										</p>
									) : null}
								</Link>
							</li>
						))}
					</ul>
				</section>
			) : null}
		</Container>
	);
}
