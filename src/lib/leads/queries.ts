import "server-only";
import { requireCrmUser } from "@/lib/crm/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { LEAD_STATUSES, type LeadStatus } from "./status";
import type { Lead, LeadSummary } from "./types";
import { isUuid } from "./validate";

const SUMMARY_COLUMNS =
  "id, name, phone, location, status, timeline, financing_interested, next_contact_at, created_at";

const LIST_LIMIT = 200;
const PIPELINE_LIMIT = 500;
const UPCOMING_LIMIT = 8;

function fail(context: string, error: { code?: string; message: string }): never {
  console.error(`[crm] ${context}:`, { code: error.code, message: error.message });
  throw new Error("CRM query failed.");
}

async function countByStatus(status: LeadStatus) {
  const { count, error } = await getSupabaseAdmin()
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("status", status);
  if (error) fail(`count ${status}`, error);
  return count ?? 0;
}

export async function getDashboardData() {
  await requireCrmUser();

  const upcomingQuery = getSupabaseAdmin()
    .from("leads")
    .select(SUMMARY_COLUMNS)
    .not("next_contact_at", "is", null)
    .order("next_contact_at", { ascending: true })
    .limit(UPCOMING_LIMIT);

  const [newLeads, visitsScheduled, quotesSent, won, upcoming] = await Promise.all([
    countByStatus("new"),
    countByStatus("visit_scheduled"),
    countByStatus("quote_sent"),
    countByStatus("won"),
    upcomingQuery,
  ]);
  if (upcoming.error) fail("upcoming contacts", upcoming.error);

  return {
    counts: { newLeads, visitsScheduled, quotesSent, won },
    upcoming: upcoming.data as LeadSummary[],
  };
}

/** Builds a PostgREST `or` filter for name, location and (digits-only) phone. */
function searchFilter(query: string) {
  const text = query.replace(/[,()*%_\\:"]/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return null;

  const filters = [`name.ilike."*${text}*"`, `location.ilike."*${text}*"`];
  const digits = text.replace(/\D/g, "");
  if (digits.length >= 3) filters.push(`phone.ilike."*${digits}*"`);
  return filters.join(",");
}

export async function listLeads({ query, status }: { query: string; status: LeadStatus | null }) {
  await requireCrmUser();

  let request = getSupabaseAdmin()
    .from("leads")
    .select(SUMMARY_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(LIST_LIMIT);

  if (status) request = request.eq("status", status);
  const filter = searchFilter(query);
  if (filter) request = request.or(filter);

  const { data, error } = await request;
  if (error) fail("list leads", error);
  return data as LeadSummary[];
}

export async function getLead(id: string): Promise<Lead | null> {
  await requireCrmUser();
  if (!isUuid(id)) return null;

  const { data, error } = await getSupabaseAdmin().from("leads").select("*").eq("id", id).maybeSingle();
  if (error) fail("get lead", error);
  return data as Lead | null;
}

export async function getPipeline() {
  await requireCrmUser();

  const { data, error } = await getSupabaseAdmin()
    .from("leads")
    .select(SUMMARY_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(PIPELINE_LIMIT);
  if (error) fail("pipeline", error);

  const leads = data as LeadSummary[];
  return LEAD_STATUSES.map((status) => ({
    ...status,
    leads: leads.filter((lead) => lead.status === status.value),
  }));
}
