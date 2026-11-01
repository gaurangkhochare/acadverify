# API Contracts

This document defines the complete, production-grade REST API contracts shared across Frontend (Member 1), Backend (Member 2), and Validation (Member 3).

## General conventions
- **Base path:** `/api/v1`
- **Content-Type:** `application/json` (unless `multipart/form-data` for file uploads).
- **Authentication:** `Authorization: Bearer <JWT>` header on all protected routes.
- **Tenant Isolation:** The backend derives the caller's `institution_id` strictly from the verified JWT. Institution Admins can never access or modify data belonging to other institutions.
- **Standard HTTP Status Codes:**
  - `200 OK` — Successful query or non-resource update.
  - `201 Created` — Resource created.
  - `400 Bad Request` — Malformed request syntax or invalid parameters.
  - `401 Unauthorized` — Missing, expired, or invalid JWT.
  - `403 Forbidden` — Insufficient role or access to unauthorized tenant.
  - `404 Not Found` — Resource does not exist.
  - `422 Unprocessable Entity` — Schema or domain validation failure.

## Standard Error Response Shape
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields failed validation checks.",
    "details": [
      {
        "field": "apaar_id",
        "issue": "APAAR ID must be exactly 12 digits."
      }
    ]
  }
}
```

---

## 1. Authentication Endpoints

### `POST /auth/login`
Authenticates a user and returns a signed JWT and user profile.
- **Access:** Public
- **Request Body:**
```json
{
  "email": "admin@gectcr.ac.in",
  "password": "Password123!",
  "role": "INSTITUTION_ADMIN"
}
```
- **Response `200 OK`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_inst_001",
    "name": "Prof. K. R. Sharma",
    "email": "admin@gectcr.ac.in",
    "role": "INSTITUTION_ADMIN",
    "institution_id": "inst_001",
    "institution_name": "Government Engineering College, Thrissur",
    "status": "active",
    "created_at": "2026-01-15T09:00:00Z"
  }
}
```

### `POST /auth/logout`
Invalidates current session/token.
- **Access:** Authenticated
- **Response `200 OK`:**
```json
{
  "message": "Logged out successfully"
}
```

### `GET /auth/me`
Fetches current authenticated profile and permitted scope.
- **Access:** Authenticated
- **Response `200 OK`:** Same schema as `user` object in `/auth/login`.

---

## 2. Institutions & Intake Endpoints

### `GET /institutions/me`
Retrieves the profile of the caller's institution.
- **Access:** `INSTITUTION_ADMIN`
- **Response `200 OK`:**
```json
{
  "id": "inst_001",
  "name": "Government Engineering College, Thrissur",
  "aicte_reference": "1-3324521401",
  "campus": "Main Campus",
  "state": "Kerala",
  "status": "active",
  "created_at": "2025-06-10T10:00:00Z"
}
```

### `GET /institutions`
Lists all institutions with pagination and filtering.
- **Access:** `AICTE_ADMIN`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 20)
  - `state` (e.g., `Kerala`)
  - `search` (name or AICTE reference)
  - `status` (`active` | `review_required` | `suspended`)
- **Response `200 OK`:**
```json
{
  "items": [
    {
      "id": "inst_001",
      "name": "Government Engineering College, Thrissur",
      "aicte_reference": "1-3324521401",
      "campus": "Main Campus",
      "state": "Kerala",
      "status": "active",
      "created_at": "2025-06-10T10:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20,
  "total_pages": 1
}
```

### `GET /institutions/{institution_id}/intake`
Retrieves approved intake quotas for an institution.
- **Access:** `AICTE_ADMIN`, or `INSTITUTION_ADMIN` (matching own institution).
- **Query Parameters:**
  - `academic_year` (optional, e.g. `2026-27`)
- **Response `200 OK`:**
```json
[
  {
    "id": "intake_001",
    "institution_id": "inst_001",
    "programme_id": "prog_cs_01",
    "programme_name": "B.Tech Computer Science & Engineering",
    "academic_year": "2026-27",
    "approved_seats": 120,
    "authorized_supernumerary_seats": 18,
    "total_approved": 138,
    "effective_from": "2026-06-01",
    "effective_to": "2027-05-31",
    "source_reference": "AICTE/AB/2026/S-412"
  }
]
```

### `POST /institutions/{institution_id}/intake`
Configures or amends approved intake for a programme.
- **Access:** `AICTE_ADMIN`
- **Request Body:**
```json
{
  "programme_id": "prog_cs_01",
  "academic_year": "2026-27",
  "approved_seats": 120,
  "authorized_supernumerary_seats": 18,
  "effective_from": "2026-06-01",
  "effective_to": "2027-05-31",
  "source_reference": "AICTE/AB/2026/S-412"
}
```
- **Response `201 Created`:** Returns created `ApprovedIntake` object.

---

## 3. Student Enrolment Endpoints

### `GET /students`
Paginated search and filter of student records.
- **Access:** `INSTITUTION_ADMIN` (scoped to own institution), `AICTE_ADMIN` (all institutions).
- **Query Parameters:**
  - `page` (default 1), `limit` (default 20)
  - `search` (student name or masked APAAR or ID)
  - `programme_id` (filter by programme)
  - `academic_year` (e.g. `2026-27`)
  - `seat_category` (`REGULAR` | `SUPERNUMERARY` | `NRI` | `OCI` | `FOREIGN_NATIONAL` | `OTHER`)
  - `status` (`SUBMITTED` | `ACTIVE` | `TRANSFERRED` | `WITHDRAWN` | `COMPLETED` | `PENDING_REVIEW`)
  - `validation_status` (`VALID` | `FLAGGED` | `REJECTED` | `MOCK_VERIFIED`)
- **Response `200 OK`:**
```json
{
  "items": [
    {
      "id": "rec_001",
      "student_id": "stu_001",
      "apaar_id": "123456789012",
      "apaar_id_masked": "•••• •••• 9012",
      "name": "Asha Krishnan",
      "institution_id": "inst_001",
      "institution_name": "Government Engineering College, Thrissur",
      "programme_id": "prog_cs_01",
      "programme_name": "B.Tech Computer Science & Engineering",
      "academic_year": "2026-27",
      "institution_student_id": "CS2026-001",
      "admission_date": "2026-08-10",
      "seat_category": "REGULAR",
      "status": "ACTIVE",
      "status_effective_date": "2026-08-10",
      "validation_status": "VALID",
      "issues_count": 0,
      "created_at": "2026-08-12T10:00:00Z",
      "updated_at": "2026-08-12T10:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20,
  "total_pages": 1
}
```

### `POST /students`
Manually enrol a single student.
- **Access:** `INSTITUTION_ADMIN`
- **Request Body:**
```json
{
  "apaar_id": "123456789012",
  "name": "Asha Krishnan",
  "programme_id": "prog_cs_01",
  "academic_year": "2026-27",
  "institution_student_id": "CS2026-001",
  "admission_date": "2026-08-10",
  "seat_category": "REGULAR"
}
```
- **Response `201 Created`:** Returns created `StudentRecord`.

### `GET /students/{record_id}`
Returns details of a specific student record.
- **Access:** `INSTITUTION_ADMIN` (own college), `AICTE_ADMIN`.

### `PATCH /students/{record_id}`
Updates permitted attributes (e.g. status transition from `ACTIVE` to `TRANSFERRED` or `WITHDRAWN`).
- **Access:** `INSTITUTION_ADMIN`
- **Request Body:**
```json
{
  "status": "TRANSFERRED",
  "status_effective_date": "2026-10-15",
  "remarks": "Transferred to NIT Calicut under inter-institutional transfer order #77"
}
```
- **Response `200 OK`:** Returns updated `StudentRecord`.

---

## 4. Bulk Upload & Ingestion Endpoints

### `POST /students/bulk-upload`
Uploads a CSV or XLSX file containing student enrolment rows. The file undergoes pre-validation against format, duplicate detection, and intake limits.
- **Access:** `INSTITUTION_ADMIN`
- **Content-Type:** `multipart/form-data`
- **Form Fields:**
  - `file`: CSV or XLSX file
  - `academic_year`: e.g. `2026-27`
  - `programme_id`: (optional, if file contains multiple programmes)
  - `consent_confirmed`: `true` (institutional data accuracy affirmation)
- **Response `200 OK` (or `202 Accepted`):**
```json
{
  "upload_id": "upl_2026_0901",
  "filename": "btech_cs_admissions_2026.csv",
  "status": "completed_with_issues",
  "summary": {
    "rows_received": 125,
    "accepted": 118,
    "flagged": 5,
    "rejected": 2
  },
  "results_url": "/api/v1/uploads/upl_2026_0901",
  "rows_to_fix": [
    {
      "row_number": 14,
      "student_name": "Ravi Menon",
      "problem": "Missing APAAR ID",
      "what_to_do": "Enter 12-digit APAAR ID or request generation via ABC portal",
      "field_in_error": "apaar_id",
      "current_value": "",
      "suggested_action": "Provide APAAR ID"
    },
    {
      "row_number": 88,
      "student_name": "Neha Sharma",
      "problem": "APAAR ID already enrolled in another institution",
      "what_to_do": "Submit transfer certificate or flag for dual-enrolment review",
      "field_in_error": "apaar_id",
      "current_value": "987654321098",
      "suggested_action": "Verify transfer status"
    }
  ],
  "created_at": "2026-09-01T14:22:00Z"
}
```

### `GET /uploads/{upload_id}`
Retrieves historical upload job status and row-level validation breakdown.
- **Access:** `INSTITUTION_ADMIN` (own upload), `AICTE_ADMIN`.

---

## 5. Validation & Issue Resolution Endpoints

### `POST /validation/check`
Performs on-the-fly validation for a submitted payload before final commit.
- **Access:** `INSTITUTION_ADMIN`, `AICTE_ADMIN`
- **Request Body:** Array of student records.
- **Response `200 OK`:** Validation report with errors, warnings, and intake calculations.

### `GET /issues`
Lists all open or resolved validation issues.
- **Access:** `INSTITUTION_ADMIN` (own issues), `AICTE_ADMIN` (national view).
- **Query Parameters:**
  - `status` (`open` | `resolved`)
  - `severity` (`warning` | `review` | `critical`)
  - `type` (`CROSS_INSTITUTION_MATCH`, `POTENTIAL_INTAKE_EXCESS`, etc.)
  - `page` (default 1), `limit` (default 20)
- **Response `200 OK`:**
```json
{
  "items": [
    {
      "issue_id": "iss_cross_001",
      "type": "CROSS_INSTITUTION_MATCH",
      "severity": "review",
      "status": "open",
      "record_id": "rec_088",
      "student_name": "Neha Sharma",
      "institution_id": "inst_001",
      "institution_name": "Government Engineering College, Thrissur",
      "message": "Potential active enrolment conflict detected across 2 institutions.",
      "explanation": "Student APAAR 987654321098 is also active at Model Engineering College, Kochi (Admitted: 2026-08-01).",
      "created_at": "2026-09-01T14:25:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20,
  "total_pages": 1
}
```

### `POST /issues/{issue_id}/resolve`
Records an authorized review outcome with resolution notes and rationale.
- **Access:** Authorized `INSTITUTION_ADMIN` or `AICTE_ADMIN`
- **Request Body:**
```json
{
  "resolution_type": "TRANSFER_RECORDED",
  "notes": "Verified Transfer Certificate TC-2026/89 issued by Model Engineering College Kochi on 2026-08-15."
}
```
- **Response `200 OK`:**
```json
{
  "issue_id": "iss_cross_001",
  "status": "resolved",
  "resolution": "TRANSFER_RECORDED",
  "resolved_by": "Prof. K. R. Sharma (INSTITUTION_ADMIN)",
  "resolved_at": "2026-09-02T11:00:00Z"
}
```

---

## 6. Dashboards & Analytics Endpoints

### `GET /dashboard/summary`
Returns role-scoped real-time KPI metrics.
- **Access:** Authenticated (`INSTITUTION_ADMIN` or `AICTE_ADMIN`).
- **Response for `INSTITUTION_ADMIN` `200 OK`:**
```json
{
  "institution_id": "inst_001",
  "institution_name": "Government Engineering College, Thrissur",
  "academic_year": "2026-27",
  "approved_intake": 120,
  "students_enrolled": 118,
  "records_verified": 112,
  "need_attention_count": 6,
  "seats_remaining": 2,
  "intake_fill_percentage": 98.33
}
```
- **Response for `AICTE_ADMIN` `200 OK`:**
```json
{
  "academic_year": "2026-27",
  "total_institutions": 4200,
  "approved_intake": 1450000,
  "students_enrolled": 1380000,
  "records_verified": 1320000,
  "need_attention_count": 4250,
  "total_issues_open": 5890,
  "compliance_rate": 95.65,
  "seats_remaining": 70000,
  "intake_fill_percentage": 95.17
}
```

### `GET /reports/enrolment`
Exportable CSV/JSON enrolment and intake utilization breakdown by programme/state.

### `GET /reports/issues`
Exportable summary of systemic anomalies and quota compliance violations.

---

## 7. Verification & QR Code Endpoints

### `POST /verification/requests`
Public/Employer lookup by 12-digit APAAR ID or signed verification token.
- **Access:** Public / Verifier / Employer
- **Request Body:**
```json
{
  "apaar_id": "123456789012",
  "requester_type": "EMPLOYER",
  "purpose": "Employment Background Verification"
}
```
- **Response `200 OK`:**
```json
{
  "reference": "VRF-2026-A9B7C3",
  "is_verified": true,
  "status": "MOCK_VERIFIED",
  "student_name": "Asha Krishnan",
  "institution_name": "Government Engineering College, Thrissur",
  "programme_name": "B.Tech Computer Science & Engineering",
  "admission_year": 2026,
  "enrolment_status": "ACTIVE",
  "digital_signature_valid": true,
  "checked_at": "2026-10-30T13:45:00Z",
  "is_mock": true,
  "disclaimer": "Development prototype: verification performed against synthetic mock APAAR registry.",
  "qr_code_data": "https://aicte-apaar.gov.in/verify?ref=VRF-2026-A9B7C3"
}
```

### `GET /verification/{reference}`
Retrieves verification result directly from QR code scan or shareable link.
- **Access:** Public
- **Response `200 OK`:** Same schema as `/verification/requests`.
