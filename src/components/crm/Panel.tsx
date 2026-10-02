import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PanelProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Panel({ title, children, className }: PanelProps) {
  return (
    <section className={cn("rounded-card border border-line bg-surface p-5 sm:p-6", className)}>
      {title && <h2 className="mb-4 text-sm font-semibold text-ink">{title}</h2>}
      {children}
    </section>
  );
}
