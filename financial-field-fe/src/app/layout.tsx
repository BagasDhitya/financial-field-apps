import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Source_Serif_4 } from 'next/font/google';
import type { ReactNode } from 'react';

import { Analytics } from '@/components/Analytics/Analytics';
import { ConsentBanner } from '@/components/ConsentBanner/ConsentBanner';
import { JsonLd } from '@/components/JsonLd/JsonLd';
import { SiteFooter } from '@/components/SiteFooter/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader/SiteHeader';
import { CONSENT_BOOT_SCRIPT } from '@/lib/analytics/consent';
import { getCategoryTree } from '@/lib/content/categories';
import { getComparisonSections } from '@/lib/content/comparison';
import { comparisonFooterLinks, getMainMenu } from '@/lib/content/menu';
import { trustPagesEnabled } from '@/lib/content/pages';
import { getSiteSettings } from '@/lib/content/site';
import { env } from '@/lib/env';
import { routes } from '@/lib/routes';
import { BRAND } from '@/lib/seo/metadata';
import { buildOrganization, buildWebSite } from '@/lib/structured-data/organization';
import { buildGraph } from '@/lib/structured-data/serialize';

import './globals.css';

/**
 * Two type levels (ADR-0023): Inter Tight frames the page (headlines, titles,
 * intros, navigation, labels) and Source Serif 4 sets the reading text. Both
 * are LCP candidates (headlines on home, body on articles), so both use
 * `optional` without preload: Chrome holds first text render for a preloaded
 * optional font (DSC-0011). Slow first visits may show the metric-matched
 * fallback; never a late swap. Variable files cover every weight used.
 */
const interTight = Inter_Tight({
	variable: '--font-inter-tight',
	subsets: ['latin'],
	display: 'optional',
	preload: false,
});

const sourceSerif = Source_Serif_4({
	variable: '--font-source-serif',
	subsets: ['latin'],
	axes: ['opsz'],
	display: 'optional',
	preload: false,
});

export const metadata: Metadata = {
	metadataBase: new URL(env.siteUrl),
	title: { default: BRAND, template: `%s | ${BRAND}` },
	applicationName: BRAND,
	formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
	themeColor: '#003aa0',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
	const [categories, settings] = await Promise.all([getCategoryTree(), getSiteSettings()]);
	const [menu, sections] = await Promise.all([getMainMenu(categories), getComparisonSections()]);

	// GA4 only in production and only when configured (REQ-ANL-001).
	const analyticsEnabled = env.siteEnv === 'production' && env.gaMeasurementId !== '';

	const organizationGraph = buildGraph([
		buildOrganization({
			origin: env.siteUrl,
			settings,
			trustPagesAvailable: trustPagesEnabled(),
		}),
		buildWebSite(env.siteUrl, settings),
	]);

	return (
		<html
			lang="id"
			className={`${interTight.variable} ${sourceSerif.variable}`}
			// CONSENT_BOOT_SCRIPT may add data-ffid-consent before hydration.
			suppressHydrationWarning
		>
			{analyticsEnabled ? (
				<head>
					<script dangerouslySetInnerHTML={{ __html: CONSENT_BOOT_SCRIPT }} />
				</head>
			) : null}
			<body>
				<a href="#konten" className="skip-link">
					Langsung ke konten
				</a>
				{/* Early in the document on purpose: on slow connections the end of a
            long article arrives late, and a banner there became the LCP
            element (DSC-0011). It is a fixed overlay, so order is not layout. */}
				{analyticsEnabled ? (
					<>
						<ConsentBanner privacyHref={routes.about('kebijakan-privasi')} />
						<Analytics measurementId={env.gaMeasurementId} />
					</>
				) : null}
				<SiteHeader menu={menu} />
				<main id="konten" tabIndex={-1}>
					{children}
				</main>
				<SiteFooter
					categories={categories}
					comparisonLinks={comparisonFooterLinks(sections)}
					settings={settings}
					showConsentSettings={analyticsEnabled}
					year={new Date().getFullYear()}
				/>
				<JsonLd data={organizationGraph} />
			</body>
		</html>
	);
}
