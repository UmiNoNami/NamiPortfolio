"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

// Registry of overlay windows that can be popped open on top of the page
// (as opposed to the always-on windows drawn directly on the desktop
// canvas). Add new ids here as more windows get the "opens like a real OS
// window" treatment.
export type WindowId = "about" | "playground";

type WindowManagerContextValue = {
  isOpen: (id: WindowId) => boolean;
  open: (id: WindowId) => void;
  close: (id: WindowId) => void;
  toggle: (id: WindowId) => void;
};

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [openIds, setOpenIds] = useState<Set<WindowId>>(new Set());

  const open = useCallback((id: WindowId) => {
    setOpenIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const close = useCallback((id: WindowId) => {
    setOpenIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggle = useCallback((id: WindowId) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isOpen = useCallback((id: WindowId) => openIds.has(id), [openIds]);

  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle]);

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error("useWindowManager must be used within a WindowManagerProvider");
  }
  return ctx;
}
