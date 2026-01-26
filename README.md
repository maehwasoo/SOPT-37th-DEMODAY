# 37기 SOPT 데모데이

37기 DIVE SOPT 데모데이 공식 웹사이트입니다.

## Monorepo 구조

- `apps/web`: Next.js (프론트엔드)
- `apps/api`: Spring Boot (백엔드)

## Architecture

### Runtime (concept-level, prod + preview)

```mermaid
flowchart LR
  Dev["Developer"]
  U["User / Browser"]
  DNS["Public DNS<br/>(example.com)"]

  subgraph Tooling["UI Documentation"]
    SB["Storybook (local)"]
  end

  subgraph Frontend["Frontend Hosting"]
    WebProd["Web App (prod)<br/>www.example.com"]
    WebPreview["Web App (preview)<br/>preview.example.com"]
  end

  subgraph Backend["Backend (optional)"]
    ApiEndpointProd["API Endpoint (prod)<br/>api.example.com<br/>Reverse Proxy / TLS"]
    ApiEndpointPreview["API Endpoint (preview)<br/>api-preview.example.com<br/>Reverse Proxy / TLS"]

    APIProd["Spring Boot API (prod)"]
    APIPreview["Spring Boot API (preview)"]
    DB[(PostgreSQL)]
  end

  subgraph SaaS["Observability & Analytics"]
    Sentry["Sentry"]
    GA["Google Analytics"]
  end

  Dev -.->|Runs locally| SB
  SB -.->|Shared UI components| WebProd
  SB -.->|Shared UI components| WebPreview

  U -->|DNS lookup| DNS
  DNS -->|HTTPS| WebProd
  DNS -->|HTTPS| WebPreview
  DNS -->|HTTPS| ApiEndpointProd
  DNS -->|HTTPS| ApiEndpointPreview

  WebProd -->|HTTPS| ApiEndpointProd
  WebPreview -->|HTTPS| ApiEndpointPreview

  ApiEndpointProd -->|Proxy| APIProd
  ApiEndpointPreview -->|Proxy| APIPreview

  APIProd -->|SQL| DB
  APIPreview -->|SQL| DB

  WebProd -.->|Errors & Performance| Sentry
  WebPreview -.->|Errors & Performance| Sentry
  WebProd -.->|Pageviews & Events| GA
  WebPreview -.->|Pageviews & Events| GA
```

### Deployment (API, optional)

> 본 문서의 도메인은 모두 예시(`example.com`)이며, 실제 운영 환경에서는 별도 도메인/인프라로 구성할 수 있습니다.

```mermaid
flowchart TB
  Dev["Developer"] -->|Push| GitHub["GitHub"]
  GitHub --> CI["CI/CD (GitHub Actions)"]

  subgraph Cloud["Cloud Provider"]
    OIDC["OIDC Assume Role"]
    ArtifactStore[(Artifact Storage)]
    RemoteCmd["Remote Command"]
    VM["Compute VM"]
    ProcMgr["Process Manager"]
  end

  CI -->|OIDC| OIDC
  CI -->|Upload artifact| ArtifactStore
  CI -->|Trigger| RemoteCmd
  RemoteCmd -->|Runs on instance| VM
  VM -->|Download artifact| ArtifactStore
  VM -->|Restart| ProcMgr

  ProcMgr -->|prod| APIProd["API (prod)"]
  ProcMgr -->|preview| APIPreview["API (preview)"]
```
