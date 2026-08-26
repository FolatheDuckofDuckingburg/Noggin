# Supabase & Database Configuration Guide

This document provides instructions for initializing and connecting the Supabase PostgreSQL database for Noggin.

## 1. Database Setup

1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Create a new project or select an existing one.
3. Open the **SQL Editor** in the Supabase Dashboard.
4. Copy the SQL commands from `supabase/schema.sql` and execute them.

This creates the following tables with Row Level Security (RLS) enabled:
- `public.students`
- `public.performance_logs`
- `public.lesson_completions`
- `public.badges`

## 2. Environment Variables

Create a `.env` file in the project root directory (refer to `.env.example`):

```env
VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 3. Schema Architecture (`performance_logs`)

The `performance_logs` table stores real-time cognitive and telemetry state:
- `write_back_gap_ms`: Behavioral latency gap (target < 32ms)
- `behavioral_efficiency`: NFOT efficiency decay metric
- `accuracy_rate` & `response_time_ms`: Question interaction speed and accuracy
- `theta_power`, `beta_power`, `alpha_power`, `gamma_power`: Real-time brainwave spectrum powers (EEG/telemetry)
- `sensory_nudge_triggered`: Boolean indicating re-engagement or sensory ease triggers
