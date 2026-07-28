"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { playClick } from "@/lib/sound";
import { SPRING_SNAPPY } from "@/lib/motion";
import { useWindowManager } from "@/lib/windowManager";

// Explicit column/row placement so the second column can start partway
// down, lined up with a specific row in the first column, instead of
// being forced to start at the top by CSS grid's auto-flow.
const items = [
  { icon: "/folder.png", label: "Projects", href: "#work-window", col: 1, row: 1 },
  { icon: "/globe.png", label: "About Me", href: "#about-window", openWindow: "about" as const, col: 1, row: 2 },
  { icon: "/computer.png", label: "Development", href: "/work/knokknok", col: 1, row: 3 },
  { icon: "/movie.png", label: "Case Studies", href: "#work-window", col: 1, row: 4 },
  { icon: "/paper.png", label: "Notes.txt", href: "#notepad-window", col: 1, row: 5 },
  { icon: "/bin.png", label: "Old Experiments", href: "#", toast: true, col: 1, row: 6 },
  { icon: "/search.png", label: "Search", href: "#", toast: true, col: 1, row: 7 },
  { icon: "/download.png", label: "Resume.pdf", href: "#", toast: true, col: 2, row: 5 },
  { icon: "/phone.png", label: "Contact", href: "mailto:naransuvd57@gmail.com", col: 2, row: 6 },
  { icon: "/calculator.png", label: "Playground", href: "#", openWindow: "playground" as const, col: 2, row: 7 },
];

/**
 * Vertical desktop-icon column running down the left edge of the OS canvas.
 * Uses the user-supplied Win98-style icon pack (public/*.png) instead of
 * hand-built SVGs — real raster art, optimized/served via next/image.
 */
export default function IconSidebar({ className = "" }: { className?: string }) {
  const [toast, setToast] = useState<string | null>(null);
  const { open: openWindow } = useWindowManager();

  return (
    <div
      className={`relative grid grid-cols-2 grid-rows-7 gap-x-8 gap-y-2 ${className}`}
    >
      {items.map((item) => (
        <motion.a
          key={item.label}
          href={item.href}
          onClick={(e) => {
            playClick();
            if (item.openWindow) {
              e.preventDefault();
              openWindow(item.openWindow);
              return;
            }
            if (item.toast) {
              e.preventDefault();
              setToast(item.label);
              setTimeout(() => setToast(null), 1600);
            }
          }}
          whileHover={{ y: -2 }}
          whileTap={{ y: 1, scale: 0.97 }}
          transition={SPRING_SNAPPY}
          style={{ gridColumn: item.col, gridRow: item.row }}
          className="flex w-[220px] flex-col items-center gap-1"
        >
          <span className="relative block h-28 w-28">
            <Image src={item.icon} alt={item.label} fill sizes="112px" className="object-contain" />
          </span>
          <span className="whitespace-nowrap text-center font-mono text-base font-bold leading-[1.15] text-black">
            {item.label}
          </span>
        </motion.a>
      ))}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={SPRING_SNAPPY}
            className="win-outset absolute -right-2 top-1/2 z-20 -translate-y-1/2 translate-x-full whitespace-nowrap bg-winface px-2 py-1 font-mono text-[0.65rem] text-black"
          >
            coming soon
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
