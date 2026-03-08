import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/intro", label: "소개" },
  { href: "/blog", label: "블로그" },
  { href: "/classes", label: "수업 안내" },
  { href: "/activities", label: "활동" },
  { href: "/contact", label: "문의하기" },
];

export function Footer() {
  const phone = process.env.NEXT_PUBLIC_PHONE ?? "010-2239-1840";
  const address = process.env.NEXT_PUBLIC_ADDRESS ?? "강원도 삼척시";

  return (
    <footer className="bg-[#111] text-white border-t border-white/10">
      <div className="max-w-2xl mx-auto px-6 py-10 md:ml-[120px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* 브랜드 */}
          <div>
            <Link href="/" className="font-serif text-lg font-semibold text-white">
              하마 보컬 스튜디오
            </Link>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              삼척 프리미엄 성악 스튜디오
              <br />
              박준열 성악가의 1:1 맞춤 레슨
            </p>
          </div>

          {/* 링크 + 연락처 */}
          <div className="flex flex-col gap-6">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a
                  href={`tel:${phone.replace(/-/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 pt-6 border-t border-white/10 text-xs text-white/40 text-center">
          © {new Date().getFullYear()} 하마 보컬 스튜디오. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
