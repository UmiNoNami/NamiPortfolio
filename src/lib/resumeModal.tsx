"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ResumeModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ResumeModalContext = createContext<ResumeModalContextValue | null>(null);

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ResumeModalContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  const ctx = useContext(ResumeModalContext);
  if (!ctx) throw new Error("useResumeModal must be used within a ResumeModalProvider");
  return ctx;
}
