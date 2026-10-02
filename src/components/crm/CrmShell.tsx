import type { ReactNode } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { CRM_HOME_PATH } from "@/lib/crm/routes";
import { CrmNav } from "./CrmNav";
import { SignOutButton } from "./SignOutButton";

export function CrmShell({ userEmail, children }: { userEmail: string | null; children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="flex flex-col gap-3 border-b border-line bg-surface px-4 py-3 lg:sticky lg:top-0 lg:h-dvh lg:gap-8 lg:border-r lg:border-b-0 lg:px-4 lg:py-6">
        <div className="flex items-center justify-between lg:px-3">
          <Link href={CRM_HOME_PATH} aria-label="Pulpit CRM" className="flex flex-col gap-1.5 rounded-sm">
            <BrandLogo size="compact" />
            <span className="text-xs font-medium tracking-[0.12em] text-ink-muted uppercase">CRM</span>
          </Link>
          <div className="lg:hidden">
            <SignOutButton />
          </div>
        </div>

        <CrmNav />

        <div className="mt-auto hidden border-t border-line pt-4 lg:block">
          {userEmail && <p className="truncate px-3 pb-2 text-xs text-ink-muted">{userEmail}</p>}
          <SignOutButton />
        </div>
      </aside>

      <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
