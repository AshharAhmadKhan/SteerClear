# SteerClear 🎯

> **Personalized UPSC Preparation Planner** — A SaaS platform that generates customized study roadmaps for UPSC CSE aspirants.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0--mvp-green.svg)](https://github.com/AshharAhmadKhan/SteerClear/releases)

## Overview

SteerClear eliminates UPSC preparation overwhelm by providing clear, personalized study roadmaps based on target date, daily hours, and preparation level.

## Features

- Personalized roadmap generation
- Subject-wise hour allocation
- Phase-based planning (Foundation → Building → Revision)
- Trial system (5-day free trial)
- Professional dashboard UI

## Tech Stack

**Frontend:** React 18 + Vite + Tailwind CSS  
**Backend:** Node.js + Express + PostgreSQL  
**Auth:** JWT + bcrypt

## Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Project Structure
```
SteerClear/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite app
├── PRD.md           # Product Requirements
└── TRD.md           # Technical Requirements
```

## Roadmap

- [x] MVP (Authentication, Roadmap generation, Dashboard)
- [ ] Payment integration (Razorpay)
- [ ] Deployment
- [ ] Progress tracking
- [ ] Email notifications

## License

MIT License - see LICENSE file

## Author

**Ashhar Ahmad Khan**  
GitHub: [@AshharAhmadKhan](https://github.com/AshharAhmadKhan)
