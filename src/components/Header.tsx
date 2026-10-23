import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLang } from "../i18n";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const links = [
    ["#about", t.nav.about],
    ["#skills", t.nav.skills],
    ["#projects", t.nav.projects],
    ["#budget", t.nav.budget],
    ["#contact", t.nav.contact],
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.1 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-3"
    >
      <nav className="glass flex max-w-full items-center gap-1 rounded-full bg-black/60 px-2 py-2 shadow-2xl shadow-black/50 sm:gap-2">
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="hidden whitespace-nowrap text-xs font-medium text-zinc-200 sm:inline">{t.available}</span>
          <span className="whitespace-nowrap text-xs font-medium text-zinc-200 sm:hidden">Online</span>
        </div>

        <ul className="hidden items-center md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="rounded-full px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 rounded-full bg-white/5 p-1" role="group" aria-label="Language">
          <Globe className="ml-1.5 h-3.5 w-3.5 text-zinc-500" />
          {(["pt", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className="relative rounded-full px-2.5 py-1 font-mono text-xs font-semibold uppercase"
            >
              {lang === l && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-full bg-emerald-400"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative ${lang === l ? "text-black" : "text-zinc-400"}`}>{l}</span>
            </button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
