"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playClick } from "@/lib/sound";
import { EASE_SMOOTH, SPRING_SNAPPY } from "@/lib/motion";
import { useAboutModal } from "@/lib/aboutModal";
import { useResumeModal } from "@/lib/resumeModal";
import { useWindowManager } from "@/lib/windowManager";
import { useContactChat } from "@/lib/contactChat";
import AccessibilityPanel from "./AccessibilityPanel";
import { CloseIcon, MenuIcon } from "./ModernIcons";

const linkClass =
  "group relative rounded-md py-1 outline-none transition-colors hover:text-navy focus-visible:text-navy focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:hover:text-cream dark:focus-visible:text-cream dark:focus-visible:ring-cream/40 dark:focus-visible:ring-offset-midnight-card";
const underlineClass =
  "pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-navy transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 dark:bg-cream";
const mobileItemClass =
  "flex min-h-[44px] items-center rounded-xl px-3 py-2 text-left outline-none transition-colors hover:bg-navy/5 focus-visible:bg-navy/10 focus-visible:ring-2 focus-visible:ring-navy/40 dark:hover:bg-cream/10 dark:focus-visible:bg-cream/15 dark:focus-visible:ring-cream/40";

export default function Navbar({ floatingHome = false }: { floatingHome?: boolean }) {
  const { open: openAbout } = useAboutModal();
  const { open: openResume } = useResumeModal();
  const { open: openPlayground } = useWindowManager();
  const { open: openContact } = useContactChat();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleContact = () => {
    playClick();
    setMenuOpen(false);
    openContact();
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_SMOOTH }}
      className={`grid grid-cols-2 items-center gap-6 py-2 ${floatingHome ? "" : "md:grid-cols-[1fr_auto_1fr]"}`}
    >
      <motion.a
        href="/#top"
        onClick={() => playClick()}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={SPRING_SNAPPY}
        className="justify-self-start rounded-md font-sans text-2xl font-extrabold tracking-tight text-navy outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:text-cream dark:focus-visible:ring-cream/40 dark:focus-visible:ring-offset-midnight-card"
      >
        NAMI.
      </motion.a>

      {!floatingHome && <div className="hidden items-center gap-9 justify-self-center font-sans text-[15px] font-medium text-navy/80 dark:text-cream/75 md:flex">
        {/* About pops the notebook open on the same page instead of navigating. */}
        {!floatingHome && <button
          type="button"
          onClick={() => {
            playClick();
            openAbout();
          }}
          className={linkClass}
        >
          About
          <span className={underlineClass} />
        </button>}

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
        {!floatingHome && <button
          type="button"
          onClick={() => {
            playClick();
            openPlayground("playground");
          }}
          className={linkClass}
        >
          Playground
          <span className={underlineClass} />
        </button>}

        {!floatingHome && <button type="button" onClick={handleContact} className={linkClass}>
          Contact
          <span className={underlineClass} />
        </button>}
      </div>}

      <div className="flex items-center justify-self-end gap-2">
        {/* Mobile menu: the same actions as the desktop nav, since they were
            disappearing entirely below md with no fallback. */}
        {!floatingHome && <div className="relative md:hidden">
          <motion.button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => {
              playClick();
              setMenuOpen((v) => !v);
            }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING_SNAPPY}
            className="flex h-11 w-11 items-center justify-center rounded-full text-navy outline-none focus-visible:ring-2 focus-visible:ring-navy/40 dark:text-cream dark:focus-visible:ring-cream/40"
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
                className="absolute right-0 top-12 z-[60] flex w-48 flex-col gap-1 rounded-2xl border border-navy/10 bg-cream p-2 font-sans text-[15px] font-medium text-navy shadow-lg dark:border-cream/10 dark:bg-ink dark:text-cream"
              >
                {!floatingHome && <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setMenuOpen(false);
                    openAbout();
                  }}
                  className={mobileItemClass}
                >
                  About
                </button>}
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setMenuOpen(false);
                    openResume();
                  }}
                  className={mobileItemClass}
                >
                  Resume
                </button>
                {!floatingHome && <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setMenuOpen(false);
                    openPlayground("playground");
                  }}
                  className={mobileItemClass}
                >
                  Playground
                </button>}
                {!floatingHome && <button type="button" onClick={handleContact} className={mobileItemClass}>
                  Contact
                </button>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>}

        <AccessibilityPanel />
      </div>
    </motion.nav>
  );
}
