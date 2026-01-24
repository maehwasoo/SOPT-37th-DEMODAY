# Leaflet Stamp Contract

This document defines the API contract and cross-origin/session policy for the **leaflet stamp** feature.
It is intended to unblock parallel development across `apps/web` and `apps/api`.

## Decisions (fixed)

- Participant identity is `(teamKey, name)` (unique key).
  - Visitors without a team use `teamKey=external`.
- QR entry opens the **web** domain:
  - `https://<web-domain>/leaflet?code=...`
- Stamp claim is **code-based**:
  - The API resolves `code -> stampKey` via DB mapping (ops can change mappings without redeploy).
- Production routing uses an **API subdomain**:
  - `https://api.<domain>` (cross-origin requests from web to api)

## Stamp keys (allowlist)

Source of truth (current UI list): `apps/web/src/components/feature/leaflet-stamp/leafletStamp.constants.ts`

Total: **12**

- `amp`
- `carena`
- `cherrish`
- `clustar`
- `snappin`
- `comfit`
- `flint`
- `kareer`
- `smashing`
- `kiero`
- `poti`
- `makers`

## Web flow (recommended)

1. User opens `GET /leaflet?code=...` on the web domain.
2. If not logged in, redirect to `/login` while preserving `code` (example: `?next=/leaflet?code=...`).
3. After successful login:
   - redirect back to `/leaflet?code=...`
   - call `POST https://api.<domain>/api/leaflet/claim` with `{ code }` and `credentials: 'include'`
4. Fetch progress and render completed stamps in UI.

UI integration anchor:

- `/leaflet` is currently static: `apps/web/src/app/(tabs)/leaflet/page.tsx`
- `LeafletStampScreen` supports server-driven completion via `completedStampKeys`:
  - `apps/web/src/components/feature/leaflet-stamp/LeafletStampScreen.tsx`

## Environment variables (domain-not-final-safe)

### Web (Next.js)

- `NEXT_PUBLIC_API_ORIGIN`: API base origin (example: `https://api.example.com`)

### API (Spring Boot)

Suggested (names are not implemented yet; keep consistent once chosen):

- `APP_CORS_ALLOWED_ORIGINS`: comma-separated allowlist (example: `http://localhost:3000,https://<web-domain>`)
- `APP_SESSION_COOKIE_NAME`: default `sid`
- `APP_SESSION_COOKIE_SECURE`: `true|false` (prod should be `true`)
- `APP_SESSION_COOKIE_SAMESITE`: `Lax|None`

Notes:

- When `credentials=true`, CORS cannot use `Access-Control-Allow-Origin: *`.
- `SameSite=None` requires `Secure=true` and HTTPS.

## API contract (draft)

All endpoints are served from `https://api.<domain>` and use the `/api` prefix.

### Auth

#### POST `/api/auth/login`

Request body:

```json
{ "teamKey": "external", "name": "홍길동" }
```

Behavior:

- Finds or creates Participant by `(teamKey, name)`.
- Creates a Session and sets an httpOnly cookie.

Response:

- `200 OK` with optional participant payload, or `204 No Content` (TBD)
- `Set-Cookie: sid=...; HttpOnly; Path=/; ...`

#### POST `/api/auth/logout`

Behavior:

- Revokes the current session (best-effort) and clears cookie.

Response:

- `204 No Content`

#### GET `/api/me`

Response:

- `200 OK` with participant info
- `401 Unauthorized` if session is missing/invalid/expired

### Leaflet

#### GET `/api/leaflet/progress`

Response body:

```json
{
  "totalCount": 12,
  "completedCount": 3,
  "completedStampKeys": ["amp", "poti", "makers"]
}
```

Errors:

- `401 Unauthorized` if not logged in

#### POST `/api/leaflet/claim`

Request body:

```json
{ "code": "XXXX-XXXX" }
```

Behavior:

- Resolves `code -> stampKey` from DB mapping.
- Inserts stamp claim once per participant (idempotent by unique constraint).

Response:

- `200 OK` (payload TBD; recommended to return updated `completedStampKeys`)

Errors:

- `401 Unauthorized` not logged in
- `404 Not Found` or `422 Unprocessable Entity` invalid/expired/disabled code (pick one and standardize)
- `409 Conflict` already claimed for this participant

## Error response shape (proposal)

For non-2xx responses, use a consistent JSON shape:

```json
{
  "errorCode": "LEAFLET_CLAIM_DUPLICATE",
  "message": "Already claimed",
  "details": {}
}
```
