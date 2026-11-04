import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd/JsonLd";
import { blocksToPlainText } from "@/lib/blocks";
import { HOME_CRUMB, toSchemaCrumbs } from "@/lib/breadcrumbs";
import { getStaticPage } from "@/lib/content/pages";
import { env } from "@/lib/env";
import { routes } from "@/lib/routes";
import { isValidSlug } from "@/lib/security";
import {
  absoluteUrl,
  buildMetadata,
  composeDescription,
} from "@/lib/seo/metadata";
import { buildPageGraph } from "@/lib/structured-data/registry";

import { StaticPageView } from "@/features/page/StaticPageView";

/** Safety-net window. Keep in sync with REVALIDATE.staticPage (revalidate.test.ts). */
export const revalidate = 86400;

/** Empty list = render each path on first request, then cache it (ISR). */
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug?: string[] }> };

const ABOUT_SLUG = "tentang-kami";

/** /tentang-kami is the page with slug "tentang-kami"; sub-pages use their own slug. */
async function load(segments: string[] = []) {
  if (segments.length > 1) {
    notFound();
  }
  const slug = segments[0] ?? ABOUT_SLUG;
  if (!isValidSlug(slug)) {
    notFound();
  }
  const page = await getStaticPage(slug);
  if (!page) {
    notFound();
  }
  const path = slug === ABOUT_SLUG ? routes.about() : routes.about(slug);
  return { page, path, isIndex: slug === ABOUT_SLUG };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page, path } = await load(slug);
  return buildMetadata({
    title: page.title,
    description: composeDescription(
      blocksToPlainText(page.body),
      `${page.title}: informasi tentang Financial Field Indonesia, penerbit artikel keuangan pribadi.`,
    ),
    path,
    seo: page.seo,
  });
}

export default async function AboutPage({ params }: Props) {
  const { slug } = await params;
  const { page, path, isIndex } = await load(slug);
  const trail = isIndex
    ? [HOME_CRUMB, { label: page.title, href: path }]
    : [
        HOME_CRUMB,
        { label: "Tentang Kami", href: routes.about() },
        { label: page.title, href: path },
      ];

  return (
    <>
      <JsonLd
        data={buildPageGraph({
          kind: "info",
          type: isIndex || slug?.[0] === "redaksi" ? "AboutPage" : "WebPage",
          origin: env.siteUrl,
          url: absoluteUrl(path),
          crumbs: toSchemaCrumbs(trail),
          name: page.title,
          description: page.seo?.metaDescription,
        })}
      />
      <StaticPageView
        page={page}
        breadcrumbs={trail}
        siteOrigin={env.siteUrl}
      />
    </>
  );
}
