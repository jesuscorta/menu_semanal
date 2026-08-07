"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateMealStatus(formData: FormData) {
  const id = String(formData.get("id") ?? ""); const active = formData.get("active") === "true"; const returnTo = String(formData.get("returnTo") ?? "/meals");
  if (!id) throw new Error("Datos de plato no válidos.");
  const supabase = await createSupabaseServerClient(); const { error } = await supabase.from("meals").update({ active }).eq("id", id); if (error) throw new Error(error.message); revalidatePath("/meals");
  redirect(`${returnTo}${returnTo.includes("?") ? "&" : "?"}notice=${active ? "activated" : "deactivated"}`);
}
