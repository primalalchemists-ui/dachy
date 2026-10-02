"use client";

import { CarouselArrow } from "@/components/ui/CarouselArrow";
import { cn } from "@/lib/cn";
import { useCarousel } from "@/lib/use-carousel";
import type { Testimonial } from "@/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";

const VIEWPORT_ID = "opinie-karuzela";

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const hasControls = testimonials.length > 1;
  const { viewportRef, scrollPrev, scrollNext, regionProps } = useCarousel({
    autoplayDelay: 7000,
    autoplay: hasControls,
  });

  return (
    <div
      role="region"
      aria-roledescription="karuzela"
      aria-label="Opinie klientów"
      className={cn(
        "mx-auto max-w-4xl",
        hasControls && "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-6",
      )}
      {...regionProps}
    >
      {hasControls && (
        <CarouselArrow
          direction="prev"
          aria-label="Poprzednia opinia"
          aria-controls={VIEWPORT_ID}
          onClick={scrollPrev}
        />
      )}

      <div ref={viewportRef} id={VIEWPORT_ID} className="overflow-hidden">
        <div className="-ml-4 flex">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              role="group"
              aria-roledescription="slajd"
              aria-label={`${index + 1} z ${testimonials.length}`}
              className="min-w-0 flex-none basis-full pl-4"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {hasControls && (
        <CarouselArrow
          direction="next"
          aria-label="Następna opinia"
          aria-controls={VIEWPORT_ID}
          onClick={scrollNext}
        />
      )}
    </div>
  );
}
