// src/app/tarot/page.tsx
import NavbarTarot from "@/components/tarot/NavbarTarot";
import HeroTarot from "@/components/tarot/HeroTarot";
import TarotClient from "./tarot-client";
import deckRaw from "@/data/tarot/deck.json";

export const dynamic = "force-static";

type Card = {
  id: string;
  name: string;
  suit: "Major" | "Wands" | "Cups" | "Swords" | "Pentacles";
  index: number;
  upright: string;
  reversed: string;
  yesno?: "yes" | "no" | "mixed";
  weight?: number;
  image: string; 
};

function isCardArray(x: unknown): x is Card[] {
  return (
    Array.isArray(x) &&
    x.every(
      (c) =>
        typeof c.id === "string" &&
        typeof c.name === "string" &&
        typeof c.suit === "string" &&
        typeof c.index === "number" &&
        typeof c.upright === "string" &&
        typeof c.reversed === "string" &&
        typeof c.image === "string" 
    )
  );
}

if (!isCardArray(deckRaw)) {
  throw new Error("Invalid deck.json");
}
const deck: Card[] = deckRaw;

const heroCards = deck.slice(0, 3).map((c) => c.image);

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-purple-900 via-indigo-900 to-[#0a0620] text-white min-h-screen">
      <NavbarTarot />

      {/* Hero transparan biar nyambung */}
      <HeroTarot cards={heroCards} />

      {/* Konten utama: tetap gelap/ungu (full) */}
      <section id="tarot" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <TarotClient deck={deck} />
        </div>
      </section>
    </div>
  );
}
