-- Supabase → SQL Editor’da çalıştırın (proje: public şeması).
-- Hata: "Could not find the table 'public.early_access_leads'" → bu script henüz uygulanmamış demektir.

create table if not exists public.early_access_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  role text,
  country text,
  note text,
  source text default 'web',
  created_at timestamptz not null default now()
);

create unique index if not exists early_access_leads_email_lower
  on public.early_access_leads (lower(email));

alter table public.early_access_leads enable row level security;

drop policy if exists "Anonim erken erişim kaydı" on public.early_access_leads;

create policy "Anonim erken erişim kaydı"
  on public.early_access_leads
  for insert
  to anon
  with check (true);
