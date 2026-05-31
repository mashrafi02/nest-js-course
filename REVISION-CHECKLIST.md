# NestJS Course Quick Revision Checklist

Use this as a rapid review sheet before interviews, exams, or project work.

---

## How To Use This Sheet

- Mark each item only if you can explain it without opening code.
- If you miss an item, jump to that chapter and re-implement it.
- Aim for one full pass in 20 to 30 minutes.

---

## Chapter 1 - Intro Foundations

### Core Nest Architecture

- [ ] Explain module, controller, and provider responsibilities.
- [ ] Trace request flow: Controller -> Service -> Repository.
- [ ] Explain why dependency injection is useful in Nest.
- [ ] Explain how forwardRef solves circular dependency issues.

### Validation And DTOs

- [ ] Explain global ValidationPipe options:
  - [ ] whitelist
  - [ ] forbidNonWhitelisted
  - [ ] transform
- [ ] Explain DTO validation decorators used in this repo.
- [ ] Explain why update DTO extends PartialType of create DTO.

### TypeORM Basics

- [ ] Explain repository injection with InjectRepository.
- [ ] Explain each relationship implemented:
  - [ ] One-to-One (Users and Profile)
  - [ ] One-to-Many and Many-to-One (Users and Message)
  - [ ] Many-to-Many with JoinTable (Message and Hashtag)
- [ ] Explain create/update/delete timestamp columns.
- [ ] Explain soft delete behavior for hashtags.

### Feature Implementation

- [ ] Recreate user create and delete logic.
- [ ] Recreate message CRUD flow with user and hashtag linkage.
- [ ] Recreate hashtag create, delete, and soft-delete endpoints.

---

## Chapter 2 - Intermediate Infrastructure

### Configuration System

- [ ] Explain ConfigModule global setup and environment-specific env file loading.
- [ ] Explain registerAs usage for namespaced configs.
- [ ] Explain Joi env schema validation and why it matters at boot.
- [ ] Explain typed config usage with ConfigType.

### Pagination Layer

- [ ] Explain why PaginationProvider is request-scoped.
- [ ] Explain page and limit math for skip and take.
- [ ] Explain metadata and link generation in paginated response.
- [ ] Recreate paginatedQuery generic method from memory.

### Error Handling

- [ ] Explain custom UserAlreadyExistsException and 409 conflict semantics.
- [ ] Explain when to use NotFoundException vs HttpException.

### Intermediate Domain Changes

- [ ] Explain username and email uniqueness checks before create user.
- [ ] Explain how users and messages endpoints were upgraded to pagination.
- [ ] Explain implicit conversion in ValidationPipe transformOptions.

---

## Chapter 3 - Advanced Auth And Authorization

### Authentication Flow

- [ ] Explain signup flow and where password hashing happens.
- [ ] Explain login flow and password comparison.
- [ ] Explain access token vs refresh token purpose and expiration.
- [ ] Explain refresh-token endpoint verification and token re-issue.

### JWT Integration

- [ ] Explain async JWT module registration from auth config.
- [ ] Explain JWT claims used in this project (sub, username, audience, issuer).
- [ ] Explain token signing and verification options alignment.

### Authorization Layer

- [ ] Explain APP_GUARD global guard registration.
- [ ] Explain how AuthorizeGuard extracts and verifies Bearer token.
- [ ] Explain request user payload attachment and why a constant key is used.
- [ ] Explain public route bypass using AllowAnonymous metadata.

### Custom Providers And Decorators

- [ ] Explain provider abstraction pattern:
  - [ ] HashingProvider abstract contract
  - [ ] BcryptProvider concrete implementation
  - [ ] useClass provider binding
- [ ] Explain ActiveUser decorator behavior:
  - [ ] Return full payload
  - [ ] Return field value when key is provided

### Secure Domain Behavior

- [ ] Explain why message create now reads authenticated user context.
- [ ] Explain why signup responsibility moved under auth endpoints.

---

## Chapter 4 - Platform Hardening And Infrastructure

### RBAC

- [ ] Explain `Role` enum design and where role is stored.
- [ ] Explain `@Roles(...)` decorator metadata flow.
- [ ] Explain `RolesGuard` role extraction and allow/deny decision.
- [ ] Explain why both `AuthorizeGuard` and `RolesGuard` are needed.

### Throttling And Abuse Protection

- [ ] Explain `@nestjs/throttler` setup with named windows.
- [ ] Explain difference between burst window and sustained window limits.
- [ ] Explain route-level throttle override on login using `@Throttle(...)`.
- [ ] Explain where to add stricter throttling for refresh-token endpoint.

### Caching With Redis

- [ ] Explain global cache manager setup with Redis store.
- [ ] Explain custom `CacheProvider` methods and why abstraction helps.
- [ ] Explain cache key design for paginated users endpoint.
- [ ] Explain invalidation strategy using pattern delete after mutations.
- [ ] Explain one risk of stale cache and how to reduce it.

### Cloudinary Upload Pipeline

- [ ] Explain upload flow: interceptor -> validation pipe -> provider -> cloud.
- [ ] Explain why memory storage is used for direct stream upload.
- [ ] Explain file validators (size + MIME type).
- [ ] Explain Cloudinary transformation options used in this project.
- [ ] Explain why `publicId` is returned and how it enables deletion.

### Configuration Expansion

- [ ] Explain new config namespaces (`cloudinary`, `redis`).
- [ ] Explain added Joi env validation for cloud and redis vars.
- [ ] Explain why failing fast at startup helps reliability.

---

## Cross-Chapter Mastery Checks

- [ ] Compare chapter 1, 2, 3, 4 app.module differences from memory.
- [ ] Explain how project evolves from CRUD to production-style API architecture.
- [ ] Explain tradeoffs of global guard vs per-controller guards.
- [ ] Explain where to add attribute-based access control after RBAC.

---

## Fast Practice Drills

- [ ] Rebuild pagination provider in a blank Nest project in under 20 minutes.
- [ ] Implement a protected endpoint that returns current active user.
- [ ] Add an ownership check so only message owner can update or delete.
- [ ] Add logout token invalidation strategy design (short write-up).
- [ ] Add Redis cache invalidation for one additional endpoint.
- [ ] Add a secure avatar replace flow (upload new + delete old by publicId).

---

## Interview Sprint Prompts

- [ ] Explain Nest request lifecycle in this repo.
- [ ] Explain how DTO validation differs from database constraints.
- [ ] Explain how JWT refresh flow prevents repeated login prompts.
- [ ] Explain where this project should add tests next and why.
- [ ] Explain how rate limiting and caching interact under high traffic.
