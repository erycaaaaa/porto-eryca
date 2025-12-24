"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Gamepad2, NotebookPen } from "lucide-react";
import { JSX } from "react";

type GameTheme = {
  surface: string;
  ring: string;
  chip: string;
  glow: string;
  hover: string;
};

type HeroGameProps = {
  title?: string;
  subtitle?: string;
  games?: string[]; // biarkan longgar (string[]), aman dengan props kamu sekarang
  themes?: Record<string, GameTheme>; // NEW: terima tema dari page.tsx
};

const DEFAULT_THEMES: Record<string, GameTheme> = {
  MakeStory: {
    surface: "bg-rose-500/10 border-rose-300/25",
    ring: "ring-1 ring-rose-300/30",
    chip: "bg-rose-500/20 text-rose-100",
    glow: "from-rose-400/0 via-rose-300/60 to-rose-400/0",
    hover: "hover:bg-rose-500/15 hover:border-rose-300/35",
  },
  PlayGame: {
    surface: "bg-violet-500/10 border-violet-300/25",
    ring: "ring-1 ring-violet-300/30",
    chip: "bg-violet-500/20 text-violet-100",
    glow: "from-violet-400/0 via-violet-300/60 to-violet-400/0",
    hover: "hover:bg-violet-500/15 hover:border-violet-300/35",
  },
  TakesNotes: {
    surface: "bg-amber-500/10 border-amber-300/25",
    ring: "ring-1 ring-amber-300/30",
    chip: "bg-amber-500/20 text-amber-100",
    glow: "from-amber-400/0 via-amber-300/60 to-amber-400/0",
    hover: "hover:bg-amber-500/15 hover:border-amber-300/35",
  },
  __default: {
    surface: "bg-white/5 border-white/15",
    ring: "ring-1 ring-white/10",
    chip: "bg-white/10 text-white/90",
    glow: "from-white/0 via-white/30 to-white/0",
    hover: "hover:bg-white/10 hover:border-white/25",
  },
};

const ICONS: Record<string, JSX.Element> = {
  MakeStory: <BookOpen className="h-5 w-5" aria-hidden />,
  PlayGame: <Gamepad2 className="h-5 w-5" aria-hidden />,
  TakesNotes: <NotebookPen className="h-5 w-5" aria-hidden />,
};

const DESCS: Record<string, string> = {
  MakeStory:
    "Bangun cerita tarot interaktif. Tulis premis, tarik kartu, dan biarkan alur berkembang.",
  PlayGame:
    "Mode permainan cepat: tebak kartu, kombinasi, dan mini-quest bertema tarot.",
  TakesNotes:
    "Catat hasil bacaan kartu, simpan spread, dan export insight untuk refleksi.",
};

function themeFor(key: string, themes?: Record<string, GameTheme>): GameTheme {
  return themes?.[key] ?? DEFAULT_THEMES[key] ?? DEFAULT_THEMES.__default;
}

export default function HeroGame({ title, subtitle, games = [], themes }: HeroGameProps) {
  return (
    <section className="relative pt-16">
      <div className="mx-auto max-w-6xl px-6">
        {title ? (
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
        ) : (
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Tarot Mini-Apps</h1>
        )}
        <p className="mt-2 text-white/80 max-w-2xl">
          {subtitle ?? "Pilih fitur yang kamu mau—setiap game punya warna identitasnya sendiri."}
        </p>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.map((g) => {
            const t = themeFor(g, themes);
            return (
              <li key={g}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={[
                    "group relative rounded-2xl border p-5 backdrop-blur-sm",
                    "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]",
                    t.surface,
                    t.ring,
                    t.hover,
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
                        "border border-white/10",
                        t.chip,
                      ].join(" ")}
                    >
                      {ICONS[g] ?? <span className="h-5 w-5 rounded-full bg-white/20" />}
                      <span>{g}</span>
                    </span>
                  </div>

                  <div className={["mt-4 h-px w-full bg-gradient-to-r", t.glow].join(" ")} />

                  <p className="mt-3 text-sm text-white/85">
                    {DESCS[g] ?? "Mini-app khusus tarot."}
                  </p>

                  <div className="mt-4">
                    <Link
                      href={`#${g.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      Open {g}
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path d="M7.5 5h7a.5.5 0 0 1 .5.5v7a1 1 0 1 1-2 0V8.707l-6.146 6.147a1 1 0 1 1-1.414-1.414L11.586 7.5H7.5a1 1 0 1 1 0-2z" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
