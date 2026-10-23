import { useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { waLink } from "../config";
import { useLang } from "../i18n";

export default function BudgetWidget() {
  const { t } = useLang();
  const [typeId, setTypeId] = useState("landing");
  const [extras, setExtras] = useState<string[]>([]);

  const type = t.budget.types.find((x) => x.id === typeId) ?? t.budget.types[0];
  const extraLabels = t.budget.extras.filter((e) => extras.includes(e.id)).map((e) => e.label);
  const toggle = (id: string) => setExtras((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <section id="budget" className="section">
      <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[100px]" />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">{t.budget.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.budget.title}</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">{t.budget.subtitle}</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
                {t.budget.types.map((x) => {
                  const on = x.id === typeId;
                  return (
                    <button
                      key={x.id}
                      role="radio"
                      aria-checked={on}
                      onClick={() => setTypeId(x.id)}
                      className={`rounded-xl border p-4 text-left transition ${
                        on ? "border-emerald-400/60 bg-emerald-400/10" : "border-white/10 bg-white/[0.02] hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{x.label}</span>
                        {on && <Check className="h-4 w-4 text-emerald-300" />}
                      </div>
                      <div className="mt-1 text-sm text-zinc-400">{x.desc}</div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <div className="mb-3 font-mono text-xs uppercase tracking-wider text-zinc-500">{t.budget.extrasTitle}</div>
                <div className="flex flex-wrap gap-2">
                  {t.budget.extras.map((e) => {
                    const on = extras.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        aria-pressed={on}
                        onClick={() => toggle(e.id)}
                        className={`rounded-full border px-4 py-1.5 text-sm transition ${
                          on ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200" : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {e.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl border border-white/10 bg-black/40 p-6">
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">{t.budget.summary}</div>
              <div className="mt-3 text-xl font-semibold text-white">{type.label}</div>
              <div className="mt-1 text-sm text-zinc-400">{extraLabels.length ? extraLabels.join(" · ") : "—"}</div>
              <div className="mt-6 font-mono text-xs uppercase tracking-wider text-zinc-500">{t.budget.estimate}</div>
              <div className="gradient-text text-2xl font-extrabold">{type.range}</div>
              <p className="mt-1 text-xs text-zinc-500">{t.budget.note}</p>

              <a
                href={waLink(t.budget.msg(type.label, extraLabels))}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 pt-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                <MessageCircle className="h-4 w-4" />
                {t.budget.send}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
