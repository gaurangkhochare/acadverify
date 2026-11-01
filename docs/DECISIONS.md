# Architectural Decision Log (ADR)

This document formally records all architectural, technological, and domain decisions made for the APAAR Student Data Management & Verification Platform.

---

## Decision Status Key
- `ACCEPTED` — Approved and active specification for all members.
- `PROPOSED` — Under team review.
- `REJECTED` — Evaluated and rejected.
- `SUPERSEDED` — Replaced by a newer decision.

---

## Accepted Decisions

### DEC-001 — Frontend Framework, Tooling, and Styling
- **Status:** `ACCEPTED`
- **Date:** 2026-10-24
- **Owner:** Member 1 (Frontend & UX)
- **Decision:** React 18 with Vite, TypeScript, and Tailwind CSS.
- **Consequences:** Ultra-fast HMR, single-page application responsiveness, strict TypeScript interface alignment with API contracts, component-driven architecture with clean Tailwind utility classes.

### DEC-002 — Backend Framework and Runtime
- **Status:** `ACCEPTED`
- **Date:** 2026-10-26
- **Owner:** Member 2 (Backend & Auth)
- **Decision:** Python 3.11+ with **FastAPI**, Pydantic v2, and SQLAlchemy 2.0 (async).
- **Consequences:** Native OpenAPI / Swagger interactive documentation, auto-generated JSON schema validation via Pydantic matching `docs/API-CONTRACTS.md`, asynchronous I/O for concurrent CSV batch processing.

### DEC-003 — Relational Database Engine
- **Status:** `ACCEPTED`
- **Date:** 2026-10-26
- **Owner:** Member 2 (Backend & Database)
- **Decision:** **PostgreSQL 15+** with Alembic migrations.
- **Consequences:** Native support for PostgreSQL custom ENUMs, generated columns for intake calculation, composite indexes for multi-tenant isolation, JSONB column support for flexible audit log details.

### DEC-004 — Authentication & Multi-Tenant Authorization Strategy
- **Status:** `ACCEPTED`
- **Date:** 2026-10-27
- **Owner:** Member 2 (Backend) & Member 1 (Frontend)
- **Decision:** Stateless JWT (JSON Web Tokens) with HMAC-SHA256 and backend-enforced tenant scoping.
- **Consequences:** The JWT claims contain `user_id`, `role`, and `institution_id`. The backend FastAPI dependency extracts and injects the caller's `institution_id` directly into database queries. Institution Admins can never access or modify records of other institutions, guaranteeing multi-tenant security.

### DEC-005 — Bulk Upload Ingestion & Size Limits
- **Status:** `ACCEPTED`
- **Date:** 2026-10-27
- **Owner:** Member 1 (Frontend) & Member 2 (Backend)
- **Decision:** Multipart upload supporting CSV and XLSX files up to 10MB (max 5,000 records per upload batch).
- **Consequences:** Ingestion runs a two-tier validation pipeline: instant in-memory syntax/format check returning row-level fixes, followed by relational database intake and duplicate checks before commit.

### DEC-006 — External APAAR & Government Service Integration Boundary
- **Status:** `ACCEPTED`
- **Date:** 2026-10-28
- **Owner:** Member 3 (Validation & Intelligence)
- **Decision:** Standardized **Mock Adapter Layer** with deterministic test fixtures.
- **Consequences:** In compliance with AICTE guidelines, the platform never claims live connection to government servers without real credentials. All verification responses explicitly return `is_mock: true` and `MOCK_VERIFIED`, ensuring integrity during SIH judging while demonstrating real-world readiness.

### DEC-007 — Conflict Resolution Policy for Cross-Institution Enrolments
- **Status:** `ACCEPTED`
- **Date:** 2026-10-28
- **Owner:** Member 3 (Validation & Intelligence)
- **Decision:** Classify cross-institution matches as `REVIEW_REQUIRED` (Issue: `CROSS_INSTITUTION_MATCH`) rather than automatic rejection.
- **Consequences:** Prevents false accusations of student fraud; accommodates legitimate academic transfers with Transfer Certificates (TC) and historic progressions while actively blocking unresolved simultaneous active enrolments.

### DEC-008 — QR Code Verification & Digital Signature Schema
- **Status:** `ACCEPTED`
- **Date:** 2026-10-29
- **Owner:** Member 3 (Validation) & Member 1 (Frontend)
- **Decision:** QR codes embed an authenticated reference link (`https://aicte-apaar.gov.in/verify?ref=VRF-...`) backed by an HMAC-SHA256 signature.
- **Consequences:** Raw student identifiers and sensitive personal data are not directly encoded inside the QR image (complying with DPDP Act 2023). Third parties scan the QR to securely view verified public credential cards.
