import TarotClient from "./tarot-client";
import deckData from "@/data/tarot/deck.json"; // ← pastikan path ini benar

// tipe minimal agar TypeScript happy (optional, bisa hapus kalau sudah punya global types)
type Card = {
  id: string;
  name: string;
  suit: "Major" | "Wands" | "Cups" | "Swords" | "Pentacles";
  index: number;
  upright: string;
  reversed: string;
  yesno?: "yes" | "no" | "mixed";
  weight?: number;
};

export default function Page() {
  const deck = deckData as Card[];
  return <TarotClient deck={deck} />;
}
