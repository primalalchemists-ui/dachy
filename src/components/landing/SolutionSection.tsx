import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { benefits } from "@/data/benefits";
import { BenefitItem } from "./BenefitItem";

export function SolutionSection() {
  return (
    <section aria-labelledby="rozwiazanie-title" className="section-y bg-surface">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Photo
          src="/images/pokrycia.webp"
          alt="Przykładowe rodzaje pokryć dachowych z blachy"
          sizes="(min-width: 1216px) 560px, (min-width: 1024px) 46vw, 100vw"
          className="order-last aspect-[4/3] lg:order-first"
        />
        <div>
          <SectionHeading
            id="rozwiazanie-title"
            title="Dobierzemy rozwiązanie do Twojego dachu"
            description="Eternit, blacha, dachówka czy inne pokrycie. Sprawdzimy dach na miejscu i pokażemy Ci dostępne możliwości."
          />
          <ul className="mt-8 space-y-4 sm:mt-10">
            {benefits.map((benefit) => (
              <BenefitItem key={benefit.text} benefit={benefit} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
