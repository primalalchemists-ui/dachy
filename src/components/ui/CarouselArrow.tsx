import type { ComponentPropsWithoutRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type CarouselArrowProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  direction: "prev" | "next";
};

export function CarouselArrow({ direction, className, ...props }: CarouselArrowProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Poprzedni slajd" : "Następny slajd"}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-forest shadow-control transition-colors duration-200 hover:bg-surface-soft sm:size-12",
        className,
      )}
      {...props}
    >
      <Icon aria-hidden strokeWidth={2} className="size-5" />
    </button>
  );
}
