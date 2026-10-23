import { useEffect, useRef, useState, type FormEvent } from "react";
import { PROFILE, waLink } from "../config";
import { useLang } from "../i18n";

type Line = { id: number; kind: "cmd" | "out" | "err" | "link"; text: string; href?: string };

const QUICK = ["help", "about", "skills", "services", "languages", "contact", "clear"];

let uid = 0;
const line = (kind: Line["kind"], text: string, href?: string): Line => ({ id: ++uid, kind, text, href });

export default function Terminal() {
  const { t, lang } = useLang();
  const [lines, setLines] = useState<Line[]>(() => [line("out", t.terminal.welcome)]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Reinicia a mensagem de boas-vindas ao trocar o idioma.
  useEffect(() => {
    setLines([line("out", t.terminal.welcome)]);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const out: Line[] = [line("cmd", cmd)];
    switch (cmd) {
      case "help":
        t.terminal.help.forEach(([c, d]) => out.push(line("out", `${c.padEnd(10)} ${d}`)));
        break;
      case "about":
        t.terminal.about.forEach((l) => out.push(line("out", l)));
        break;
      case "skills":
        t.skills.groups.forEach((g) => out.push(line("out", `${g.title}: ${g.items.join(", ")}`)));
        break;
      case "services":
        t.terminal.services.forEach((l) => out.push(line("out", l)));
        break;
      case "languages":
        t.terminal.languages.forEach((l) => out.push(line("out", l)));
        break;
      case "contact":
        out.push(line("link", `email    ${PROFILE.email}`, `mailto:${PROFILE.email}`));
        out.push(line("link", `whatsapp ${PROFILE.phone}`, waLink(t.budget.msg("-", []))));
        break;
      default:
        out.push(line("err", `${t.terminal.notFound} ${cmd}. ${t.terminal.hint}`));
    }
    setLines((prev) => [...prev, ...out]);
    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run(value);
    setValue("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(hIdx + 1, history.length - 1);
      if (n >= 0) {
        setHIdx(n);
        setValue(history[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = hIdx - 1;
      setHIdx(n);
      setValue(n >= 0 ? history[n] : "");
    }
  };

  return (
    <div className="glass overflow-hidden rounded-2xl bg-black/60 shadow-2xl shadow-emerald-500/10" onClick={() => inputRef.current?.focus()}>
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-3 font-mono text-xs text-zinc-500">~/{PROFILE.handle} — zsh</span>
      </div>

      <div ref={scrollRef} className="terminal-scroll h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
        {lines.map((l) => {
          if (l.kind === "cmd")
            return (
              <div key={l.id} className="text-zinc-100">
                <span className="text-emerald-400">❯</span> {l.text}
              </div>
            );
          if (l.kind === "err")
            return (
              <div key={l.id} className="text-red-400">
                {l.text}
              </div>
            );
          if (l.kind === "link")
            return (
              <a key={l.id} href={l.href} target="_blank" rel="noreferrer" className="block whitespace-pre text-cyan-300 underline-offset-4 hover:underline">
                {l.text}
              </a>
            );
          return (
            <div key={l.id} className="whitespace-pre-wrap text-zinc-400">
              {l.text}
            </div>
          );
        })}

        <form onSubmit={submit} className="flex items-center gap-2">
          <span className="text-emerald-400">❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            placeholder={t.terminal.placeholder}
            aria-label="terminal"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-zinc-100 caret-emerald-400 outline-none placeholder:text-zinc-600"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/10 bg-white/[0.02] px-4 py-3">
        {QUICK.map((c) => (
          <button
            key={c}
            onClick={(e) => {
              e.stopPropagation();
              run(c);
            }}
            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-zinc-300 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
