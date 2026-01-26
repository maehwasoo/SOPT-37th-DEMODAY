# 37기 SOPT 데모데이

37기 DIVE SOPT 데모데이 공식 웹사이트입니다.

## Monorepo 구조

- `apps/web`: Next.js (프론트엔드)
- `apps/api`: Spring Boot (백엔드)

## Architecture

### Runtime (prod + preview)

```mermaid
flowchart LR
  Dev["Developer"]
  U["User / Browser"]
  R53["Route 53 (Public DNS)"]
  EIP["Elastic IP (API EC2)"]

  subgraph Tooling["UI Documentation"]
    SB["Storybook (local)"]
  end

  subgraph Vercel["Frontend (Vercel)"]
    Web["Next.js Web App"]
  end

  subgraph AWS["Backend (AWS)"]
    subgraph EC2Host["EC2 (single instance)"]
      Nginx["Nginx (reverse proxy, 80/443, TLS via Certbot)"]
      APIProd["Spring Boot API (prod, 127.0.0.1:8080)"]
      APIPreview["Spring Boot API (preview, 127.0.0.1:8081)"]
    end

    RDS[(RDS PostgreSQL)]
  end

  subgraph SaaS["Observability & Analytics"]
    Sentry["Sentry"]
    GA["Google Analytics"]
  end

  Dev -.->|Runs locally| SB
  SB -.->|Shared UI components| Web

  U -->|DNS| R53
  R53 -->|CNAME www / preview| Web
  R53 -->|A api / api-preview| EIP

  U -->|HTTPS| Web
  Web -->|HTTPS api.sopt-demoday.org| EIP
  Web -->|HTTPS api-preview.sopt-demoday.org| EIP

  EIP -->|80/443| Nginx
  Nginx -->|proxy_pass| APIProd
  Nginx -->|proxy_pass| APIPreview

  APIProd -->|JDBC 5432| RDS
  APIPreview -->|JDBC 5432| RDS

  Web -.->|Errors & Performance| Sentry
  Web -.->|Pageviews & Events| GA
```

- EC2 SG inbound: `80/443` public, `22` allowlisted (SSH).
- RDS: public access `false`; SG inbound `5432` is restricted to the EC2 security group only.

### Deployment (API)

```mermaid
flowchart TB
  Dev["Developer"] -->|Push| GitHub["GitHub"]
  GitHub --> GHA["GitHub Actions"]

  subgraph AWS["AWS"]
    IAM["Assume Role (OIDC)"]
    S3[(S3 artifacts)]
    SSM["SSM Run Command"]
    EC2["EC2 instance"]
    Systemd["systemd"]
  end

  GHA -->|OIDC| IAM
  GHA -->|Upload api.jar| S3
  GHA -->|ssm send-command| SSM
  SSM -->|Runs on instance| EC2
  EC2 -->|Download api.jar| S3
  EC2 -->|systemctl restart| Systemd

  Systemd -->|prod| APIProd["demoday-api (:8080)"]
  Systemd -->|preview| APIPreview["demoday-api-preview (:8081)"]
```
