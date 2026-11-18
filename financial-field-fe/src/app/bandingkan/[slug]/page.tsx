import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { ComparisonDisclosure } from '@/components/ComparisonDisclosure/ComparisonDisclosure';
import { ComparisonTool } from '@/components/ComparisonTool/ComparisonTool';
import { Container } from '@/components/Container/Container';
import { DateTime } from '@/components/DateTime/DateTime';
import { JsonLd } from '@/components/JsonLd/JsonLd';
import { HOME_CRUMB } from '@/lib/breadcrumbs';
import { surveyKindOf } from '@/lib/comparison/surveys';
import {
	getComparisonSection,
	getComparisonSections,
	getProductsInSection,
	isComparisonEnabled,
} from '@/lib/content/comparison';
import { routes } from '@/lib/routes';
import { isValidSlug } from '@/lib/security';
import { buildMetadata } from '@/lib/seo/metadata';
import type { FinancialProduct, ProductSection } from '@/types';

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
	const section = await getComparisonSection(slug);
	if (!section) {
		notFound();
	}
	return section;
}

function trailOf(section: ProductSection) {
	return [
		HOME_CRUMB,
		{ label: 'Bandingkan', href: routes.comparisonIndex() },
		...(section.parentSlug && section.parentName
			? [{ label: section.parentName, href: routes.comparisonSection(section.parentSlug) }]
			: []),
		{ label: section.name, href: routes.comparisonSection(section.slug) },
	];
}

/** Products checked most recently, for the "Data diperiksa" line. */
function newestCheck(products: FinancialProduct[]): string | null {
	return products.reduce<string | null>(
		(newest, product) =>
			product.dataCheckedAt && (!newest || product.dataCheckedAt > newest)
				? product.dataCheckedAt
				: newest,
		null,
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const section = await load(slug);
	return buildMetadata({
		title: `Bandingkan ${section.name}`,
		description:
			section.description ??
			`Bandingkan produk ${section.name}: bunga, plafon, tenor, dan estimasi cicilan.`,
		path: routes.comparisonSection(section.slug),
		seo: section.seo,
		// An empty section is thin: kept out of the index (REQ-SEO-052).
		noIndex: section.productCount === 0,
	});
}

/**
 * /bandingkan/<slug> (PRP-0002.p3 T21): a group lists its sections; a section
 * renders every product server-side and the survey island re-sorts it.
 */
export default async function ComparisonSectionPage({ params }: Props) {
	const { slug } = await params;
	const section = await load(slug);
	const trail = trailOf(section);
	const path = routes.comparisonSection(section.slug);

	if (section.children.length > 0) {
		const sections = await getComparisonSections();
		const children = sections.filter((candidate) => candidate.parentSlug === section.slug);
		return (
			<Container className={styles.root}>
				<JsonLd data={comparisonGraph(path, trail, `Bandingkan ${section.name}`)} />
				<Breadcrumbs items={trail} />
				<header className={styles.header}>
					<p className={`type-kicker ${styles.kicker}`}>Bandingkan</p>
					<h1 className={styles.title}>{section.name}</h1>
					{section.description ? (
						<p className={styles.dek}>{section.description}</p>
					) : null}
				</header>
				<ul className={styles.grid}>
					{children.map((child) => (
						<li key={child.id}>
							<Link
								href={routes.comparisonSection(child.slug)}
								className={styles.tile}
							>
								<h2 className={styles.tileTitle}>{child.name}</h2>
								{child.description ? <p>{child.description}</p> : null}
								<p className="type-meta">{child.productCount} produk</p>
							</Link>
						</li>
					))}
				</ul>
			</Container>
		);
	}

	const products = await getProductsInSection(section.slug);
	const checked = newestCheck(products);
	const demo = products.some((product) => product.provider.slug.startsWith('contoh-'));

	return (
		<Container className={styles.root}>
			<JsonLd
				data={comparisonGraph(
					path,
					trail,
					`Bandingkan ${section.name}`,
					section.description ?? undefined,
				)}
			/>
			<Breadcrumbs items={trail} />
			<header className={styles.header}>
				<p className={`type-kicker ${styles.kicker}`}>Bandingkan</p>
				<h1 className={styles.title}>{section.name}</h1>
				{section.description ? <p className={styles.dek}>{section.description}</p> : null}
				<p className={`type-meta ${styles.meta}`}>
					<span>{products.length} produk</span>
					{checked ? (
						<span>
							Data diperiksa <DateTime iso={checked} />
						</span>
					) : null}
				</p>
			</header>
			<ComparisonDisclosure demo={demo} />
			<ComparisonTool
				sectionSlug={section.slug}
				sectionName={section.name}
				kind={surveyKindOf(section.slug)}
				products={products}
			/>
			<aside className={styles.box} aria-labelledby="pelajari">
				<h2 id="pelajari">Sebelum memutuskan</h2>
				<ul className={styles.links}>
					<li>
						<Link href={routes.calculator()}>Hitung cicilan sendiri</Link>
					</li>
					<li>
						<Link href={routes.glossary()}>Kamus Keuangan</Link>
					</li>
					<li>
						<Link href={routes.providers()}>Semua penyedia</Link>
					</li>
					<li>
						<Link href={routes.about('metodologi-perbandingan')}>
							Metodologi Perbandingan
						</Link>
					</li>
				</ul>
			</aside>
		</Container>
	);
}
