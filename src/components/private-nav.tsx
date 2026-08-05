import Link from "next/link";
import { signOut } from "@/features/auth/actions";

export function PrivateNav() {
  return <nav className="border-b border-stone-200 bg-white"><div className="mx-auto flex max-w-5xl items-center gap-4 p-4 text-sm"><Link className="font-semibold text-[#2d5a45]" href="/today">Hoy</Link><Link href="/week">Semana</Link><Link href="/meals">Platos</Link><Link href="/history">Historial</Link><Link href="/settings">Ajustes</Link><form className="ml-auto" action={signOut}><button type="submit">Cerrar sesión</button></form></div></nav>;
}
