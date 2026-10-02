import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { bindShortWords } from "@/lib/typography";
import { BookVisitButton } from "./BookVisitButton";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex min-h-[calc(100svh-var(--header-height))] flex-col pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pt-8 sm:pb-10 lg:block lg:min-h-0 lg:pt-12 lg:pb-28"
    >
      <Container className="flex flex-1 flex-col lg:grid lg:grid-cols-2 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-x-16">
        <div className="max-w-xl lg:col-start-1 lg:row-start-2">
          <h1 id="hero-title" className="text-display text-balance text-ink">
            {bindShortWords("Wymiana pokrycia dachowego w Opolu i okolicach")}
          </h1>
          <p className="mt-5 text-lead text-pretty text-ink-muted sm:mt-6">
            {bindShortWords("Bezpłatna wizja lokalna i wycena. Możliwość finansowania.")}
          </p>
        </div>
        <Photo
          src="/images/hero.webp"
          alt="Dom jednorodzinny z dachem z blachy na rąbek"
          sizes="(min-width: 1216px) 640px, (min-width: 1024px) 52vw, 100vw"
          preload
          className="mt-8 min-h-52 flex-1 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-0 lg:aspect-[5/4] lg:min-h-0"
        />
        <div className="mt-6 sm:mt-8 lg:col-start-1 lg:row-start-3 lg:mt-10">
          <BookVisitButton />
        </div>
      </Container>
    </section>
  );
}
