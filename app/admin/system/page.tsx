export const dynamic = "force-dynamic";

import { CHANGELOG, CURRENT_VERSION } from "@/lib/changelog";

const TECH_STACK = [
  { category: "Framework", items: [{ name: "Next.js 16", note: "App Router · Turbopack" }] },
  {
    category: "Database & Storage",
    items: [
      { name: "Supabase (PostgreSQL)", note: "posts 테이블 + public-media 버킷" },
      { name: "@supabase/ssr 0.9", note: "SSR 쿠키 헬퍼" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React 18", note: "Pinned — react-quill-new 호환성" },
      { name: "Tailwind CSS v3", note: "Pinned — v4 호환성 이슈" },
      { name: "TypeScript 5", note: "" },
      { name: "Framer Motion 12", note: "애니메이션" },
      { name: "Lucide React", note: "아이콘" },
    ],
  },
  {
    category: "Editor",
    items: [
      { name: "react-quill-new 3.8", note: "리치 텍스트 에디터 (admin only)" },
      { name: "quill-resize-module", note: "이미지 리사이즈" },
      { name: "quill-html-edit-button", note: "HTML 소스 편집" },
    ],
  },
  {
    category: "Analytics & Performance",
    items: [
      { name: "@vercel/analytics", note: "방문자 통계" },
      { name: "@vercel/speed-insights", note: "성능 측정" },
      { name: "@next/bundle-analyzer", note: "ANALYZE=true npm run build" },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Vercel", note: "호스팅 · 배포" },
      { name: "Supabase", note: "DB · 스토리지" },
    ],
  },
  {
    category: "Auth (Admin Only)",
    items: [
      { name: "HTTP-only Cookie", note: "admin_session · 7일 유효" },
      { name: "Password-based", note: "ADMIN_PASSWORD · ADMIN_SECRET 환경변수" },
    ],
  },
];

export default function AdminSystemPage() {
  return (
    <div className="max-w-4xl">
      {/* Page Header */}
      <div className="mb-10 pb-6 border-b border-gray-200">
        <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-2">Admin</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">System &amp; Version Log</h1>
        <p className="text-sm text-gray-500">
          현재 앱 버전, 업데이트 히스토리, 사용 기술 스택을 확인합니다.
        </p>
      </div>

      {/* Version Badge */}
      <div className="flex items-center gap-4 mb-10">
        <div className="inline-flex items-center gap-3 bg-gray-900 text-white rounded-lg px-5 py-3">
          <span className="text-xs font-medium tracking-widest uppercase text-gray-400">Current Version</span>
          <span className="text-xl font-bold font-mono">v{CURRENT_VERSION}</span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">하마 보컬 스튜디오</span>
          <span className="mx-2 text-gray-300">·</span>
          samcheok-vocal
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Changelog */}
        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
            Update History
          </h2>
          <div className="space-y-0">
            {CHANGELOG.map((entry, idx) => (
              <div key={entry.version} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                      idx === 0 ? "bg-gray-900" : "bg-gray-300"
                    }`}
                  />
                  {idx < CHANGELOG.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 my-1" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6 flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className={`text-sm font-bold font-mono ${
                        idx === 0 ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      v{entry.version}
                    </span>
                    <span className="text-xs text-gray-400">{entry.date}</span>
                    {idx === 0 && (
                      <span className="text-[10px] font-semibold tracking-wide bg-gray-900 text-white px-1.5 py-0.5 rounded">
                        LATEST
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1">
                    {entry.changes.map((change, i) => (
                      <li key={i} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                        <span className="text-gray-300 mt-0.5 shrink-0">—</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tech Stack */}
        <div className="lg:col-span-2">
          <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
            Tech Stack
          </h2>
          <div className="space-y-5">
            {TECH_STACK.map((group) => (
              <div key={group.category}>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">
                  {group.category}
                </p>
                <div className="space-y-1.5">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start justify-between gap-2 text-xs"
                    >
                      <span className="font-medium text-gray-800">{item.name}</span>
                      {item.note && (
                        <span className="text-gray-400 text-right shrink-0 max-w-[120px] leading-relaxed">
                          {item.note}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Domain info */}
          <div className="mt-6 pt-5 border-t border-gray-100 space-y-1.5 text-xs">
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">Deployment</p>
            <div className="flex justify-between">
              <span className="text-gray-500">Domain</span>
              <span className="font-medium text-gray-800">hama-vocal.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Supabase ref</span>
              <span className="font-mono text-gray-700 text-[11px]">uastagwjudzjqgvngsdl</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ESLint</span>
              <span className="font-medium text-gray-800">v9 (pinned)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
