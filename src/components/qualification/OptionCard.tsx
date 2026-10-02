import { cn } from "@/lib/cn";

type OptionCardProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function OptionCard({ label, selected, onSelect }: OptionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "flex min-h-14 w-full items-center gap-4 rounded-control border bg-surface px-5 py-3 text-left text-base font-medium text-ink transition-colors duration-150",
        selected ? "border-forest bg-surface-soft" : "border-line hover:border-forest/40 hover:bg-surface-soft/50",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150",
          selected ? "border-forest" : "border-line",
        )}
      >
        <span
          className={cn(
            "size-2.5 rounded-full bg-forest transition-transform duration-150 motion-reduce:transition-none",
            selected ? "scale-100" : "scale-0",
          )}
        />
      </span>
      {label}
    </button>
  );
}
