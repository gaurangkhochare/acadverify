# Data Model Specification

This document provides the definitive relational database schema design, field types, constraints, and indexes for PostgreSQL. Member 2 (Backend) should directly use these definitions when authoring SQLAlchemy models and Alembic migrations.

---

## 1. Custom Enumerations (PostgreSQL ENUMs)

```sql
CREATE TYPE user_role_enum AS ENUM (
  'AICTE_ADMIN', 
  'INSTITUTION_ADMIN', 
  'VERIFIER', 
  'STUDENT'
);

CREATE TYPE seat_category_enum AS ENUM (
  'REGULAR', 
  'SUPERNUMERARY', 
  'NRI', 
  'OCI', 
  'FOREIGN_NATIONAL', 
  'OTHER'
);

CREATE TYPE enrolment_status_enum AS ENUM (
  'SUBMITTED', 
  'ACTIVE', 
  'TRANSFERRED', 
  'WITHDRAWN', 
  'COMPLETED', 
  'PENDING_REVIEW'
);

CREATE TYPE validation_status_enum AS ENUM (
  'VALID', 
  'FLAGGED', 
  'REJECTED', 
  'MOCK_VERIFIED'
);

CREATE TYPE issue_type_enum AS ENUM (
  'MISSING_APAAR_ID',
  'IDENTIFIER_FORMAT_INVALID',
  'IDENTIFIER_NOT_VERIFIED',
  'DUPLICATE_WITHIN_UPLOAD',
  'DUPLICATE_WITHIN_INSTITUTION',
  'CROSS_INSTITUTION_MATCH',
  'POTENTIAL_ACTIVE_ENROLMENT_CONFLICT',
  'INTAKE_DATA_MISSING',
  'POTENTIAL_INTAKE_EXCESS',
  'INCONSISTENT_DATES',
  'INCOMPLETE_RECORD',
  'ANOMALOUS_ENROLMENT_CHANGE'
);

CREATE TYPE issue_severity_enum AS ENUM (
  'warning', 
  'review', 
  'critical'
);

CREATE TYPE issue_status_enum AS ENUM (
  'open', 
  'resolved'
);

CREATE TYPE upload_status_enum AS ENUM (
  'pending', 
  'processing', 
  'completed', 
  'completed_with_issues', 
  'failed'
);
```

---

## 2. Table Schemas & Constraints

### 2.1 `institutions`
Stores AICTE-approved educational institutions.
```sql
CREATE TABLE institutions (
  id VARCHAR(64) PRIMARY KEY,                  -- e.g. 'inst_001' or UUID
  name VARCHAR(255) NOT NULL,
  aicte_reference VARCHAR(64) UNIQUE NOT NULL,  -- Permanent Institute ID (e.g. '1-3324521401')
  campus VARCHAR(128) NOT NULL DEFAULT 'Main Campus',
  state VARCHAR(64) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'active', -- 'active', 'review_required', 'suspended'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_institutions_state ON institutions(state);
CREATE INDEX idx_institutions_status ON institutions(status);
```

### 2.2 `users`
System users with role-based access control.
```sql
CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY,                  -- e.g. 'usr_001'
  name VARCHAR(128) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,         -- bcrypt hash
  role user_role_enum NOT NULL,
  institution_id VARCHAR(64) REFERENCES institutions(id) ON DELETE SET NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_institution ON users(institution_id);
```

### 2.3 `programmes`
Academic degree programmes offered by an institution.
```sql
CREATE TABLE programmes (
  id VARCHAR(64) PRIMARY KEY,                  -- e.g. 'prog_cs_01'
  institution_id VARCHAR(64) NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,                  -- e.g. 'B.Tech Computer Science & Engineering'
  programme_code VARCHAR(32) NOT NULL,         -- e.g. 'CS', 'ME', 'PGDM'
  campus VARCHAR(128) NOT NULL DEFAULT 'Main Campus',
  status VARCHAR(32) NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_institution_programme UNIQUE(institution_id, programme_code)
);

CREATE INDEX idx_programmes_institution ON programmes(institution_id);
```

### 2.4 `approved_intakes`
AICTE-sanctioned seat capacity for a programme in an academic year.
```sql
CREATE TABLE approved_intakes (
  id VARCHAR(64) PRIMARY KEY,                  -- e.g. 'intake_001'
  institution_id VARCHAR(64) NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  programme_id VARCHAR(64) NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
  academic_year VARCHAR(16) NOT NULL,          -- e.g. '2026-27'
  approved_seats INT NOT NULL CHECK (approved_seats >= 0),
  authorized_supernumerary_seats INT NOT NULL DEFAULT 0 CHECK (authorized_supernumerary_seats >= 0),
  total_approved INT GENERATED ALWAYS AS (approved_seats + authorized_supernumerary_seats) STORED,
  effective_from DATE NOT NULL,
  effective_to DATE,
  source_reference VARCHAR(128),               -- AICTE Approval Letter ID
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_institution_prog_year UNIQUE(institution_id, programme_id, academic_year)
);

CREATE INDEX idx_intake_lookup ON approved_intakes(institution_id, academic_year);
```

### 2.5 `students`
Master student academic entity anchored by APAAR ID.
```sql
CREATE TABLE students (
  id VARCHAR(64) PRIMARY KEY,                  -- Internal immutable UUID
  apaar_id CHAR(12) UNIQUE,                    -- 12-digit numeric identifier (NULL if not yet issued)
  apaar_id_masked VARCHAR(32),                 -- '•••• •••• 9012'
  name VARCHAR(128) NOT NULL,
  dob DATE,
  gender VARCHAR(16),
  is_mock_identity BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_students_apaar ON students(apaar_id);
```

### 2.6 `enrolments`
Student enrolment at an institution for a programme and academic year.
*(Note: A student may have multiple enrolments over time due to transfer or progression, but only one ACTIVE enrolment in a given term).*
```sql
CREATE TABLE enrolments (
  id VARCHAR(64) PRIMARY KEY,                  -- e.g. 'rec_001'
  student_id VARCHAR(64) NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  institution_id VARCHAR(64) NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  programme_id VARCHAR(64) NOT NULL REFERENCES programmes(id) ON DELETE RESTRICT,
  academic_year VARCHAR(16) NOT NULL,          -- e.g. '2026-27'
  institution_student_id VARCHAR(64) NOT NULL, -- Roll / Reg number issued by college
  admission_date DATE NOT NULL,
  seat_category seat_category_enum NOT NULL DEFAULT 'REGULAR',
  status enrolment_status_enum NOT NULL DEFAULT 'SUBMITTED',
  status_effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
  validation_status validation_status_enum NOT NULL DEFAULT 'VALID',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_inst_student_prog_year UNIQUE(institution_id, programme_id, academic_year, institution_student_id)
);

CREATE INDEX idx_enrolments_institution ON enrolments(institution_id, academic_year);
CREATE INDEX idx_enrolments_student ON enrolments(student_id);
CREATE INDEX idx_enrolments_status ON enrolments(status);
```

### 2.7 `upload_jobs` and `upload_row_fixes`
Tracking batch CSV/XLSX file ingestion and row-level issues.
```sql
CREATE TABLE upload_jobs (
  upload_id VARCHAR(64) PRIMARY KEY,           -- e.g. 'upl_2026_001'
  institution_id VARCHAR(64) NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  filename VARCHAR(255) NOT NULL,
  status upload_status_enum NOT NULL DEFAULT 'pending',
  rows_received INT NOT NULL DEFAULT 0,
  rows_accepted INT NOT NULL DEFAULT 0,
  rows_flagged INT NOT NULL DEFAULT 0,
  rows_rejected INT NOT NULL DEFAULT 0,
  results_url VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE upload_row_fixes (
  id SERIAL PRIMARY KEY,
  upload_id VARCHAR(64) NOT NULL REFERENCES upload_jobs(upload_id) ON DELETE CASCADE,
  row_number INT NOT NULL,
  student_name VARCHAR(128) NOT NULL,
  problem VARCHAR(255) NOT NULL,
  what_to_do TEXT NOT NULL,
  field_in_error VARCHAR(64),
  current_value TEXT,
  suggested_action VARCHAR(128)
);

CREATE INDEX idx_upload_fixes_upload ON upload_row_fixes(upload_id);
```

### 2.8 `validation_issues`
Auditable record of business rule violations and cross-college conflicts.
```sql
CREATE TABLE validation_issues (
  issue_id VARCHAR(64) PRIMARY KEY,            -- e.g. 'iss_001'
  type issue_type_enum NOT NULL,
  severity issue_severity_enum NOT NULL,
  status issue_status_enum NOT NULL DEFAULT 'open',
  record_id VARCHAR(64) REFERENCES enrolments(id) ON DELETE CASCADE,
  institution_id VARCHAR(64) NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  message VARCHAR(255) NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolution VARCHAR(64),                      -- 'CONFIRMED_VALID', 'TRANSFER_RECORDED', 'REJECTED'
  resolved_by VARCHAR(128)                     -- User name + role who resolved the issue
);

CREATE INDEX idx_validation_issues_inst_status ON validation_issues(institution_id, status);
CREATE INDEX idx_validation_issues_type ON validation_issues(type);
```

### 2.9 `verification_records`
Digital references generated for public/employer verification.
```sql
CREATE TABLE verification_records (
  reference VARCHAR(64) PRIMARY KEY,           -- e.g. 'VRF-2026-A9B7C3'
  enrolment_id VARCHAR(64) NOT NULL REFERENCES enrolments(id) ON DELETE CASCADE,
  requester_type VARCHAR(32) NOT NULL,         -- 'EMPLOYER', 'INSTITUTION', 'PUBLIC'
  purpose VARCHAR(255),
  digital_signature VARCHAR(512) NOT NULL,     -- HMAC-SHA256 signature
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_verification_ref ON verification_records(reference);
```

### 2.10 `audit_logs`
Immutable compliance and security trail for DPDP Act 2023.
```sql
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  actor_email VARCHAR(255) NOT NULL,
  actor_role VARCHAR(32) NOT NULL,
  action VARCHAR(64) NOT NULL,                 -- e.g. 'UPLOAD_STUDENT_BATCH', 'RESOLVE_ISSUE'
  resource_type VARCHAR(64) NOT NULL,          -- 'enrolment', 'intake', 'issue'
  resource_id VARCHAR(64),
  ip_address VARCHAR(45),
  details JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_user_id, timestamp);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
```

---

## 3. Key Integrity & Architectural Rules
1. **Never use APAAR as a SQL Primary Key**: An APAAR ID belongs to an individual student who can transfer or progress through multiple diplomas, degrees, or colleges. Immutable internal surrogate keys (`id`) must always be used.
2. **Contextual Duplicate Handling**: Rather than putting a blind unique constraint on `(apaar_id, academic_year)`, duplicate active enrolments trigger a `CROSS_INSTITUTION_MATCH` or `POTENTIAL_ACTIVE_ENROLMENT_CONFLICT` issue inside `validation_issues` to allow for legitimate student transfers.
3. **Derived Metrics Consistency**: Intake metrics (enrolled, remaining, fill percentage) must be queryable via performant indexed SQL views or cached aggregations rather than desynchronized static columns.
