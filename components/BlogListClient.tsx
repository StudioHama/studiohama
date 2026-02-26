"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { formatDateKST } from "@/lib/date-utils";
import { getBlogPostPath } from "@/lib/blog-utils";

export type BlogPost = {
  id: string;
  slug: string | null;
  title: string;
  external_url: string | null;
  created_at: string;
  published_at: string | null;
  category: string;
};

const TABS = [
  { key: "전체" as const, label: "전체보기" },
  { key: "음악교실" as const, label: "음악교실" },
  { key: "국악원소식" as const, label: "국악원소식" },
];

type TabKey = (typeof TABS)[number]["key"];

const PAGE_SIZE = 10;

function getPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const delta = 2;
  const range: (number | "…")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);
  range.push(1);
  if (left > 2) range.push("…");
  for (let p = left; p <= right; p++) range.push(p);
  if (right < total - 1) range.push("…");
  range.push(total);
  return range;
}

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [activeTab, setActiveTab] = useState<TabKey>("전체");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const tabFiltered = useMemo(() => {
    return posts.filter((post) => {
      if (activeTab === "전체") return true;
      if (activeTab === "음악교실") return post.category === "음악교실";
      return post.category === "국악원소식" || post.category === "소식";
    });
  }, [posts, activeTab]);

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return tabFiltered;
    const q = query.trim().toLowerCase();
    return tabFiltered.filter((post) => post.title.toLowerCase().includes(q));
  }, [tabFiltered, query]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pagePosts = filteredPosts.slice(pageStart, pageStart + PAGE_SIZE);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <>
      {/* Category Tabs */}
      <div className="flex gap-0 mb-6 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="제목으로 검색..."
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
        />
      </div>

      {/* Header Row */}
      {filteredPosts.length > 0 && (
        <div className="flex items-center gap-2 py-2 border-b-2 border-gray-200 text-xs font-medium text-gray-400 uppercase tracking-wider">
          <span className="w-10 shrink-0 text-center">No.</span>
          <span className="flex-1 min-w-0">제목</span>
          <span className="whitespace-nowrap shrink-0 pr-0.5">날짜</span>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className="py-12 text-center text-[#666] border border-dashed border-gray-300 rounded-xl">
          {query.trim() ? "검색 결과가 없습니다." : "아직 등록된 소식이 없습니다."}
        </div>
      ) : (
        <ul>
          {pagePosts.map((post, idx) => {
            const num = filteredPosts.length - (pageStart + idx);
            const href =
              post.external_url ||
              `/blog/${getBlogPostPath(post.slug ?? null, post.id)}`;
            const date = formatDateKST(
              post.published_at || post.created_at,
              "short"
            );
            const isExternal = !!post.external_url;

            const content = (
              <>
                <span className="w-10 shrink-0 text-center text-sm text-gray-400 tabular-nums">
                  {num}
                </span>
                <span className="truncate text-[#111] group-hover:text-blue-600 group-hover:underline min-w-0 flex-1">
                  {post.title}
                </span>
                <span
                  className="hidden sm:block flex-shrink min-w-[20px] border-b border-dotted border-gray-300 self-end mb-1 mx-3"
                  aria-hidden
                />
                <span className="text-sm text-gray-500 whitespace-nowrap shrink-0">
                  {date}
                </span>
              </>
            );

            const itemClassName =
              "flex items-baseline gap-2 py-2.5 group w-full text-left border-b border-gray-100";

            return (
              <li key={post.id}>
                {isExternal ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={itemClassName}
                  >
                    {content}
                  </a>
                ) : (
                  <Link href={href} className={itemClassName}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="px-2 py-1.5 text-sm text-gray-500 disabled:opacity-30 hover:text-gray-800 transition-colors"
            aria-label="이전 페이지"
          >
            ‹
          </button>
          {getPageRange(safePage, totalPages).map((p, i) =>
            p === "…" ? (
              <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm select-none">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p as number)}
                className={`w-8 h-8 text-sm rounded transition-colors ${
                  p === safePage
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="px-2 py-1.5 text-sm text-gray-500 disabled:opacity-30 hover:text-gray-800 transition-colors"
            aria-label="다음 페이지"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
