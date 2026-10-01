-- Driva waitlist
-- Run in Supabase SQL editor, or via `supabase db push`.

create extension if not exists citext;

create table if not exists public.waitlist (
  id             uuid primary key default gen_random_uuid(),
  full_name      text not null check (char_length(full_name) between 2 and 120),
  email          citext not null unique,
  car            text not null check (char_length(car) between 2 and 120),
  between_cars   boolean not null default false,   -- true = "car" holds a dream car
  instagram      text check (instagram is null or instagram ~ '^[A-Za-z0-9._]{1,30}$'), -- stored without "@"
  referral_code  text not null unique default substr(replace(gen_random_uuid()::text, '-', ''), 1, 8),
  referred_by    text references public.waitlist (referral_code) on delete set null,
  utm_source     text,
  utm_medium     text,
  utm_campaign   text,
  user_agent     text,
  status         text not null default 'waiting'
                   check (status in ('waiting', 'invited', 'founding', 'joined', 'removed')),
  created_at     timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create index if not exists waitlist_referred_by_idx on public.waitlist (referred_by);

-- Lock the table down. Only the service role (used by the Next.js server action) can read or write.
alter table public.waitlist enable row level security;
-- Intentionally no policies for anon or authenticated roles.

-- Founder dashboard view: referral counts per member.
create or replace view public.waitlist_referrals as
select w.id, w.full_name, w.email, w.car, w.instagram, w.status, w.created_at,
       count(r.id) as referrals
from public.waitlist w
left join public.waitlist r on r.referred_by = w.referral_code
group by w.id
order by referrals desc, w.created_at asc;

revoke all on public.waitlist_referrals from anon, authenticated;
