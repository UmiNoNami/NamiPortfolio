"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ContactChatContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const ContactChatContext = createContext<ContactChatContextValue | null>(null);

export function ContactChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContactChatContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((v) => !v),
      }}
    >
      {children}
    </ContactChatContext.Provider>
  );
}

export function useContactChat() {
  const ctx = useContext(ContactChatContext);
  if (!ctx) throw new Error("useContactChat must be used within a ContactChatProvider");
  return ctx;
}
