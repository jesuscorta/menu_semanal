import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { documentById } from "@/features/documents/catalog";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ document: string }> }) {
  const { document: id } = await params; const document = documentById(id);
  if (!document) return new NextResponse("No encontrado", { status: 404 });
  const supabase = await createSupabaseServerClient(); const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.app_metadata.role !== "admin") return new NextResponse("No autorizado", { status: 401 });
  const root = process.cwd(); const files = await readdir(/* turbopackIgnore: true */ root); const filename = files.find((file) => file.endsWith(".pdf") && document.match(file));
  if (!filename) return new NextResponse("Documento no disponible", { status: 404 });
  const file = await readFile(path.join(/* turbopackIgnore: true */ root, filename));
  return new NextResponse(file, { headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="${document.id}.pdf"`, "Cache-Control": "private, no-store" } });
}
