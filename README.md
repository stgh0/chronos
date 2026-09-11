# ATS — Automated Timetable Scheduler

> **"Intelligent timetable generation for modern multidisciplinary universities"**

ATS is a hackathon-winning prototype designed to solve the multi-dimensional scheduling challenges introduced by India's National Education Policy (**NEP 2020**). It balances major-minor multidisciplinary electives (MDM), professional electives (PEC), laboratory equipment constraints, faculty shift preferences, and dedicated student lunch break reservations.

---

## 🌟 Primary Demo Flow (Judging Guide)

1. **Role Login (`/login`)**:
   - One-click instant login buttons for **University Admin**, **Department Coordinator**, **Faculty**, and **Student**.
2. **Admin Control Dashboard (`/dashboard`)**:
   - View real-time institutional KPIs (1,400 students, 72 faculty, 18 classrooms, 6 labs, 94% scheduling readiness).
3. **Data Upload (`/timetable/upload`)**:
   - Recreates Screenshot 2: Drag-and-drop Excel file or click **"Use Demo Dataset (timetable_data.xlsx)"**.
4. **Data Validation (`/timetable/validate`)**:
   - Ingests 42 courses, 31 faculty, 18 classrooms, 6 labs, and detects potential collisions.
5. **Lunch Break Configuration (`/timetable/lunch-breaks`)**:
   - **Recreation of Screenshot 1**: Side-by-side cards for **SY (Second Year)** and **TY (Third Year)** with 9 selectable time slots.
6. **MDM / PEC Matrix (`/timetable/mdm`)**:
   - **Recreation of Screenshot 3**: 5-day time slot matrices for 2-hour MDM Labs and Theory slots with gold selection and pink lunch lockouts.
7. **Constraint Wizard (`/timetable/configure`)**:
   - Review hard constraints (100% zero collision) and soft preference weights.
8. **Automated Scheduler Engine (`/timetable/generate`)**:
   - Animated 9-stage constraint satisfaction pipeline simulating OR-Tools CP-SAT & Genetic Algorithm search.
9. **Interactive Master Timetable (`/timetable/generated`)**:
   - 5-Day (Mon–Fri) x 9-Slot responsive grid with cohort filters (SY-A, SY-B, TY-A, TY-B), view modes (Student, Faculty, Room, Department), and interactive cell inspection modal.
10. **Intelligent AI Assistant (`/ai-suggestions`)**:
    - Contextual conflict detection with 1-click **"Apply Suggestion"**, **"Preview Change"**, and **"Dismiss"** actions.
11. **Schedule Comparison (`/timetable/compare`)**:
    - Multi-objective Pareto evaluation across Schedule A (Greedy), Schedule B (CP-SAT Optimized), and Schedule C (Genetic Algorithm).
12. **Role Dashboards**:
    - **Faculty Portal (`/faculty-dashboard`)**: Workload balance gauge, today's sessions, and weekly teaching schedule.
    - **Student Portal (`/student-dashboard`)**: Engaging **"What's Next?"** widget with real-time countdown, classroom navigation, and daily schedule.
13. **Export Center (`/reports`)**:
    - Real spreadsheet generation with `.xlsx` download via SheetJS and print-ready PDF views.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla Design System
- **Icons**: Lucide React
- **Export**: SheetJS (`xlsx`) for real Excel generation
- **Visuals**: Canvas-confetti for generation milestones
- **Architecture**: Modular mock service layer (`timetableService`, `validationService`, `optimizationService`, `aiSuggestionService`, `exportService`)

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
