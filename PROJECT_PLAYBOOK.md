# PROJECT PLAYBOOK — 삼척 성악 스튜디오 (Samcheok Vocal Studio)

> Last updated: 2026-03-09
> Current version: **v1.06**

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Tech Stack & Versions](#2-tech-stack--versions)
3. [Directory Structure](#3-directory-structure)
4. [Environment Variables](#4-environment-variables)
5. [Database Schema](#5-database-schema)
6. [Storage (Supabase)](#6-storage-supabase)
7. [Authentication — Admin Only](#7-authentication--admin-only)
8. [Public Navigation (5 Menus)](#8-public-navigation-5-menus)
9. [Key Pages & Routes](#9-key-pages--routes)
10. [API Routes](#10-api-routes)
11. [Supabase Client Usage](#11-supabase-client-usage)
12. [Blog System](#12-blog-system)
13. [Editor (React-Quill) Conventions](#13-editor-react-quill-conventions)
14. [Performance & SEO Rules](#14-performance--seo-rules)
15. [New Supabase Project Setup](#15-new-supabase-project-setup)
16. [Dev Commands](#16-dev-commands)
17. [Intentionally Pinned Dependencies](#17-intentionally-pinned-dependencies)
18. [Changelog](#18-changelog)

---

## 1. Project Identity

| Field | Value |
|-------|-------|
| **Project name** | 삼척 성악 스튜디오 (Samcheok Vocal Studio) |
| **Brand name** | 하마 보컬 스튜디오 |
| **Studio owner** | 박준열 (Park Jun-yeol) |
| **package.json name** | `samcheok-vocal` |
| **Engine origin** | Gimpo Gugak Center codebase — stripped & repurposed |
| **Domain** | `https://hama-vocal.com` (set via `NEXT_PUBLIC_SITE_URL`) |
| **Supabase project ref** | `uastagwjudzjqgvngsdl` |
| **Supabase URL** | `https://uastagwjudzjqgvngsdl.supabase.co` |

---

## 2. Tech Stack & Versions

| Package | Version | Notes |
|---------|---------|-------|
| `next` | ^16.1.6 | App Router, Turbopack dev |
| `react` / `react-dom` | ^18.3.1 | **Pinned at 18** — react-quill-new compat |
| `typescript` | ^5 | |
| `tailwindcss` | ^3.4.x | **Pinned at v3** — v4 is a full rewrite |
| `@supabase/supabase-js` | ^2.98.0 | |
| `@supabase/ssr` | ^0.9.0 | SSR cookie helpers |
| `framer-motion` | ^12.x | Animations |
| `lucide-react` | ^0.577.0 | Icons |
| `react-quill-new` | ^3.8.3 | Rich-text editor (admin only) |
| `quill-resize-module` | ^2.1.3 | Image resize in Quill |
| `quill-html-edit-button` | ^3.0.0 | HTML source view in Quill |
| `html-react-parser` | ^5.2.17 | |
| `react-intersection-observer` | ^10.0.3 | |
| `@next/bundle-analyzer` | ^16.1.6 | `ANALYZE=true npm run build` |
| `@next/third-parties` | ^16.1.6 | Google Analytics wrapper |
| `@vercel/analytics` | ^1.6.1 | |
| `@vercel/speed-insights` | ^1.3.1 | |
| `eslint` | ^9.x | **Pinned at 9** — eslint-config-next peer compat |
| `eslint-config-next` | ^16.1.6 | |

---

## 3. Directory Structure

```
samcheok/
├── app/
│   ├── layout.tsx               # Root layout: fonts, Navbar, Footer, JSON-LD
│   ├── page.tsx                 # Home page (/)
│   ├── intro/
│   │   ├── page.tsx             # /intro — 박준열 profile (single page, no sub-menus)
│   │   └── ProfilePhoto.tsx     # Profile photo component
│   ├── blog/
│   │   ├── page.tsx             # /blog — ISR list (revalidate: 60)
│   │   ├── loading.tsx          # Suspense skeleton
│   │   └── [id]/page.tsx        # /blog/[slug-or-id] — post detail
│   ├── classes/
│   │   ├── page.tsx             # /classes
│   │   └── loading.tsx
│   ├── activities/
│   │   ├── page.tsx             # /activities
│   │   └── loading.tsx
│   ├── contact/page.tsx         # /contact
│   ├── admin/
│   │   ├── layout.tsx           # Admin shell layout
│   │   ├── page.tsx             # /admin — dashboard (version + blog link)
│   │   ├── login/page.tsx       # /admin/login — password form (public)
│   │   └── posts/manage/
│   │       ├── page.tsx         # /admin/posts/manage — CRUD list
│   │       ├── new/page.tsx     # New post
│   │       └── edit/[id]/page.tsx  # Edit post
│   ├── api/
│   │   ├── admin-login/route.ts # POST — validates password, sets cookie
│   │   └── admin-logout/route.ts # POST — clears cookie
│   └── sitemap.ts               # Auto-generated XML sitemap
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Public nav (5 menus, no auth UI)
│   │   └── Footer.tsx
│   ├── PostEditor.tsx           # React-Quill admin editor (lazy-loaded)
│   ├── BlogListClient.tsx       # Client-side blog list with category filter
│   ├── BlogContent.tsx          # Blog post HTML renderer (ql-snow / ql-editor)
│   ├── AnalyticsSpeedInsights.tsx
│   └── GoogleAnalyticsWrapper.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # Browser client (Client Components)
│   │   ├── server.ts            # SSR client (Server Components, Route Handlers)
│   │   └── build.ts             # Build-time client (generateStaticParams, no cookies())
│   ├── changelog.ts             # Version history (Korean entries required)
│   ├── blog-utils.ts            # getBlogPostPath(slug, id)
│   ├── date-utils.ts            # formatDateKST, formatDateTimeKST, toDatetimeLocalKST
│   ├── fonts.ts                 # Font CSS variable helpers
│   ├── html-utils.ts            # stripHtml, sanitizeHtml
│   ├── storage-cleanup.ts       # Delete images from public-media on post delete
│   └── upload-image.ts          # uploadBlogImage, normalizeImage
├── supabase/
│   ├── setup.sql                # Full DB setup — run once in Supabase SQL editor
│   └── migration_add_updated_at.sql  # Migration if table was created without updated_at
├── middleware.ts                 # Cookie-based admin guard (/admin/* except /admin/login)
├── next.config.ts               # Next.js config (inlineCss, image remotePatterns)
├── setup-db.mjs                 # node setup-db.mjs — auto-creates storage bucket
└── .env.local                   # Secret env vars (NEVER commit to git)
```

---

## 4. Environment Variables

All variables live in `.env.local` (never commit to git).

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Public anon key (safe to expose in browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Service role key — **server-side only**, bypasses RLS |
| `ADMIN_PASSWORD` | ✅ | Admin login password (validated in `/api/admin-login`) |
| `ADMIN_SECRET` | ✅ | Random token stored as `admin_session` cookie value |
| `NEXT_PUBLIC_SITE_URL` | optional | Production domain. Defaults to `https://hama-vocal.com` |

> **Security:** `SUPABASE_SERVICE_ROLE_KEY` must **never** be exposed to the browser.
> It is only used in Server Components and Route Handlers.

---

## 5. Database Schema

Only one table is used: `public.posts`.

```sql
CREATE TABLE public.posts (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text        NOT NULL,
  content          text        NOT NULL DEFAULT '',      -- Quill HTML
  slug             text        UNIQUE,                   -- URL slug (nullable)
  category         text        NOT NULL DEFAULT '스튜디오소식',
  thumbnail_url    text,                                 -- public-media bucket URL
  external_url     text,                                 -- optional external link
  meta_title       text,                                 -- SEO title override
  meta_description text,                                 -- SEO description override
  meta_keywords    text,                                 -- SEO keywords override
  views            integer     NOT NULL DEFAULT 0,
  published_at     timestamptz,                          -- NULL=draft, future=scheduled
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()    -- auto-updated by trigger
);
```

### Indexes

| Name | Column | Purpose |
|------|--------|---------|
| `idx_posts_published_at` | `published_at DESC` | Fast published-list queries |
| `idx_posts_slug` | `slug` WHERE slug IS NOT NULL | Fast slug lookups |

### updated_at auto-trigger

```sql
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
```

### Row Level Security (RLS)

| Policy | Roles | Op | Condition |
|--------|-------|----|-----------|
| `Public read published posts` | anon, authenticated | SELECT | `published_at IS NOT NULL AND published_at <= now()` |
| *(implicit bypass)* | service_role | ALL | Bypasses RLS — used for admin CRUD |

### Post states

| `published_at` | State |
|----------------|-------|
| `NULL` | Draft — invisible to public |
| Future timestamp | Scheduled — invisible until that time |
| Past/present timestamp | Published — visible to public |

### Blog categories (current)

`성악` · `보컬` · `민요` · `공연`

*(defined in `components/PostEditor.tsx` as `BLOG_CATEGORIES`)*

---

## 6. Storage (Supabase)

| Bucket | Public | Allowed MIME types | Max file size |
|--------|--------|--------------------|---------------|
| `public-media` | ✅ Yes | image/jpeg, image/png, image/webp, image/gif, image/svg+xml | 10 MB |

**URL format:**
```
https://uastagwjudzjqgvngsdl.supabase.co/storage/v1/object/public/public-media/{path}
```

**Path conventions:**
- Blog content images: `blog-content/{filename}`
- Thumbnails: `blog-thumbnails/{filename}`

**Image cleanup on post delete:** `lib/storage-cleanup.ts` → `deletePostStorageFiles(supabase, thumbnailUrl, content)`

---

## 7. Authentication — Admin Only

### Mechanism
- Stateless, password-based, HTTP-only cookie
- No Supabase Auth — completely independent

### Cookie spec

| Property | Value |
|----------|-------|
| Name | `admin_session` |
| Value | `ADMIN_SECRET` env var |
| HttpOnly | `true` |
| Secure | `true` (production only) |
| SameSite | `strict` |
| MaxAge | 7 days (604800 s) |

### Login flow
```
/admin → middleware checks "admin_session" cookie
  ├── Valid (matches ADMIN_SECRET) → proceed
  └── Missing / invalid → redirect to /admin/login

POST /api/admin-login { password }
  ├── Matches ADMIN_PASSWORD → set cookie → redirect /admin
  └── Wrong → 401 { error: "비밀번호가 올바르지 않습니다." }
```

### Logout flow
```
POST /api/admin-logout → set cookie maxAge=0 → 200 { ok: true }
```

### Middleware (`middleware.ts`)
```ts
// Protects: /admin/*
// Exempts:  /admin/login
// matcher: ["/admin/:path*"]
```

---

## 8. Public Navigation (5 Menus)

**STRICT — do not add/remove/reorder without updating CLAUDE.md**

| # | Label | Route |
|---|-------|-------|
| 1 | 소개 | `/intro` |
| 2 | 블로그 | `/blog` |
| 3 | 수업 | `/classes` |
| 4 | 활동 | `/activities` |
| 5 | 문의 | `/contact` |

Rules:
- **No auth UI** (login/logout/member) in the public Navbar
- No dropdowns, no sub-menus
- No member-only menus

---

## 9. Key Pages & Routes

| Route | File | Rendering | Notes |
|-------|------|-----------|-------|
| `/` | `app/page.tsx` | Server | Home |
| `/intro` | `app/intro/page.tsx` | Server | 박준열 profile — no sub-menus |
| `/blog` | `app/blog/page.tsx` | ISR (revalidate 60, force-static) | Post list |
| `/blog/[id]` | `app/blog/[id]/page.tsx` | ISR (revalidate 60) | Detail — slug or UUID |
| `/classes` | `app/classes/page.tsx` | Server | |
| `/activities` | `app/activities/page.tsx` | Server | |
| `/contact` | `app/contact/page.tsx` | Server | |
| `/admin` | `app/admin/page.tsx` | force-dynamic | Dashboard |
| `/admin/login` | `app/admin/login/page.tsx` | force-dynamic | Public — no cookie needed |
| `/admin/posts/manage` | `app/admin/posts/manage/page.tsx` | force-dynamic | CRUD list |
| `/admin/posts/manage/new` | `app/admin/posts/manage/new/page.tsx` | force-dynamic | |
| `/admin/posts/manage/edit/[id]` | `…/edit/[id]/page.tsx` | force-dynamic | |

---

## 10. API Routes

### `POST /api/admin-login`
```json
// Request body
{ "password": "your-password" }

// Success 200
{ "ok": true }   + sets admin_session cookie

// Failure 401
{ "error": "비밀번호가 올바르지 않습니다." }
```

### `POST /api/admin-logout`
```json
// Success 200
{ "ok": true }   + clears admin_session cookie (maxAge: 0)
```

---

## 11. Supabase Client Usage

| File | When to use |
|------|-------------|
| `lib/supabase/client.ts` | Client Components (`"use client"`) |
| `lib/supabase/server.ts` | Server Components, Route Handlers (uses Next.js `cookies()`) |
| `lib/supabase/build.ts` | `generateStaticParams`, build-time queries (no request context) |

**`lib/supabase/server.ts`** uses `createServerClient` from `@supabase/ssr` which auto-reads/writes cookies.

**`lib/supabase/build.ts`** uses bare `createClient` from `@supabase/supabase-js` (no cookie dependency — safe in `generateStaticParams` and `next build`).

---

## 12. Blog System

### Public list (`/blog`)
- `revalidate = 60`, `force-static`
- Columns: `id, slug, title, external_url, created_at, published_at, category`
- Filter: `published_at <= now()`
- Sort: `published_at DESC`
- UI: Title (left) | dotted border | date (right) — no thumbnails, no snippets

### Post detail (`/blog/[id]`)
- Resolves param as `slug` first, then falls back to `id` (UUID)
- URL helper: `getBlogPostPath(slug | null, id)` — uses slug when available
- Columns: `id, title, content, slug, created_at, published_at, thumbnail_url, meta_title, meta_description, meta_keywords, category`
- Includes prev/next navigation

### Admin CRUD (`/admin/posts/manage`)
- List with search (title/content) + pagination (10/15/30/50/100 per page)
- Scheduled posts shown with amber badge + timestamp
- Deletion removes associated storage files via `deletePostStorageFiles`
- Editor: React-Quill with image upload to `public-media/blog-content/`

---

## 13. Editor (React-Quill) Conventions

### MANDATORY: Lazy loading
```tsx
// In PostEditor.tsx
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
```
`quill.snow.css` imported only in:
- `app/blog/[id]/page.tsx` (detail page viewer)
- `components/PostEditor.tsx` (via dynamic import chain)

**NEVER** import `quill.snow.css` in `globals.css` or `app/layout.tsx`.

### MANDATORY: Blog content viewer
```tsx
<div className="ql-snow">
  <div
    className="ql-editor"
    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
    style={{ padding: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
  />
</div>
```
`prose` Tailwind class is **banned** for blog content rendering.

### Font sizes (whitelist)
`10px 12px 14px 16px 18px 20px 24px 28px 32px 36px`

### Custom fonts (whitelist)
`gowunDodum` · `nanumMyeongjo`

---

## 14. Performance & SEO Rules

| Rule | Implementation |
|------|---------------|
| Fonts via `next/font/google` only | No `@import` in any CSS file |
| Heavy fonts (`preload: false`) | Gowun Dodum, Nanum Myeongjo — loaded but not preloaded |
| Hero image `priority` | Must be set on the main above-fold image (LCP) |
| Viewport | Never `userScalable: false` or `maximumScale: 1` |
| CSS inlining | `experimental.inlineCss: true` in `next.config.ts` |
| Package imports | `optimizePackageImports: ['lucide-react', 'date-fns']` |
| Admin pages | `export const dynamic = "force-dynamic"` |
| Public blog list | `export const revalidate = 60` + `export const dynamic = "force-static"` |
| Bundle analysis | `ANALYZE=true npm run build` |

---

## 15. New Supabase Project Setup

Run this checklist every time you migrate to a new Supabase project.

### Step 1 — Update `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=https://<new-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<new-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<new-service-role-key>
```

### Step 2 — Update `next.config.ts`
Change the `hostname` in `images.remotePatterns` to the new project ref.

### Step 3 — Auto-create storage bucket
```bash
node setup-db.mjs
```
Creates `public-media` (public, 10 MB limit, image types).

### Step 4 — Create posts table (manual, one-time)
1. Open **Supabase Dashboard → SQL Editor → New query**
2. Paste full contents of `supabase/setup.sql`
3. Click **Run**

### Step 5 — If table was already created without `updated_at`
Run `supabase/migration_add_updated_at.sql` in the SQL editor.

### Step 6 — Verify
```bash
node setup-db.mjs
# Expected: ✅ Storage bucket "public-media" already exists
#           ✅ Table "posts" already exists.
#           🎉  Database is fully set up and ready for production!
```

---

## 16. Dev Commands

```bash
npm run dev                   # Dev server (Turbopack)
npm run build                 # Production build
npm run start                 # Production server
npm run lint                  # ESLint check

ANALYZE=true npm run build    # Bundle size analysis

node setup-db.mjs             # Create storage bucket + verify posts table
```

---

## 17. Intentionally Pinned Dependencies

**Do NOT upgrade these without a full migration plan.**

| Package | Pinned at | Latest | Reason |
|---------|-----------|--------|--------|
| `react` / `react-dom` | 18.x | 19.x | `react-quill-new` is not React 19 compatible |
| `@types/react` / `@types/react-dom` | 18.x | 19.x | Must match React 18 |
| `tailwindcss` | 3.x | 4.x | v4 uses a completely different config format — upgrading breaks all CSS |
| `eslint` | 9.x | 10.x | `eslint-config-next` plugins (`typescript-eslint`, `eslint-plugin-react`, etc.) declare peer `eslint ^8 \|\| ^9` — ESLint 10 causes unresolvable peer conflicts |

---

## 18. Changelog

| Version | Date | Summary |
|---------|------|---------|
| v1.03 | 2026-03-09 | 새 Supabase 프로젝트 마이그레이션 완료: posts 테이블·RLS·인덱스·updated_at 컬럼·트리거 설정, public-media 스토리지 버킷 자동 생성. 패키지 업데이트: @supabase/supabase-js 2.98, @supabase/ssr 0.9, framer-motion 12, lucide-react 0.577, postcss 8.5.8, quill-resize-module 2.1.3. ESLint 9로 다운그레이드(peer 호환 복원). 미사용 auth-ui 패키지 2종 제거. next.config.ts 이미지 호스트명 수정. package.json name "samcheok-vocal"로 변경. PROJECT_PLAYBOOK.md 전면 재작성. |
| v1.02 | 2026-03-08 | 코드베이스 대규모 정리: 김포국악원 잔여 라우트·컴포넌트·공개 파일 완전 제거, 블로그 카테고리 스튜디오 중심으로 교체, 메타데이터 하마 보컬 스튜디오로 전면 교체 |
| v1.01 | 2026-03-08 | 삼척 성악 스튜디오 초기 셋업: 5개 공개 메뉴 정리, 사용자 인증 완전 제거, 소개 페이지 박준열 단독 프로필로 전환, 관리자 인증을 패스워드+쿠키 방식으로 교체 |
| v1.00 | 2026-03-08 | 김포국악원 엔진 기반으로 삼척 성악 스튜디오 프로젝트 시작 |
