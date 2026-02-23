-- Slug 컬럼 추가: SEO 친화적 URL 경로 (예: /blog/minyo-bawoogi)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS slug TEXT;
