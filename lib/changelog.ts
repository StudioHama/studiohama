/**
 * 업데이트 내역 (Changelog)
 * ⚠️ 규칙: 모든 changes 항목은 반드시 한국어로 작성합니다.
 */
export type ChangelogEntry = {
  version: string;
  date: string;
  changes: string[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.04",
    date: "2026-03-09",
    changes: [
      "Vercel Analytics 추가: AnalyticsSpeedInsights 컴포넌트에 <Analytics /> 삽입.",
      "관리자 대시보드에 '시스템 & 버전 로그' 페이지(/admin/system) 신규 생성: 현재 버전, 전체 업데이트 히스토리(타임라인), 기술 스택 목록 표시.",
      "어드민 네비게이션에 '시스템 로그' 메뉴 추가.",
      "홈페이지 UI 개편: 밀집된 그리드 레이아웃 제거, 타이포그래피 중심의 미니멀 수직 플로우로 재설계 (김포국악원 스타일 참조).",
    ],
  },
  {
    version: "1.03",
    date: "2026-03-09",
    changes: [
      "새 Supabase 프로젝트 마이그레이션 완료 (uastagwjudzjqgvngsdl).",
      "posts 테이블 신규 생성: 전체 컬럼(id, title, content, slug, category, thumbnail_url, external_url, meta_title, meta_description, meta_keywords, views, published_at, created_at, updated_at), RLS 정책, 인덱스, updated_at 자동 트리거 포함.",
      "public-media 스토리지 버킷 자동 생성 (setup-db.mjs 스크립트).",
      "@supabase/supabase-js 2.98.0, @supabase/ssr 0.9.0으로 업그레이드.",
      "framer-motion 12.x, lucide-react 0.577.0, postcss 8.5.8, quill-resize-module 2.1.3으로 업그레이드.",
      "ESLint 10에서 9로 다운그레이드 (eslint-config-next peer 호환성 복원).",
      "미사용 패키지 제거: @supabase/auth-ui-react, @supabase/auth-ui-shared.",
      "next.config.ts 이미지 remotePatterns 호스트명 신규 Supabase 프로젝트로 수정.",
      "package.json name을 'gimpo-gugak'에서 'samcheok-vocal'로 변경.",
      "PROJECT_PLAYBOOK.md 삼척 성악 스튜디오 기준으로 전면 재작성.",
    ],
  },
  {
    version: "1.02",
    date: "2026-03-08",
    changes: [
      "코드베이스 대규모 정리 (김포국악원 잔여물 완전 제거).",
      "불필요한 앱 라우트 삭제: /about, /booking, /director, /gallery, /login, /materials, /members, /my-info, /my-lessons, /notices, /Park-Jun-Yeol, /privacy, /secret, /Song-Ri-Gyel, /teachers, /test-login, /update-password, /waiting.",
      "/intro 하위 메뉴(/blog, /director, /media, /vice-director) 삭제, /intro가 박준열 프로필을 직접 렌더링하도록 변경.",
      "관리자 전용 구성 간소화: approvals, classes, gallery, lessons, notices, students, teachers 관리 페이지 삭제. 블로그 관리만 유지.",
      "PostEditor 블로그 카테고리를 국악원 중심(음악교실/국악원소식)에서 스튜디오 중심(성악/보컬/민요/공연)으로 교체.",
      "app/layout.tsx 및 app/page.tsx 메타데이터·본문 텍스트에서 김포국악원 관련 문구 완전 제거, 하마 보컬 스튜디오로 교체.",
      "app/contact/page.tsx에서 김포 주소·약도·계좌번호 제거, 삼척 스튜디오 기본 정보로 대체.",
      "불필요한 컴포넌트 삭제: Analytics, HeroCarousel, PostModal, HomeBadges, HomeConnect, FixedCTA, Header, ViewTracker, ShareButton.",
      "lib/messages.ts, lib/indexnow.ts, lib/storage-cleanup.ts(PostEditor에서 제거) 등 미사용 라이브러리 정리.",
      "공개 파일 삭제: 국악원 배지 3종, 지도 이미지, Song-Ri-Gyeol 프로필 사진, IndexNow 키 파일.",
      "사이트맵을 5개 공개 라우트(/, /intro, /blog, /classes, /activities, /contact)로 정리.",
    ],
  },
  {
    version: "1.01",
    date: "2026-03-08",
    changes: [
      "삼척 성악 스튜디오 초기 셋업: 김포국악원 엔진 기반으로 프로젝트 시작.",
      "공개 네비게이션을 5개 메뉴(소개, 블로그, 수업, 활동, 문의)로 정리, 로그인/회원가입 UI 완전 제거.",
      "소개 페이지(/intro)를 박준열 부원장 단독 프로필 페이지로 전환 (서브메뉴 제거).",
      "관리자 인증 방식을 Supabase Auth에서 패스워드 + HTTP-only 쿠키 방식으로 교체 (경량화).",
      "미들웨어를 쿠키 기반 관리자 전용 보호로 단순화, Supabase 의존성 제거.",
    ],
  },
  {
    version: "1.00",
    date: "2026-03-08",
    changes: [
      "김포국악원 엔진 기반으로 삼척 성악 스튜디오 프로젝트 시작.",
    ],
  },
];

export const CURRENT_VERSION = CHANGELOG[0]?.version ?? "1.03";
