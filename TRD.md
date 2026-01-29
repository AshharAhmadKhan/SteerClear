Technical Requirements Document: SteerClear
Version 1.0 | Status: Draft | Date: January 25, 2026PART 1: TECHNICAL FOUNDATIONTechnical OverviewSteerClear is a student execution platform that generates rule-based study roadmaps and delivers daily tasks through a simplified interface. The system operates on three core technical pillars:
Deterministic roadmap generation: Rule-based algorithms generate personalized study plans without requiring machine learning infrastructure
Stateful task progression: The system tracks completion states and adapts plans through simple redistribution logic
Proactive notification delivery: Time-based alerts inform users of tasks and deadlines through push and email channels
The technical architecture prioritizes simplicity, reliability, and maintainability over sophisticated automation. The system aims to be operated by a solo developer or very small team with minimal ongoing infrastructure costs.System GoalsPrimary Technical ObjectivesExecution Reliability

Roadmap generation completes in <5 seconds for 12-month plans
App remains responsive with <2 second page transitions
Notification delivery achieves >95% success rate
Payment flow completes without transaction loss
Operational Simplicity

Single deployment pipeline (no microservices complexity)
Free tier infrastructure for initial launch
Manual override capability for all automated processes
Clear failure modes with graceful degradation
Data Integrity

User progress persists reliably across sessions
Payment states remain consistent (no duplicate charges or lost access)
Task completion history retained for recovery calculations
Timezone handling prevents scheduling errors
High-Level System ArchitectureComponent Overview

┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  PWA (React) or Android App (React Native)                  │
│  - Today Mode UI                                            │
│  - Roadmap viewer                                           │
│  - Resource library                                         │
│  - Local state cache                                        │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ HTTPS/REST
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                      API SERVER LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  Node.js (Express) - Stateless API                          │
│  - Authentication (JWT)                                     │
│  - Roadmap generation                                       │
│  - Task CRUD operations                                     │
│  - Payment webhook handling                                 │
│  - Notification scheduling                                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                       DATA LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL (Supabase or Railway free tier)                 │
│  - User accounts and auth                                   │
│  - Goals and roadmaps                                       │
│  - Task states and completion history                       │
│  - Resource library (curated content)                       │
│  - Deadline database                                        │
│  - Payment records                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    NOTIFICATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  Firebase Cloud Messaging (FCM) - Push notifications        │
│  SendGrid Free Tier - Email notifications                   │
│  Cron jobs (node-cron) - Daily triggers                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     PAYMENT LAYER                           │
├─────────────────────────────────────────────────────────────┤
│  Razorpay or Cashfree - UPI payment gateway                 │
│  Webhook receiver for payment confirmation                  │
│  Manual refund processing (admin interface)                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ANALYTICS LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  PostHog (free tier) - Product analytics only               │
│  - Event tracking (task_completed, payment_initiated, etc.) │
│  - No business intelligence dashboards                      │
└─────────────────────────────────────────────────────────────┘

Technical Requirements Document: SteerClear
Version 1.0 | Status: Draft | Date: January 25, 2026

PART 1: TECHNICAL FOUNDATION
Technical Overview
SteerClear is a student execution platform that generates rule-based study roadmaps and delivers daily tasks through a simplified interface. The system operates on three core technical pillars:

Deterministic roadmap generation: Rule-based algorithms generate personalized study plans without requiring machine learning infrastructure
Stateful task progression: The system tracks completion states and adapts plans through simple redistribution logic
Proactive notification delivery: Time-based alerts inform users of tasks and deadlines through push and email channels

The technical architecture prioritizes simplicity, reliability, and maintainability over sophisticated automation. The system aims to be operated by a solo developer or very small team with minimal ongoing infrastructure costs.

System Goals
Primary Technical Objectives
Execution Reliability

Roadmap generation completes in <5 seconds for 12-month plans
App remains responsive with <2 second page transitions
Notification delivery achieves >95% success rate
Payment flow completes without transaction loss

Operational Simplicity

Single deployment pipeline (no microservices complexity)
Free tier infrastructure for initial launch
Manual override capability for all automated processes
Clear failure modes with graceful degradation

Data Integrity

User progress persists reliably across sessions
Payment states remain consistent (no duplicate charges or lost access)
Task completion history retained for recovery calculations
Timezone handling prevents scheduling errors


High-Level System Architecture
Component Overview
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  PWA (React) or Android App (React Native)                  │
│  - Today Mode UI                                            │
│  - Roadmap viewer                                           │
│  - Resource library                                         │
│  - Local state cache                                        │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ HTTPS/REST
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                      API SERVER LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  Node.js (Express) - Stateless API                          │
│  - Authentication (JWT)                                     │
│  - Roadmap generation                                       │
│  - Task CRUD operations                                     │
│  - Payment webhook handling                                 │
│  - Notification scheduling                                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │
┌──────────────────▼──────────────────────────────────────────┐
│                       DATA LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL (Supabase or Railway free tier)                 │
│  - User accounts and auth                                   │
│  - Goals and roadmaps                                       │
│  - Task states and completion history                       │
│  - Resource library (curated content)                       │
│  - Deadline database                                        │
│  - Payment records                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    NOTIFICATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  Firebase Cloud Messaging (FCM) - Push notifications        │
│  SendGrid Free Tier - Email notifications                   │
│  Cron jobs (node-cron) - Daily triggers                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     PAYMENT LAYER                           │
├─────────────────────────────────────────────────────────────┤
│  Razorpay or Cashfree - UPI payment gateway                 │
│  Webhook receiver for payment confirmation                  │
│  Manual refund processing (admin interface)                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ANALYTICS LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  PostHog (free tier) - Product analytics only               │
│  - Event tracking (task_completed, payment_initiated, etc.) │
│  - No business intelligence dashboards                      │
└─────────────────────────────────────────────────────────────┘

Tech Stack Choices
Frontend
Primary Option: Progressive Web App (PWA)

Framework: React with Vite
Why: Single codebase serves web and mobile (Android via browser), zero app store approval delays, instant deployment
State Management: Zustand (lightweight, simpler than Redux)
UI Components: Tailwind CSS + headlessui (no component library dependencies)
Offline: Service worker for task caching

Alternative: React Native (if native features become critical)

Android-only build initially
Use Expo for simplified build pipeline
Deferred unless PWA proves insufficient

Rationale: PWA eliminates platform-specific build complexity and app store dependencies while maintaining acceptable UX for target users. React Native adds value only if deep OS integration (background sync, advanced notifications) becomes necessary.

Backend
API Server: Node.js with Express

Why: JavaScript everywhere (shared types/validation with frontend), mature ecosystem, easy to deploy
Deployment: Railway free tier or Render free tier (both offer PostgreSQL + Node.js hosting)
Architecture: Monolithic API (no microservices—adds complexity without benefit at this scale)

Alternative Considered: Supabase serverless functions

Rejected because: Less control over business logic, harder to debug, vendor lock-in for critical features

Rationale: Express is boring, well-documented, and reliable. One server handles all API logic. Complexity budget spent on product features, not infrastructure.

Database
PostgreSQL via Supabase or Railway

Why: Relational model fits roadmap → tasks → resources hierarchy naturally, free tier includes auth
Free tier limits: 500MB storage (sufficient for 10,000+ users with text-only data), pooled connections
Backup strategy: Automated daily backups included in free tier

Schema Design Philosophy

Normalized structure (users → goals → roadmaps → tasks)
JSON columns only for truly dynamic data (user preferences, task metadata)
Indexes on frequently queried fields (user_id, scheduled_date, goal_id)

Alternative Considered: Firebase Firestore

Rejected because: NoSQL querying becomes complex for roadmap calculations, harder to ensure data consistency

Rationale: PostgreSQL provides ACID guarantees critical for payment states and task progression. Free tier offerings are generous enough for initial scale.

Notifications
Push Notifications: Firebase Cloud Messaging (FCM)

Why: Free, reliable, works for both PWA and React Native, Google-backed infrastructure
Implementation: Server sends notification requests to FCM API, client registers device tokens
Scheduling: Cron jobs on backend trigger notification sends at scheduled times

Email Notifications: SendGrid Free Tier

Why: 100 emails/day free tier sufficient for critical alerts, reliable delivery, good documentation
Use cases: Backup for push (if user denies permission), payment confirmations, weekly summaries

SMS Notifications: Deferred to Post-V1

High per-message cost, not justified for MVP
Push + email coverage sufficient

Rationale: FCM is industry standard for mobile notifications. SendGrid provides fallback channel at zero cost during initial growth.

Payments
UPI Gateway: Razorpay or Cashfree

Why: Zero setup fees, 2% transaction fee, supports UPI + other methods for future
Integration: Standard webhook-based flow (initiate payment → redirect → webhook confirms → grant access)
Refunds: Manual processing via dashboard (acceptable volume for MVP)

Payment Flow

User selects plan (1/3/6 months)
Backend creates payment order, stores in DB as "pending"
User completes UPI payment
Webhook receives confirmation, updates status to "completed", grants premium access
Access expiry tracked by end_date field

Rationale: Both Razorpay and Cashfree offer battle-tested UPI integration. Manual refund processing avoids complexity of automated refund logic for MVP scale.

Analytics
PostHog Free Tier (Self-hosted or Cloud)

Why: 1M events/month free, product analytics only (not business intelligence), privacy-friendly
Events tracked:

User actions: roadmap_generated, task_completed, payment_initiated
System events: auto_recovery_triggered, notification_sent


No custom dashboards: Use PostHog's built-in insights only

Explicitly NOT Using

Mixpanel (free tier too limited)
Amplitude (overkill for MVP)
Google Analytics (focused on marketing, not product)
Custom dashboards or business intelligence tools

Rationale: Analytics exists to answer "Is the product working?" not "What's our revenue forecast?" One simple system reduces cognitive overhead and avoids analysis paralysis.

Development & Deployment
Version Control: Git + GitHub (or GitLab)
Deployment Pipeline

Frontend: Vercel or Netlify (free tier for PWA hosting)
Backend: Railway or Render (free tier includes PostgreSQL + Node.js)
Single environment initially: Production-only (no staging until necessary)

Monitoring

Error tracking: Sentry free tier (5k events/month)
Uptime monitoring: UptimeRobot free tier (50 monitors)
Logging: Railway/Render built-in logs (7-day retention)

CI/CD

GitHub Actions free tier
Simple pipeline: lint → test → deploy
Deploy on merge to main branch

Rationale: Modern platforms handle infrastructure complexity. Zero time spent managing servers. Staging environment deferred until user base justifies complexity.

Engineering Principles
1. Ruthless Simplicity

Prefer static files over dynamic generation (resource links stored as JSON, not scraped)
Favor manual curation over automation (deadline updates via admin form, not web scraping)
Choose boring technology over cutting-edge (PostgreSQL over graph databases, REST over GraphQL)

2. Fail Visibly

Every background job (auto-recovery, notifications) logs success/failure
User-facing errors show actionable messages ("Link broken? Report it here")
Admin alerts for critical failures (payment webhook failures, notification send failures)

3. Manual Override Always Available

Users can edit auto-recovered plans
Admin can manually grant/revoke premium access
Curators can override algorithmic resource rankings

4. Data Integrity Over Features

Payment states use database transactions (no partial states)
Task completion writes are idempotent (safe to retry)
User timezone stored on account creation (no implicit UTC assumptions)

5. Optimize for Reading Code, Not Writing It

Explicit variable names over clever abbreviations
Comments explain "why" not "what"
Function length kept short (<50 lines)
No premature abstraction (duplication acceptable until pattern emerges 3+ times)


Explicit Non-Goals (V1)
Technical Non-Goals
NOT Building

Real-time collaborative features (no WebSockets)
Video hosting or streaming infrastructure
Content recommendation ML models
Automated web scraping systems
Multi-region deployment
Read replicas or sharding
Custom authentication (use Supabase Auth or Firebase Auth)
GraphQL API (REST sufficient)
Native mobile apps (unless PWA proves insufficient)
Automated A/B testing framework
Data warehouse or ETL pipelines
Admin dashboards beyond basic CRUD

NOT Optimizing For

Sub-second page loads (2-3 seconds acceptable)
Millions of users (scale assumptions: 10,000 users max in year 1)
Real-time analytics (daily/weekly reporting sufficient)
SEO perfection (basic meta tags sufficient)
Multi-language support (English only)
Accessibility beyond basics (WCAG AA compliance deferred)

NOT Spending Time On

Custom design system (Tailwind utility classes sufficient)
Sophisticated caching strategies (browser cache + simple Redis if needed)
Infrastructure as Code (manual setup acceptable initially)
Comprehensive test coverage (critical paths only: auth, payment, roadmap generation)
Performance profiling (optimize only when measurably slow)


System Constraints
Performance Targets (Good Enough)

Roadmap generation: <5 seconds for 12-month plans
API response time: <500ms for 95th percentile
Page load time: <3 seconds on 3G connection
Notification delivery: Within 5 minutes of scheduled time

Scalability Assumptions

Target: 10,000 total users in year 1
Concurrent users: <500 at peak
Database size: <1GB (text-only content)
API requests: <10,000/day

Availability Targets

Uptime: 99% (3.6 days downtime/year acceptable)
Planned maintenance: Sunday 2-4 AM IST (low traffic window)
Payment system uptime: 99.5% (delegated to Razorpay/Cashfree)

Rationale: Perfection is expensive and unnecessary for MVP. Focus engineering time on product features, not infrastructure excellence.

PART 2: CORE LOGIC & DATA MODELS

Core Data Models
User Model
typescriptinterface User {
  id: string;                    // UUID (primary key)
  email: string;                 // Unique, indexed
  password_hash: string;         // bcrypt hash
  created_at: timestamp;
  
  // Profile
  timezone: string;              // IANA timezone (e.g., "Asia/Kolkata")
  notification_time: time;       // Preferred daily notification time (default: 08:00)
  
  // Subscription
  subscription_tier: 'free' | 'premium';
  premium_start_date: timestamp | null;
  premium_end_date: timestamp | null;
  
  // Preferences (stored as JSON)
  preferences: {
    daily_hours: number;         // 1-10
    notification_enabled: boolean;
    email_notifications: boolean;
  };
}
Key Design Decisions

Timezone stored explicitly (no UTC conversion guesswork)
Premium access uses simple date range (end_date < now = expired)
Preferences stored as JSON for flexibility without schema migrations
Password authentication only for V1 (OAuth deferred)

Indexes

Primary: id
Unique: email
Query: premium_end_date (for daily expiry check job)


Goal Model
typescriptinterface Goal {
  id: string;                    // UUID (primary key)
  user_id: string;               // Foreign key to User
  
  // Goal definition
  goal_type: string;             // e.g., "UPSC_2026", "CAT_2026", "SSC_CGL_2026"
  target_date: date;             // Exam date
  current_level: 'beginner' | 'intermediate' | 'advanced';
  
  // Status
  status: 'active' | 'completed' | 'abandoned';
  created_at: timestamp;
  updated_at: timestamp;
}
Key Design Decisions

One active goal per user for V1 (simplifies UI and logic)
goal_type is string for flexibility (not enum—easier to add new exams)
Status field allows archiving without deletion

Indexes

Primary: id
Query: user_id (fetch user's goals)
Composite: (user_id, status) (fetch active goal efficiently)

Relationships

One-to-many: User → Goals
Cascade delete: If user deleted, goals deleted


Roadmap Model
typescriptinterface Roadmap {
  id: string;                    // UUID (primary key)
  goal_id: string;               // Foreign key to Goal (one-to-one)
  
  // Roadmap metadata
  generated_at: timestamp;
  last_recalculated: timestamp;  // Tracks auto-recovery runs
  
  // Calculated metrics
  total_days: number;            // Days from today to target_date
  total_hours: number;           // total_days × daily_hours
  coverage_percentage: number;   // % of syllabus covered by plan
  
  // Monthly breakdown (stored as JSON)
  monthly_milestones: MonthlyMilestone[];
  
  // Algorithm metadata
  algorithm_version: string;     // e.g., "v1.0" (for future A/B testing)
}

interface MonthlyMilestone {
  month: string;                 // e.g., "2026-02"
  phase: string;                 // "Foundation" | "Building" | "Mastery" | "Revision"
  subjects: {
    subject: string;             // e.g., "Modern History"
    hours_allocated: number;
    topics_covered: string[];    // High-level topics
  }[];
}
Key Design Decisions

Roadmap stored as calculated artifact (not regenerated on every view)
Monthly milestones stored as JSON (avoid separate table for simplicity)
algorithm_version allows tracking which logic generated each plan
Recalculation timestamp tracks when auto-recovery last ran

Indexes

Primary: id
Unique: goal_id (one roadmap per goal)

Relationships

One-to-one: Goal → Roadmap
Cascade delete: If goal deleted, roadmap deleted


Task Model
typescriptinterface Task {
  id: string;                    // UUID (primary key)
  roadmap_id: string;            // Foreign key to Roadmap
  
  // Task definition
  title: string;                 // e.g., "Modern Indian History - Spectrum Ch. 4"
  description: string;           // e.g., "Read Quit India Movement section"
  scheduled_date: date;          // When user should do this
  duration_minutes: number;      // Estimated time (30-90 mins typically)
  
  // Resource mapping
  resource_id: string | null;    // Foreign key to Resource (nullable)
  resource_deep_link: string;    // Direct link (YouTube timestamp, PDF page URL)
  backup_resource_link: string | null;
  
  // Metadata
  subject: string;               // e.g., "History"
  difficulty: 'easy' | 'medium' | 'hard';
  priority: number;              // 1-10 (higher = more critical for exam)
  
  // State tracking
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  started_at: timestamp | null;
  completed_at: timestamp | null;
  actual_duration_minutes: number | null;  // How long it actually took
  
  // User feedback
  user_difficulty_rating: number | null;   // 1-5 (1=easy, 5=very hard)
}
Key Design Decisions

Tasks generated during roadmap creation, then stored (not dynamically generated)
Deep links stored directly on task (no separate link resolution needed)
Priority field enables auto-recovery to redistribute high-priority content first
Actual duration tracking enables weakness calibration
Status transitions: pending → in_progress → completed or pending → skipped

Indexes

Primary: id
Query: roadmap_id (fetch all tasks for a roadmap)
Composite: (roadmap_id, scheduled_date) (fetch today's tasks efficiently)
Composite: (roadmap_id, status) (fetch pending tasks for auto-recovery)

Relationships

Many-to-one: Tasks → Roadmap
Many-to-one: Tasks → Resource (optional)
Cascade delete: If roadmap deleted, tasks deleted


Resource Model
typescriptinterface Resource {
  id: string;                    // UUID (primary key)
  
  // Resource identity
  title: string;                 // e.g., "Spectrum Modern History - Complete Book"
  type: 'video' | 'pdf' | 'article';
  url: string;                   // Primary link
  backup_url: string | null;
  
  // Classification
  subject: string;               // e.g., "History"
  topics: string[];              // e.g., ["Freedom Struggle", "Quit India Movement"]
  exam_types: string[];          // e.g., ["UPSC", "SSC"] (which exams this helps)
  difficulty: 'beginner' | 'advanced';
  
  // Metadata
  estimated_time_minutes: number;
  language: string;              // "English" | "Hindi"
  
  // Quality tracking
  curator_rating: number;        // 1-5 (internal expert rating)
  community_rating: number | null;  // Average user rating (deferred to post-V1)
  usage_count: number;           // How many tasks use this resource
  
  // Validation
  last_validated: timestamp;     // Last time link was checked
  is_active: boolean;            // False if link is broken
  
  created_at: timestamp;
  updated_at: timestamp;
}
Key Design Decisions

Resources curated manually (not scraped or user-submitted in V1)
exam_types array allows one resource to serve multiple exams
usage_count tracks popularity (simple metric, no complex analytics)
is_active flag allows soft-deletion when links break

Indexes

Primary: id
Query: (subject, exam_types) (find resources for roadmap generation)
Query: is_active (filter out broken links)

Relationships

One-to-many: Resource → Tasks (one resource used by many tasks)
No cascade delete (tasks store deep_link directly as backup)


Deadline Model
typescriptinterface Deadline {
  id: string;                    // UUID (primary key)
  
  // Deadline identity
  title: string;                 // e.g., "UPSC Prelims 2026 Registration"
  deadline_date: date;           // Actual deadline
  category: 'exam_registration' | 'scholarship' | 'admission' | 'other';
  
  // Metadata
  official_url: string;          // Link to application/registration page
  description: string;           // Brief details
  exam_types: string[];          // e.g., ["UPSC"] (which exams this relates to)
  
  // Notification schedule (stored as JSON)
  notification_schedule: {
    days_before: number;         // e.g., 30, 14, 7, 1
    message_template: string;    // e.g., "UPSC registration opens in {days} days"
  }[];
  
  // Status
  is_active: boolean;            // False after deadline passes
  last_updated: timestamp;       // Manual curator update timestamp
  
  created_at: timestamp;
}
Key Design Decisions

Deadlines curated manually (no web scraping in V1)
Notification schedule stored on deadline (not calculated dynamically)
exam_types filters which users see which deadlines
Deadlines are global (not user-specific)

Indexes

Primary: id
Query: (is_active, deadline_date) (fetch upcoming deadlines)
Query: exam_types (filter deadlines by user's goal)

Relationships

No direct relationships (users see deadlines via exam_type matching)


Payment Model
typescriptinterface Payment {
  id: string;                    // UUID (primary key)
  user_id: string;               // Foreign key to User
  
  // Payment details
  amount: number;                // Amount in paise (₹299 = 29900 paise)
  currency: string;              // "INR"
  plan_duration_months: number;  // 1, 3, or 6
  
  // Payment gateway data
  gateway_order_id: string;      // Razorpay/Cashfree order ID
  gateway_payment_id: string | null;  // Payment ID after completion
  gateway_signature: string | null;   // Webhook signature for verification
  
  // Status tracking
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: timestamp;
  completed_at: timestamp | null;
  
  // Access grant tracking
  premium_granted_until: timestamp | null;  // Redundant with User.premium_end_date (for audit)
}
```

**Key Design Decisions**
- Amounts stored in paise (avoids floating-point precision issues)
- Gateway IDs stored for reconciliation and refund processing
- Status field enables payment flow debugging
- `premium_granted_until` stored for audit trail (redundant with User model)

**Indexes**
- Primary: `id`
- Query: `user_id` (fetch user's payment history)
- Query: `gateway_order_id` (webhook lookup)
- Query: `status` (find failed payments for debugging)

**Relationships**
- Many-to-one: Payments → User
- No cascade delete (payment records retained even if user deleted)

---

## Roadmap Generation Logic

### High-Level Algorithm Flow
```
Input:
  - goal_type (e.g., "UPSC_2026")
  - target_date
  - current_level (beginner/intermediate/advanced)
  - daily_hours

Step 1: Load Syllabus Template
  - Fetch pre-defined syllabus JSON for goal_type
  - Syllabus contains: subjects → topics → estimated_hours
  
Step 2: Calculate Total Capacity
  - days_available = target_date - today
  - total_hours = days_available × daily_hours
  - Apply learning curve adjustment:
    - Beginner: total_hours × 0.77 (needs 30% more time)
    - Intermediate: total_hours × 1.0
    - Advanced: total_hours × 1.25 (covers ground faster)

Step 3: Allocate Hours by Subject
  - For each subject in syllabus:
    - subject_hours = subject.exam_weightage_percent × total_hours
    - subject_hours adjusted by subject.difficulty_multiplier
  - Ensure sum of subject_hours ≤ total_hours × 0.9 (keep 10% buffer)

Step 4: Distribute Across Months
  - Divide timeline into phases:
    - Foundation: First 40% of time (basics + fundamentals)
    - Building: Next 30% of time (depth + practice)
    - Mastery: Next 20% of time (advanced topics + integration)
    - Revision: Final 10% of time (spaced repetition cycles)
  - Assign subjects to months based on:
    - Dependency chains (prerequisites first)
    - Cognitive load balancing (don't overload single month)

Step 5: Generate Daily Tasks
  - For each month, break down subject hours into tasks:
    - Task duration: 45-90 minutes (optimal focus window)
    - Map tasks to specific resources from Resource table
    - Generate deep links (YouTube timestamps, PDF pages)
    - Assign priority scores (based on exam weightage + difficulty)
  - Distribute tasks evenly across days in month
  - Respect daily_hours constraint

Step 6: Insert Revision Cycles
  - First revision: 2 weeks after initial learning
  - Second revision: 4 weeks after first revision
  - Final revision: Last week before exam
  - Revision tasks: 50% duration of original learning task

Step 7: Calculate Coverage Metrics
  - coverage_percentage = (hours_allocated / syllabus_total_hours) × 100
  - Generate confidence score based on historical data (static lookup)

Output:
  - Roadmap record (monthly milestones)
  - Task records (all tasks for 12 months, pre-generated)
Syllabus Template Structure
Syllabi stored as static JSON files (not in database for V1):
json{
  "goal_type": "UPSC_2026_PRELIMS",
  "total_hours_benchmark": 1200,
  "subjects": [
    {
      "name": "Modern History",
      "exam_weightage_percent": 15,
      "difficulty_multiplier": 1.2,
      "topics": [
        {
          "name": "Freedom Struggle",
          "estimated_hours": 40,
          "prerequisites": [],
          "resources": ["resource_uuid_1", "resource_uuid_2"]
        },
        {
          "name": "Quit India Movement",
          "estimated_hours": 12,
          "prerequisites": ["Freedom Struggle"],
          "resources": ["resource_uuid_3"]
        }
      ]
    },
    {
      "name": "Quantitative Aptitude",
      "exam_weightage_percent": 20,
      "difficulty_multiplier": 1.5,
      "topics": [...]
    }
  ],
  "revision_cycles": [
    {"weeks_after_learning": 2, "duration_multiplier": 0.5},
    {"weeks_after_learning": 6, "duration_multiplier": 0.4},
    {"weeks_before_exam": 1, "duration_multiplier": 0.6}
  ]
}
```

**Key Design Decisions**
- Syllabi are static JSON files (committed to repo, not dynamic)
- One file per exam type (e.g., `upsc_2026_prelims.json`)
- Curated manually by domain experts
- Updated via code deployment (not admin UI in V1)

---

### Weakness Calibration Logic

Applied during roadmap generation and auto-recovery:
```
Input:
  - User's weak_subjects (from preferences or explicit marking)
  - Task allocation plan (before calibration)

Step 1: Identify Weak Subjects
  - From User.preferences.weak_subjects array
  - Or from task completion patterns (deferred to post-V1)

Step 2: Apply Time Multipliers
  - For each task in allocation:
    - If task.subject in weak_subjects:
      - task.duration_minutes × 1.4 (40% more time)
    - If task.subject in strong_subjects:
      - task.duration_minutes × 0.8 (20% less time)

Step 3: Rebalance Daily Load
  - Ensure total daily minutes ≤ daily_hours × 60 + 15% buffer
  - If over-allocated:
    - Compress strong subject tasks further
    - Or redistribute weak subject tasks across more days

Step 4: Add Micro-Sessions
  - For weak subjects, break 90-min tasks into 2 × 45-min sessions
  - Schedule 2-3 days apart (spaced repetition benefit)

Output:
  - Adjusted task durations
  - Rebalanced daily schedule
```

**Edge Cases**
- User marks all subjects as weak → No calibration applied (avoid over-allocating)
- User marks no subjects as weak → Standard allocation used
- Weak subject + short timeline → System suggests timeline extension

---

## Today Mode Behavior

### Task Selection Logic
```
Input:
  - user_id
  - current_date
  - user_timezone

Step 1: Fetch Today's Tasks
  - Query: SELECT * FROM tasks 
           WHERE roadmap_id = user's active roadmap
           AND scheduled_date = current_date (in user's timezone)
           AND status IN ('pending', 'in_progress')
           ORDER BY priority DESC, created_at ASC

Step 2: Select Current Task
  - If no in_progress task: Return first pending task
  - If in_progress task exists: Return that task (resume session)
  - If all tasks completed: Show celebration message + tomorrow preview

Step 3: Prepare Task Data
  - Load resource deep_link
  - Check link validity (last_validated timestamp)
  - If link potentially stale (>7 days): Show warning icon
  - Load backup_link as fallback

Output:
  - Single task object with:
    - title, description, duration_minutes
    - resource_deep_link (ready to open)
    - progress state (started_at if resuming)
```

### State Transitions
```
State Machine:

pending → in_progress
  - Trigger: User opens Today Mode
  - Action: Set task.started_at = now
  - UI: Show timer, progress bar

in_progress → completed
  - Trigger: User clicks "Mark Complete"
  - Action: Set task.completed_at = now, task.status = 'completed'
  - Side effect: Update task.actual_duration_minutes
  - UI: Show celebration animation, load next task

in_progress → pending (resume later)
  - Trigger: User exits app before completing
  - Action: Keep task.started_at, status remains 'in_progress'
  - Next session: Resume from same task

pending → skipped
  - Trigger: User clicks "Skip Task" (requires confirmation)
  - Action: Set task.status = 'skipped'
  - UI: Load next pending task
  - Side effect: Skipped task flagged for auto-recovery
Session Tracking
typescriptinterface TaskSession {
  task_id: string;
  started_at: timestamp;
  paused_at: timestamp | null;
  completed_at: timestamp | null;
  total_active_minutes: number;  // Excludes pause time
}
```

**Stored in browser localStorage** (not database in V1):
- Tracks active session time
- Survives page refresh
- Synced to database only on task completion

---

## Auto-Recovery Logic

### Trigger Conditions

Auto-recovery runs daily at 12:30 AM (user's local time):
```
Conditions that trigger recovery:

1. Missed Tasks
   - Any task with scheduled_date < today AND status = 'pending'

2. Skipped Tasks
   - Any task with status = 'skipped'

3. Partial Completions (deferred to post-V1)
   - Tasks marked as "50% complete"

4. User-Requested Reset
   - User clicks "Adjust My Plan" button
```

### Recovery Algorithm
```
Input:
  - roadmap_id
  - List of missed/skipped tasks
  - Remaining days until target_date
  - User's daily_hours capacity

Step 1: Categorize Missed Content
  - Group tasks by priority score
  - High priority (8-10): Must redistribute
  - Medium priority (5-7): Attempt to fit
  - Low priority (1-4): Drop if capacity insufficient

Step 2: Calculate Remaining Capacity
  - future_days = target_date - today
  - daily_capacity_minutes = daily_hours × 60
  - total_capacity_minutes = future_days × daily_capacity_minutes
  - already_scheduled_minutes = SUM(pending tasks' duration)
  - available_capacity = total_capacity_minutes - already_scheduled_minutes

Step 3: Redistribution Strategy
  - If available_capacity ≥ missed_content_minutes:
    - Distribute missed tasks across next 7 days
    - Respect daily capacity + 15% buffer rule
    - Prioritize high-priority tasks first
  
  - If available_capacity < missed_content_minutes:
    - Switch to Compression Mode:
      - Keep only high-priority tasks
      - Reduce revision cycles (3 → 2)
      - Drop low-priority "nice-to-know" topics
  
  - If compression still insufficient:
    - Suggest timeline extension:
      - Calculate: "Extend deadline by X days for sustainable pace"
      - Show comparison: Original plan vs Extended plan

Step 4: Reschedule Tasks
  - Update scheduled_date for missed tasks
  - Insert into nearest available slots (respect capacity)
  - Maintain 10% buffer in daily schedule

Step 5: Generate Recovery Summary
  - Count: Tasks redistributed, tasks dropped, days adjusted
  - Visual diff: Show before/after weekly schedule
  - User approval required: "Approve Plan" or "Adjust Manually"

Output:
  - Updated task.scheduled_date values
  - Recovery_log record (for debugging + user history)
```

### Edge Case Handling

**Scenario 1: User Misses 7+ Consecutive Days**
```
Action:
  - Auto-recovery triggered
  - If capacity insufficient: Suggest "Restart Plan" option
  - Show message: "It's been a while. Would you like to restart with a fresh timeline?"
  - Option 1: Extend deadline by 2 weeks
  - Option 2: Reset plan from today (drop all previous progress)
```

**Scenario 2: Exam in <7 Days with Major Gaps**
```
Action:
  - Activate Triage Mode
  - Show only highest-priority tasks (priority ≥ 8)
  - Message: "Focus on high-yield topics only"
  - Automatically drop all low-priority content
```

**Scenario 3: Repeated Weekend Misses**
```
Detection:
  - If tasks scheduled on Sat/Sun are skipped 3+ consecutive weeks

Action:
  - Suggest adjusting weekly template
  - Message: "Looks like weekends are tough. Want to reduce weekend tasks?"
  - Option to redistribute weekend load to weekdays
```

**Scenario 4: Recovery Plan Rejected by User**
```
Action:
  - Allow manual adjustment via calendar view (deferred to post-V1)
  - For V1: Revert to original plan, log rejection
  - Show support contact: "Need help? Email support@steerclear.com"

Recovery Log Model
typescriptinterface RecoveryLog {
  id: string;
  roadmap_id: string;
  triggered_at: timestamp;
  
  // Input state
  missed_tasks_count: number;
  skipped_tasks_count: number;
  
  // Recovery action
  strategy: 'redistribute' | 'compress' | 'extend_deadline';
  tasks_redistributed: number;
  tasks_dropped: number;
  deadline_extended_days: number | null;
  
  // User response
  user_approved: boolean;
  approved_at: timestamp | null;
}
Purpose: Debugging, analytics, and user transparency

PART 3: API, STATE, NOTIFICATIONS & SECURITY

API Design
Authentication Endpoints
POST /api/auth/register
typescriptRequest:
{
  email: string;
  password: string;
  timezone: string;  // Auto-detected by client, sent in request
}

Response (201):
{
  user: {
    id: string;
    email: string;
    subscription_tier: 'free';
  },
  token: string;  // JWT token
}

Errors:
  400: Email already exists
  422: Invalid email format or weak password
POST /api/auth/login
typescriptRequest:
{
  email: string;
  password: string;
}

Response (200):
{
  user: { id, email, subscription_tier, premium_end_date },
  token: string;
}

Errors:
  401: Invalid credentials
POST /api/auth/google (deferred to post-V1)

Roadmap Endpoints
POST /api/roadmaps/generate
typescriptRequest:
{
  goal_type: string;       // e.g., "UPSC_2026_PRELIMS"
  target_date: string;     // ISO 8601 date
  current_level: 'beginner' | 'intermediate' | 'advanced';
  daily_hours: number;     // 1-10
  weak_subjects?: string[]; // Optional
}

Response (201):
{
  roadmap: {
    id: string;
    coverage_percentage: number;
    total_days: number;
    monthly_milestones: MonthlyMilestone[];
  },
  tasks_generated: number;
}

Errors:
  400: Invalid goal_type or target_date in past
  409: User already has active roadmap
  500: Generation failed (algorithm error)

Processing:
  - Runs synchronously (blocking request)
  - Target completion: <5 seconds
  - Creates Goal → Roadmap → Tasks in transaction
GET /api/roadmaps/current
typescriptResponse (200):
{
  roadmap: {
    id: string;
    goal: { goal_type, target_date },
    monthly_milestones: MonthlyMilestone[];
    coverage_percentage: number;
  }
}

Errors:
  404: No active roadmap found
GET /api/roadmaps/:id/export
typescriptResponse (200):
  Content-Type: application/pdf
  Body: Binary PDF data

Processing:
  - Generates PDF on-the-fly using library (e.g., PDFKit)
  - Includes: Monthly breakdown, task summary, resource links
  - Cached for 24 hours (keyed by roadmap_id)

Task Endpoints
GET /api/tasks/today
typescriptResponse (200):
{
  current_task: Task | null;  // Single task for Today Mode
  pending_count: number;       // Remaining tasks for today
  completed_today: number;
  next_task_preview?: Task;    // Preview of what's next
}

Query params:
  - date?: string (ISO date, defaults to today in user's timezone)

Processing:
  - Converts user's timezone to UTC for query
  - Returns task with status 'in_progress' if exists
  - Otherwise returns first pending task ordered by priority
PATCH /api/tasks/:id/status
typescriptRequest:
{
  status: 'in_progress' | 'completed' | 'skipped';
  actual_duration_minutes?: number;  // Required for 'completed'
  user_difficulty_rating?: number;   // Optional (1-5)
}

Response (200):
{
  task: Task;
  next_task: Task | null;
}

Processing:
  - Updates task.status and timestamps
  - If status = 'completed':
    - Record actual_duration_minutes
    - Trigger analytics event: task_completed
  - If status = 'skipped':
    - Flag for auto-recovery
  - Returns next pending task for seamless transition
POST /api/tasks/:id/report-issue
typescriptRequest:
{
  issue_type: 'broken_link' | 'wrong_content' | 'other';
  description?: string;
}

Response (200):
{
  message: 'Issue reported. We'll fix it within 24 hours.';
}

Processing:
  - Stores report in issues table (simple logging table)
  - Sends alert to admin email
  - Automatically swaps to backup_resource_link if available

Resource Endpoints
GET /api/resources
typescriptQuery params:
  - subject?: string
  - exam_type?: string
  - difficulty?: 'beginner' | 'advanced'
  - type?: 'video' | 'pdf' | 'article'
  - search?: string

Response (200):
{
  resources: Resource[];
  total_count: number;
}

Processing:
  - Returns only resources where is_active = true
  - Filters by query params
  - Ordered by: curator_rating DESC, usage_count DESC
  - Pagination: 20 resources per page (deferred to post-V1)
GET /api/resources/:id
typescriptResponse (200):
{
  resource: Resource;
  related_resources: Resource[];  // Same subject, different topics
}

Deadline Endpoints
GET /api/deadlines
typescriptQuery params:
  - exam_type?: string (filter by user's goal)

Response (200):
{
  upcoming_deadlines: Deadline[];  // Next 90 days only
}

Processing:
  - Filters: is_active = true AND deadline_date >= today
  - If exam_type provided: Filter by exam_types array contains exam_type
  - Ordered by: deadline_date ASC
POST /api/deadlines/custom (Premium only)
typescriptRequest:
{
  title: string;
  deadline_date: string;  // ISO date
  description?: string;
}

Response (201):
{
  deadline: CustomDeadline;
}

Processing:
  - Creates user-specific deadline (separate table: user_deadlines)
  - Automatically schedules notifications (7d, 3d, 1d before)

Payment Endpoints
POST /api/payments/create-order
typescriptRequest:
{
  plan_duration_months: 1 | 3 | 6;
}

Response (200):
{
  order_id: string;          // Razorpay order ID
  amount: number;            // In paise
  currency: 'INR';
  checkout_url: string;      // Redirect URL for payment
}

Processing:
  - Creates Payment record with status = 'pending'
  - Calls Razorpay API to create order
  - Returns order details for client-side payment flow
POST /api/payments/webhook
typescriptRequest (from Razorpay):
{
  event: 'payment.captured';
  payload: {
    payment: {
      order_id: string;
      payment_id: string;
      amount: number;
      status: 'captured';
    }
  }
}

Response (200):
{
  message: 'Webhook processed';
}

Processing:
  - Verify webhook signature (Razorpay secret)
  - Find Payment by gateway_order_id
  - Update Payment.status = 'completed'
  - Update User:
    - subscription_tier = 'premium'
    - premium_start_date = now
    - premium_end_date = now + plan_duration_months
  - Send confirmation email
  - Trigger analytics event: payment_completed

Security:
  - Signature verification using Razorpay webhook secret
  - Idempotent (duplicate webhooks ignored)
GET /api/payments/history
typescriptResponse (200):
{
  payments: Payment[];  // User's payment history
}

Auto-Recovery Endpoints
POST /api/recovery/trigger
typescriptRequest:
{} // Empty body (user-initiated recovery)

Response (200):
{
  recovery_plan: {
    tasks_redistributed: number;
    tasks_dropped: number;
    strategy: 'redistribute' | 'compress' | 'extend_deadline';
    new_schedule_preview: Task[];  // Next 7 days
  }
}

Processing:
  - Runs auto-recovery algorithm (see Part 2)
  - Does NOT automatically apply changes
  - Returns preview for user approval
POST /api/recovery/approve
typescriptRequest:
{
  recovery_log_id: string;
}

Response (200):
{
  message: 'Plan updated successfully';
}

Processing:
  - Applies scheduled_date updates to tasks
  - Marks recovery_log.user_approved = true
  - Triggers notification: "Your plan has been updated"

State Management Approach
Client-Side State Architecture
State Management Library: Zustand
Rationale: Lightweight, simpler than Redux, TypeScript-friendly, no boilerplate
State Stores
Auth Store
typescriptinterface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}
Roadmap Store
typescriptinterface RoadmapStore {
  currentRoadmap: Roadmap | null;
  monthlyMilestones: MonthlyMilestone[];
  isLoading: boolean;
  
  // Actions
  fetchRoadmap: () => Promise<void>;
  generateRoadmap: (params: GenerateParams) => Promise<void>;
  exportRoadmap: () => Promise<Blob>;
}
Task Store
typescriptinterface TaskStore {
  todayTask: Task | null;
  pendingCount: number;
  completedToday: number;
  
  // Session tracking (local only)
  sessionStartTime: number | null;
  sessionPaused: boolean;
  
  // Actions
  fetchTodayTask: () => Promise<void>;
  completeTask: (taskId: string, duration: number) => Promise<void>;
  skipTask: (taskId: string) => Promise<void>;
  startSession: () => void;
  pauseSession: () => void;
}
Resource Store
typescriptinterface ResourceStore {
  resources: Resource[];
  filters: {
    subject?: string;
    difficulty?: string;
    type?: string;
  };
  
  // Actions
  fetchResources: (filters?: Filters) => Promise<void>;
  searchResources: (query: string) => Promise<void>;
}
```

---

### Persistence Strategy

**What Gets Persisted**

*localStorage (survives page refresh)*:
- Auth token (JWT)
- User preferences (theme, notification settings)
- Active task session (start time, task_id)
- Last sync timestamp

*Session Storage (cleared on tab close)*:
- Temporary form data (roadmap generation inputs)
- Navigation state

*Server-side (source of truth)*:
- All user data, roadmaps, tasks, payments
- Progress tracking
- Completion history

**Sync Strategy**
```
On app load:
  1. Check localStorage for auth token
  2. If valid: Fetch latest user data from API
  3. If invalid: Redirect to login
  4. Sync local session state with server task state

On task completion:
  1. Update local state immediately (optimistic update)
  2. Send API request
  3. If request fails: Rollback local state, show error

On network reconnect:
  1. Check for pending sync operations in localStorage
  2. Retry failed requests
  3. Refresh task list from server

Offline Handling
Offline Capabilities (V1 Scope)
Read-Only Offline Access:

Today's task cached in localStorage
Resource deep links cached (URLs only, not content)
Roadmap monthly milestones cached

Not Available Offline:

Task completion (requires server sync)
Roadmap generation
Payment flows

Offline Detection
typescript// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Service worker caches:
// - App shell (HTML, CSS, JS)
// - Today's task data
// - User's current roadmap

// On network disconnect:
window.addEventListener('offline', () => {
  // Show banner: "You're offline. Task completion will sync when back online."
  // Disable completion button
  // Show read-only task view
});

// On network reconnect:
window.addEventListener('online', () => {
  // Hide offline banner
  // Sync any pending operations
  // Refresh task data
});

Notification System Design
Notification Types & Schedules
1. Daily Task Reminder

Trigger: Daily at user's preferred time (default 8:00 AM local)
Channel: Push notification (primary), Email (fallback if push disabled)
Message: "Clear the Fog—Your task is ready"
Deep link: Opens app to Today Mode
Delivery: Firebase Cloud Messaging (FCM)

2. Deadline Alerts

Trigger: Tiered schedule (30d, 14d, 7d, 1d before deadline)
Channel: Push + Email
Message: "[Exam Name] registration opens in {days} days"
Deep link: Opens deadline detail or external registration URL
Delivery: FCM + SendGrid

3. Auto-Recovery Notification

Trigger: Morning after auto-recovery runs (9:00 AM local)
Channel: Push notification
Message: "Your plan adapted—you're still on track"
Deep link: Opens recovery summary view
Delivery: FCM

4. Streak Celebrations

Trigger: After 7, 14, 30, 60, 100 day streaks
Channel: In-app notification + Push
Message: "{X}-day streak! You're unstoppable."
Delivery: FCM

5. Payment Confirmation

Trigger: Immediately after payment webhook
Channel: Email (mandatory), Push (optional)
Message: "Payment confirmed. Premium access activated."
Delivery: SendGrid


Notification Scheduling Architecture
Backend Scheduler: node-cron
typescript// Daily task reminder job
cron.schedule('0 * * * *', async () => {
  // Runs every hour on the hour
  
  const targetTime = new Date().getUTCHours();
  
  // Find users whose local time = 8 AM right now
  const users = await db.query(`
    SELECT id, timezone, preferences 
    FROM users 
    WHERE subscription_tier = 'premium'
    AND preferences->>'notification_enabled' = 'true'
    AND extract(hour from (now() AT TIME ZONE timezone)) = 8
  `);
  
  for (const user of users) {
    // Fetch today's task
    const task = await getTodayTask(user.id);
    
    if (!task) continue;  // No task for today
    
    // Send notification
    await sendPushNotification({
      user_id: user.id,
      title: 'Clear the Fog',
      body: 'Your task is ready',
      deep_link: `/tasks/today`,
    });
  }
});
Deadline Alert Job
typescriptcron.schedule('0 9 * * *', async () => {
  // Runs daily at 9 AM UTC
  
  const today = new Date();
  const alertWindows = [30, 14, 7, 1];  // Days before deadline
  
  for (const daysBefor of alertWindows) {
    const targetDate = addDays(today, daysBefore);
    
    // Find deadlines matching this alert window
    const deadlines = await db.query(`
      SELECT * FROM deadlines 
      WHERE deadline_date = $1 
      AND is_active = true
    `, [targetDate]);
    
    for (const deadline of deadlines) {
      // Find users whose goal matches this deadline
      const users = await findUsersForDeadline(deadline);
      
      for (const user of users) {
        await sendPushNotification({
          user_id: user.id,
          title: deadline.title,
          body: `Registration in ${daysBefore} days`,
          deep_link: deadline.official_url,
        });
        
        await sendEmail({
          to: user.email,
          subject: deadline.title,
          body: renderDeadlineEmail(deadline, daysBefore),
        });
      }
    }
  }
});
Auto-Recovery Job
typescriptcron.schedule('30 0 * * *', async () => {
  // Runs at 12:30 AM UTC (will execute multiple times across timezones)
  
  const currentHour = new Date().getUTCHours();
  
  // Find users whose local time = 12:30 AM right now
  const users = await db.query(`
    SELECT id, timezone 
    FROM users 
    WHERE subscription_tier = 'premium'
    AND extract(hour from (now() AT TIME ZONE timezone)) = 0
  `);
  
  for (const user of users) {
    // Check for missed tasks
    const missedTasks = await db.query(`
      SELECT * FROM tasks 
      WHERE roadmap_id IN (
        SELECT id FROM roadmaps WHERE goal_id IN (
          SELECT id FROM goals WHERE user_id = $1 AND status = 'active'
        )
      )
      AND scheduled_date < CURRENT_DATE
      AND status = 'pending'
    `, [user.id]);
    
    if (missedTasks.length === 0) continue;  // No recovery needed
    
    // Run recovery algorithm
    const recoveryPlan = await runAutoRecovery(user.id, missedTasks);
    
    // Auto-approve if redistribution is feasible
    if (recoveryPlan.strategy === 'redistribute') {
      await applyRecoveryPlan(recoveryPlan);
      
      // Notify user
      await sendPushNotification({
        user_id: user.id,
        title: 'Plan Updated',
        body: 'Your plan adapted—you're still on track',
        deep_link: `/recovery/${recoveryPlan.id}`,
      });
    }
  }
});

FCM Integration
Device Token Management
typescript// Client-side: Register device token on login
import { getMessaging, getToken } from 'firebase/messaging';

async function registerForNotifications() {
  const messaging = getMessaging();
  
  const token = await getToken(messaging, {
    vapidKey: process.env.FIREBASE_VAPID_KEY,
  });
  
  // Send token to backend
  await api.post('/api/notifications/register', { fcm_token: token });
}

// Backend: Store token
interface UserDevice {
  user_id: string;
  fcm_token: string;
  platform: 'web' | 'android';
  registered_at: timestamp;
}

// On registration:
await db.insert('user_devices', {
  user_id: req.user.id,
  fcm_token: req.body.fcm_token,
  platform: 'web',
});
Sending Notifications
typescriptimport admin from 'firebase-admin';

async function sendPushNotification(params: {
  user_id: string;
  title: string;
  body: string;
  deep_link?: string;
}) {
  // Fetch user's device tokens
  const devices = await db.query(
    'SELECT fcm_token FROM user_devices WHERE user_id = $1',
    [params.user_id]
  );
  
  if (devices.length === 0) {
    // User hasn't registered for push, send email instead
    await sendEmailFallback(params);
    return;
  }
  
  const message = {
    notification: {
      title: params.title,
      body: params.body,
    },
    data: {
      deep_link: params.deep_link || '/tasks/today',
    },
    tokens: devices.map(d => d.fcm_token),
  };
  
  const response = await admin.messaging().sendMulticast(message);
  
  // Handle failed tokens (device uninstalled, token expired)
  if (response.failureCount > 0) {
    const failedTokens = response.responses
      .map((resp, idx) => resp.success ? null : devices[idx].fcm_token)
      .filter(Boolean);
    
    // Remove invalid tokens
    await db.query(
      'DELETE FROM user_devices WHERE fcm_token = ANY($1)',
      [failedTokens]
    );
  }
}

Email Integration (SendGrid)
Setup

SendGrid Free Tier: 100 emails/day
Single verified sender: noreply@steerclear.com
Templates stored as HTML strings (no dynamic template IDs in V1)

Email Types
typescriptasync function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: params.to,
    from: 'noreply@steerclear.com',
    subject: params.subject,
    html: params.html,
  };
  
  try {
    await sgMail.send(msg);
  } catch (error) {
    // Log error but don't fail the request
    console.error('SendGrid error:', error);
    
    // Store failed email in retry queue (deferred to post-V1)
  }
}

// Payment confirmation email
function renderPaymentConfirmationEmail(user: User, payment: Payment) {
  return `
    <h2>Payment Confirmed</h2>
    <p>Hi ${user.email},</p>
    <p>Your payment of ₹${payment.amount / 100} has been confirmed.</p>
    <p>Premium access is now active until ${payment.premium_granted_until}.</p>
    <p>Start executing: <a href="https://app.steerclear.com">Open SteerClear</a></p>
  `;
}

// Deadline alert email
function renderDeadlineEmail(deadline: Deadline, daysBefore: number) {
  return `
    <h2>${deadline.title}</h2>
    <p>Registration opens in ${daysBefore} days.</p>
    <p>${deadline.description}</p>
    <p><a href="${deadline.official_url}">Register Here</a></p>
  `;
}

Security & Privacy
Authentication Security
JWT Token Strategy
typescript// Token generation (on login/register)
const token = jwt.sign(
  { user_id: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }  // 7-day expiry
);

// Token verification (middleware)
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}
Password Security
typescriptimport bcrypt from 'bcrypt';

// On registration
const passwordHash = await bcrypt.hash(password, 10);  // 10 salt rounds

// On login
const isValid = await bcrypt.compare(password, user.password_hash);
Rate Limiting
typescriptimport rateLimit from 'express-rate-limit';

// Login endpoint rate limit
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,  // 5 attempts per window
  message: 'Too many login attempts. Try again in 15 minutes.',
});

app.post('/api/auth/login', loginLimiter, loginHandler);

// API global rate limit
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 100,  // 100 requests per minute per IP
});

app.use('/api/', apiLimiter);

Payment Security
Webhook Signature Verification
typescriptimport crypto from 'crypto';

function verifyWebhookSignature(req) {
  const signature = req.headers['x-razorpay-signature'];
  const body = JSON.stringify(req.body);
  
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
  
  return signature === expectedSignature;
}

// In webhook handler
app.post('/api/payments/webhook', (req, res) => {
  if (!verifyWebhookSignature(req)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Process webhook...
});
Idempotency
typescript// Prevent duplicate payment processing
app.post('/api/payments/webhook', async (req, res) => {
  const paymentId = req.body.payload.payment.payment_id;
  
  // Check if already processed
  const existing = await db.query(
    'SELECT id FROM payments WHERE gateway_payment_id = $1',
    [paymentId]
  );
  
  if (existing.length > 0) {
    // Already processed, return success to avoid retries
    return res.status(200).json({ message: 'Already processed' });
  }
  
  // Process payment...
});
```

---

### Data Privacy

**User Data Retention**
```
Personal data stored:
  - Email address (required for auth)
  - Password hash (bcrypt, one-way)
  - Timezone (for scheduling)
  - Study preferences (subjects, daily hours)
  - Task completion history
  - Payment records

NOT stored:
  - Full name (not required)
  - Phone number (no SMS in V1)
  - Detailed device information
  - IP addresses (beyond server logs)
  - Third-party tracking cookies
Data Export (GDPR Compliance)
typescript// GET /api/user/export-data
app.get('/api/user/export-data', authenticateToken, async (req, res) => {
  const userId = req.user.user_id;
  
  const userData = {
    user: await db.findOne('users', { id: userId }),
    goals: await db.find('goals', { user_id: userId }),
    roadmaps: await db.find('roadmaps', { goal_id: '...' }),
    tasks: await db.find('tasks', { roadmap_id: '...' }),
    payments: await db.find('payments', { user_id: userId }),
  };
  
  // Sanitize (remove password_hash, etc.)
  delete userData.user.password_hash;
  
  res.json(userData);
});
Data Deletion
typescript// DELETE /api/user/account
app.delete('/api/user/account', authenticateToken, async (req, res) => {
  const userId = req.user.user_id;
  
  // Soft delete (mark as deleted, retain payment records for accounting)
  await db.transaction(async (trx) => {
    await trx.update('users', { id: userId }, { 
      email: `deleted_${userId}@deleted.com`,
      password_hash: null,
      deleted_at: new Date(),
    });
    
    // Cascade delete goals, roadmaps, tasks
    await trx.delete('goals', { user_id: userId });
    
    // Retain payment records (anonymized)
    await trx.update('payments', { user_id: userId }, {
      user_id: null,  // Anonymize
    });
  });
  
  res.status(200).json({ message: 'Account deleted' });
});

Error Handling & Logging
Error Response Structure
typescriptinterface ErrorResponse {
  error: {
    message: string;      // User-friendly message
    code: string;         // Machine-readable code
    details?: any;        // Additional context (dev mode only)
  }
}

// Example
res.status(400).json({
  error: {
    message: 'Target date must be in the future',
    code: 'INVALID_TARGET_DATE',
  }
});
Logging Strategy
typescript// Use pino for structured logging
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

// Log critical events
logger.info({ userId, action: 'roadmap_generated' }, 'Roadmap generated');
logger.error({ userId, error }, 'Payment webhook failed');

// In production:
// - Logs sent to stdout (Railway/Render captures)
// - Errors sent to Sentry
// - No PII in logs (user IDs only, no emails)
Sentry Integration
typescriptimport * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,  // 10% of transactions
});

// Capture exceptions
app.use(Sentry.Handlers.errorHandler());

// Manual error capture
try {
  await generateRoadmap(params);
} catch (error) {
  Sentry.captureException(error, {
    user: { id: userId },
    extra: { params },
  });
  throw error;
}

Deployment & Monitoring
Environment Configuration
Environment Variables
bash# Database
DATABASE_URL=postgresql://user:pass@host:5432/steerclear

# Auth
JWT_SECRET=random_256_bit_secret

# Payment
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# Notifications
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
SENDGRID_API_KEY=...

# Analytics
POSTHOG_API_KEY=...

# Error Tracking
SENTRY_DSN=...

# App
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://app.steerclear.com

Health Check Endpoint
typescriptapp.get('/api/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      database: 'unknown',
      notifications: 'unknown',
    }
  };
  
  // Check database
  try {
    await db.query('SELECT 1');
    health.checks.database = 'ok';
  } catch (error) {
    health.checks.database = 'error';
    health.status = 'degraded';
  }
  
  // Check FCM (simple connection test)
  try {
    await admin.messaging().send({ token: 'test' }, true);  // Dry run
    health.checks.notifications = 'ok';
  } catch (error) {
    if (error.code !== 'messaging/invalid-argument') {
      health.checks.notifications = 'error';
      health.status = 'degraded';
    }
  }
  
  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});

**Uptime Monitoring**

UptimeRobot pings /api/health every 5 minutes
Alerts sent to admin email if health check fails


Backup Strategy
Database Backups

Automated daily backups (included in Railway/Supabase free tier)
Retention: 7 days
Manual backup before major deployments: pg_dump

Code Backups

Git repository (GitHub/GitLab)
Tagged releases for each deployment


Testing Strategy (Minimal for V1)
Critical Path Testing Only
typescript// Test: Roadmap generation
describe('Roadmap Generation', () => {
  it('generates valid roadmap for UPSC 2026', async () => {
    const params = {
      goal_type: 'UPSC_2026_PRELIMS',
      target_date: '2026-06-01',
      current_level: 'beginner',
      daily_hours: 6,
    };
    
    const roadmap = await generateRoadmap(params);
    
    expect(roadmap.coverage_percentage).toBeGreaterThan(95);
    expect(roadmap.total_days).toBeLessThanOrEqual(365);
  });
});

// Test: Payment webhook
describe('Payment Webhook', () => {
  it('grants premium access on successful payment', async () => {
    const webhook = {
      event: 'payment.captured',
      payload: { /* ... */ },
    };
    
    await handleWebhook(webhook);
    
    const user = await db.findOne('users', { id: testUserId });
    expect(user.subscription_tier).toBe('premium');
  });
});

// Test: Auto-recovery
describe('Auto-Recovery', () => {
  it('redistributes missed tasks within capacity', async () => {
    // Setup: Create roadmap with missed tasks
    // Run: Auto-recovery algorithm
    // Assert: All high-priority tasks redistributed
  });
});
Manual Testing Checklist

 User can register and login
 Roadmap generation completes <5 seconds
 Today Mode shows correct task
 Task completion updates progress
 Payment flow completes successfully
 Notifications delivered within 5 minutes
 Auto-recovery runs at midnight
 Link reporting works


Document Approval & Next Steps
Version History

Version 1.0 | January 25, 2026 | Initial TRD

Approval Required From

Technical Lead: _____________
Product Lead: _____________

Implementation Phases
Phase 1: Foundation (Weeks 1-2)

Database schema setup
Auth system (register/login)
Basic API endpoints (users, goals)

Phase 2: Core Features (Weeks 3-5)

Roadmap generation algorithm
Task CRUD operations
Today Mode UI
Resource library

Phase 3: Premium Features (Weeks 6-7)

Payment integration (Razorpay)
Auto-recovery algorithm
Notification system (FCM + SendGrid)

Phase 4: Polish & Launch (Week 8)

Testing critical paths
Deployment to production
Monitoring setup
Beta user onboarding

End of Technical Requirements Document v1.0
