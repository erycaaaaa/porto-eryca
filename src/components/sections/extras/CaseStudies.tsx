// src/app/case-studies/page.tsx
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
   DATA
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
      "Boutique floristry brand site with crisp UX, motion, and editorial storytelling.",
  },
  {
    id: "cs-tarumanagara",
    title: "Tarumanagara Enterprise",
    category: "Case Studies",
    src: "/porto-eryca/untarx1.jpg",
    href: "/case-studies/tarumanagara-enterprise",
    tag: "UX Strategy",
    description: "Vision-led site with clean information flow and scalable IA.",
  },
  {
    id: "cs-eryca",
    title: "Website Wihara",
    category: "Front-End",
    src: "/porto-eryca/wihara11.jpg",
    href: "/case-studies/eryca-portfolio",
    tag: "Design & Front-End",
    description:
      "Personal portfolio yang cepat, jelas, dan crafted—fokus scroll & storytelling.",
  },
  {
    id: "paper-sentiment",
    title: "Sentiment Analysis Paper",
    category: "Sentiment Analysis",
    src: "/porto-eryca/analisa1.jpg",
    href: "/case-studies/Paper-sentiment",
    tag: "Research & NLP",
    description:
      "Research on sentiment classification using NLP & deep learning pipelines.",
  },
  {
    id: "paper-bot",
    title: "EduBot UI/UX Design",
    category: "UI/UX",
    src: "/porto-eryca/edu1.jpg",
    href: "/case-studies/Paper-bot",
    tag: "UI/UX • Chatbot",
    description:
      "Design system & conversational flow for an educational chatbot.",
  },
];

/* =========================
   PAGE INDEX (Client-side Filtering)
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
      id="worked"
   className={["relative min-h-screen", "bg-[url('/porto-eryca/bg-mua.png')] bg-no-repeat", " transform rotate-[900deg]","bg-top bg-cover", "md:bg-fixed md:bg-center md:bg-cover", "text-neutral-900"].join(" ")}
  

    >
      {/* HEADER */}
      <header className="border-b border-[#e6dccb]/0 bg-[#fbf8f3]/0">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl text-[#3b2f22]">
                All Case Studies
              </h1>
              <p className="mt-1 text-sm text-[#5a5246]">
                Telusuri semua karya. Filter berdasarkan kategori atau cari
                judul/keyword.
              </p>
            </div>

            {/* SEARCH */}
            <form className="mt-3 sm:mt-0" action="/case-studies" method="get">
              <input
                name="q"
                defaultValue={qRaw}
                placeholder="Search case studies…"
                className="w-72 rounded-lg border border-[#e6dccb] bg-white px-3 py-2 text-sm text-[#3b2f22] outline-none placeholder:text-[#9a8f7e] focus:ring-2 focus:ring-[#d7c4a5]"
              />
              {activeCat !== "All" && (
                <input type="hidden" name="cat" value={activeCat} />
              )}
            </form>
          </div>

          {/* FILTER PILLS */}
          <div className="mt-5 flex flex-wrap gap-2">
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
                    "rounded-full border px-4 py-2 text-sm transition",
                    isActive
                      ? "border-[#5f3d24] bg-[#5f3d24] text-[#f8e6c9] shadow"
                      : "border-[#e6dccb] bg-white/80 text-[#3b2f22] hover:bg-[#f4efe6]",
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
            Tidak ada hasil untuk filter/pencarian ini.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="group overflow-hidden rounded-xl border border-[#e6dccb] bg-white shadow-sm"
              >
                <Link href={item.href} className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt ?? item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-4 text-center text-[#f8e6c9] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 className="text-base font-semibold">{item.title}</h3>
                      <p className="mt-1 text-xs opacity-90 line-clamp-2">
                        {item.description}
                      </p>
                      {item.tag && (
                        <span className="mt-2 rounded-full border border-[#e6dccb]/60 bg-[#fbf8f3]/10 px-3 py-1 text-[10px] tracking-wide">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <div>
                      <h3 className="text-base font-medium text-[#3b2f22]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#7a6f62]">
                        {item.category}
                      </p>
                    </div>
                    <span className="inline-flex rounded-md bg-[#4c3e1f] px-3 py-1.5 text-xs font-medium text-white shadow-sm">
                      View
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
