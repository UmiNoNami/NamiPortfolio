"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin black bar that fills up as you scroll — smoothed with a spring
 * so it never feels like it's snapping to the raw scroll position. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-ink"
    />
  );
}
