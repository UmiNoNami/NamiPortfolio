"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
};

/** A hand-drawn, slightly wobbly call-to-action button. */
export default function HandButton({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: Props) {
  const base =
    "relative z-20 pointer-events-auto inline-flex items-center gap-2 px-6 py-3 font-hand text-lg";
  const palette =
    variant === "solid"
      ? "bg-ink text-paper"
      : "bg-transparent text-ink";

  const content = (
    <motion.span
      className={`${base} ${palette} ${className}`}
      whileHover={{ rotate: [0, -1.5, 1.5, 0], scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.95, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
      >
        <path
          d="M6,8 C2,25 3,42 7,53 C60,58 150,57 194,52 C198,38 197,20 193,7 C140,2 55,3 6,8 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-20 pointer-events-auto inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="relative z-20 pointer-events-auto inline-block">
      {content}
    </Link>
  );
}
