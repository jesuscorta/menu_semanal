-- Los documentos originales permiten ingredientes sin cantidad indicada.
alter table public.meal_ingredients
  drop constraint if exists meal_ingredients_check;
