"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useAccessibility } from "@/lib/accessibility";
import NamiCharacter from "./NamiCharacter";
import styles from "./NamiIntro.module.css";

const STORAGE_KEY = "nami-character-intro-seen";
const GREETINGS = [
  { lang: "en", text: "Hello" },
  { lang: "mn", text: "Сайн байна уу" },
  { lang: "fr", text: "Bonjour" },
  { lang: "de", text: "Hallo" },
  { lang: "ja", text: "こんにちは" },
  { lang: "ko", text: "안녕하세요" },
  { lang: "ru", text: "Привет" },
  { lang: "zh", text: "你好" },
  { lang: "es", text: "Hola" },
  { lang: "pt", text: "Olá" },
];

export default function NamiIntro() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState<number | null>(null);
  const [staticPreview, setStaticPreview] = useState(false);
  const { settings } = useAccessibility();
  const systemReducedMotion = useReducedMotion();
  const reduced = Boolean(systemReducedMotion || settings.reduceMotion || staticPreview);
  const dialog = useRef<HTMLDialogElement>(null);
  const pupils = useRef<SVGGElement>(null);

  useEffect(() => {
    const replay = new URLSearchParams(window.location.search).get("intro");
    setStaticPreview(replay === "static");
    try {
      if (replay === null && (sessionStorage.getItem(STORAGE_KEY) || window.location.hash)) { setVisible(false); return; }
    } catch { /* Storage is optional; ENTER always works. */ }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const modal = dialog.current;
    // Server-render the cream screen; upgrade to a modal after hydration.
    if (modal?.open) modal.close();
    modal?.showModal();
    modal?.focus({ preventScroll: true });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    if (reduced) { setReady(true); return; }
    const timer = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(timer);
  }, [visible, reduced]);

  useEffect(() => {
    if (!visible || !ready || leaving || greetingIndex !== null) return;
    const eyes = pupils.current;
    if (!eyes) return;
    const images = eyes.querySelectorAll("image");
    const reset = () => images.forEach(pupil => pupil.removeAttribute("transform"));
    reset();
    if (reduced) return;
    let frame = 0;
    let pointer = { x: 0, y: 0 };
    const track = () => {
      frame = 0;
      const canvas = eyes.ownerSVGElement?.getBoundingClientRect();
      if (!canvas) return;
      // Fixed coordinates keep the gaze origin independent of moving pupils.
      const dx = pointer.x - (canvas.left + canvas.width * 317 / 633);
      const dy = pointer.y - (canvas.top + canvas.height * 250 / 310);
      const distance = Math.max(150, Math.hypot(dx, dy));
      images.forEach(pupil => pupil.setAttribute("transform", `translate(${dx / distance * 7} ${dy / distance * 4})`));
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(track);
    };
    const rest = () => { cancelAnimationFrame(frame); frame = 0; reset(); };
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", rest);
    window.addEventListener("blur", rest);
    window.addEventListener("resize", rest);
    return () => {
      rest();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", rest);
      window.removeEventListener("blur", rest);
      window.removeEventListener("resize", rest);
    };
  }, [visible, ready, reduced, leaving, greetingIndex]);

  useEffect(() => {
    if (greetingIndex === null || leaving || !visible) return;
    const timer = setTimeout(() => {
      if (reduced || greetingIndex === GREETINGS.length - 1) setLeaving(true);
      else setGreetingIndex(greetingIndex + 1);
    }, reduced ? 700 : 480);
    return () => clearTimeout(timer);
  }, [greetingIndex, leaving, visible, reduced]);

  useEffect(() => {
    if (!leaving || !visible) return;
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* optional */ }
    const timer = setTimeout(() => {
      dialog.current?.close();
      setVisible(false);
      const main = document.getElementById("main-content");
      if (main) {
        const previous = main.getAttribute("tabindex");
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
        if (previous === null) main.removeAttribute("tabindex");
        else main.setAttribute("tabindex", previous);
      }
    }, reduced ? 0 : 450);
    return () => clearTimeout(timer);
  }, [leaving, visible, reduced]);

  const enter = () => {
    if (leaving) return;
    if (greetingIndex !== null) { setLeaving(true); return; }
    setGreetingIndex(0);
    dialog.current?.focus({ preventScroll: true });
  };

  if (!visible) return null;
  return (
    <><noscript><style>{"#nami-intro { display: none; }"}</style></noscript>
    <dialog id="nami-intro" open ref={dialog} tabIndex={-1} className={styles.intro} data-reduced={reduced} data-leaving={leaving}
      aria-label="Welcome to Nami’s portfolio" onCancel={event => { event.preventDefault(); enter(); }}
      onKeyDown={event => { if (event.key === "Enter" && event.target === dialog.current) enter(); }}>
      <h1 className={styles.srOnly}>Welcome to Nami’s portfolio</h1>
      {greetingIndex === null ? <>
        <NamiCharacter ref={pupils} />
        {ready && <button type="button" className={styles.enter} onClick={enter}>
          ENTER <span aria-hidden="true">→</span>
        </button>}
      </> : <>
        <p className={styles.srOnly} role="status">Welcome. Opening the portfolio.</p>
        <div className={styles.greetings} aria-hidden="true">
          <span key={greetingIndex} lang={GREETINGS[reduced ? 0 : greetingIndex].lang} className={styles.greeting}>
            {GREETINGS[reduced ? 0 : greetingIndex].text}
          </span>
        </div>
        <button type="button" className={styles.skipGreetings} onClick={() => setLeaving(true)}>
          Skip <span aria-hidden="true">→</span>
        </button>
      </>}
    </dialog></>
  );
}
