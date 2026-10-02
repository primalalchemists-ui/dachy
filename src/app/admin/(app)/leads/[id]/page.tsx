import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import { LeadEditor } from "@/components/crm/LeadEditor";
import { Panel } from "@/components/crm/Panel";
import { StatusBadge } from "@/components/crm/StatusBadge";
import { CRM_LEADS_PATH } from "@/lib/crm/routes";
import { formatDateTime, formatPhone, toDateTimeInputValue } from "@/lib/format";
import { buildingTypeLabel, financingLabel, roofCoveringLabel, timelineLabel } from "@/lib/leads/labels";
import { getLead } from "@/lib/leads/queries";

export const metadata = { title: "Szczegóły leada" };

function DetailList({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-xs text-ink-muted">{item.label}</dt>
          <dd className="mt-1 text-sm font-medium text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function CrmLeadPage({ params }: PageProps<"/admin/leads/[id]">) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();

  const hasAttribution = Boolean(lead.utm_source || lead.utm_campaign || lead.utm_content);

  return (
    <>
      <Link
        href={CRM_LEADS_PATH}
        className="mb-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft aria-hidden strokeWidth={1.75} className="size-4" />
        Leady
      </Link>

      <header className="mb-6 lg:mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{lead.name}</h1>
          <StatusBadge status={lead.status} />
        </div>
        <p className="mt-1 text-sm text-ink-muted">Zgłoszenie: {formatDateTime(lead.created_at)}</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-6">
        <Panel title="Kontakt" className="lg:col-start-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={`tel:${lead.phone}`}
              className="inline-flex items-center gap-2 rounded-sm text-lg font-semibold text-forest tabular-nums underline-offset-4 hover:underline"
            >
              <Phone aria-hidden strokeWidth={1.75} className="size-5" />
              {formatPhone(lead.phone)}
            </a>
            <p className="inline-flex items-center gap-2 text-ink">
              <MapPin aria-hidden strokeWidth={1.75} className="size-5 text-ink-muted" />
              {lead.location}
            </p>
          </div>
        </Panel>

        <Panel title="Obsługa leada" className="lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-start">
          <LeadEditor
            leadId={lead.id}
            initialValues={{
              status: lead.status,
              notes: lead.notes ?? "",
              nextContact: toDateTimeInputValue(lead.next_contact_at),
            }}
          />
        </Panel>

        <Panel title="Kwalifikacja" className="lg:col-start-1">
          <DetailList
            items={[
              { label: "Obecne pokrycie", value: roofCoveringLabel(lead.roof_covering) },
              { label: "Typ budynku", value: buildingTypeLabel(lead.building_type) },
              { label: "Termin wymiany", value: timelineLabel(lead.timeline) },
              { label: "Finansowanie", value: financingLabel(lead.financing_interested) },
            ]}
          />
        </Panel>

        <div className="lg:col-start-1">
          <Panel title="Źródło" className="bg-transparent">
            {hasAttribution ? (
              <DetailList
                items={[
                  { label: "Źródło (utm_source)", value: lead.utm_source ?? "—" },
                  { label: "Kampania (utm_campaign)", value: lead.utm_campaign ?? "—" },
                  { label: "Reklama (utm_content)", value: lead.utm_content ?? "—" },
                ]}
              />
            ) : (
              <p className="text-sm text-ink-muted">Brak danych</p>
            )}
          </Panel>
          <p className="mt-3 px-1 text-xs text-ink-muted">
            Zgoda na politykę prywatności: {formatDateTime(lead.privacy_accepted_at)}
          </p>
        </div>
      </div>
    </>
  );
}
