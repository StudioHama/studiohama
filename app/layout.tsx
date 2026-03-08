import type { Metadata, Viewport } from "next";
import { Noto_Serif_KR, Noto_Sans_KR, Gowun_Dodum, Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AnalyticsSpeedInsights } from "../components/AnalyticsSpeedInsights";

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
  preload: true,
});

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: true,
});

const gowunDodum = Gowun_Dodum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gowun-dodum",
  display: "swap",
  preload: false,
});

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nanum-myeongjo",
  display: "swap",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hama-vocal.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "하마 보컬 스튜디오 | 박준열 성악가",
    template: "%s | 하마 보컬 스튜디오",
  },
  description:
    "삼척 하마 보컬 스튜디오. 한양대 성악과 출신, 황해도무형문화재 제3호 놀량사거리 전수자 박준열의 프리미엄 보컬 레슨.",
  keywords: [
    "하마 보컬 스튜디오",
    "삼척 성악",
    "박준열",
    "보컬 레슨",
    "삼척 음악학원",
    "성악 레슨",
    "삼척시립합창단",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "하마 보컬 스튜디오",
    title: "하마 보컬 스튜디오 | 박준열 성악가",
    description: "프리미엄 보컬 레슨, 삼척 하마 보컬 스튜디오.",
    url: siteUrl,
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 400,
        alt: "하마 보컬 스튜디오",
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "하마 보컬 스튜디오",
  "url": siteUrl,
  "description": "삼척 하마 보컬 스튜디오. 박준열 성악가의 프리미엄 보컬 레슨 스튜디오.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "삼척시",
    "addressRegion": "강원도",
    "addressCountry": "KR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+82-10-2239-1840",
    "contactType": "customer service",
    "areaServed": "KR",
    "availableLanguage": "Korean"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={`${notoSerif.variable} ${notoSans.variable} ${gowunDodum.variable} ${nanumMyeongjo.variable}`}>
      <body className="font-sans min-h-screen bg-[#ffffff] text-[#111111] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="md:ml-[120px] min-h-screen">
          {children}
        </main>
        <Footer />
        <AnalyticsSpeedInsights />
      </body>
    </html>
  );
}
