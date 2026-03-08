import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의 | 하마 보컬 스튜디오",
  description: "하마 보컬 스튜디오 레슨 문의. 010-2239-1840",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-12 pb-24">
      <div className="mb-16">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#111] mb-4">
          문의
        </h1>
        <p className="text-[#666] leading-relaxed">
          레슨 및 공연 섭외 문의는 언제든지 연락 주세요.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-8">
          <InfoItem label="Contact">
            <a
              href="tel:01022391840"
              className="text-[#111] hover:underline font-bold text-lg block mb-1"
            >
              010-2239-1840
            </a>
            <a
              href="mailto:amina7@naver.com"
              className="text-[#666] hover:text-[#111] text-sm"
            >
              amina7@naver.com
            </a>
          </InfoItem>

          <InfoItem label="Location">
            강원도 삼척시
          </InfoItem>
        </div>

        <div className="space-y-8">
          <InfoItem label="Lessons">
            <div className="space-y-1 text-[#666] text-sm leading-relaxed">
              <p>성악 / 보컬 / 민요</p>
              <p>개인 및 단체 레슨 가능</p>
              <p>시간 조율 가능 (사전 문의 필수)</p>
            </div>
          </InfoItem>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold text-[#999] uppercase tracking-wider mb-3 border-l-2 border-[#111]/20 pl-3">
        {label}
      </h3>
      <div className="text-sm leading-relaxed text-[#111] pl-3.5 [&_a]:text-[#111]">
        {children}
      </div>
    </div>
  );
}
