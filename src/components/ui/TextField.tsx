import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { formControlClassName } from "./form-control";

type TextFieldProps = ComponentPropsWithoutRef<"input"> & {
  id: string;
  label: string;
  error?: string;
};

export function TextField({ id, label, error, className, ...props }: TextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn("mt-2 h-13 px-4", formControlClassName(Boolean(error)))}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
