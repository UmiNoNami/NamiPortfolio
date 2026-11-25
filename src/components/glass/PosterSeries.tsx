"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { posters } from "@/data/posters";
import styles from "./PosterSeries.module.css";

const COUNT = posters.length;
const STEP = 360 / COUNT;
const AUTOPLAY_MS = 3200;

/** Signed distance from the front poster, wrapped into (-COUNT/2, COUNT/2]. */
function offset(index: number, active: number) {
  let d = (index - active) % COUNT;
  if (d > COUNT / 2) d -= COUNT;
  if (d <= -COUNT / 2) d += COUNT;
  return d;
}

// Size and opacity by distance from the front: the front poster is clearly
// the hero, the next ones wait close behind, the far side of the ring fades.
const SCALE = [1, 0.7, 0.54, 0.44, 0.39, 0.37];
const OPACITY = [1, 0.9, 0.62, 0.36, 0.2, 0.12];

/** Place a poster on a ring seen from slightly above: front = big and sharp,
 * the rest shrink, dim and tuck behind as they go round the circle. */
function ringStyle(d: number): React.CSSProperties {
  const a = (d * STEP * Math.PI) / 180;
  const n = Math.min(Math.abs(d), SCALE.length - 1);
  const depth = (Math.cos(a) + 1) / 2; // 1 = front, 0 = back
  return {
    transform: `translate(-50%, -50%) translateX(calc(${Math.sin(a).toFixed(3)} * var(--ring-radius))) translateY(${((1 - depth) * -14).toFixed(1)}%) scale(${SCALE[n]})`,
    zIndex: 100 - n * 10,
    opacity: OPACITY[n],
    filter: d === 0 ? "none" : `saturate(${(0.5 + 0.5 * depth).toFixed(2)}) brightness(${(0.78 + 0.22 * depth).toFixed(2)})`,
  };
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(true);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches || document.documentElement.hasAttribute("data-reduce-motion"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-reduce-motion"] });
    media.addEventListener("change", update);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, []);
  return reduce;
}

/** Projects panel section: the ten-poster series as a rotating ring carousel,
 * with a full-size lightbox on the front poster. */
export default function PosterSeries() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false); // user pressed pause
  const [hovering, setHovering] = useState(false); // pointer/focus inside
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const frontBtn = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  const go = useCallback((dir: number) => setActive((i) => (i + dir + COUNT) % COUNT), []);
  // Close the lightbox and hand focus back to whichever poster is in front now.
  const closeLightbox = useCallback(() => {
    setLightbox(false);
    requestAnimationFrame(() => frontBtn.current?.focus());
  }, []);

  // Autoplay: the next poster comes forward every few seconds.
  const playing = !paused && !hovering && !lightbox && !reduceMotion;
  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [playing, go]);

  // Lightbox keyboard + focus handling.
  useEffect(() => {
    if (!lightbox) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, go, closeLightbox]);

  const current = posters[active];

  return (
    <section className={styles.series} aria-labelledby="poster-series-title">
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>GRAPHIC DESIGN · SELF-INITIATED · FIGMA 2026</p>
          <h2 id="poster-series-title">
            Poster Series <em>— ten visual languages</em>
          </h2>
        </div>
        <p className={styles.blurb}>
          Ten A4 posters for fictional events across London and Dublin, each an exercise in a
          different style: Swiss grids, riso print, glitch, chrome, psychedelia and more.
        </p>
      </div>

      <div
        className={styles.carousel}
        role="region"
        aria-roledescription="carousel"
        aria-label="Poster series"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovering(false);
        }}
        onKeyDown={(e) => {
          if (lightbox) return;
          if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div className={styles.stage}>
          {posters.map((p, i) => {
            const d = offset(i, active);
            const front = d === 0;
            return (
              <button
                key={p.no}
                ref={front ? frontBtn : undefined}
                type="button"
                className={styles.card}
                data-front={front}
                style={{ ...ringStyle(d), background: p.tone }}
                tabIndex={front ? 0 : -1}
                aria-hidden={!front && Math.abs(d) > 1}
                aria-label={front ? `Open poster ${p.no}, ${p.title}, full size` : `Bring poster ${p.no}, ${p.title}, to the front`}
                onClick={() => (front ? setLightbox(true) : go(d))}
              >
                <Image
                  src={p.src}
                  alt=""
                  width={595}
                  height={842}
                  sizes="(max-width: 700px) 60vw, 320px"
                  priority={Math.abs(d) <= 1}
                  draggable={false}
                />
                {front && <span className={styles.zoom} aria-hidden="true">View ↗</span>}
              </button>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.round} onClick={() => go(-1)} aria-label="Previous poster">←</button>
          <div className={styles.caption} aria-live={playing ? "off" : "polite"}>
            <span className={styles.count}>
              {current.no} / {String(COUNT).padStart(2, "0")}
            </span>
            <strong>{current.title}</strong>
            <span>
              {current.style} — {current.event}
            </span>
          </div>
          <button type="button" className={styles.round} onClick={() => go(1)} aria-label="Next poster">→</button>
        </div>

        <div className={styles.dots}>
          {posters.map((p, i) => (
            <button
              key={p.no}
              type="button"
              className={styles.dot}
              aria-label={`Show poster ${p.no}: ${p.title}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
            />
          ))}
          {!reduceMotion && (
            <button
              type="button"
              className={styles.pause}
              onClick={() => setPaused((v) => !v)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            >
              {paused ? "▶ PLAY" : "❚❚ PAUSE"}
            </button>
          )}
        </div>
      </div>

      {mounted &&
        lightbox &&
        createPortal(
          <div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Poster ${current.no}: ${current.title}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <figure className={styles.figure}>
              <Image
                key={current.src}
                src={current.src}
                alt={`${current.title}: ${current.style} poster for a fictional ${current.event.toLowerCase()}.`}
                width={1190}
                height={1684}
                sizes="(max-width: 700px) 92vw, 60vh"
                priority
              />
              <figcaption>
                <span>
                  {current.no} / {String(COUNT).padStart(2, "0")}
                </span>
                <strong>{current.title}</strong>
                <span>
                  {current.style} — {current.event}
                </span>
              </figcaption>
            </figure>
            <button ref={closeBtn} type="button" className={styles.close} onClick={closeLightbox} aria-label="Close poster">
              ×
            </button>
            <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous poster">
              ←
            </button>
            <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(1)} aria-label="Next poster">
              →
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}
