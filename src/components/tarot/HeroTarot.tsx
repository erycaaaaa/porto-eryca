"use client";

import { motion, easeInOut } from "framer-motion";
import Image from "next/image";

export default function HeroTarot({
title = "Whispers of the Cards",
subtitle = "Di balik setiap gambar, terdapat kisah hening tentang keberanian, cinta, dan kebijaksanaan untuk ditafsirkan.",
cards = ["porto-eryca/tarot/the-fool.jpg", "porto-eryca/tarot/the-lovers.jpg", "porto-eryca/tarot/queen-of-swords.jpg"],
}: {
  title?: string;
  subtitle?: string;
  cards?: string[];
}) {
  const float = (i: number) => ({
    y: [0, -20, 0],
    rotate: [0, i % 2 === 0 ? 6 : -6, 0],
    transition: {
      duration: 4 + i,
      repeat: Infinity,
      ease: easeInOut, 
    },
  });

  return (
    <header className="relative h-[90vh] flex flex-col justify-center items-center text-center text-white overflow-hidden bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_70%)]" />
      <div className="relative z-10 px-6">
        <h1 className="font-serif text-5xl sm:text-6xl mb-4">{title}</h1>
        <p className="max-w-xl mx-auto text-lg text-purple-200">{subtitle}</p>
        <div className="mt-10 flex justify-center gap-6">
          {cards.slice(0, 3).map((src, i) => (
            <motion.div
              key={src}
              animate={float(i)}
              className={`relative w-32 h-52 sm:w-40 sm:h-64 rounded-xl shadow-xl overflow-hidden ${i === 1 ? "scale-105" : "opacity-90"}`}
            >
              <Image src={src} alt={`card-${i}`} fill className="object-cover" priority={i === 1} />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(0,0,0,0.35),transparent_60%)]" />
    </header>
  );
}
