"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import HTMLFlipBookImport from "react-pageflip";
import { projects } from "@/data/projects";
import { ArrowDoodle } from "./Doodles";

// react-pageflip's bundled TypeScript types mark almost every prop as
// required even though the library itself defaults them at runtime — a
// well-known rough edge in that package. Casting to a loose component type
// here avoids fighting that instead of actually using the library wrong.
const HTMLFlipBook = HTMLFlipBookImport as unknown as ComponentType<any>;

// a real crop of the blank page from notebook.png (no cover, no gutter),
// used as the background of both faces so the flipping page actually
// matches the paper it's sitting on instead of a flat CSS color
const pageStyle = {
  backgroundImage: "url('/page-texture.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

/**
 * The right-hand page of the notebook, as an actual flippable page (real
 * curl + moving shadow via the page-flip engine) instead of a flat CSS
 * rotation. Front = the illustration. Turn it and the back shows a quick
 * peek at the work, with real links to each case study.
 *
 * react-pageflip's own "stretch" sizing mode measures its parent internally
 * and can misfire inside a percentage-padded flex layout like ours (this is
 * the "tiny page" bug) — so instead we measure the wrapper ourselves with a
 * ResizeObserver and hand the book a fixed, always-correct pixel size.
 */
export default function FlipPage({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`relative h-full w-full ${className}`}>
      {size && (
        <HTMLFlipBook
          key={`${size.width}x${size.height}`}
          width={size.width}
          height={size.height}
          size="fixed"
          minWidth={size.width}
          maxWidth={size.width}
          minHeight={size.height}
          maxHeight={size.height}
          maxShadowOpacity={0.4}
          showCover={false}
          usePortrait={true}
          mobileScrollSupport={true}
          drawShadow={true}
          flippingTime={700}
          swipeDistance={15}
          showPageCorners={true}
          disableFlipByClick={false}
          useMouseEvents={true}
          clickEventForward={true}
          startZIndex={10}
          autoSize={false}
          startPage={0}
          className="h-full w-full"
          style={{}}
        >
          {/* front of the page: illustration */}
          <div className="h-full w-full" style={pageStyle}>
            <div className="relative h-full w-full">
              <Image
                src="/nami-illustration.png"
                alt="Illustration of Nami sitting at her desk with a laptop, headphones, and plants"
                fill
                className="pointer-events-none object-contain object-center select-none"
                sizes="(max-width: 1152px) 50vw, 576px"
              />
            </div>
          </div>

          {/* back of the page: a quick peek at the work */}
          <div
            className="flex h-full w-full flex-col justify-center gap-2 px-[10%] py-[12%] sm:gap-3"
            style={pageStyle}
          >
            <p className="font-hand text-[2.2vw] uppercase tracking-[0.2em] text-ink-dark sm:text-xs">
              a peek at
            </p>
            <h2
              className="-mt-1 font-display leading-none text-ink"
              style={{ fontSize: "clamp(1.1rem, 3.4vw, 2rem)" }}
            >
              my work
            </h2>

            <div className="mt-1 flex flex-col gap-1.5 sm:gap-2">
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group flex items-center justify-between gap-2 border-b border-charcoal/20 pb-1"
                >
                  <span
                    className="font-hand text-charcoal group-hover:text-ink"
                    style={{ fontSize: "clamp(0.5rem, 1.1vw, 0.9rem)" }}
                  >
                    {p.title}
                  </span>
                  <ArrowDoodle className="h-3 w-3 shrink-0 text-ink transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </HTMLFlipBook>
      )}
    </div>
  );
}
