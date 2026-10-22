# ShuleYetu — School Management Ecosystem

> **Enterprise-grade, multi-tenant school operations platform with a luxury public website and cryptographically secured role-based administration portal.**

---

## Executive Summary

**ShuleYetu** is a production-oriented school management platform engineered for forward-thinking international schools, academies, and educational institutions. Built with the **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL through Supabase**, it integrates institutional governance, academic planning, digital examination workflows, immutable inventory ledgers, and parent engagement into a single unified ecosystem.

---

##  Key Modules & Capabilities

### 1. Luxury Public Website
- **Branded Landing Page (`/`)**: Hero section, key metrics, academic pathways showcase, testimonials, and direct access portal gates.
- **Institutional Heritage (`/about`)**: Educational philosophy, core pillars, accreditations, and executive leadership bios.
- **Academic & Extracurricular Programs (`/programs`)**: STEM, Computer Science & AI, Humanities, Conservatory Arts, and Varsity Athletics.
- **Admissions Onboarding (`/admissions`)**: Transparent 4-stage enrollment process and interactive inquiry form.
- **Campus Chronicles (`/news`)**: Categorized institutional bulletins, Olympiad victories, and event schedules.
- **Campus Secretariat (`/contact`)**: Interactive inquiry routing, phone directory, and physical address.

### 2. Multi-Stage Assessment & Results Governance (Core Highlight)
- **Spreadsheet-Style Marks Entry (`/portal/assessments/marks`)**:
  - Live tabular grid for teachers with keyboard shortcuts.
  - Automatic letter grade and GPA computation based on max mark thresholds.
  - Real-time client and server validation (0 ≤ score ≤ Max Marks).
  - Class statistics preview (Class Mean, Pass Rate %, High/Low marks).
- **Four-Stage Approval Lifecycle (`/portal/assessments/results`)**:
  - `Draft`: Teacher working copy with local and autosave draft state.
  - `Under Review`: Submitted to Headteacher & Dean of Studies for verification.
  - `Approved`: Officially countersigned by academic administration.
  - `Returned with Comments`: Sent back with revision directives and teacher comments.
  - `Published`: **Strictly decoupled from approval** — made visible to parents and students only upon executive release.
- **Official Printable Transcripts (`/portal/assessments/reports`)**:
  - Complete term report card formatted for browser and print output (`window.print()`).
  - School seal, student particulars, ranked subject breakdown, and formal Headteacher signature blocks.

### 3. Student Records & Admissions
- **360° Student Registry (`/portal/students`)**: Search, filter by class/stream/status, and instant CSV data export.
- **Admissions Wizard (`/portal/students/admissions`)**: Capture demographic data, stream allocation, previous schooling, and medical alerts.
- **Class Stream Allocations (`/portal/students/enrollments`)**: Stream capacities, student-teacher ratios, and annual promotion transitions.
- **Student Profile View (`/portal/students/[id]`)**: Full health history, guardian emergency details, attendance record, and honors standing.

### 4. Daily Attendance Register (`/portal/attendance`)
- One-click morning roll-call with status badges (`Present`, `Late`, `Absent`, `Excused`).
- "Mark All Present" rapid action for high-velocity classroom recording.
- Real-time presence percentage calculation per class and stream.

### 5. Parent Portal ("My Children") (`/portal/children`)
- Tailored guardian dashboard showing linked student profiles.
- Secure view of verified terminal report cards (unapproved drafts are strictly withheld).
- Daily presence telemetry and emergency care protocol notifications.

### 6. Inventory & Asset Logistics (`/portal/inventory`)
- **Stock Consumables Catalog (`/portal/inventory/items`)**: SKU tracking, storage locations, unit valuation, and automated reorder alerts.
- **Requisition Workflow (`/portal/inventory/requisitions`)**: Staff material requests, approval actions, and warehouse dispatch.
- **Immutable Stock Movement Ledger (`/portal/inventory/movements`)**: Tamper-evident transaction trail of receipts, issues, and adjustments.
- **Capital Asset Registry (`/portal/inventory/assets`)**: Hardware serial numbers, asset tags, custodian accountability, and depreciation condition.

### 7. Staff & Institutional Administration
- **Faculty Directory (`/portal/staff`)**: Role mappings, departmental heads, and email invitation onboarding.
- **School Profile & Security Configuration (`/portal/settings`)**: Branding, institutional code, grading scheme, and MFA parameters.
- **Security Audit Stream (`/portal/audit`)**: Detailed audit trail capturing actor, role, payload diff, client IP, and timestamp.
- **Institutional Broadcasts (`/portal/communication`)**: Targeted circulars (All, Teachers, Parents, Students) with public website mirroring.

---

##  Role-Based Access Control (RBAC)

Framer Elite enforces strict **server-side authorization** across 8 distinct institutional personas:

| Role | Hierarchy Level | Primary Permissions |
|---|---|---|
| **Super Administrator** | `100` | Full platform control, multi-school tenancy, global settings |
| **School Administrator** | `90` | School operations, staff invitations, inventory approval, final publication |
| **Headteacher** | `80` | Academic oversight, mark verification, approve/return results, reports |
| **Teacher** | `60` | Assigned classes, spreadsheet marks entry, attendance roll-call, requisitions |
| **Inventory Officer** | `50` | Warehouse items, asset tagging, stock movements, requisition fulfillment |
| **Accountant** | `50` | Inventory valuations, procurement audits, financial exports |
| **Non-Teaching Staff** | `30` | Profile management, departmental announcements, material requisitions |
| **Parent / Guardian** | `20` | Linked children's published results, attendance records, school circulars |

##  Technology Stack & Architecture

- **Framework**: Next.js 15 (App Router, Server Components & Server Actions)
- **Language**: TypeScript 5.7 (Strict mode)
- **Styling**: Tailwind CSS (Tailored institutional palette & typography)
- **Database**: PostgreSQL (via Supabase) with Row Level Security (RLS)
- **Authentication**: Supabase Auth + Session Cookies + Server-side RBAC
- **Validation**: Zod schema validation on forms and APIs
- **Icons**: Lucide React
- **Notifications**: Sonner Toast notifications

---

##  Database Setup & Migrations

The database migration schema is available at `supabase/migrations/001_initial_schema.sql` (800+ lines covering all 25 tables, foreign keys, triggers, and RLS policies).

To verify migrations:
```bash
npm run db:migrate
```

To seed demonstration data:
```bash
npm run db:seed
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Framer Elite Academy"
```

---

##  Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.
