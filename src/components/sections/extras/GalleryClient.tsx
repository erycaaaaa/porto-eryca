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

  // baca nilai URL saat mount
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
    const cat = active.toLowerCase().trim();
    const query = q.toLowerCase().trim();
    return items.filter((it) => {
      const byCat =
        cat === "all" ? true : it.category.toLowerCase().trim() === cat;
      const byQ = query ? it.title.toLowerCase().includes(query) : true;
      return byCat && byQ;
    });
  }, [items, active, q]);

  return (
    <>
      {/* Controls */}
      <div
        className="
    mt-4 -mx-6 px-6
    flex gap-2 overflow-x-auto scroll-smooth
    [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
  "
      >
        {CATEGORIES.map((cat) => {
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={[
                // ukuran responsif
                "shrink-0 whitespace-nowrap rounded-full border leading-tight select-none",
                "text-xs sm:text-sm", // font lebih kecil di mobile
                "px-3 py-1.5 sm:px-4 sm:py-2", // padding lebih kecil di mobile
                // fokus/aksesibilitas
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f3d24]/40",
                // state
              ].join(" ")}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <section className="mt-5">
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
                    <p className="hidden md:block text-[clamp(10px,1.8vw,12px)] text-[#7a6f62]">
                      {item.description}
                    </p>
                    <span
                      className="
  hidden sm:inline-flex
  text-[clamp(10px,1.8vw,12px)]
  rounded-md bg-[#4c3e1f]
  px-[clamp(8px,2vw,12px)]
  py-[clamp(6px,1.6vw,8px)]
  font-medium text-white shadow-sm
"
                    >
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
    </>
  );
}
