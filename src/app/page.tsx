import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { RealizationsSection } from "@/components/landing/RealizationsSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { QualificationProvider } from "@/components/qualification/QualificationProvider";

export default function Home() {
  return (
    <QualificationProvider>
      <Header />
      <main>
        <Hero />
        <RealizationsSection />
        <ProcessSection />
        <SolutionSection />
        <TestimonialsSection />
        <FinalCta />
      </main>
      <Footer />
    </QualificationProvider>
  );
}
