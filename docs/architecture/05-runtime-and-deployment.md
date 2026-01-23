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

## Deployment (api)

The API is deployed outside of Vercel.

- Runtime target: AWS EC2 (single instance) + AWS RDS(Postgres)
- Region: `ap-northeast-2` (Seoul)
- Access: AWS Systems Manager (SSM) Session Manager
- Secrets: AWS Secrets Manager (DB master password)
- DNS/HTTPS: `api.<domain>` will be configured after the domain is decided

### Notes

- The API requires **Java 21** (`apps/api/build.gradle` toolchain).
- Since the final domain is not decided yet, the infra can be created first and DNS/HTTPS can be applied later.

### Runbook (manual)

1. Provision infra (Issue #59):
   - EC2 1 instance
   - RDS(Postgres) 1 instance (public access disabled)
   - Security groups: EC2 SG, RDS SG (5432 allowed only from EC2 SG)
   - EC2 instance profile: SSM + CloudWatch agent permissions
   - Secrets Manager: DB master credentials (RDS managed)
2. Connect to the instance via **SSM Session Manager** (no SSH keys).
3. Install runtime dependencies on EC2:
   - Java 21 (Amazon Corretto)
   - (Optional) Nginx (reverse proxy for 80/443 → 8080)
4. Configure the API runtime config:
   - `SPRING_DATASOURCE_URL=jdbc:postgresql://<rds-endpoint>:5432/demoday`
   - `SPRING_DATASOURCE_USERNAME=demoday`
   - `SPRING_DATASOURCE_PASSWORD` from Secrets Manager (do not print to logs)
   - `app.cors.allowed-origins=<comma-separated origins>`
   - `app.session.cookie-secure=true` (requires HTTPS)
   - `app.session.cookie-samesite=None` (for cross-origin cookie session; requires HTTPS)
5. Run the API:
   - Preferred: systemd service (restart on failure / boot)
   - Minimal: `java -jar <jar-path>`
6. Health check:
   - `GET /api/health` should return `"ok"`

### Rollback (minimal)

- Keep the previous jar, switch the running target, and restart.
- If this is a 1-day event, the simplest rollback is to stop the service and start the previous build.

### Teardown checklist (post-event)

- Terminate EC2
- Delete RDS instance (and snapshots if created)
- Delete security groups (EC2 SG, RDS SG)
- Delete IAM instance profile/role if not reused
