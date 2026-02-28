"use client";

type Props = {
  url: string;
  title: string;
};

const iconClass = "w-5 h-5";

function XIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function NaverIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
    </svg>
  );
}

function CopyLinkIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default function ShareButton({ url, title }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "X (트위터)로 공유",
      icon: <XIcon />,
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: "페이스북으로 공유",
      icon: <FacebookIcon />,
    },
    {
      href: `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${encodedTitle}`,
      label: "네이버로 공유",
      icon: <NaverIcon />,
    },
  ];

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      alert("주소가 복사되었습니다. 카카오톡 등에 붙여넣기 해주세요!");
    } catch (err) {
      console.error("Copy failed:", err);
      alert("주소 복사에 실패했습니다.");
    }
  }

  const btnClass =
    "flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:opacity-90 hover:scale-105 transition-all duration-200";

  return (
    <div className="flex items-center gap-3" role="group" aria-label="SNS 공유">
      {shareLinks.map(({ href, label, icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          className={btnClass}
        >
          {icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        title="링크 복사"
        className={btnClass}
      >
        <CopyLinkIcon />
      </button>
    </div>
  );
}
