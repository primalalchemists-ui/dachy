"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Columns3, LayoutDashboard, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import { CRM_HOME_PATH, CRM_LEADS_PATH, CRM_PIPELINE_PATH } from "@/lib/crm/routes";

const NAV_ITEMS = [
  { href: CRM_HOME_PATH, label: "Pulpit", icon: LayoutDashboard },
  { href: CRM_LEADS_PATH, label: "Leady", icon: Users },
  { href: CRM_PIPELINE_PATH, label: "Pipeline", icon: Columns3 },
];

export function CrmNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="CRM">
      <ul className="flex gap-1 overflow-x-auto lg:flex-col">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === CRM_HOME_PATH ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-control px-3 text-sm font-medium whitespace-nowrap transition-colors",
                  active ? "bg-surface-soft text-forest" : "text-ink-muted hover:bg-canvas hover:text-ink",
                )}
              >
                <Icon aria-hidden strokeWidth={1.75} className="size-4.5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
