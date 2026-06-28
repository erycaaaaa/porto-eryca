// components/sections/extras/CaseStudies.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const catRaw = sp.get("cat");
  const qRaw = sp.get("q") ?? "";

  const [searchValue, setSearchValue] = useState(qRaw);
  const activeCat: Category = normalizeCat(catRaw);

  // Sync search input with URL
  useEffect(() => {
    setSearchValue(qRaw);
  }, [qRaw]);

  const q = searchValue.toLowerCase();

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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    
    // Update URL without refresh
    const params = new URLSearchParams();
    if (activeCat !== "All") params.set("cat", activeCat);
    if (newValue) params.set("q", newValue);
    
    const newUrl = params.toString() 
      ? `${pathname}?${params.toString()}` 
      : pathname;
    
    router.replace(newUrl, { scroll: false });
  };

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
        className="absolute inset-0 -z-10 bg-[#faf8f3]/0 pointer-events-none"
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
            <div className="mt-3 sm:mt-0">
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search case studies…"
                className="w-72 rounded-b-md border border-[#e6dccb] bg-white px-3 py-2 text-sm text-[#5f3d24] outline-none placeholder:text-[#9a8f7e] focus:ring-2 focus:ring-[#d7c4a5]"
              />
            </div>
          </div>

          {/* FILTER PILLS */}
          <div
            className="
              mt-5 -mx-6 px-6
              flex gap-2 overflow-x-auto
              [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
            "
            role="tablist"
            aria-label="Filter categories"
          >
            {CATEGORIES.map((cat) => {
              const params = new URLSearchParams();
              if (cat !== "All") params.set("cat", cat);
              if (searchValue) params.set("q", searchValue);
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
          <ul
            className="
              grid grid-cols-4 gap-2         
              sm:grid-cols-2 sm:gap-4         
              lg:grid-cols-3 lg:gap-6          
            "
          >
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
                      sizes="(max-width:640px) 25vw, (max-width:1024px) 50vw, 33vw"
                      priority={false}
                    />
              
                    <div className="absolute inset-0 hidden sm:flex flex-col items-center justify-center bg-[#3a2a16]/75 px-4 text-center text-[#f8e6c9] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 className="text-base font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="hidden md:block text-sm text-[#f8e6c9]/90 mb-3 line-clamp-3">
                        {item.description}
                      </p>
                      {item.tag && (
                        <span className="text-xs rounded-md bg-[#4c3e1f] px-3 py-1.5 font-medium text-white shadow-sm">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-2 py-2 sm:px-4 sm:py-3">
                    <div>
                      <h3 className="text-[11px] font-medium text-[#5f3d24] sm:text-base">
                        {item.title}
                      </h3>
                      <p className="hidden md:block text-[11px] text-[#7a6f62]">
                        {item.categories.join(", ")}
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex rounded-md bg-[#4c3e1f] px-3 py-1.5 text-xs font-medium text-white shadow-sm">
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