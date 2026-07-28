"use client";

import { motion } from "framer-motion";
import { SPRING_SNAPPY, SPRING_SOFT } from "@/lib/motion";

/** One of the stacked "Design / Develop / Prototype / Collaborate" tags. */
export default function RibbonTag({
  label,
  rotate,
  delay = 0,
}: {
  label: string;
  rotate: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16, rotate: rotate - 6 }}
      animate={{ opacity: 1, x: 0, rotate }}
      whileHover={{ rotate: 0, scale: 1.04, transition: SPRING_SNAPPY }}
      transition={{ ...SPRING_SOFT, delay }}
      className="relative w-fit border-2 border-ink bg-paper px-4 py-1.5 font-pixel text-xs shadow-pixel-sm sm:text-sm"
    >
      {label}
    </motion.div>
  );
}
