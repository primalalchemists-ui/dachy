import { EmptyState } from "@/components/crm/EmptyState";
import { LeadFilters } from "@/components/crm/LeadFilters";
import { LeadList } from "@/components/crm/LeadList";
import { PageHeader } from "@/components/crm/PageHeader";
import { listLeads } from "@/lib/leads/queries";
import { isLeadStatus } from "@/lib/leads/status";

export const metadata = { title: "Leady" };

export default async function CrmLeadsPage({ searchParams }: PageProps<"/admin/leads">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const status = isLeadStatus(params.status) ? params.status : null;

  const leads = await listLeads({ query, status });

  return (
    <>
      <PageHeader title="Leady" />
      <LeadFilters key={`${query}|${status ?? ""}`} query={query} status={status ?? ""} />
      {leads.length === 0 ? <EmptyState message="Brak leadów." /> : <LeadList leads={leads} />}
    </>
  );
}
