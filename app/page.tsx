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
      <article className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111] tracking-tight">
          소리로 만나는 새로운 세계
        </h1>

        <figure className="mt-8 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={HERO_IMAGE}
            alt="하마 보컬 스튜디오"
            priority
            fetchPriority="high"
            width={1000}
            height={563}
            className="w-full aspect-video object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </figure>

        <div className="mt-10 space-y-6 font-sans text-[#111] leading-relaxed">
          <p>
            성악과 민요, 두 개의 언어로 노래하는{" "}
            <Link href="/intro" className="text-[#111] underline hover:no-underline font-medium">
              박준열
            </Link>
            의 스튜디오에 오신 것을 환영합니다.
          </p>
          <p>
            한양대학교 성악과를 졸업하고, 황해도무형문화재 제3호 놀량사거리 전수자로서
            오페라와 민요의 경계를 자유롭게 넘나들며 활동하고 있습니다.
            삼척시립합창단 단원이자 김포오페라단 단장으로서 무대 위의 경험을 레슨에 그대로 담아냅니다.
          </p>
          <p>
            목소리는 누구에게나 있습니다. 그 소리를 제대로 꺼내는 방법을 함께 찾아드립니다.
          </p>
          <p className="font-medium text-lg pt-4">
            레슨 문의는 언제든 환영합니다.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-[#111]/10">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Quick Links</p>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/intro" className="text-sm text-gray-500 hover:text-black transition-colors">
                소개 →
              </Link>
            </li>
            <li>
              <Link href="/classes" className="text-sm text-gray-500 hover:text-black transition-colors">
                수업 안내 →
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-black transition-colors">
                문의하기 →
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
