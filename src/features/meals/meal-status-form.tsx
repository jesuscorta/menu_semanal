"use client";

import { Power } from "lucide-react";
import { useState } from "react";
import { FormStatusButton } from "@/components/form-status-button";
import { updateMealStatus } from "./actions";

export function MealStatusForm({ id, name, active, returnTo }: { id: string; name: string; active: boolean; returnTo: string }) {
  const [confirming, setConfirming] = useState(false);
  if (!active) return <form action={updateMealStatus}><input name="id" type="hidden" value={id}/><input name="active" type="hidden" value="true"/><input name="returnTo" type="hidden" value={returnTo}/><button aria-label={`Activar ${name}`} className="grid size-11 place-items-center rounded-xl bg-white text-[#52742e]" title="Activar plato" type="submit"><Power aria-hidden="true" className="size-5" /></button></form>;
  return <>{confirming ? <div aria-modal="true" className="fixed inset-0 z-[60] grid place-items-end bg-[#24302b]/40 p-5 sm:place-items-center" role="dialog"><div className="w-full max-w-sm rounded-[1.75rem] bg-white p-6"><h2 className="text-xl font-black">¿Desactivar plato?</h2><p className="mt-2 text-sm leading-6 text-[#66716b]">{name} dejará de aparecer en futuras generaciones hasta que lo actives de nuevo.</p><form action={updateMealStatus} className="mt-6 flex gap-3"><input name="id" type="hidden" value={id}/><input name="active" type="hidden" value="false"/><input name="returnTo" type="hidden" value={returnTo}/><button className="min-h-11 flex-1 rounded-xl bg-stone-100 text-sm font-bold" onClick={() => setConfirming(false)} type="button">Cancelar</button><FormStatusButton className="min-h-11 flex-1 rounded-xl bg-[#e85d4a] text-sm font-black text-white disabled:opacity-60" idle="Desactivar" pending="Desactivando..." /></form></div></div> : <button aria-label={`Desactivar ${name}`} className="grid size-11 place-items-center rounded-xl bg-[#fff0eb] text-[#e85d4a]" onClick={() => setConfirming(true)} title="Desactivar plato" type="button"><Power aria-hidden="true" className="size-5" /></button>}</>;
}
