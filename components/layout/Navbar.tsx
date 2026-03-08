"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/intro", label: "소개" },
  { href: "/blog", label: "블로그" },
  { href: "/classes", label: "수업" },
  { href: "/activities", label: "활동" },
  { href: "/contact", label: "문의" },
];

export function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav aria-label="메인 메뉴">
      {/* Desktop: fixed left sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-[120px] px-6 py-12 border-r border-[#111111]/10 flex-col gap-6 z-40">
        <div className="block w-full">
          <Link href="/" className="block hover:opacity-90 transition-opacity">
            <Image
              src="/logo.png"
              alt="삼척 성악 스튜디오"
              width={120}
              height={60}
              className="w-full h-14 sm:h-16 object-contain"
            />
          </Link>
        </div>
        <ul className="flex flex-col gap-4">
          {NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block text-left text-sm transition-colors ${
                    isActive
                      ? "text-[#111111] font-medium"
                      : "text-[#666666] hover:text-[#111111]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile: Logo left, horizontal menu right */}
      <div className="flex md:hidden items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 border-b border-[#111111]/10 min-h-[60px] relative z-[100]">
        <Link
          href="/"
          className="shrink-0 max-w-[100px] sm:max-w-[110px] hover:opacity-90 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt="삼척 성악 스튜디오"
            width={120}
            height={48}
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        <div className="flex flex-1 items-center justify-start gap-1 sm:gap-2 min-w-0 overflow-x-auto overflow-y-hidden min-h-[40px]">
          {NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 px-1.5 sm:px-2 text-[13px] sm:text-sm whitespace-nowrap rounded transition-colors shrink-0 ${
                  isActive
                    ? "text-[#111111] font-medium"
                    : "text-[#666666] hover:text-[#111111]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
