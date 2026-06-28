"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

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
    const wrap = useCallback((n: number) => (n + len) % len, [len]);

    // touch swipe
    const startX = useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
    };
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
    }, [wrap]);

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
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-white/50">
          <Image
            src={images[idx].src}
            alt={images[idx].alt}
            fill
            sizes="(min-width: 1024px) 960px, 100vw"
            priority={idx === 0}
            className="object-cover"
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
        <div className="pointer-events-auto absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
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
    <section className="bg-transparent py-20">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-brand-brown">
          Mini Project
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-neutral-600">
          Showcasing clean, usable, and scalable design work from research to
          polished handoff.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12">
        {/* Card kiri */}
        <div className="md:col-span-6 lg:col-span-7">
          <div className="w-full overflow-hidden rounded-[18px] border border-neutral-200 bg-white/90 p-6 shadow-lg md:p-8">
            {/* slider */}
            <ImageSlider
              images={[
                {
                  src: "/porto-eryca/po3.jpg",
                  alt: "tutorial deploy portfolio",
                },
                { src: "/porto-eryca/wihara-mini.jpg", alt: "wihara" },
                { src: "/porto-eryca/fajar1.jpg", alt: "Toko-Bunga-Fajar" },
                { src: "/porto-eryca/min.jpg", alt: "Education module UI" },
                { src: "/porto-eryca/un.jpg", alt: "UntarX system overview" },
              ]}
            />
          </div>
        </div>

        {/* Konten kanan */}
        <div className="md:col-span-6 lg:col-span-5">
          <h3 className="font-serif text-3xl md:text-4xl leading-tight text-brand-brown">
            Handoff in one flow
          </h3>
          <p className="mt-4 leading-relaxed text-neutral-700">
            From wireframes to production ready, help teams move smoothly from
            concept to implementation.
          </p>

          {/* Primary button */}
         <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=eryca847@gmail.com&su=Open%20to%20Creative%20Collaboration&body=Halo%20Eryca%2C%20🖐🏻%0A%0ASaya%20tertarik%20untuk%20berkolaborasi%20denganmu%20dalam%20proyek%20kreatif.%20Berikut%20sedikit%20tentang%20ide%20atau%20kolaborasi%20yang%20saya%20bayangkan%3A%0A%0A%5Bisi%20pesan%20di%20sini%5D%0A%0ATerima%20kasih!"
  target="_blank" rel="noreferrer"
  className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-white
             bg-gradient-to-r from-[#9f663c] via-[#8f623e] to-[#6e482c]
             shadow-md hover:shadow-lg hover:from-[#b97a4d] hover:to-[#5a3b25]
             transition-all duration-200
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8f623e]/40"
>
  Open to Collaboration
</a>

        </div>
      </div>
    </section>
  );
}
