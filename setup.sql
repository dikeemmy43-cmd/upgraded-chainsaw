create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  avatar_url text,
  credits_balance integer default 0,
  is_unlimited boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.transactions (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  amount integer not null,
  currency text default 'NGN',
  status text,
  reference text,
  metadata jsonb,
  created_at timestamptz default now()
);

create table if not exists public.generated_images (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  prompt text not null,
  image_url text not null,
  status text default 'completed',
  created_at timestamptz default now()
);

alter table public.users enable row level security;
alter table public.transactions enable row level security;
alter table public.generated_images enable row level security;

create policy "users_own_row" on public.users for all using (auth.uid() = id);
create policy "transactions_own" on public.transactions for all using (auth.uid() = user_id);
create policy "images_own" on public.generated_images for all using (auth.uid() = user_id);
