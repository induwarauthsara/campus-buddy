<div align="center">

# 🎓 Campus Buddy

**The all-in-one productivity platform built for university students.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

*Organize your academics. Track your progress. Own your campus life.*

</div>

---

## What is Campus Buddy?

Campus Buddy is a modern student productivity web app that brings your entire academic life into one clean dashboard. No more juggling five different apps for your timetable, assignments, finances, and study sessions. Whether you're a first-year finding your rhythm or a final-year managing heavy coursework, Campus Buddy is built to keep you on top of everything that matters.

Built with React 19 and Vite, it runs entirely in the browser with local persistence — no sign-up required to start using it.

---

## Features

### Smart Dashboard
Get a real-time overview of your day the moment you open the app. See upcoming deadlines, overdue tasks, your current GPA, budget status, and study time — all at a glance with quick-access navigation to every tool.

### Weekly Timetable
Plan your academic week visually. Add classes with subject names, room numbers, and time slots across a Monday-to-Friday grid. Manage and update your schedule as the semester evolves.

### Assignment and Task Manager
Never miss a deadline again. Create assignments with titles, subjects, due dates, priorities, and descriptions. Mark them complete, filter by status, and get automatic overdue detection so nothing slips through.

### GPA Calculator
Track your academic performance semester by semester. Add subjects with their grades and credit values, and Campus Buddy automatically calculates your cumulative GPA with a performance badge to keep you motivated.

### Expense Tracker
Stay in control of your student budget. Log expenses by category, set a monthly budget limit, and review your spending patterns. See exactly how much you have left before the month ends.

### Study Timer (Pomodoro-style)
Power through study sessions with a built-in Pomodoro timer. Switch between focus, short break, and long break modes. Session tracking and cycle progression keep you disciplined, and a completion sound signals every milestone.

### Notes Manager
Capture ideas and study notes on the fly. Organize notes by subject, search across all your content, and filter by topic. Every note shows a last-updated timestamp so you always know how fresh your revision material is.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 |
| Build Tool | Vite |
| Language | JavaScript (ES Modules) |
| Styling | Custom CSS (responsive) |
| State Management | React Context API + Hooks |
| Persistence | Browser LocalStorage |
| Code Quality | ESLint |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/campus-buddy.git

# Navigate to the project directory
cd campus-buddy

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and head to `http://localhost:5173`.

### Available Scripts

```bash
npm run dev       # Start local development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint checks
```

---

## Project Structure

```
campus-buddy/
├── src/
│   ├── components/        # UI components (Dashboard, Timetable, Timer, etc.)
│   ├── context/           # React Context for shared app state
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Route-level page components
│   ├── styles/            # CSS stylesheets
│   └── main.jsx           # App entry point
├── public/                # Static assets
├── index.html
├── vite.config.js
└── package.json
```

---

## Roadmap: SaaS Evolution

Campus Buddy is architected to grow beyond a single-user browser app into a full-scale SaaS platform for universities and students worldwide. Here is the planned evolution:

**Phase 1 - Cloud Backend**
Move from localStorage to a cloud-backed REST API with a PostgreSQL database. Add per-user data isolation and secure authentication (JWT with refresh tokens).

**Phase 2 - Accounts and Auth**
Full account system with role-based access for students, mentors, and admins. OAuth support and session management.

**Phase 3 - Collaboration**
Study group workspaces, class sharing, team assignments, and in-app notifications (email, push, in-app).

**Phase 4 - Monetization**
Subscription plans, billing lifecycle with Stripe, and institutional licensing for universities.

**Phase 5 - Scale and Observability**
Performance monitoring with OpenTelemetry, centralized logging, and a full CI/CD pipeline via GitHub Actions with staged deployments.

### Future Tech Stack

| Area | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS |
| Backend API | Node.js (NestJS) or Python (FastAPI) |
| Database | PostgreSQL + Redis |
| ORM | Prisma or Drizzle |
| Auth | Clerk / Auth0 / Supabase Auth |
| File Storage | S3-compatible object storage |
| Queues | BullMQ / RabbitMQ |
| Payments | Stripe |
| Infrastructure | Docker + Kubernetes |
| Cloud | AWS / GCP / Azure |
| CI/CD | GitHub Actions |
| Observability | OpenTelemetry + centralized logging |

---

## Contributing

Contributions are welcome! If you have ideas for features, bug fixes, or improvements, feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add: your feature description'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with dedication for students, by a student.

⭐ Star this repo if Campus Buddy helps your academic journey!

</div>
