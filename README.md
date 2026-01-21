# 37기 SOPT 데모데이

37기 DIVE SOPT 데모데이 공식 웹사이트입니다.

## Monorepo 구조

- `apps/web`: Next.js (프론트엔드)
- `apps/api`: Spring Boot (백엔드)

## 문서

- 아키텍처/구조 문서: [`docs/README.md`](./docs/README.md)

## 로컬 실행

### 요구 사항

- Node.js + pnpm
- Java 21
- Docker (Postgres)

### 실행

1. Postgres 실행: `docker compose up -d`
2. 의존성 설치: `pnpm install`
3. 개발 서버 실행: `pnpm dev`

### 접속

- Web: `http://localhost:3000`
- API: `http://localhost:8080` (health: `/api/health`)
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`

> `apps/web`는 로컬 개발 시 `/api/*` 요청을 `http://localhost:8080/api/*`로 프록시합니다.
