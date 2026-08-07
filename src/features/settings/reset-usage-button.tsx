"use client";

import { useState, useTransition } from "react";
import { resetMealUsage } from "./actions";

export function ResetUsageButton() {
  const [open, setOpen] = useState(false); const [pending, startTransition] = useTransition(); const [message, setMessage] = useState<string>();
  const confirm = () => startTransition(() => { void resetMealUsage().then((result) => { setOpen(false); setMessage(result.error ?? "Conteo reiniciado."); }); });
  return <><button className="min-h-11 rounded-xl border border-[#e85d4a] px-4 text-sm font-black text-[#e85d4a] disabled:opacity-60" onClick={() => setOpen(true)} type="button">Reiniciar conteo</button>{message && <p aria-live="polite" className={`mt-3 text-sm font-bold ${message.includes("No se pudo") ? "text-[#e85d4a]" : "text-[#52742e]"}`}>{message}</p>}{open && <div aria-modal="true" className="fixed inset-0 z-[60] grid place-items-end bg-[#24302b]/40 p-5 sm:place-items-center" role="dialog"><div className="w-full max-w-sm rounded-[1.75rem] bg-white p-6"><h2 className="text-xl font-black">¿Reiniciar conteo?</h2><p className="mt-2 text-sm leading-6 text-[#66716b]">Se borrarán todos los eventos de uso. Los platos y menús se conservarán.</p><div className="mt-6 flex gap-3"><button className="min-h-11 flex-1 rounded-xl bg-stone-100 text-sm font-bold" disabled={pending} onClick={() => setOpen(false)} type="button">Cancelar</button><button className="min-h-11 flex-1 rounded-xl bg-[#e85d4a] text-sm font-black text-white disabled:opacity-60" disabled={pending} onClick={confirm} type="button">{pending ? "Reiniciando..." : "Reiniciar"}</button></div></div></div>}</>;
}
