# CLAUDE.md — Samcheok Vocal Studio (삼척 성악 스튜디오)

This file is the **core guideline and memory** for this project.
All AI sessions MUST read this file before making any changes.

---

## 1. Project Overview

- **Project Name:** Samcheok Vocal Studio (삼척 성악 스튜디오)
- **Engine Base:** Gimpo Gugak Center (김포국악원) codebase — adapted & stripped down
- **Framework:** Next.js (App Router)
- **Database:** Supabase (PostgreSQL) — used **only for Blog posts**
- **Styling:** Tailwind CSS
- **Purpose:** Public website + hidden admin dashboard for a premium vocal studio in Samcheok

**Key Directories:**
- `app/` — App Router pages (intro, blog, admin, etc.)
- `components/` — Reusable UI (Navbar, etc.)
- `lib/` — Utilities (supabase, fonts, date-utils, changelog)

---

## 2. Navigation (STRICT — 5 Menus Only)

The public navigation MUST have **exactly** these 5 menus in this order:

| # | Label | Route |
|---|-------|-------|
| 1 | 소개 | `/intro` |
| 2 | 블로그 | `/blog` |
| 3 | 수업 | `/classes` |
| 4 | 활동 | `/activities` |
| 5 | 문의 | `/contact` |

**RULES:**
- There is **NO** login, logout, or auth-related UI in the public Navbar.
- No dropdown sub-menus.
- No member-only menus.

---

## 3. No Public User Authentication

- **All user login, registration, and user DB features have been COMPLETELY REMOVED.**
- No `profiles` table, no Supabase Auth for users, no member-only routes.
- Supabase is used **only** for blog post storage (`posts` table).
- The public site is fully anonymous.

---

## 4. Introduction Page (`/intro`)

- Clicking "소개" in the nav goes directly to `/intro`.
- `/intro` renders the **single-page profile of 박준열 (Park Jun-yeol)**.
- **No sub-menus, no sub-pages, no director page, no media page.**
- Content: bio, education, career, certifications, performance history.
- The `ProfilePhoto` component lives at `app/Park-Jun-Yeol/ProfilePhoto.tsx`.

---

## 5. Admin Authentication

### Mechanism
- **Type:** Password-based, stateless HTTP-only cookie
- **No Supabase Auth** — completely independent of Supabase
- Required env vars in `.env.local`:
  - `ADMIN_PASSWORD` — the secret admin password
  - `ADMIN_SECRET` — a random string used as the session cookie value

### Flow
1. User visits `/admin` → middleware checks `admin_session` cookie
2. Cookie missing or invalid → redirect to `/admin/login`
3. `/admin/login` shows a password form
4. Form POSTs to `/api/admin-login`
5. Server compares password to `ADMIN_PASSWORD`
6. Match → set HTTP-only cookie `admin_session=<ADMIN_SECRET>` → redirect `/admin`
7. Logout → clears the cookie → redirect `/`

### Protected Routes
- **Admin-only** (cookie required): `/admin/*`
- **Public** (no cookie needed): `/admin/login`

---

## 6. Blog System

### Public Blog (`/blog`)
- **Read-only** for all visitors.
- Simplified UI: Title (left) | Dotted border | Date `YY.MM.DD` (right).
- No thumbnails, no content snippets.
- Uses SSG/ISR: `export const revalidate = 60`

### Admin Blog Management (`/admin/posts`)
- Full CRUD via React-Quill editor.
- Posts stored in Supabase `posts` table.
- Only accessible with valid `admin_session` cookie.

---

## 7. Strict Performance & SEO Rules (CRITICAL)

### Fonts
- **NEVER** use `@import` for heavy web fonts in `globals.css`.
- **ONLY** use `next/font/google` for global fonts (Noto Sans KR, Noto Serif KR).
- Heavy fonts (Gowun Dodum, Nanum Myeongjo) — imported **only** where needed.

### React-Quill & Lazy Loading
- `React-Quill` and `quill.snow.css` **MUST** be lazy-loaded via `next/dynamic` with `ssr: false`.
- **Global import** of `quill.snow.css` in `layout.tsx` or `globals.css` is **strictly forbidden**.

### Rendering & Caching
- Public blog list: `export const revalidate = 60` + `export const dynamic = "force-static"`
- Admin pages: `export const dynamic = "force-dynamic"`

### LCP
- Main hero image **MUST** use the `priority` attribute.

### Viewport & Accessibility
- Do **NOT** set `userScalable: false` or `maximumScale: 1`.

### CSS Inlining
- `next.config.ts` must have `experimental.inlineCss: true`.

---

## 8. Editor (React-Quill) Conventions

### Blog Detail Viewer
- Tailwind `prose` class is **banned** — use Quill native viewer classes:
  ```tsx
  <div className="ql-snow">
    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.content }}
      style={{ padding: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }} />
  </div>
  ```

### Font Sizes
- Use explicit pixel values (10px–36px) via inline styles.
- SizeStyle attributor registered with whitelist.

### Custom Fonts in Editor
- Fonts scoped locally; whitelist: `['gowunDodum', 'nanumMyeongjo']`

---

## 9. Database (Supabase)

Only the `posts` table is used. No user-related tables.

- `posts` — Blog post records (id, title, content, slug, category, thumbnail_url, external_url, meta_title, meta_description, meta_keywords, views, published_at, created_at, updated_at)

**Supabase Clients:**
- `lib/supabase/client.ts` — Browser (Client Components)
- `lib/supabase/server.ts` — Server (Server Components, Route Handlers)

---

## 10. Commands & Environment

```bash
npm run dev       # Development server (Turbopack)
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint
ANALYZE=true npm run build  # Bundle analysis
```

**Environment variables** (`.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — for admin blog writes
- `ADMIN_PASSWORD` — admin login password
- `ADMIN_SECRET` — random token used as session cookie value

---

## 11. Version & Changelog

- Version and changelog live in `lib/changelog.ts`.
- All `changes` entries must be in **Korean**.
- Increment version for each significant change.
- Current version: **v1.10**

---

## 12. Changelog / Version History

| Version | Date | Summary |
|---------|------|---------|
| v1.10 | 2026-03-09 | 활동 페이지 masonry 갤러리(columns-2/3, 자연 비율 이미지), SEO alt '제목|연도|설명' 파이프 형식, overflow-hidden 호버 클리핑, force-dynamic·revalidatePath 버그 수정 통합 |
| v1.07 | 2026-03-09 | activities 테이블 SQL, 활동 페이지 DB 연동, 활동 관리 어드민, 이미지 WebP 업로드 파이프라인 |
| v1.06 | 2026-03-09 | 홈페이지 텍스트 전체 중앙 정렬, 글로벌 Footer 완전 제거 |
| v1.05 | 2026-03-09 | 홈페이지 김포국악원 1:1 구조로 재설계, HomeBadges·HomeConnect 컴포넌트 신설, 개인정보처리방침 페이지 추가, 어드민 Analytics 제외 |
| v1.04 | 2026-03-09 | Vercel Analytics 추가, /admin/system 시스템·버전 로그 페이지 신설, 홈페이지 타이포그래피 중심 UI로 재설계 |
| v1.03 | 2026-03-09 | 새 Supabase 프로젝트 마이그레이션: posts 테이블·RLS·updated_at 설정, public-media 버킷 자동 생성, 패키지 업데이트, auth-ui 제거, next.config.ts 호스트명 수정 |
| v1.02 | 2026-03-08 | 코드베이스 대규모 정리: 김포국악원 잔여 라우트·컴포넌트·공개 파일 완전 제거, 블로그 카테고리 스튜디오 중심으로 교체, 메타데이터 하마 보컬 스튜디오로 전면 교체 |
| v1.01 | 2026-03-08 | 삼척 성악 스튜디오 초기 셋업: 5개 공개 메뉴 정리, 사용자 인증 완전 제거, 소개 페이지 박준열 단독 프로필로 전환, 관리자 인증을 패스워드+쿠키 방식으로 교체 |
| v1.00 | 2026-03-08 | 김포국악원 엔진 기반으로 삼척 성악 스튜디오 프로젝트 시작 |
