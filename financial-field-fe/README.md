# financial-field-fe

Public website of **Financial Field Indonesia**: a Next.js 16 news and article
portal. For now the content is **hardcoded in `src/data/`**: 60 demo articles,
the topic tree, tags, authors and trust pages. The frontend doesn't call the
CMS until the client's wireframe and roadmap are settled (pack: PRP-0002.p1
§S4.8).

**Source of truth:** the implementation pack at
`web-implementation-documents/financial-field-indonesia/` (outside this repo).
Start with its `README.md`, `STATE.md` and `agent-rules.md`. Current work:
`PRP-0002.p1` (Phase 1, news portal).

## Run locally

```bash
nvm use               # Node 24 (.nvmrc)
pnpm install
cp .env.example .env.local   # optional: every value has a local default
pnpm dev                     # http://localhost:3000, no CMS needed
```

Component harness: http://localhost:3000/harness (local only).

## Edit the content

Everything a reader sees comes from `src/data/`:

| File                     | Holds                                         |
| ------------------------ | --------------------------------------------- |
| `articles/<category>.ts` | the articles, one file per top-level category |
| `categories.ts`          | the topic tree, in menu order                 |
| `tags.ts`, `authors.ts`  | tags and the six fictional people             |
| `pages.ts`, `site.ts`    | trust pages and brand settings                |
| `navigation.ts`          | the featured articles on the home page        |
| `media.ts`               | the images in `public/images/`                |

Article bodies use the helpers in `src/data/blocks.ts`:
`p('Teks ', link('/artikel/slug', 'judul'), '.')`, `h2('Judul bagian')`,
`ul('satu', 'dua')`. Relations are slugs. `src/lib/content/store.ts` checks
them, so an unknown slug or a broken internal link stops `pnpm build` and
names the article and the slug. A new article needs only an entry in its
category file.

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
src/app          routes (thin): params → content function → view
src/features     page views
src/components   presentational components (+ __fixtures__ for tests/harness)
src/lib/content  data functions routes call; the only reader of src/data
src/data         the hardcoded content
src/lib/seo, structured-data, analytics, …
src/types        domain contracts (reviewed by the CMS owner, CODEOWNERS)
public/images    placeholder images for the content
tests/e2e        Playwright suites
```

The CMS integration (Strapi client, mappers, preview, revalidation webhook)
was removed for this phase. It comes back when the content model is settled,
from git history at `4b8220f` (pack: PRP-0002.p1 §S4.9).
