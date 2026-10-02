import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { crmLeadPath } from "@/lib/crm/routes";
import { formatDateTime, formatPhone } from "@/lib/format";
import type { LeadSummary } from "@/lib/leads/types";

export function LeadCard({ lead }: { lead: LeadSummary }) {
  return (
    <Link
      href={crmLeadPath(lead.id)}
      className="block rounded-control border border-line bg-surface p-3.5 text-sm transition-colors hover:border-forest/30"
    >
      <p className="font-medium text-ink">{lead.name}</p>
      <p className="mt-1 text-ink-muted">{lead.location}</p>
      <p className="text-ink-muted tabular-nums">{formatPhone(lead.phone)}</p>
      {lead.next_contact_at && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-ink">
          <CalendarClock aria-hidden strokeWidth={1.75} className="size-3.5 text-forest" />
          {formatDateTime(lead.next_contact_at)}
        </p>
      )}
    </Link>
  );
}
