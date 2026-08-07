"use client";

import { useState } from "react";
import { FormStatusButton } from "@/components/form-status-button";
import { generateWeek } from "./actions";

export function GenerateWeekForm({ weekStart }: { weekStart: string }) {
  return <form action={generateWeek} className="mt-6"><input name="weekStart" type="hidden" value={weekStart}/><FormStatusButton className="min-h-12 rounded-xl bg-[#91c95a] px-5 text-sm font-black text-[#24302b] disabled:opacity-60" idle="Generar semana" pending="Generando semana..." /></form>;
}

export function RegenerateWeekForm({ weekStart }: { weekStart: string }) {
  const [open, setOpen] = useState(false);
  return <><button className="min-h-11 rounded-xl border border-[#e85d4a] px-4 text-sm font-bold text-[#e85d4a]" onClick={() => setOpen(true)} type="button">Regenerar semana</button>{open && <div aria-modal="true" className="fixed inset-0 z-[60] grid place-items-end bg-[#24302b]/40 p-5 sm:place-items-center" role="dialog"><div className="w-full max-w-sm rounded-[1.75rem] bg-white p-6 shadow-2xl"><h2 className="text-xl font-black">¿Regenerar esta semana?</h2><p className="mt-2 text-sm leading-6 text-[#66716b]">Se reemplazarán las diez comidas actuales. Esta acción no modifica semanas anteriores.</p><form action={generateWeek} className="mt-6 flex gap-3"><input name="weekStart" type="hidden" value={weekStart}/><input name="replace" type="hidden" value="true"/><button className="min-h-11 flex-1 rounded-xl bg-stone-100 text-sm font-bold" onClick={() => setOpen(false)} type="button">Cancelar</button><FormStatusButton className="min-h-11 flex-1 rounded-xl bg-[#e85d4a] px-3 text-sm font-black text-white disabled:opacity-60" idle="Regenerar" pending="Regenerando..." /></form></div></div>}</>;
}
