"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playClick } from "@/lib/sound";
import { SPRING_SNAPPY, SPRING_SOFT } from "@/lib/motion";
import { useAccessibility, type ColorTheme, type TextSize } from "@/lib/accessibility";
import Tooltip from "./Tooltip";
import { CloseIcon, ContrastIcon, EyeIcon, MoonIcon, SunIcon } from "./ModernIcons";

const COLOR_THEMES: { id: ColorTheme; label: string; icon: typeof SunIcon }[] = [
  { id: "light", label: "Light", icon: SunIcon },
  { id: "dark", label: "Dark", icon: MoonIcon },
  { id: "high-contrast", label: "High Contrast", icon: ContrastIcon },
];

const TEXT_SIZES: { id: TextSize; label: string; ariaLabel: string }[] = [
  { id: "small", label: "A−", ariaLabel: "Decrease text size" },
  { id: "default", label: "Default", ariaLabel: "Reset text size" },
  { id: "large", label: "A+", ariaLabel: "Increase text size" },
];

const pillClass = (active: boolean) =>
  `has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-navy/40 dark:has-[:focus-visible]:ring-cream/40 flex min-h-[44px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border px-1 py-2 text-center outline-none transition-colors ${
    active
      ? "border-navy bg-navy text-cream dark:border-cream dark:bg-cream dark:text-navy"
      : "border-navy/15 text-navy/70 hover:bg-navy/5 dark:border-cream/15 dark:text-cream/70 dark:hover:bg-cream/10"
  }`;

function Switch({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-[44px] cursor-pointer items-center justify-between gap-3 rounded-xl px-1 py-1.5"
    >
      <span className="font-sans text-[13px] font-medium text-navy dark:text-cream">{label}</span>
      <span
        className={`has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-navy/40 dark:has-[:focus-visible]:ring-cream/40 relative inline-flex h-6 w-11 shrink-0 items-center rounded-full outline-none transition-colors ${
          checked ? "bg-navy dark:bg-cream" : "bg-navy/20 dark:bg-cream/25"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          aria-hidden
          className={`pointer-events-none absolute left-[3px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 transform rounded-full bg-cream shadow transition-transform duration-200 dark:bg-navy ${
            checked ? "translate-x-[20px]" : "translate-x-0"
          }`}
        />
      </span>
    </label>
  );
}

function SectionLegend({ children }: { children: ReactNode }) {
  return (
    <legend className="font-sans text-[11px] font-semibold uppercase tracking-wider text-navy/45 dark:text-cream/45">
      {children}
    </legend>
  );
}

/**
 * The accessibility button (eye icon) and its settings panel — replaces the
 * old single light/dark ThemeToggle in the navbar. Colour theme (including
 * light/dark) now lives inside this panel alongside text size, motion,
 * link-highlighting and font controls, all backed by one settings object.
 */
export default function AccessibilityPanel() {
  const {
    settings,
    setColorTheme,
    setTextSize,
    toggleReduceMotion,
    toggleHighlightLinks,
    toggleReadableFont,
    reset,
    announcement,
  } = useAccessibility();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const headingId = useId();

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 0);

    function getFocusable(): HTMLElement[] {
      if (!panelRef.current) return [];
      return Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = getFocusable();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      close();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, close]);

  return (
    <div className="relative">
      <Tooltip label="Accessibility" side="bottom">
        <motion.button
          ref={buttonRef}
          type="button"
          aria-label="Open accessibility settings"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            playClick();
            setOpen((v) => !v);
          }}
          whileHover={{ y: -1, scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={SPRING_SNAPPY}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-cream shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-navy/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:bg-cream dark:text-navy dark:focus-visible:ring-cream/50 dark:focus-visible:ring-offset-midnight-card"
        >
          <EyeIcon className="h-[18px] w-[18px]" />
        </motion.button>
      </Tooltip>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="a11y-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[240] bg-ink/40 sm:hidden"
              aria-hidden
            />
            <motion.div
              key="a11y-panel"
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-labelledby={headingId}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={SPRING_SOFT}
              className="fixed inset-x-3 bottom-3 z-[250] max-h-[82vh] overflow-y-auto rounded-[28px] border border-navy/10 bg-cream p-4 shadow-2xl dark:border-cream/10 dark:bg-midnight-card sm:absolute sm:inset-x-auto sm:bottom-auto sm:left-auto sm:right-0 sm:top-14 sm:max-h-[75vh] sm:w-[340px] sm:max-w-[calc(100vw-1.5rem)]"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 id={headingId} className="font-sans text-base font-bold text-navy dark:text-cream">
                  Accessibility
                </h2>
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close accessibility settings"
                  onClick={() => {
                    playClick();
                    close();
                  }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-navy/60 outline-none transition-colors hover:bg-navy/5 focus-visible:ring-2 focus-visible:ring-navy/40 dark:text-cream/60 dark:hover:bg-cream/10 dark:focus-visible:ring-cream/40"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>

              <fieldset className="mt-4 border-0 p-0">
                <SectionLegend>Colour theme</SectionLegend>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {COLOR_THEMES.map((t) => {
                    const active = settings.colorTheme === t.id;
                    return (
                      <label key={t.id} className={pillClass(active)}>
                        <input
                          type="radio"
                          name="a11y-color-theme"
                          value={t.id}
                          checked={active}
                          onChange={() => {
                            playClick();
                            setColorTheme(t.id);
                          }}
                          className="sr-only"
                        />
                        <t.icon className="h-4 w-4" />
                        <span className="font-sans text-[11px] font-medium leading-tight">{t.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-4 border-0 p-0">
                <SectionLegend>Text size</SectionLegend>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {TEXT_SIZES.map((t) => {
                    const active = settings.textSize === t.id;
                    return (
                      <label key={t.id} className={pillClass(active)}>
                        <input
                          type="radio"
                          name="a11y-text-size"
                          value={t.id}
                          checked={active}
                          aria-label={t.ariaLabel}
                          onChange={() => {
                            playClick();
                            setTextSize(t.id);
                          }}
                          className="sr-only"
                        />
                        <span className="font-sans text-sm font-semibold">{t.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-4 border-0 p-0">
                <SectionLegend>Reading and motion</SectionLegend>
                <div className="mt-1 divide-y divide-navy/10 dark:divide-cream/10">
                  <Switch
                    id="a11y-reduce-motion"
                    label="Reduce motion"
                    checked={settings.reduceMotion}
                    onChange={(v) => {
                      playClick();
                      toggleReduceMotion(v);
                    }}
                  />
                  <Switch
                    id="a11y-highlight-links"
                    label="Highlight links"
                    checked={settings.highlightLinks}
                    onChange={(v) => {
                      playClick();
                      toggleHighlightLinks(v);
                    }}
                  />
                  <Switch
                    id="a11y-readable-font"
                    label="Readable font"
                    checked={settings.readableFont}
                    onChange={(v) => {
                      playClick();
                      toggleReadableFont(v);
                    }}
                  />
                </div>
              </fieldset>

              <button
                type="button"
                onClick={() => {
                  playClick();
                  reset();
                }}
                className="mt-4 min-h-[44px] w-full rounded-full border border-navy/15 font-sans text-[13px] font-semibold text-navy/70 outline-none transition-colors hover:bg-navy/5 focus-visible:ring-2 focus-visible:ring-navy/40 dark:border-cream/15 dark:text-cream/70 dark:hover:bg-cream/10 dark:focus-visible:ring-cream/40"
              >
                Reset accessibility settings
              </button>

              <p role="status" aria-live="polite" className="sr-only">
                {announcement}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
