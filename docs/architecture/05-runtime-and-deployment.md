# Runtime & Deployment

## Local development (recommended)

1. Start Postgres:
   - `docker compose up -d`
2. Install dependencies:
   - `pnpm install`
3. Start dev servers:
   - `pnpm dev`

### What runs on `pnpm dev`

`pnpm dev` runs `turbo run dev`, which delegates to each app:

- `apps/web`: `next dev` (port `3000`)
- `apps/api`: `./gradlew bootRun` (port `8080`)

## Local database

Local Postgres is provided via `docker-compose.yml`:

- DB: `demoday`
- User: `demoday`
- Password: `demoday`
- Port: `5432:5432`

The API is configured to use the same credentials by default (`apps/api/src/main/resources/application.properties`).

## Deployment (web)

Vercel build configuration is defined in `vercel.json`:

- Build target: `apps/web/package.json`
- Builder: `@vercel/next`

If the API is deployed, it is not configured via Vercel in this repository and should be documented when the deployment target is decided.
