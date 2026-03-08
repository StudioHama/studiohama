import type { Metadata } from "next";
import Link from "next/link";
import { createClientForBuild } from "@/lib/supabase/build";
import { notFound } from "next/navigation";
import { stripHtml, sanitizeHtml } from "@/lib/html-utils";
import { formatDateKST } from "@/lib/date-utils";
import { getBlogPostPath } from "@/lib/blog-utils";
import "react-quill-new/dist/quill.snow.css";
import BlogContent from "@/components/BlogContent";

export const revalidate = 60;
export const dynamicParams = true;

const selectCols = "id, title, content, slug, created_at, published_at, thumbnail_url, meta_title, meta_description, meta_keywords, category";

async function fetchPost(supabase: ReturnType<typeof createClientForBuild>, param: string) {
  const now = new Date().toISOString();

  const { data: bySlug } = await supabase
    .from("posts")
    .select(selectCols)
    .eq("slug", param)
    .lte("published_at", now)
    .single();
  if (bySlug) return bySlug;

  const { data: byId } = await supabase
    .from("posts")
    .select(selectCols)
    .eq("id", param)
    .lte("published_at", now)
    .single();
  return byId ?? null;
}

export async function generateStaticParams() {
  try {
    const supabase = createClientForBuild();
    const { data: posts } = await supabase
      .from("posts")
      .select("id, slug")
      .lte("published_at", new Date().toISOString());
    return (posts ?? []).map((post) => ({ id: getBlogPostPath(post.slug ?? null, String(post.id)) }));
  } catch {
    return [];
  }
}

type Props = { params: Promise<{ id: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hama-vocal.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: param } = await params;
  const supabase = createClientForBuild();
  const data = await fetchPost(supabase, param);

  if (!data) {
    return { title: "블로그 | 하마 보컬 스튜디오" };
  }

  const canonicalPath = getBlogPostPath(data.slug ?? null, String(data.id));
  const url = `${siteUrl}/blog/${canonicalPath}`;
  const fallbackDescription = stripHtml(data.content).slice(0, 150);
  const title = data.meta_title?.trim() || `${data.title} | 하마 보컬 스튜디오`;
  const description = data.meta_description?.trim() || fallbackDescription || "하마 보컬 스튜디오 블로그";
  const image = data.thumbnail_url || `${siteUrl}/logo.png`;

  return {
    title,
    description,
    keywords: data.meta_keywords?.trim() || undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "하마 보컬 스튜디오",
      locale: "ko_KR",
      type: "article",
      images: [{ url: image, width: 800, height: 400, alt: data.title }],
    },
  };
}

const truncate = (str: string, n: number) => str.length > n ? str.slice(0, n) + "..." : str;

export default async function BlogDetailPage({ params }: Props) {
  const { id: param } = await params;
  const supabase = createClientForBuild();
  const post = await fetchPost(supabase, param);

  if (!post) {
    notFound();
  }

  const postDate = post.published_at || post.created_at;
  const now = new Date().toISOString();

  const [{ data: prevPosts }, { data: nextPosts }] = await Promise.all([
    supabase
      .from("posts")
      .select("id, title, slug")
      .lte("published_at", now)
      .lt("published_at", postDate)
      .order("published_at", { ascending: false })
      .limit(1),
    supabase
      .from("posts")
      .select("id, title, slug")
      .lte("published_at", now)
      .gt("published_at", postDate)
      .order("published_at", { ascending: true })
      .limit(1),
  ]);

  const prevPost = prevPosts?.[0] ?? null;
  const nextPost = nextPosts?.[0] ?? null;

  return (
    <article className="blog-detail-article mx-auto max-w-2xl px-6 py-12">
      <header className="mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#111] mb-2">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500">
          {formatDateKST(post.published_at || post.created_at, "long")}
        </p>
      </header>

      <BlogContent html={sanitizeHtml(post.content)} />

      {/* Prev/Next Navigation */}
      <div className="flex justify-between items-center w-full mt-10 pt-6 border-t border-gray-200">
        <div className="flex-1 text-left">
          {prevPost ? (
            <Link
              href={`/blog/${getBlogPostPath(prevPost.slug ?? null, String(prevPost.id))}`}
              className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
            >
              ← 이전글 {truncate(prevPost.title, 5)}
            </Link>
          ) : (
            <span />
          )}
        </div>
        <div className="flex-shrink-0 px-4">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-blue-600 hover:underline">
            목록
          </Link>
        </div>
        <div className="flex-1 text-right">
          {nextPost ? (
            <Link
              href={`/blog/${getBlogPostPath(nextPost.slug ?? null, String(nextPost.id))}`}
              className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
            >
              다음글 {truncate(nextPost.title, 5)} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </article>
  );
}
