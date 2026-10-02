function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing ${name}.`);
  return value;
}

export function getSupabaseUrl() {
  return required("SUPABASE_URL", process.env.SUPABASE_URL);
}

export function getSupabasePublishableKey() {
  return required("SUPABASE_PUBLISHABLE_KEY", process.env.SUPABASE_PUBLISHABLE_KEY);
}
