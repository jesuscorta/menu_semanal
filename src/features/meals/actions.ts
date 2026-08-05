"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateMealStatus(formData: FormData) {
  const id = String(formData.get("id") ?? ""); const active = formData.get("active") === "true";
  if (!id) throw new Error("Datos de plato no válidos.");
  const supabase = await createSupabaseServerClient(); const { error } = await supabase.from("meals").update({ active }).eq("id", id); if (error) throw new Error(error.message); revalidatePath("/meals");
}
