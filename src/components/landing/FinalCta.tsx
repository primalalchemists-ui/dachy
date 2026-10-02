import { Container } from "@/components/ui/Container";
import { bindShortWords } from "@/lib/typography";
import { BookVisitButton } from "./BookVisitButton";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="section-y bg-night text-white [--focus-ring:var(--color-accent)]">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-2xl">
          <h2 id="final-cta-title" className="text-title text-balance">
            {bindShortWords("Chcesz wiedzieć, co warto zrobić z Twoim dachem?")}
          </h2>
          <p className="mt-5 text-lead text-pretty text-white/70">
            {bindShortWords("Zobaczymy dach, omówimy możliwości i przygotujemy wycenę.")}
          </p>
        </div>
        <div className="shrink-0">
          <BookVisitButton />
        </div>
      </Container>
    </section>
  );
}
