create or replace function public.replace_weekly_menu(p_week_start date, p_mode text, p_items jsonb, p_replace boolean default false)
returns uuid language plpgsql as $$
declare weekly_menu_id uuid; existing_menu_id uuid; item jsonb; menu_item_id uuid;
begin
  if extract(isodow from p_week_start) <> 1 then raise exception 'La semana debe comenzar en lunes'; end if;
  if jsonb_array_length(p_items) <> 10 then raise exception 'Un menú debe contener diez comidas'; end if;

  select id into existing_menu_id from public.weekly_menus where week_start = p_week_start for update;
  if existing_menu_id is not null and not p_replace then raise exception 'Ya existe un menú para esta semana'; end if;
  if existing_menu_id is null then
    insert into public.weekly_menus (week_start, generation_mode) values (p_week_start, p_mode) returning id into weekly_menu_id;
  else
    weekly_menu_id := existing_menu_id;
    delete from public.weekly_menu_items where weekly_menu_id = existing_menu_id;
    update public.weekly_menus set generation_mode = p_mode, generated_at = now(), status = 'active' where id = existing_menu_id;
  end if;

  for item in select * from jsonb_array_elements(p_items) loop
    if (item->>'menu_date')::date < p_week_start or (item->>'menu_date')::date > p_week_start + 4 then raise exception 'Fecha inválida'; end if;
    insert into public.weekly_menu_items (weekly_menu_id, menu_date, meal_slot, meal_id)
    values (weekly_menu_id, (item->>'menu_date')::date, (item->>'meal_slot')::public.meal_slot, (item->>'meal_id')::uuid)
    returning id into menu_item_id;
    insert into public.meal_usage_events (meal_id, weekly_menu_id, weekly_menu_item_id, event_type, event_date)
    values ((item->>'meal_id')::uuid, weekly_menu_id, menu_item_id, 'generated', (item->>'menu_date')::date);
  end loop;
  return weekly_menu_id;
end; $$;
