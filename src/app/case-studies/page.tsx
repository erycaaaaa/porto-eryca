"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

/* =========================
   KATEGORI
   ========================= */
const CATEGORIES = [
  "All",
  "Case Studies",
  "Sentiment Analysis",
  "UI/UX",
  "Front-End",
  "Research",
] as const;
type Category = (typeof CATEGORIES)[number];

function normalizeCat(v: string | null): Category {
  if (!v) return "All";
  const cleaned = decodeURIComponent(v).replace(/\+/g, " ").trim();
  const match = CATEGORIES.find(
    (c) => c.toLowerCase() === cleaned.toLowerCase()
  );
  return (match as Category) ?? "All";
}

/* =========================
   DATA STUDI KASUS
   ========================= */
type Item = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  src: string;
  href: string;
  alt?: string;
  description: string;
  tag?: string;
};

const ALL_ITEMS: Item[] = [
  {
    id: "cs-parable",
    title: "Parable Floristry",
    category: "Case Studies",
    src: "/porto-eryca/fajar1.jpg",
    href: "/case-studies/parable-floristry",
    tag: "Brand & Web",
    description:
      "Sebuah brand floristry butik dengan pengalaman pengguna yang mulus, elemen animasi, dan narasi visual yang elegan.",
  },

  {
    id: "cs-untarx",
    title: "UntarX — Student App",
    category: "UI/UX",
    src: "/porto-eryca/untarx1.jpg",
    href: "/case-studies/untarx",
    tag: "UI/UX • Student App",
    alt: "UntarX — UI/UX screens",
    description:
      "Fokus pada pengembangan UI/UX untuk menyederhanakan kehidupan mahasiswa. Fitur unggulan: direktori staf, voucher diskon kampus, dan kutipan harian.",
  },

  {
    id: "cs-eryca",
    title: "Website Wihara",
    category: "Front-End",
    src: "/porto-eryca/wihara.jpg",
    href: "/case-studies/eryca-portfolio",
    tag: "Desain & Front-End",
    description:
      "Portfolio pribadi yang dirancang untuk kecepatan, kejelasan, dan penceritaan yang menarik melalui pengalaman scroll yang unik.",
  },
  {
    id: "paper-sentiment",
    title: "Analisis Sentimen",
    category: "Sentiment Analysis",
    src: "/porto-eryca/analisa1.jpg",
    href: "/case-studies/Paper-sentiment",
    tag: "Research & NLP",
    description:
      "Riset mendalam tentang klasifikasi sentimen menggunakan Natural Language Processing (NLP) dan pipeline deep learning.",
  },
  {
    id: "paper-bot",
    title: "EduBot UI/UX Design",
    category: "UI/UX",
    src: "/porto-eryca/edu1.jpg",
    href: "/case-studies/Paper-bot",
    tag: "UI/UX • Chatbot",
    description:
      "Desain sistem dan alur percakapan untuk chatbot edukasi yang interaktif.",
  },
];

/* =========================
   HALAMAN INDEX STUDI KASUS
   ========================= */
export default function CaseStudiesIndex() {
  const sp = useSearchParams();
  const catRaw = sp.get("cat");
  const qRaw = sp.get("q") ?? "";

  const activeCat: Category = normalizeCat(catRaw);
  const q = qRaw.toLowerCase();

  const filtered = useMemo(() => {
    return ALL_ITEMS.filter((it) => {
      const byCat = activeCat === "All" || it.category === activeCat;
      const byQ =
        !q ||
        it.title.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q) ||
        (it.tag ?? "").toLowerCase().includes(q);
      return byCat && byQ;
    });
  }, [activeCat, q]);

  return (
    <main
      className={[
        "min-h-screen bg-gradient-to-br from-[#fdfbf5] to-[#f5f0e9]",
        "relative min-h-screen",
        "bg-[url('/porto-eryca/bg-mua.png')] bg-no-repeat",
        "bg-top bg-cover",
        "md:bg-fixed md:bg-center md:bg-cover",

        "text-neutral-900",
      ].join(" ")}
    >
      {" "}
      {/* Gradien latar belakang lembut */}
      {/* HEADER */}
      <header className="border-b-2 border-[#e0d8c8] bg-white/80 backdrop-blur-sm">
        {" "}
        {/* Transparan dengan blur */}
        <div className="mx-auto max-w-7xl px-6 py-10">
          {" "}
          {/* Lebar maksimum sedikit lebih luas */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {" "}
            {/* Jarak antar elemen lebih konsisten */}
            <div>
              <h1 className="font-serif text-4xl font-bold text-[#4a3c31]">
                {" "}
                {/* Ukuran dan ketebalan judul lebih besar */}
                Karya Kami
              </h1>
              <p className="mt-2 text-lg text-[#6b5f50]">
                {" "}
                {/* Ukuran teks deskripsi lebih besar */}
                Jelajahi portofolio kami. Filter berdasarkan kategori atau
                gunakan kolom pencarian untuk menemukan apa yang Anda cari.
              </p>
            </div>
            {/* SEARCH */}
            <form className="mt-4 sm:mt-0" action="/case-studies" method="get">
              <div className="flex items-center space-x-2">
                {" "}
                {/* Menggunakan flex untuk layout pencarian */}
                <input
                  name="q"
                  defaultValue={qRaw}
                  placeholder="Cari studi kasus..."
                  className="w-80 rounded-lg border-2 border-[#d4c4b0] bg-white px-4 py-3 text-base text-[#3b2f22] outline-none placeholder:text-[#9a8f7e] focus:ring-2 focus:ring-[#8c6a4a] focus:ring-opacity-50 transition duration-300 ease-in-out"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="rounded-lg bg-[#8c6a4a] px-5 py-3 text-white shadow-md hover:bg-[#6b4a32] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#6b4a32] focus:ring-opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
              {activeCat !== "All" && (
                <input type="hidden" name="cat" value={activeCat} />
              )}
            </form>
          </div>
          {/* FILTER PILLS */}
          <div className="mt-8 flex flex-wrap gap-3">
            {" "}
            {/* Jarak antar pil lebih besar */}
            {CATEGORIES.map((cat) => {
              const params = new URLSearchParams();
              if (cat !== "All") params.set("cat", cat);
              if (qRaw) params.set("q", qRaw);
              const href = params.toString()
                ? `/case-studies?${params.toString()}`
                : "/case-studies";
              const isActive = activeCat === cat;

              return (
                <Link
                  key={cat}
                  href={href}
                  aria-pressed={isActive}
                  className={[
                    "rounded-full px-5 py-2 text-sm font-medium transition duration-300 ease-in-out shadow-sm",
                    isActive
                      ? "border-2 border-[#6b4a32] bg-[#6b4a32] text-white hover:bg-[#4a3c31]" // Warna aktif lebih solid dan kontras
                      : "border border-[#e0d8c8] bg-white text-[#4a3c31] hover:bg-[#f9f5f0] hover:shadow-md", // Efek hover lebih halus
                  ].join(" ")}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </header>
      {/* GRID STUDI KASUS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {" "}
        {/* Jarak vertikal lebih besar */}
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-[#dcd0be] bg-[#fdfcf9] p-8 text-xl text-[#7a6f62]">
            {" "}
            {/* Kontainer pesan lebih besar */}
            <p>
              Oops! Tidak ada hasil yang cocok dengan kriteria Anda. Coba ubah
              pencarian atau filter.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {" "}
            {/* Grid lebih rapat, 4 kolom di layar besar */}
            {filtered.map((item) => (
              <li
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-[#e0d8c8] bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl" // Efek hover mengangkat kartu
              >
                <Link href={item.href} className="block">
                  <div className="relative aspect-video w-full overflow-hidden">
                    {" "}
                    {/* Aspect ratio video untuk tampilan lebih dramatis */}
                    <Image
                      src={item.src}
                      alt={item.alt ?? item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105" // Transformasi lebih halus dan lambat
                      sizes="(min-width:1200px) 25vw, (min-width:768px) 50vw, 100vw" // Optimasi ukuran gambar
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 via-black/40 to-black/20 px-5 text-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {" "}
                      {/* Gradien overlay untuk teks lebih terbaca */}
                      <h3 className="text-xl font-bold tracking-wide">
                        {item.title}
                      </h3>{" "}
                      {/* Judul lebih besar */}
                      <p className="mt-2 text-sm leading-relaxed line-clamp-3">
                        {" "}
                        {/* Jarak dan ukuran teks deskripsi lebih nyaman */}
                        {item.description}
                      </p>
                      {item.tag && (
                        <span className="mt-3 rounded-full border border-[#ffffff]/30 bg-[#ffffff]/10 px-4 py-1 text-[11px] font-medium tracking-wide backdrop-blur-sm">
                          {" "}
                          {/* Tag dengan latar belakang blur */}
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-5 py-4">
                    {" "}
                    {/* Padding lebih besar */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#3b2f22]">
                        {" "}
                        {/* Judul lebih besar */}
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#7a6f62] opacity-80">
                        {item.category}
                      </p>{" "}
                      {/* Kategori sedikit lebih redup */}
                    </div>
                    <span className="text-sm font-bold text-[#8c6a4a] transition hover:text-[#6b4a32]">
                      {" "}
                      {/* Tombol "View" lebih menonjol */}
                      Lihat Detail →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
