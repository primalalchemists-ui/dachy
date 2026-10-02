"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { captureAttribution } from "@/lib/attribution";
import { QualificationDialog } from "./QualificationDialog";

type QualificationContextValue = {
  open: (trigger?: HTMLElement) => void;
};

const QualificationContext = createContext<QualificationContextValue | null>(null);

export function QualificationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    captureAttribution();
  }, []);

  const open = useCallback((element?: HTMLElement) => {
    trigger.current = element ?? null;
    setIsOpen(true);
  }, []);

  const handleClosed = useCallback(() => {
    setIsOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <QualificationContext value={value}>
      {children}
      {isOpen && <QualificationDialog onClosed={handleClosed} />}
    </QualificationContext>
  );
}

export function useQualification() {
  const context = useContext(QualificationContext);
  if (!context) throw new Error("useQualification must be used within QualificationProvider");
  return context;
}
