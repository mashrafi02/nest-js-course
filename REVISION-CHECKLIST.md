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

## Cross-Chapter Mastery Checks

- [ ] Compare chapter 1, 2, 3 app.module differences from memory.
- [ ] Explain how project evolves from CRUD to production-style API architecture.
- [ ] Explain tradeoffs of global guard vs per-controller guards.
- [ ] Explain where to add role-based access control next.

---

## Fast Practice Drills

- [ ] Rebuild pagination provider in a blank Nest project in under 20 minutes.
- [ ] Implement a protected endpoint that returns current active user.
- [ ] Add an ownership check so only message owner can update or delete.
- [ ] Add logout token invalidation strategy design (short write-up).

---

## Interview Sprint Prompts

- [ ] Explain Nest request lifecycle in this repo.
- [ ] Explain how DTO validation differs from database constraints.
- [ ] Explain how JWT refresh flow prevents repeated login prompts.
- [ ] Explain where this project should add tests next and why.
