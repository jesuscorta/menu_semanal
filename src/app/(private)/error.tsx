"use client";

export default function PrivateError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="mx-5 mt-8 rounded-[1.75rem] bg-[#fff0eb] p-7 text-[#8e3c2f] sm:mx-7"><h1 className="text-2xl font-black">No se pudo completar la acción</h1><p className="mt-3 text-sm leading-6">Comprueba tu conexión e inténtalo de nuevo. Tus datos no se han modificado parcialmente.</p><button className="mt-6 min-h-11 rounded-xl bg-[#e85d4a] px-4 text-sm font-black text-white" onClick={reset}>Reintentar</button></main>;
}
