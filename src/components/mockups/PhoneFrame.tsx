"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SPRING_SOFT } from "@/lib/motion";

// Small rounded phone-shaped mockup for a gallery of screens.
export default function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -1 }}
      transition={SPRING_SOFT}
      className={`mx-auto w-full max-w-[200px] rounded-[2.25rem] border-[6px] border-navy bg-navy p-0 shadow-xl dark:border-midnight-card dark:bg-midnight-card ${className}`}
    >
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.75rem]">
        <span className="absolute left-1/2 top-2 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/30" />
        {children}
      </div>
    </motion.div>
  );
}
