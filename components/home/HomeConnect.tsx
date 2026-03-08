import Link from "next/link";

export function HomeConnect() {
  return (
    <div className="mt-14 mb-2">
      <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-4">
        Connect
      </p>
      <ul className="space-y-2.5">
        <li>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[#555] hover:text-[#111] transition-colors"
          >
            Instagram ↗
          </a>
        </li>
        <li>
          <Link
            href="/blog"
            className="text-[13px] text-[#555] hover:text-[#111] transition-colors"
          >
            블로그 ↗
          </Link>
        </li>
        <li>
          <Link
            href="/privacy"
            className="text-[13px] text-[#555] hover:text-[#111] transition-colors"
          >
            개인정보처리방침 ↗
          </Link>
        </li>
      </ul>
    </div>
  );
}
