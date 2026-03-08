import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "수업 안내 | 하마 보컬 스튜디오",
  description:
    "삼척 하마 보컬 스튜디오의 수업 안내. 성악 전공·입시 과정부터 취미 보컬까지, 박준열 성악가의 1:1 맞춤 레슨.",
};

export default function ClassesPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-12 pb-24">
      {/* 헤더 */}
      <div className="mb-16">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#111] mb-4">
          수업 안내
        </h1>
        <p className="text-[#666] leading-relaxed">
          성악 전공·입시 심화 과정부터 취미 보컬까지,
          <br />
          박준열 성악가가 직접 설계한 1:1 맞춤 레슨을 경험해 보세요.
          <br />
          빠른 상담 :{" "}
          <a href="tel:010-2239-1840" className="underline hover:no-underline">
            010-2239-1840
          </a>
        </p>
      </div>

      {/* 1. 성악 / 클래식 보컬 */}
      <div className="mb-20">
        <h2 className="text-xl font-bold text-[#111] mb-6 border-b border-[#111]/10 pb-2">
          1. 성악 · 클래식 보컬
        </h2>
        <p className="text-[#666] text-sm leading-relaxed mb-6">
          오페라, 아리아, 가곡 등 클래식 레퍼토리를 체계적으로 배우는 과정입니다.
          발성 교정부터 무대 표현까지 전 과정을 커버합니다.
        </p>

        <div className="border-t border-[#111]/10">
          <ClassRow
            category="전공·입시 과정"
            target="성악 전공 / 입시생 / 지도자"
            time="개인지도 (일정 협의)"
            price="200,000원~"
            unit="/ 1시간"
          />
          <ClassRow
            category="성인 취미반"
            target="성인 일반 / 합창단원"
            time="주 1~2회 (시간 협의)"
            price="100,000원~"
            unit="/ 월 (주 1회)"
          />
          <ClassRow
            category="청소년반"
            target="중·고등학생"
            time="주 1회 (시간 협의)"
            price="100,000원~"
            unit="/ 월 (주 1회)"
          />
        </div>
      </div>

      {/* 2. 서도민요 · 전통 보컬 */}
      <div className="mb-20">
        <h2 className="text-xl font-bold text-[#111] mb-6 border-b border-[#111]/10 pb-2">
          2. 서도민요 · 전통 보컬
        </h2>
        <p className="text-[#666] text-sm leading-relaxed mb-6">
          황해도무형문화재 제3호 놀량사거리 전수자인 박준열 선생님이 직접 지도하는
          서도소리 및 전통 민요 과정입니다.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl p-6 border border-[#111]/10 bg-[#111]/[0.02] hover:border-[#111]/20 transition-colors">
            <span className="inline-block px-2 py-1 mb-4 text-xs font-bold text-[#111] bg-[#111]/10 rounded-md">
              전수 과정
            </span>
            <h3 className="text-lg font-bold text-[#111] mb-2">
              서도소리 정규반
            </h3>
            <p className="text-xs text-[#999] mb-3 font-medium">
              대상: 전통 소리에 관심 있는 성인
            </p>
            <p className="text-sm text-[#666] leading-relaxed">
              놀량사거리, 수심가 등 서도소리의 핵심 레퍼토리를 체계적으로
              학습합니다. 전수자 자격증 취득을 목표로 하는 분도 환영합니다.
            </p>
          </div>

          <div className="rounded-xl p-6 border border-[#111]/10 bg-[#111]/[0.02] hover:border-[#111]/20 transition-colors">
            <span className="inline-block px-2 py-1 mb-4 text-xs font-bold text-[#111] bg-[#111]/10 rounded-md">
              취미 입문
            </span>
            <h3 className="text-lg font-bold text-[#111] mb-2">
              민요 취미반
            </h3>
            <p className="text-xs text-[#999] mb-3 font-medium">
              대상: 민요가 처음인 성인 누구나
            </p>
            <p className="text-sm text-[#666] leading-relaxed">
              아리랑, 밀양아리랑 등 친숙한 민요부터 시작해 우리 소리의 매력을
              천천히 발견해 가는 입문 과정입니다.
            </p>
          </div>
        </div>
      </div>

      {/* 수업 안내 사항 */}
      <div className="mb-20 rounded-xl p-6 border border-[#111]/10 bg-[#111]/[0.02]">
        <h2 className="text-base font-bold text-[#111] mb-4">수업 안내 사항</h2>
        <ul className="space-y-2 text-sm text-[#666]">
          <CheckItem text="모든 수업은 1:1 개인 레슨을 기본으로 합니다." />
          <CheckItem text="첫 수업 전 무료 상담을 통해 수준과 목표를 파악합니다." />
          <CheckItem text="수업 장소: 강원도 삼척시 (정확한 위치는 상담 시 안내)" />
          <CheckItem text="수강료 및 시간표는 상담 후 개별 조율됩니다." />
        </ul>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="tel:010-2239-1840"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#111] text-white font-bold rounded-lg hover:bg-[#333] transition-colors shadow-sm"
        >
          전화 상담하기
        </a>
        <a
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-[#111]/20 text-[#111] font-bold rounded-lg hover:bg-[#111]/5 transition-colors"
        >
          문의 남기기
        </a>
      </div>
      <p className="mt-3 text-center text-xs text-[#999]">
        * 단체 문의 및 출강 요청도 언제든 환영합니다.
      </p>
    </section>
  );
}

function ClassRow({
  category,
  target,
  time,
  price,
  unit,
}: {
  category: string;
  target: string;
  time: string;
  price: string;
  unit: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-2 md:gap-4 py-4 border-b border-[#111]/5 hover:bg-[#111]/[0.02] transition-colors leading-relaxed">
      <div>
        <h3 className="font-semibold text-[#111]">{category}</h3>
        <span className="text-xs text-[#666]">{target}</span>
      </div>
      <div className="flex items-center text-sm text-[#666]">
        <span className="md:hidden font-medium mr-2 text-[#999]">시간:</span>
        {time}
      </div>
      <div className="text-right">
        <span className="block font-bold text-[#111] tabular-nums">{price}</span>
        <span className="text-xs text-[#999]">{unit}</span>
      </div>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start text-sm text-[#666]">
      <svg
        className="w-4 h-4 text-[#999] mr-2 mt-0.5 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      {text}
    </li>
  );
}
