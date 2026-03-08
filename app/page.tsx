import type { Metadata } from "next";
import Image from "next/image";
import { HomeBadges } from "@/components/home/HomeBadges";
import { HomeConnect } from "@/components/home/HomeConnect";

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
    <article className="px-8 py-10 sm:px-12 sm:py-14 max-w-[540px] mx-auto text-center">
      <link rel="preload" as="image" href={HERO_IMAGE} fetchPriority="high" />

      <p className="text-[11px] tracking-[0.28em] text-gray-400 uppercase mb-3">
        Samcheok Hama Vocal Studio
      </p>
      <h1 className="font-serif text-[1.85rem] sm:text-4xl font-semibold text-[#111] leading-snug mb-8">
        소리로 만나는<br />새로운 세계
      </h1>

      <figure className="mb-10">
        <Image
          src={HERO_IMAGE}
          alt="하마 보컬 스튜디오"
          width={520}
          height={360}
          priority
          fetchPriority="high"
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 540px"
        />
      </figure>

      <div className="space-y-6 text-[15px] text-[#333] leading-[1.95] text-center">
        <p>
          "성악은 어렵고 낯설다"는 편견, 우리도 잘 압니다. 하지만 실제로 만나보면
          클래식의 정수와 우리 고유의 민요 선율이 마음 깊은 곳에서 자연스럽게 스며드는
          음악도 없습니다.
        </p>
        <p>
          하마 보컬 스튜디오는{" "}
          <a href="/intro" className="underline underline-offset-2">
            황해도무형문화재 제3호 놀량사거리 전수자이신 박준열 부원장님
          </a>
          과 함께 운영하는 공간입니다. 이탈리아 오페라의 정통 발성과 우리 민요의
          진한 성음, 두 세계가 만나 전통의 깊이와 현대 음악교육의 체계가 어우러집니다.
        </p>
        <p>
          삼척시립합창단 단원이자 김포오페라단 단장으로 무대 위에서 쌓아온 경험을
          그대로 레슨에 담아냅니다. 단순히 노래를 가르치는 것이 아니라, 여러분 안에
          잠든 목소리의 가능성을 발견하고 꺼내드리는 것이 저희의 교육입니다.
        </p>
        <p>
          성악, 보컬, 민요, 판소리, 무대 준비까지. 나이와 실력에 관계없이 누구나
          편안하게 시작할 수 있습니다. 공연과 레슨 문의는 언제든 환영합니다.
        </p>
      </div>

      <HomeBadges />
      <HomeConnect />
    </article>
  );
}
