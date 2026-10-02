import Image from "next/image";
import { site } from "@/lib/site";

const SIZE_CLASS = {
  header: "h-10 sm:h-12",
  compact: "h-9",
  centered: "h-14 sm:h-16",
} as const;

/** The Ekologiczna Polska logo (public/brand/logo.webp, 640×198). Height is fixed per size; width follows the aspect ratio. */
export function BrandLogo({ size = "header" }: { size?: keyof typeof SIZE_CLASS }) {
  return (
    <Image
      src="/brand/logo.webp"
      alt={site.name}
      width={640}
      height={198}
      unoptimized
      loading="eager"
      className={`w-auto ${SIZE_CLASS[size]}`}
    />
  );
}
