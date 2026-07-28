"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "nami-theme";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Class-based dark mode (toggles `dark` on <html>, matching Tailwind's
 * `darkMode: "class"` setup).
 *
 * `theme` always starts as "light" — on the server AND on the client's
 * first hydration render — so React never sees a server/client mismatch.
 * (An earlier version read `document.documentElement.classList` inside a
 * `useState` lazy initializer to get the "real" value immediately; that
 * runs during the client's hydration render too, so if the anti-flash
 * script had already set `dark`, the client's first render disagreed with
 * the server-rendered HTML and React threw a hydration error.)
 *
 * The real theme is picked up in an effect right after mount — a normal
 * post-hydration re-render, which is allowed to differ. A `mounted` guard
 * stops the *second* effect (the one that writes the class back to the
 * DOM) from running before the first effect has read the real value, which
 * would otherwise overwrite whatever the anti-flash script had already set.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore (private browsing etc.)
    }
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
