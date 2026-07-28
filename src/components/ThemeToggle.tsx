"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { playClick } from "@/lib/sound";
import { SPRING_SNAPPY } from "@/lib/motion";
import { MoonIcon, SunIcon } from "./ModernIcons";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        playClick();
        toggle();
      }}
      whileHover={{ y: -1, scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={SPRING_SNAPPY}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy text-cream shadow-sm dark:bg-cream dark:text-navy"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={SPRING_SNAPPY}
          className="flex items-center justify-center"
        >
          {isDark ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
