create or replace function public.replace_weekly_menu(p_week_start date, p_mode text, p_items jsonb, p_replace boolean default false)
returns uuid language plpgsql as $$
declare v_weekly_menu_id uuid; v_existing_menu_id uuid; v_item jsonb; v_menu_item_id uuid;
begin
  if extract(isodow from p_week_start) <> 1 then raise exception 'La semana debe comenzar en lunes'; end if;
  if jsonb_array_length(p_items) <> 10 then raise exception 'Un menú debe contener diez comidas'; end if;

  select wm.id into v_existing_menu_id from public.weekly_menus wm where wm.week_start = p_week_start for update;
  if v_existing_menu_id is not null and not p_replace then raise exception 'Ya existe un menú para esta semana'; end if;
  if v_existing_menu_id is null then
    insert into public.weekly_menus (week_start, generation_mode) values (p_week_start, p_mode) returning id into v_weekly_menu_id;
  else
    v_weekly_menu_id := v_existing_menu_id;
    delete from public.weekly_menu_items wmi where wmi.weekly_menu_id = v_existing_menu_id;
    update public.weekly_menus wm set generation_mode = p_mode, generated_at = now(), status = 'active' where wm.id = v_existing_menu_id;
  end if;

  for v_item in select * from jsonb_array_elements(p_items) loop
    if (v_item->>'menu_date')::date < p_week_start or (v_item->>'menu_date')::date > p_week_start + 4 then raise exception 'Fecha inválida'; end if;
    insert into public.weekly_menu_items (weekly_menu_id, menu_date, meal_slot, meal_id)
    values (v_weekly_menu_id, (v_item->>'menu_date')::date, (v_item->>'meal_slot')::public.meal_slot, (v_item->>'meal_id')::uuid)
    returning id into v_menu_item_id;
    insert into public.meal_usage_events (meal_id, weekly_menu_id, weekly_menu_item_id, event_type, event_date)
    values ((v_item->>'meal_id')::uuid, v_weekly_menu_id, v_menu_item_id, 'generated', (v_item->>'menu_date')::date);
  end loop;
  return v_weekly_menu_id;
end; $$;
