import { cn } from "@/lib/cn";
import { leadStatusLabel, type LeadStatus } from "@/lib/leads/status";

const DOT_CLASS: Record<LeadStatus, string> = {
  new: "bg-primary",
  contacted: "bg-ink-muted",
  visit_scheduled: "bg-status-visit",
  quote_sent: "bg-status-quote",
  won: "bg-forest",
  lost: "bg-danger",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-0.5 text-xs font-medium whitespace-nowrap text-ink">
      <span aria-hidden className={cn("size-1.5 rounded-full", DOT_CLASS[status] ?? "bg-line")} />
      {leadStatusLabel(status)}
    </span>
  );
}
