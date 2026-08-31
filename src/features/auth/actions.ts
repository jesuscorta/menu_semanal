"use server";

import { timingSafeEqual, createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const codeSchema = z.string().trim().min(1, "Introduce el código de acceso.").max(256);

function codeMatches(code: string) {
  const hash = process.env.ADMIN_ACCESS_CODE_HASH;
  const salt = process.env.ADMIN_ACCESS_CODE_SALT;
  if (!hash || !salt) throw new Error("Falta configurar el acceso administrador.");
  const candidate = createHmac("sha256", salt).update(code).digest("base64");
  return timingSafeEqual(Buffer.from(candidate), Buffer.from(hash));
}

export async function signIn(_: { error?: string }, formData: FormData) {
  const parsed = codeSchema.safeParse(formData.get("code"));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  const store = await cookies();
  const attempts = Number(store.get("menu-login-attempts")?.value ?? 0);
  if (attempts > 0) await new Promise((resolve) => setTimeout(resolve, Math.min(attempts, 5) * 400));
  if (!codeMatches(parsed.data)) {
    store.set("menu-login-attempts", String(attempts + 1), { httpOnly: true, sameSite: "lax", maxAge: 900, secure: process.env.NODE_ENV === "production", path: "/" });
    return { error: "El código no es válido." };
  }
  const email = process.env.ADMIN_AUTH_EMAIL;
  const password = process.env.ADMIN_AUTH_PASSWORD;
  console.log("[AUTH DEBUG] email configured:", !!email, "password configured:", !!password);
  if (!email || !password) return { error: "Falta configurar el acceso administrador." };
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  console.log("[AUTH DEBUG] supabase error:", error?.message, error?.status);
  if (error) return { error: "No se pudo iniciar la sesión." };
  store.delete("menu-login-attempts");
  redirect("/today");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
