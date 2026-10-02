"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import type { LeadEditorValues, LeadUpdateResult } from "@/lib/leads/types";
import { isUuid, toLeadUpdate } from "@/lib/leads/validate";
import { createSupabaseAuthClient } from "@/lib/supabase/auth-client";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { requireCrmUser } from "./auth";
import { CRM_HOME_PATH, CRM_LOGIN_PATH } from "./routes";

export type SignInState = { error: string | null; email: string };

export async function signIn(_previous: SignInState, formData: FormData): Promise<SignInState> {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
    return { error: "Nieprawidłowy email lub hasło.", email: typeof email === "string" ? email : "" };
  }

  try {
    const supabase = await createSupabaseAuthClient();
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      console.warn("[crm] Sign-in failed:", { code: error.code, status: error.status });
      return {
        error:
          error.code === "invalid_credentials"
            ? "Nieprawidłowy email lub hasło."
            : "Nie udało się zalogować. Spróbuj ponownie.",
        email,
      };
    }
  } catch (error) {
    console.error("[crm] Sign-in threw:", error);
    return { error: "Nie udało się zalogować. Spróbuj ponownie.", email };
  }

  redirect(CRM_HOME_PATH);
}

export async function signOut() {
  const supabase = await createSupabaseAuthClient();
  await supabase.auth.signOut();
  redirect(CRM_LOGIN_PATH);
}

export async function updateLead(id: string, values: LeadEditorValues): Promise<LeadUpdateResult> {
  await requireCrmUser();

  const update = toLeadUpdate(values as unknown);
  if (!isUuid(id) || !update) return { ok: false };

  try {
    const { error, count } = await getSupabaseAdmin()
      .from("leads")
      .update(update, { count: "exact" })
      .eq("id", id);
    if (error || count === 0) {
      console.error("[crm] Lead update failed:", { id, code: error?.code, message: error?.message, count });
      return { ok: false };
    }
  } catch (error) {
    console.error("[crm] Lead update threw:", error);
    return { ok: false };
  }

  refresh();
  return { ok: true };
}
