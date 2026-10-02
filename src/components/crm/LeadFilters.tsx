"use client";

import { useState, useTransition, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { formControlClassName } from "@/components/ui/form-control";
import { cn } from "@/lib/cn";
import { LEAD_STATUSES } from "@/lib/leads/status";

export function LeadFilters({ query, status }: { query: string; status: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState(query);
  const [pending, startTransition] = useTransition();

  const navigate = (next: { query: string; status: string }) => {
    const params = new URLSearchParams();
    if (next.query.trim()) params.set("q", next.query.trim());
    if (next.status) params.set("status", next.status);
    const search = params.toString();
    startTransition(() => router.replace(search ? `${pathname}?${search}` : pathname));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({ query: text, status });
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn("mb-4 flex flex-col gap-3 sm:flex-row", pending && "opacity-70")}
    >
      <div className="relative flex-1">
        <Search
          aria-hidden
          strokeWidth={1.75}
          className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-ink-muted"
        />
        <input
          type="search"
          aria-label="Szukaj leadów"
          placeholder="Szukaj po imieniu, telefonie lub miejscowości"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className={cn("h-11 pr-3 pl-10 text-sm", formControlClassName())}
        />
      </div>
      <select
        aria-label="Status"
        value={status}
        onChange={(event) => navigate({ query: text, status: event.target.value })}
        className={cn("h-11 px-3 text-sm sm:w-52", formControlClassName())}
      >
        <option value="">Wszystkie</option>
        {LEAD_STATUSES.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="h-11 rounded-control border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors hover:bg-canvas"
      >
        Szukaj
      </button>
    </form>
  );
}
