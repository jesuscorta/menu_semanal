"use client";

import { FormStatusButton } from "@/components/form-status-button";
import { replaceMeal } from "./actions";

export function ReplaceMealForm({ itemId, mealId, week, lunch }: { itemId: string; mealId: string; week: string; lunch: boolean }) {
  return <form action={replaceMeal} className="mt-5"><input name="itemId" type="hidden" value={itemId}/><input name="mealId" type="hidden" value={mealId}/><input name="week" type="hidden" value={week}/><FormStatusButton className={`min-h-11 w-full rounded-xl font-black text-white disabled:opacity-60 ${lunch ? "bg-[#f59e42]" : "bg-[#1f9e9a]"}`} idle="Elegir este plato" pending="Cambiando plato..." /></form>;
}
