import Link from "next/link";
import { notFound } from "next/navigation";
import { documentById } from "@/features/documents/catalog";

export default async function DocumentPage({ params }: { params: Promise<{ document: string }> }) {
  const { document: id } = await params; const document = documentById(id); if (!document) notFound(); const source = `/api/documents/${document.id}`;
  return <main className="flex min-h-[calc(100dvh-6rem)] flex-col"><header className="flex items-center justify-between gap-4 px-5 pb-4 pt-7 sm:px-7"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#e85d4a]">Documento de consulta</p><h1 className="mt-1 text-2xl font-black tracking-tight">{document.title}</h1></div><Link className="rounded-xl bg-white px-4 py-3 text-sm font-bold shadow-sm" href="/settings">Volver</Link></header><div className="mx-5 mb-4 flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm sm:mx-7"><span className="text-sm font-bold text-[#66716b]">{document.date}</span><a className="rounded-xl bg-[#e85d4a] px-3 py-2 text-xs font-black text-white" href={source} rel="noopener noreferrer" target="_blank">Abrir PDF</a></div><iframe className="mx-5 mb-5 min-h-[70dvh] flex-1 rounded-2xl bg-white shadow-sm sm:mx-7" src={source} title={document.title}>Tu navegador no puede mostrar este PDF.</iframe></main>;
}
