"use client";

import { motion, easeInOut } from "framer-motion";
import Image from "next/image";

export default function HeroTarot({
  title = "Whispers of the Cards",
  subtitle = "Di balik setiap gambar, terdapat kisah hening tentang keberanian, cinta, dan kebijaksanaan untuk ditafsirkan.",
  cards = [
    "/porto-eryca/the-fool.jpg",
    "/porto-eryca/the-lovers.jpg",
    "/porto-eryca/queen-of-swords.jpg",
  ],
}: {
  title?: string;
  subtitle?: string;
  cards?: string[];
}) {
  const float = (i: number) => ({
    y: [0, -20, 0],
    rotate: [0, i % 2 === 0 ? 6 : -6, 0],
    transition: { duration: 4 + i, repeat: Infinity, ease: easeInOut },
  });

  return (
    // pakai section supaya tidak nested <main>
    <section className="relative min-h-screen overflow-x-hidden text-white">
      {/* BG: foto + slight darkening so text pops */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-center bg-cover md:bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(10,6,32,0.35), rgba(10,6,32,0.75)), url('/porto-eryca/bg13.png')",
        }}
      />

      <header className="relative h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* overlay gradients (TRANSPARAN) agar foto tetap terlihat */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-indigo-900/50 to-[#0a0620]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_70%)]" />

        <div className="relative z-10 px-6">
          <h1 className="font-serif text-5xl sm:text-6xl mb-4">{title}</h1>
          <p className="max-w-xl mx-auto text-lg text-purple-100/90">
            {subtitle}
          </p>

          <div className="mt-10 flex justify-center gap-6">
            {cards.slice(0, 3).map((src, i) => (
              <motion.div
                key={src}
                animate={float(i)}
                className={`relative w-32 h-52 sm:w-40 sm:h-64 rounded-xl shadow-xl overflow-hidden ${
                  i === 1 ? "scale-105" : "opacity-90"
                }`}
              >
                <Image
                  src={src}
                  alt={`card-${i}`}
                  fill
                  className="object-cover"
                  priority={i === 1}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(0,0,0,0.35),transparent_60%)]" />
      </header>
    </section>
  );
}
