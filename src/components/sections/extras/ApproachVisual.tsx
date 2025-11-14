"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandsLogo from "@/components/case/BrandsLogo";

export const dynamic = "force-static";

const THIS_ROUTE = "/gallery";

const CATEGORIES = [
  "All",
  "Acrylic",
  "Watercolor",
  "3D Crafting",
  "Poster",
  "Sketch",
] as const;

type Category = (typeof CATEGORIES)[number];

type Item = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  src: string;
  alt?: string;
  description: string;
};

const ALL_ITEMS: Item[] = [
  {
    id: "sk-02",
    title: "Carry the Lily, Carry the Thought",
    category: "Sketch",
    src: "/porto-eryca/sketsotter.jpg",
    description:
      "An otter cradles an oversized lily tenderness scaled into weight.",
  },
  {
    id: "pt-01",
    title: "Ojo Nganti Ilang Disawang",
    category: "Poster",
    src: "/porto-eryca/poster-budaya.jpg",
    description: "Budaya tidak diwarisi, ia dirawat dengan dipraktikkan.",
  },
  {
    id: "wc-01",
    title: "Christmas Scene",
    category: "Watercolor",
    src: "/porto-eryca/1.jpg",
    description: "Watercolor: wet on wet glow & soft edges.",
  },
  {
    id: "dc-01",
    title: "Self Potrait",
    category: "3D Crafting",
    src: "/porto-eryca/4.jpg",
    description: "3D craft: stylized form, matte clay render.",
  },
  {
    id: "sk-01",
    title: "Where Questions Pierce the Veil",
    category: "Sketch",
    src: "/porto-eryca/sket1.jpg",
    description:
      "The bow is the mind. The string is discipline. The arrow is a question.",
  },
  {
    id: "wc-03",
    title: "A blue eye blooming on paper.",
    category: "Watercolor",
    src: "/porto-eryca/wate2.jpg",
    description:
      "A watercolor study of a blue eye beside a well-used palette.",
  },
];

/* ===== PAGE ===== */
export default function GalleryPage({
  searchParams,
}: {
  searchParams?: { cat?: string };
}) {
  const activeCat = (searchParams?.cat ?? "All") as Category;

  // ⬅ CLIENT-SIDE SEARCH (baru)
  const [search, setSearch] = useState("");

  const filtered = ALL_ITEMS.filter((it) => {
    const byCat = activeCat === "All" || it.category === activeCat;
    const bySearch =
      !search ||
      it.title.toLowerCase().includes(search.toLowerCase()) ||
      it.description.toLowerCase().includes(search.toLowerCase());
    return byCat && bySearch;
  });

  return (
    <main
      id="illustrations"
      className="relative text-neutral-900 bg-center bg-cover bg-no-repeat md:bg-fixed"
      style={{ backgroundImage: "url('/porto-eryca/bg-about.png')" }}
    >
      {/* HEADER */}
      <header className="border-b border-[#e6dccb] bg-[#fbf8f3]/0">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-[clamp(20px,4vw,30px)] text-black">
                All Artworks
              </h1>
              <p className="mt-1 text-[clamp(12px,2.6vw,14px)] text-black/70">
                Telusuri karya. Filter berdasarkan kategori atau cari judul.
              </p>
            </div>

            {/* Search — CLIENT SIDE ONLY */}
            <div className="mt-3 sm:mt-0">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title…"
                className="w-72 rounded-b-md border border-[#e6dccb] bg-white px-3 py-2 text-sm text-[#5f3d24] outline-none placeholder:text-[#9a8f7e] focus:ring-2 focus:ring-[#d7c4a5]"
              />
            </div>
          </div>

          {/* FILTER CATEGORY (Tetap pakai URL) */}
          <div
            className="
              mt-5 -mx-6 px-6
              flex gap-2 overflow-x-auto
              [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
            "
            role="tablist"
          >
            {CATEGORIES.map((cat) => {
              const href =
                cat === "All"
                  ? THIS_ROUTE
                  : `${THIS_ROUTE}?cat=${encodeURIComponent(cat)}`;
              const isActive = activeCat === cat;

              return (
                <Link
                  key={cat}
                  href={href}
                  className={[
                    "text-[clamp(10px,2.6vw,14px)] px-[clamp(8px,2vw,12px)] py-[clamp(6px,1.6vw,8px)] rounded-full border transition whitespace-nowrap",
                    isActive
                      ? "border-[#5f3d24] bg-[#5f3d24] text-[#f8e6c9] shadow"
                      : "border-[#e6dccb] bg-white text-[#5f3d24] hover:bg-[#f4efe6]",
                  ].join(" ")}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        {filtered.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#decfb6] bg-[#fffdf8] p-6 text-sm text-[#6b6256]">
            Tidak ada karya untuk filter ini.
          </p>
        ) : (
          <ul className="grid grid-cols-4 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-[#e6dccb] bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt ?? item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 hidden sm:flex flex-col items-center justify-center bg-black/50 px-4 text-center text-[#f8e6c9] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-xs opacity-90 line-clamp-2">
                      {item.description}
                    </p>

                    <span className="hidden sm:inline-flex text-[clamp(10px,1.8vw,12px)] rounded-md bg-[#4c3e1f] px-[clamp(8px,2vw,12px)] py-[clamp(6px,1.6vw,8px)] font-medium text-white shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 py-2 sm:px-4 sm:py-3">
                  <div>
                    <h3 className="text-[12px] font-medium text-[#5f3d24] sm:text-base">
                      {item.title}
                    </h3>
                    <p className="hidden md:block text-[11px] text-[#7a6f62]">
                      {item.category}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <BrandsLogo className="mt-10" />
      </section>
    </main>
  );
}
