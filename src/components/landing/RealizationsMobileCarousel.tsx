"use client";

import { cn } from "@/lib/cn";
import { useCarousel } from "@/lib/use-carousel";
import type { Realization } from "@/data/realizations";
import { BeforeAfterCard } from "./BeforeAfterCard";

const VIEWPORT_ID = "realizacje-karuzela-mobile";
const PAIRS_PER_SLIDE = 2;

function toSlides(realizations: Realization[]) {
  const slides: Realization[][] = [];
  for (let index = 0; index < realizations.length; index += PAIRS_PER_SLIDE) {
    slides.push(realizations.slice(index, index + PAIRS_PER_SLIDE));
  }
  return slides;
}

export function RealizationsMobileCarousel({ realizations }: { realizations: Realization[] }) {
  const slides = toSlides(realizations);
  const { viewportRef, scrollTo, selectedIndex, regionProps } = useCarousel({
    autoplay: false,
    options: { align: "start", breakpoints: { "(min-width: 1024px)": { active: false } } },
  });

  return (
    <div role="region" aria-roledescription="karuzela" aria-label="Realizacje przed i po" {...regionProps}>
      <div ref={viewportRef} id={VIEWPORT_ID} className="touch-pan-y overflow-hidden">
        <div className="-ml-3 flex">
          {slides.map((pairs, index) => (
            <div
              key={pairs[0].id}
              role="group"
              aria-roledescription="slajd"
              aria-label={`${index + 1} z ${slides.length}`}
              className="min-w-0 flex-none basis-full space-y-3 pl-3"
            >
              {pairs.map((realization) => (
                <BeforeAfterCard key={realization.id} realization={realization} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        {slides.map((pairs, index) => (
          <button
            key={pairs[0].id}
            type="button"
            aria-label={`Slajd ${index + 1} z ${slides.length}`}
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
