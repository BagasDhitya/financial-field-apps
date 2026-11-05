# syntax=docker/dockerfile:1
#
# Financial Field Indonesia frontend (ADR-0015, PRP-0002.p1 §D4.4).
# Build context: financial-field-fe/. Built by deploy/staging/compose.sh, never pushed.
#
# Targets:
#   runner (last, the default): Next.js standalone server, non-root
#   seed:   Node 24 with scripts/ only, for the one-off seed service (ADR-0014)

ARG NODE_IMAGE=node:24-bookworm-slim

FROM ${NODE_IMAGE} AS deps
WORKDIR /app
RUN npm install --global pnpm@11.25.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
# NEXT_PUBLIC_* values are inlined at build time (DSC-0014), and prerendered
# pages bake SITE_ENV-dependent output, so all four are build args.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_CMS_URL=http://cms:1337
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=
ARG SITE_ENV=staging
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
	NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL} \
	NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID} \
	SITE_ENV=${SITE_ENV} \
	NEXT_TELEMETRY_DISABLED=1
COPY . .
# No CMS is reachable while the image builds, so it builds as CI does: pages
# prerender empty and fill in at runtime through ISR and the webhook
# (DSC-0019). The two secrets are placeholders for this step only; the real
# values arrive at runtime and are never in the image.
RUN SKIP_CMS_FETCH=1 \
	REVALIDATE_SECRET=build-only-placeholder \
	PREVIEW_SECRET=build-only-placeholder \
	pnpm build

FROM ${NODE_IMAGE} AS seed
WORKDIR /app
COPY scripts ./scripts
USER node
ENTRYPOINT ["node"]
CMD ["scripts/seed-cms/seed.mjs"]

FROM ${NODE_IMAGE} AS runner
ENV NODE_ENV=production \
	NEXT_TELEMETRY_DISABLED=1 \
	PORT=3000 \
	HOSTNAME=0.0.0.0
WORKDIR /app
# .next stays writable for the ISR cache.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
# With staging basic auth every page answers 401, so any status below 500
# means the server is up.
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
	CMD ["node", "-e", "fetch('http://127.0.0.1:3000/robots.txt').then((r) => process.exit(r.status < 500 ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["node", "server.js"]
