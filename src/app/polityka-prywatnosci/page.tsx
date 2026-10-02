import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Polityka prywatności | ${site.name}`,
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="section-y">
        <Container className="max-w-3xl">
          <h1 className="text-title text-ink">Polityka prywatności</h1>
          <p className="mt-6 text-lead text-ink-muted">
            Treść tymczasowa. Pełna polityka prywatności zostanie opublikowana przed uruchomieniem serwisu.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex rounded-sm font-medium text-forest underline underline-offset-4 hover:no-underline"
          >
            Wróć na stronę główną
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
