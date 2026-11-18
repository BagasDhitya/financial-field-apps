import Link from 'next/link';

import { routes, TRUST_PAGES } from '@/lib/routes';
import type { CategoryNode, MenuLink, SiteSettings } from '@/types';

import { ConsentSettingsButton } from '../ConsentBanner/ConsentBanner';
import { Container } from '../Container/Container';
import { Wordmark } from '../Wordmark/Wordmark';

import styles from './SiteFooter.module.css';

export type SiteFooterProps = {
	categories: CategoryNode[];
	/** Comparison sections, Penyedia and the calculator (REQ-CMP-014); empty while comparison is off. */
	comparisonLinks: MenuLink[];
	settings: SiteSettings;
	showConsentSettings: boolean;
	year: number;
};

/** FF navy footer: topics, tools, trust pages, contact (REQ-NAV-005, REQ-SEO-025, REQ-CMP-014). */
export function SiteFooter({
	categories,
	comparisonLinks,
	settings,
	showConsentSettings,
	year,
}: SiteFooterProps) {
	return (
		<footer className={styles.root}>
			<Container className={styles.grid}>
				<div className={styles.brand}>
					<Wordmark variant="stacked" tone="paper" />
					<p className={styles.tagline}>{settings.tagline}</p>
				</div>
				<nav aria-label="Topik" className={styles.column}>
					<p className={`type-label ${styles.heading}`}>Topik</p>
					<ul className={styles.list}>
						{categories.map((category) => (
							<li key={category.id}>
								<Link href={routes.category(category)}>{category.name}</Link>
							</li>
						))}
						<li>
							<Link href={routes.latest()}>Terbaru</Link>
						</li>
						<li>
							<Link href={routes.interviews()}>Wawancara</Link>
						</li>
						<li>
							<Link href={routes.videos()}>Video</Link>
						</li>
					</ul>
				</nav>
				<nav aria-label="Alat dan referensi" className={styles.column}>
					<p className={`type-label ${styles.heading}`}>Alat</p>
					<ul className={styles.list}>
						{comparisonLinks.map((link) => (
							<li key={link.href}>
								<Link href={link.href}>{link.label}</Link>
							</li>
						))}
						<li>
							<Link href={routes.glossary()}>Kamus Keuangan</Link>
						</li>
					</ul>
				</nav>
				<nav aria-label="Footer" className={styles.column}>
					<p className={`type-label ${styles.heading}`}>Tentang</p>
					<ul className={styles.list}>
						<li>
							<Link href={routes.about()}>Tentang Kami</Link>
						</li>
						{TRUST_PAGES.map((page) => (
							<li key={page.slug}>
								<Link href={routes.about(page.slug)}>{page.label}</Link>
							</li>
						))}
						<li>
							<Link href={routes.contact()}>Hubungi Kami</Link>
						</li>
					</ul>
				</nav>
				{settings.socialLinks.length > 0 ? (
					<div className={styles.column}>
						<p className={`type-label ${styles.heading}`}>Ikuti kami</p>
						<ul className={styles.list}>
							{settings.socialLinks.map((link) => (
								<li key={link.url}>
									<a href={link.url} rel="noopener me">
										{link.platform}
									</a>
								</li>
							))}
						</ul>
					</div>
				) : null}
			</Container>
			<Container className={styles.bottom}>
				<p>© {year} Financial Field Indonesia</p>
				{showConsentSettings ? <ConsentSettingsButton /> : null}
			</Container>
		</footer>
	);
}
