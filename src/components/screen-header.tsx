import type { ReactNode } from "react";

export function ScreenHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <header className="flex items-start justify-between gap-4 px-5 pb-2 pt-7 sm:px-7"><div>{eyebrow && <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e85d4a]">{eyebrow}</p>}<h1 className="mt-1 text-3xl font-black tracking-[-0.045em] text-[#24302b]">{title}</h1></div>{action}</header>;
}
