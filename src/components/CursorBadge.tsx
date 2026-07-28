"use client";

import { useEffect, useRef, useState } from "react";
import { CURSOR_BADGE_EVENT } from "@/lib/cursorBadge";

const SIZE = 92;
const RADIUS = SIZE / 2 - 8;
const CENTER = SIZE / 2;
const EASE = 0.16; // how quickly the badge catches up to the cursor each frame
const DEGREES_PER_MS = 360 / 7000; // one full turn every 7s
// Repeated with a bullet separator so the ring of text reads continuously
// with no obvious start/end seam.
const RING_TEXT = "UMI NO NAMI • UMI NO NAMI • UMI NO NAMI • ";

/**
 * A decorative badge that trails the mouse — but only while hovering one of
 * a few marked-out spots (the hero's orange card, the Works project list),
 * rather than everywhere on the site. Those spots dispatch a
 * "cursor-badge-hover-change" event (see lib/cursorBadge.ts) that this
 * listens for.
 *
 * Both position AND the ring's rotation are driven by a plain
 * requestAnimationFrame loop writing directly to element transforms via
 * refs. The rotation used to be a CSS `@keyframes` animation, but the
 * site's global `prefers-reduced-motion: reduce` override (see
 * globals.css) collapses every CSS animation to a single ~0ms frame, which
 * froze a 0deg→360deg spin right back at its start — indistinguishable
 * from never rotating at all. Driving it from JS instead sidesteps that
 * entirely, same as the position fix.
 */
export default function CursorBadge() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

  const inWindow = useRef(false);
  const active = useRef(false);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const started = useRef(false);
  const rotation = useRef(0);
  const lastTime = useRef<number | null>(null);

  useEffect(() => {
    // Fine-pointer check keeps this off touch devices, where there's no
    // cursor to trail in the first place.
    const canHover = window.matchMedia("(pointer: fine)").matches;
    setEnabled(canHover);
    if (!canHover) return;

    const updateVisible = () => setVisible(inWindow.current && active.current);

    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!started.current) {
        // Snap to the first known position instead of easing in from (0,0).
        current.current.x = e.clientX;
        current.current.y = e.clientY;
        started.current = true;
      }
      if (!inWindow.current) {
        inWindow.current = true;
        updateVisible();
      }
    };
    const handleLeave = () => {
      inWindow.current = false;
      updateVisible();
    };
    const handleHoverChange = (e: Event) => {
      active.current = Boolean((e as CustomEvent<boolean>).detail);
      updateVisible();
    };

    let raf = 0;
    const tick = (time: number) => {
      const dt = lastTime.current == null ? 0 : time - lastTime.current;
      lastTime.current = time;

      current.current.x += (target.current.x - current.current.x) * EASE;
      current.current.y += (target.current.y - current.current.y) * EASE;
      if (wrapperRef.current) {
        const px = current.current.x - SIZE / 2;
        const py = current.current.y - SIZE / 2;
        wrapperRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }

      rotation.current = (rotation.current + dt * DEGREES_PER_MS) % 360;
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${rotation.current}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    window.addEventListener(CURSOR_BADGE_EVENT, handleHoverChange);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener(CURSOR_BADGE_EVENT, handleHoverChange);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[150] mix-blend-difference"
    >
      <div
        className="transition-all duration-300 ease-out"
        style={{ opacity: visible ? 1 : 0, transform: `scale(${visible ? 1 : 0.6})` }}
      >
        <svg
          ref={ringRef}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ transformOrigin: "50% 50%" }}
        >
          <defs>
            <path
              id="cursor-badge-ring"
              d={`M ${CENTER - RADIUS}, ${CENTER} a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
            />
          </defs>
          <text className="fill-cream text-[10.5px] font-medium uppercase tracking-[0.15em]" style={{ fontFamily: "var(--font-sans)" }}>
            <textPath href="#cursor-badge-ring" xlinkHref="#cursor-badge-ring" startOffset="0%">
              {RING_TEXT}
            </textPath>
          </text>
          <circle cx={CENTER} cy={CENTER} r={3} className="fill-cream" />
        </svg>
      </div>
    </div>
  );
}
