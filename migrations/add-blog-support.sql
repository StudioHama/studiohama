-- Migration: Add blog/news support to posts table
-- Run this in Supabase SQL Editor if you already have the posts table

-- 1. Add columns
ALTER TABLE posts ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS external_url TEXT;

-- 2. Allow public read for news posts (소식, 언론보도, 공지사항)
DROP POLICY IF EXISTS "Public can view blog posts" ON posts;
CREATE POLICY "Public can view blog posts"
  ON posts
  FOR SELECT
  USING (category IN ('소식', '언론보도', '공지사항'));
