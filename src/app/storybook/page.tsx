/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/storybook/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Database, Brain, Boxes, LayoutDashboard, CheckCircle2 } from "lucide-react";

import { JSX } from "react/jsx-runtime";
    
/** ====== KONFIGURASI DASAR ====== */
type Lang = "id" | "en";
type SubjectKey = "Accounting" | "BigData" | "Psychology" | "SupplyChain" | "DKV";

const SUBJECTS: { key: SubjectKey; title: string; icon: JSX.Element; theme: {
  surface: string; ring: string; chip: string; glow: string; hover: string; bar: string;
}}[] = [
  {
    key: "Accounting",
    title: "Accounting",
    icon: <Calculator className="h-5 w-5" aria-hidden />,
    theme: {
      surface: "bg-fuchsia-500/10 border-fuchsia-300/25",
      ring: "ring-1 ring-fuchsia-300/30",
      chip: "bg-fuchsia-500/20 text-fuchsia-100",
      glow: "from-fuchsia-400/0 via-fuchsia-300/60 to-fuchsia-400/0",
      hover: "hover:bg-fuchsia-500/15 hover:border-fuchsia-300/35",
      bar: "bg-fuchsia-400",
    },
  },
  {
    key: "BigData",
    title: "Big Data",
    icon: <Database className="h-5 w-5" aria-hidden />,
    theme: {
      surface: "bg-blue-500/10 border-blue-300/25",
      ring: "ring-1 ring-blue-300/30",
      chip: "bg-blue-500/20 text-blue-100",
      glow: "from-blue-400/0 via-blue-300/60 to-blue-400/0",
      hover: "hover:bg-blue-500/15 hover:border-blue-300/35",
      bar: "bg-blue-400",
    },
  },
  {
    key: "Psychology",
    title: "Psikologi Kerja",
    icon: <Brain className="h-5 w-5" aria-hidden />,
    theme: {
      surface: "bg-zinc-500/10 border-zinc-300/25",
      ring: "ring-1 ring-zinc-300/30",
      chip: "bg-zinc-500/20 text-zinc-100",
      glow: "from-zinc-400/0 via-zinc-300/60 to-zinc-400/0",
      hover: "hover:bg-zinc-500/15 hover:border-zinc-300/35",
      bar: "bg-zinc-300",
    },
  },
  {
    key: "SupplyChain",
    title: "Supply Chain",
    icon: <Boxes className="h-5 w-5" aria-hidden />,
    theme: {
      surface: "bg-amber-500/10 border-amber-300/25",
      ring: "ring-1 ring-amber-300/30",
      chip: "bg-amber-500/20 text-amber-100",
      glow: "from-amber-400/0 via-amber-300/60 to-amber-400/0",
      hover: "hover:bg-amber-500/15 hover:border-amber-300/35",
      bar: "bg-amber-400",
    },
  },
  {
    key: "DKV",
    title: "DKV (Layout)",
    icon: <LayoutDashboard className="h-5 w-5" aria-hidden />,
    theme: {
      surface: "bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-amber-500/10 border-white/15",
      ring: "ring-1 ring-white/20",
      chip: "bg-white/15 text-white",
      glow: "from-pink-400/0 via-violet-300/60 to-amber-400/0",
      hover: "hover:bg-white/10 hover:border-white/25",
      bar: "bg-gradient-to-r from-pink-400 via-violet-400 to-amber-400",
    },
  },
];

// tugas default (kerangka awal)
const DEFAULT_TASKS: Record<SubjectKey, string[]> = {
  Accounting: ["Outline topik", "Contoh soal & jurnal", "Latihan ringkas"],
  BigData: ["Outline konsep", "Contoh query/data", "Latihan mini"],
  Psychology: ["Ringkasan Meaning of Work", "Contoh kasus", "Refleksi pribadi"],
  SupplyChain: ["Ringkasan model distribusi", "Contoh perusahaan", "Soal perbandingan"],
  DKV: ["Ringkasan elemen layout", "Analisis poster", "Sketsa grid"],
};

type Progress = {
  // per SubjectKey → array boolean untuk tiap task
  done: Record<SubjectKey, boolean[]>;
  xp: number; // XP global sederhana (10 poin per task)
  lang: Lang;
};

const STORAGE_KEY = "sb:progress:v1";

/** ====== UTIL STORAGE ====== */
function loadProgress(): Progress {
  if (typeof window === "undefined") {
    return { done: initDone(), xp: 0, lang: "id" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { done: initDone(), xp: 0, lang: (localStorage.getItem("sb:lang") as Lang) ?? "id" };
    const parsed = JSON.parse(raw) as Progress;
    return {
      done: mergeDone(parsed.done),
      xp: parsed.xp ?? 0,
      lang: parsed.lang ?? ((localStorage.getItem("sb:lang") as Lang) || "id"),
    };
  } catch {
    return { done: initDone(), xp: 0, lang: "id" };
  }
}

function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  localStorage.setItem("sb:lang", p.lang);
}

function initDone(): Record<SubjectKey, boolean[]> {
  const base: any = {};
  (Object.keys(DEFAULT_TASKS) as SubjectKey[]).forEach((k) => {
    base[k] = DEFAULT_TASKS[k].map(() => false);
  });
  return base as Record<SubjectKey, boolean[]>;
}

function mergeDone(existing?: Record<SubjectKey, boolean[]>): Record<SubjectKey, boolean[]> {
  const merged: any = {};
  (Object.keys(DEFAULT_TASKS) as SubjectKey[]).forEach((k) => {
    const want = DEFAULT_TASKS[k].length;
    const cur = existing?.[k] ?? [];
    const next = Array.from({ length: want }, (_, i) => Boolean(cur[i]));
    merged[k] = next;
  });
  return merged as Record<SubjectKey, boolean[]>;
}

/** ====== I18N SEDERHANA ====== */
const T = {
  id: {
    title: "StoryBook Belajar",
    subtitle: "Mode investigasi: satukan catatan & mini-quest jadi satu cerita.",
    open: "Buka",
    tasks: "Tugas",
    progress: "Progres",
    xp: "XP",
    lang: "Bahasa",
  },
  en: {
    title: "Learning StoryBook",
    subtitle: "Investigation mode: stitch notes & mini-quests into one story.",
    open: "Open",
    tasks: "Tasks",
    progress: "Progress",
    xp: "XP",
    lang: "Language",
  },
};

/** ====== PAGE ====== */
export default function StorybookPage() {
  const [state, setState] = useState<Progress>(() => loadProgress());

  useEffect(() => { saveProgress(state); }, [state]);

  const switchLang = (lang: Lang) => setState((s) => ({ ...s, lang }));

  const text = T[state.lang];

  return (
    <main className="relative min-h-screen text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,#24172f_0%,#0f0d13_55%)]" />
      <section className="pt-14">
        <div className="mx-auto max-w-6xl px-6">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{text.title}</h1>
              <p className="text-white/80">{text.subtitle}</p>
            </div>

            {/* language toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">{text.lang}</span>
              <button
                onClick={() => switchLang("id")}
                className={`rounded-full px-3 py-1 text-xs border ${state.lang==="id" ? "bg-white/15 border-white/25" : "border-white/15 hover:bg-white/10"}`}
              >
                ID
              </button>
              <button
                onClick={() => switchLang("en")}
                className={`rounded-full px-3 py-1 text-xs border ${state.lang==="en" ? "bg-white/15 border-white/25" : "border-white/15 hover:bg-white/10"}`}
              >
                EN
              </button>
            </div>
          </header>

          {/* GRID CHAPTER */}
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUBJECTS.map((s) => (
              <li key={s.key}>
                <Card
                  subject={s}
                  lang={state.lang}
                  done={state.done[s.key]}
                  onToggle={(idx: number) => {
                    setState((prev) => {
                      const copy = mergeDone(prev.done);
                      const before = copy[s.key][idx];
                      copy[s.key][idx] = !before;
                      const deltaXp = (!before ? +10 : -10);
                      return { ...prev, done: copy, xp: Math.max(0, prev.xp + deltaXp) };
                    });
                  }}
                />
              </li>
            ))}
          </ul>

          {/* XP Global */}
          <div className="mt-8 flex items-center gap-2 text-sm text-white/80">
            <CheckCircle2 className="h-4 w-4" />
            <span>{text.xp}: <b className="text-white">{state.xp}</b></span>
          </div>

          {/* Catatan: konten markdown akan kita hubungkan nanti (14.B) */}
          <div className="mt-6 text-xs text-white/60">
            Konten tiap chapter akan dibaca dari folder <code>content/</code> (Markdown). Grid ini sudah siap menampungnya.
          </div>
        </div>
      </section>
    </main>
  );
}

/** ====== CARD KOMPONEN ====== */
function Card({
  subject,
  done,
  onToggle,
  lang,
}: {
  subject: (typeof SUBJECTS)[number];
  done: boolean[];
  onToggle: (index: number) => void;
  lang: Lang;
}) {
  const tasks = DEFAULT_TASKS[subject.key];
  const completed = done.filter(Boolean).length;
  const total = tasks.length;
  const pct = Math.round((completed / total) * 100);

  // progress bar style
  const barStyle = useMemo(() => ({ width: `${pct}%` }), [pct]);

  return (
    <div className={[
      "group relative rounded-2xl border p-5 backdrop-blur-sm",
      "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]",
      subject.theme.surface, subject.theme.ring, subject.theme.hover,
    ].join(" ")}>
      {/* Chip & Title */}
      <div className="flex items-center gap-3">
        <span className={[
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
          "border border-white/10", subject.theme.chip,
        ].join(" ")}>
          {subject.icon}
          <span>{subject.title}</span>
        </span>
      </div>

      {/* Glow line */}
      <div className={["mt-4 h-px w-full bg-gradient-to-r", subject.theme.glow].join(" ")} />

      {/* Progress */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-white/70">
          <span>{lang === "id" ? "Progres" : "Progress"}</span>
          <span>{pct}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className={["h-full", subject.theme.bar, "transition-all"].join(" ")} style={barStyle} />
        </div>
      </div>

      {/* Tasks checklist */}
      <div className="mt-4 space-y-2">
        <p className="text-xs uppercase tracking-wide text-white/60">
          {lang === "id" ? "Tugas" : "Tasks"}
        </p>
        <ul className="space-y-1.5">
          {tasks.map((label, i) => (
            <li key={i} className="flex items-center gap-2">
              <input
                id={`${subject.key}-${i}`}
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/5"
                checked={!!done[i]}
                onChange={() => onToggle(i)}
              />
              <label htmlFor={`${subject.key}-${i}`} className="text-sm text-white/85 cursor-pointer">
                {label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-4">
        <Link
          href={`#${subject.key.toLowerCase()}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          {lang === "id" ? "Buka" : "Open"}
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M7.5 5h7a.5.5 0 0 1 .5.5v7a1 1 0 1 1-2 0V8.707l-6.146 6.147a1 1 0 1 1-1.414-1.414L11.586 7.5H7.5a1 1 0 1 1 0-2z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
