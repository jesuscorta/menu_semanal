alter table public.meal_ingredients
  add column if not exists quantity_shared_text text;
