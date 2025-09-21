"use client";
import React from "react";

type HeroProps = {
  name: string;
  subtitle: string;
};

export default function Hero({ name, subtitle }: HeroProps) {
  return (
    <section id="home" className="relative isolate">
      {/* BACKGROUND */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
     <img
        src="/porto-eryca/bg-baru.png"
        alt=""
        aria-hidden="true"
        loading="eager"
        className={[
          "absolute inset-0 -z-10 w-full",
          "h-[65vh] sm:h-[70vh] md:h-[72vh] lg:h-[80vh]",
          "object-contain sm:object-cover object-center",
          "sm:object-[50%_40%] md:object-[50%_30%]",
          "transition-transform duration-300 ease-out will-change-transform",
          "pointer-events-none select-none"
        ].join(" ")}
      />

      {/* CONTENT */}
      <div className="relative mx-auto flex min-h-[50vh] sm:min-h-[60vh] md:min-h-[72vh] lg:min-h-[80vh] max-w-7xl flex-col items-center justify-center px-5 text-center">
        <h1 className="mt-2 font-serif leading-tight tracking-tight text-5xl">
          {name}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-black/60 text-lg">
          {subtitle}
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-6 rounded-t-[1.25rem] bg-[#f5f4ef]" />
    </section>
  );
}
