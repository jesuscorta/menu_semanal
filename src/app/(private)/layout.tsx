import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MobileNav } from "@/components/mobile-nav";
import { MealsActionNotice } from "@/features/meals/meals-action-notice";

export default async function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.app_metadata.role !== "admin") redirect("/login");
  return <div className="mx-auto min-h-dvh max-w-2xl bg-[#fff8f0] pb-24 md:my-6 md:min-h-[calc(100dvh-3rem)] md:overflow-hidden md:rounded-[2rem] md:shadow-2xl md:shadow-stone-300/40"><MealsActionNotice />{children}<MobileNav /></div>;
}
