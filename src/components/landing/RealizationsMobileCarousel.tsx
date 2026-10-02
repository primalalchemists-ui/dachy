"use client";

import { cn } from "@/lib/cn";
import { useCarousel } from "@/lib/use-carousel";
import type { Realization } from "@/data/realizations";
import { BeforeAfterCard } from "./BeforeAfterCard";

const VIEWPORT_ID = "realizacje-karuzela-mobile";

export function RealizationsMobileCarousel({ realizations }: { realizations: Realization[] }) {
  const { viewportRef, scrollTo, selectedIndex, regionProps } = useCarousel({
    autoplay: false,
    options: { align: "start", breakpoints: { "(min-width: 1024px)": { active: false } } },
  });

  return (
    <div role="region" aria-roledescription="karuzela" aria-label="Realizacje przed i po" {...regionProps}>
      <div ref={viewportRef} id={VIEWPORT_ID} className="touch-pan-y overflow-hidden">
        <div className="-ml-3 flex">
          {realizations.map((realization, index) => (
            <div
              key={realization.id}
              role="group"
              aria-roledescription="slajd"
              aria-label={`${index + 1} z ${realizations.length}`}
              className="min-w-0 flex-none basis-full pl-3"
            >
              <BeforeAfterCard realization={realization} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        {realizations.map((realization, index) => (
          <button
            key={realization.id}
            type="button"
            aria-label={`Realizacja ${index + 1} z ${realizations.length}`}
            aria-current={index === selectedIndex ? "true" : undefined}
            aria-controls={VIEWPORT_ID}
            onClick={() => scrollTo(index)}
            className="flex size-6 items-center justify-center rounded-full"
          >
            <span
              aria-hidden
              className={cn(
                "size-2 rounded-full transition-colors duration-200",
                index === selectedIndex ? "bg-forest" : "bg-line",
              )}
            />
          </button>
        ))}
      </div>

      <p className="mt-1 text-center text-xs text-ink-muted">Przesuń, aby zobaczyć więcej</p>
    </div>
  );
}
