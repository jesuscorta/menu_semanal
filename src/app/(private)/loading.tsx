export default function PrivateLoading() {
  return <main aria-busy="true" className="space-y-5 px-5 pt-8 sm:px-7"><div className="h-4 w-28 animate-pulse rounded bg-stone-200"/><div className="h-9 w-48 animate-pulse rounded bg-stone-200"/><div className="mt-8 h-40 animate-pulse rounded-[1.75rem] bg-white"/><div className="h-32 animate-pulse rounded-[1.75rem] bg-white"/><p className="sr-only">Cargando contenido...</p></main>;
}
