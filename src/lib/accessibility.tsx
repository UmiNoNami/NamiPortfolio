"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";

export type ColorTheme = "light" | "dark" | "high-contrast";
export type TextSize = "small" | "default" | "large";

export type AccessibilitySettings = {
  colorTheme: ColorTheme;
  textSize: TextSize;
  reduceMotion: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
};

// One object, one key — everything the accessibility panel controls lives
// here, so there's a single source of truth instead of several unrelated
// storage values that could disagree with each other.
const STORAGE_KEY = "nami-a11y-settings";
// The old single light/dark toggle this feature replaces. Only ever read
// once, as a fallback, so a returning visitor's existing choice isn't lost.
const LEGACY_THEME_KEY = "nami-theme";

const DEFAULT_SETTINGS: AccessibilitySettings = {
  colorTheme: "light",
  textSize: "default",
  reduceMotion: false,
  highlightLinks: false,
  readableFont: false,
};

function readInitialSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    // ignore (corrupt value, private browsing, etc.)
  }

  // First-ever visit under this feature: fall back to the legacy theme key
  // (or the OS color-scheme preference) for colorTheme, and to the OS
  // motion preference for reduceMotion, so nothing regresses on launch.
  let colorTheme: ColorTheme = "light";
  try {
    const legacy = localStorage.getItem(LEGACY_THEME_KEY);
    if (legacy === "dark") colorTheme = "dark";
    else if (!legacy && window.matchMedia("(prefers-color-scheme: dark)").matches) colorTheme = "dark";
  } catch {
    // ignore
  }
  let reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    // ignore
  }
  return { ...DEFAULT_SETTINGS, colorTheme, reduceMotion };
}

function applySettingsToDom(settings: AccessibilitySettings) {
  const root = document.documentElement;
  root.classList.toggle("dark", settings.colorTheme === "dark" || settings.colorTheme === "high-contrast");
  if (settings.colorTheme === "high-contrast") {
    root.setAttribute("data-a11y-theme", "high-contrast");
  } else {
    root.removeAttribute("data-a11y-theme");
  }
  root.setAttribute("data-text-size", settings.textSize);
  root.toggleAttribute("data-reduce-motion", settings.reduceMotion);
  root.toggleAttribute("data-highlight-links", settings.highlightLinks);
  root.toggleAttribute("data-readable-font", settings.readableFont);
}

const THEME_ANNOUNCE: Record<ColorTheme, string> = {
  light: "Light theme enabled.",
  dark: "Dark theme enabled.",
  "high-contrast": "High-contrast theme enabled.",
};

const TEXT_SIZE_ANNOUNCE: Record<TextSize, string> = {
  small: "Text size decreased.",
  default: "Text size reset to default.",
  large: "Text size increased.",
};

type AccessibilityContextValue = {
  settings: AccessibilitySettings;
  setColorTheme: (theme: ColorTheme) => void;
  setTextSize: (size: TextSize) => void;
  toggleReduceMotion: (value?: boolean) => void;
  toggleHighlightLinks: (value?: boolean) => void;
  toggleReadableFont: (value?: boolean) => void;
  reset: () => void;
  announcement: string;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const announceTimer = useRef<ReturnType<typeof setTimeout>>();

  // Real values are picked up right after mount (mirrors the same
  // hydration-safe pattern the old theme provider used: render the default
  // on the server and on first client paint, then reconcile in an effect so
  // React never sees a server/client mismatch).
  useEffect(() => {
    setSettings(readInitialSettings());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applySettingsToDom(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore (private browsing etc.)
    }
  }, [settings, mounted]);

  useEffect(() => {
    return () => {
      if (announceTimer.current) clearTimeout(announceTimer.current);
    };
  }, []);

  const announce = useCallback((message: string) => {
    setAnnouncement(message);
    if (announceTimer.current) clearTimeout(announceTimer.current);
    announceTimer.current = setTimeout(() => setAnnouncement(""), 4000);
  }, []);

  const setColorTheme = useCallback(
    (theme: ColorTheme) => {
      setSettings((s) => ({ ...s, colorTheme: theme }));
      announce(THEME_ANNOUNCE[theme]);
    },
    [announce],
  );

  const setTextSize = useCallback(
    (size: TextSize) => {
      setSettings((s) => ({ ...s, textSize: size }));
      announce(TEXT_SIZE_ANNOUNCE[size]);
    },
    [announce],
  );

  const toggleReduceMotion = useCallback(
    (value?: boolean) => {
      setSettings((s) => {
        const next = value ?? !s.reduceMotion;
        announce(next ? "Reduce motion enabled." : "Reduce motion disabled.");
        return { ...s, reduceMotion: next };
      });
    },
    [announce],
  );

  const toggleHighlightLinks = useCallback(
    (value?: boolean) => {
      setSettings((s) => {
        const next = value ?? !s.highlightLinks;
        announce(next ? "Highlight links enabled." : "Highlight links disabled.");
        return { ...s, highlightLinks: next };
      });
    },
    [announce],
  );

  const toggleReadableFont = useCallback(
    (value?: boolean) => {
      setSettings((s) => {
        const next = value ?? !s.readableFont;
        announce(next ? "Readable font enabled." : "Readable font disabled.");
        return { ...s, readableFont: next };
      });
    },
    [announce],
  );

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    announce("Accessibility settings reset.");
  }, [announce]);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      settings,
      setColorTheme,
      setTextSize,
      toggleReduceMotion,
      toggleHighlightLinks,
      toggleReadableFont,
      reset,
      announcement,
    }),
    [
      settings,
      setColorTheme,
      setTextSize,
      toggleReduceMotion,
      toggleHighlightLinks,
      toggleReadableFont,
      reset,
      announcement,
    ],
  );

  // "always" disables Framer Motion's animated transitions in one place —
  // decorative floating/parallax motion, entrance reveals, marquee-style
  // repeats — instead of threading a reduced-motion flag through every
  // animated component individually. "user" (the fallback when this
  // toggle is off) makes Framer Motion check prefers-reduced-motion
  // itself, so the OS-level setting is always honoured too.
  const motionSetting = settings.reduceMotion ? "always" : "user";

  return (
    <AccessibilityContext.Provider value={value}>
      <MotionConfig reducedMotion={motionSetting}>{children}</MotionConfig>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within an AccessibilityProvider");
  return ctx;
}
