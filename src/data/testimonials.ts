import source from "../../content/testimonials.json";

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
};

/** Every review on the source site is rated 5/5; the JSON carries text only. */
const SOURCE_RATING = 5;

export const testimonials: Testimonial[] = source.map((entry, index) => ({
  id: `opinia-${index + 1}`,
  quote: entry.quote,
  author: entry.author,
  location: entry.location,
  rating: SOURCE_RATING,
}));
