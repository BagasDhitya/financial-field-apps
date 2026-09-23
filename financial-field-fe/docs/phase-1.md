# Phase 1 — Frontend initialization

This document describes `financial-field-fe` as initialized on branch `frontend/init`. It is the Next.js app for the Indonesian Financial Field site. The Strapi app beside it, `financial-field-cms`, is unchanged by this work.

The pages are unstyled on purpose. The visual design is not in this phase. What is in place is the app shell, the data boundary with Strapi, the six public routes, caching, and the GitHub check for the frontend.

## How the two apps run

The repository is one Git repo and two apps. They do not share a package manager or a Node version.

| App                   | Toolchain    | Node |
| --------------------- | ------------ | ---- |
| `financial-field-cms` | npm          | 20   |
| `financial-field-fe`  | pnpm 11.25.0 | 24   |

Node 24 is required for the frontend because pnpm 11 needs Node 22.13 or newer. The CMS stays on Node 20. `better-sqlite3` in the CMS was built for Node 20, so starting Strapi on Node 24 fails. Use `nvm use 20` in the CMS directory and `nvm use 24` in the frontend directory.

Local URLs:

| Service      | URL                         |
| ------------ | --------------------------- |
| Strapi       | http://localhost:1337       |
| Strapi admin | http://localhost:1337/admin |
| Next.js      | http://localhost:3000       |

Start Strapi first (`npm run develop`), then the frontend (`pnpm dev`). If Strapi is not running, the homepage fetch fails with a connection error.

There is no runtime conflict when the two apps are deployed. They are two services. They share three values: `CMS_URL`, `NEXT_PUBLIC_CMS_URL`, and `REVALIDATE_SECRET`.

## Frontend commands

From `financial-field-fe`:

```bash
nvm use 24
pnpm install
pnpm dev
```

`pnpm verify` runs lint, format check, typecheck, and a production build. The build reads `REVALIDATE_SECRET` and `PREVIEW_SECRET`. In CI those are placeholders, and `SKIP_CMS_FETCH=1` stops the build from calling Strapi. Leave `SKIP_CMS_FETCH` unset on a machine that has Strapi running.

## Where code lives

```text
financial-field-fe/src/
├── app/            routes, metadata, revalidate windows, webhook, preview
├── features/       one unstyled view per page
├── components/     shared UI that receives props and does not fetch
├── lib/
│   ├── env.ts      the only module that reads process.env
│   ├── routes.ts   the only module that builds internal URLs
│   ├── revalidate.ts
│   ├── cms/        the only code that speaks Strapi's JSON
│   └── content/    functions a route calls to get domain data
└── types/          domain shapes. No Strapi field names.
```

A route file stays thin. It sets the cache window, calls one function from `src/lib/content`, and renders a view. The view does not call Strapi and does not assemble a URL by hand. Links go through `routes` in `src/lib/routes.ts`.

Strapi names such as `documentId`, `lead_text`, and `populate` stay inside `src/lib/cms`. Mappers rename them before a view sees the data.

## Routes

| URL                 | Content                                                       |
| ------------------- | ------------------------------------------------------------- |
| `/`                 | Site navigation menu, featured articles, latest articles      |
| `/articles/[slug]`  | One article                                                   |
| `/category/[slug]`  | One category, its children, and two article lists             |
| `/authors/[slug]`   | One writer profile, written articles, and supervised articles |
| `/tag/[slug]`       | One tag and its articles                                      |
| `/tickers/[symbol]` | One stock ticker and its articles                             |

English path segments are intentional. Changing a path later is a change to `src/lib/routes.ts` only.

`/tickers/[symbol]` lowercases the symbol. The CMS field `ticker_symbol` is not unique and is not a slug, so a value with spaces has to be decoded from the URL before the lookup.

## Names the frontend uses for CMS fields

The CMS schema is the source of truth. The frontend renames fields at the mapper so pages do not depend on Strapi's wording. If a schema field is renamed, the mapper and `src/lib/cms/strapi-types.ts` change with it. `src/types` is the contract the rest of the frontend imports.

| Strapi                    | Frontend                                                          |
| ------------------------- | ----------------------------------------------------------------- |
| `documentId`              | `id`                                                              |
| `lead_text`               | `leadText`                                                        |
| `featured_image`          | `featuredImage`                                                   |
| `primary_category`        | `primaryCategory`                                                 |
| `stocks_mentioned`        | `stocksMentioned`                                                 |
| `full_name`               | `fullName`                                                        |
| `role_title`              | `roleTitle`                                                       |
| `ticker_symbol`           | `symbol`                                                          |
| `company_name`            | `companyName`                                                     |
| Writer Profile            | `Author`                                                          |
| Category `category`       | `articlesInSection` — articles whose primary category is this one |
| Category `articles`       | `articlesMentioning` — articles that mention this category        |
| Writer Profile `articles` | `writtenArticles`                                                 |
| Writer Profile `article`  | `supervisedArticles` — articles this person reviewed              |

The category page uses `articlesInSection` for the section list. Using the CMS field `articles` for that list would show mentions, not the section.

Header menu items use `url` when it is set. Otherwise the first entry in `category_ref` becomes a category URL. `category_ref` is a one-to-many relation, so Strapi returns an array even when the editor picked one category.

## Publishing and cache

Pages are cached and revalidated. The webhook is the main way a publish shows up. The time windows below are only a backstop if a webhook is missed.

| Page                | Window      |
| ------------------- | ----------- |
| Home                | 60 seconds  |
| Category            | 120 seconds |
| Article             | 300 seconds |
| Author, tag, ticker | 600 seconds |

Strapi webhook, configured in the Strapi admin under Settings → Webhooks:

| Setting      | Local value                                      |
| ------------ | ------------------------------------------------ |
| URL          | `http://localhost:3000/api/revalidate`           |
| Header       | `Authorization`                                  |
| Header value | `Bearer <REVALIDATE_SECRET>`                     |
| Events       | entry create, update, delete, publish, unpublish |

The header value must include the word `Bearer` and a space. The route returns 401 without it.

An article publish also clears the navigation cache, because a featured article can change without Strapi sending a separate event for Site Navigation.

Draft preview is `GET /api/preview?secret=<PREVIEW_SECRET>&slug=<article-slug>`. It turns on Next.js draft mode and redirects to the article. Published content is readable without `CMS_API_TOKEN`. Draft content needs a token that can read drafts. The Public role cannot read drafts.

## Environment

Copy `financial-field-fe/.env.example` to `financial-field-fe/.env.local`. `.env.local` is gitignored. `.env.example` is committed and contains empty values only.

| Variable               | Who reads it                                                             |
| ---------------------- | ------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Sitemap and robots                                                       |
| `CMS_URL`              | Server-side fetch to Strapi. Not exposed to the browser                  |
| `NEXT_PUBLIC_CMS_URL`  | Image URLs under `/uploads`                                              |
| `CMS_API_TOKEN`        | Optional. Server-side only. Empty means the Public role is used          |
| `REVALIDATE_SECRET`    | Must match the webhook header                                            |
| `PREVIEW_SECRET`       | Draft preview link                                                       |
| `SKIP_CMS_FETCH`       | Set to `1` only in GitHub Actions. Leave unset locally and in production |

`next/image` accepts images from the CMS host at `/uploads/**`. `featured_image` and `avatar` currently allow files, video, and audio in the schema. The frontend drops anything whose MIME type is not `image/` before it reaches `next/image`.

## What Strapi must allow

Public read permissions are stored in the database, not in the repo. A fresh Strapi answers 403 until the Public role can `find` these types:

- Article
- Category
- Tag
- Writer Profile
- Stock Ticker
- Site Navigation

In the admin this is Settings → Users & Permissions plugin → Roles → Public. It is not under Administration panel → Roles. Direct URL: `http://localhost:1337/admin/settings/users-permissions/roles`.

Every content type uses Draft & Publish. An entry is invisible to the site until it is published.

Listing requests ask only for card fields (`title`, `slug`, `lead_text`, `article_type`, `publishedAt`) plus image, primary category, and author. The article body is loaded on the article page only. Strapi's `maxLimit` is 100, so a section or archive list stops at that cap unless a later query pages through it.

## GitHub

`.github/workflows/frontend-ci.yml` runs on pull requests and pushes to `development` when `financial-field-fe/**` changes. Backend-only commits do not run it. The job is named `verify`. It installs with `pnpm install --frozen-lockfile`, then lints, checks formatting, typechecks, and builds. Making `verify` a required check on `development` is a repository setting and happens after the workflow has run once.

`.github/CODEOWNERS` requests review across the shared contract:

- A change to `financial-field-cms/src/api/**/schema.json` asks `@ULTRA-DELUXE` for review.
- A change to `financial-field-fe/src/types/` asks `@BagasDhitya` for review.

## Schema notes for the CMS

These are properties of the current schema. The frontend already defends against them. Fixing them in Strapi would let the frontend drop some of that defense.

- No field is `required`. An article can be published with an empty title, slug, body, author, or category. Mappers substitute empty strings or `null`.
- `ticker_symbol` is not unique. `/tickers/[symbol]` returns the first match.
- Category and Writer Profile relation names do not match their meaning. See the rename table above.
- There is no SEO component (meta title, description, Open Graph image).
- `article_type` values are `standard`, `pr_article`, `interview`, and `column`. There is no separate sponsor-disclosure field.
- `featured_image` and `avatar` accept non-images.

## Not in this phase

- Page design, shared header chrome beyond the unstyled menu, and the starter title in `src/app/layout.tsx`.
- Search, comparison pages, and live rates.
- A production `CMS_API_TOKEN`. Local reads use the Public role.
