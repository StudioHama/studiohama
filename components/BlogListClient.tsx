"use client";

import { useState } from "react";
import Link from "next/link";
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

function getCategoryBadge(category: string) {
  if (category === "음악교실") {
    return { className: "bg-blue-100 text-blue-700", label: "음악교실" };
  }
  return { className: "bg-green-100 text-green-700", label: "국악원소식" };
}

function BlogListItem({
  href,
  title,
  date,
  category,
  isExternal,
}: {
  href: string;
  title: string;
  date: string;
  category: string;
  isExternal: boolean;
}) {
  const badge = getCategoryBadge(category);
  const className = "flex items-baseline gap-2 py-2 group w-full text-left";
  const content = (
    <>
      <span className={`shrink-0 text-xs font-medium px-1.5 py-0.5 rounded self-center ${badge.className}`}>
        {badge.label}
      </span>
      <span className="truncate text-[#111] group-hover:text-blue-600 group-hover:underline min-w-0 flex-shrink">
        {title}
      </span>
      <span
        className="flex-1 min-w-[20px] border-b border-dotted border-gray-300 self-end mb-1 mx-4 shrink-0"
        aria-hidden
      />
      <span className="text-sm text-gray-500 whitespace-nowrap shrink-0">{date}</span>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [activeTab, setActiveTab] = useState<TabKey>("전체");

  const filteredPosts = posts.filter((post) => {
    if (activeTab === "전체") return true;
    if (activeTab === "음악교실") return post.category === "음악교실";
    // 국악원소식 탭: 기존 "소식" 카테고리 글도 포함
    return post.category === "국악원소식" || post.category === "소식";
  });

  return (
    <>
      {/* Category Tabs */}
      <div className="flex gap-0 mb-8 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
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

      {filteredPosts.length === 0 ? (
        <div className="py-12 text-center text-[#666] border border-dashed border-gray-300 rounded-xl">
          아직 등록된 소식이 없습니다.
        </div>
      ) : (
        <ul className="space-y-0">
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <BlogListItem
                href={post.external_url || `/blog/${getBlogPostPath(post.slug ?? null, post.id)}`}
                title={post.title}
                date={formatDateKST(post.published_at || post.created_at, "short")}
                category={post.category}
                isExternal={!!post.external_url}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
