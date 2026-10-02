import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";

type EmblaOptions = Parameters<typeof useEmblaCarousel>[0];

type UseCarouselOptions = {
  autoplayDelay?: number;
  autoplay?: boolean;
  options?: EmblaOptions;
};

export function useCarousel({ autoplayDelay = 6000, autoplay = true, options }: UseCarouselOptions) {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, duration: 40, ...options });
  const timer = useRef<number | undefined>(undefined);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const stopAutoplay = useCallback(() => {
    window.clearInterval(timer.current);
    timer.current = undefined;
  }, []);

  useEffect(() => {
    if (!api || !autoplay) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timer.current = window.setInterval(() => api.scrollNext(), autoplayDelay);
    api.on("pointerDown", stopAutoplay);

    return () => {
      stopAutoplay();
      api.off("pointerDown", stopAutoplay);
    };
  }, [api, autoplay, autoplayDelay, stopAutoplay]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect).on("reInit", onSelect);
    return () => {
      api.off("select", onSelect).off("reInit", onSelect);
    };
  }, [api]);

  const scrollPrev = useCallback(() => {
    stopAutoplay();
    api?.scrollPrev();
  }, [api, stopAutoplay]);

  const scrollNext = useCallback(() => {
    stopAutoplay();
    api?.scrollNext();
  }, [api, stopAutoplay]);

  const scrollTo = useCallback(
    (index: number) => {
      stopAutoplay();
      api?.scrollTo(index);
    },
    [api, stopAutoplay],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  return {
    viewportRef,
    scrollPrev,
    scrollNext,
    scrollTo,
    selectedIndex,
    regionProps: { onKeyDown, onFocus: stopAutoplay },
  };
}
