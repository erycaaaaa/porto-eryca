// src/app/tarot/page.tsx
import NavbarTarot from "@/components/tarot/NavbarTarot";
import HeroTarot from "@/components/tarot/HeroTarot";
import TarotClient, { Card } from "./tarot-client";
import deck from "@/data/tarot/deck.json" assert { type: "json" };

export const dynamic = "force-static";

export default function Page() {
  const typed = deck as Card[];

  // ambil 3 gambar pertama untuk hero (dinormalisasi ke path /public)
  const heroCards = typed.slice(0, 3).map((c) => normalizeSrc(c.image));

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      {/* Background + overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-center bg-cover md:bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(76,29,149,0.88), rgba(49,46,129,0.86), rgba(10,6,32,0.95)), url('/porto-eryca/bg13.png')",
        }}
      />

      <NavbarTarot />
      <HeroTarot cards={heroCards} />

      <section id="tarot" className="py-16 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6">
          <TarotClient deck={typed} />
        </div>
      </section>
    </main>
  );
}

function normalizeSrc(raw: string) {
  const s = (raw ?? "").trim();
  return s.startsWith("/") || s.startsWith("http") ? s : `/${s}`;
}
