"use client";

import dynamic from "next/dynamic";

// dynamic({ ssr: false }) must live in a Client Component — not a Server Component.
// ShareButton uses navigator.clipboard (event-handler only), so we skip its SSR output.
const ShareButton = dynamic(() => import("./ShareButton"), { ssr: false });

type Props = { url: string; title: string };

export default function ShareButtonLazy({ url, title }: Props) {
  return <ShareButton url={url} title={title} />;
}
