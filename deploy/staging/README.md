# Staging stack (Docker Compose)

Postgres 16, the Strapi CMS, the Next.js frontend and a one-off seed service, for the staging demo (pack: ADR-0015, ADR-0014, PRP-0002.p1 Part C). For now it runs on the owner's machine; the SumoPod VPS comes later. **Staging is built from `development` only.**

| File | Purpose |
|---|---|
| `docker-compose.yml` | The stack (`db`, `cms`, `fe`, `seed`) |
| `cms.Dockerfile` + `cms.Dockerfile.dockerignore` | CMS image; build context `../../financial-field-cms` (unchanged) |
| `../../financial-field-fe/Dockerfile` | Frontend image (`runner`) and the seed image (`seed`) |
| `.env.staging.example` | Every variable name; no values |
| `generate-secrets.sh` | Creates the git-ignored `.env.staging` with generated secrets |
| `compose.sh` | `docker compose` with this file, `.env.staging` and a git-SHA image tag |

Quick start: run these from the repository root. The full steps (CMS bootstrap, smoke check, reset, backup) are in the pack's `runbooks/staging-docker.md`.

```bash
./deploy/staging/generate-secrets.sh
./deploy/staging/compose.sh build
./deploy/staging/compose.sh up -d
# CMS bootstrap in http://localhost:1337/admin (runbook step 4), then:
./deploy/staging/compose.sh --profile seed run --rm seed
./deploy/staging/compose.sh --profile seed run --rm seed scripts/seed-cms/verify.mjs
```

Never commit `.env.staging`. Images are local only; nothing is pushed to a registry.
