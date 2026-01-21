# API App Architecture (`apps/api`)

## Tech stack

- Framework: Spring Boot (Gradle; see `apps/api/build.gradle`)
- Java toolchain: Java 21
- Persistence: Spring Data JPA
- DB migrations: Flyway
- API docs: Springdoc OpenAPI (Swagger UI)
- Database: Postgres (local via `docker-compose.yml`)

## App entrypoint

- Main class: `apps/api/src/main/java/com/sopt/demoday/api/ApiApplication.java`

## HTTP surface (current)

Currently implemented endpoints:

- `GET /api/health` → `"ok"`
  - Controller: `apps/api/src/main/java/com/sopt/demoday/api/health/HealthController.java`

## Configuration

Runtime properties are in:

- `apps/api/src/main/resources/application.properties`

Notable settings:

- `server.port=8080`
- DB connection to local Postgres (`jdbc:postgresql://localhost:5432/demoday`)
- `spring.jpa.hibernate.ddl-auto=none` (schema managed by Flyway)

## Database migrations (Flyway)

Flyway migrations live under:

- `apps/api/src/main/resources/db/migration`

Current baseline:

- `V1__init.sql`: baseline migration placeholder (schema is intentionally deferred)

## Tests

- Basic Spring context smoke test:
  - `apps/api/src/test/java/com/sopt/demoday/api/ApiApplicationTests.java`

## Notes on current scope

The API module is intentionally minimal at this stage (health endpoint + migration baseline).
When domain requirements (e.g., QR policy/auth) are finalized, follow-up issues should define:

- schema (Flyway migrations)
- domain model and application boundaries
- API endpoints consumed by `apps/web`
