"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { playClick } from "@/lib/sound";

// A plain Next.js Link with the site's click sound wired in — exists so
// Server Component pages (like the project detail route) can drop in a
// clickable, sound-enabled link without needing an inline onClick handler
// on a host element (which Server Components can't have).
export default function SoundLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} onClick={() => playClick()} className={className}>
      {children}
    </Link>
  );
}
