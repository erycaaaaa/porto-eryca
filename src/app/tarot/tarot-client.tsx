"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shuffle, RotateCcw } from "lucide-react";
import TarotChat from "./TarotChat"; // ← pakai chat di sini

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

const SPREADS: Record<SpreadKind, { label: string; size: number; positions: string[] }> = {
  one:   { label: "One Card",    size: 1, positions: ["Insight utama"] },
  three: { label: "Three Cards", size: 3, positions: ["Masa lalu", "Sekarang", "Masa depan"] },
  daily: { label: "Daily Card",  size: 1, positions: ["Fokus hari ini"] },
  yesno: { label: "Yes / No",    size: 1, positions: ["Energi jawaban"] },
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6D2B79F5);
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
    <div className="min-h-screen text-black bg-gradient-to-b from-neutral-50 via-white to-neutral-100 relative">
      <main className="mx-auto max-w-6xl px-6 py-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <section className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-4 shadow-sm">
            <h2 className="font-semibold mb-3">Pengaturan</h2>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="text-xs text-neutral-500">Spread</label>
                <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(Object.keys(SPREADS) as SpreadKind[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSpread(key)}
                      className={`px-3 py-2 rounded-xl border text-sm hover:bg-neutral-100 transition ${
                        spread === key ? "border-neutral-900" : "border-neutral-200"
                      }`}
                    >
                      {SPREADS[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-neutral-500">Pertanyaan (opsional)</label>
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Contoh: Apa fokus terbaik untuk karierku bulan ini?"
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white/80"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={onDraw}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-900 transition"
              >
                <Shuffle className="h-4 w-4" /> Shuffle & Draw
              </button>
              <button
                onClick={onReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 transition"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-4 shadow-sm">
            <h3 className="font-semibold mb-3">Spread: {spreadDef.label}</h3>
            {drawn.length === 0 ? (
              <div className="h-64 grid place-items-center text-neutral-500">
                Belum ada kartu. Klik <b>Shuffle &amp; Draw</b>.
              </div>
            ) : (
              <div className={`grid ${spread === "three" ? "grid-cols-3" : "grid-cols-1"} gap-4`}>
                {drawn.map((dc, idx) => (
                  <CardView key={dc.card.id} data={dc} label={`${idx + 1}. ${spreadDef.positions[idx] ?? "Posisi"}`} reveal={reveal} />
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-4 shadow-sm">
            <h3 className="font-semibold">Prompt untuk AI (copy &amp; paste)</h3>
            <textarea value={prompt} readOnly className="mt-2 w-full h-72 rounded-xl border border-neutral-300 p-3 text-sm font-mono bg-neutral-50" />
          </div>

          {/* Chat pakai prompt yang sama */}
          <TarotChat prompt={prompt} />
        </aside>
      </main>
    </div>
  );
}

function CardView({ data, label, reveal }: { data: DrawnCard; label: string; reveal: boolean }) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { setFlipped(reveal); }, [reveal]);

  return (
    <div className="w-full">
      <div className="mb-2 text-xs text-neutral-500">{label}</div>
      <motion.div className="relative w-full aspect-[2/3] [perspective:1000px]" onClick={() => setFlipped((f) => !f)}>
        <motion.div
          className="absolute inset-0 rounded-xl shadow-md border border-neutral-200 bg-white [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ cursor: "pointer" }}
        >
          <div className="absolute inset-0 grid place-items-center backface-hidden rounded-xl bg-neutral-100">
            <span className="text-neutral-400">Klik untuk membuka</span>
          </div>
          <div className="absolute inset-0 backface-hidden rounded-xl [transform:rotateY(180deg)] overflow-hidden">
            <Image
              src={`/tarot/${data.card.id}.jpg`}
              alt={data.card.name}
              fill
              className={`object-cover ${data.reversed ? "[transform:rotate(180deg)]" : ""}`}
            />
          </div>
        </motion.div>
      </motion.div>
      <div className="mt-2 text-sm font-medium">
        {data.card.name}{data.reversed ? " (Reversed)" : ""}
      </div>
      <p className="text-xs text-neutral-600 mt-1">
        {data.reversed ? data.card.reversed : data.card.upright}
      </p>
    </div>
  );
}

function buildPrompt(q: string, spread: SpreadKind, cards: DrawnCard[], positions: string[]) {
  const cardsBlock = cards
    .map((c, i) => `- ${positions[i] ?? `Posisi ${i + 1}`}: ${c.card.name} (${c.reversed ? "reversed" : "upright"}) – ${c.reversed ? c.card.reversed : c.card.upright}`)
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
