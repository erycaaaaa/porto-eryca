// src/app/tarot/page.tsx
import NavbarTarot from "@/components/tarot/NavbarTarot";
import HeroTarot from "@/components/tarot/HeroTarot";
import TarotClient, { Card } from "./tarot-client";
import { promises as fs } from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

/* =========================
   Type guards (tanpa any)
   ========================= */
const SUITS = new Set<Card["suit"]>(["Major", "Wands", "Cups", "Swords", "Pentacles"]);

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}
function isCard(x: unknown): x is Card {
  if (!isRecord(x)) return false;
  return (
    typeof x.id === "string" &&
    typeof x.name === "string" &&
    typeof x.suit === "string" &&
    SUITS.has(x.suit as Card["suit"]) &&
    typeof x.index === "number" &&
    typeof x.upright === "string" &&
    typeof x.reversed === "string" &&
    typeof x.image === "string"
  );
}
function isCardArray(data: unknown): data is Card[] {
  return Array.isArray(data) && data.every(isCard);
}

/* =========================
   Loader dari filesystem (public/)
   ========================= */
async function getDeck(): Promise<Card[]> {
  const filePath = path.join(process.cwd(), "public", "tarot", "deck.json");
  const file = await fs.readFile(filePath, "utf-8");
  const data: unknown = JSON.parse(file);

  if (!isCardArray(data)) {
    throw new Error("Invalid deck.json shape");
  }
  return data;
}

/* =========================
   Page
   ========================= */
export default async function Page() {
  const deck = await getDeck();

  // Jika deploy dengan basePath (mis. GitHub Pages), prefix gambar dari env publik
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const heroCards = deck.slice(0, 3).map((c) => `${base}${c.image}`);

  return (
    <div className="bg-gradient-to-b from-purple-900 via-indigo-900 to-[#0a0620] text-white min-h-screen">
      <NavbarTarot />
      <HeroTarot cards={heroCards} />
      <section id="tarot" className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <TarotClient deck={deck} />
        </div>
      </section>
    </div>
  );
}
