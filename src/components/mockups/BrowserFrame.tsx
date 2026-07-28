"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SPRING_SOFT } from "@/lib/motion";

// A clean "video/screenshot inside a browser window" mockup — dark chrome,
// three window dots, 16:9 content area. No real device geometry to keep it
// simple and reliably clean at any width.
export default function BrowserFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={SPRING_SOFT}
      className={`overflow-hidden rounded-[22px] bg-navy shadow-xl dark:bg-midnight-card ${className}`}
    >
      <div className="flex items-center gap-1.5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
      </div>
      <div className="relative aspect-video w-full overflow-hidden">{children}</div>
    </motion.div>
  );
}
