import { cn } from "@/lib/cn";
import { bindShortWords } from "@/lib/typography";

type SectionHeadingProps = {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ id, title, eyebrow, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className="mb-4 text-eyebrow text-forest">{eyebrow}</p>}
      <h2 id={id} className="text-title text-balance text-ink">
        {bindShortWords(title)}
      </h2>
      {description && <p className="mt-5 text-lead text-pretty text-ink-muted">{bindShortWords(description)}</p>}
    </div>
  );
}
