"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CookingPot, History, House, Settings } from "lucide-react";

const items = [
  { href: "/today", label: "Hoy", Icon: House },
  { href: "/week", label: "Semana", Icon: CalendarDays },
  { href: "/meals", label: "Platos", Icon: CookingPot },
  { href: "/history", label: "Historial", Icon: History },
  { href: "/settings", label: "Ajustes", Icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  return <nav aria-label="Navegación principal" className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-2xl border-t border-stone-200/80 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:bottom-5 md:rounded-3xl md:border md:shadow-xl md:shadow-stone-300/30">{items.map(({ href, label, Icon }) => { const selected = pathname === href || (href === "/week" && pathname === "/change"); return <Link aria-current={selected ? "page" : undefined} className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-bold ${selected ? "bg-[#fff0eb] text-[#e85d4a]" : "text-stone-500"}`} href={href} key={href}><Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />{label}</Link>; })}</nav>;
}
