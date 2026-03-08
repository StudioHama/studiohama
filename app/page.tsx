import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/main_image.webp";

export const metadata: Metadata = {
  title: "하마 보컬 스튜디오 | 박준열 성악가",
  description:
    "삼척 하마 보컬 스튜디오. 한양대 성악과 출신, 황해도무형문화재 제3호 놀량사거리 전수자 박준열의 프리미엄 보컬 레슨.",
  openGraph: {
    title: "하마 보컬 스튜디오 | 박준열 성악가",
    description: "성악과 민요를 자유롭게 넘나드는 음악 교육자, 박준열입니다.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <link rel="preload" as="image" href={HERO_IMAGE} fetchPriority="high" />

      {/* Hero */}
      <section className="relative w-full h-[75vh] min-h-[500px] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="하마 보컬 스튜디오"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

        <div className="absolute bottom-0 left-0 right-0 px-10 pb-14 sm:px-16 sm:pb-18">
          <p className="font-sans text-[11px] tracking-[0.3em] text-white/60 uppercase mb-4">
            Samcheok · Hama Vocal Studio
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.15] tracking-tight">
            소리로 만나는<br />새로운 세계
          </h1>
        </div>
      </section>

      {/* Main content — editorial column */}
      <div className="max-w-xl px-10 sm:px-16 mx-0">

        {/* About */}
        <section className="pt-16 pb-14 border-b border-[#111]/10">
          <p className="font-sans text-[11px] tracking-[0.3em] text-gray-400 uppercase mb-8">
            About
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111] leading-snug mb-2">
            박준열
          </h2>
          <p className="font-sans text-sm text-gray-400 mb-8">성악가 · 하마 보컬 스튜디오 부원장</p>

          <div className="space-y-5 font-sans text-[15px] text-[#333] leading-[1.95]">
            <p>
              한양대학교 성악과를 졸업하고, 황해도무형문화재 제3호 놀량사거리 전수자로서
              오페라와 민요의 경계를 자유롭게 넘나들며 활동하고 있습니다.
            </p>
            <p>
              삼척시립합창단 단원이자 김포오페라단 단장으로서, 무대 위에서 쌓은
              경험을 그대로 레슨에 담아냅니다.
            </p>
          </div>

          <Link
            href="/intro"
            className="inline-block mt-10 font-sans text-sm text-[#111] border-b border-[#111]/25 pb-px hover:border-[#111] transition-colors"
          >
            자세한 소개 →
          </Link>
        </section>

        {/* Lessons */}
        <section className="pt-14 pb-14 border-b border-[#111]/10">
          <p className="font-sans text-[11px] tracking-[0.3em] text-gray-400 uppercase mb-8">
            Lessons
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#111] mb-2">성악 레슨</h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                클래식 발성부터 이탈리아 오페라까지,<br />
                체계적인 커리큘럼으로 진행합니다.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#111] mb-2">민요 · 판소리</h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                무형문화재 전수자가 직접 전통 성음의<br />
                깊이를 알려드립니다.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#111] mb-2">무대 준비</h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                오디션 · 콩쿠르 · 발표회 등<br />
                무대를 위한 집중 코칭을 제공합니다.
              </p>
            </div>
          </div>

          <Link
            href="/classes"
            className="inline-block mt-10 font-sans text-sm text-[#111] border-b border-[#111]/25 pb-px hover:border-[#111] transition-colors"
          >
            수업 안내 →
          </Link>
        </section>

        {/* Contact CTA */}
        <section className="pt-14 pb-20">
          <p className="font-sans text-[11px] tracking-[0.3em] text-gray-400 uppercase mb-8">
            Contact
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111] leading-snug mb-5">
            레슨 문의는<br />언제든 환영합니다
          </h2>
          <p className="font-sans text-[15px] text-gray-500 leading-relaxed mb-10">
            목소리는 누구에게나 있습니다.<br />
            그 소리를 제대로 꺼내는 방법을 함께 찾아드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-white bg-[#111] px-7 py-3 hover:bg-[#333] transition-colors"
          >
            문의하기
          </Link>
        </section>

      </div>
    </>
  );
}
