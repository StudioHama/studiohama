import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

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

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("activities")
      .select("id, year, title, description, category, image_url")
      .order("created_at", { ascending: false });
    activities = data ?? [];
  } catch {
    // DB not yet configured — show empty state
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-12 pb-24">
      {/* 헤더 */}
      <div className="mb-12">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#111] mb-4">
          활동
        </h1>
        <p className="text-[#666] leading-relaxed">
          무대 위에서 쌓아온 박준열 성악가의 공연 및 활동 기록입니다.
          <br />
          오페라, 합창, 민요 무대를 넘나들며 끊임없이 소리를 탐구합니다.
        </p>
      </div>

      {/* 활동 목록 */}
      {activities.length === 0 ? (
        <div className="border-t border-[#111]/10 py-16 text-center text-gray-400">
          <p className="text-sm">활동 기록을 준비 중입니다.</p>
          <p className="text-xs mt-1">곧 공연 및 활동 이력이 업데이트됩니다.</p>
        </div>
      ) : (
        <div className="border-t border-[#111]/10">
          {activities.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 py-5 border-b border-[#111]/5 hover:bg-[#111]/[0.015] transition-colors"
            >
              {/* Year */}
              <span className="font-mono text-sm tabular-nums text-gray-400 whitespace-nowrap w-[88px] shrink-0 pt-0.5">
                {item.year}
              </span>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#111] leading-snug">{item.title}</p>
                {item.description && (
                  <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                )}
              </div>

              {/* Photo thumbnail (if present) */}
              {item.image_url && (
                <div className="shrink-0 hidden sm:block">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={80}
                    height={60}
                    className="w-20 h-[60px] object-cover rounded border border-[#111]/10"
                  />
                </div>
              )}

              {/* Category */}
              <span className="shrink-0 text-xs text-gray-400 font-medium whitespace-nowrap pt-0.5 hidden md:block w-12 text-right">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="mt-10 text-sm text-center text-gray-400">
        더 많은 활동 사진 및 영상은 순차적으로 업데이트됩니다.
      </p>
    </section>
  );
}
