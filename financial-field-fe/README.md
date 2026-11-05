# financial-field-fe

Public website of **Financial Field Indonesia**: a Next.js 16 news and article
portal that reads content from the sibling Strapi app (`../financial-field-cms`).

**Source of truth:** the implementation pack at
`web-implementation-documents/financial-field-indonesia/` (outside this repo).
Start with its `README.md`, `STATE.md` and `agent-rules.md`. Current work:
`PRP-0002.p1` (Phase 1, news portal).

## Run locally

```bash
nvm use               # Node 24 (.nvmrc). The CMS runs on Node 20.
pnpm install
cp .env.example .env.local   # fill REVALIDATE_SECRET and PREVIEW_SECRET
pnpm dev                     # http://localhost:3000 (start Strapi first)
```

Component harness: http://localhost:3000/harness (local only).

## Code style

The owner's webReader style (pack: `context/conventions.md`, ADR-0013):

- Tabs (shown 4 wide), single quotes, width 100. Prettier enforces this in
  `pnpm verify`.
- JSDoc on every export.
- Every `catch` that changes behaviour logs through `src/lib/log.ts`.
- Configuration is read once, and unknown settings are reported at server
  start (`src/instrumentation.ts`).
- Commits: `<Area>: <imperative summary> (<task ids>)` with a bullet body.

## Check before a PR

```bash
pnpm verify        # lint, format check, typecheck, unit tests, build
pnpm test:e2e      # Playwright + axe against a mock CMS (builds first)
```

With the e2e build running (`node scripts/with-e2e-env.mjs pnpm start -p 3100`
plus `node scripts/with-e2e-env.mjs node tests/mock-cms/server.mjs`):

```bash
pnpm seo:check     # titles, descriptions, canonicals, H1, JSON-LD, sitemap
pnpm lhci          # Lighthouse CI budgets (mobile)
```

## CMS capabilities

Strapi runs with `strictParams`, so the site only requests CMS fields that
exist. `CMS_CAPABILITIES` (comma list, or `all`) switches each new field group
on as the matching CMS change lands. Names and mapping: `src/lib/cms/capabilities.ts`.

## Layout

```text
src/app          routes (thin): params → content function → view
src/features     page views
src/components   presentational components (+ __fixtures__ for tests/harness)
src/lib/content  data functions routes call
src/lib/cms      the only code that knows Strapi JSON
src/lib/seo, structured-data, analytics, …
src/types        domain contracts (reviewed by the CMS owner, CODEOWNERS)
tests/e2e        Playwright suites · tests/mock-cms   mock Strapi + fixtures
```
