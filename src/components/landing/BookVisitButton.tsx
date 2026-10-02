"use client";

import { useQualification } from "@/components/qualification/QualificationProvider";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { site } from "@/lib/site";

export function BookVisitButton() {
  const { open } = useQualification();

  return (
    <PrimaryButton aria-haspopup="dialog" onClick={(event) => open(event.currentTarget)} className="w-full sm:w-auto">
      {site.ctaLabel}
    </PrimaryButton>
  );
}
