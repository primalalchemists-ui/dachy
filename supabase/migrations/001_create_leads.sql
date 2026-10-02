-- Leads captured by the landing page qualification flow.
-- Inserts happen server-side with the Supabase secret key, which bypasses RLS.
-- Enumerated values (roof_covering, building_type, timeline, status) are plain text,
-- validated in the application layer.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  phone text not null,
  location text not null,

  roof_covering text not null,
  building_type text not null,
  timeline text not null,

  financing_interested boolean not null default false,

  privacy_accepted boolean not null,
  privacy_accepted_at timestamptz not null,

  status text not null default 'new',
  notes text,
  next_contact_at timestamptz,

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  fbclid text,
  landing_path text,
  referrer text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_next_contact_at_idx on public.leads (next_contact_at)
  where next_contact_at is not null;

-- No policies: anonymous and authenticated clients get no access.
-- CRM policies for authenticated staff come with the CRM step.
alter table public.leads enable row level security;
revoke all on table public.leads from anon;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_updated_at();
