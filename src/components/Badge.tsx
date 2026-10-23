import type { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-zinc-300 transition hover:border-emerald-400/40 hover:text-emerald-300">
      {children}
    </span>
  );
}
