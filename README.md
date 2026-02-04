# 37기 SOPT 데모데이

37기 DIVE SOPT 데모데이 공식 웹사이트입니다.

## Monorepo 구조

- `apps/web`: Next.js (프론트엔드)
- `apps/api`: Spring Boot (백엔드)

## Tech Stack

### Frontend (`apps/web`)

| 역할                       | 종류                                                                                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Framework`**            | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)                                                                              |
| **`Library`**              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)                                                                                     |
| **`Programming Language`** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                 |
| **`Styling`**              | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)                                                              |

### Backend (`apps/api`)

| 역할                       | 종류                                                                                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Framework`**            | ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)                                 |
| **`Programming Language`** | ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)                                                    |
| **`Build Tool`**           | ![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)                                                 |
| **`Database`**             | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)                                      |

### Tooling / Infra (Repo)

| 역할                  | 종류                                                                                                                                                                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Package Manager`** | ![PNPM](https://img.shields.io/badge/pnpm-%23F29F05?style=for-the-badge&logo=pnpm&logoColor=white)                                                                                                                                                                |
| **`Monorepo`**        | ![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)                                                                                                                                                   |
| **`Formatting`**      | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)                                         |
| **`CI`**              | ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)                                                                                                                                   |
| **`Deployment`**      | ![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white)                                                                                                                                                       |
| **`Local Infra`**     | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)                                                                                                                                                            |
| **`Version Control`** | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)                                               |

## Architecture

### Runtime

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

### Deployment

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
