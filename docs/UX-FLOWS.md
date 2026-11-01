# UX Flows and Page Inventory Specification

This document details the screen-by-screen inventory, client-side routing, interactive components, and user workflows implemented in the React frontend application (`frontend/src/pages`).

---

## 1. Route Map & Role Permissions

| Route | Page Component | Allowed Roles | Description |
|---|---|---|---|
| `/login` | `LoginPage.tsx` | Public | Authentication with role switcher (`AICTE_ADMIN`, `INSTITUTION_ADMIN`, `VERIFIER`). |
| `/institution/dashboard` | `InstitutionDashboardPage.tsx` | `INSTITUTION_ADMIN` | College overview: Intake progress bar, 4 metric cards, "What needs fixing" action items. |
| `/institution/upload` | `BulkUploadPage.tsx` | `INSTITUTION_ADMIN` | 3-step bulk student upload wizard with pre-validation and row-error correction table. |
| `/institution/students` | `StudentListPage.tsx` | `INSTITUTION_ADMIN` | Filterable, searchable data table of student records with masked APAAR and status badges. |
| `/institution/issues` | `IssueListPage.tsx` | `INSTITUTION_ADMIN` | Issue management list with interactive resolution dialogs (TC upload, reclassification). |
| `/aicte/dashboard` | `AicteDashboardPage.tsx` | `AICTE_ADMIN` | National regulatory dashboard: State-wise filter, national seat fill rate, anomaly monitors. |
| `/verify` | `VerificationPage.tsx` | Public / Verifiers | 12-digit APAAR or reference lookup with verified credential card & dynamic QR code. |
| `/reports` | `ReportsPage.tsx` | `AICTE_ADMIN`, `INSTITUTION_ADMIN` | Enrolment and quota analytics with CSV export. |
| `/help` | `HelpPage.tsx` | All Users | FAQ, APAAR generation guide, and platform user manual. |

---

## 2. Core User Flows & Screen Specifications

### Flow 1: Institution Admin — Admissions Ingestion & Bulk Upload
1. **Dashboard Overview (`/institution/dashboard`)**:
   - Welcome banner with institutional identifier (`1-3324521401 - GEC Thrissur`).
   - 4 KPI Metric Cards:
     - **Approved Intake**: 120 seats
     - **Enrolled**: 118 students (98.3% filled)
     - **Verified**: 112 records
     - **Needs Attention**: 6 flagged issues
   - Visual Progress Bar: 118 filled / 120 total approved (2 seats remaining).
   - "What needs fixing" priority action list with instant **"Fix now"** shortcuts.

2. **3-Step Bulk Upload Wizard (`/institution/upload`)**:
   - **Step 1: File Selection & Program Scope**: Drag-and-drop CSV or XLSX file, select academic year (`2026-27`) and department.
   - **Step 2: Pre-validation & Error Table**:
     - Pre-upload summary banner: e.g. `242 ready to commit`, `8 need fixing`.
     - Detailed Row Error Table displaying:
       - Row Number, Student Name, Problem description, "What to do" guidance.
       - Direct inline fix suggestion or "Download Fix List" CSV button.
   - **Step 3: Institutional Affirmation & Commit**:
     - DPDP Act 2023 compliance & truthfulness affirmation checkbox.
     - Final commit button triggering batch persistence into database.

### Flow 2: Validation Issue Resolution Flow (`/institution/issues`)
1. User filters open issues by severity: `Critical` (Intake excess), `Review` (Cross-institution duplicate), or `Warning` (Date mismatch).
2. Clicking **"Review"** opens the `Modal.tsx` resolution dialog:
   - Displays student details and conflicting institution details.
   - Admin chooses Resolution Type:
     - `CONFIRMED_VALID`
     - `TRANSFER_RECORDED` (attaching Transfer Certificate number)
     - `DATA_CORRECTED`
     - `REJECTED`
   - Adding remarks logs an immutable entry into `audit_logs` and marks the issue `resolved`.

### Flow 3: Public / Employer Credential Verification (`/verify`)
1. Employer/verifier enters a 12-digit APAAR ID (e.g. `1234 5678 9012`) or scans a QR code URL.
2. Selects verification purpose (`Employment Background Check` / `Higher Studies`).
3. **Verified Credential Card (`VerificationCard.tsx`)**:
   - Student Name, Enrolled College, Degree Programme, Admission Year, Enrolment Status (`ACTIVE`).
   - Live Canvas QR Code rendering authenticated verification reference link.
   - Digital Signature Integrity badge ("Digital Signature Valid - HMAC-SHA256").
   - Explicit prototype disclaimer badge: `"Mock Verification: Synthetic data for SIH PS 26263"`.

### Flow 4: AICTE Regulatory Bureau National Oversight (`/aicte/dashboard`)
1. Filter national statistics by State, Programme Type, or Academic Year.
2. Interactive National Metrics:
   - Total Approved Colleges, Total National Intake, Total Enrolled Students, Overall Compliance Rate.
3. Systemic Anomaly Tracker:
   - Instantly highlights colleges with $> 100\%$ intake utilization or excessive dual-admissions.
   - Actionable "Request Institution Clarification" workflow.
