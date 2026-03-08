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
      <section className="relative w-full h-[70vh] min-h-[480px] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="하마 보컬 스튜디오"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-12 sm:px-14 sm:pb-16">
          <p className="font-sans text-xs tracking-[0.25em] text-white/70 uppercase mb-3">
            Samcheok · Hama Vocal Studio
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight max-w-xl">
            소리로 만나는<br />새로운 세계
          </h1>
          <p className="mt-4 font-sans text-sm sm:text-base text-white/80 max-w-md leading-relaxed">
            성악과 민요, 두 개의 언어로 노래하는 박준열의 프리미엄 보컬 스튜디오
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 bg-white text-[#111] font-sans font-medium text-sm px-6 py-3 rounded-sm hover:bg-white/90 transition-colors"
            >
              수업 안내
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/60 text-white font-sans font-medium text-sm px-6 py-3 rounded-sm hover:bg-white/10 transition-colors"
            >
              레슨 문의
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-2xl mx-auto px-8 py-16 sm:px-14 sm:py-20">
        <p className="font-sans text-xs tracking-[0.25em] text-gray-400 uppercase mb-6">
          About
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111] leading-snug mb-6">
          박준열 <span className="font-sans text-base font-normal text-gray-500">성악가 · 부원장</span>
        </h2>
        <div className="space-y-4 font-sans text-[#333] text-[15px] leading-[1.9]">
          <p>
            한양대학교 성악과를 졸업하고, 황해도무형문화재 제3호 놀량사거리 전수자로서
            오페라와 민요의 경계를 자유롭게 넘나들며 활동하고 있습니다.
          </p>
          <p>
            삼척시립합창단 단원이자 김포오페라단 단장으로서, 무대 위에서 쌓은
            경험을 그대로 레슨에 담아냅니다. 목소리의 잠재력을 찾아내는 것,
            그것이 하마 보컬 스튜디오가 추구하는 교육입니다.
          </p>
        </div>
        <Link
          href="/intro"
          className="inline-flex items-center gap-2 mt-8 font-sans text-sm text-[#111] border-b border-[#111]/30 pb-0.5 hover:border-[#111] transition-colors"
        >
          자세한 소개 보기 →
        </Link>
      </section>

      {/* Feature highlights */}
      <section className="border-t border-[#111]/8 bg-[#fafaf9]">
        <div className="max-w-2xl mx-auto px-8 py-14 sm:px-14 sm:py-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <p className="font-serif text-lg font-semibold text-[#111] mb-2">성악 레슨</p>
            <p className="font-sans text-sm text-gray-500 leading-relaxed">
              클래식 발성부터 이탈리아 오페라까지, 체계적인 커리큘럼으로 진행합니다.
            </p>
          </div>
          <div>
            <p className="font-serif text-lg font-semibold text-[#111] mb-2">민요·판소리</p>
            <p className="font-sans text-sm text-gray-500 leading-relaxed">
              무형문화재 전수자가 직접 전통 성음의 깊이를 알려드립니다.
            </p>
          </div>
          <div>
            <p className="font-serif text-lg font-semibold text-[#111] mb-2">무대 준비</p>
            <p className="font-sans text-sm text-gray-500 leading-relaxed">
              오디션·콩쿠르·발표회 등 무대를 위한 집중 코칭을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-8 py-16 sm:px-14 sm:py-20 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111] mb-4">
          레슨 문의는 언제든 환영합니다
        </h2>
        <p className="font-sans text-sm text-gray-500 mb-8">
          목소리는 누구에게나 있습니다. 그 소리를 제대로 꺼내는 방법을 함께 찾아드립니다.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#111] text-white font-sans font-medium text-sm px-8 py-3.5 rounded-sm hover:bg-[#333] transition-colors"
        >
          문의하기
        </Link>
      </section>
    </>
  );
}
