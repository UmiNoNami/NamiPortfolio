"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type AboutModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const AboutModalContext = createContext<AboutModalContextValue | null>(null);

export function AboutModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AboutModalContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </AboutModalContext.Provider>
  );
}

export function useAboutModal() {
  const ctx = useContext(AboutModalContext);
  if (!ctx) throw new Error("useAboutModal must be used within an AboutModalProvider");
  return ctx;
}
