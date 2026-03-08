import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "활동 | 하마 보컬 스튜디오",
  description:
    "박준열 성악가의 공연, 무대, 행사 활동 기록. 오페라, 합창, 민요 무대 등 다양한 활동을 소개합니다.",
};

const ACTIVITIES = [
  {
    year: "2025",
    title: "강(江)의 소리, 꽃보자기에 물들다",
    place: "김포 한옥마을 천현정 광장",
    type: "공연",
  },
  {
    year: "2024",
    title: "서도소리와 향연",
    place: "통진두레문화센터",
    type: "공연",
  },
  {
    year: "2023",
    title: "김포 옛 잡가를 만나다",
    place: "김포아트홀",
    type: "공연",
  },
  {
    year: "2015 – 2022",
    title: "국립오페라단 갈라콘서트 (카르멘, 라트라비아타 외)",
    place: "서울 예술의전당",
    type: "오페라",
  },
  {
    year: "2014",
    title: "카르멘",
    place: "세종문화회관",
    type: "오페라",
  },
  {
    year: "2008",
    title: "루치아 디 람메르무어",
    place: "대전 예술의전당",
    type: "오페라",
  },
  {
    year: "2006",
    title: "파우스트",
    place: "서울 예술의전당",
    type: "오페라",
  },
];

export default function ActivitiesPage() {
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
      <div className="border-t border-[#111]/10">
        {ACTIVITIES.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-y-1 md:gap-x-4 py-5 border-b border-[#111]/5 hover:bg-[#111]/[0.015] transition-colors"
          >
            <span className="font-mono text-sm tabular-nums text-gray-400 whitespace-nowrap">
              {item.year}
            </span>
            <div className="min-w-0">
              <p className="font-medium text-[#111] leading-snug">{item.title}</p>
              <p className="text-sm text-gray-500 mt-0.5">{item.place}</p>
            </div>
            <span className="hidden md:inline-block text-xs text-gray-400 font-medium self-start mt-1 shrink-0 whitespace-nowrap">
              {item.type}
            </span>
          </div>
        ))}
      </div>

      {/* 업데이트 안내 */}
      <p className="mt-10 text-sm text-center text-gray-400">
        더 많은 활동 사진 및 영상은 순차적으로 업데이트됩니다.
      </p>
    </section>
  );
}
