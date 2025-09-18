// src/app/tarot/tarot-client.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shuffle, RotateCcw } from "lucide-react";
import TarotChat from "@/app/tarot/TarotChat";
import { TarotButtonLink } from "@/components/case/TarrotButton";

/* =========================
   TYPES
   ========================= */
type Suit = "Major" | "Wands" | "Cups" | "Swords" | "Pentacles";
type Card = {
  id: string;
  name: string;
  suit: Suit;
  index: number;
  upright: string;
  reversed: string;
  yesno?: "yes" | "no" | "mixed";
  weight?: number;
};
type DrawnCard = { card: Card; reversed: boolean };
type SpreadKind = "one" | "three" | "daily" | "yesno";

const SPREADS: Record<
  SpreadKind,
  { label: string; size: number; positions: string[] }
> = {
  one: { label: "One Card", size: 1, positions: ["Insight utama"] },
  three: {
    label: "Three Cards",
    size: 3,
    positions: ["Masa lalu", "Sekarang", "Masa depan"],
  },
  daily: { label: "Daily Card", size: 1, positions: ["Fokus hari ini"] },
  yesno: { label: "Yes / No", size: 1, positions: ["Energi jawaban"] },
};

/* =========================
   HELPERS (shuffle & seed)
   ========================= */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function hashSeed(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/* =========================
   MAIN COMPONENT
   ========================= */
export default function TarotClient({ deck }: { deck: Card[] }) {
  const [spread, setSpread] = useState<SpreadKind>("three");
  const [question, setQuestion] = useState("");
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [reveal, setReveal] = useState(false);

  const spreadDef = SPREADS[spread];

  function onDraw() {
    const seed = hashSeed(question || new Date().toISOString());
    const shuffled = seededShuffle(deck, seed);
    const picks: DrawnCard[] = shuffled.slice(0, spreadDef.size).map((card) => ({
      card,
      reversed: Math.random() < 0.45,
    }));
    setDrawn(picks);
    setReveal(true);
  }
  function onReset() {
    setDrawn([]);
    setReveal(false);
  }

  const prompt = buildPrompt(question, spread, drawn, spreadDef.positions);

  return (
    /* Background: sama dengan hero (tanpa dot) */
    <div className="relative min-h-screen text-white bg-gradient-to-b from-purple-900/0 via-indigo-900/0 to-[#0a0620]/0">
      <main className="relative mx-auto max-w-6xl px-6 py-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        {/* ===== Left column ===== */}
        <section className="space-y-6">
          {/* Panel pengaturan */}
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <h2 className="font-semibold mb-3 text-fuchsia-200">Pengaturan</h2>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="text-xs text-white/60">Spread</label>
                <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(Object.keys(SPREADS) as SpreadKind[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSpread(key)}
                      className={`gap-6 w-13 px-2 py-4 rounded-xl text-xs transition border ${
                        spread === key
                          ? "bg-fuchsia-600 text-white border-fuchsia-400"
                          : "bg-white/5 text-white/90 hover:bg-white/10 border-white/15"
                      }`}
                    >
                      {SPREADS[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-12 sm:col-span-2">
                <label className="py-8 px-8 text-xs text-white/60">Pertanyaan (opsional)</label>
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Contoh: Apa fokus terbaik untuk karierku bulan ini?"
                  className="text-xs mt-1 w-full rounded-xl border border-white/15 bg-white/10 text-white placeholder-white/50 px-8 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={onDraw}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 transition text-white"
              >
                <Shuffle className="h-4 w-4" /> Shuffle & Draw
              </button>
              <button
                onClick={onReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition text-white/90"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
          </div>

          {/* Panel hasil */}
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <h3 className="font-semibold mb-3 text-fuchsia-200">
              Spread: {spreadDef.label}
            </h3>
            {drawn.length === 0 ? (
              <div className="h-64 grid place-items-center text-white/70">
                Belum ada kartu. Klik <b>Shuffle &amp; Draw</b>.
              </div>
            ) : (
              <div
                className={`grid ${
                  spread === "three" ? "grid-cols-3" : "grid-cols-1"
                } gap-4`}
              >
                {drawn.map((dc, idx) => (
                  <CardView
                    key={dc.card.id}
                    data={dc}
                    label={`${idx + 1}. ${
                      spreadDef.positions[idx] ?? "Posisi"
                    }`}
                    reveal={reveal}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ===== Right column ===== */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <h3 className="font-semibold text-fuchsia-200">
              Prompt untuk AI (copy &amp; paste)
            </h3>
            <textarea
              value={prompt}
              readOnly
              className="mt-2 w-full h-72 rounded-xl border border-white/15 bg-black/30 text-fuchsia-100 placeholder-white/40 p-3 text-sm font-mono"
            />
          </div>

          {/* Chat dengan prompt yang sama */}
          <TarotChat prompt={prompt} />

          {/* CTA mengambang */}
          <div className="fixed bottom-6 right-6">
            <TarotButtonLink />
          </div>
        </aside>
      </main>

      {/* Fade halus ke section berikutnya (opsional) */}
      <div className="h-24 bg-gradient-to-b from-transparent to-[#0a0620]" />
    </div>
  );
}

/* =========================
   SUB-COMPONENTS
   ========================= */
function CardView({
  data,
  label,
  reveal,
}: {
  data: DrawnCard;
  label: string;
  reveal: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    setFlipped(reveal);
  }, [reveal]);

  return (
    <div className="w-full">
      <div className="mb-2 text-xs text-white/70">{label}</div>
      <motion.div
        className="relative w-full aspect-[2/3] [perspective:1000px]"
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          className="absolute inset-0 rounded-xl shadow-xl border border-white/15 bg-white/5 [transform-style:preserve-3d] overflow-hidden"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ cursor: "pointer" }}
        >
          <div className="absolute inset-0 grid place-items-center backface-hidden rounded-xl bg-white/5">
            <span className="text-white/60">Klik untuk membuka</span>
          </div>
          <div className="absolute inset-0 backface-hidden rounded-xl [transform:rotateY(180deg)] overflow-hidden">
            <Image
              src={`/tarot/${data.card.id}.jpg`}
              alt={data.card.name}
              fill
              className={`object-cover ${
                data.reversed ? "[transform:rotate(180deg)]" : ""
              }`}
            />
          </div>
        </motion.div>
      </motion.div>
      <div className="mt-2 text-sm font-medium text-fuchsia-100">
        {data.card.name}
        {data.reversed ? " (Reversed)" : ""}
      </div>
      <p className="text-xs text-white/80 mt-1">
        {data.reversed ? data.card.reversed : data.card.upright}
      </p>
    </div>
  );
}

/* =========================
   PROMPT BUILDER
   ========================= */
function buildPrompt(
  q: string,
  spread: SpreadKind,
  cards: DrawnCard[],
  positions: string[]
) {
  const cardsBlock = cards
    .map(
      (c, i) =>
        `- ${positions[i] ?? `Posisi ${i + 1}`}: ${c.card.name} (${
          c.reversed ? "reversed" : "upright"
        }) – ${c.reversed ? c.card.reversed : c.card.upright}`
    )
    .join("\n");

  const base = [
    "Anda adalah penafsir tarot profesional. Gaya bahasa hangat, jelas, dan tidak fatalistik. Sertakan disclaimer singkat bahwa bacaan bersifat hiburan/refleksi.",
    `Pertanyaan: ${q || "(tidak diisi)"}`,
    `Spread: ${SPREADS[spread].label}`,
    "Posisi kartu & hasil:",
    cardsBlock || "- (belum ada kartu)",
    "",
    "Instruksi:",
    "1) Jelaskan makna setiap kartu sesuai posisinya (maks 3 kalimat/kartu).",
    "2) Kaitkan dengan konteks pertanyaan.",
    "3) Akhiri dengan saran praktis 3 poin yang actionable.",
    "4) Jika ada kartu terbalik, jelaskan nuansa/tantangannya secara konstruktif.",
  ].join("\n");

  if (spread === "yesno" && cards[0]) {
    const c0 = cards[0];
    return [
      "Anda adalah penafsir tarot profesional. Tugas Anda memberi kecenderungan Yes/No secara nuansa.",
      `Pertanyaan: ${q || "(tidak diisi)"}`,
      `Kartu: ${c0.card.name} (${c0.reversed ? "reversed" : "upright"})`,
      "",
      "Langkah:",
      "- Nilai kecenderungan: Yes / No / Mixed, beri skor 0–100% (indikatif).",
      "- Jelaskan 2–3 alasan dari simbol/makna.",
      "- Beri saran praktis singkat (2 poin).",
    ].join("\n");
  }
  return base;
}
