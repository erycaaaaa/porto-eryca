"use client";

import Link from "next/link";

type Props = { className?: string };

export function TarotButtonLink({ className = "" }: Props) {
  return (
    <Link
      href="/tarot"
      className={
        "group relative flex items-center justify-center w-[100px] h-[100px] rounded-full bg-white/60 text-6xl hover:bg-white/80 transition cursor-pointer " +
        className
      }
    >
      {/* HALO lembut di belakang */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full
                   bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),rgba(255,255,255,0)_60%)]
                   blur-md opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Sparkle putih random */}
      <span
        aria-hidden
        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white shadow animate-ping"
      />
      <span
        aria-hidden
        className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-white/90 shadow animate-pulse"
      />
      <span
        aria-hidden
        className="absolute top-1/4 left-[10%] w-1.5 h-1.5 rounded-full bg-white/90 shadow animate-ping"
      />
      <span
        aria-hidden
        className="absolute bottom-[18%] right-[14%] w-2 h-2 rounded-full bg-white shadow animate-pulse"
      />

      {/* Segitiga bintang kuning */}
      <span
        aria-hidden
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300 animate-pulse"
      />
      <span
        aria-hidden
        className="absolute bottom-2 -left-4 w-3 h-3 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300 animate-pulse"
      />
      <span
        aria-hidden
        className="absolute bottom-2 -right-4 w-3 h-3 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300 animate-pulse"
      />

      {/* “glint” berputar tipis */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-30 mix-blend-screen
                   [background:conic-gradient(from_0deg,transparent_0_30%,white_40%,transparent_50%)]
                   animate-spin"
      />
      {/* “glint” berputar tipis */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-30 mix-blend-screen
                   [background:conic-gradient(from_190deg,transparent_0_10%,yellow_50%,transparent_70%)]
                   animate-spin"
      />

      {/* ICON */}
      <span className="select-none">🔮</span>

      {/* Tooltip */}
      <span
        className="
          pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3
          whitespace-nowrap rounded-[10px] border border-black/10 bg-white/90
          px-0 py-0 text-sm text-black shadow-md
          opacity-0 translate-y-0
          transition-opacity duration-150
          group-hover:opacity-100 group-hover:translate-y-0
          group-focus-visible:opacity-100 group-focus-visible:translate-y-0
        "
        role="tooltip"
        aria-hidden="true"
      >
        Mau Baca Tarot?
      </span>
    </Link>
  );
}
