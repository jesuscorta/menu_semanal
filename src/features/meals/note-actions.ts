"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type NoteActionState = { error?: string; success?: string };
const noteSchema = z.object({ mealId: z.string().uuid(), itemId: z.string().uuid(), menuDate: z.string().date(), content: z.string().trim().min(1, "Escribe una nota antes de guardarla.").max(1000, "La nota no puede superar 1.000 caracteres.") });

export async function addMealNote(_: NoteActionState, formData: FormData): Promise<NoteActionState> {
  const parsed = noteSchema.safeParse({ mealId: formData.get("mealId"), itemId: formData.get("itemId"), menuDate: formData.get("menuDate"), content: formData.get("content") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "No se pudo validar la nota." };
  const supabase = await createSupabaseServerClient(); const { error } = await supabase.from("meal_feedback_notes").insert({ meal_id: parsed.data.mealId, weekly_menu_item_id: parsed.data.itemId, menu_date: parsed.data.menuDate, content: parsed.data.content });
  if (error) return { error: "No se pudo guardar la nota." };
  revalidatePath("/today");
  return { success: "Nota guardada." };
}

export async function deleteMealNote(id: string): Promise<NoteActionState> {
  if (!z.string().uuid().safeParse(id).success) return { error: "La nota no es válida." };
  const supabase = await createSupabaseServerClient(); const { error } = await supabase.from("meal_feedback_notes").delete().eq("id", id);
  if (error) return { error: "No se pudo eliminar la nota." };
  revalidatePath("/today");
  return { success: "Nota eliminada." };
}

export async function editMealNote(id: string, content: string): Promise<NoteActionState> {
  if (!z.string().uuid().safeParse(id).success) return { error: "La nota no es válida." };
  const parsed = z.string().trim().min(1, "Escribe una nota antes de guardarla.").max(1000, "La nota no puede superar 1.000 caracteres.").safeParse(content);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "No se pudo validar la nota." };
  const supabase = await createSupabaseServerClient(); const { error } = await supabase.from("meal_feedback_notes").update({ content: parsed.data }).eq("id", id);
  if (error) return { error: "No se pudo actualizar la nota." };
  revalidatePath("/today");
  return { success: "Nota actualizada." };
}
