"use server";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { LeadInsertResult, LeadSubmission } from "./types";
import { isHoneypotFilled, toLeadInsert } from "./validate";

export async function submitLead(submission: LeadSubmission): Promise<LeadInsertResult> {
  const input: unknown = submission;

  if (isHoneypotFilled(input)) {
    console.warn("[leads] Honeypot filled – submission discarded.");
    return { ok: true };
  }

  const lead = toLeadInsert(input, new Date());
  if (!lead) {
    console.warn("[leads] Submission failed server-side validation.");
    return { ok: false, reason: "invalid" };
  }

  try {
    const { error } = await getSupabaseAdmin().from("leads").insert(lead);
    if (error) {
      console.error("[leads] Insert failed:", { code: error.code, message: error.message, details: error.details, hint: error.hint });
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[leads] Insert threw:", error);
    return { ok: false, reason: "failed" };
  }
}
