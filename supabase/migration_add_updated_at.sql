-- ============================================================
-- Migration: Add updated_at to posts table
-- Run this if the posts table was created WITHOUT updated_at
-- (i.e., you used the original setup.sql before 2026-03-09)
-- ============================================================

ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

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
