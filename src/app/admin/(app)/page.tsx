import Link from "next/link";
import { DashboardStat } from "@/components/crm/DashboardStat";
import { EmptyState } from "@/components/crm/EmptyState";
import { PageHeader } from "@/components/crm/PageHeader";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { CRM_LEADS_PATH, crmLeadPath } from "@/lib/crm/routes";
import { formatDateTime, formatPhone } from "@/lib/format";
import { getDashboardData } from "@/lib/leads/queries";

export const metadata = { title: "Pulpit" };

export default async function CrmDashboardPage() {
  const { counts, upcoming } = await getDashboardData();

  const stats = [
    { label: "Nowe leady", value: counts.newLeads, status: "new" },
    { label: "Umówione wizyty", value: counts.visitsScheduled, status: "visit_scheduled" },
    { label: "Wysłane wyceny", value: counts.quotesSent, status: "quote_sent" },
    { label: "Wygrane", value: counts.won, status: "won" },
  ];

  return (
    <>
      <PageHeader title="Pulpit" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {stats.map((stat) => (
          <DashboardStat
            key={stat.status}
            label={stat.label}
            value={stat.value}
            href={`${CRM_LEADS_PATH}?status=${stat.status}`}
          />
        ))}
      </div>

      <section aria-labelledby="upcoming-title" className="mt-10">
        <h2 id="upcoming-title" className="mb-4 text-lg font-semibold tracking-tight text-ink">
          Do kontaktu
        </h2>
        {upcoming.length === 0 ? (
          <EmptyState message="Brak zaplanowanych kontaktów." />
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
            {upcoming.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={crmLeadPath(lead.id)}
                  className="flex flex-col gap-2 px-5 py-4 text-sm transition-colors hover:bg-canvas sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{lead.name}</p>
                    <p className="mt-0.5 text-ink-muted">
                      {lead.location} · <span className="tabular-nums">{formatPhone(lead.phone)}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {lead.next_contact_at && (
                      <span className="font-medium text-ink tabular-nums">{formatDateTime(lead.next_contact_at)}</span>
                    )}
                    <StatusBadge status={lead.status} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
