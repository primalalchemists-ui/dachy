import type { ReactNode } from "react";

export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4 lg:mb-8">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
      {children}
    </header>
  );
}
