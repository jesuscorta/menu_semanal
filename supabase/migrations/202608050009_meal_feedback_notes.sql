create table public.meal_feedback_notes (
  id uuid primary key default gen_random_uuid(),
  meal_id uuid not null references public.meals(id) on delete cascade,
  weekly_menu_item_id uuid references public.weekly_menu_items(id) on delete set null,
  menu_date date,
  content text not null check (char_length(trim(content)) between 1 and 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index meal_feedback_notes_meal_created_at_idx on public.meal_feedback_notes (meal_id, created_at desc);
create trigger feedback_notes_updated before update on public.meal_feedback_notes for each row execute procedure public.set_updated_at();
alter table public.meal_feedback_notes enable row level security;
create policy "admin manages meal feedback notes" on public.meal_feedback_notes for all using (public.is_admin()) with check (public.is_admin());
