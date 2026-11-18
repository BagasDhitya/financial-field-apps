import Link from 'next/link';

import {
	formatAmountRange,
	formatRateRange,
	formatTenorRange,
	rateTypeLabel,
} from '@/lib/comparison/format';
import { routes } from '@/lib/routes';
import type { FinancialProduct } from '@/types';

import { PrLabel } from '../Kicker/Kicker';
import { OutboundLink } from '../OutboundLink/OutboundLink';
import { ProviderLogo } from '../ProviderLogo/ProviderLogo';

import styles from './PrProducts.module.css';

/** Said under every paid unit: the ranked list stays unpaid (REQ-CMP-010). */
const PAID_NOTE =
	'Ditampilkan karena kerja sama komersial dengan penyedia. Tidak memengaruhi urutan perbandingan.';

type Props = { sectionSlug: string };

function rateLine(product: FinancialProduct): string | null {
	if (!product.loan) {
		return null;
	}
	return `Bunga ${formatRateRange(product.loan)} ${rateTypeLabel(product.loan).toLowerCase()}, tenor ${formatTenorRange(product.loan)}`;
}

/**
 * The PR card at the top of a comparison section (ADR-0024, placement
 * `comparison-pr-top`), like financial-field.com's 【PR】 summary card: one
 * partner product (CMS-25 `is_partner`), labelled PR, with its key terms, the
 * detail link and the outbound button. Rendered only with FEATURE_ADS.
 */
export function PrTopCard({ product, sectionSlug }: Props & { product: FinancialProduct }) {
	return (
		<section
			className={styles.top}
			aria-labelledby="produk-mitra"
			data-ad-placement="comparison-pr-top"
		>
			<p className={styles.label}>
				<PrLabel />
				<span className="type-label">Produk mitra</span>
			</p>
			<div className={styles.topHead}>
				<ProviderLogo provider={product.provider} size="large" />
				<div className={styles.text}>
					<span className="type-meta">{product.provider.name}</span>
					<h2 id="produk-mitra" className={styles.title}>
						<Link href={routes.product(product.slug)}>{product.title}</Link>
					</h2>
					{product.summary ? <p className={styles.summary}>{product.summary}</p> : null}
				</div>
			</div>
			{product.loan ? (
				<dl className={styles.facts}>
					<div>
						<dt>Bunga per tahun</dt>
						<dd>
							{formatRateRange(product.loan)} (
							{rateTypeLabel(product.loan).toLowerCase()})
						</dd>
					</div>
					<div>
						<dt>Plafon</dt>
						<dd>{formatAmountRange(product.loan)}</dd>
					</div>
					<div>
						<dt>Tenor</dt>
						<dd>{formatTenorRange(product.loan)}</dd>
					</div>
				</dl>
			) : null}
			<div className={styles.actions}>
				<Link href={routes.product(product.slug)} className="button button-secondary">
					Lihat detail
				</Link>
				{product.officialUrl ? (
					<OutboundLink
						href={product.officialUrl}
						section={sectionSlug}
						productSlug={product.slug}
						providerName={product.provider.name}
					/>
				) : null}
			</div>
			<p className={`type-meta ${styles.note}`}>{PAID_NOTE}</p>
		</section>
	);
}

/**
 * "Rekomendasi" with the PR label near the end of a comparison section
 * (ADR-0024, placement `comparison-pr-panel`): up to four partner products,
 * each with the detail link and the outbound link. Rendered only with
 * FEATURE_ADS.
 */
export function PrRecommendations({
	products,
	sectionSlug,
}: Props & { products: FinancialProduct[] }) {
	if (products.length === 0) {
		return null;
	}
	return (
		<section
			className={styles.panel}
			aria-labelledby="rekomendasi"
			data-ad-placement="comparison-pr-panel"
		>
			<div className={styles.panelHead}>
				<h2 id="rekomendasi" className={styles.panelTitle}>
					Rekomendasi
				</h2>
				<PrLabel />
			</div>
			<ul className={styles.grid}>
				{products.slice(0, 4).map((product) => (
					<li key={product.id} className={styles.tile}>
						<div className={styles.tileHead}>
							<ProviderLogo provider={product.provider} />
							<div className={styles.text}>
								<span className="type-meta">{product.provider.name}</span>
								<Link
									href={routes.product(product.slug)}
									className={styles.tileTitle}
								>
									{product.title}
								</Link>
							</div>
						</div>
						{rateLine(product) ? (
							<p className={styles.rate}>{rateLine(product)}</p>
						) : null}
						{product.officialUrl ? (
							<OutboundLink
								href={product.officialUrl}
								section={sectionSlug}
								productSlug={product.slug}
								providerName={product.provider.name}
								variant="text"
							/>
						) : null}
					</li>
				))}
			</ul>
			<p className={`type-meta ${styles.note}`}>{PAID_NOTE}</p>
		</section>
	);
}
