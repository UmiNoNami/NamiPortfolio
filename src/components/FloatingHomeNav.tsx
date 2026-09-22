"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useAccessibility } from "@/lib/accessibility";
import FloatingNavButton, { type NavItem } from "./FloatingNavButton";
import styles from "./FloatingHomeNav.module.css";

const items: NavItem[] = [
  { id: "about", label: "About", width: 430, height: 366, duration: 6.7, delay: -1.8, drift: 2, rise: 5, rotation: -0.8 },
  { id: "projects", label: "Projects", width: 443, height: 376, duration: 7.6, delay: -4.2, drift: -2, rise: 7, rotation: 1 },
  { id: "contact", label: "Contact", width: 469, height: 360, duration: 5.8, delay: -2.6, drift: 1, rise: 4, rotation: 0.6 },
  { id: "playground", label: "Playground", width: 483, height: 381, duration: 7.1, delay: -5.1, drift: -1.5, rise: 6, rotation: -1 },
];

// Maximum cluster response: 1 degree of tilt and 2px of translation.
const PARALLAX_TILT = 1;
const PARALLAX_SHIFT = 2;
const spring = { stiffness: 85, damping: 24, mass: 0.7 };

export default function FloatingHomeNav() {
  const [activePanel, setActivePanel] = useState<NavItem["id"] | null>(null);
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const { settings } = useAccessibility();
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = settings.reduceMotion || Boolean(prefersReducedMotion);
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const resetParallax = () => { rotateX.set(0); rotateY.set(0); x.set(0); y.set(0); };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    if (reduceMotion) { rotateX.jump(0); rotateY.jump(0); x.jump(0); y.jump(0); }
  }, [reduceMotion, rotateX, rotateY, x, y]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" ||
      !window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches) return;
    // Freeze the cluster while targeting a key, including keyboard focus.
    if ((event.target as HTMLElement).closest("button") ||
      event.currentTarget.contains(document.activeElement)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const py = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    rotateX.set(-py * PARALLAX_TILT); rotateY.set(px * PARALLAX_TILT);
    x.set(px * PARALLAX_SHIFT); y.set(py * PARALLAX_SHIFT);
  };

  const selectPanel = (id: NavItem["id"]) => {
    setActivePanel(id);
    setStatus(`${id} selected`);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 3000);
  };

  return (
    <nav className={styles.navigation} aria-label="Explore the portfolio"
      data-reduced={reduceMotion} onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax} onFocusCapture={resetParallax}>
      <motion.div className={styles.cluster} style={{ rotateX, rotateY, x, y }}>
        {items.map((item) => <FloatingNavButton key={item.id} item={item}
          selected={activePanel === item.id} onSelect={selectPanel} />)}
      </motion.div>
      <p className={styles.status} role="status" aria-live="polite" aria-atomic="true">{status}</p>
    </nav>
  );
}
