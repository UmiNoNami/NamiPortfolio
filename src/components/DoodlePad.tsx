"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion } from "framer-motion";

// a tiny red pencil, used as the cursor image anywhere over the notebook
const PENCIL_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'>
  <g transform='rotate(45 15 15)'>
    <rect x='13' y='2' width='4' height='19' rx='1' fill='#B7412E' stroke='#8C2F20'/>
    <polygon points='11,21 19,21 15,28' fill='#E4C98A' stroke='#8C2F20'/>
    <rect x='12' y='0' width='6' height='3' fill='#3A3A3A'/>
  </g>
</svg>`;
const PENCIL_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(PENCIL_SVG)}") 4 26, crosshair`;

type Props = {
  className?: string;
  /** Elements the pencil should never draw over or intercept clicks for
   * (e.g. the buttons). Because this canvas sits visually on top, a plain
   * CSS hover trick on the element underneath can't work — something on
   * top of an element always wins hit-testing, so that element never even
   * receives its own hover event. Instead the canvas watches its own
   * pointer position against these rects and steps aside (pointer-events:
   * none) the moment it's over one, then listens for that real element's
   * mouseleave to know when it's safe to resume. */
  avoidRefs?: RefObject<HTMLElement>[];
};

export default function DoodlePad({ className = "", avoidRefs = [] }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;

      // resizing clears the canvas (doodles don't survive a window resize —
      // an acceptable trade-off for keeping this simple and crisp on any screen)
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#8C2F20";
      ctx.lineWidth = 2.2;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // once the canvas steps aside for an avoided element, that element can
  // finally receive its own mouseleave normally (nothing is covering it
  // anymore) — that's our signal it's safe to start covering that spot again
  useEffect(() => {
    const els = avoidRefs.map((r) => r.current).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    const onLeave = () => setBlocked(false);
    els.forEach((el) => el.addEventListener("mouseleave", onLeave));
    return () => els.forEach((el) => el.removeEventListener("mouseleave", onLeave));
  }, [avoidRefs]);

  const isInAvoidZone = (clientX: number, clientY: number) =>
    avoidRefs.some((ref) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return false;
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    });

  const posFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isInAvoidZone(e.clientX, e.clientY)) {
      setBlocked(true);
      return;
    }
    drawing.current = true;
    const ctx = canvasRef.current?.getContext("2d");
    const { x, y } = posFromEvent(e);
    ctx?.beginPath();
    ctx?.moveTo(x, y);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isInAvoidZone(e.clientX, e.clientY)) {
      drawing.current = false;
      setBlocked(true);
      return;
    }
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    const { x, y } = posFromEvent(e);
    ctx?.lineTo(x, y);
    ctx?.stroke();
  };

  const stop = () => {
    drawing.current = false;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div ref={wrapRef} className={`pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        className={`absolute inset-0 z-10 h-full w-full touch-none ${
          blocked ? "pointer-events-none" : "pointer-events-auto"
        }`}
        style={blocked ? undefined : { cursor: PENCIL_CURSOR }}
      />

      <motion.button
        type="button"
        onClick={clear}
        whileHover={{ scale: 1.08, rotate: -3 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 300, damping: 14 }}
        aria-label="Clear your doodles"
        className="pointer-events-auto absolute bottom-[2%] left-[4%] z-20 rounded-full border-2 border-ink bg-paper px-3 py-1 font-hand text-[0.6rem] text-ink shadow-md shadow-black/20 sm:text-sm"
      >
        clear
      </motion.button>
    </div>
  );
}
