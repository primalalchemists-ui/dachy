import { LeadCard } from "@/components/crm/LeadCard";
import { PageHeader } from "@/components/crm/PageHeader";
import { getPipeline } from "@/lib/leads/queries";

export const metadata = { title: "Pipeline" };

export default async function CrmPipelinePage() {
  const columns = await getPipeline();

  return (
    <>
      <PageHeader title="Pipeline" />
      <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <div className="grid auto-cols-[15rem] grid-flow-col gap-3 xl:auto-cols-[minmax(11rem,1fr)]">
          {columns.map((column) => (
            <section
              key={column.value}
              aria-labelledby={`pipeline-${column.value}`}
              className="flex flex-col rounded-card bg-surface-soft/60 p-3"
            >
              <h2
                id={`pipeline-${column.value}`}
                className="mb-3 flex items-center justify-between px-1 text-sm font-semibold text-ink"
              >
                {column.label}
                <span className="text-xs font-medium text-ink-muted tabular-nums">{column.leads.length}</span>
              </h2>
              {column.leads.length === 0 ? (
                <p className="px-1 py-4 text-xs text-ink-muted">Brak leadów w tym etapie.</p>
              ) : (
                <ul className="space-y-2">
                  {column.leads.map((lead) => (
                    <li key={lead.id}>
                      <LeadCard lead={lead} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
