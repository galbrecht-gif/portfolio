import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useLang } from "../i18n";
import SpotlightCard from "./SpotlightCard";

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="section">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}>
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">{t.about.eyebrow}</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.about.title}</h2>
        <p className="mt-5 max-w-2xl text-zinc-400">{t.about.text}</p>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {t.about.stats.map(([big, small]) => (
            <SpotlightCard key={small} className="p-5" color="rgba(34,211,238,0.15)">
              <div className="gradient-text text-3xl font-extrabold">{big}</div>
              <div className="mt-1 text-sm text-zinc-400">{small}</div>
            </SpotlightCard>
          ))}
        </div>

        <div className="glass mt-4 flex items-center gap-4 rounded-2xl p-5">
          <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-300">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">{t.about.edu}</div>
            <div className="font-medium text-white">{t.about.eduValue}</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
