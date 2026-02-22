/**
 * 블로그 에디터용 이미지 업로드 유틸리티
 * Supabase Storage에 이미지를 업로드하고 public URL을 반환합니다.
 * Base64 인라인 대신 URL 삽입으로 DB 용량 절감 및 Next.js Image 최적화 활용.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export const BLOG_IMAGES_BUCKET = "public-media";
export const BLOG_CONTENT_PATH = "blog-content";

/**
 * 이미지 파일을 Supabase Storage에 업로드하고 public URL을 반환합니다.
 * @param supabase - Supabase 클라이언트 (createClient() from @/lib/supabase/client)
 * @param file - 업로드할 이미지 파일
 * @returns public URL 또는 null (실패 시)
 */
export async function uploadBlogImage(
  supabase: SupabaseClient,
  file: File
): Promise<{ url: string } | { error: string }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext) ? ext : "jpg";
  const path = `${BLOG_CONTENT_PATH}/${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;

  const { error } = await supabase.storage.from(BLOG_IMAGES_BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type || `image/${safeExt}`,
  });

  if (error) {
    return { error: error.message };
  }

  const { data } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}
