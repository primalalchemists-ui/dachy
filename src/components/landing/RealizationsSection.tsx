import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { realizations } from "@/data/realizations";
import { RealizationsCarousel } from "./RealizationsCarousel";
import { RealizationsMobileCarousel } from "./RealizationsMobileCarousel";

const MOBILE_REALIZATION_COUNT = 4;

export function RealizationsSection() {
  return (
    <section aria-labelledby="realizacje-title" className="section-y bg-surface">
      <Container>
        <SectionHeading
          id="realizacje-title"
          eyebrow="Realizacje Ekologicznej Polski"
          title="Zobacz, jak zmienia się dach po wymianie"
          className="mb-10 lg:mb-14"
        />
        <div className="hidden lg:block">
          <RealizationsCarousel realizations={realizations} />
        </div>
        <div className="lg:hidden">
          <RealizationsMobileCarousel realizations={realizations.slice(0, MOBILE_REALIZATION_COUNT)} />
        </div>
      </Container>
    </section>
  );
}
