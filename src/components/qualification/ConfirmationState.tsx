import { Check } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { bindShortWords } from "@/lib/typography";
import { StepTitle } from "./StepTitle";

export function ConfirmationState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="my-auto flex flex-col items-center py-10 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-linear-to-br from-forest to-primary text-white shadow-cta">
          <Check aria-hidden strokeWidth={2.5} className="size-8" />
        </span>
        <StepTitle className="mt-7 max-w-sm">{bindShortWords("Dziękujemy. Mamy Twoje zgłoszenie.")}</StepTitle>
        <p className="mt-4 max-w-sm text-lead text-pretty text-ink-muted">
          {bindShortWords("Oddzwonimy, żeby dopytać o dach i ustalić termin bezpłatnej wizji.")}
        </p>
      </div>
      <PrimaryButton withArrow={false} onClick={onClose} className="w-full lg:hidden">
        Wróć na stronę główną
      </PrimaryButton>
    </div>
  );
}
