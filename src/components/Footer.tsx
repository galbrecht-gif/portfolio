import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MessageCircle, Clock } from "lucide-react";
import { PROFILE, waLink } from "../config";
import { useLang } from "../i18n";

function useClock(tz: string, locale: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat(locale, { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now);
}

export default function Footer() {
  const { t, lang } = useLang();
  const time = useClock(PROFILE.timezone, lang === "pt" ? "pt-BR" : "en-US");
  const social = [
    { href: PROFILE.socials.github, icon: Github, label: "GitHub" },
    { href: PROFILE.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer id="contact" className="border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.footer.title}</h2>
            <p className="mt-2 text-zinc-400">{t.footer.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${PROFILE.email}`} className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white transition hover:bg-white/10">
                <Mail className="h-4 w-4 text-cyan-300" />
                {PROFILE.email}
              </a>
              <a href={waLink(t.budget.msg("-", []))} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white transition hover:bg-white/10">
                <MessageCircle className="h-4 w-4 text-emerald-300" />
                {PROFILE.phone}
              </a>
            </div>
          </div>

          <div className="space-y-4 md:text-right">
            <div className="glass inline-flex items-center gap-3 rounded-xl px-4 py-3 font-mono text-sm">
              <Clock className="h-4 w-4 text-emerald-300" />
              <span className="text-zinc-500">{t.footer.localTime}</span>
              <span className="tabular-nums text-white">{time}</span>
              <span className="text-zinc-600">{PROFILE.city}</span>
            </div>
            <div className="flex gap-2 md:justify-end">
              {social.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="glass rounded-full p-3 text-zinc-400 transition hover:text-white hover:bg-white/10">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 font-mono text-xs text-zinc-600 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}. {t.footer.rights}
          </span>
          <span>{t.footer.built}</span>
        </div>
      </div>
    </footer>
  );
}
