# Observability

## Sentry (web)

The web app integrates Sentry via `@sentry/nextjs`.

### Runtime initialization

- Client: `apps/web/src/instrumentation-client.ts`
- Server: `apps/web/src/sentry.server.config.ts`
- Edge: `apps/web/src/sentry.edge.config.ts`
- Next.js hook: `apps/web/src/instrumentation.ts`

Sentry is enabled only when:

- `NEXT_PUBLIC_SENTRY_DSN` is set (see `.env.example`)

### Source maps upload (CI/deploy)

`apps/web/next.config.ts` enables the Sentry Webpack plugin only when:

- `SENTRY_ORG` and `SENTRY_PROJECT` are set

`SENTRY_AUTH_TOKEN` is required for uploads and must be kept secret.

## Google Analytics (web)

GA4 is configured via:

- `NEXT_PUBLIC_GA_ID` (see `.env.example`)

When the variable is set, `apps/web/src/app/layout.tsx` injects GA scripts after hydration.
