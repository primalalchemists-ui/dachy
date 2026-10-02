import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import { ProcessCard } from "./ProcessCard";

export function ProcessSection() {
  return (
    <section aria-labelledby="proces-title" className="section-y">
      <Container>
        <SectionHeading id="proces-title" title="Zostaw kontakt. Resztą zajmiemy się my." className="mb-10 lg:mb-14" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {processSteps.map((step) => (
            <ProcessCard key={step.number} step={step} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
