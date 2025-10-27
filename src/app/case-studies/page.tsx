// app/case-studies/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

/* ===== BASE PATH HELPER ===== */
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const asset = (p: string) => `${BASE}${p.startsWith("/") ? p : `/${p}`}`;

/* ===== KATEGORI ===== */
const CATEGORIES = [
  "All",
  "Case Studies",
  "Paper",
  "UI/UX",
  "Front-End",
  "Design",
  "NoteBook",
  "Games",
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

/* ===== DATA ===== */
type Item = {
  id: string;
  title: string;
  categories: Exclude<Category, "All">[];
  src: string;
  href?: string; // ← boleh kosong
  alt?: string;
  description: string;
  tag?: string;
};

const ALL_ITEMS: Item[] = [
  {
    id: "cs-parable",
    title: "Parable Floristry",
    categories: ["Case Studies"],
    src: "/porto-eryca/fajar2.jpg",
    href: "/case-studies/parable-floristry",
    tag: "Brand & Web",
    description:
      "Boutique floristry brand site with crisp UX, motion, and editorial storytelling.",
  },
  {
    id: "cs-tarumanagara",
    title: "Tarumanagara Enterprise",
    categories: ["Case Studies"],
    src: "/porto-eryca/untarx1.jpg",
    href: "/case-studies/tarumanagara-enterprise",
    tag: "UX Strategy",
    description: "Vision-led site with clean information flow and scalable IA.",
  },
  {
    id: "cs-eryca",
    title: "Website Wihara",
    categories: ["Front-End"],
    src: "/porto-eryca/wihara-mini.jpg",
    href: "/case-studies/eryca-portfolio",
    tag: "Design & Front-End",
    description:
      "Personal portfolio yang cepat, jelas, dan crafted—fokus scroll & storytelling.",
  },
  {
    id: "paper-sentiment",
    title: "Sentiment Analysis Paper",
    categories: ["Paper"],
    src: "/porto-eryca/analisa1.jpg",
    href: "/Paper-sentiment",
    tag: "Research & NLP",
    description:
      "Research on sentiment classification using NLP & deep learning pipelines.",
  },
  {
    id: "website-bot",
    title: "EduBot UI/UX Design",
    categories: ["UI/UX"],
    src: "/porto-eryca/edu1.jpg",
    href: "/case-studies/Paper-bot",
    tag: "UI/UX • Chatbot",
    description:
      "Design system & conversational flow for an educational chatbot.",
  },
  {
    id: "paper-bot-edu",
    title: "Perancangan Antarmuka Chatbot",
    categories: ["Paper"],
    src: "/porto-eryca/analisa2.jpg",
    href: "/case-studies/Paper-UI",
    tag: "Research",
    description:
      "Perancangan Antarmuka Chatbot Edukatif untuk Sistem Tanya Jawab SDN Kalideres 13 Petang",
  },
  {
    id: "poster-psikologi",
    title: "Perancangan Poster Psikologi",
    categories: ["Design"],
    src: "/porto-eryca/poster-psikologi.jpg",
    tag: "Design",
    description:
      "Perancangan Poster Psikologi - Peta Jalan Karir di Ekonomi AI",
  },
  {
    id: "poster-DKV",
    title: "Perancangan Poster Event",
    categories: ["Design"],
    src: "/porto-eryca/poster-dkv.jpg",
    tag: "Design",
    description: "Perancangan Poster Event - Animal",
  },
  {
    id: "Front-End-DKV",
    title: "Portfolio Website Me",
    categories: ["Front-End"],
    src: "/porto-eryca/po2.jpg",
    href: "/case-studies/portfolio",
    tag: "Front-End",
    description:
      "Merancang dan membangun website portfolio pribadi menggunakan typeScript, Next.js, dan Tailwind CSS.",
  },
   {
    id: "game-minnie",
    title: "Perancangan Game Unity Minnie Game",
    categories: ["Games"],
    src: "/porto-eryca/min.jpg",
    tag: "Games",
    description:
      "Perancangan Games Unity Minnie Game Mid Semester Mobile Programming.",
  },
];

function MaybeLink({
  href,
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  href?: string;
  children: React.ReactNode;
}) {
  if (href) {
    // Only pass anchor props to Link
    const anchorProps = rest as React.HTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={className} {...anchorProps}>
        {children}
      </Link>
    );
  } else {
    const divProps = rest as React.HTMLAttributes<HTMLDivElement>;
    return (
      <div className={className} {...divProps}>
        {children}
      </div>
    );
  }
}

/* ===== PAGE ===== */
export default function CaseStudiesIndex() {
  const sp = useSearchParams();
  const catRaw = sp.get("cat");
  const qRaw = sp.get("q") ?? "";

  const activeCat: Category = normalizeCat(catRaw);
  const q = qRaw.toLowerCase();

  const filtered = useMemo(() => {
    return ALL_ITEMS.filter((it) => {
      const byCat =
        activeCat === "All" ||
        it.categories.includes(activeCat as Exclude<Category, "All">); // guard
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
      className="relative isolate z-0 py-16 md:py-20 bg-center bg-cover md:bg-fixed bg-no-repeat"
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
  All Case Studies
</h1>
             <p className="mt-1 text-[clamp(12px,2.6vw,14px)] text-black/70">
 Telusuri karya. Filter berdasarkan kategori atau cari judul.
</p>
            </div>

            {/* SEARCH */}
            <form className="mt-3 sm:mt-0" action="" method="get">
              <input
                name="q"
                defaultValue={qRaw}
                placeholder="Search case studies…"
                className="w-72 rounded-lg border border-[#e6dccb] bg-white px-3 py-2 text-sm text-[#5f3d24] outline-none placeholder:text-[#9a8f7e] focus:ring-2 focus:ring-[#d7c4a5]"
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
              const pillHref = params.toString()
                ? `/case-studies?${params.toString()}`
                : `/case-studies`;
              const isActive = activeCat === cat;

              return (
                <Link
                  key={cat}
                  href={pillHref}
                  aria-pressed={isActive}
                  className={[
                    "rounded-full border px-4 py-2 text-sm transition",
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
      <section className="relative mx-auto max-w-6xl px-6 py-8">
        {filtered.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#decfb6] bg-[#fffdf8] p-6 text-sm text-[#6b6256]">
            Tidak ada hasil untuk filter/pencarian ini.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="group overflow-hidden rounded-xl border border-[#e6dccb] bg-white/100 shadow-sm"
              >
                <MaybeLink href={item.href} className="block">
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
                        <span className="mt-2 rounded-full border border-[#e6dccb]/100 bg-[#fbf8f3]/10 px-3 py-1 text-[10px] tracking-wide">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <div>
                      <h3 className="text-base font-medium text-[#5f3d24]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#7a6f62]">
                        {item.categories.join(", ")}
                      </p>
                    </div>
                    <span className="inline-flex rounded-md bg-[#4c3e1f] px-3 py-1.5 text-xs font-medium text-white shadow-sm">
                      {item.href ? "View" : "Details"}
                    </span>
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
