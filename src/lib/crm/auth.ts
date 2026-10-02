import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseAuthClient } from "@/lib/supabase/auth-client";
import { CRM_LOGIN_PATH } from "./routes";

export type CrmUser = {
  id: string;
  email: string | null;
};

/** Verifies the Supabase Auth session (JWT signature/expiry) once per request. */
export const getCrmUser = cache(async (): Promise<CrmUser | null> => {
  const supabase = await createSupabaseAuthClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) return null;

  return { id: data.claims.sub, email: typeof data.claims.email === "string" ? data.claims.email : null };
});

/** Call at the start of every CRM read and mutation. */
export async function requireCrmUser(): Promise<CrmUser> {
  const user = await getCrmUser();
  if (!user) redirect(CRM_LOGIN_PATH);
  return user;
}
