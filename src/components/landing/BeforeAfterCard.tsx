import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import type { Realization, RealizationPhoto } from "@/data/realizations";

const PHOTO_SIZES = "(min-width: 1216px) 470px, (min-width: 1024px) 40vw, 50vw";

function StagePhoto({ photo, stage }: { photo: RealizationPhoto; stage: "before" | "after" }) {
  return (
    <Photo src={photo.src} alt={photo.alt} sizes={PHOTO_SIZES} className="aspect-square sm:aspect-[4/3]">
      <span
        className={cn(
          "absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-semibold tracking-[0.1em] text-white sm:top-4 sm:left-4",
          stage === "before" ? "bg-ink/90" : "bg-forest",
        )}
      >
        {stage === "before" ? "PRZED" : "PO"}
      </span>
    </Photo>
  );
}

export function BeforeAfterCard({ realization }: { realization: Realization }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <StagePhoto photo={realization.before} stage="before" />
      <StagePhoto photo={realization.after} stage="after" />
    </div>
  );
}
