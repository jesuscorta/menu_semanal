"use client";

import { useActionState } from "react";
import { signIn } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, { error: "" });
  return <form action={action} className="mt-7 space-y-4">
    <label className="block text-sm font-bold" htmlFor="access-code">Código de acceso</label>
    <input className="min-h-13 w-full rounded-2xl bg-[#fff8f0] px-4 font-medium outline-none ring-[#e85d4a] focus:ring-2" id="access-code" name="code" required type="password" autoComplete="current-password" />
    {state.error && <p aria-live="polite" className="text-sm text-red-700">{state.error}</p>}
    <button className="min-h-13 w-full rounded-2xl bg-[#e85d4a] px-4 font-black text-white disabled:opacity-60" disabled={pending} type="submit">{pending ? "Comprobando..." : "Entrar"}</button>
  </form>;
}
