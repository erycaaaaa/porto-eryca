"use client";
import React from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // pilih yang kamu pakai
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
        relative isolate min-h-screen 
        bg-[url('/porto-eryca/bg11.png')] bg-center bg-cover bg-fixed
        flex flex-col items-center justify-center
        text-center px-5
      `}
    >
      {/* CONTENT */}
      <div className="relative max-w-7xl">
        <h1
          className={`${playfair.className} mt-2 leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl text-black/70 drop-shadow-md`}
        >
          {name}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-black/60 text-base sm:text-lg">
          {subtitle}
        </p>
      </div>

      {/* GRADIENT OVERLAY KE BAGIAN BAWAH */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f5f4ef] to-transparent" />
    </main>
  );
}
