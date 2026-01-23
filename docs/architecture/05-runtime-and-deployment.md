# Runtime & Deployment

For a detailed inventory of the current AWS setup and the API deploy pipeline, see:

- [`docs/architecture/09-aws-infrastructure-and-deployment.md`](./09-aws-infrastructure-and-deployment.md)

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

DNS is managed via Route 53 (see `docs/architecture/09-aws-infrastructure-and-deployment.md` for the current records).

## Deployment (api)

The API is deployed outside of Vercel and runs on AWS.

- Runtime target: AWS EC2 (single instance) + AWS RDS(Postgres)
- Region: `ap-northeast-2` (Seoul)
- Access: AWS Systems Manager (SSM) Session Manager (SSH is also possible, but SSM is preferred)
- Secrets: AWS Secrets Manager (RDS master password)
- DNS/HTTPS: `https://api.sopt-demoday.org` (see Route 53 inventory in `docs/architecture/09-aws-infrastructure-and-deployment.md`)

### Notes

- The API requires **Java 21** (`apps/api/build.gradle` toolchain).
- The EC2 deploy workflow expects a systemd service named `demoday-api` on the instance.

### Deployment automation (current)

Production deploy is automated via GitHub Actions:

- Workflow: `.github/workflows/deploy-api.yml`
- Trigger: `push` to `main` (API changes only) or manual (`workflow_dispatch`)
- Mechanism: build jar → upload to S3 → SSM send-command on EC2 → restart `demoday-api` → health check

### Runbook (manual fallback)

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
- Release Elastic IP (to stop public IPv4 hourly charge)
- Delete RDS instance (and snapshots if created)
- Delete artifacts under the S3 prefix if you don't need rollback history
- Delete security groups (EC2 SG, RDS SG)
- Delete IAM instance profile/role if not reused
