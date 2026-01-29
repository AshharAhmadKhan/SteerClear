-- SteerClear Database Schema
-- PostgreSQL 16+
-- Created: January 2026

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Trial & Subscription
    subscription_tier VARCHAR(20) DEFAULT 'trial' CHECK (subscription_tier IN ('trial', 'premium', 'expired')),
    trial_end_date TIMESTAMP NOT NULL,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast email lookup (login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Index for trial expiry checks
CREATE INDEX IF NOT EXISTS idx_users_trial_end ON users(trial_end_date) WHERE subscription_tier = 'trial';

-- ============================================
-- ROADMAPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Roadmap Configuration
    exam_type VARCHAR(50) NOT NULL DEFAULT 'UPSC_CSE_PRELIMS',
    target_date DATE NOT NULL,
    daily_hours INTEGER NOT NULL CHECK (daily_hours BETWEEN 1 AND 10),
    level VARCHAR(20) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    
    -- Metadata
    generated_at TIMESTAMP DEFAULT NOW(),
    
    -- Ensure one roadmap per user (for MVP)
    CONSTRAINT one_roadmap_per_user UNIQUE (user_id)
);

-- Index for fetching user's roadmap
CREATE INDEX IF NOT EXISTS idx_roadmaps_user_id ON roadmaps(user_id);

-- ============================================
-- TASKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roadmap_id UUID NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
    
    -- Task Definition
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_date DATE NOT NULL,
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    
    -- Task Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped')),
    
    -- Completion Tracking
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index for fetching today's tasks (most common query)
CREATE INDEX IF NOT EXISTS idx_tasks_roadmap_date ON tasks(roadmap_id, scheduled_date);

-- Index for fetching tasks by status (for auto-recovery)
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(roadmap_id, status);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp for users
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================
-- Uncomment this section if you want a test user

-- INSERT INTO users (email, password_hash, trial_end_date) VALUES
-- ('test@steerclear.com', '$2b$10$test_hash_here', NOW() + INTERVAL '5 days')
-- ON CONFLICT (email) DO NOTHING;