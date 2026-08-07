const messages: Record<string, string> = {
  generated: "Semana generada correctamente.",
  regenerated: "Semana regenerada correctamente.",
  replaced: "Plato cambiado correctamente.",
  activated: "Plato activado.",
  deactivated: "Plato desactivado.",
  settings_saved: "Ajustes guardados.",
};

export function ActionNotice({ notice }: { notice?: string }) {
  const message = notice ? messages[notice] : undefined;
  if (!message) return null;
  return <p aria-live="polite" className="mx-5 mt-4 rounded-2xl bg-[#edf8df] px-4 py-3 text-sm font-bold text-[#52742e] sm:mx-7">{message}</p>;
}
