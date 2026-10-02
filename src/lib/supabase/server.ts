import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseUrl } from "./env";

let adminClient: SupabaseClient | undefined;

/** Secret-key client. Bypasses RLS — use only in server code, after authorization. */
export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;

  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!secretKey) throw new Error("Missing SUPABASE_SECRET_KEY.");

  adminClient = createClient(getSupabaseUrl(), secretKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return adminClient;
}
