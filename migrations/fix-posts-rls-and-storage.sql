-- Migration: Fix RLS for posts INSERT and Storage policies
-- Run this in Supabase SQL Editor
-- Solves "Save error: {}" / Permission denied

-- ============================================
-- 1. POSTS TABLE: Explicit INSERT/UPDATE/DELETE for admins
-- ============================================

DROP POLICY IF EXISTS "Admins can manage posts" ON posts;
DROP POLICY IF EXISTS "Enable insert for admins only" ON posts;
DROP POLICY IF EXISTS "Enable update for admins only" ON posts;
DROP POLICY IF EXISTS "Enable delete for admins only" ON posts;

CREATE POLICY "Enable insert for admins only"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Enable update for admins only"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

CREATE POLICY "Enable delete for admins only"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- ============================================
-- 2. STORAGE: public-media bucket policies
-- ============================================
-- Ensure bucket exists first (create via Dashboard if not).
-- These policies allow:
-- - Public SELECT (anyone can view images)
-- - Authenticated INSERT (logged-in users can upload)

-- Public read for public-media bucket
DROP POLICY IF EXISTS "Public read for public-media" ON storage.objects;
CREATE POLICY "Public read for public-media"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'public-media');

-- Authenticated users can upload to public-media
DROP POLICY IF EXISTS "Authenticated upload to public-media" ON storage.objects;
CREATE POLICY "Authenticated upload to public-media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'public-media');
