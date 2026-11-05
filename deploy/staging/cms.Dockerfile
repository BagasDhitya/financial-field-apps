# syntax=docker/dockerfile:1
#
# Staging image for financial-field-cms (ADR-0015, PRP-0002.p1 §D4.5).
# Build context: financial-field-cms/, unchanged. This file and its ignore file
# (cms.Dockerfile.dockerignore) live outside the CMS folder because the CMS
# belongs to the CMS developer. Built by deploy/staging/compose.sh, never pushed.

ARG NODE_IMAGE=node:20-bookworm-slim

FROM ${NODE_IMAGE} AS build
# Compilers only for this stage, in case better-sqlite3 has no prebuilt binary
# for the platform (it is a CMS dependency; staging itself uses Postgres).
RUN apt-get update \
	&& apt-get install --yes --no-install-recommends python3 make g++ \
	&& rm -rf /var/lib/apt/lists/*
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
# Dev dependencies stay: `typescript` is one, and a TypeScript Strapi project
# may read its tsconfig at `strapi start`. A bigger image is fine for staging;
# revisit (npm prune --omit=dev) once the first run confirms it.
RUN npm run build

FROM ${NODE_IMAGE} AS runtime
ENV NODE_ENV=production \
	HOST=0.0.0.0 \
	PORT=1337 \
	STRAPI_TELEMETRY_DISABLED=true
WORKDIR /opt/app
COPY --from=build --chown=node:node /opt/app ./
# The uploads volume mounts here; the directory exists, owned by `node`, so a
# new named volume starts with the right owner.
RUN mkdir -p public/uploads && chown node:node public/uploads
USER node
EXPOSE 1337
HEALTHCHECK --interval=30s --timeout=5s --start-period=180s --retries=5 \
	CMD ["node", "-e", "fetch('http://127.0.0.1:1337/_health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["npm", "run", "start"]
