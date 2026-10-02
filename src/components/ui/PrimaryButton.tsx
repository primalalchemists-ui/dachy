import type { ComponentPropsWithoutRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type PrimaryButtonProps = ComponentPropsWithoutRef<"button"> & {
  withArrow?: boolean;
};

export function PrimaryButton({
  children,
  withArrow = true,
  type = "button",
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "group inline-flex h-13 items-center justify-center gap-2.5 rounded-control bg-linear-to-r from-forest to-primary px-7 text-base font-semibold text-white shadow-cta transition-[filter,translate] duration-200 hover:brightness-110 active:translate-y-px disabled:pointer-events-none disabled:opacity-60",
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && (
        <ArrowRight
          aria-hidden
          strokeWidth={2}
          className="size-4.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      )}
    </button>
  );
}
