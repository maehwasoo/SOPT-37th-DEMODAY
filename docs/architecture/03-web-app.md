# Web App Architecture (`apps/web`)

## Tech stack

- Framework: Next.js (see `apps/web/package.json`)
- UI: React
- Styling: Tailwind CSS + CSS variables (`apps/web/src/styles/**`)
- Animation: `motion`
- Observability: `@sentry/nextjs` (+ optional GA script)

## Routing (Next.js App Router)

Routes live under `apps/web/src/app`.

- Root layout: `apps/web/src/app/layout.tsx`
  - Loads global CSS (`apps/web/src/styles/global.css`)
  - Injects GA script when `NEXT_PUBLIC_GA_ID` is set
- Tab group layout: `apps/web/src/app/(tabs)/layout.tsx`
  - Wraps tab pages with `Footer` and fixed `NavBottom`
  - Applies a mobile-first width constraint (`max-w-[var(--app-max-width)]`)
  - Adds safe-area bottom padding for fixed UI

## Route inventory (current)

`(tabs)` is a route group (it does not appear in the URL path).

| Route                  | File                                             | Notes                                |
| ---------------------- | ------------------------------------------------ | ------------------------------------ |
| `/`                    | `apps/web/src/app/(tabs)/page.tsx`               | Landing page (branding + event info) |
| `/products`            | `apps/web/src/app/(tabs)/products/page.tsx`      | Product list screen                  |
| `/products/:productId` | `apps/web/src/app/products/[productId]/page.tsx` | Product detail screen                |
| `/homepage`            | `apps/web/src/app/(tabs)/homepage/page.tsx`      | Placeholder page                     |
| `/leaflet`             | `apps/web/src/app/(tabs)/leaflet/page.tsx`       | Leaflet stamp screen                 |
| `/leaflet/scan`        | `apps/web/src/app/(tabs)/leaflet/scan/page.tsx`  | Leaflet QR scan screen               |

### Error handling

- Global error boundary: `apps/web/src/app/global-error.tsx`
  - Captures exceptions to Sentry
  - Falls back to Next.js default error page

## Local API proxy (development)

In development, the web app proxies `/api/*` to the backend:

- Config: `apps/web/next.config.ts`
- Rewrite rule (dev-only):
  - `/api/:path*` → `http://localhost:8080/api/:path*`

This allows the frontend to call `/api/*` without hardcoding the API origin during local development.

## Data sources (current)

The web app currently uses local mock data for product listings:

- Source: `apps/web/src/mocks/products.ts` (`MOCK_PRODUCTS`)
- Usage: `apps/web/src/app/(tabs)/products/ProductsPageClient.tsx`

No network calls are made for product data at this stage.

## Component organization

Components are grouped by responsibility:

- `apps/web/src/components/ui`: reusable UI primitives
- `apps/web/src/components/layout`: layout-level components (header/footer/nav)
- `apps/web/src/components/feature`: feature-level components (composed UI)
- `apps/web/src/components/icons`: SVG icon components

An aggregated export surface exists at:

- `apps/web/src/components/index.ts`

## Styling system

Global styling is composed of:

- `apps/web/src/styles/global.css`: global base styles and app-wide defaults
- `apps/web/src/styles/theme.css`: CSS variables (colors, typography utilities)
- `apps/web/src/styles/fonts.css`: font-face registrations

### Mobile width + safe-area policy

- Width target: 360–440px
  - Max container width is controlled via `--app-max-width` (`apps/web/src/styles/global.css`)
  - Layout wrappers use `max-w-[var(--app-max-width)]` and `mx-auto` for consistent centering
- Safe-area support (iOS notch / home indicator)
  - `export const viewport` enables `viewport-fit=cover` (`apps/web/src/app/layout.tsx`)
  - `--safe-area-*` CSS variables wrap `env(safe-area-inset-*)` (`apps/web/src/styles/global.css`)
  - Fixed bottom UI pads by `--safe-area-bottom` to avoid overlap (`apps/web/src/app/(tabs)/layout.tsx`)

## Storybook

- Config: `apps/web/.storybook/*`
- Stories: `apps/web/src/stories/**/*.stories.*`

Storybook loads the same global CSS as the app (`apps/web/.storybook/preview.ts`).

## Observability hooks

Sentry initialization is split by runtime:

- `apps/web/src/instrumentation.ts`
  - Loads `sentry.server.config.ts` for `nodejs` runtime
  - Loads `sentry.edge.config.ts` for `edge` runtime
  - Exposes `onRequestError` hook
- `apps/web/src/instrumentation-client.ts` initializes the client SDK

Sentry is enabled only when `NEXT_PUBLIC_SENTRY_DSN` is set.
