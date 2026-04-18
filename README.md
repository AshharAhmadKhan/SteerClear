# SteerClear

UPSC preparation is overwhelming, not because the syllabus is hard, but because you never know what to study next. SteerClear fixes that. You tell it your exam date, how many hours a day you can give, and your current level. It builds a month-by-month study roadmap across all 7 UPSC subjects so you always know exactly what to do.

This is my personal project, built to solve a real problem I kept seeing: aspirants spending more time planning their preparation than actually preparing.

## What it does

SteerClear is a roadmap generator for UPSC CSE Prelims. You create an account, fill in three inputs, and get a personalized plan that allocates your available hours across History, Geography, Polity, Economy, Science & Technology, Current Affairs, and CSAT, weighted by each subject's actual exam importance.

The plan adapts to your timeline. Short on time? It compresses into an intensive phase. Have 8+ months? It spreads across Foundation → Building → Mastery → Revision phases. It also tells you your syllabus coverage percentage so you know upfront if your schedule is realistic.

## Features

- User registration and login with JWT authentication
- 5-day free trial, then ₹999 for 6 months
- Roadmap generation based on exam date, daily hours, and preparation level
- Month-by-month plan with subject-wise hour allocation
- Phase-based learning (Foundation, Building, Mastery, Revision)
- Syllabus coverage estimate with status (Excellent / Good / Needs More Time)
- Trial countdown on dashboard
- Delete and regenerate roadmap anytime

## How to set it up

You'll need Node.js 18+, PostgreSQL (or a [Neon](https://neon.tech) database), and npm.

**1. Clone the repo**
```bash
git clone https://github.com/your-username/steerclear.git
cd steerclear
```

**2. Set up the database**

Run the schema against your PostgreSQL instance:
```bash
psql -U postgres -d your_database -f backend/database/schema.sql
```

**3. Configure the backend**

```bash
cd backend
cp .env.example .env
```

Fill in your `.env`:
```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-secret-key-here
TRIAL_DURATION_DAYS=5
```

**4. Start the backend**
```bash
npm install
npm run dev
```

**5. Start the frontend**
```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:3000`.

## How the roadmap generation works

When you submit your inputs, here's what actually happens:

1. It calculates total hours available between today and your exam date
2. A level multiplier is applied: beginners get 75% efficiency (more time needed), advanced get 120%
3. A 10% buffer is kept for flexibility
4. Hours are distributed across subjects by their exam weightage (Polity gets 20%, History/Geography/Economy/Current Affairs get 15% each, Science and CSAT get 10% each)
5. The timeline is split into phases based on how many months you have
6. Your coverage percentage is calculated against the 1000-hour industry benchmark

The algorithm is intentionally simple for the MVP. The goal was a useful plan fast, not a perfect one.

## Tech stack

**Backend** - Node.js, Express 5, PostgreSQL, JWT, bcrypt, Neon (serverless Postgres)

**Frontend** - React 19, Vite, Tailwind CSS, Zustand, React Router

## Project structure

```
steerclear/
├── backend/
│   ├── database/           # SQL schema
│   └── src/
│       ├── api/            # Routes, controllers, middleware
│       ├── data/           # Models and repositories
│       ├── domain/         # Roadmap generator + UPSC syllabus data
│       └── infrastructure/ # DB connection, JWT, password utils, config
└── frontend/
    └── src/
        ├── features/       # Auth and roadmap pages
        └── stores/         # Zustand auth state
```

## What's not built yet

- Payment integration (the upgrade button exists, Razorpay/Stripe not wired in yet)
- Daily task breakdown within each month
- Multiple exam types (only UPSC CSE Prelims for now)
- Progress tracking
- Mobile app
