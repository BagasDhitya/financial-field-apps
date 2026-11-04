#!/usr/bin/env node
/**
 * Demo content through the CMS (PRP-0002.p1b, ADR-0010).
 *   pnpm seed:cms                 create or update everything (idempotent)
 *   pnpm seed:cms -- --dry-run    print the plan, send no writes
 *   pnpm seed:cms -- --refresh-dates   re-spread published dates (dates capability)
 *   pnpm seed:cms:reset           remove only what the seed created
 * Env (names only, RUN-env-vars): CMS_URL, CMS_SEED_TOKEN, CMS_CAPABILITIES,
 * SEED_ALLOWED_HOSTS, SITE_ENV.
 */
import { onPaper, solidPng } from "../lib/png.mjs";

import { parseCapabilities } from "./capabilities.mjs";
import { assertSeedAllowed, createClient, SeedGuardError } from "./client.mjs";
import { ARTICLES, DRAFTS, FEATURED } from "./data/articles.mjs";
import {
  PLACEHOLDER_TEXT,
  SITE_SETTINGS,
  STATIC_PAGES,
} from "./data/pages.mjs";
import { AUTHORS } from "./data/people.mjs";
import {
  CATEGORIES,
  MARKER_TAG,
  TAGS,
  allCategories,
  topLevelOf,
} from "./data/taxonomy.mjs";
import { DISCLAIMER } from "./generate.mjs";
import {
  articlePayload,
  authorPayload,
  categoryPayload,
  tagPayload,
  tagSlugsFor,
} from "./payloads.mjs";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const reset = args.has("--reset");
const refreshDates = args.has("--refresh-dates");

const env = {
  cmsUrl: process.env.CMS_URL || "http://localhost:1337",
  token: process.env.CMS_SEED_TOKEN,
  siteEnv: process.env.SITE_ENV,
  allowedHosts: process.env.SEED_ALLOWED_HOSTS,
};

const PALETTE = [
  [0x00, 0x3a, 0xa0],
  [0x18, 0x18, 0x6d],
  [0x09, 0xae, 0xee],
  [0x03, 0x03, 0x03],
];
const FILE_PREFIX = "ffid-seed-";

function log(line) {
  console.log(line);
}

const counts = {};
function count(kind, created) {
  counts[kind] ??= { created: 0, updated: 0 };
  counts[kind][created ? "created" : "updated"] += 1;
}

/** One placeholder per top-level category: palette hue × opacity step (I7). */
function categoryImage(index) {
  const color = PALETTE[index % PALETTE.length];
  const alpha = [1, 0.82, 0.66][Math.floor(index / PALETTE.length) % 3];
  return solidPng(1600, 900, onPaper(color, alpha));
}

async function seed(client, caps) {
  const now = new Date();

  log("› media");
  const imageIds = {};
  for (const [index, top] of CATEGORIES.entries()) {
    const file = await client.ensureFile(
      `${FILE_PREFIX}kategori-${top.slug}.png`,
      categoryImage(index),
      `Gambar contoh untuk kategori ${top.name}`,
    );
    imageIds[top.slug] = file.id;
    count("media", file.created);
  }
  const avatarIds = {};
  for (const [index, author] of AUTHORS.entries()) {
    if (!author.avatar) {
      continue;
    }
    const png = solidPng(
      400,
      400,
      onPaper(PALETTE[index % 2], 0.66 + (index % 3) * 0.17),
    );
    const file = await client.ensureFile(
      `${FILE_PREFIX}avatar-${author.slug}.png`,
      png,
      `Foto profil contoh ${author.full_name}`,
    );
    avatarIds[author.slug] = file.id;
    count("media", file.created);
  }

  log("› categories (59)");
  const categoryIds = {};
  for (const [order, category] of allCategories().entries()) {
    const parentId = category.parent ? categoryIds[category.parent] : null;
    const result = await client.upsert(
      "categories",
      category.slug,
      categoryPayload(category, parentId, caps, order + 1),
    );
    categoryIds[category.slug] = result.documentId;
    count("categories", result.created);
  }

  log("› tags (21)");
  const tagIds = {};
  for (const tag of TAGS) {
    const result = await client.upsert("tags", tag.slug, tagPayload(tag, caps));
    tagIds[tag.slug] = result.documentId;
    count("tags", result.created);
  }

  log("› authors (6)");
  const authorIds = {};
  for (const author of AUTHORS) {
    const result = await client.upsert(
      "writer-profiles",
      author.slug,
      authorPayload(author, avatarIds[author.slug], caps),
    );
    authorIds[author.code] = result.documentId;
    count("authors", result.created);
  }

  log(
    "› articles (60 published, oldest first, so Strapi's own publishedAt also orders #1 newest)",
  );
  const rows = [...ARTICLES].sort((x, y) => y.n - x.n);
  for (const row of [...rows, ...DRAFTS]) {
    const sameTop = ARTICLES.filter(
      (other) =>
        other.slug !== row.slug &&
        topLevelOf(other.category) === topLevelOf(row.category),
    );
    const relatedRow =
      sameTop[0] ?? ARTICLES.find((other) => other.slug !== row.slug);
    const existing = dryRun
      ? null
      : await client.findBySlug("articles", row.slug);
    const data = articlePayload(
      row,
      {
        ids: {
          category: categoryIds[row.category],
          author: authorIds[row.author],
          reviewer: row.reviewer ? authorIds[row.reviewer] : null,
          tags: tagSlugsFor(row).map((slug) => tagIds[slug]),
          image: imageIds[topLevelOf(row.category)] ?? null,
        },
        related: relatedRow
          ? { slug: relatedRow.slug, title: relatedRow.title }
          : null,
        featured: FEATURED.includes(row.slug),
        isNew: !existing,
        refreshDates,
        now,
      },
      caps,
    );
    const result = await client.upsert("articles", row.slug, data, {
      publish: !row.draft,
    });
    count(row.draft ? "drafts" : "articles", result.created);
  }

  log("› site navigation (featured first, existing featured kept)");
  const nav = dryRun
    ? null
    : await client.request(
        "GET",
        "/site-navigation?status=draft&populate[featured_articles][fields][0]=slug",
      );
  const existingFeatured = (nav?.data?.featured_articles ?? []).filter(
    (article) => !FEATURED.includes(article.slug),
  );
  const featuredIds = [];
  for (const slug of FEATURED) {
    const found = dryRun
      ? { documentId: `dry-${slug}` }
      : await client.findBySlug("articles", slug);
    if (found) {
      featuredIds.push(found.documentId);
    }
  }
  await client.request("PUT", "/site-navigation?status=published", {
    data: {
      featured_articles: {
        set: [
          ...featuredIds,
          ...existingFeatured.map((article) => article.documentId),
        ],
      },
    },
  });

  if (caps.has("static-pages")) {
    log("› static pages (placeholders)");
    for (const page of STATIC_PAGES) {
      const body = [
        {
          type: "paragraph",
          children: [{ type: "text", text: PLACEHOLDER_TEXT, italic: true }],
        },
        { type: "paragraph", children: [{ type: "text", text: DISCLAIMER }] },
      ];
      const result = await client.upsert("static-pages", page.slug, {
        title: page.title,
        group: page.group,
        body,
      });
      count("static-pages", result.created);
    }
  }
  if (caps.has("site-settings")) {
    log("› site settings");
    await client.request("PUT", "/site-setting?status=published", {
      data: SITE_SETTINGS,
    });
  }
}

async function articlesWithMarker(client) {
  const found = [];
  for (let page = 1; page <= 20; page++) {
    const result = await client.request(
      "GET",
      `/articles?status=draft&filters[tags][slug][$eq]=${MARKER_TAG}&fields[0]=slug&pagination[page]=${page}&pagination[pageSize]=100`,
    );
    found.push(...(result?.data ?? []));
    if (page >= (result?.meta?.pagination?.pageCount ?? 0)) {
      break;
    }
  }
  return found;
}

async function resetAll(client) {
  log("› articles tagged data-contoh");
  for (const article of await articlesWithMarker(client)) {
    await client.remove("articles", article.documentId);
    count("articles", false);
  }
  log("› tags, authors");
  for (const tag of TAGS) {
    const found = await client.findBySlug("tags", tag.slug);
    if (found) {
      await client.remove("tags", found.documentId);
      count("tags", false);
    }
  }
  for (const author of AUTHORS) {
    const found = await client.findBySlug("writer-profiles", author.slug);
    if (found) {
      await client.remove("writer-profiles", found.documentId);
      count("authors", false);
    }
  }
  log("› categories without non-seed articles (children first)");
  const ordered = [...allCategories()].reverse();
  for (const category of ordered) {
    const found = await client.findBySlug("categories", category.slug);
    if (!found) {
      continue;
    }
    const inUse = await client.request(
      "GET",
      `/articles?status=draft&filters[$or][0][primary_category][slug][$eq]=${category.slug}&filters[$or][1][categories][slug][$eq]=${category.slug}&pagination[limit]=1`,
    );
    const children = await client.request(
      "GET",
      `/categories?status=draft&filters[parent_category][slug][$eq]=${category.slug}&pagination[limit]=1`,
    );
    if ((inUse?.data?.length ?? 0) > 0 || (children?.data?.length ?? 0) > 0) {
      log(`  keep ${category.slug} (still used by non-seed content)`);
      continue;
    }
    await client.remove("categories", found.documentId);
    count("categories", false);
  }
  log("› media");
  const files = await client.request(
    "GET",
    `/upload/files?filters[name][$startsWith]=${FILE_PREFIX}&pagination[pageSize]=100`,
  );
  for (const file of Array.isArray(files) ? files : []) {
    await client.removeFile(file.id);
    count("media", false);
  }
}

async function main() {
  assertSeedAllowed(env);
  const caps = parseCapabilities(process.env.CMS_CAPABILITIES ?? "");
  log(
    `seed-cms ${reset ? "reset" : "seed"} → ${new URL(env.cmsUrl).host}${dryRun ? " (dry run)" : ""}`,
  );
  log(
    `capabilities: ${caps.size > 0 ? [...caps].join(", ") : "(none: today's schema)"}`,
  );
  const client = createClient({
    cmsUrl: env.cmsUrl,
    token: env.token,
    dryRun,
    log,
  });
  const started = Date.now();
  if (reset) {
    await resetAll(client);
  } else {
    await seed(client, caps);
  }
  log(`done in ${((Date.now() - started) / 1000).toFixed(1)} s`);
  for (const [kind, value] of Object.entries(counts)) {
    log(
      `  ${kind.padEnd(13)} ${reset ? `${value.updated} removed` : `${value.created} created, ${value.updated} updated`}`,
    );
  }
}

main().catch((error) => {
  console.error(
    error instanceof SeedGuardError
      ? error.message
      : `seed-cms failed: ${error.message}`,
  );
  process.exit(error instanceof SeedGuardError ? 2 : 1);
});
