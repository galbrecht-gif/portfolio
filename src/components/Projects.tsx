import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n";
import Badge from "./Badge";
import SpotlightCard from "./SpotlightCard";

const gradients = [
  "from-emerald-500/30 to-cyan-500/10",
  "from-cyan-500/30 to-violet-500/10",
  "from-violet-500/30 to-fuchsia-500/10",
  "from-amber-500/25 to-emerald-500/10",
];

export default function Projects() {
  const { t } = useLang();
  return (
    <section id="projects" className="section">
      <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">{t.projects.eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.projects.title}</h2>
      <p className="mt-3 text-zinc-400">{t.projects.subtitle}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.projects.items.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}>
            <SpotlightCard className="group h-full">
              <a href={p.url} target="_blank" rel="noreferrer" aria-label={`${t.projects.visit}: ${p.title}`} className="absolute inset-0 z-20" />
              <div className={`relative h-40 bg-gradient-to-br ${gradients[i % gradients.length]}`}>
                <div className="bg-grid absolute inset-0 opacity-60" />
                <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-xs text-white backdrop-blur">{p.kind}</span>
                <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-300">
                  {t.projects.visit} <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-zinc-600">// {t.projects.note}</p>
    </section>
  );
}
