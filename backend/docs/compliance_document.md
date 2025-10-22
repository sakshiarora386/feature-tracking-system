# Backend Code Compliance & Guardrails

**For:** Node.js + Express + Prisma Applications
**Version:** 1.0
**Last Updated:** {{DATE}}
**Owner:** Backend Engineering Team

---

## 1. 📘 Purpose

This document defines code-level compliance standards for backend development in our Node.js ecosystem.
It ensures:

* Code quality and maintainability
* Security and data protection
* Consistency across services
* Ease of onboarding and auditing

---

## 2. 🧱 Project Structure Compliance

**Goal:** Maintain predictable and modular project architecture.

**Requirements:**

* Use **feature-based folder structure** (`/modules/user`, `/modules/auth`, etc.)
* Keep **controllers**, **services**, and **repositories** separate.
* Shared utilities, middleware, and constants go under `/common` or `/lib`.
* Use environment-based configuration files (e.g., `.env`, `.env.prod`) with a config loader module.
* Avoid circular dependencies between modules.

**Example Structure:**

```
src/
 ├─ common/
 │   ├─ middlewares/
 │   ├─ utils/
 │   └─ constants.ts
 ├─ modules/
 │   ├─ user/
 │   │   ├─ user.controller.ts
 │   │   ├─ user.service.ts
 │   │   └─ user.repository.ts
 │   └─ auth/
 │       ├─ auth.controller.ts
 │       ├─ auth.service.ts
 │       └─ auth.repository.ts
 ├─ prisma/
 │   └─ schema.prisma
 ├─ app.ts
 └─ server.ts
```

---

## 3. 🔐 Security Compliance

**Goal:** Prevent vulnerabilities and ensure data integrity.

**Required Practices:**

* Never commit `.env` or credentials to the repo.
* Validate and sanitize all user input using libraries like `zod` or `joi`.
* Escape or sanitize all SQL parameters (Prisma does this automatically).
* Use **HTTPS** and **helmet** middleware for securing headers.
* Hash passwords using **bcrypt** (min 10 rounds).
* Store JWT secrets and database credentials in secure vaults (e.g., AWS Secrets Manager, HashiCorp Vault).
* Rotate secrets periodically.
* Log sensitive info only in masked form (e.g., `****@gmail.com`).
* Implement RBAC (Role-Based Access Control) for all protected routes.

---

## 4. 🧩 API Compliance

**Goal:** Consistent and predictable API design.

**Rules:**

* Use **RESTful conventions**.
* Use `snake_case` for query params and `camelCase` for JSON keys.
* Always return consistent response structure:

  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": { ... }
  }
  ```
* Error responses should include status, message, and code:

  ```json
  {
    "success": false,
    "message": "User not found",
    "code": "USER_NOT_FOUND"
  }
  ```
* Use appropriate HTTP status codes:

  * `200` – OK
  * `201` – Created
  * `400` – Bad Request
  * `401` – Unauthorized
  * `403` – Forbidden
  * `404` – Not Found
  * `500` – Internal Server Error
* Implement request-level validation middleware (e.g., Zod schemas).
* Handle redirects (302) and errors through a unified response handler.

---

## 5. 💾 Database Compliance (Prisma)

**Goal:** Maintain reliable, auditable, and performant data access.

**Standards:**

* Use Prisma migrations for all schema changes — never edit the DB manually.
* Ensure referential integrity using foreign keys and constraints.
* Use `@updatedAt` and `@default(now())` timestamps.
* Avoid `DELETE` — use soft deletes (`deletedAt`).
* Define indexes for frequently queried columns.
* Use transactions for multi-step write operations.
* Use repository layer to abstract all Prisma client calls:

  ```ts
  export class UserRepository {
    constructor(private prisma: PrismaClient) {}
    
    async findByEmail(email: string) {
      return this.prisma.user.findUnique({ where: { email } });
    }
  }
  ```
* Disallow direct Prisma calls in controllers.

---

## 6. 🧠 Code Quality & Standards

**Goal:** Ensure readability, maintainability, and consistent style.

**Requirements:**

* Follow **ESLint + Prettier** with team-approved config.
* Use **TypeScript** (no `any` unless justified).
* Maintain function length under 40 lines.
* Write self-documenting code with clear naming conventions.
* Document complex functions using JSDoc.
* Avoid deep nesting; use early returns.
* Use async/await (no `.then()` chaining).
* Use constants for magic numbers or strings.
* Add type-safe error handling:

  ```ts
  try {
    await userService.createUser(data);
  } catch (err) {
    logger.error(err);
    return next(new ApiError("USER_CREATION_FAILED", 500));
  }
  ```

---

## 7. 🧪 Testing & QA Compliance

**Goal:** Maintain stable and regression-proof code.

**Standards:**

* Minimum **70% test coverage** (lines + branches).
* Use **Jest** or **Mocha** for unit/integration testing.
* Mock external services (DB, APIs) using libraries like `nock` or `sinon`.
* Write testable functions (avoid side effects).
* Run full test suite before each merge.
* Linting and tests must pass in CI/CD pipeline.

---

## 8. 📊 Logging & Observability

**Goal:** Enable easy debugging and monitoring in production.

**Practices:**

* Use centralized logger (e.g., `winston`, `pino`) with log levels (info, warn, error).
* Structure logs in JSON for ingestion into observability tools (e.g., ELK, Datadog).
* Add request ID in each log for traceability.
* Capture metrics via OpenTelemetry or Prometheus exporter.
* Don’t log sensitive information (passwords, tokens, PII).

---

## 9. 🚀 Performance & Scalability

**Goal:** Optimize performance and resource usage.

**Guidelines:**

* Use caching for heavy read operations (Redis recommended).
* Use pagination for large dataset queries.
* Implement connection pooling for Prisma.
* Use async middleware and avoid blocking operations.
* Lazy load large modules or services where possible.
* Always benchmark critical APIs before production release.

---

## 10. 📦 Deployment & Environment Compliance

**Goal:** Ensure reliable, consistent deployments.

**Rules:**

* Environment variables defined and validated via `zod` schema:

  ```ts
  const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(32),
  });
  ```
* Separate configs for staging, dev, prod.
* Use CI/CD pipelines with:

  * Lint + Test + Build + Deploy stages
  * Auto version tagging
* Never use hardcoded URLs or secrets in code.
* Graceful shutdown handling in `server.ts`:

  ```ts
  process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    server.close(() => process.exit(0));
  });
  ```

---

## 11. 🧭 Governance & Review

**Goal:** Keep compliance evolving and enforced.

**Actions:**

* Conduct **biweekly code audits** using this checklist.
* Pull requests require:

  * 1 peer review
  * Lint & tests passing
* Violations logged in review tracker and corrected within 1 sprint.
* Compliance doc reviewed quarterly.

