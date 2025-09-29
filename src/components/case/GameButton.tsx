"use client";

import Link from "next/link";

type Props = { className?: string };

export function GameButtonLink({ className = "" }: Props) {
  return (
    <Link
      href="/game"
      className={
        "group relative flex items-center bottom-[620px] left-5 justify-center w-[24px] h-[34px] rounded-full bg-white/60 text-6xl hover:bg-white/80 transition cursor-pointer " +
        className
      }
    >
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


      {/* ICON */}
      <span className="select-none  w-[14px] h-[34px] "
      >👩🏻‍💻

      </span>

      {/* Tooltip */}
      <span
        className="
          pointer-events-none absolute bottom-full top-[-10] left-1/2 -translate-x-2/2 mb-3
          whitespace-nowrap rounded-[10px] 
          px-0 py-0 text-sm text-black
          opacity-0 translate-y-0
          transition-opacity duration-150
          group-hover:opacity-100 group-hover:translate-y-0
          group-focus-visible:opacity-100 group-focus-visible:translate-y-0
        "
        role="tooltip"
        aria-hidden="true"
      >
        Ayo Main!
      </span>
    </Link>
  );
}
