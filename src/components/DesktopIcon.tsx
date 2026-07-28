"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { playClick } from "@/lib/sound";
import { SPRING_SNAPPY } from "@/lib/motion";

type Props = {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** "pill" = navy label chip (bottom dock). "plain" = flat black text (desktop sidebar). */
  labelStyle?: "pill" | "plain";
};

/** A classic "double-click me" desktop icon: glyph on top, label below. */
export default function DesktopIcon({
  href,
  label,
  children,
  className = "",
  onClick,
  labelStyle = "pill",
}: Props) {
  return (
    <motion.a
      href={href}
      onClick={(e) => {
        playClick();
        onClick?.(e);
      }}
      whileHover={{ y: -3 }}
      whileTap={{ y: 1, scale: 0.98 }}
      transition={SPRING_SNAPPY}
      className={`flex w-20 flex-col items-center gap-1.5 sm:w-24 ${className}`}
    >
      <span className="win-outset flex h-12 w-12 items-center justify-center bg-winface sm:h-14 sm:w-14">
        {children}
      </span>
      {labelStyle === "pill" ? (
        <span className="bg-winnavy px-1.5 py-0.5 text-center font-mono text-[0.6rem] leading-tight text-white sm:text-xs">
          {label}
        </span>
      ) : (
        <span className="text-center font-mono text-[0.6rem] leading-tight text-black sm:text-xs">
          {label}
        </span>
      )}
    </motion.a>
  );
}
