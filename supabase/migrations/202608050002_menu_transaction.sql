create or replace function public.replace_weekly_menu(p_week_start date, p_mode text, p_items jsonb, p_replace boolean default false)
returns uuid language plpgsql as $$
declare menu_id uuid; item jsonb;
begin
  if extract(isodow from p_week_start) <> 1 then raise exception 'La semana debe comenzar en lunes'; end if;
  if jsonb_array_length(p_items) <> 10 then raise exception 'Un menú debe contener diez comidas'; end if;
  select id into menu_id from public.weekly_menus where week_start = p_week_start for update;
  if menu_id is not null and not p_replace then raise exception 'Ya existe un menú para esta semana'; end if;
  if menu_id is null then
    insert into public.weekly_menus (week_start, generation_mode) values (p_week_start, p_mode) returning id into menu_id;
  else
    delete from public.weekly_menu_items where weekly_menu_id = menu_id;
    update public.weekly_menus set generation_mode = p_mode, generated_at = now(), status = 'active' where id = menu_id;
  end if;
  for item in select * from jsonb_array_elements(p_items) loop
    if (item->>'menu_date')::date < p_week_start or (item->>'menu_date')::date > p_week_start + 4 then raise exception 'Fecha inválida'; end if;
    insert into public.weekly_menu_items (weekly_menu_id, menu_date, meal_slot, meal_id)
    values (menu_id, (item->>'menu_date')::date, (item->>'meal_slot')::public.meal_slot, (item->>'meal_id')::uuid)
    returning id into menu_id;
  end loop;
  return (select id from public.weekly_menus where week_start = p_week_start);
end; $$;
