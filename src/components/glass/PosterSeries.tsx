"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { posters } from "@/data/posters";
import panel from "./WorldPanels.module.css";
import styles from "./PosterSeries.module.css";

/** Playground pane: a grid of the ten-poster series with a keyboard-friendly lightbox. */
export default function PosterSeries() {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const lastOpened = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + posters.length) % posters.length)),
    [],
  );

  // Keyboard controls + focus handling while the lightbox is open.
  useEffect(() => {
    if (open === null) {
      if (lastOpened.current !== null) thumbs.current[lastOpened.current]?.focus();
      return;
    }
    lastOpened.current = open;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  const current = open === null ? null : posters[open];

  return (
    <section className={`${panel.pane} ${styles.series}`} aria-labelledby="poster-series-title">
      <div className={panel.paneBar}>
        <span>02 / POSTER SERIES</span>
        <span>GRAPHIC DESIGN · 10 × A4</span>
      </div>

      <div className={styles.intro}>
        <p className={panel.eyebrow}>SELF-INITIATED · FIGMA · 2026</p>
        <h2 id="poster-series-title">
          Ten posters,
          <br />
          <em>ten visual languages.</em>
        </h2>
        <p>
          A series of posters for fictional events across London and Dublin. Each one is an
          exercise in a different style — from Swiss grids and riso print to glitch, chrome and
          psychedelia — testing how far type, colour and composition can carry a single idea.
        </p>
      </div>

      <ul className={styles.grid}>
        {posters.map((p, i) => (
          <li key={p.no}>
            <button
              ref={(el) => {
                thumbs.current[i] = el;
              }}
              type="button"
              className={styles.thumb}
              onClick={() => setOpen(i)}
              aria-label={`Open poster ${p.no}: ${p.title}, ${p.style}`}
            >
              <span className={styles.frame} style={{ background: p.tone }}>
                <Image
                  src={p.src}
                  alt=""
                  width={595}
                  height={842}
                  sizes="(max-width: 700px) 45vw, (max-width: 1100px) 30vw, 220px"
                />
              </span>
              <span className={styles.caption}>
                <b>{p.no}</b> {p.style}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {mounted &&
        current &&
        createPortal(
          <div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Poster ${current.no}: ${current.title}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <figure className={styles.figure}>
              <Image
                key={current.src}
                src={current.src}
                alt={`${current.title} — ${current.style} poster for a fictional ${current.event.toLowerCase()}.`}
                width={1190}
                height={1684}
                sizes="(max-width: 700px) 92vw, 60vh"
                priority
              />
              <figcaption>
                <span>
                  {current.no} / {String(posters.length).padStart(2, "0")}
                </span>
                <strong>{current.title}</strong>
                <span>
                  {current.style} — {current.event}
                </span>
              </figcaption>
            </figure>
            <button ref={closeBtn} type="button" className={styles.close} onClick={close} aria-label="Close poster">
              ×
            </button>
            <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => step(-1)} aria-label="Previous poster">
              ←
            </button>
            <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => step(1)} aria-label="Next poster">
              →
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}
