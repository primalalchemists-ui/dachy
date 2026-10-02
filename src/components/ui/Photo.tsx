import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
  children?: ReactNode;
};

export function Photo({ src, alt, sizes, className, preload, children }: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-card bg-surface-soft", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
      {children}
    </div>
  );
}
