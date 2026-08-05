create extension if not exists "pgcrypto";

create type public.meal_slot as enum ('lunch', 'dinner');
create type public.difficulty_level as enum ('easy', 'medium', 'advanced');
create type public.weight_state as enum ('raw', 'cooked', 'dry', 'not_applicable', 'unspecified');
create type public.preference_status as enum ('favorite', 'normal', 'avoid', 'rejected');
create type public.menu_status as enum ('draft', 'active', 'archived');
create type public.source_type as enum ('original_menu', 'derived_pattern');
create type public.usage_event_type as enum ('generated', 'selected', 'replaced_out', 'replaced_in');

create table public.people (
  id uuid primary key default gen_random_uuid(), slug text not null unique check (slug in ('laura', 'jesus')),
  name text not null, display_order integer not null unique, active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.meals (
  id uuid primary key default gen_random_uuid(), slug text not null unique, name text not null,
  description text, meal_type public.meal_slot not null, functional_type text not null,
  protein_family text not null, carb_family text, cooking_method text not null default 'unspecified',
  difficulty public.difficulty_level not null default 'easy', estimated_minutes integer check (estimated_minutes > 0),
  vegetables_required boolean not null default true, fruit_dessert boolean not null default true,
  has_concentrated_carb boolean not null default false, is_informal boolean not null default false,
  is_batch_cooking boolean not null default false, can_repeat_next_day boolean not null default false,
  source_type public.source_type not null, source_reference text, active boolean not null default true,
  preference_status public.preference_status not null default 'normal', notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.meal_ingredients (
  id uuid primary key default gen_random_uuid(), meal_id uuid not null references public.meals(id) on delete cascade,
  name text not null, ingredient_group text not null default 'other', quantity_laura numeric,
  quantity_jesus numeric, unit text, quantity_note text, weight_state public.weight_state not null default 'unspecified',
  is_optional boolean not null default false, display_order integer not null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (meal_id, display_order), check (quantity_laura is not null or quantity_jesus is not null or quantity_note is not null)
);
create table public.weekly_menus (
  id uuid primary key default gen_random_uuid(), week_start date not null unique check (extract(isodow from week_start) = 1),
  status public.menu_status not null default 'active', generation_mode text not null default 'balanced',
  generated_at timestamptz not null default now(), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.weekly_menu_items (
  id uuid primary key default gen_random_uuid(), weekly_menu_id uuid not null references public.weekly_menus(id) on delete cascade,
  menu_date date not null, meal_slot public.meal_slot not null, meal_id uuid not null references public.meals(id),
  original_meal_id uuid references public.meals(id), was_replaced boolean not null default false,
  replacement_reason text, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (weekly_menu_id, menu_date, meal_slot), check (extract(isodow from menu_date) between 1 and 5)
);
create table public.meal_usage_events (
  id uuid primary key default gen_random_uuid(), meal_id uuid not null references public.meals(id),
  weekly_menu_id uuid not null references public.weekly_menus(id) on delete cascade,
  weekly_menu_item_id uuid references public.weekly_menu_items(id) on delete set null,
  event_type public.usage_event_type not null, event_date date not null, created_at timestamptz not null default now()
);
create table public.app_settings (
  id uuid primary key default gen_random_uuid(), key text not null unique, value jsonb not null, updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create or replace function public.check_menu_item_week() returns trigger language plpgsql as $$
declare starts_on date;
begin
  select week_start into starts_on from public.weekly_menus where id = new.weekly_menu_id;
  if new.menu_date < starts_on or new.menu_date > starts_on + 4 then raise exception 'La fecha debe pertenecer a la semana laboral del menú'; end if;
  return new;
end; $$;
create trigger people_updated before update on public.people for each row execute procedure public.set_updated_at();
create trigger meals_updated before update on public.meals for each row execute procedure public.set_updated_at();
create trigger ingredients_updated before update on public.meal_ingredients for each row execute procedure public.set_updated_at();
create trigger menus_updated before update on public.weekly_menus for each row execute procedure public.set_updated_at();
create trigger items_updated before update on public.weekly_menu_items for each row execute procedure public.set_updated_at();
create trigger settings_updated before update on public.app_settings for each row execute procedure public.set_updated_at();
create trigger check_menu_item_week before insert or update on public.weekly_menu_items for each row execute procedure public.check_menu_item_week();

alter table public.people enable row level security;
alter table public.meals enable row level security;
alter table public.meal_ingredients enable row level security;
alter table public.weekly_menus enable row level security;
alter table public.weekly_menu_items enable row level security;
alter table public.meal_usage_events enable row level security;
alter table public.app_settings enable row level security;

create or replace function public.is_admin() returns boolean language sql stable as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
$$;
do $$ declare tbl text; begin
  foreach tbl in array array['people','meals','meal_ingredients','weekly_menus','weekly_menu_items','meal_usage_events','app_settings'] loop
    execute format('create policy "admin manages %1$s" on public.%1$s for all using (public.is_admin()) with check (public.is_admin())', tbl);
  end loop;
end $$;

insert into public.people (slug, name, display_order) values ('laura', 'Laura', 1), ('jesus', 'Jesús', 2) on conflict (slug) do nothing;
insert into public.app_settings (key, value) values
  ('repeat_weeks', '4'), ('max_dinner_carbs', '2'), ('variety_mode', '"balanced"'), ('alternative_count', '4'), ('timezone', '"Europe/Madrid"')
on conflict (key) do nothing;
