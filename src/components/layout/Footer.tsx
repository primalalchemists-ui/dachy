import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <Container className="flex flex-col gap-4 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold tracking-[0.08em] text-ink uppercase">{site.name}</p>
        <div className="flex items-center gap-6">
          <Link
            href={site.privacyPolicyHref}
            className="rounded-sm underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Polityka prywatności
          </Link>
          <p>© 2026</p>
        </div>
      </Container>
    </footer>
  );
}
