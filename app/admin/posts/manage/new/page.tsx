"use client";

import PostEditor from "@/components/PostEditor";

export default function AdminNewPostPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">새 글 작성</h1>
        <p className="text-sm text-gray-600 mt-1">
          국악원 소식(블로그) 게시글을 작성합니다.
        </p>
      </div>
      <PostEditor />
    </div>
  );
}
