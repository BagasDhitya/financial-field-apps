/**
 * Pure payload builders (PRP-0002.p1b §4.5–§4.6). Gated fields are added only
 * when their capability is on (REQ-SEED-006), mirroring src/lib/cms/queries.
 */
import { AUTHORS } from "./data/people.mjs";
import { MARKER_TAG, categoryName, topLevelOf } from "./data/taxonomy.mjs";
import {
  buildBody,
  buildCorrection,
  buildFaq,
  buildLead,
  buildSources,
  buildTakeaways,
} from "./generate.mjs";

const HOUR = 3_600_000;

/** Published date for row n, relative to the run (§4.6). */
export function publishedAtFor(n, now) {
  return new Date(now.getTime() - (n - 1) * 34 * HOUR - 2 * HOUR).toISOString();
}

export function categoryPayload(category, parentDocumentId, caps, order) {
  return {
    name: category.name,
    parent_category: { set: parentDocumentId ? [parentDocumentId] : [] },
    ...(caps.has("category-nav")
      ? {
          description: category.description,
          nav_order: order,
          show_in_nav: true,
        }
      : {}),
  };
}

export function tagPayload(tag, caps) {
  return {
    name: tag.name,
    ...(caps.has("tag-description") ? { description: tag.description } : {}),
  };
}

export function authorPayload(author, avatarId, caps) {
  return {
    full_name: author.full_name,
    role_title: author.role_title,
    bio: author.bio,
    avatar: avatarId ?? null,
    ...(caps.has("author-profile")
      ? {
          credentials: author.credentials,
          same_as: author.same_as,
          expertise: author.expertise,
          is_reviewer: author.reviewer,
        }
      : {}),
  };
}

/** Category path for links: /kategori/<parent>/<sub> or /kategori/<top>. */
export function categoryPath(slug) {
  const top = topLevelOf(slug);
  return top && top !== slug ? `${top}/${slug}` : slug;
}

/**
 * @param {import("./data/articles.mjs").SeedArticle} row
 * @param {{
 *   ids: { category: string, author: string, reviewer: string | null, tags: string[], image: number | null },
 *   related: { slug: string, title: string } | null,
 *   featured: boolean, isNew: boolean, refreshDates: boolean, now: Date
 * }} ctx
 * @param {Set<string>} caps
 */
export function articlePayload(row, ctx, caps) {
  const has = (variant) => row.variants.includes(variant);
  const lead = buildLead(row);
  const published = publishedAtFor(Math.min(row.n, 60), ctx.now);
  const data = {
    title: row.title,
    lead_text: lead,
    content: buildBody(row, {
      categoryName: categoryName(row.category),
      categoryPath: categoryPath(row.category),
      related: ctx.related,
    }),
    article_type: {
      S: "standard",
      PR: "pr_article",
      I: "interview",
      C: "column",
    }[row.type],
    featured_image: has("NoImg") ? null : ctx.ids.image,
    primary_category: { set: [ctx.ids.category] },
    categories: { set: [ctx.ids.category] },
    author: { set: [ctx.ids.author] },
    reviewer: { set: ctx.ids.reviewer ? [ctx.ids.reviewer] : [] },
    tags: { set: ctx.ids.tags },
  };

  if (caps.has("seo")) {
    data.seo = {
      // Second safety net besides staging noindex (§4.5).
      no_index: true,
      ...(ctx.featured
        ? {
            meta_title: row.title.slice(0, 70),
            meta_description: lead.slice(0, 160),
          }
        : {}),
    };
  }
  if (caps.has("sponsor") && row.type === "PR") {
    data.sponsor_name = "Sponsor Contoh";
    data.sponsor_url = "https://example.com";
    data.sponsor_disclosure =
      "Artikel ini dibuat atas kerja sama dengan Sponsor Contoh (fiktif). Konten bersponsor untuk pengujian.";
  }
  if (caps.has("faq") && has("F")) {
    data.faq = buildFaq(row);
  }
  if (caps.has("sources") && has("Src")) {
    data.sources = buildSources(row);
  }
  if (caps.has("takeaways") && has("K")) {
    data.key_takeaways = buildTakeaways(row);
  }
  if (caps.has("corrections") && has("Cor")) {
    data.corrections = buildCorrection();
  }
  if (caps.has("dates")) {
    if (ctx.isNew || ctx.refreshDates) {
      data.first_published_at = published;
    }
    data.content_updated_at = has("U")
      ? new Date(Date.parse(published) + 72 * HOUR).toISOString()
      : null;
    data.last_reviewed_at = ctx.ids.reviewer
      ? new Date(Date.parse(published) + 24 * HOUR).toISOString()
      : null;
  }
  if (caps.has("editorial")) {
    data.editorial_status = row.draft ?? "approved";
  }
  return data;
}

/** Tag slugs for a row: the marker always first (REQ-SEED-002). */
export function tagSlugsFor(row) {
  return [MARKER_TAG, ...row.tags];
}

export const AUTHOR_SLUGS = AUTHORS.map((author) => author.slug);
