-- Scheduled Publishing: published_at 컬럼 추가
-- 기존 게시글은 DEFAULT NOW()로 즉시 공개 상태 유지

ALTER TABLE posts ADD COLUMN published_at TIMESTAMPTZ DEFAULT NOW();
