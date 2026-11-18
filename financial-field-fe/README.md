# financial-field-fe

Public website of **Financial Field Indonesia**: a Next.js 16 news and article
portal. For now the content is **hardcoded in `src/data/`**: 73 demo articles,
the topic tree, tags, the writing team and reviewers, trust pages, the
glossary and a fictional comparison catalogue, written with the CMS's own
field names. A **local API** serves it at `/api/<endpoint>` in the shape of
the Strapi CMS (`../financial-field-cms`), and the site reads it through the
same client it uses for Strapi. Setting `CMS_URL` switches to the real CMS
(pack: PRP-0002.p1 §S4.8).

**Source of truth:** the implementation pack at
`web-implementation-documents/financial-field-indonesia/` (outside this repo).
Start with its `README.md`, `STATE.md` and `agent-rules.md`. Current work:
`PRP-0002.p1` (Phase 1, news portal). This README is the only document in the
repo: plans, decisions, specs and runbooks live in the pack, never in a
`docs/` folder here.

## Run locally

```bash
nvm use               # Node 24 (.nvmrc)
pnpm install
cp .env.example .env.local   # optional: every value has a local default
pnpm dev                     # http://localhost:3000, no CMS needed
```

Keep `CMS_URL` empty in `.env.local` unless you mean to read a real Strapi:
when it is set, the build fetches from that CMS.

Component harness: http://localhost:3000/harness (local only).

The comparison pages, the home loan finder, the PR spot and the newsletter box
are behind `FEATURE_COMPARISON`, `FEATURE_ADS` and `FEATURE_NEWSLETTER` (set to
`1` in `.env.local` to see them; staging sets all three). Static pages read
them at build time.

## The local API

The CMS's REST endpoints, answered from `src/data` (`src/lib/cms/local/`):

| Endpoint                                               | In the CMS today          |
| ------------------------------------------------------ | ------------------------- |
| `/api/articles`, `/api/categories`, `/api/tags`        | yes                       |
| `/api/writer-profiles`, `/api/stock-tickers`           | yes                       |
| `/api/site-navigation` (single type)                   | yes                       |
| `/api/static-pages`, `/api/site-setting` (single type) | planned (CMS-13, 14)      |
| `/api/financial-products`, `/api/product-categories`   | yes (Public read: CMS-20) |
| `/api/providers`                                       | yes (Public read: CMS-20) |

It takes the same parameters as Strapi 5 (`filters`, `sort`, `pagination`,
`fields`, `populate`, `status`, and `/<documentId>` reads) and refuses unknown
keys with the same `400 ValidationError` (`strictParams`). Fields the CMS
doesn't have yet (planned CMS-nn, `src/lib/cms/local/schema.ts`) are served
here; against a real CMS, `CMS_CAPABILITIES` lists the ones it has. Try:
`http://localhost:3000/api/articles?fields[0]=title&populate[author]=true`.

## Edit the content

Everything a reader sees comes from `src/data/`:

| File                                 | CMS type                                      |
| ------------------------------------ | --------------------------------------------- |
| `articles/<category>.ts`             | Article, one file per topic                   |
| `categories.ts`                      | Category, in menu order                       |
| `tags.ts`, `writer-profiles.ts`      | Tag, Writer Profile                           |
| `stock-tickers.ts`                   | Stock Ticker                                  |
| `site-navigation.ts`                 | Site Navigation (menu, lead)                  |
| `comparison.ts`                      | Financial Product, Product Category, Provider |
| `glossary.ts`                        | the Kamus Keuangan Static Page body           |
| `static-pages.ts`, `site-setting.ts` | Static Page, Site Setting                     |
| `media.ts`                           | upload files (public/images)                  |

Field names are the CMS attribute names (`lead_text`, `primary_category`,
`full_name`). Relations are slugs, images are `media.ts` keys. Article bodies
use the helpers in `src/data/blocks.ts`:
`p('Teks ', link('/artikel/slug', 'judul'), '.')`, `h2('Judul bagian')`,
`ul('satu', 'dua')`. The local API checks every relation and internal link at
build: an unknown slug stops `pnpm build` and names the entry.

An article can carry a YouTube video at the top: add `video` (the CMS's
`article.video`) with `embedUrl` (`https://www.youtube.com/embed/<id>`), and the
`title`, `channel`, `uploadedAt` (UTC) and `duration` (ISO 8601, e.g.
`PT5M18S`) as YouTube shows them, plus a one- or two-sentence `caption`. Pick a
video that can be embedded and was uploaded before the article's date; the
build checks the link form, the duration, the date and that no other article
uses the same video. The player loads only when the reader presses play.

Every article's `author` is the team profile `tim-redaksi`; its name shows
without a link. Set `reviewer` (and `last_reviewed_at`) to a reviewer's slug
to mark the article "Terverifikasi"; reviewers have a profile page at
`/peninjau/<slug>`, with `background` and `financial_view` as plain text
(a blank line starts a paragraph).

The menu is `menu_item` in `site-navigation.ts`: an entry with several
`category_ref` opens the topic panel, one opens that category's children, and
a `url` of `/bandingkan`, `/penyedia`, `/kalkulator` or `/tentang-kami` opens
those lists. Comparison links (`apply_url`, `website_url`, `source_url`) must
stay on `https://example.com/` until real data replaces the demo set.

An `interview` article shows its turns as speech bubbles after the body. Add
`interview_dialogues`, one entry per turn, with the CMS's field names:
`speaker_name`, `speaker_role`, `message` (plain text; a blank line, `\n\n`,
starts a new paragraph), `position` (`left` for the interviewer, pink;
`right` for the guest, orange) and optionally `speaker_avatar`. Keep `content`
for the intro. The build stops when an interview has no turn on one side, or a
turn without a name, message or position.

## Code style

The owner's webReader style (pack: `context/conventions.md`, ADR-0013):

- Tabs (shown 4 wide), single quotes, width 100. Prettier enforces this in
  `pnpm verify`.
- JSDoc on every export.
- Every `catch` that changes behaviour logs through `src/lib/log.ts`.
- Configuration is read once, and unknown settings are reported at server
  start (`src/instrumentation.ts`).
- Commits: `<Area>: <imperative summary>` with a bullet body.

## Check before a PR

```bash
pnpm verify        # lint, format check, typecheck, unit tests, build
pnpm test:e2e      # Playwright + axe against a production build (builds first)
```

With the e2e build running (`node scripts/with-e2e-env.mjs pnpm start -p 3100`):

```bash
pnpm seo:check     # titles, descriptions, canonicals, H1, JSON-LD, sitemap
pnpm lhci          # Lighthouse CI budgets (mobile)
```

## Layout

```text
src/app            routes (thin): params → content function → view; api/ = the local API
src/features       page views
src/components     presentational components (+ __fixtures__ for tests/harness)
src/lib/content    data functions routes call
src/lib/cms        the only code that knows Strapi JSON: client, queries, mappers
src/lib/cms/local  the local API: schema, documents from src/data, Strapi query rules
src/data           the hardcoded content, in CMS field names
src/lib/seo, structured-data, analytics, …
src/types          domain contracts (reviewed by the CMS owner, CODEOWNERS)
public/images      placeholder images for the content
tests/e2e          Playwright suites
```

Draft preview and the revalidation webhook are not in this phase; they return
with the CMS, from git history at `4b8220f` (pack: PRP-0002.p1 §S4.9).
