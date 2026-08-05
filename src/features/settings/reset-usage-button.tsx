"use client";

import { useTransition } from "react";
import { resetMealUsage } from "./actions";

export function ResetUsageButton() {
  const [pending, startTransition] = useTransition();
  return <button className="min-h-11 rounded-xl border border-[#e85d4a] px-4 text-sm font-black text-[#e85d4a] disabled:opacity-60" disabled={pending} onClick={() => { if (window.confirm("Se reiniciarán todos los conteos de platos. Los menús se conservarán. ¿Continuar?")) startTransition(() => { void resetMealUsage(); }); }} type="button">{pending ? "Reiniciando..." : "Reiniciar conteo"}</button>;
}
