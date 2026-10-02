"use client";

import { CarouselArrow } from "@/components/ui/CarouselArrow";
import { useCarousel } from "@/lib/use-carousel";
import type { Realization } from "@/data/realizations";
import { BeforeAfterCard } from "./BeforeAfterCard";

const VIEWPORT_ID = "realizacje-karuzela";

export function RealizationsCarousel({ realizations }: { realizations: Realization[] }) {
  const { viewportRef, scrollPrev, scrollNext, regionProps } = useCarousel({
    autoplayDelay: 6000,
    options: { align: "start", breakpoints: { "(max-width: 1023px)": { active: false } } },
  });

  return (
    <div
      role="region"
      aria-roledescription="karuzela"
      aria-label="Realizacje przed i po"
      className="relative"
      {...regionProps}
    >
      <div ref={viewportRef} id={VIEWPORT_ID} className="overflow-hidden">
        <div className="-ml-6 flex">
          {realizations.map((realization, index) => (
            <div
              key={realization.id}
              role="group"
              aria-roledescription="slajd"
              aria-label={`${index + 1} z ${realizations.length}`}
              className="min-w-0 flex-none basis-[82%] pl-6"
            >
              <BeforeAfterCard realization={realization} />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
        <CarouselArrow
          direction="prev"
          aria-label="Poprzednia realizacja"
          aria-controls={VIEWPORT_ID}
          onClick={scrollPrev}
          className="pointer-events-auto -translate-x-1/2"
        />
        <CarouselArrow
          direction="next"
          aria-label="Następna realizacja"
          aria-controls={VIEWPORT_ID}
          onClick={scrollNext}
          className="pointer-events-auto translate-x-1/2"
        />
      </div>
    </div>
  );
}
