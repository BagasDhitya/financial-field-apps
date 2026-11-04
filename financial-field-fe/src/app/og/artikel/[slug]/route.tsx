import { getArticleBySlug } from "@/lib/content/articles";
import { renderOgCard } from "@/lib/og-card";
import { isValidSlug } from "@/lib/security";

/** Safety-net window. Keep in sync with REVALIDATE.article (revalidate.test.ts). */
export const revalidate = 300;

/** Render on first request, then cache (ISR). */
export function generateStaticParams() {
  return [];
}

/**
 * Per-article card for articles with neither an editor OG image nor a
 * featured image (SPC-seo §7, T44). Unknown or unpublished slugs get 404.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return new Response("Not found", { status: 404 });
  }
  const article = await getArticleBySlug(slug);
  if (!article?.title) {
    return new Response("Not found", { status: 404 });
  }
  return renderOgCard({
    title: article.title,
    kicker: article.primaryCategory?.name ?? null,
  });
}
