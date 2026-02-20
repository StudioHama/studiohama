import Image from "next/image";

export function HomeBadges() {
  return (
    <section className="mt-16 flex flex-col items-center border-t border-gray-100 pt-10" aria-label="인증 및 파트너 로고">
      <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Authorized By</p>
      <div className="flex flex-wrap items-center justify-center gap-8 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 min-h-[52px]">
        <Image
          src="/badge-10th.webp"
          alt="김포국악원 10주년 (SINCE 2015)"
          width={140}
          height={52}
          className="h-8 w-auto object-contain sm:h-10"
        />
        <Image
          src="/badge-foundation.webp"
          alt="김포문화재단"
          width={100}
          height={20}
          className="h-5 w-auto object-contain sm:h-6"
        />
        <Image
          src="/badge-education.webp"
          alt="교육기부 진로체험 인증기관 (교육부)"
          width={150}
          height={100}
          className="h-10 w-auto object-contain sm:h-12"
        />
      </div>
    </section>
  );
}
