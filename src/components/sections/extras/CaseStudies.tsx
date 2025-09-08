
"use client";
import React from "react";

/** Tipe item agar mudah dipakai ulang */
export type CaseStudyItem = {
  title: string;
  blurb: string;
  image: string;
  href: string;
  tag?: string;
};

export default function CaseStudiesSection({
  items = [
    {
      title: "Parable Floristry",
      blurb: "Boutique floristry brand site with crisp UX and motion.",
      image: "/w2.jpg",
      href: "/case-studies/parable-floristry",
      tag: "Brand & Web",
    },
    {
      title: "Tarumanagara Enterprise",
      blurb: "Vision-led site with clean information flow.",
      image: "/u00.jpg",
      href: "/case-studies/tarumanagara-enterprise",
      tag: "UX Strategy",
    },
    {
      title: "Eryca Portfolio",
      blurb: "Fast, clear, and crafted personal portfolio.",
      image: "/w11.jpg",
      href: "/case-studies/eryca-portfolio",
      tag: "Design & Front-End",
    },
  ],

  id = "work",
  title = "Selected Works & Case Studies",
  subtitle = "Highlights from personal and client work—each case study covers goals, process, and impact.",
}: {
  items?: CaseStudyItem[];
  id?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section
      id={id}
      className="py-16"
      style={{ scrollMarginTop: "5rem" }}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container mx-auto max-w-7xl px-5">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Projects
            </p>
            <h2
              id={`${id}-heading`}
              className="mt-1 font-serif text-3xl md:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-neutral-600">
              {subtitle}
            </p>
          </div>
          <a
            href="/projects"
            className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-[#4c3e1f]"
            aria-label="View all projects"
          >
            View all
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.title}
              className="group relative rounded-[20px] border border-neutral-200 bg-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur transition-shadow hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)] focus-within:shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
            >
              <a
                href={p.href}
                aria-label={`Open case study: ${p.title}`}
                className="absolute inset-0 rounded-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4c3e1f] focus-visible:ring-offset-2"
              />
              <div className="relative overflow-hidden rounded-t-[20px]">
                <div className="h-56 w-full md:h-64">
                  <img
                    src={p.image}
                    alt={`${p.title} cover`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                </div>
                {p.tag && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl leading-snug text-neutral-900">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600">
                  {p.blurb}
                </p>
                <div className="pointer-events-none mt-4">
                  <span className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
                    View case study →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
