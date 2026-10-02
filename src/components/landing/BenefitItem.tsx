import type { Benefit } from "@/data/benefits";
import { bindShortWords } from "@/lib/typography";

export function BenefitItem({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon;

  return (
    <li className="flex items-center gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-surface-soft">
        <Icon aria-hidden strokeWidth={1.75} className="size-5 text-forest" />
      </span>
      <span className="font-medium text-ink">{bindShortWords(benefit.text)}</span>
    </li>
  );
}
