"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { playClick } from "@/lib/sound";
import { SPRING_SNAPPY } from "@/lib/motion";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
};

export default function PixelButton({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: Props) {
  const palette =
    variant === "solid" ? "bg-winnavy text-white" : "bg-winface text-black";

  const content = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ y: 1, scale: 0.98 }}
      transition={SPRING_SNAPPY}
      className={`win-outset inline-flex items-center gap-2 px-5 py-2.5 font-pixel text-xs sm:text-sm ${palette} ${className}`}
    >
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        onClick={() => playClick()}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="inline-block" onClick={() => playClick()}>
      {content}
    </Link>
  );
}
