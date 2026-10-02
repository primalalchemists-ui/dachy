import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/crm/LoginForm";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { getCrmUser } from "@/lib/crm/auth";
import { CRM_HOME_PATH } from "@/lib/crm/routes";

export const metadata: Metadata = { title: "Logowanie" };

export default async function CrmLoginPage() {
  if (await getCrmUser()) redirect(CRM_HOME_PATH);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-canvas px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2">
          <BrandLogo size="centered" />
          <span className="text-xs font-medium tracking-[0.12em] text-ink-muted uppercase">CRM</span>
        </div>
        <div className="rounded-card border border-line bg-surface p-6 shadow-soft sm:p-8">
          <h1 className="mb-6 text-xl font-semibold tracking-tight text-ink">Logowanie</h1>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
