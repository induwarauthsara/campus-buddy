# Campus Buddy

Campus Buddy is a modern student productivity platform designed to help university and college students organize academics, track progress, and manage daily campus life from one dashboard.

## Project Overview

Campus Buddy combines core campus workflow tools into a single web experience:

- academic planning
- assignment management
- GPA tracking
- personal finance tracking
- study-time productivity
- quick note-taking

The current application runs as a React single-page app with local persistence, and it is structured to evolve into a production-grade SaaS platform.

## Current Features

### 1) Smart Dashboard
- Daily overview with the current date
- Quick stats for classes, assignments, GPA, budget, notes, and study time
- Upcoming deadlines with overdue indicators
- Quick navigation actions to major tools

### 2) Weekly Timetable
- Week-view class planner (Monday to Friday)
- Manage class entries with subject, room, and time
- Add and remove scheduled classes
- Visual timetable layout for easy planning

### 3) Assignment & Task Manager
- Create, view, and delete assignments
- Track title, subject, due date, priority, and description
- Mark assignments complete/incomplete
- Filter tasks by status (all, active, completed)
- Overdue detection and status counters

### 4) GPA Calculator
- Add subjects with grade and credit values
- Automatic cumulative GPA calculation
- Semester-aware subject tracking
- Grade scale display and academic performance badge
- Remove subject entries when needed

### 5) Expense Tracker
- Add expenses by category with amount, date, and description
- Configure monthly budget
- Track total spending and remaining budget
- Category-based spending insights
- Recent expenses list for quick review

### 6) Study Timer (Pomodoro-style)
- Focus, short break, and long break modes
- Start/pause/reset/skip controls
- Session tracking and cycle progression
- Completion notification sound
- Total accumulated study-time tracking

### 7) Notes Manager
- Create, edit, and delete notes
- Organize by academic subject
- Search notes by title/content
- Subject-based filtering
- Last-updated timestamps for revision workflows

### 8) Unified State and Persistence
- Shared app-wide state management using React Context
- LocalStorage persistence for all core data modules:
  - classes
  - assignments
  - subjects
  - expenses
  - notes
  - study time
  - budget

## Current Technical Stack

- **Frontend:** React 19 + Vite
- **Language:** JavaScript (ES Modules)
- **Styling:** Custom CSS with responsive layout
- **State Management:** React Context API + hooks
- **Persistence:** Browser LocalStorage
- **Code Quality:** ESLint

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install and Run
```bash
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run lint` - run lint checks
- `npm run preview` - preview production build

## Product Vision: SaaS Evolution

To transform Campus Buddy into a scalable SaaS product, the future architecture can include:

### SaaS Product Capabilities
- Multi-tenant architecture for institutions and independent students
- Secure user authentication and role-based access (student, mentor, admin)
- Cloud sync across devices
- Team/workspace features for classes and study groups
- Subscription and billing plans
- Usage analytics and engagement insights
- Notifications (email, push, in-app)
- API integrations (calendar, LMS, productivity tools)

### Recommended Future Tech Stack for SaaS
- **Frontend:** React + TypeScript + component system (e.g., Tailwind CSS / design system)
- **Backend API:** Node.js (NestJS/Express) or Python (FastAPI)
- **Database:** PostgreSQL (primary), Redis (caching/session/rate limits)
- **ORM/Query Layer:** Prisma or Drizzle
- **Authentication:** Auth0 / Clerk / Supabase Auth / custom JWT with refresh-token strategy
- **File Storage:** S3-compatible object storage
- **Messaging/Queues:** BullMQ / RabbitMQ / managed queue for background jobs
- **Search & Analytics:** OpenSearch/Elasticsearch + product analytics platform
- **Payments:** Stripe subscriptions and invoicing
- **Infrastructure:** Docker + Kubernetes or serverless container platform
- **Cloud:** AWS / GCP / Azure
- **CI/CD:** GitHub Actions with staged deployment pipelines
- **Observability:** OpenTelemetry, centralized logging, metrics, and alerting
- **Security:** OWASP-aligned controls, secrets management, encryption at rest and in transit, audit logs
- **Testing Strategy:** Unit, integration, E2E (Vitest/Jest + Playwright/Cypress)

### Delivery Roadmap (High Level)
1. Move from localStorage to a cloud-backed API and relational database
2. Add account system, secure auth, and data isolation per user/tenant
3. Launch collaboration and notification features
4. Introduce paid tiers and billing lifecycle
5. Scale reliability, performance, and monitoring for production growth

The final goal of this product is to build a SaaS application.
