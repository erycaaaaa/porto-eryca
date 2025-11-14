"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* ===== BASE PATH (opsional jika kamu pakai basePath di next.config.js) ===== */
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const asset = (p: string) => `${BASE}${p.startsWith("/") ? p : `/${p}`}`;

/* ===== KATEGORI GALERI ===== */
const CATEGORIES = [
  "All",
  "Acrylic",
  "Watercolor",
  "3D Crafting",
  "Poster",
  "Sketch",
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

/* ===== DATA GALLERY ===== */
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
    description:
      "The bow is the mind. The string is discipline. The arrow is a question.",
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
    description:
      "An otter cradles an oversized lily—tenderness scaled into weight.",
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

/* ===== MAYBE LINK (gallery tidak punya detail, jadi selalu div) ===== */
function MaybeLink({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
}) {
  const divProps = rest as React.HTMLAttributes<HTMLDivElement>;
  return (
    <div className={className} {...divProps}>
      {children}
    </div>
  );
}

/* ===== PAGE ===== */
export default function GalleryPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const catRaw = sp.get("cat");
  const qRaw = sp.get("q") ?? "";

  const activeCat: Category = normalizeCat(catRaw);
  const q = qRaw.toLowerCase();

  /* ===== FILTER DATA ===== */
  const filtered = useMemo(() => {
    return ALL_ITEMS.filter((it) => {
      const byCat = activeCat === "All" || it.category === activeCat;
      const byQ =
        !q ||
        it.title.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q);
      return byCat && byQ;
    });
  }, [activeCat, q]);

  return (
    <main
      id="gallery"
      className="relative isolate py-16 md:py-20 bg-center bg-cover md:bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url('${asset("/porto-eryca/bg-about.png")}')`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#faf8f3]/80 pointer-events-none"
      />

      {/* HEADER */}
      <header className="relative border-b border-[#e6dccb] bg-[#fbf8f3]/0">
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

            {/* SEARCH */}
            <form
              className="mt-3 sm:mt-0"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const qv = (form.elements.namedItem("q") as HTMLInputElement)
                  .value;

                const params = new URLSearchParams();
                if (qv) params.set("q", qv);
                if (activeCat !== "All") params.set("cat", activeCat);

                router.replace(`/gallery?${params.toString()}`, {
                  scroll: false,
                });
              }}
            >
              <input
                name="q"
                defaultValue={qRaw}
                placeholder="Search artworks…"
                className="w-72 rounded-lg border border-[#e6dccb] bg-white px-3 py-2 text-sm text-[#5f3d24] placeholder:text-[#9a8f7e] outline-none focus:ring-2 focus:ring-[#d7c4a5]"
              />
            </form>
          </div>

          {/* FILTER PILLS */}
          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const params = new URLSearchParams();
              if (cat !== "All") params.set("cat", cat);
              if (qRaw) params.set("q", qRaw);

              const pillHref = params.toString()
                ? `/gallery?${params.toString()}`
                : `/gallery`;

              const isActive = activeCat === cat;

              return (
                <button
                  key={cat}
                  onClick={() => router.replace(pillHref, { scroll: false })}
                  className={[
                    "rounded-full border px-4 py-2 text-sm transition",
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
                <MaybeLink className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt ?? item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4 text-center text-[#f8e6c9] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 className="text-base font-semibold">{item.title}</h3>
                      <p className="mt-1 text-xs opacity-90 line-clamp-2">
                        {item.description}
                      </p>

                      <span className="hidden sm:inline-flex text-xs rounded-md bg-[#4c3e1f] px-3 py-1 mt-2 text-white shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <div>
                      <h3 className="text-base font-medium text-[#5f3d24]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#7a6f62]">{item.category}</p>
                    </div>
                  </div>
                </MaybeLink>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
