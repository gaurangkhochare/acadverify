# API Contracts

This document defines the initial API contract shared by all three members. Exact implementation details can evolve through an agreed change.

## General conventions
- Base path: `/api/v1`
- JSON request and response bodies unless a file upload is specified.
- Protected routes require a valid authenticated session/token.
- Backend must derive institution scope from the authenticated user or validate it explicitly; never trust a client-supplied institution ID by itself.
- Use standard HTTP status codes.
- Do not return full sensitive student data unless the caller is authorized.

## Standard error shape
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields need attention.",
    "details": []
  }
}
```

## Initial endpoints
### Authentication
- `POST /auth/login` — authenticate user.
- `POST /auth/logout` — end session where applicable.
- `GET /auth/me` — return current user identity, role, and permitted scope.

### Institutions and intake
- `GET /institutions/me` — current institution profile for institution users.
- `GET /institutions` — AICTE-only institution list, with pagination and filters.
- `GET /institutions/{institution_id}/intake` — authorized intake records.
- `POST /institutions/{institution_id}/intake` — create/update intake; restricted role.

### Student records
- `GET /students` — list only records the caller is allowed to view; pagination and filters required.
- `POST /students` — create a student enrolment record.
- `GET /students/{record_id}` — read a permitted record.
- `PATCH /students/{record_id}` — update a permitted record; record changes in audit log.
- `POST /students/bulk-upload` — upload CSV/XLSX; return upload job or validation summary.
- `GET /uploads/{upload_id}` — retrieve upload status and row-level results.

### Validation and review
- `POST /validation/check` — validate a permitted submitted dataset or record.
- `GET /issues` — list permitted validation issues.
- `GET /issues/{issue_id}` — view a permitted issue and its explanation.
- `POST /issues/{issue_id}/resolve` — record an authorized review outcome and notes.

### Dashboard and reports
- `GET /dashboard/summary` — role-scoped metrics.
- `GET /reports/enrolment` — permitted enrolment report with filters.
- `GET /reports/issues` — permitted validation issue report.

### Verification
- `POST /verification/requests` — submit a verification request.
- `GET /verification/{reference}` — retrieve the permitted result for a valid reference.
- `POST /verification/{reference}/check` — verify a signed/reference token where appropriate.

## Bulk upload response example
```json
{
  "upload_id": "upl_demo_001",
  "status": "completed_with_issues",
  "summary": {
    "rows_received": 100,
    "accepted": 92,
    "flagged": 6,
    "rejected": 2
  },
  "results_url": "/api/v1/uploads/upl_demo_001"
}
```

## Validation issue object
```json
{
  "issue_id": "issue_demo_001",
  "type": "CROSS_INSTITUTION_MATCH",
  "severity": "review",
  "status": "open",
  "record_id": "record_demo_123",
  "message": "The same identifier appears in another institution's records.",
  "explanation": "This is a possible conflict and requires contextual review.",
  "created_at": "ISO-8601 timestamp"
}
```

## Contract rules
- Do not return another institution's student details to institution users.
- Cross-institution matching may reveal only the minimum data needed to authorized reviewers.
- Keep pagination, filtering, and error formats consistent.
- Frontend and validation member should use these contracts rather than inventing independent response shapes.
- Update this file and notify affected members before a breaking change.
