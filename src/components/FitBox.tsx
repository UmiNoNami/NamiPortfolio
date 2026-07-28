"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fixed design canvas. All children inside FitBox should be positioned with
// real pixel values against this exact size (e.g. `left: 790, top: 60`) —
// never percentages of the viewport. The whole canvas is then scaled down
// as ONE rigid unit to fit whatever space is available, so text, padding,
// and icon sizes shrink together with the layout instead of reflowing.
// That reflow (content staying full-size while only its position grid
// shrank) was what caused windows to overflow their slot on shorter screens.
export const DESIGN_WIDTH = 2700;
export const DESIGN_HEIGHT = 1050;

export default function FitBox({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      setScale(Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT));
    };

    // The very first measurement can land before web fonts finish loading
    // or before the browser has fully settled layout, which would lock in
    // a too-small scale (ResizeObserver only re-fires on later SIZE
    // CHANGES, not on this kind of late content settling). Re-measure on
    // the next frame and again once fonts are ready to avoid that.
    measure();
    const raf = requestAnimationFrame(measure);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // DESIGN_WIDTH/DESIGN_HEIGHT are module constants tuned by hand while
    // iterating on the layout. Including them here isn't about tracking
    // "real" reactive state — it's so that editing these numbers during
    // development reliably re-runs the measurement. Without this, React
    // Fast Refresh can keep a stale `scale` computed against the OLD
    // canvas size after a hot-reloaded edit, silently breaking the fit
    // until a full page reload. See project notes on this failure mode.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DESIGN_WIDTH, DESIGN_HEIGHT]);

  return (
    <div ref={outerRef} className={`flex h-full w-full items-center justify-center ${className}`}>
      <div
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
