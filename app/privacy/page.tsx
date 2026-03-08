import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "하마 보컬 스튜디오 개인정보처리방침",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <article className="px-8 py-10 sm:px-12 sm:py-14 max-w-[600px]">
      <p className="text-[11px] tracking-[0.28em] text-gray-400 uppercase mb-3">
        Privacy Policy
      </p>
      <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111] leading-snug mb-10">
        개인정보처리방침
      </h1>

      <div className="space-y-8 text-[14px] text-[#444] leading-[1.95]">
        <section>
          <h2 className="font-serif text-base font-semibold text-[#111] mb-3">
            1. 수집하는 개인정보
          </h2>
          <p>
            하마 보컬 스튜디오(이하 "본 스튜디오")는 레슨 문의 시 이름, 연락처,
            문의 내용 등 최소한의 정보만을 수집합니다. 별도의 회원가입 절차 없이
            운영되며, 방문자의 개인정보는 수집 목적 외에 사용되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-base font-semibold text-[#111] mb-3">
            2. 개인정보의 이용 목적
          </h2>
          <p>
            수집된 정보는 레슨 상담 및 일정 조율 목적으로만 사용됩니다.
            수집된 개인정보는 목적 달성 후 즉시 파기하며, 제3자에게 제공하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-base font-semibold text-[#111] mb-3">
            3. 쿠키(Cookie) 사용
          </h2>
          <p>
            본 웹사이트는 Vercel Analytics 및 Speed Insights를 통해 익명의 방문자
            통계를 수집합니다. 이는 개인을 식별하지 않으며, 서비스 품질 향상 목적으로만
            사용됩니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-base font-semibold text-[#111] mb-3">
            4. 개인정보 보호 책임자
          </h2>
          <p>
            성명: 박준열<br />
            연락처: 레슨 문의 페이지를 통해 연락주시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-base font-semibold text-[#111] mb-3">
            5. 시행일
          </h2>
          <p>이 방침은 2026년 3월 9일부터 시행됩니다.</p>
        </section>
      </div>

      <div className="mt-12">
        <Link
          href="/"
          className="text-[13px] text-[#555] hover:text-[#111] transition-colors"
        >
          ← 홈으로 돌아가기
        </Link>
      </div>
    </article>
  );
}
