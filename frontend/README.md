# APAAR Platform Frontend

Responsive web application for the APAAR ID-Based Student Data Management and Verification Platform for AICTE SIH Problem Statement 26263.

## Tech Stack
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom Indian government / AICTE design system matching UI mockups
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Testing:** Vitest & React Testing Library
- **QR Generation:** qrcode

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
cd frontend
npm install
```

### Development Server
```bash
npm run dev
```
Runs at `http://localhost:3000`.

### Run Tests
```bash
npm test
```

### Production Build
```bash
npm run build
```

## Screen Inventory & Mockup Implementations
1. **Institution Dashboard (`/`):** Matches `docs/mockups/1 · Dashboard.png`
   - Welcome banner with "Sample data" badge
   - Quick action buttons: `Upload student data` & `Verify a student record`
   - 4 Metric cards: Approved intake (120), Students enrolled (118), Records verified (112), Need your attention (6)
   - Intake progress bar: "118 of 120 approved seats are filled. 2 seats remaining."
   - "What needs fixing": Cards with `Fix now` / `Review` actions for missing APAAR IDs, cross-institution matches, and missing seat categories.
2. **Bulk Upload Wizard (`/upload`):** Matches `docs/mockups/2 · Upload and check.png`
   - Stepper: (1) Choose file, (2) Check data, (3) Submit
   - File status: "File checked: students_2026.csv, 250 rows"
   - Summary cards: 242 ready to submit vs 8 need fixing
   - Row-level issue table (Row | Student | Problem | What to do)
   - Mandatory student consent confirmation checkbox
   - Actions: `Submit 242 ready records` and `Download list of 8 rows to fix`
3. **Record Verification (`/verify`):** Matches `docs/mockups/3 · Verify a record.png`
   - 12-digit APAAR ID search input & button
   - "Record verified" card with verified student attributes
   - Dynamic QR code for the record
   - Digital signature verification confirmation timestamp
   - Data minimization and privacy disclaimer
4. **AICTE Regulatory Bureau Dashboard (`/aicte/dashboard`):**
   - National overview of monitored institutions, total intake, enrolled students, and open flags
   - Cross-institution conflict alert feed
5. **Student Records (`/students`):**
   - Paginated roster with masked APAAR IDs (`•••• •••• 1234`), seat category and status filters, and single record addition modal
6. **Validation Issues (`/issues`):**
   - Regulatory review queue with severity filtering and registrar resolution dialog
7. **Intake Reports (`/reports`):**
   - Sanctioned intake vs enrolment utilization report with CSV export
8. **Help & Regulatory Guidance (`/help`):**
   - Official guidance, rule explanations, and transparent mock adapter disclosure

