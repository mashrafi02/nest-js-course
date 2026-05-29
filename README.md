# Nest JS Course Repository

A three-stage NestJS learning path that incrementally evolves from fundamentals to production-style authentication and authorization.

This repository contains:

- `1-nest-js-intro` - Core NestJS + TypeORM + DTO validation + basic modular CRUD
- `2-nest-js-intermediate` - Configuration architecture + env validation + pagination provider + custom exceptions
- `3-nest-js-advance` - JWT auth flows + global guard + custom decorators + password hashing abstraction

---

## Learning Roadmap

The chapters are designed to be completed in order:

1. **Intro**: Build and understand core NestJS patterns.
2. **Intermediate**: Add robust config management and reusable infrastructure.
3. **Advance**: Add secure authentication and authorization architecture.

---

## Repository Structure

```text
nest-js-course/
├── 1-nest-js-intro/
├── 2-nest-js-intermediate/
├── 3-nest-js-advance/
└── README.md
```

Each chapter is an independent Nest project with its own `package.json`, scripts, and runtime configuration.

---

## Common Stack Across All Chapters

- NestJS 11
- TypeScript
- TypeORM + PostgreSQL
- class-validator + class-transformer
- Global `ValidationPipe`
- E2E test scaffold with Jest + Supertest
- ESLint + Prettier setup

---

## Chapter 1: Intro (`1-nest-js-intro`)

### What you learn

- Nest app bootstrap (`NestFactory.create`)
- Global validation pipeline:
  - `whitelist: true`
  - `forbidNonWhitelisted: true`
  - `transform: true`
- Root module composition with feature modules
- TypeORM async setup with `ConfigModule.forRoot({ isGlobal: true })`
- Auto-loaded entities (`autoLoadEntities: true`)

### Core NestJS concepts covered

- Module architecture:
  - `UsersModule`, `MessageModule`, `AuthModule`, `ProfileModule`, `HashtagModule`
- Controller patterns:
  - Route decorators (`@Get`, `@Post`, `@Patch`, `@Delete`)
  - Parameter extraction (`@Body`, `@Param`, `@Query`)
  - Parsing with `ParseIntPipe`
- Service layer and DI with constructor injection
- `forwardRef` to resolve circular dependency (`AuthModule` <-> `UsersModule`)

### DTO and validation topics

- Input contracts for users, profiles, messages, hashtags
- `PartialType` for update DTOs
- Field-level validation decorators:
  - `@IsString`, `@IsNotEmpty`, `@MaxLength`, `@MinLength`
  - `@IsEmail`, `@IsOptional`, `@IsInt`, `@IsArray`, `@IsDate`

### TypeORM topics

- Repositories via `@InjectRepository`
- Entity design and column typing
- Relations:
  - `@OneToOne` + `@JoinColumn` (Users <-> Profile)
  - `@OneToMany` / `@ManyToOne` (Users <-> Message)
  - `@ManyToMany` + `@JoinTable` (Message <-> Hashtag)
- Lifecycle columns:
  - `@CreateDateColumn`, `@UpdateDateColumn`, `@DeleteDateColumn`
- Soft delete for hashtags

### Business logic patterns introduced

- User creation and deletion with relation loading
- Message CRUD with user/hashtag association
- Hashtag creation, hard delete, and soft delete
- Basic auth module scaffold (login placeholder)

---

## Chapter 2: Intermediate (`2-nest-js-intermediate`)

Chapter 2 keeps chapter 1 features and introduces infrastructure-level improvements.

### Configuration and environment management

- Environment-aware `.env` loading via `NODE_ENV`
- Structured config namespaces with `registerAs`:
  - `appConfig`
  - `database`
  - `authConfig`
- Joi-based env validation schema (`env.validation.ts`)
- Typed config consumption through `ConfigService` and `ConfigType`
- Added `start:dev` and `start:test` scripts with environment mode switching

### Validation and transformation upgrades

- `ValidationPipe` now enables implicit conversion:
  - `transformOptions.enableImplicitConversion = true`

### Pagination infrastructure

- Reusable request-scoped `PaginationProvider`
- Generic `paginatedQuery<T>` abstraction using TypeORM repository
- Pagination DTO (`page`, `limit`) and response interface (`Paginater<T>`)
- Hypermedia-style pagination links generation (`first`, `previous`, `next`, `last`, `current`)
- Pagination wired into:
  - Users listing endpoint
  - Messages-by-user endpoint

### Error handling improvements

- Custom HTTP exception class: `UserAlreadyExistsException` (409 Conflict)
- More explicit `NotFoundException` and structured `HttpException` usage

### Domain evolution in this chapter

- Username uniqueness enforced in `Users` entity and service checks
- `GET /users/:id` endpoint added
- Services begin returning richer paginated responses
- Auth config module setup prepared for advanced auth

---

## Chapter 3: Advance (`3-nest-js-advance`)

Chapter 3 builds on chapter 2 and introduces full authentication and authorization flow.

### Security architecture and auth flow

- JWT support with `@nestjs/jwt`
- Async JWT module registration from config (`JwtModule.registerAsync(authConfig.asProvider())`)
- Auth endpoints:
  - `POST /auth/signup`
  - `POST /auth/login`
  - `POST /auth/refresh-token`
- Dedicated DTOs:
  - `LoginDto`
  - `RefreshTokenDto`
- Token generation strategy:
  - Access token with user payload (e.g., username)
  - Refresh token with longer expiry

### Password management abstraction

- `HashingProvider` abstract class defines hashing contract
- `BcryptProvider` concrete implementation using `bcryptjs`
- Provider substitution pattern in module:
  - `{ provide: HashingProvider, useClass: BcryptProvider }`
- Password hashing at signup
- Password comparison during login

### Authorization and request context

- Global guard registration using `APP_GUARD`
- `AuthorizeGuard` verifies Bearer JWT for protected routes
- Public route bypass via metadata-based decorator:
  - `@AllowAnonymous()`
- Request user attachment using a shared constant key
- Active user extraction with custom param decorator:
  - `@ActiveUser()`
  - Supports picking a specific field or full payload

### Additional chapter-3 refinements

- Message creation now uses authenticated user identity
- User controller no longer exposes signup directly (moved under auth flow)
- Expanded env validation for JWT settings:
  - `JWT_SECRET_KEY`
  - `JWT_EXPIRES_IN`
  - `JWT_REFRESH_EXPIRES_IN`
  - `JWT_AUDIENCE`
  - `JWT_ISSUER`

---

## Feature Matrix by Chapter

| Topic | Ch. 1 | Ch. 2 | Ch. 3 |
|---|---:|---:|---:|
| Modular architecture | Yes | Yes | Yes |
| DTO validation | Yes | Yes | Yes |
| TypeORM entities & relations | Yes | Yes | Yes |
| Basic CRUD (users/messages/hashtags/profile) | Yes | Yes | Yes |
| Config namespaces (`registerAs`) | No | Yes | Yes |
| Joi env schema validation | No | Yes | Yes |
| Request-scoped pagination provider | No | Yes | Yes |
| Custom exception class | No | Yes | Yes |
| JWT authentication | No | No | Yes |
| Refresh token flow | No | No | Yes |
| Global authorization guard | No | No | Yes |
| Custom auth decorators | No | No | Yes |
| Hashing abstraction/provider pattern | No | No | Yes |

---

## How to Run Any Chapter

From the repository root:

```bash
cd 1-nest-js-intro
npm install
npm run start:dev
```

Switch chapter as needed:

```bash
cd ../2-nest-js-intermediate
npm install
npm run start:dev
```

```bash
cd ../3-nest-js-advance
npm install
npm run start:dev
```

### Test commands (inside each chapter)

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## Recommended Study Order

1. Complete chapter 1 and ensure every CRUD path is clear.
2. Re-implement chapter 2 pagination and config from memory.
3. In chapter 3, trace the full auth request lifecycle:
   - login -> token generation -> guard verification -> active user injection.
4. After chapter 3, extend one module (for example, message updates by owner only) to practice auth + domain constraints together.

---

## Notes

- All three chapter folders are intentionally separate projects, not a single monorepo package.
- Shared naming and structure make it easier to compare patterns chapter-by-chapter.
- The repository progression emphasizes architecture and backend API design over frontend integration.

---

## Quick Revision

- One-page revision checklist: [REVISION-CHECKLIST.md](REVISION-CHECKLIST.md)
