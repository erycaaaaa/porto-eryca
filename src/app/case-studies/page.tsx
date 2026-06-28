// app/case-studies/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ALL_ITEMS,
  CATEGORIES,
  normalizeCat,
  MaybeLink,
  asset,
  type Category,
} from "@/data/caseStudiesData";

/* ===== PAGE ===== */
export default function CaseStudiesIndex() {
  const router = useRouter();
  const sp = useSearchParams();
  const catRaw = sp.get("cat");
  const qRaw = sp.get("q") ?? "";

  const activeCat: Category = normalizeCat(catRaw);
  const q = qRaw.toLowerCase();

  /* ===== FILTERED DATA ===== */
  const filtered = useMemo(() => {
    return ALL_ITEMS.filter((it) => {
      const byCat =
        activeCat === "All" ||
        it.categories.includes(activeCat as Exclude<Category, "All">);

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

                router.replace(`/case-studies?${params.toString()}`, {
                  scroll: false,
                });
              }}
            >
              <input
                name="q"
                defaultValue={qRaw}
                placeholder="Search case studies…"
                className="w-72 rounded-lg border border-[#e6dccb] bg-white px-3 py-2 text-sm text-[#5f3d24] outline-none placeholder:text-[#9a8f7e] focus:ring-2 focus:ring-[#d7c4a5]"
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
                ? `/case-studies?${params.toString()}`
                : `/case-studies`;

              const isActive = activeCat === cat;

              return (
                <Link
                  key={cat}
                  href={pillHref}
                  scroll={false}
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
            Tidak ada karya untuk filter ini. Coba kategori lain atau hapus
            pencarian.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="group overflow-hidden rounded-xl border border-[#e6dccb] bg-[#faf8f3] shadow-sm"
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#3a2a16]/75 px-4 text-center text-[#f8e6c9] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 className="text-base font-semibold">{item.title}</h3>
                      <p className="mt-1 text-xs text-[#f8e6c9]/90 line-clamp-2">
                        {item.description}
                      </p>
                      {item.tag && (
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
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-2 py-2 sm:px-4 sm:py-3">
                    <div>
                      <h3 className="text-[12px] font-medium text-[#5f3d24] sm:text-base">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#7a6f62]">
                        {item.categories.join(", ")}
                      </p>
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
