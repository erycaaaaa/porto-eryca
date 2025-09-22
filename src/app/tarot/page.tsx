// src/app/tarot/page.tsx  (SERVER)
import NavbarTarot from "@/components/tarot/NavbarTarot";
import HeroTarot from "@/components/tarot/HeroTarot";
import TarotClient, { Card } from "@/app/tarot/tarot-client";
import deck from "@/data/tarot/deck.json" assert { type: "json" };

export const dynamic = "force-static";

export default function Page() {
  const typed = deck as Card[];               
  const heroCards = typed.slice(0, 3).map(c => c.image);

  return (
    <div className="bg-gradient-to-b from-purple-900 via-indigo-900 to-[#0a0620] text-white min-h-screen">
      <NavbarTarot />
      <HeroTarot cards={heroCards} />
      <section id="tarot" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <TarotClient deck={typed} />
        </div>
      </section>
    </div>
  );
}
