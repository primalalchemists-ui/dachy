import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

export function TestimonialsSection() {
  return (
    <section aria-labelledby="opinie-title" className="section-y">
      <Container>
        <SectionHeading id="opinie-title" title="Co mówią o nas nasi klienci" className="mx-auto mb-10 text-center lg:mb-14" />
        <TestimonialsCarousel testimonials={testimonials} />
      </Container>
    </section>
  );
}
