import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

const MAX_RATING = 5;

export function StarRating({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`Ocena ${rating} na ${MAX_RATING}`} className="flex gap-1">
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          strokeWidth={1.5}
          className={cn("size-5", index < rating ? "fill-star text-star" : "fill-line text-line")}
        />
      ))}
    </div>
  );
}
