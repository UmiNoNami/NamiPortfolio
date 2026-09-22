"use client";

import { motion } from "framer-motion";
import { playClick } from "@/lib/sound";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-navy/10 px-2 py-8 text-center dark:border-cream/10">
      <p className="font-sans text-sm text-navy/50 dark:text-cream/50">
        Built by Nami · {new Date().getFullYear()}
      </p>
      <motion.a
        href="#top"
        onClick={() => playClick()}
        className="mt-2 inline-block font-sans text-xs font-medium uppercase tracking-widest text-navy/40 hover:text-navy dark:text-cream/40 dark:hover:text-cream"
        whileHover={{ y: -3 }}
      >
        ↑ Back to top
      </motion.a>
    </footer>
  );
}
