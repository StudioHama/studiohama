-- ============================================================
-- Samcheok Vocal Studio — Database Setup
-- Run this ONCE in Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1. posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text        NOT NULL,
  content          text        NOT NULL DEFAULT '',
  slug             text        UNIQUE,
  category         text        NOT NULL DEFAULT '스튜디오소식',
  thumbnail_url    text,
  external_url     text,
  meta_title       text,
  meta_description text,
  meta_keywords    text,
  views            integer     NOT NULL DEFAULT 0,
  published_at     timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- 2. Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_posts_published_at
  ON public.posts (published_at DESC);

CREATE INDEX IF NOT EXISTS idx_posts_slug
  ON public.posts (slug)
  WHERE slug IS NOT NULL;

-- 4. Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Anon/authenticated: read published posts only
CREATE POLICY "Public read published posts"
  ON public.posts
  FOR SELECT
  TO anon, authenticated
  USING (published_at IS NOT NULL AND published_at <= now());

-- service_role bypasses RLS by default — no extra policy needed for admin writes.

-- ============================================================
-- If the table was already created WITHOUT updated_at, run
-- this migration block separately:
--
--   ALTER TABLE public.posts
--     ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
--
--   CREATE OR REPLACE FUNCTION public.set_updated_at() ...  (same as above)
--   CREATE OR REPLACE TRIGGER trg_posts_updated_at ...      (same as above)
--
-- ============================================================

-- ============================================================
-- Storage bucket "public-media" is created automatically by
-- running: node setup-db.mjs
-- If skipped, create manually in Supabase Dashboard > Storage:
--   Name: public-media   |   Public: YES
-- ============================================================
