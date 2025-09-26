// src/app/tarot/tarot-client.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shuffle, RotateCcw } from "lucide-react";
import TarotChat from "@/app/tarot/TarotChat";
import { TarotButtonLink } from "@/components/case/TarrotButton"; // biarkan sesuai nama file-mu
import { prefix } from "@/utils/prefix";

/* =========================
   Types
   ========================= */
type Suit = "Major" | "Wands" | "Cups" | "Swords" | "Pentacles";
export type Card = {
  id: string;
  name: string;
  suit: Suit;
  index: number;
  upright: string;
  reversed: string;
  image: string;
  yesno?: "yes" | "no" | "mixed";
  weight?: number;
  keywords?: string[];
  goodFor?: string[];
  cautions?: string[];
  luckyColors?: string[];
  luckyTip?: string;
};
type DrawnCard = { card: Card; reversed: boolean };
type SpreadKind = "one" | "three" | "daily" | "yesno";

/* =========================
   Konstanta
   ========================= */
const FALLBACK_CARD = prefix("/porto-eryca/card-fallback.png");
// ↑ BUAT file ini di public/porto-eryca/card-fallback.png (apa saja).

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
   RNG deterministik
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
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/* =========================
   Meta tambahan (opsional)
   ========================= */
const META: Record<
  string,
  {
    keywords?: string[];
    goodFor?: string[];
    cautions?: string[];
    luckyColors?: string[];
    luckyTip?: string;
  }
> = {
  "the-fool": {
    keywords: [
      "Awal baru",
      "Spontanitas",
      "Kepolosan",
      "Petualangan",
      "Kebebasan",
    ],
    goodFor: [
      "Memulai proyek baru",
      "Mengambil peluang segar",
      "Mengikuti intuisi",
    ],
    cautions: ["Terlalu gegabah", "Kurang perencanaan", "Risiko berlebihan"],
    luckyColors: ["Putih", "Biru muda"],
    luckyTip: "Coba hal baru, tapi tetap berpijak pada rencana minimal.",
  },
};

/* =========================
   Utils path gambar (support basePath)
   ========================= */
function resolveCardImagePath(raw: string | undefined) {
  const v = (raw ?? "").trim();
  if (!v) return FALLBACK_CARD;
  if (/^https?:\/\//i.test(v)) return v;
  const withSlash = v.startsWith("/") ? v : `/${v}`;
  return prefix(withSlash);
}

/* =========================
   Komponen utama
   ========================= */
export default function TarotClient({ deck }: { deck: Card[] }) {
  const [spread, setSpread] = useState<SpreadKind>("three");
  const [question, setQuestion] = useState("");
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [reveal, setReveal] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const spreadDef = SPREADS[spread];

  function onDraw() {
    const seedBase =
      (question.trim().toLowerCase() || new Date().toISOString()) +
      "|" +
      spread;
    const seed = hashSeed(seedBase);
    const shuffled = seededShuffle(deck, seed);
    const rng = mulberry32(seed ^ 0x9e3779b9);

    const picks: DrawnCard[] = shuffled
      .slice(0, spreadDef.size)
      .map((card) => ({
        card,
        reversed: rng() < 0.45,
      }));

    setDrawn(picks);
    setActiveIdx(0);
    setReveal(true);
  }

  function onReset() {
    setDrawn([]);
    setActiveIdx(0);
    setReveal(false);
  }

  const prompt = useMemo(
    () => buildPrompt(question, spread, drawn, spreadDef.positions),
    [question, spread, drawn, spreadDef.positions]
  );

  const active = drawn[activeIdx];

  return (
    <div className="relative min-h-screen text-neutral-900 bg-neutral-50">
      <main className="relative mx-auto max-w-6xl px-6 py-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-8">
        {/* Kiri: kontrol + grid */}
        <section className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h2 className="font-semibold mb-3">Pengaturan</h2>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="text-xs text-neutral-500">Spread</label>
                <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(Object.keys(SPREADS) as SpreadKind[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSpread(key)}
                      className={`px-2 py-2 rounded-xl text-xs transition border ${
                        spread === key
                          ? "bg-violet-600 text-white border-violet-600"
                          : "bg-white text-neutral-900 hover:bg-neutral-50 border-neutral-200"
                      }`}
                      aria-pressed={spread === key}
                    >
                      {SPREADS[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-8 sm:col-span-2">
                <label htmlFor="q" className="text-s text-neutral-500">
                  Pertanyaan (opsional)
                </label>
                <input
                  id="q"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Contoh: Apa fokus terbaik untuk karierku bulan ini?"
                  className="text-xs mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onDraw}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition text-white"
              >
                <Shuffle className="h-4 w-4" /> Shuffle & Draw
              </button>
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h3 className="font-semibold mb-3">Spread: {spreadDef.label}</h3>

            {drawn.length === 0 ? (
              <div className="h-64 grid place-items-center text-neutral-500">
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
                    active={idx === activeIdx}
                    onSelect={() => setActiveIdx(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Kanan: detail + prompt + chat */}
        <aside className="space-y-4">
          <CardInsights selected={active} />

          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h3 className="font-semibold">
              Prompt untuk AI (copy &amp; paste)
            </h3>
            <textarea
              value={prompt}
              readOnly
              className="mt-2 w-full h-64 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm font-mono"
            />
          </div>

          <TarotChat prompt={prompt} />

          <div className="fixed bottom-6 right-6">
            <TarotButtonLink />
          </div>
        </aside>
      </main>
    </div>
  );
}

/* =========================
   Item kartu (flip)
   ========================= */
function CardView({
  data,
  label,
  reveal,
  active,
  onSelect,
}: {
  data: DrawnCard;
  label: string;
  reveal: boolean;
  active: boolean;
  onSelect: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => setFlipped(reveal), [reveal]);

  // Normalisasi + prefix + fallback
  const initialSrc = resolveCardImagePath(String(data.card.image || ""));
  const [imgSrc, setImgSrc] = useState(initialSrc);

  useEffect(() => {
    setImgSrc(resolveCardImagePath(String(data.card.image || "")));
  }, [data.card.image]);

  return (
    <div className="w-full">
      <div className="mb-2 text-xs text-neutral-500">{label}</div>

      <motion.button
        type="button"
        className={`relative w-full aspect-[2/3] rounded-xl ring-offset-2 ${
          active ? "ring-2 ring-violet-400" : "ring-0"
        }`}
        onClick={() => {
          setFlipped((f) => !f);
          onSelect();
        }}
      >
        <div
          className="relative h-full w-full"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            className="absolute inset-0 rounded-xl shadow-md border border-neutral-200 bg-white overflow-hidden"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d", cursor: "pointer" }}
          >
            {/* FRONT (tertutup) */}
            <div
              className="absolute inset-0 grid place-items-center rounded-xl bg-neutral-100"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="text-neutral-500">Klik untuk membuka</span>
            </div>

            {/* BACK (gambar) */}
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={imgSrc}
                alt={data.card.name}
                fill
                unoptimized
                className={`object-cover ${
                  data.reversed ? "[transform:rotate(180deg)]" : ""
                }`}
                sizes="(max-width: 768px) 100vw, 33vw"
                onError={() => {
                  if (imgSrc !== FALLBACK_CARD) {
                    setImgSrc(FALLBACK_CARD);
                  }
     
                  if (process.env.NODE_ENV !== "production") {
                    console.warn("Gagal load image:", imgSrc);
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.button>

      <div className="mt-2 text-sm font-medium">
        {data.card.name}
        {data.reversed ? " (Reversed)" : ""}
      </div>
      <p className="text-xs text-neutral-600 mt-1 line-clamp-3">
        {data.reversed ? data.card.reversed : data.card.upright}
      </p>
    </div>
  );
}

/* =========================
   Panel kanan
   ========================= */
function CardInsights({ selected }: { selected?: DrawnCard }) {
  if (!selected) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-500">
        Pilih sebuah kartu untuk melihat detail.
      </div>
    );
  }
  const { card, reversed } = selected;
  const meta = META[card.id] ?? {};

  const keywords =
    card.keywords ?? meta.keywords ?? guessKeywords(card, reversed);
  const goodFor = card.goodFor ?? meta.goodFor ?? guessGoodFor(card);
  const cautions = card.cautions ?? meta.cautions ?? guessCautions(card);
  const luckyColors =
    card.luckyColors ?? meta.luckyColors ?? guessLuckyColors(card);
  const luckyTip = card.luckyTip ?? meta.luckyTip ?? guessLuckyTip(card);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
            reversed
              ? "bg-rose-100 text-rose-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              reversed ? "bg-rose-500" : "bg-emerald-500"
            }`}
          />
          {reversed ? "Reversed" : "Upright"}
        </span>
        <h2 className="ml-2 font-semibold">{card.name}</h2>
      </div>

      <Section title="Keywords">
        <div className="flex flex-wrap gap-2">
          {keywords.map((k) => (
            <span
              key={k}
              className="inline-block rounded-full bg-violet-100 text-violet-800 text-xs px-3 py-1"
            >
              {k}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Daily Fortune Reading">
        <p className="text-sm text-neutral-700 leading-relaxed">
          {reversed ? card.reversed : card.upright}
        </p>
      </Section>

      <Section title="Today's Action Guide">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <h4 className="font-medium mb-2">Good For</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
              {goodFor.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <h4 className="font-medium mb-2">Cautions</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-700">
              {cautions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <div className="grid sm:grid-cols-2 gap-4 mt-2">
        <Section title="Lucky Colors">
          <div className="flex flex-wrap gap-2">
            {luckyColors.map((c) => (
              <span
                key={c}
                className="inline-block rounded-full bg-neutral-100 text-neutral-800 text-xs px-3 py-1"
              >
                {c}
              </span>
            ))}
          </div>
        </Section>
        <Section title="Lucky Tip">
          <p className="text-sm text-neutral-700 leading-relaxed">{luckyTip}</p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-4 w-1.5 rounded-full bg-violet-400" />
        <h3 className="text-[15px] font-semibold">{title}</h3>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        {children}
      </div>
    </div>
  );
}

/* =========================
   Prompt builder & heuristik
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

function guessKeywords(card: Card, reversed: boolean): string[] {
  const base: string[] = [];
  if (card.suit === "Pentacles")
    base.push("Material", "Practicality", "Grounding");
  if (card.suit === "Cups") base.push("Emotion", "Intuition");
  if (card.suit === "Swords") base.push("Mind", "Clarity");
  if (card.suit === "Wands") base.push("Action", "Passion");
  if (card.suit === "Major") base.push("Archetype", "Life Lesson");
  if (reversed) base.push("Block", "Reassessment");
  return Array.from(new Set(base)).slice(0, 5);
}
function guessGoodFor(card: Card): string[] {
  if (card.suit === "Pentacles")
    return [
      "Menyusun anggaran",
      "Merapikan aset/ruang kerja",
      "Rencana finansial",
      "Rutinitas stabil",
    ];
  if (card.suit === "Wands")
    return ["Memulai proyek", "Eksperimen ide", "Networking", "Gerak cepat"];
  if (card.suit === "Cups")
    return [
      "Refleksi perasaan",
      "Quality time",
      "Empati",
      "Kreativitas lembut",
    ];
  if (card.suit === "Swords")
    return [
      "Riset & analisis",
      "Komunikasi tegas",
      "Keputusan rasional",
      "Belajar fokus",
    ];
  return ["Refleksi diri", "Menetapkan niat", "Mencari makna", "Mindfulness"];
}
function guessCautions(card: Card): string[] {
  if (card.suit === "Pentacles")
    return ["Materialistis", "Defensif", "Perfeksionisme", "Takut perubahan"];
  if (card.suit === "Wands")
    return ["Impulsif", "Burnout", "Overcommit", "Tergesa-gesa"];
  if (card.suit === "Cups")
    return ["Baper berlebihan", "Melarikan diri", "Idealistik"];
  if (card.suit === "Swords") return ["Overthinking", "Kritik tajam", "Kaku"];
  return ["Dogmatis", "Kontrol berlebihan", "Mengabaikan intuisi"];
}
function guessLuckyColors(card: Card): string[] {
  switch (card.suit) {
    case "Pentacles":
      return ["Brown", "Gold", "Olive"];
    case "Cups":
      return ["Aqua", "Silver", "Pearl"];
    case "Wands":
      return ["Crimson", "Amber", "Copper"];
    case "Swords":
      return ["Blue", "Steel", "White"];
    default:
      return ["Purple", "Indigo", "White"];
  }
}
function guessLuckyTip(card: Card): string {
  switch (card.suit) {
    case "Pentacles":
      return "Sisihkan dana kecil untuk keamanan; fokus ke kebiasaan stabil.";
    case "Cups":
      return "Tulis jurnal syukur dan validasi perasaanmu hari ini.";
    case "Wands":
      return "Ambil satu langkah nyata pada ide yang tertunda.";
    case "Swords":
      return "Sederhanakan keputusan: buat 3 poin pro/kontra lalu eksekusi.";
    default:
      return "Tarik napas, set niat, dan lakukan satu aksi bermakna.";
  }
}
