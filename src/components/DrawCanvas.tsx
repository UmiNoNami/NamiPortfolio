"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type DrawTool = "cursor" | "pencil" | "brush" | "shape";
export type DrawCanvasHandle = { undo: () => void };

type Props = {
  tool: DrawTool;
  color: string;
  className?: string;
};

const DrawCanvas = forwardRef<DrawCanvasHandle, Props>(function DrawCanvas(
  { tool, color, className },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const snapshot = useRef<ImageData | null>(null);
  // One entry per completed stroke — pop to step back through them one at a time.
  const history = useRef<string[]>([]);

  // Latest tool/color without re-binding event handlers.
  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);
  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useImperativeHandle(ref, () => ({
    undo: () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const src = history.current.pop();
      if (!canvas || !ctx || !src) return;
      const img = new window.Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = src;
    },
  }));

  // Keep the canvas's pixel size in sync with its box, preserving drawing.
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const prev = canvas.width > 0 ? canvas.toDataURL() : null;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx && prev) {
        const img = new window.Image();
        img.onload = () => ctx.drawImage(img, 0, 0, width, height);
        img.src = prev;
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (toolRef.current === "cursor") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = getPos(e);
    drawing.current = true;
    start.current = pos;

    // Snapshot the canvas before this stroke so it can be undone.
    history.current.push(canvas.toDataURL());
    if (history.current.length > 50) history.current.shift();

    if (toolRef.current === "shape") {
      snapshot.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } else {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !start.current) return;
    const pos = getPos(e);
    const t = toolRef.current;

    if (t === "pencil" || t === "brush") {
      ctx.strokeStyle = colorRef.current;
      ctx.lineWidth = t === "brush" ? 10 : 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (t === "shape" && snapshot.current) {
      ctx.putImageData(snapshot.current, 0, 0);
      ctx.strokeStyle = colorRef.current;
      ctx.lineWidth = 2.5;
      const w = pos.x - start.current.x;
      const h = pos.y - start.current.y;
      if (Math.abs(w) > Math.abs(h) * 1.3) {
        ctx.strokeRect(start.current.x, start.current.y, w, h);
      } else {
        const cx = start.current.x + w / 2;
        const cy = start.current.y + h / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(w) / 2, Math.abs(h) / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  };

  const handlePointerUp = () => {
    drawing.current = false;
    start.current = null;
    snapshot.current = null;
  };

  const isCursorMode = tool === "cursor";

  return (
    <div ref={containerRef} className={`${className ?? ""} ${isCursorMode ? "pointer-events-none" : "pointer-events-auto"}`}>
      <canvas
        ref={canvasRef}
        className={`h-full w-full touch-none ${isCursorMode ? "" : "cursor-crosshair"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
    </div>
  );
});

export default DrawCanvas;
