"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAccessibility } from "@/lib/accessibility";
import AccessibilityPanel from "../AccessibilityPanel";
import styles from "./GlassOverlay.module.css";

// Seconds. The physical key's 170ms press/release happens before routing here.
export const GLASS_OPEN_SECONDS = 0.62;
const GLASS_CLOSE_SECONDS = 0.42;

type Props = {
  open: boolean;
  restoreFocusTo: string;
  onClose: () => void;
  onClosed: () => void;
  title: string;
  eyebrow?: string;
  footer?: ReactNode;
  description: string;
  children: ReactNode;
  hideHeader?: boolean;
};

export default function GlassOverlay({ open, onClose, onClosed, ...content }: Props) {
  return <AnimatePresence onExitComplete={onClosed}>
    {open && <GlassSurface key="glass" {...content} onClose={onClose} />}
  </AnimatePresence>;
}

function GlassSurface({ title, description, children, onClose, restoreFocusTo, eyebrow = "Portfolio", footer, hideHeader }: Omit<Props, "open" | "onClosed">) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const osReduced = useReducedMotion();
  const { settings } = useAccessibility();
  const reduced = Boolean(osReduced) || settings.reduceMotion;
  const focusReturn = useRef(restoreFocusTo);
  focusReturn.current = restoreFocusTo;
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => { scroll.current?.scrollTo({ top: 0 }); }, [title]);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const element = dialog.current!;
    const root = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const saved = { overflow: root.style.overflow, position: body.style.position, top: body.style.top, width: body.style.width, paddingRight: body.style.paddingRight };
    const gutter = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    if (gutter) body.style.paddingRight = `${gutter}px`;
    element.showModal();
    element.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const cancel = (event: Event) => { event.preventDefault(); closeRef.current(); };
    element.addEventListener("cancel", cancel);
    return () => {
      element.removeEventListener("cancel", cancel);
      element.close();
      root.style.overflow = saved.overflow;
      Object.assign(body.style, { position: saved.position, top: saved.top, width: saved.width, paddingRight: saved.paddingRight });
      window.scrollTo({ top: scrollY, behavior: "instant" });
      requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(focusReturn.current);
        if (!document.querySelector("dialog[open]")) target?.focus({ preventScroll: true });
      });
    };
  }, []);

  return <motion.dialog ref={dialog} data-glass-screen className={styles.dialog} aria-labelledby={titleId}
    aria-describedby={descriptionId} aria-modal="true"
    onKeyDown={event => {
      if (event.key !== "Tab") return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(control => control.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}
    initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: reduced ? 0 : GLASS_CLOSE_SECONDS }}>
    <motion.div className={styles.panel}
      initial={reduced ? false : { opacity: 0, scale: .97, y: 24, rotateX: 1.2, "--glass-blur": "0px" }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, "--glass-blur": "var(--glass-blur-strength)" }}
      exit={{ opacity: 0, scale: reduced ? 1 : .985, y: reduced ? 0 : 14, "--glass-blur": "0px", transition: { duration: reduced ? 0 : GLASS_CLOSE_SECONDS } }}
      transition={{ duration: reduced ? 0 : GLASS_OPEN_SECONDS, ease: [.22, 1, .36, 1] }}>
      <div className={styles.headerActions}><AccessibilityPanel /><button type="button" onClick={onClose} className={styles.close} aria-label={`Close ${title.toLowerCase()}`}>
        <span className={styles.closeLabel}>Close</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button></div>
      <div ref={scroll} className={styles.scroll} data-no-header={hideHeader || undefined} tabIndex={0} role="region" aria-label={`${title} content`}>
        {hideHeader ? <>
          {/* Header/nav are hidden here (redundant with the home-screen
              buttons), but the dialog still needs an accessible name. */}
          <h1 id={titleId} className="sr-only">{title}</h1>
          <p id={descriptionId} className="sr-only">{description}</p>
        </> : <>
          <header className={styles.header}>
            <p className={styles.kicker}><span /> {eyebrow}</p>
            <h1 id={titleId}>{title}</h1><p id={descriptionId} className={styles.description}>{description}</p>
          </header>
          <nav className={styles.panelNav} aria-label="Glass screens">
            {["projects", "about", "contact", "playground"].map(id => <Link key={id} href={`/${id}`} replace scroll={false} aria-current={title.toLowerCase() === id ? "page" : undefined}>{id}<span>↗</span></Link>)}
          </nav>
        </>}
        {children}
      </div>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </motion.div>
  </motion.dialog>;
}
