# SteerClear

> UPSC prep planner that generates personalized study roadmaps based on exam date and available hours

I built this to solve a common problem — UPSC aspirants have tons of resources but no clear roadmap of *what* to study *when*. Most guides say "cover these subjects" but don't give you a day-by-day plan based on your actual timeline.

## What it does

- Takes 3 inputs: target exam date, daily hours available, preparation level
- Generates a complete phase-wise roadmap (Foundation → Building → Revision)
- Allocates hours across all UPSC subjects intelligently
- Shows you exactly what to study when
- Includes a 5-day free trial system

## Why I built this

Wanted to build a complete SaaS product from scratch — not just backend APIs or frontend components, but the whole thing: auth, trial system, payment flow, algorithm, and deployment.

Also:
- Learn full-stack development beyond CRUD
- Understand how trial systems work without payment gateways
- Build something that solves an actual problem (UPSC prep is genuinely overwhelming)

## Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- React Router

**Backend:**
- Node.js + Express
- PostgreSQL (Neon.tech)
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
npm start  # Runs on :3000

# Frontend (new terminal)
cd ../frontend
npm install
npm run dev  # Runs on :5173
```

**Environment Variables:**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/steerclear
JWT_SECRET=your-secret-key
PORT=3000
FRONTEND_URL=http://localhost:5173
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
- ✅ Production deployment

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
- Deployment on Vercel (frontend) + Render (backend)
- Algorithm design for educational content planning
- Free deployment workflow without credit cards

## Deployment

**🚀 Live:** [https://steerclear.vercel.app](https://steerclear.vercel.app)

**Stack:**
- **Frontend:** Vercel (https://steerclear.vercel.app)
- **Backend:** Render (https://steerclear-backend.onrender.com)
- **Database:** Neon.tech (PostgreSQL)


## API Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/roadmap/generate
GET  /api/roadmap/user/:userId
```

## Contributing

This is actively being improved! If you have feedback or suggestions, feel free to open an issue or PR.

## License

MIT — use it however you want.

## Contact

Ashhar Ahmad Khan  
📧 itzashhar@gmail.com  
💼 [LinkedIn](https://linkedin.com/in/ashhar-ahmad-khan)  
🐙 [GitHub](https://github.com/AshharAhmadKhan)

---

Built this to learn full-stack SaaS development and free deployment strategies.

Give it a ⭐️ if you found it useful!
