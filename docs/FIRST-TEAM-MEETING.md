# First Team Meeting Minutes & Agreement Checklist

This document records the foundational agreements confirmed by the team prior to full multi-module integration.

---

## 1. Team Role Assignments & Ownership

- **Member 1 (Frontend & UX):**
  - **Scope:** React 18, Vite, TypeScript, Tailwind CSS, component library, routing, mockups 1-3.
  - **Status:** MVP baseline completed in `frontend/`.
- **Member 2 (Backend, Database & Authentication):**
  - **Scope:** FastAPI (Python 3.11+), PostgreSQL 15+, SQLAlchemy 2.0 (async), Alembic, JWT auth, tenant isolation, REST endpoints.
  - **Status:** Baseline defined in `docs/DATA-MODEL.md` and `docs/API-CONTRACTS.md`.
- **Member 3 (Validation, Intelligence & Verification):**
  - **Scope:** Business rules engine (`VAL-001` - `VAL-010`), cross-institution duplicate disambiguation, mock APAAR adapter, HMAC QR code verification.
  - **Status:** Rules engine matrix and synthetic fixtures defined in `docs/VALIDATION-RULES.md` and `docs/TEST-PLAN.md`.

---

## 2. Technical Stack & Standards Agreed

- [x] **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS (`DEC-001`).
- [x] **Backend:** FastAPI + Pydantic v2 + Python 3.11+ (`DEC-002`).
- [x] **Database:** PostgreSQL 15+ with Alembic migrations (`DEC-003`).
- [x] **Authentication:** Stateless JWT with institutional tenant scoping (`DEC-004`).
- [x] **Ingestion Engine:** CSV/XLSX two-tier pre-validation with row-level fixes (`DEC-005`).
- [x] **Mock Adapter Standard:** Transparent synthetic data labeled with `is_mock: true` (`DEC-006`).
- [x] **Anomaly & Conflict Policy:** `CROSS_INSTITUTION_MATCH` marked as `REVIEW_REQUIRED`, not automatic fraud rejection (`DEC-007`).
- [x] **Verification:** Public lookup + HMAC-SHA256 authenticated QR code link (`DEC-008`).

---

## 3. Integration Checkpoint

- **Frontend Mock Baseline:** Fully runnable via `npm run dev` in `frontend/`.
- **Backend Baseline:** Ready for scaffolding in `backend/` following `docs/DATA-MODEL.md` and `docs/API-CONTRACTS.md`.
- **Integration Checkpoint:** Connect `frontend/src/services/api.ts` to `http://localhost:8000/api/v1` once backend endpoints are live.
