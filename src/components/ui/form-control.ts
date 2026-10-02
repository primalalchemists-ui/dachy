import { cn } from "@/lib/cn";

/** Shared look for text inputs, selects and textareas. Size/padding are added by the caller. */
export function formControlClassName(invalid?: boolean) {
  return cn(
    "block w-full rounded-control border bg-surface text-base text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-ink-muted/70 focus:ring-4 focus:outline-none",
    invalid
      ? "border-danger focus:ring-danger/15"
      : "border-line hover:border-ink-muted/40 focus:border-forest focus:ring-forest/15",
  );
}
