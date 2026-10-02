import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "CRM | Ekologiczna Polska", template: "%s | CRM Ekologiczna Polska" },
  robots: { index: false, follow: false },
};

export default function CrmRootLayout({ children }: { children: ReactNode }) {
  return children;
}
