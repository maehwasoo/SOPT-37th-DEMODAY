# Testing & Quality

## Linting

- Root: `pnpm lint` → `turbo run lint`
- Web: `pnpm --filter sopt-37th-demoday lint`
- API: not currently configured with a Java linter in this repo (add when needed)

## Formatting

- Root: `pnpm format` / `pnpm format:check`
- Web: `prettier` is configured in `apps/web/package.json`

## Pre-commit hook

Lefthook runs `lint-staged` before commits:

- config: `lefthook.yml`
- rules: root `package.json` → `lint-staged`

## Tests

- API: `pnpm --filter api test` → `./gradlew test`
- Turbo `test` task is defined in `turbo.json` (run via `turbo run test` when needed)

## Storybook (web)

- Run: `pnpm storybook`
- Build: `pnpm build-storybook`
