"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playClick } from "@/lib/sound";
import { EASE_SMOOTH, SPRING_SNAPPY } from "@/lib/motion";
import { useAboutModal } from "@/lib/aboutModal";
import { useResumeModal } from "@/lib/resumeModal";
import { useWindowManager } from "@/lib/windowManager";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./ModernIcons";

const linkClass =
  "group relative py-1 transition-colors hover:text-navy dark:hover:text-cream";
const underlineClass =
  "pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-navy transition-transform duration-300 ease-out group-hover:scale-x-100 dark:bg-cream";

export default function Navbar() {
  const { open: openAbout } = useAboutModal();
  const { open: openResume } = useResumeModal();
  const { open: openPlayground } = useWindowManager();
  const [menuOpen, setMenuOpen] = useState(false);

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

      {/* Mobile menu: the same three actions as the desktop nav, since they
          were disappearing entirely below md with no fallback. */}
      <div className="relative md:hidden">
        <motion.button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            playClick();
            setMenuOpen((v) => !v);
          }}
          whileTap={{ scale: 0.9 }}
          transition={SPRING_SNAPPY}
          className="flex h-10 w-10 items-center justify-center rounded-full text-navy dark:text-cream"
        >
          {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </motion.button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={SPRING_SNAPPY}
              className="absolute right-0 top-12 z-[60] flex w-44 flex-col gap-1 rounded-2xl border border-navy/10 bg-cream p-2 font-sans text-[15px] font-medium text-navy shadow-lg dark:border-cream/10 dark:bg-ink dark:text-cream"
            >
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setMenuOpen(false);
                  openAbout();
                }}
                className="rounded-xl px-3 py-2 text-left transition-colors hover:bg-navy/5 dark:hover:bg-cream/10"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setMenuOpen(false);
                  openResume();
                }}
                className="rounded-xl px-3 py-2 text-left transition-colors hover:bg-navy/5 dark:hover:bg-cream/10"
              >
                Resume
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setMenuOpen(false);
                  openPlayground("playground");
                }}
                className="rounded-xl px-3 py-2 text-left transition-colors hover:bg-navy/5 dark:hover:bg-cream/10"
              >
                Playground
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ThemeToggle />
    </motion.nav>
  );
}
