import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { draftMode } from "next/headers";
import type { ReactNode } from "react";

import { Analytics } from "@/components/Analytics/Analytics";
import { ConsentBanner } from "@/components/ConsentBanner/ConsentBanner";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { CONSENT_BOOT_SCRIPT } from "@/lib/analytics/consent";
import { getCategoryTree } from "@/lib/content/categories";
import { trustPagesEnabled } from "@/lib/content/pages";
import { getSiteSettings } from "@/lib/content/site";
import { env } from "@/lib/env";
import { routes } from "@/lib/routes";
import { BRAND } from "@/lib/seo/metadata";
import {
  buildOrganization,
  buildWebSite,
} from "@/lib/structured-data/organization";
import { buildGraph } from "@/lib/structured-data/serialize";

import "./globals.css";

/**
 * Headlines are the LCP element on home: same `optional` rule, and no preload,
 * because Chrome holds first text render for a preloaded optional font
 * (DSC-0011). First slow visits may show the metric-matched fallback; cached
 * and fast visits get Playfair. Never a late swap.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  // Variable font: one file covers 600–700 (and dodges a Turbopack bug with
  // explicit weight lists plus preload: false in Next 16.3.5).
  display: "optional",
  preload: false,
});

/**
 * Body text is the LCP element on article and listing pages, so the body font
 * uses `optional`: a late swap would re-paint the LCP text (DSC-0011). The
 * size-adjusted fallback keeps CLS at zero.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  // Variable font: one file covers 400–700.
  display: "optional",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: BRAND, template: `%s | ${BRAND}` },
  applicationName: BRAND,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#003aa0",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, settings, draft] = await Promise.all([
    getCategoryTree(),
    getSiteSettings(),
    draftMode(),
  ]);

  // GA4 only in production, only when configured, never in preview (REQ-ANL-001).
  const analyticsEnabled =
    env.siteEnv === "production" &&
    env.gaMeasurementId !== "" &&
    !draft.isEnabled;

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
      className={`${playfair.variable} ${montserrat.variable}`}
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
            <ConsentBanner privacyHref={routes.about("kebijakan-privasi")} />
            <Analytics measurementId={env.gaMeasurementId} />
          </>
        ) : null}
        <SiteHeader categories={categories} />
        <main id="konten" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter
          categories={categories}
          settings={settings}
          showConsentSettings={analyticsEnabled}
          year={new Date().getFullYear()}
        />
        <JsonLd data={organizationGraph} />
      </body>
    </html>
  );
}
