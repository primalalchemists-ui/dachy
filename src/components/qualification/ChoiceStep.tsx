import type { ChoiceOption } from "@/data/qualification";
import { bindShortWords } from "@/lib/typography";
import { OptionCard } from "./OptionCard";
import { StepTitle } from "./StepTitle";

const TITLE_ID = "qualification-question";

type ChoiceStepProps<V extends string> = {
  question: string;
  helper?: string;
  options: readonly ChoiceOption<V>[];
  selected: V | null;
  onSelect: (value: V) => void;
};

export function ChoiceStep<V extends string>({ question, helper, options, selected, onSelect }: ChoiceStepProps<V>) {
  return (
    <div>
      <StepTitle id={TITLE_ID}>{bindShortWords(question)}</StepTitle>
      {helper && <p className="mt-3 text-pretty text-ink-muted">{helper}</p>}
      <div role="group" aria-labelledby={TITLE_ID} className="mt-6 space-y-3 lg:mt-8">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            selected={option.value === selected}
            onSelect={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
