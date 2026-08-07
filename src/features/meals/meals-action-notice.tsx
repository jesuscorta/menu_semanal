"use client";

import { usePathname, useSearchParams } from "next/navigation";

const messages: Record<string, string> = { activated: "Plato activado.", deactivated: "Plato desactivado." };

export function MealsActionNotice() {
  const pathname = usePathname(); const notice = useSearchParams().get("notice"); const message = pathname === "/meals" && notice ? messages[notice] : undefined;
  if (!message) return null;
  return <p aria-live="polite" className="mx-5 mt-4 rounded-2xl bg-[#edf8df] px-4 py-3 text-sm font-bold text-[#52742e] sm:mx-7">{message}</p>;
}
