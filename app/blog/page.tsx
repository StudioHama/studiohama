import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BlogListClient from "@/components/BlogListClient";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "블로그 | 하마 보컬 스튜디오",
  description: "하마 보컬 스튜디오의 소식, 레슨 이야기, 공연 후기를 확인하세요.",
};

export default async function BlogListPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, external_url, created_at, published_at, category")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  return (
    <section className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#111] mb-2">
        블로그
      </h1>
      <p className="text-[#666] mb-10">
        스튜디오 소식, 레슨 이야기, 공연 후기를 공유합니다.
      </p>

      <BlogListClient posts={posts ?? []} />

      <p className="mt-12 text-sm text-gray-500">
        <Link href="/classes" className="text-blue-600 hover:underline">
          ← 수업 안내 보기
        </Link>
      </p>
    </section>
  );
}
