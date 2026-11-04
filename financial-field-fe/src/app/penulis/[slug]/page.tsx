import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd/JsonLd";
import { HOME_CRUMB, toSchemaCrumbs } from "@/lib/breadcrumbs";
import { getArticlesByAuthor } from "@/lib/content/articles";
import { getAuthorBySlug } from "@/lib/content/authors";
import { env } from "@/lib/env";
import { routes } from "@/lib/routes";
import { isValidSlug } from "@/lib/security";
import { absoluteUrl, buildMetadata } from "@/lib/seo/metadata";
import { buildPageGraph } from "@/lib/structured-data/registry";

import { AuthorView } from "@/features/author/AuthorView";

/** Safety-net window. Keep in sync with REVALIDATE.archive (revalidate.test.ts). */
export const revalidate = 600;

/** Empty list = render each path on first request, then cache it (ISR). */
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  if (!isValidSlug(slug)) {
    notFound();
  }
  const author = await getAuthorBySlug(slug);
  if (!author) {
    notFound();
  }
  return author;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await load(slug);
  const title = [author.fullName, author.roleTitle].filter(Boolean).join(", ");
  return buildMetadata({
    title,
    description:
      author.bio ?? `Profil ${author.fullName} di Financial Field Indonesia.`,
    path: routes.author(author.slug),
    seo: author.seo,
    image: author.avatar,
    type: "profile",
  });
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await load(slug);
  const [written, reviewed] = await Promise.all([
    getArticlesByAuthor(author.slug, "author"),
    getArticlesByAuthor(author.slug, "reviewer"),
  ]);
  const trail = [
    HOME_CRUMB,
    { label: author.fullName, href: routes.author(author.slug) },
  ];

  return (
    <>
      <JsonLd
        data={buildPageGraph({
          kind: "profile",
          origin: env.siteUrl,
          url: absoluteUrl(routes.author(author.slug)),
          crumbs: toSchemaCrumbs(trail),
          name: author.fullName,
          author,
        })}
      />
      <AuthorView
        author={author}
        breadcrumbs={trail}
        written={written.items}
        reviewed={reviewed.items}
      />
    </>
  );
}
