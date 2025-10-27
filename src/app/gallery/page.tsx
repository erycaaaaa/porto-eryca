// src/app/gallery/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export const dynamic = "force-static";

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
    id: "ac-01",
    title: "Demon Slayer",
    category: "Acrylic",
    src: "/porto-eryca/2.jpg",
    description:
      "Tanjiro & Nezuko. Acrylic fanart Taisho vibes & breathing forms.",
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
    id: "ac-06",
    title: "Commission",
    category: "Acrylic",
    src: "/porto-eryca/acy6.jpg",
    description: "Cat by Tesla Paint",
  },
  {
    id: "sk-01",
    title: "Where Questions Pierce the Veil",
    category: "Sketch",
    src: "/porto-eryca/sket1.jpg",
    description: "The bow is the mind. The string is discipline. The arrow is a question. Draw with doubt and courage, aim with attention, release with humility—so it pierces not bodies, but the fog of our assumptions.",
  },
  {
    id: "wc-03",
    title: "A blue eye blooming on paper.",
    category: "Watercolor",
    src: "/porto-eryca/wate2.jpg",
    description: "Cobalt iris on warm ochre breathing on textured paper.",
  },
  {
    id: "sk-02",
    title: "Carry the Lily, Carry the Thought",
    category: "Sketch",
    src: "/porto-eryca/sketsotter.jpg",
    description: "An otter cradles an oversized lily tenderness scaled into weight. Rather than grasping, it accompanies. The drawing asks whether wisdom is strength to carry, or the tact to hold without tearing what is delicate.",
  },
    {
    id: "pt-01",
    title: "Ojo Nganti Ilang Disawang",
    category: "Poster",
    src: "/porto-eryca/poster-budaya.jpg",
    description: "Budaya tidak diwarisi, ia dirawat dengan dipraktikkan.",
  },
      {
    id: "sk-03",
    title: "The Flower that Blooms in Adversity",
    category: "Sketch",
    src: "/porto-eryca/sketkelinci.jpg",
    description: "A rabbit stands with a flower hat that blooms in adversity.",
  },
];


export default function GalleryPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const catFromURL = (sp.get("cat") as Category) || "All";
  const qFromURL = sp.get("q") || "";

  const [active, setActive] = useState<Category>(catFromURL);
  const [q, setQ] = useState(qFromURL);

  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
    if (active === "All") params.delete("cat");
    else params.set("cat", active);
    if (q.trim()) params.set("q", q.trim());
    else params.delete("q");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, q]);

  const filtered = useMemo(() => {
    const a = active.toLowerCase().trim();
    const query = q.toLowerCase().trim();
    return ALL_ITEMS.filter((it) => {
      const byCat = a === "all" ? true : it.category.toLowerCase().trim() === a;
      const byQ = query ? it.title.toLowerCase().includes(query) : true;
      return byCat && byQ;
    });
  }, [active, q]);

  return (
    <main
      id="illustrations"
      className="relative  text-neutral-900
             bg-center bg-cover bg-no-repeat md:bg-fixed"
      style={{ backgroundImage: "url('/porto-eryca/bg-about.png')" }}
    >
      {/* background */}
      <Image
        src="/porto-eryca/case-study.png"
        alt=""
        fill
        priority
        aria-hidden
        className="object-cover -z-10"
      />
      {/* HEADER */}
      <header className="border-b border-[#e6dccb]/10 bg-[#fbf8f3]/10">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
        <h1 className="font-serif text-[clamp(20px,4vw,30px)] text-black">All Artworks</h1>
        <p className="mt-1 text-[clamp(12px,2.6vw,14px)] text-black/70">
                Telusuri karya. Filter berdasarkan kategori atau cari judul.
              </p>
            </div>

            {/* SEARCH box (state, bukan form GET) */}
            <div className="mt-3 sm:mt-0">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title…"
                className="w-72 rounded-b-md border border-[#e6dccb] bg-white px-3 py-2 text-sm text-[#5f3d24]"
                aria-label="Search artworks"
              />
            </div>
          </div>

          {/* FILTER PILLS (BUTTON, bukan Link) */}
          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={isActive}
                  className={[
  
    "text-[clamp(10px,2.6vw,14px)]",
    "px-[clamp(8px,2vw,12px)]",
    "py-[clamp(6px,1.6vw,8px)]",
 
    "rounded-full border transition whitespace-nowrap",
                    isActive
                      ? "border-[#5f3d24] bg-[#5f3d24] text-[#f8e6c9] shadow"
                      : "border-[#e6dccb] bg-white text-[#5f3d24] hover:bg-[#f4efe6]",
                  ].join(" ")}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        {filtered.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#decfb6] bg-[#fffdf8] p-6 text-sm text-[#6b6256]">
            Tidak ada karya untuk filter ini. Coba kategori lain atau hapus
            pencarian.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="group overflow-hidden rounded-xl border border-[#e6dccb] bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt ?? item.title}
                    fill
                    priority={false}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4 text-center text-[#f8e6c9] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                   <p className="hidden md:block text-[clamp(10px,1.8vw,12px)] text-[#7a6f62]">              {item.description}
                    </p>
                  <span className="
  hidden sm:inline-flex
  text-[clamp(10px,1.8vw,12px)]
  rounded-md bg-[#4c3e1f]
  px-[clamp(8px,2vw,12px)]
  py-[clamp(6px,1.6vw,8px)]
  font-medium text-white shadow-sm
">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <h3 className="text-base font-medium text-[#5f3d24]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#7a6f62]">{item.category}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
