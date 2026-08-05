alter table public.meal_ingredients
  add column if not exists quantity_text_laura text,
  add column if not exists quantity_text_jesus text;
