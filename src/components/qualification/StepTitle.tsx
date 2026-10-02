import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Step heading that receives focus on mount, so each new step is announced. */
export function StepTitle({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <h2 ref={ref} id={id} tabIndex={-1} className={cn("text-question text-balance text-ink outline-none", className)}>
      {children}
    </h2>
  );
}
