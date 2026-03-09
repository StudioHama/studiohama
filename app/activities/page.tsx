import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "활동 | 하마 보컬 스튜디오",
  description:
    "박준열 성악가의 공연, 무대, 행사 활동 기록. 오페라, 합창, 민요 무대 등 다양한 활동을 소개합니다.",
};

type Activity = {
  id: string;
  year: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
};

export default async function ActivitiesPage() {
  let activities: Activity[] = [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activities")
    .select("id, year, title, description, category, image_url")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[activities] Supabase fetch error:", error.message);
  }
  activities = data ?? [];

  // 사진이 있는 항목만 갤러리에 표시
  const withPhoto = activities.filter((a) => a.image_url);

  return (
    <section className="px-4 sm:px-6 py-12 pb-24 max-w-5xl mx-auto">
      {/* 헤더 */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#111] mb-3">
          활동
        </h1>
        <p className="text-[#666] text-sm leading-relaxed">
          무대 위에서 쌓아온 박준열 성악가의 공연 및 활동 기록입니다.
        </p>
      </div>

      {/* 갤러리 그리드 */}
      {withPhoto.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-sm">활동 사진을 준비 중입니다.</p>
          <p className="text-xs mt-1">곧 공연 및 활동 이력이 업데이트됩니다.</p>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 gap-4">
          {withPhoto.map((item) => {
            // SEO용 alt 텍스트: 제목 + 연도 + 카테고리 + 설명
            const altText = [
              item.title,
              item.year,
              item.description,
            ]
              .filter(Boolean)
              .join(" | ");

            return (
              <div
                key={item.id}
                className="group relative break-inside-avoid mb-4 overflow-hidden rounded-lg"
                title={altText}
              >
                <Image
                  src={item.image_url!}
                  alt={altText}
                  width={800}
                  height={600}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105 block"
                />
                {/* 호버 오버레이 — 텍스트는 시각적으로 숨겨두되 접근성 유지 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3 opacity-0 group-hover:opacity-100">
                  <div>
                    <p className="text-white text-xs font-medium leading-snug line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-white/70 text-[10px] mt-0.5">
                      {item.year} · {item.category}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-10 text-xs text-center text-gray-400">
        더 많은 활동 사진 및 영상은 순차적으로 업데이트됩니다.
      </p>
    </section>
  );
}
