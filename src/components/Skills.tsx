import { motion } from "framer-motion";
import { LayoutTemplate, Server, Wrench, type LucideIcon } from "lucide-react";
import { useLang } from "../i18n";
import Badge from "./Badge";
import SpotlightCard from "./SpotlightCard";

const icons: Record<string, LucideIcon> = { layout: LayoutTemplate, server: Server, wrench: Wrench };
const colors = ["rgba(16,185,129,0.18)", "rgba(34,211,238,0.18)", "rgba(139,92,246,0.2)"];

export default function Skills() {
  const { t } = useLang();
  return (
    <section id="skills" className="section">
      <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">{t.skills.eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.skills.title}</h2>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {t.skills.groups.map((g, i) => {
          const Icon = icons[g.icon];
          return (
            <motion.div key={g.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.1, duration: 0.6 }}>
              <SpotlightCard className="h-full p-6" color={colors[i % colors.length]}>
                <div className="mb-4 inline-flex rounded-lg border border-white/10 bg-white/5 p-2.5 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{g.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
