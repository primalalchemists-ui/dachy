import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  id: string;
  label: ReactNode;
  error?: string;
};

export function Checkbox({ id, label, error, className, ...props }: CheckboxProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <span className="relative mt-0.5 flex size-5 shrink-0">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "peer size-5 cursor-pointer appearance-none rounded-md border bg-surface transition-colors duration-150 checked:border-forest checked:bg-forest",
              error ? "border-danger" : "border-ink-muted/40 hover:border-forest",
            )}
            {...props}
          />
          <Check
            aria-hidden
            strokeWidth={3}
            className="pointer-events-none absolute inset-0 m-auto size-3.5 text-white opacity-0 peer-checked:opacity-100"
          />
        </span>
        <label htmlFor={id} className="cursor-pointer text-[0.9375rem] leading-6 text-ink">
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 pl-8 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
