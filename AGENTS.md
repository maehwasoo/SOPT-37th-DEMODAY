# SOPT-37th-DEMODAY (Repo Agent Guide)

This file is the **Map of Contents (MOC)** for docs and architecture notes in this repository.
Keep this file short and link-driven.

## 1) Project root (scope)

- This directory (`SOPT-37th-DEMODAY/`) is the **actual project root** for development, builds, CI, and PRs.
- Documentation lives under `docs/` and should be used as the first stop for architecture questions.

## 2) Documentation MOC

### Start here

- Docs index: [`docs/README.md`](./docs/README.md)
- Architecture index (reading order): [`docs/architecture/README.md`](./docs/architecture/README.md)

### Architecture pages (direct links)

- System overview: [`docs/architecture/01-system-overview.md`](./docs/architecture/01-system-overview.md)
- Repository structure: [`docs/architecture/02-repo-structure.md`](./docs/architecture/02-repo-structure.md)
- Web app (Next.js): [`docs/architecture/03-web-app.md`](./docs/architecture/03-web-app.md)
- API app (Spring Boot): [`docs/architecture/04-api-app.md`](./docs/architecture/04-api-app.md)
- Runtime & deployment: [`docs/architecture/05-runtime-and-deployment.md`](./docs/architecture/05-runtime-and-deployment.md)
- Observability (Sentry/GA): [`docs/architecture/06-observability.md`](./docs/architecture/06-observability.md)
- Testing & quality: [`docs/architecture/07-testing-and-quality.md`](./docs/architecture/07-testing-and-quality.md)
- Leaflet stamp contract: [`docs/architecture/08-leaflet-stamp-contract.md`](./docs/architecture/08-leaflet-stamp-contract.md)

## 3) Quick pointers (read this when stuck)

- Local dev entrypoint: `README.md` (run `docker compose up -d`, then `pnpm dev`)
- Dev API proxy (web → api): `apps/web/next.config.ts`
- Local DB config: `docker-compose.yml` + `apps/api/src/main/resources/application.properties`
- Sentry enablement: `.env.example` + `apps/web/src/instrumentation*.ts`

## 4) Documentation rules (keep docs useful)

- Prefer **linking to code/config** rather than duplicating it.
- If docs conflict with the repository state, treat docs as outdated and update them in the same PR.
- When adding a new doc page, link it from `docs/README.md` and this MOC.
