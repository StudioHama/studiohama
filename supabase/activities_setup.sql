-- ============================================================
-- Samcheok Vocal Studio — Activities Table Setup
-- Run this in Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1. activities table
CREATE TABLE IF NOT EXISTS public.activities (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  year        text        NOT NULL,
  title       text        NOT NULL,
  description text,
  category    text        NOT NULL DEFAULT '공연',
  image_url   text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- 2. Auto-update updated_at on row modification
-- (Reuse set_updated_at() if already created by setup.sql, or create it)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_activities_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_activities_created_at
  ON public.activities (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activities_category
  ON public.activities (category);

-- 4. Row Level Security
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Public: read all activities (no filter — all entries are public)
CREATE POLICY "Public read activities"
  ON public.activities
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- service_role bypasses RLS by default.
-- All writes (INSERT / UPDATE / DELETE) are done via service_role
-- in the /api/admin/activities route handler — no extra write policy needed.

-- ============================================================
-- STORAGE: No additional storage policy needed.
-- Image uploads for activities go through /api/admin/activities/upload
-- which uses SUPABASE_SERVICE_ROLE_KEY server-side.
-- Make sure the 'public-media' bucket exists (created by setup-db.mjs).
-- ============================================================
