
"use client";
import { useState, useRef, useEffect } from "react";

export default function Approach() {
  /** ---------- Accessible Image Slider ---------- **/
  function ImageSlider({
    images,
    title = "Project preview",
  }: {
    images: { src: string; alt: string }[];
    title?: string;
  }) {
    const [idx, setIdx] = useState(0);
    const len = images.length;
    const wrap = (n: number) => (n + len) % len;

    // touch swipe
    const startX = useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) =>
      (startX.current = e.touches[0].clientX);
    const onTouchEnd = (e: React.TouchEvent) => {
      if (startX.current == null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > 40) setIdx((i) => wrap(i + (dx < 0 ? 1 : -1)));
      startX.current = null;
    };

    // keyboard arrows
    const boxRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      const box = boxRef.current;
      if (!box) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") setIdx((i) => wrap(i + 1));
        if (e.key === "ArrowLeft") setIdx((i) => wrap(i - 1));
      };
      box.addEventListener("keydown", onKey);
      return () => box.removeEventListener("keydown", onKey);
    }, [len]);

    return (
      <div
        ref={boxRef}
        tabIndex={0}
        className="relative focus:outline-none"
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
        aria-live="polite"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-50">
          <img
            src={images[idx].src}
            alt={images[idx].alt}
            className="absolute inset-0 h-full w-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Prev */}
        <button
          type="button"
          onClick={() => setIdx((i) => wrap(i - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 px-4 py-2 shadow ring-1 ring-black/10 hover:bg-neutral-50"
          aria-label="Previous slide"
        >
          ‹
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={() => setIdx((i) => wrap(i + 1))}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 px-4 py-2 shadow ring-1 ring-black/10 hover:bg-neutral-50"
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Dots */}
        <div className="pointer-events-auto absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === idx}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-6 bg-neutral-900" : "w-2 bg-neutral-400/70"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  /** ---------- Section ---------- **/
  return (
    <section className="bg-brand-cream py-20">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-brand-brown">
          Project UI/UX
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-neutral-600">
          Showcasing clean, usable, and scalable design work — from research to
          polished handoff.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12">
        {/* Card kiri */}
        <div className="md:col-span-6 lg:col-span-7">
          <div className="w-full overflow-hidden rounded-[28px] border border-neutral-200 bg-white p-6 shadow-lg md:p-8">
            {/* slider */}
            <ImageSlider
              images={[
                { src: "/assets/un.jpg", alt: "UntarX system overview" },
                { src: "/assets/ed.jpg", alt: "Education module UI" },
                { src: "/assets/to.jpg", alt: "Tokens & design system" },
                { src: "/assets/wi.jpg", alt: "UntarX system overview" },
                { src: "/assets/min.jpg", alt: "Education module UI" },
                { src: "/assets/bu.jpg", alt: "Tokens & design system" },
              ]}
            />

            {/* highlights */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold text-brand-brown">
                  Design System
                </p>
                <p className="text-[11px] text-neutral-500">
                  Tokens & components
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold text-brand-brown">
                  Prototype
                </p>
                <p className="text-[11px] text-neutral-500">Clickable flows</p>
              </div>
            </div>
          </div>
        </div>

        {/* Konten kanan */}
        <div className="md:col-span-6 lg:col-span-5">
          <h3 className="font-serif text-3xl md:text-4xl leading-tight text-brand-brown">
            Design + handoff in one flow
          </h3>
          <p className="mt-4 leading-relaxed text-neutral-700">
            From journey maps and wireframes to production-ready specs...
          </p>

          {/* Primary button pakai brand brown */}
          <a
            href="#contact"
            className="mt-6 inline-flex rounded-full px-6 py-2.5 text-sm font-medium text-white 
             bg-gradient-to-r from-[#a66b3f] via-[#8f623e] to-[#6e482c]
             shadow-md hover:shadow-lg hover:from-[#b97a4d] hover:to-[#5a3b25]
             transition-all duration-200"
          >
            Get started
          </a>

          <ul
            className="mt-3 ml-[-13]
           space-y-1
           text-sm text-neutral-700"
          >
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent-green" />
              1–2 rounds of quick user validation
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent-green" />
              Design files tidy & documented
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent-green" />
              Optional front-end pairing (React/Next.js)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
