# SteerClear

> UPSC prep planner that actually helped my friend clear their exam

I built this after watching my friend struggle with UPSC preparation — they had no idea how to structure 2 years of study across 20+ subjects. SteerClear generates a personalized roadmap based on your exam date, daily study hours, and current level.

## What it does

- Takes 3 inputs: target exam date, daily hours available, preparation level
- Generates a complete phase-wise roadmap (Foundation → Building → Revision)
- Allocates hours across all UPSC subjects intelligently
- Shows you exactly what to study when
- Includes a 5-day free trial (because building payment systems is interesting)

## Why I built this

My friend asked "how do I prepare for UPSC in 18 months?" and I realized there's no tool that gives you a concrete daily plan. Most resources say "study these subjects" but don't tell you *when* or *for how long*.

Also wanted to:
- Build a complete SaaS with auth + trial system + payments
- Learn full-stack development beyond CRUD
- Actually solve a real problem (my friend used this and it helped)

## Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- React Router

**Backend:**
- Node.js + Express
- PostgreSQL (because roadmaps need structured data)
- JWT authentication

**Features:**
- Trial system (5 free days, no card required)
- Razorpay integration (planned)
- Responsive dashboard

## How it works

1. User enters: exam date, daily hours, prep level
2. Backend calculates total available hours
3. Allocates hours across subjects based on UPSC syllabus weightage
4. Divides into 3 phases: Foundation (40%) → Building (35%) → Revision (25%)
5. Returns week-by-week roadmap with subject-wise breakdown

The algorithm considers:
- Subject difficulty and UPSC weightage
- User's current level (beginner needs more foundation time)
- Realistic daily study hours (accounts for breaks)
- Revision multipliers for better retention

## Quick Start

**Prerequisites:**
- Node.js 18+
- PostgreSQL

**Setup:**
```bash
# Clone
git clone https://github.com/AshharAhmadKhan/SteerClear.git
cd SteerClear

# Backend
cd backend
npm install
cp .env.example .env
# Update .env with your database credentials
npm start  # Runs on :5000

# Frontend (new terminal)
cd ../frontend
npm install
npm run dev  # Runs on :5173
```

**Environment Variables:**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/steerclear
JWT_SECRET=your-secret-key
PORT=5000
```

## Project Structure
```
SteerClear/
├── backend/
│   ├── config/         # DB connection
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   └── middleware/     # Auth, validation
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # Main roadmap view
│   │   │   ├── Generate.jsx     # Input form
│   │   │   └── Landing.jsx
│   │   └── services/            # API calls
│   └── public/
│
├── landing/            # Marketing page
├── PRD.md             # Product requirements
└── TRD.md             # Technical design
```

## Features

**Current:**
- ✅ User authentication (register/login)
- ✅ Trial system (5 days free)
- ✅ Roadmap generation algorithm
- ✅ Phase-wise planning
- ✅ Subject allocation
- ✅ Responsive dashboard
- ✅ Landing page

**Coming Soon:**
- [ ] Razorpay payment integration
- [ ] Progress tracking (mark topics as done)
- [ ] Email reminders
- [ ] Export roadmap as PDF
- [ ] Mobile app

## What I learned

- Building a SaaS trial system without Stripe (using JWT expiry)
- PostgreSQL for relational data (users → roadmaps → subjects)
- React state management for complex dashboards
- Deployment on Vercel (frontend) + Railway (backend)
- Actual user feedback (my friend suggested 3 features I added)

## Deployment

**Live:** [steer-clear.vercel.app](https://steer-clear.vercel.app)

**Frontend:** Vercel  
**Backend:** Railway (PostgreSQL + Express)

## API Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/roadmap/generate
GET  /api/roadmap/user/:userId
```

## Contributing

This is actively being improved! If you're a UPSC aspirant and have feedback, please open an issue or PR.

## License

MIT — use it however you want.

## Contact

Ashhar Ahmad Khan  
📧 itzashhar@gmail.com  
💼 [LinkedIn](https://linkedin.com/in/ashhar-ahmad-khan)  
🐙 [GitHub](https://github.com/AshharAhmadKhan)

---

If you're preparing for UPSC and this helped, let me know! Would love to hear your feedback.

Give it a ⭐️ if you found it useful!
```

---

**For the repo description**, change it to:
```
UPSC prep planner that generates personalized study roadmaps — built this after my friend asked "how do I prepare in 18 months?"
