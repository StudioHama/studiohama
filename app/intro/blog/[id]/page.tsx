import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("title")
    .eq("id", id)
    .eq("category", "소식")
    .single();
  return {
    title: data?.title ? `${data.title} | 김포국악원` : "국악원 소식 | 김포국악원",
  };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, content, created_at")
    .eq("id", id)
    .eq("category", "소식")
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#111] mb-2">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
      </header>

      <div
        className="prose-blog-content text-[#333] leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-4 [&_img]:max-w-full [&_img]:h-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="mt-12 pt-6 border-t border-gray-200">
        <Link
          href="/intro/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
        >
          ← 목록으로 돌아가기
        </Link>
      </footer>
    </article>
  );
}
