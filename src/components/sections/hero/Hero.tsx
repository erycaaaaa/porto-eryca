"use client";
import React, { useState } from "react";
import AnimatedSketch from "@/components/ui/AnimatedSketch";
import InteractiveCanvas from "@/components/ui/InteractiveCanvas";
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
  const [activeTab, setActiveTab] = useState<"sketch" | "draw">("sketch");

  return (
    <main
      id="home"
      className={`
        relative isolate min-h-svh
        bg-[url('/porto-eryca/bg12.png')] bg-center bg-cover bg-fixed
        grid place-items-center
        text-center px-5
        pt-16 pb-10
      `}
    >
      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center">

        {/* TAB SWITCHER */}
        <div className="flex bg-white/70 backdrop-blur-md p-1 rounded-full shadow-sm ring-1 ring-black/5 mb-4">
          <button
            onClick={() => setActiveTab("sketch")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${activeTab === "sketch" ? "bg-white shadow-sm text-amber-800" : "text-neutral-500 hover:text-neutral-800"
              }`}
          >
            My Sketch
          </button>
          <button
            onClick={() => setActiveTab("draw")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${activeTab === "draw" ? "bg-white shadow-sm text-amber-800" : "text-neutral-500 hover:text-neutral-800"
              }`}
          >
            Your Turn!
          </button>
        </div>

        {/* MEDIA DISPLAY */}
        <div className="w-40 md:w-48 h-auto mb-4">
          {activeTab === "sketch" ? (
            <div className="shadow-lg rounded-2xl overflow-hidden ring-1 ring-black/5 bg-white">
              <AnimatedSketch />
            </div>
          ) : (
            <InteractiveCanvas />
          )}
        </div>

        <p className="text-sm tracking-widest opacity-80 mt-2">Portfolio 2026</p>
        <h1 className={`${playfair.className} opacity-60 mt-1 text-4xl font-bold md:text-6xl`}>
          {name}
        </h1>
        <p className="mt-4 mx-auto max-w-xl opacity-90">
          {subtitle}
        </p>
      </div>
      {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f5f4ef] to-transparent" /> */}
    </main>
  );
}
