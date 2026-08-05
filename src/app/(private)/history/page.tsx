import { ScreenHeader } from "@/components/screen-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function HistoryPage() {
  const supabase = await createSupabaseServerClient(); const { data } = await supabase.from("weekly_menus").select("id, week_start, status").order("week_start", { ascending: false });
  return <main><ScreenHeader eyebrow="Lo que ya disfrutasteis" title="Historial" /><div className="mt-5 space-y-3 px-5 sm:px-7">{(data ?? []).map((menu: Record<string, unknown>) => <article className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm" key={String(menu.id)}><div className="grid size-11 place-items-center rounded-xl bg-[#e9f8f5] text-xs font-black text-[#1f9e9a]">SEM</div><div><h2 className="font-black">Semana del {String(menu.week_start)}</h2><p className="mt-1 text-xs font-medium text-[#66716b]">Menú {String(menu.status) === "active" ? "activo" : String(menu.status)}</p></div></article>)}{!data?.length && <p className="rounded-2xl bg-white p-5 text-sm text-[#66716b] shadow-sm">Aún no hay semanas guardadas.</p>}</div></main>;
}
