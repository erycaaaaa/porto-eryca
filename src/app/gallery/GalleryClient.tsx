"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export const CATEGORIES = [
  "All",
  "Acrylic",
  "Watercolor",
  "3D Crafting",
  "Poster",
  "Sketch",
  "Design",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type Item = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  src: string;
  alt?: string;
  description: string;
};

export default function GalleryClient({
  items,
  initialCategory = "All",
  initialQuery = "",
}: {
  items: Item[];
  initialCategory?: Category;
  initialQuery?: string;
}) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const catFromURL = (sp.get("cat") as Category) || initialCategory;
  const qFromURL = sp.get("q") || initialQuery;

  const [active, setActive] = useState<Category>(catFromURL);
  const [q, setQ] = useState(qFromURL);

  useEffect(() => {
    const params = new URLSearchParams(sp.toString());
    if (active === "All") params.delete("cat");
    else params.set("cat", active);
    if (q.trim()) params.set("q", q.trim());
    else params.delete("q");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, q]);

  const filtered = useMemo(() => {
    const a = active.toLowerCase().trim();
    const query = q.toLowerCase().trim();
    return items.filter((it) => {
      const byCat = a === "all" ? true : it.category.toLowerCase().trim() === a;
      const byQ = query ? it.title.toLowerCase().includes(query) : true;
      return byCat && byQ;
    });
  }, [items, active, q]);

  return (
    <section
      id="illustrations"
      className="scroll-mt-24 md:scroll-mt-28"
      aria-label="Illustrations Gallery"
    >
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={[
                  "rounded-full border px-4 py-2 text-sm",
                  isActive
                    ? "border-[#5f3d24] bg-[#5f3d24] text-[#f8e6c9] shadow"
                    : "border-[#e6dccb] bg-white text-[#3b2f22] hover:bg-[#f4efe6]",
                ].join(" ")}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title…"
            className="w-full rounded-lg border border-[#e6dccb] bg-white px-3 py-2 text-sm text-[#3b2f22] outline-none placeholder:text-[#9a8f7e] focus:ring-2 focus:ring-[#d7c4a5]"
            aria-label="Search illustrations by title"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="mt-5">
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
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4 text-center text-[#f8e6c9] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-xs opacity-90">
                      {item.description}
                    </p>
                    <span className="mt-2 rounded-full border border-[#e6dccb]/60 bg-[#fbf8f3]/10 px-3 py-1 text-[10px] tracking-wide">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <h3 className="text-base font-medium text-[#3b2f22]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#7a6f62]">{item.category}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
