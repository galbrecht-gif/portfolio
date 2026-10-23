import { motion } from "framer-motion";
import { ArrowRight, Languages } from "lucide-react";
import { useLang } from "../i18n";
import Terminal from "./Terminal";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }),
};

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden pt-36 sm:pt-44">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-[300px] w-[400px] rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-24 sm:px-8 lg:grid-cols-2">
        <div>
          <motion.span
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs text-emerald-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            {t.hero.title1}
            <br />
            <span className="gradient-text">{t.hero.title2}</span>
          </motion.h1>

          <motion.p custom={2} variants={fade} initial="hidden" animate="show" className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            {t.hero.subtitle}
          </motion.p>

          <motion.div custom={3} variants={fade} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-3">
            <a
              href="#budget"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              {t.hero.cta1}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#projects" className="glass inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              {t.hero.cta2}
            </a>
          </motion.div>

          <motion.p custom={4} variants={fade} initial="hidden" animate="show" className="mt-8 flex items-center gap-2 font-mono text-xs text-zinc-500">
            <Languages className="h-4 w-4" />
            {t.hero.langs}
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
