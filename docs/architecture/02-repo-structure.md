# Repository Structure

## Monorepo layout

The repository is managed as a pnpm workspace:

- Workspace config: `pnpm-workspace.yaml`
  - `apps/*`
  - `packages/*` (may be empty depending on the current iteration)

At the moment, the primary packages are:

- `apps/web` (Next.js)
- `apps/api` (Spring Boot)

The repository pins the pnpm version via `packageManager` in the root `package.json`.

## Task orchestration (Turborepo)

Root scripts in `package.json` delegate to Turborepo:

- `pnpm dev` → `turbo run dev`
- `pnpm build` → `turbo run build`
- `pnpm lint` → `turbo run lint`
- `pnpm format` / `pnpm format:check`
- `pnpm storybook` / `pnpm build-storybook`

### App-level scripts

Each app exposes scripts that match Turborepo task names so `turbo run <task>` can execute them:

- Web: `apps/web/package.json`
  - `dev` / `build` / `lint` / `format` / `storybook` / `build-storybook`
- API: `apps/api/package.json`
  - `dev` / `build` / `test` (delegates to Gradle via `./gradlew`)

Turborepo config: `turbo.json`

- `dev` / `storybook` are marked as `persistent` and `cache: false`
- `build` caches outputs such as `.next/**`, `build/**`, `storybook-static/**`

## Code quality & formatting

- ESLint: `eslint.config.mjs`
  - Based on `eslint-config-next` (Core Web Vitals + TypeScript rules)
  - Enforces `import/order` (with `@/**` alias support)
- Prettier: `.prettierrc` (+ `prettier-plugin-tailwindcss`)
- Prettier ignores: `.prettierignore`

### Git hooks

Hooks are managed by Lefthook:

- config: `lefthook.yml`
- install: `pnpm install` triggers `prepare` → `lefthook install`
- pre-commit runs `lint-staged` (see root `package.json`)

## Repo-level runtime config

- Local Postgres: `docker-compose.yml`
- Web deployment on Vercel: `vercel.json` (build target is `apps/web`)
- Shared env example: `.env.example` (Sentry + GA for web)

## GitHub automation (labels/assignees)

- `.github/workflows/auto-triage.yml` assigns and labels issues/PRs based on the title prefix:
  - e.g. `[docs] ...` → `📄 Docs`
