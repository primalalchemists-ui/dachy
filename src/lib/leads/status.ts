export const LEAD_STATUSES = [
  { value: "new", label: "Nowy" },
  { value: "contacted", label: "Skontaktowany" },
  { value: "visit_scheduled", label: "Wizyta umówiona" },
  { value: "quote_sent", label: "Wycena wysłana" },
  { value: "won", label: "Wygrany" },
  { value: "lost", label: "Przegrany" },
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number]["value"];

export function isLeadStatus(value: unknown): value is LeadStatus {
  return LEAD_STATUSES.some((status) => status.value === value);
}

export function leadStatusLabel(status: string): string {
  return LEAD_STATUSES.find((item) => item.value === status)?.label ?? status;
}
