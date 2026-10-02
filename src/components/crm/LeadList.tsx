import Link from "next/link";
import { crmLeadPath } from "@/lib/crm/routes";
import { formatDate, formatPhone } from "@/lib/format";
import { financingLabel, timelineLabel } from "@/lib/leads/labels";
import type { LeadSummary } from "@/lib/leads/types";
import { StatusBadge } from "./StatusBadge";

const COLUMNS =
  "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.3fr)_6.5rem_7rem]";

export function LeadList({ leads }: { leads: LeadSummary[] }) {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface">
      <div
        aria-hidden
        className={`hidden gap-4 border-b border-line px-5 py-3 text-xs font-medium text-ink-muted lg:grid ${COLUMNS}`}
      >
        <span>Klient</span>
        <span>Telefon</span>
        <span>Miejscowość</span>
        <span>Status</span>
        <span>Termin</span>
        <span>Finansowanie</span>
        <span>Data zgłoszenia</span>
      </div>
      <ul className="divide-y divide-line">
        {leads.map((lead) => (
          <li key={lead.id}>
            <Link href={crmLeadPath(lead.id)} className="block px-5 py-4 text-sm transition-colors hover:bg-canvas">
              <div className="flex items-start justify-between gap-3 lg:hidden">
                <div className="min-w-0">
                  <p className="font-medium text-ink">{lead.name}</p>
                  <p className="mt-0.5 text-ink-muted">
                    {lead.location} · <span className="tabular-nums">{formatPhone(lead.phone)}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {timelineLabel(lead.timeline)} · {formatDate(lead.created_at)}
                  </p>
                </div>
                <StatusBadge status={lead.status} />
              </div>

              <div className={`hidden items-center gap-4 lg:grid ${COLUMNS}`}>
                <span className="truncate font-medium text-ink">{lead.name}</span>
                <span className="text-ink tabular-nums">{formatPhone(lead.phone)}</span>
                <span className="truncate text-ink-muted">{lead.location}</span>
                <span>
                  <StatusBadge status={lead.status} />
                </span>
                <span className="text-ink-muted">{timelineLabel(lead.timeline)}</span>
                <span className="text-ink-muted">{financingLabel(lead.financing_interested)}</span>
                <span className="text-ink-muted tabular-nums">{formatDate(lead.created_at)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
