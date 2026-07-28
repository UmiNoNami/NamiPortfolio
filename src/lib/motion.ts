// Shared animation presets so every interactive element on the site settles
// with the same fluid, minimal-overshoot feel instead of each component
// improvising its own spring numbers. Tuned close to critically damped
// (damping ≈ 2·√(stiffness·mass)) so things glide to a stop rather than
// bounce past it.

import type { Transition } from "framer-motion";

/** Quick, controlled — for small interactive elements (hover/tap on
 * buttons, icons, tags). Settles fast with essentially no overshoot. */
export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.7,
};

/** A touch softer/slower — for larger elements (windows, panels, page
 * sections) easing into place. Still no bounce, just a gentler glide. */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 170,
  damping: 24,
  mass: 0.8,
};

/** Ease-out-expo style curve for tween-based fades/slides (non-spring). */
export const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1];
