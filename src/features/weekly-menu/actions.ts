"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateMenu } from "@/domain/menu-generator/generator";
import type { MealCandidate } from "@/domain/menu-generator/types";

function monday(value: string) { const date = new Date(`${value}T12:00:00Z`); date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7)); return date.toISOString().slice(0, 10); }
export async function generateWeek(formData: FormData) {
  const weekStart = monday(String(formData.get("weekStart") ?? "")); const replace = formData.get("replace") === "true";
  const supabase = await createSupabaseServerClient();
  const { data: rows, error } = await supabase.from("meals").select("*").eq("active", true);
  if (error) throw new Error("No se pudieron cargar los platos.");
  const { data: settingsRows } = await supabase.from("app_settings").select("key, value");
  const settings = Object.fromEntries((settingsRows ?? []).map((row: { key: string; value: unknown }) => [row.key, row.value]));
  const repeatWeeks = typeof settings.repeat_weeks === "number" ? settings.repeat_weeks : 4;
  const recentDate = new Date(`${weekStart}T12:00:00Z`); recentDate.setUTCDate(recentDate.getUTCDate() - repeatWeeks * 7);
  const { data: recentEvents } = await supabase.from("meal_usage_events").select("meal_id").gte("event_date", recentDate.toISOString().slice(0, 10)).in("event_type", ["generated", "selected", "replaced_in"]);
  const meals: MealCandidate[] = (rows ?? []).map((row: Record<string, unknown>) => ({ id: String(row.id), name: String(row.name), slot: row.meal_type as MealCandidate["slot"], functionalType: String(row.functional_type), proteinFamily: row.protein_family as MealCandidate["proteinFamily"], active: Boolean(row.active), preference: row.preference_status as MealCandidate["preference"], hasConcentratedCarb: Boolean(row.has_concentrated_carb), isInformal: Boolean(row.is_informal), isBatchCooking: Boolean(row.is_batch_cooking), vegetablesRequired: Boolean(row.vegetables_required) }));
  const varietyMode = settings.variety_mode === "variety" || settings.variety_mode === "practical" ? settings.variety_mode : "balanced";
  const maxDinnerCarbs = typeof settings.max_dinner_carbs === "number" ? settings.max_dinner_carbs : 2;
  const result = generateMenu({ meals, recentMealIds: (recentEvents ?? []).map((event: { meal_id: string }) => event.meal_id), settings: { maxDinnerCarbs, varietyMode, candidateCount: 150 } });
  const items = result.items.map((item) => ({ menu_date: new Date(`${weekStart}T12:00:00Z`).toISOString().slice(0, 10), meal_slot: item.slot, meal_id: item.meal.id }));
  for (const item of items) { const date = new Date(`${weekStart}T12:00:00Z`); date.setUTCDate(date.getUTCDate() + result.items[items.indexOf(item)]!.day); item.menu_date = date.toISOString().slice(0, 10); }
  const { error: rpcError } = await supabase.rpc("replace_weekly_menu", { p_week_start: weekStart, p_mode: "balanced", p_items: items, p_replace: replace });
  if (rpcError) throw new Error(rpcError.message);
  revalidatePath("/week"); revalidatePath("/today");
  redirect(`/week?week=${weekStart}&notice=${replace ? "regenerated" : "generated"}`);
}

export async function replaceMeal(formData: FormData) {
  const itemId = String(formData.get("itemId") ?? ""); const mealId = String(formData.get("mealId") ?? ""); const week = String(formData.get("week") ?? "");
  if (!itemId || !mealId || !week) throw new Error("Faltan datos para realizar el cambio.");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("replace_weekly_menu_item", { p_item_id: itemId, p_meal_id: mealId, p_reason: "Cambio manual" });
  if (error) throw new Error(error.message);
  revalidatePath("/week"); revalidatePath("/today"); redirect(`/week?week=${week}&notice=replaced`);
}
