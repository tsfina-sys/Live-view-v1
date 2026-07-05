-- LiveView D10 — Supabase database setup
-- Εκτέλεσε ολόκληρο το αρχείο στο Supabase SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null default 'Χρήστης'
    check (char_length(nickname) between 2 and 40),
  avatar_url text,
  is_available boolean not null default false,
  public_lat double precision,
  public_lng double precision,
  area_name text,
  country_name text,
  last_seen timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint available_location_check check (
    is_available = false
    or (public_lat is not null and public_lng is not null)
  )
);

alter table public.profiles enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update on public.profiles to authenticated;
revoke all on public.profiles from anon;

drop policy if exists "Authenticated users view available profiles" on public.profiles;
create policy "Authenticated users view available profiles"
on public.profiles
for select
to authenticated
using (
  is_available = true
  or (select auth.uid()) = id
);

drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create or replace function public.handle_new_liveview_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nickname)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'nickname'), ''),
      split_part(coalesce(new.email, 'Χρήστης'), '@', 1)
    )
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_liveview_user_created on auth.users;
create trigger on_liveview_user_created
after insert on auth.users
for each row execute function public.handle_new_liveview_user();

create or replace function public.set_liveview_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_liveview_updated_at();

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table public.profiles;
  end if;
end
$$;

create index if not exists profiles_available_idx
on public.profiles (is_available)
where is_available = true;

create index if not exists profiles_last_seen_idx
on public.profiles (last_seen desc);
