"use client";

import { motion } from "framer-motion";
import { playClick } from "@/lib/sound";
import { EASE_SMOOTH, SPRING_SNAPPY } from "@/lib/motion";
import { useAboutModal } from "@/lib/aboutModal";
import { useResumeModal } from "@/lib/resumeModal";
import { useWindowManager } from "@/lib/windowManager";
import ThemeToggle from "./ThemeToggle";

const linkClass =
  "group relative py-1 transition-colors hover:text-navy dark:hover:text-cream";
const underlineClass =
  "pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-navy transition-transform duration-300 ease-out group-hover:scale-x-100 dark:bg-cream";

export default function Navbar() {
  const { open: openAbout } = useAboutModal();
  const { open: openResume } = useResumeModal();
  const { open: openPlayground } = useWindowManager();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_SMOOTH }}
      className="flex items-center justify-between gap-6 py-2"
    >
      <motion.a
        href="/#top"
        onClick={() => playClick()}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={SPRING_SNAPPY}
        className="font-sans text-2xl font-extrabold tracking-tight text-navy dark:text-cream"
      >
        NAMI.
      </motion.a>

      <div className="hidden items-center gap-9 font-sans text-[15px] font-medium text-navy/80 dark:text-cream/75 md:flex">
        {/* About pops the notebook open on the same page instead of navigating. */}
        <button
          type="button"
          onClick={() => {
            playClick();
            openAbout();
          }}
          className={linkClass}
        >
          About
          <span className={underlineClass} />
        </button>

        {/* Resume opens inline on the same page instead of navigating to /resume.pdf. */}
        <button
          type="button"
          onClick={() => {
            playClick();
            openResume();
          }}
          className={linkClass}
        >
          Resume
          <span className={underlineClass} />
        </button>

        {/* Playground pops the Dumpling Dash game window open on the same page. */}
        <button
          type="button"
          onClick={() => {
            playClick();
            openPlayground("playground");
          }}
          className={linkClass}
        >
          Playground
          <span className={underlineClass} />
        </button>
      </div>

      <ThemeToggle />
    </motion.nav>
  );
}
