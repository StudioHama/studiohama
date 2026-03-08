"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { CHANGELOG, CURRENT_VERSION } from "@/lib/changelog";

export default function AdminDashboardPage() {
  const [changelogOpen, setChangelogOpen] = useState(false);

  const currentDateTime = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          관리자 대시보드
        </h1>
        <p className="text-gray-600">삼척 성악 스튜디오 관리 시스템</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          href="/admin/posts/manage"
          className="flex items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-5 group"
        >
          <div className="text-4xl">✏️</div>
          <div className="flex-1">
            <p className="text-lg font-bold">블로그 관리</p>
            <p className="text-sm text-blue-100">글 작성 · 수정 · 삭제 →</p>
          </div>
          <div className="text-blue-200 group-hover:translate-x-1 transition-transform text-xl">
            →
          </div>
        </Link>

        <Link
          href="/blog"
          target="_blank"
          className="flex items-center gap-4 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md rounded-xl transition-all duration-200 p-5 group"
        >
          <div className="text-4xl">🌐</div>
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-800">공개 블로그 보기</p>
            <p className="text-sm text-gray-500">새 탭으로 열기 ↗</p>
          </div>
        </Link>
      </div>

      {/* Status Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">시스템 상태</h3>
            <div className="text-3xl">✅</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-lg font-semibold text-green-600">정상 운영 중</p>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            모든 시스템이 정상 작동하고 있습니다
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">현재 접속 시각</h3>
            <div className="text-3xl">🕐</div>
          </div>
          <p className="text-lg font-semibold text-gray-900">{currentDateTime}</p>
        </div>
      </div>

      {/* System Info → Changelog */}
      <button
        type="button"
        onClick={() => setChangelogOpen(true)}
        className="w-full text-left bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <h3 className="text-sm font-semibold text-gray-700 mb-3">시스템 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600">
          <div>
            <span className="font-medium">버전:</span> v{CURRENT_VERSION}
          </div>
          <div>
            <span className="font-medium">마지막 업데이트:</span>{" "}
            {CHANGELOG[0]?.date ?? "—"}
          </div>
          <div>
            <span className="font-medium">서버 상태:</span>{" "}
            <span className="text-green-600 font-medium">정상</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">클릭하여 업데이트 내역 보기</p>
      </button>

      {/* Changelog Modal */}
      {changelogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setChangelogOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="업데이트 내역"
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">업데이트 내역</h2>
              <button
                type="button"
                onClick={() => setChangelogOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-6">
              {CHANGELOG.map((entry) => (
                <div
                  key={entry.version}
                  className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-blue-600">
                      v{entry.version}
                    </span>
                    <span className="text-xs text-gray-500">{entry.date}</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {entry.changes.map((change, i) => (
                      <li key={i}>{change}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
