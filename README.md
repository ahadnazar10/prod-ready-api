# 🚀 Prod-Ready API (Node.js + Express + GraphQL + MySQL + Redis)

A **production-grade REST + GraphQL backend** built with scalability, security, and observability in mind.  
Implements authentication, role-based access, rate limiting, structured logging, Prometheus metrics, OpenTelemetry tracing, and full Dockerized deployment.

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Runtime** | Node.js (Express.js) |
| **Database** | MySQL (via Prisma ORM) |
| **Cache / Rate Limiting** | Redis |
| **Auth** | JWT (Access + Refresh Tokens), RBAC |
| **API Layer** | REST + GraphQL |
| **Docs** | Swagger UI + GraphQL Playground |
| **Observability** | Prometheus, OpenTelemetry, JSON structured logs |
| **DevOps** | Docker, Docker Compose, GitHub Actions |
| **Testing** | Jest + Supertest |
| **Infra Config** | Environment variables (`.env`) |

---

## 🧠 Features

### 🔐 Authentication & Security
- Secure password hashing using `bcrypt`
- JWT-based access + refresh tokens
- Role-based access control (Admin/User)
- Input validation & centralized error handling

### ⚙️ API Design
- RESTful endpoints for users, projects, tasks, comments
- GraphQL API for flexible nested queries
- Cursor-based pagination, filtering, and sorting
- OpenAPI 3.0 documentation via Swagger UI

### ⚡ Performance & Scalability
- Redis-based rate limiting (per-IP and per-user)
- Caching layer (future-ready for heavy reads)
- Horizontal scalability with Docker & environment-based config

### 🧩 Observability
- JSON structured logs (with request ID, latency, user ID)
- Prometheus metrics exposed at `/metrics`
- OpenTelemetry traces (API → DB → Redis)

### 🧰 DevOps & CI/CD
- Dockerized for reproducible environments
- `docker-compose.yml` spins up: API + MySQL + Redis + Prometheus
- GitHub Actions: lint → test → build → deploy
- `.env` for local config + secrets managed via environment variables

---

## 🏗️ Project Structure

