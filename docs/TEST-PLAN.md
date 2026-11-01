# Comprehensive Test Plan & Acceptance Matrix

This document defines the automated and manual testing strategy, test suites, execution commands, and synthetic test data fixtures across Frontend, Backend, and Validation modules.

---

## 1. Test Levels & Execution Commands

| Level | Tool / Framework | Target Directory | Execution Command |
|---|---|---|---|
| **Frontend Component Tests** | Vitest + React Testing Library | `frontend/src/test/` | `cd frontend && npm test` |
| **Backend Unit & API Tests** | Pytest + HTTPX TestClient | `backend/tests/` | `cd backend && pytest -v` |
| **Validation Rules Engine Tests** | Pytest | `backend/tests/test_validation/` | `pytest tests/test_validation/ -v` |
| **Database Migrations Test** | Alembic | `backend/` | `alembic upgrade head` |

---

## 2. Synthetic Test Fixtures

All tests and local development use strictly synthetic test data (conforming to DPDP Act 2023).

### Test Fixture 1: Standard Valid Batch (`valid_batch.csv`)
```csv
apaar_id,name,dob,gender,institution_student_id,admission_date,seat_category
123456789012,Asha Krishnan,2005-04-12,Female,CS2026-001,2026-08-10,REGULAR
234567890123,Rahul Nair,2005-06-21,Male,CS2026-002,2026-08-11,REGULAR
345678901234,Sneha Patel,2004-11-03,Female,CS2026-003,2026-08-11,NRI
```
* **Expected Result:** 3 rows accepted, 0 flagged, 0 rejected. Intake incremented by 2 Regular + 1 NRI.

### Test Fixture 2: Format & Duplicate Breach Batch (`error_batch.csv`)
```csv
apaar_id,name,dob,gender,institution_student_id,admission_date,seat_category
,Ravi Menon,2005-02-14,Male,CS2026-014,2026-08-12,REGULAR
123456789012,Asha Krishnan,2005-04-12,Female,CS2026-001,2026-08-10,REGULAR
123456789012,Asha Krishnan Duplicate,2005-04-12,Female,CS2026-099,2026-08-12,REGULAR
INVALID_APAAR,Kiran Joseph,2005-09-18,Male,CS2026-015,2026-08-12,REGULAR
```
* **Expected Result:**
  * Row 1: Flags `VAL-001` (`MISSING_APAAR_ID`).
  * Row 2 & 3: Flags `VAL-003` (`DUPLICATE_WITHIN_UPLOAD`) on rows 2 and 3.
  * Row 4: Flags `VAL-002` (`IDENTIFIER_FORMAT_INVALID`).
  * Summary: 0 accepted, 4 rejected/flagged.

### Test Fixture 3: Cross-Institution Match (`cross_institution.csv`)
```csv
apaar_id,name,dob,gender,institution_student_id,admission_date,seat_category
987654321098,Neha Sharma,2005-01-30,Female,CS2026-088,2026-09-01,REGULAR
```
* **Pre-condition:** `987654321098` is already marked `ACTIVE` at Model Engineering College, Kochi.
* **Expected Result:**
  * Flags `VAL-007` (`CROSS_INSTITUTION_MATCH`).
  * Record placed in `PENDING_REVIEW` with an open issue.
  * Institution Admin can review and provide TC details without crashing or silently dropping the record.

---

## 3. Automated Test Scenarios Matrix

| Scenario ID | Test Target | Test Condition | Expected Behavior |
|---|---|---|---|
| **SEC-01** | Multi-Tenant Isolation | Inst Admin 1 calls `GET /students/rec_inst2_001` | Returns `403 Forbidden` or `404 Not Found`. Never leaks record. |
| **SEC-02** | Token Expiration | API request with expired JWT | Returns `401 Unauthorized`. |
| **INT-01** | Intake Enforcement | Current enrolment = 120 / 120; commit 1 extra regular student | Triggers `VAL-005` (`POTENTIAL_INTAKE_EXCESS`); blocks auto-approval. |
| **INT-02** | Supernumerary Independence | Regular seats full (120/120); add 1 `NRI` student within supernumerary cap | Accepted without triggering general intake excess. |
| **VRF-01** | QR Code Signature | Tamper with `ref` or `sig` parameters in verification URL | Verification endpoint returns `digital_signature_valid: false`. |
| **VRF-02** | Data Minimization | Employer performs verification lookup | Returns name, college, programme, and status. Excludes Aadhaar, address, and internal grades. |
| **MOK-01** | Mock Transparency | Any verification or APAAR lookup | Response explicitly contains `is_mock: true` and disclaimer banner. |
