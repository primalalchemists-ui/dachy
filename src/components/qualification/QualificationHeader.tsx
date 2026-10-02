import { ChevronLeft, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

type QualificationHeaderProps = {
  onBack?: () => void;
  onClose: () => void;
};

export function QualificationHeader({ onBack, onClose }: QualificationHeaderProps) {
  return (
    <header className="grid h-(--header-height) shrink-0 grid-cols-[1fr_auto_1fr] items-center px-2 sm:px-4 lg:h-18">
      <div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-control text-sm font-medium text-ink-muted transition-colors hover:text-ink lg:pr-3 lg:pl-2"
          >
            <ChevronLeft aria-hidden strokeWidth={2} className="size-5" />
            <span className="sr-only lg:not-sr-only">Wstecz</span>
          </button>
        )}
      </div>
      <BrandLogo />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          aria-label="Zamknij"
          className="hidden size-10 items-center justify-center rounded-control text-ink-muted transition-colors hover:text-ink lg:inline-flex"
        >
          <X aria-hidden strokeWidth={2} className="size-5" />
        </button>
      </div>
    </header>
  );
}
