"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type PaperPanelProps = {
  children: ReactNode;
  className?: string;
  tilt?: number;
  as?: "div" | "section";
};

/**
 * A cream "paper" card with a hand-drawn wobbly ink border.
 * The border is a single SVG path stretched to fill the panel,
 * so every panel gets a slightly imperfect, sketched-by-hand outline.
 */
export default function PaperPanel({
  children,
  className = "",
  tilt = 0,
}: PaperPanelProps) {
  return (
    <motion.div
      className={`relative bg-paper ${className}`}
      style={{ rotate: tilt }}
      whileHover={{ rotate: tilt === 0 ? 0 : tilt * 0.4 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-charcoal/80"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path
          d="M9,14 C4,90 3,210 10,286 C110,296 290,295 391,284 C397,200 396,70 389,11 C270,3 120,5 9,14 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
      <div className="relative p-6 sm:p-8">{children}</div>
    </motion.div>
  );
}
