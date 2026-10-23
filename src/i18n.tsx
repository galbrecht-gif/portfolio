import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "pt" | "en";

const dict = {
  pt: {
    nav: { about: "Sobre", skills: "Skills", projects: "Projetos", budget: "Orçamento", contact: "Contato" },
    available: "Disponível para novos projetos",
    hero: {
      badge: "Desenvolvedor Web & Técnico em TI",
      title1: "Interfaces rápidas.",
      title2: "Resultados reais.",
      subtitle:
        "Crio landing pages de alta conversão, sites institucionais e aplicações web modernas — e cuido da infraestrutura com suporte técnico especializado.",
      cta1: "Solicitar orçamento",
      cta2: "Ver projetos",
      langs: "Português (Nativo) · Inglês (Fluente)",
    },
    terminal: {
      welcome: "Bem-vindo ao terminal interativo. Digite 'help' ou clique em um comando.",
      notFound: "comando não encontrado:",
      hint: "Digite 'help' para ver os comandos.",
      placeholder: "digite um comando...",
      help: [
        ["help", "lista os comandos disponíveis"],
        ["about", "quem sou eu"],
        ["skills", "stack e competências"],
        ["services", "o que eu entrego"],
        ["languages", "idiomas"],
        ["contact", "e-mail e WhatsApp"],
        ["clear", "limpa o terminal"],
      ] as [string, string][],
      about: [
        "Desenvolvedor Web & Técnico em TI.",
        "Formação: Técnico em TI & Informática Avançada.",
        "Foco: performance, conversão e código limpo.",
      ],
      services: [
        "→ Landing Pages de Alta Conversão",
        "→ Websites Institucionais",
        "→ Aplicações Web Modernas",
      ],
      languages: ["Português — Nativo", "Inglês — Fluente"],
    },
    about: {
      eyebrow: "Sobre",
      title: "Código de produto, mentalidade de infraestrutura.",
      text: "Unir desenvolvimento web e formação técnica em TI me permite entregar projetos completos: do design da interface ao servidor, domínio, e-mail e suporte pós-lançamento. Sem terceirizar, sem surpresas.",
      stats: [
        ["100%", "Foco em performance"],
        ["2", "Idiomas de atendimento"],
        ["24h", "Resposta a orçamentos"],
        ["Mobile", "First em todo projeto"],
      ] as [string, string][],
      edu: "Formação",
      eduValue: "Técnico em TI & Informática intermediaria",
    },
    skills: {
      eyebrow: "Skills",
      title: "Stack moderna, base técnica sólida.",
      groups: [
        { title: "Front-end", icon: "layout", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Next.js"] },
        { title: "Back-end & Dados", icon: "server", items: ["Node.js", "REST APIs", "PostgreSQL", "Firebase", "Auth / JWT"] },
        { title: "Técnico em TI", icon: "wrench", items: ["Suporte TI", "Redes", "Hardware", "Windows / Linux", "Segurança básica"] },
      ],
    },
    projects: {
      eyebrow: "Projetos",
      title: "Trabalhos selecionados",
      subtitle: "Exemplos de entregas por categoria de serviço.",
      items: [
        { title: "Gestão de Patrimônio — SENAI Indaiatuba", desc: "Sistema web para controlar equipamentos, reservas, manutenções e histórico em um único painel, com bloqueio automático de conflitos e alertas de atraso.", tags: ["React", "TypeScript", "Auth", "Vercel"], kind: "Web App", url: "https://tcc-teste1.vercel.app/auth?modo=login" },
      ],
      note: "Mais projetos em breve. Adicione novos em src/i18n.tsx",
      visit: "Ver projeto",
    },
    budget: {
      eyebrow: "Orçamento rápido",
      title: "Monte seu projeto em 10 segundos.",
      subtitle: "Escolha o tipo, os extras e envie direto pelo WhatsApp com a mensagem pronta.",
      types: [
        { id: "landing", label: "Landing Page", desc: "1 página, alta conversão",         range: "A partir de R$ 350" },
                { id: "site", label: "Site Completo", desc: "Multipágina institucional", range: "A partir de R$ 900" },
                { id: "system", label: "Sistema Web", desc: "Aplicação sob medida", range: "A partir de R$ 2.500" },
                { id: "support", label: "Suporte TI", desc: "Atendimento técnico", range: "A partir de R$ 60/h" },
      ],
      extras: [
        { id: "seo", label: "SEO técnico" },
        { id: "i18n", label: "Site bilíngue" },
        { id: "cms", label: "Painel de conteúdo" },
        { id: "host", label: "Hospedagem e domínio" },
      ],
      extrasTitle: "Extras",
      summary: "Resumo",
      estimate: "Estimativa",
      note: "Valor final definido após alinhamento do escopo.",
      send: "Solicitar via WhatsApp",
      msg: (type: string, extras: string[]) =>
        `Olá! Vim pelo seu portfólio e gostaria de um orçamento.\n\nProjeto: ${type}\nExtras: ${extras.length ? extras.join(", ") : "nenhum"}\n\nPodemos conversar?`,
    },
    footer: {
      title: "Vamos construir algo incrível?",
      subtitle: "Resposta rápida por e-mail ou WhatsApp.",
      localTime: "Hora local",
      rights: "Todos os direitos reservados.",
      built: "Feito com React, TypeScript, Tailwind e Framer Motion.",
    },
  },
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects", budget: "Quote", contact: "Contact" },
    available: "Available for new projects",
    hero: {
      badge: "Web Developer & IT Technician",
      title1: "Fast interfaces.",
      title2: "Real results.",
      subtitle:
        "I build high-converting landing pages, corporate websites and modern web apps — and keep the infrastructure healthy with specialized technical support.",
      cta1: "Request a quote",
      cta2: "See projects",
      langs: "Portuguese (Native) · English (Fluent)",
    },
    terminal: {
      welcome: "Welcome to the interactive terminal. Type 'help' or click a command.",
      notFound: "command not found:",
      hint: "Type 'help' to list commands.",
      placeholder: "type a command...",
      help: [
        ["help", "list available commands"],
        ["about", "who I am"],
        ["skills", "stack and skills"],
        ["services", "what I deliver"],
        ["languages", "spoken languages"],
        ["contact", "email and WhatsApp"],
        ["clear", "clear the terminal"],
      ] as [string, string][],
      about: [
        "Web Developer & IT Technician.",
        "Education: IT Technician & Advanced Computing.",
        "Focus: performance, conversion and clean code.",
      ],
      services: [
        "→ High-Conversion Landing Pages",
        "→ Corporate Websites",
        "→ Modern Web Applications",
        "→ Specialized Technical Support",
      ],
      languages: ["Portuguese — Native", "English — Fluent"],
    },
    about: {
      eyebrow: "About",
      title: "Product-grade code, infrastructure mindset.",
      text: "Combining web development with a technical IT background lets me ship complete projects: from UI design to server, domain, email and post-launch support. No outsourcing, no surprises.",
      stats: [
        ["100%", "Performance focus"],
        ["2", "Support languages"],
        ["24h", "Quote response"],
        ["Mobile", "First on every project"],
      ] as [string, string][],
      edu: "Education",
      eduValue: "IT Technician & Advanced Computing",
    },
    skills: {
      eyebrow: "Skills",
      title: "Modern stack, solid technical foundation.",
      groups: [
        { title: "Front-end", icon: "layout", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Next.js"] },
        { title: "Back-end & Data", icon: "server", items: ["Node.js", "REST APIs", "PostgreSQL", "Firebase", "Auth / JWT"] },
        { title: "IT Technician", icon: "wrench", items: ["IT Support", "Networking", "Hardware", "Windows / Linux", "Basic Security"] },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected work",
      subtitle: "Sample deliveries by service category.",
      items: [
        { title: "Asset Management — SENAI Indaiatuba", desc: "Web system to track equipment, bookings, maintenance and history in a single dashboard, with automatic conflict blocking and overdue alerts.", tags: ["React", "TypeScript", "Auth", "Vercel"], kind: "Web App", url: "https://tcc-teste1.vercel.app/auth?modo=login" },
      ],
      note: "More projects coming soon. Add new ones in src/i18n.tsx",
      visit: "View project",
    },
    budget: {
      eyebrow: "Quick quote",
      title: "Scope your project in 10 seconds.",
      subtitle: "Pick the type and extras, then send it straight via WhatsApp with a ready-made message.",
      types: [
        { id: "landing", label: "Landing Page", desc: "1 page, high conversion",         range: "From R$ 350" },
                { id: "site", label: "Full Website", desc: "Multi-page corporate site", range: "From R$ 900" },
                { id: "system", label: "Web System", desc: "Custom application", range: "From R$ 2,500" },
                { id: "support", label: "IT Support", desc: "Technical assistance", range: "From R$ 60/h" },
      ],
      extras: [
        { id: "seo", label: "Technical SEO" },
        { id: "i18n", label: "Bilingual site" },
        { id: "cms", label: "Content panel" },
        { id: "host", label: "Hosting & domain" },
      ],
      extrasTitle: "Extras",
      summary: "Summary",
      estimate: "Estimate",
      note: "Final price defined after scope alignment.",
      send: "Request via WhatsApp",
      msg: (type: string, extras: string[]) =>
        `Hi! I found you through your portfolio and would like a quote.\n\nProject: ${type}\nExtras: ${extras.length ? extras.join(", ") : "none"}\n\nCan we talk?`,
    },
    footer: {
      title: "Let's build something great?",
      subtitle: "Fast reply by email or WhatsApp.",
      localTime: "Local time",
      rights: "All rights reserved.",
      built: "Built with React, TypeScript, Tailwind and Framer Motion.",
    },
  },
};

export type Dict = typeof dict.pt;

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "pt" || saved === "en") return saved;
    return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: dict[lang] as Dict }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
