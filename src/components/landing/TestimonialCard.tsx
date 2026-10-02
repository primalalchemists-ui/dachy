import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import type { Testimonial } from "@/data/testimonials";
import { bindShortWords } from "@/lib/typography";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col items-center justify-center rounded-card border border-line bg-surface px-5 py-8 text-center shadow-soft sm:px-12 sm:py-12">
      <StarRating rating={testimonial.rating} />
      <blockquote className="mt-6 text-base leading-relaxed font-medium text-pretty text-ink sm:text-lg">
        <p>„{bindShortWords(testimonial.quote)}”</p>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3 text-left">
        <Avatar name={testimonial.author} />
        <span>
          <span className="block font-semibold text-ink">{testimonial.author}</span>
          <span className="block text-sm text-ink-muted">{testimonial.location}</span>
        </span>
      </figcaption>
    </figure>
  );
}
