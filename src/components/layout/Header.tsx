import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header>
      <Container className="flex h-(--header-height) items-center">
        <Link href="/" aria-label={`${site.name} – strona główna`} className="inline-flex rounded-sm">
          <BrandLogo />
        </Link>
      </Container>
    </header>
  );
}
