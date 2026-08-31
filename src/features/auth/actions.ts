"use server";

import { timingSafeEqual, scryptSync } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const codeSchema = z.string().trim().min(1, "Introduce el código de acceso.").max(256);

function codeMatches(code: string) {
  console.log("[AUTH DEBUG] Node.js version:", process.version);
  console.log("[AUTH DEBUG] received code:", JSON.stringify(code), "length:", code.length);
  const hash = process.env.ADMIN_ACCESS_CODE_HASH;
  const salt = process.env.ADMIN_ACCESS_CODE_SALT;
  console.log("[AUTH DEBUG] salt length:", salt?.length, "hash length:", hash?.length);
  console.log("[AUTH DEBUG] salt value:", JSON.stringify(salt));
  console.log("[AUTH DEBUG] hash value:", JSON.stringify(hash));
  if (!hash || !salt) throw new Error("Falta configurar el acceso administrador.");
  const candidate = scryptSync(code, salt, 64).toString("base64");
  console.log("[AUTH DEBUG] candidate:", candidate);
  console.log("[AUTH DEBUG] match:", candidate === hash);
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
  if (!email || !password) return { error: "Falta configurar el acceso administrador." };
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "No se pudo iniciar la sesión." };
  store.delete("menu-login-attempts");
  redirect("/today");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
