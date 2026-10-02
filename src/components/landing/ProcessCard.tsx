import type { ProcessStep } from "@/data/process";
import { bindShortWords } from "@/lib/typography";

export function ProcessCard({ step }: { step: ProcessStep }) {
  const Icon = step.icon;

  return (
    <li className="relative overflow-hidden rounded-card border border-line bg-surface p-6 sm:p-7">
      <Icon
        aria-hidden
        strokeWidth={1.25}
        className="pointer-events-none absolute -top-5 -right-5 size-32 text-forest/8 sm:size-36"
      />
      <span className="text-sm font-semibold tracking-[0.08em] text-forest tabular-nums">{step.number}</span>
      <h3 className="mt-10 text-lg font-semibold tracking-tight text-ink sm:mt-14">{step.title}</h3>
      <p className="mt-2 text-pretty text-ink-muted">{bindShortWords(step.text)}</p>
    </li>
  );
}
