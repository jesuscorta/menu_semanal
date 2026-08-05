create or replace function public.replace_weekly_menu_item(p_item_id uuid, p_meal_id uuid, p_reason text default null)
returns void language plpgsql as $$
declare current_item public.weekly_menu_items; replacement public.meals;
begin
  select * into current_item from public.weekly_menu_items where id = p_item_id for update;
  if current_item.id is null then raise exception 'La comida ya no existe'; end if;
  select * into replacement from public.meals where id = p_meal_id;
  if replacement.id is null or not replacement.active or replacement.preference_status = 'rejected' then raise exception 'El plato elegido no está disponible'; end if;
  if replacement.meal_type <> current_item.meal_slot then raise exception 'El plato no corresponde a esta comida'; end if;
  if replacement.id = current_item.meal_id then raise exception 'El plato ya está seleccionado'; end if;
  insert into public.meal_usage_events (meal_id, weekly_menu_id, weekly_menu_item_id, event_type, event_date)
  values (current_item.meal_id, current_item.weekly_menu_id, current_item.id, 'replaced_out', current_item.menu_date);
  update public.weekly_menu_items set original_meal_id = coalesce(original_meal_id, meal_id), meal_id = p_meal_id, was_replaced = true, replacement_reason = p_reason where id = p_item_id;
  insert into public.meal_usage_events (meal_id, weekly_menu_id, weekly_menu_item_id, event_type, event_date)
  values (p_meal_id, current_item.weekly_menu_id, current_item.id, 'replaced_in', current_item.menu_date);
end; $$;
