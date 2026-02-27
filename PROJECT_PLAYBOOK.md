# 김포국악원 프로젝트 플레이북 (PROJECT_PLAYBOOK.md)

> v1.01 ~ v2.00 버전의 전체 히스토리와 핵심 구현 노하우를 담은 종합 매뉴얼

---

## 1. 프로젝트 개요 및 기술 스택 (Tech Stack)

### 1.1 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 김포국악원 (Gimpo Gugak Center) |
| **도메인** | gimpogugak.com |
| **성격** | 공개 웹사이트 + 관리자 대시보드 |
| **주요 기능** | 블로그(소식), 수업관리(LMS), 회원관리, 공지/갤러리/자료실 |

### 1.2 기술 스택

| 분류 | 기술 |
|------|------|
| **프레임워크** | Next.js 16 (App Router) |
| **데이터베이스** | Supabase (PostgreSQL, RLS, Auth) |
| **스타일링** | Tailwind CSS |
| **에디터** | React-Quill (react-quill-new) |
| **폰트** | Pretendard (CDN 전역 적용) / 포인트 폰트: 고운돋움, 나눔명조 (에디터 전용) |
| **배포** | Vercel |
| **분석** | Google Analytics 4, Vercel Analytics, Vercel Speed Insights |

### 1.3 핵심 디렉터리 구조

`app/`          : App Router 페이지 (blog, admin, intro, contact 등)
`components/`   : 재사용 UI (PostModal, PostEditor, Navbar 등)
`lib/`          : 유틸리티 (supabase, fonts, changelog, upload-image, date-utils)

---

## 2. 버전별 핵심 업데이트 히스토리 (v1.01 ~ v2.00)

### v1.0.0 ~ v1.0.2 (초기 구축)

| 버전 | 날짜 | 핵심 변경 |
|------|------|-----------|
| **1.0.0** | 2026-02-12 | 관리자 대시보드 초기화, 회원승인/회원관리/수업관리/공지사항 메뉴 구성 |
| **1.0.1** | 2026-02-15 | 내 정보 페이지, 로그인 버그 수정(전화번호 조회, RLS), 버전 관리 및 업데이트 내역 시스템 |
| **1.0.2** | 2026-02-16 | 수강료 입금 대기 명단 카카오톡 연동, 공통 메시지 모듈(lib/messages.ts) |

### v1.08 ~ v1.18 (수업·소개·언론보도)

| 버전 | 날짜 | 핵심 변경 |
|------|------|-----------|
| **1.08** | 2026-02-17 | 수강료 안내 발송 방식을 카카오톡 → 일반 문자(SMS)로 변경 |
| **1.09~1.13** | 2026-02-18 | 모바일 헤더 레이아웃, 드롭다운 메뉴, Z-Index·클릭 버그 수정 |
| **1.14~1.16** | 2026-02-18 | 소개 메뉴 개편(원장/부원장/언론), 프로필 이미지 카드 형식 |
| **1.17** | 2026-02-18 | 언론 보도 목록 페이지 생성 (도트 리더 디자인) |
| **1.18** | 2026-02-18 | 언론 보도 목록에 김포문화재단 게시물 링크 추가 |

### v1.23 ~ v1.35 (수업관리·블로그 기반)

| 버전 | 날짜 | 핵심 변경 |
|------|------|-----------|
| **1.23** | 2026-02-18 | 수강생 카테고리 중복 선택, 수업 취소 캘린더 연동, 수강료 합계 표시, KST 타임존 버그 수정 |
| **1.24** | 2026-02-18 | 캘린더 월 이동, 출석 데이터 연동 |
| **1.25** | 2026-02-18 | 캘린더 날짜별 다중 수업 등록 |
| **1.33** | 2026-02-19 | 블로그 GNB 승격, 라우팅 /blog 구조 개편 |
| **1.34** | 2026-02-19 | 블로그 메뉴 최상단 배치 |
| **1.35** | 2026-02-19 | 소식 관리 UX 개선: 게시글 작성/수정 팝업(모달) 통합 |

### v1.36 ~ v1.50 (에디터·성능·SEO)

| 버전 | 날짜 | 핵심 변경 |
|------|------|-----------|
| **1.36** | 2026-02-19 | 스마트 에디터: 글씨 크기 조절, 툴바 Sticky |
| **1.37** | 2026-02-19 | 커스텀 웹 폰트 6종 에디터 적용 |
| **1.38~1.40** | 2026-02-10 | 에디터↔뷰어 WYSIWYG 동기화, 줄바꿈 강제, 글자 크기 px 단위 |
| **1.41** | 2026-02-10 | 블로그/활동 페이지 ISR 캐싱, font-display: swap |
| **1.42** | 2026-02-10 | 성능 다이어트: 무거운 폰트 제거, 블로그 목록 텍스트(언론보도) 형식 경량화 |
| **1.43** | 2026-02-10 | 줄바꿈 !important, Quill CSS 로딩 분리(LCP 차단 해소), 블로그 목록 SSG 강제 |
| **1.45** | 2026-02-10 | 전역 폰트 최적화(next/font), 접근성 100점(viewport 수정), CSS 인라인화 |
| **1.46** | 2026-02-10 | 에디터 폰트(고운돋움, 나눔명조) 국소적 적용 |
| **1.47** | 2026-02-10 | 수업관리 진도 날짜 표시, 수업 취소 달력 동기화, 캘린더 삭제 버튼 |
| **1.48** | 2026-02-10 | 에디터 툴바 한글화, 뷰어 줄바꿈/여백 Tailwind 충돌 해결 |
| **1.49** | 2026-02-10 | 뷰어 문단 여백 축소, 한글 단어 잘림 방지 |
| **1.50** | 2026-02-10 | 에디터 하이퍼링크 버튼 활성화, CTA 링크 CSS |

### v1.51 ~ v1.70 (SEO·이미지·분석)

| 버전 | 날짜 | 핵심 변경 |
|------|------|-----------|
| **1.51** | 2026-02-10 | sitemap.ts Supabase 동적 블로그 연동 |
| **1.52** | 2026-02-10 | sitemap에 /blog 목록 페이지 추가 |
| **1.53** | 2026-02-10 | 에디터 코드 블록 기능 |
| **1.55** | 2026-02-10 | 블로그 하단 문의·지도 섹션 |
| **1.56** | 2026-02-10 | 코드 블록 버튼 활성화, 지도 이미지 경로 수정 |
| **1.57** | 2026-02-10 | HTML 소스 직접 수정(View Source) 기능 |
| **1.59** | 2026-02-10 | 코드 블록 → 진짜 HTML 소스 편집 모드 |
| **1.60** | 2026-02-20 | PageSpeed 최적화: LCP(sizes 1200px), CLS 방지, 폰트 다이어트 |
| **1.61** | 2026-02-20 | 블로그 상세 SSG/ISR 적용 |
| **1.62** | 2026-02-22 | 이미지 Base64 제거 → Supabase Storage 업로드(lib/upload-image.ts) |
| **1.63** | 2026-02-22 | 예약 발행(published_at), 예약 배지 |
| **1.64** | 2026-02-22 | 이미지 Alt Text(대체 텍스트) 지원 |
| **1.65** | 2026-02-22 | 이미지 이중 삽입 버그 수정 |
| **1.66** | 2026-02-23 | 소식 관리 검색·페이지네이션, Slug 입력 필드 |
| **1.68** | 2026-02-23 | 블로그 URL 슬러그 우선: /blog/[slug] 또는 /blog/[id] |
| **1.69** | 2026-02-24 | 블로그 조회수(views) 기능, 24시간 중복 방지 |
| **1.70** | 2026-02-24 | Google Analytics 4 전역 연동 |

### v1.71 ~ v1.90 (분석·수업관리·블로그 UX)

| 버전 | 날짜 | 핵심 변경 |
|------|------|-----------|
| **1.71** | 2026-02-24 | 관리자 대시보드 GA 바로가기 버튼 |
| **1.72** | 2026-02-24 | 관리자 기기 GA 추적 제외(localStorage is_admin_device) |
| **1.73** | 2026-02-24 | 관리자 기기 조회수 제외 |
| **1.74** | 2026-02-25 | 내 수업 '최근 수강 내역' 카드, lesson_history status |
| **1.75** | 2026-02-25 | 출석 체크 시 user_id·status 저장 |
| **1.76** | 2026-02-25 | Vercel ISR Writes 한도 대응: admin/lessons/my-lessons force-dynamic |
| **1.77~1.80** | 2026-02-25 | 수업 기록 디버깅, lesson_history note 제거, 캘린더-목록 동기화 버그 수정 |
| **1.81** | 2026-02-25 | 수업 갱신 시 파괴적 삭제 → 아카이브 방식(is_active=false) |
| **1.82** | 2026-02-25 | 개인/단체 수업 투-트랙 UI (단체반 납부 확인) |
| **1.83** | 2026-02-25 | 단체반 납부 등록, lesson_history status '결제 완료' |
| **1.84** | 2026-02-25 | 단체반 '납부 이력' 모달 |
| **1.85~1.86** | 2026-02-25 | 조회수 버그 수정(views 컬럼), 서버 API 라우트(/api/track-view) |
| **1.87** | 2026-02-26 | 소식 관리 No. 열 추가 |
| **1.88** | 2026-02-26 | 블로그 상세 UI: 공유 버튼 상단 이동, 이전글/목록/다음글 네비게이션 |
| **1.89** | 2026-02-26 | 개인정보처리방침 페이지(/privacy) 신설 |
| **1.90** | 2026-02-26 | 블로그 카테고리: 음악교실(파란), 국악원소식(초록) |

### v1.91 ~ v2.00 (최종 정리·에디터 리뉴얼)

| 버전 | 날짜 | 핵심 변경 |
|------|------|-----------|
| **1.91** | 2026-02-26 | 이전글/다음글 카테고리 격리, 예약글 방어 |
| **1.92** | 2026-02-26 | 블로그 목록: 검색 바, 페이지네이션(10건), No. 열 |
| **1.93~1.94** | 2026-02-26 | 푸터 개인정보처리방침 링크, CONNECT 섹션 링크 |
| **1.95** | 2026-02-27 | 입력값 공백 정제(trim, slug 하이픈 치환), 기본 카테고리 음악교실 |
| **1.96** | 2026-02-27 | Supabase Storage 이미지 일괄 최적화(sharp, 1200px, WebP q80) |
| **1.97** | 2026-02-27 | EXIF 회전 보정, 본문 이미지 가운데 정렬 |
| **1.98** | 2026-02-27 | 본문 가독성(line-height 1.8, margin-bottom 1.5em), 이미지 중앙 !important |
| **1.99** | 2026-02-27 | 파비콘 400 오류 수정(app/icon.png → public/favicon.ico) |
| **2.00** | 2026-02-27 | 관리자 블로그 에디터 풀페이지 리뉴얼: /admin/posts/manage/new, /edit/[id] |

---

## 3. 핵심 기능 구현 노하우

### 3.1 이미지 최적화

| 항목 | 구현 방법 |
|------|-----------|
| **LCP 히어로 이미지** | `priority`, `fetchPriority="high"`, `sizes="(max-width: 768px) 100vw, 1200px"` |
| **업로드 시 변환** | `lib/upload-image.ts`: createImageBitmap → Canvas → WebP(q85), 최대 1600px |
| **EXIF 회전** | createImageBitmap이 EXIF orientation 자동 적용 후 Canvas 재인코딩 |
| **일괄 최적화** | sharp로 1MB 이상 이미지 1200px 리사이즈 + WebP(q80) 변환 |
| **Next.js Image** | `formats: ['image/avif', 'image/webp']`, Supabase remotePatterns 등록 |

### 3.2 폰트·가독성 세팅

| 항목 | 규칙 |
|------|------|
| **전역 폰트** | 기기 파편화 방지를 위해 `app/layout.tsx` 또는 `globals.css`에 CDN 방식(`@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");`) 최우선 적용 |
| **에디터 전용** | Gowun Dodum, Nanum Myeongjo (preload: false — LCP 경쟁 방지) |
| **금지** | `@import`로 무거운 웹폰트 로드, globals.css에 Quill CSS 전역 import |
| **Quill CSS** | PostModal, blog/[id]에서만 lazy-load, `next/dynamic` ssr: false |
| **뷰어 가독성** | `.blog-detail-article .ql-editor` 내부에 `line-height: 1.8 !important`, `p { margin-bottom: 1.5em !important; }` 적용하여 한글 최적화 여백 확보 |
| **줄바꿈** | Tailwind prose 금지. `ql-editor` + `!important` 오버라이드로 강제 |
| **이미지 강제 중앙 정렬** | 에디터 사진 크기 조절 시 좌측 쏠림 방지를 위해 `.ql-editor img { margin-left: auto !important; margin-right: auto !important; display: block; }` 강제 적용 |

### 3.3 SEO

| 항목 | 구현 |
|------|------|
| **메타데이터** | metadataBase, title template, Open Graph, robots, canonical |
| **사이트맵** | `app/sitemap.ts` — 정적 라우트 + Supabase posts 동적 연동 |
| **JSON-LD** | EducationalOrganization, WebSite 스키마 |
| **네이버 인증** | verification.other["naver-site-verification"] |
| **블로그 URL** | slug 우선, 없으면 id. `getBlogPostPath(slug, id)` |
| **Viewport** | userScalable: false, maximumScale: 1 금지 (접근성 저하) |

### 3.4 렌더링·캐싱

| 페이지 | 설정 |
|--------|------|
| 블로그 목록 | `revalidate = 60`, `dynamic = "force-static"` |
| 블로그 상세 | SSG/ISR |
| admin, lessons, my-lessons | `force-dynamic` (ISR Writes 한도 회피) |

### 3.5 React-Quill 에디터

| 항목 | 규칙 |
|------|------|
| **로딩** | `next/dynamic` ssr: false, PostModal/PostEditor/blog 상세에서만 |
| **폰트 크기** | px 단위 (10~36px), SizeStyle attributor whitelist |
| **커스텀 폰트** | gowunDodum, nanumMyeongjo — CSS 변수로 스코프 |
| **이미지** | Supabase Storage 업로드, Base64 금지 |
| **뷰어** | `ql-snow` + `ql-editor`, prose 클래스 금지 |

### 3.5-1 관리자 UI: 풀페이지 분리형 에디터 (v2.00)

| 항목 | 규칙 |
|------|------|
| **목적** | 좁은 모달(팝업) 창의 한계를 벗어나 쾌적한 UX 제공 |
| **레이아웃 구조 (7:3 황금비)** | **좌측 (Main Content):** `max-w-4xl` & `mx-auto`를 적용하여 방문자가 보는 블로그 폭과 100% 동일하게 에디터 크기 제한 (작성 중 줄바꿈 예측 가능)<br>**우측 (Sidebar):** 카테고리, 썸네일, SEO 설정 등 메타데이터 입력란을 `sticky top-20`으로 고정하여 스크롤 시에도 항상 따라다니도록 배치 |

### 3.6 수업관리(LMS) 비즈니스 로직

| 항목 | 설명 |
|------|------|
| **lessons** | user_id, category, current_session, is_active, payment_date |
| **lesson_history** | lesson_id, session_number, completed_date, status(출석/결제 완료) |
| **개인반** | 출석 체크 → lesson_history INSERT, current_session++ |
| **단체반** | 납부 확인 → payment_date 업데이트, lesson_history status '결제 완료' |
| **수업 갱신** | 기존 행 is_active=false 아카이브, 새 행 INSERT |
| **수업 취소** | lesson_history 최신 레코드 삭제, current_session 재동기화 |

---

## 4. 다음 프로젝트를 위한 초기 세팅 체크리스트

### 4.1 프로젝트 생성
- [ ] Next.js 16 App Router 프로젝트 생성
- [ ] Tailwind CSS 설정
- [ ] TypeScript 설정

### 4.2 Supabase
- [ ] 프로젝트 생성, URL·anon key 발급
- [ ] `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정
- [ ] RLS 정책 설계 (admin / member / public)
- [ ] Storage 버킷 생성 (public-media 등)

### 4.3 성능·SEO
- [ ] `next.config.ts`: `images.formats`, `experimental.inlineCss`, `optimizePackageImports`
- [ ] 히어로 이미지: `priority`, `fetchPriority="high"`, `sizes` 적절히 설정
- [ ] `app/layout.tsx`: viewport (userScalable 금지), metadata, JSON-LD
- [ ] `app/sitemap.ts` 생성
- [ ] `app/robots.ts` 필요 시 생성

### 4.4 폰트
- [ ] `next/font/google`로 전역 폰트만 로드
- [ ] 에디터/특수 페이지용 폰트는 preload: false
- [ ] `@import` 웹폰트 globals.css 사용 금지

### 4.5 React-Quill (에디터 사용 시)
- [ ] `next/dynamic` ssr: false로 lazy-load
- [ ] quill.snow.css는 에디터/뷰어 컴포넌트에서만 import
- [ ] globals.css에 Quill 줄바꿈·여백 !important 오버라이드
- [ ] 이미지 업로드: Base64 대신 Storage URL

### 4.6 버전·Changelog
- [ ] `lib/changelog.ts` 생성, CHANGELOG 배열, CURRENT_VERSION export
- [ ] 모든 changes 항목 한국어 작성
- [ ] 의미 있는 변경마다 버전 증가

### 4.7 환경 변수
```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://example.com
# 관리자 전용: SUPABASE_SERVICE_ROLE_KEY (서버 API 라우트용)
```

### 4.8 배포(Vercel)
- [ ] Vercel 프로젝트 연결
- [ ] 환경 변수 동기화
- [ ] ISR/force-dynamic 페이지 구분 (쓰기 빈도 높은 페이지는 force-dynamic)

---

## 5. 웹 에이전시(B2B) 사업을 위한 모듈화(Lego) 분리 가이드

> 고객의 예산과 요구사항에 따라 필요한 기능만 조립하여 배포하는 전략

### 📦 티어 1: Basic (정적 소개 홈페이지)
* **대상:** 식당, 개인 프리랜서 등 정보 전달만 필요한 고객 (제작 목표: 1일)
* **제거할 모듈:**
  * Supabase 연동 코드 및 환경 변수 전체 삭제
  * `app/admin` (관리자 대시보드) 폴더 전체 삭제
  * `app/blog` (소식/칼럼) 라우트 삭제
  * React-Quill 에디터 및 이미지 업로드(`lib/upload-image.ts`) 삭제
* **남길 모듈:** Pretendard 폰트 세팅, Tailwind 반응형 레이아웃, 메타데이터(SEO) 뼈대

### 📦 티어 2: Pro (블로그/CMS 포함 홈페이지)
* **대상:** 학원, 병원, 전문직 등 지속적인 칼럼 연재와 콘텐츠 관리가 필요한 고객
* **적용 모듈:** Gimpo Gugak Center v2.00 플레이북 100% 동일 적용
* **세팅 변경점:**
  * Supabase 새 프로젝트 생성 및 환경 변수 교체
  * `sitemap.ts` 및 SEO Title을 해당 업체명으로 전체 치환
  * 카테고리(예: '음악교실', '국악원소식')를 고객 비즈니스에 맞게 DB 수정

---

## 부록: 주요 파일 참조

| 파일 | 용도 |
|------|------|
| `lib/changelog.ts` | 버전·업데이트 내역 |
| `lib/upload-image.ts` | 블로그 이미지 업로드·EXIF·WebP |
| `lib/blog-utils.ts` | getBlogPostPath(slug, id) |
| `lib/supabase/client.ts` | 브라우저 클라이언트 |
| `lib/supabase/server.ts` | 서버 컴포넌트용 |
| `app/sitemap.ts` | 동적 사이트맵 |
| `CLAUDE.md` | AI 코딩 가이드 (본 플레이북과 함께 참고) |