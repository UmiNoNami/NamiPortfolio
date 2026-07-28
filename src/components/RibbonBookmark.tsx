"use client";

import { motion } from "framer-motion";

/** A ribbon "bookmark" hanging from the bottom of the notebook page. */
export default function RibbonBookmark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <motion.svg
      viewBox="0 0 40 90"
      className={`text-ink ${className}`}
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "top center" }}
    >
      <path
        d="M4 0h32v78L20 66 4 78V0Z"
        fill="currentColor"
        stroke="#8C2F20"
        strokeWidth="1"
      />
    </motion.svg>
  );
}
