-- ============================================================================
-- NOGGIN SUPABASE / POSTGRESQL PRODUCTION SCHEMA
-- Supports Adaptive Engine, Telemetry Logging, and Noggimigo AI Performance
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Students Table
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    reading_level TEXT DEFAULT 'Level-2-Standard', -- 'Level-1-Foundational', 'Level-2-Standard', 'Level-3-Advanced'
    neurodivergent_profile TEXT DEFAULT 'General',  -- 'ADHD', 'Dyslexia', 'Dyscalculia', 'Autism', 'Processing Difficulties'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Performance Logs Table (Adaptive Telemetry & AI Baseline Tracking)
CREATE TABLE IF NOT EXISTS public.performance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    session_id TEXT,
    subject TEXT NOT NULL,
    difficulty_level TEXT NOT NULL,
    write_back_gap_ms NUMERIC(8, 2) DEFAULT 32.00,
    behavioral_efficiency NUMERIC(5, 4) DEFAULT 1.0000,
    response_time_ms INT,
    accuracy_rate NUMERIC(5, 2),
    error_pattern TEXT,
    theta_power NUMERIC(8, 4),
    beta_power NUMERIC(8, 4),
    alpha_power NUMERIC(8, 4),
    gamma_power NUMERIC(8, 4),
    sensory_nudge_triggered BOOLEAN DEFAULT FALSE,
    action_taken TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Lesson Completions Table
CREATE TABLE IF NOT EXISTS public.lesson_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    lesson_title TEXT NOT NULL,
    subject TEXT NOT NULL,
    score INT NOT NULL,
    xp_earned INT DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Badges Table
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    badge_key TEXT NOT NULL,
    label TEXT NOT NULL,
    points_awarded INT DEFAULT 0,
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance & quick queries
CREATE INDEX IF NOT EXISTS idx_performance_logs_student_id ON public.performance_logs(student_id);
CREATE INDEX IF NOT EXISTS idx_performance_logs_created_at ON public.performance_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_student_id ON public.lesson_completions(student_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Basic Security Policies
CREATE POLICY "Allow individual student read/write" ON public.students
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Allow individual performance logs read/write" ON public.performance_logs
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.students WHERE id = student_id));

CREATE POLICY "Allow individual lesson completions read/write" ON public.lesson_completions
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.students WHERE id = student_id));

CREATE POLICY "Allow individual badges read/write" ON public.badges
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.students WHERE id = student_id));
