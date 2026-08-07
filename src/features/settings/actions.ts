"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({ mode: z.enum(["variety", "balanced", "practical"]), repeatWeeks: z.coerce.number().int().min(1).max(12), maxDinnerCarbs: z.coerce.number().int().min(0).max(5), alternatives: z.coerce.number().int().min(3).max(5) });
export async function updateSettings(formData: FormData) {
  const values = schema.parse({ mode: formData.get("mode"), repeatWeeks: formData.get("repeatWeeks"), maxDinnerCarbs: formData.get("maxDinnerCarbs"), alternatives: formData.get("alternatives") });
  const supabase = await createSupabaseServerClient();
  const rows = [{ key: "variety_mode", value: values.mode }, { key: "repeat_weeks", value: values.repeatWeeks }, { key: "max_dinner_carbs", value: values.maxDinnerCarbs }, { key: "alternative_count", value: values.alternatives }];
  const { error } = await supabase.from("app_settings").upsert(rows, { onConflict: "key" }); if (error) throw new Error(error.message); revalidatePath("/settings"); redirect("/settings?notice=settings_saved");
}

export async function resetMealUsage() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("meal_usage_events").delete().not("id", "is", null);
  if (error) return { error: "No se pudo reiniciar el conteo de platos." };
  revalidatePath("/meals"); revalidatePath("/settings");
  return { success: true };
}
