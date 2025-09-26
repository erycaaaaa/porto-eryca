"use client";
import React from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type HeroProps = {
  name: string;
  subtitle: string;
};

export default function Hero({ name, subtitle }: HeroProps) {
  return (
    <main
      id="home"
      className={`
        relative isolate min-h-svh
        bg-[url('/porto-eryca/bg11.png')] bg-center bg-cover bg-fixed
        grid place-items-center
        text-center px-5
      `}
    >
      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-3xl -translate-y-[2cm]">
        <p className="text-sm tracking-widest opacity-80">Portfolio 2025</p>
        <h1 className={`${playfair.className} opacity-60 mt-1 text-4xl font-bold md:text-6xl`}>
          {name}
        </h1>
        <p className="mt-4 mx-auto max-w-xl opacity-90">
          {subtitle}
        </p>
      </div>

      {/* GRADIENT OVERLAY KE BAGIAN BAWAH */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f5f4ef] to-transparent" />
    </main>
  );
}
