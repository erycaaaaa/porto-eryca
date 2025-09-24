/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type Meta = {
  title: string;
  subtitle?: string;
  year?: string | number;
  tag?: string;
  duration?: string;
  role?: string;
  tools?: string[];
};

type QuickFact = { label: string; value: string };

type Props = {
  meta: Meta;
  coverImage?: string;
  children: React.ReactNode;
  prototypeUrl?: string;
  quickFacts?: QuickFact[];
  resumeHref?: string;
};

const TOOL_ICON_MAP: Record<string, string> = {
  figma: "/icons/figma.svg",
  react: "/icons/react.svg",
  "next.js": "/icons/nextjs.svg",
  nextjs: "/icons/nextjs.svg",
  tailwind: "/icons/tailwind.svg",
  "tailwind css": "/icons/tailwind.svg",
  "framer motion": "/icons/framer.svg",
  typescript: "/icons/typescript.svg",
  vite: "/icons/vite.svg",
  node: "/icons/node.svg",
  "node.js": "/icons/node.svg",
};

export default function CaseLayout({
  meta,
  children,
  prototypeUrl,
  quickFacts,
  resumeHref,
}: Props) {
  const TOC = [
    { id: "about", label: "About Project" },
    { id: "problem", label: "Problem Statement" },
    { id: "solution", label: "Solution" },
    { id: "process", label: "Thinking Process" },
    { id: "ux-case", label: "UX Case" },
    { id: "roles", label: "Role Model" },
    { id: "timeline", label: "Timeline & Duration" },
    { id: "ui-solution", label: "UI Solution" },
    { id: "testimonials", label: "Testimoni User" },
    { id: "prototype", label: "Prototype" },
  ];

  const [active, setActive] = useState<string>("about");
  useEffect(() => {
    const ids = TOC.map((t) => t.id);
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []); // eslint-disable-line

  const [protoOpen, setProtoOpen] = useState(false);

  const renderToolIcons = (tools?: string[]) => {
    if (!tools?.length) return null;
    return (
      <div className="mt-3 flex flex-wrap items-center gap-3">
        {tools.map((raw) => {
          const key = raw.toLowerCase();
          const icon = TOOL_ICON_MAP[key];
          return (
            <span
              key={raw}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm"
              title={raw}
            >
              {icon ? (
                <img src={icon} alt="" className="h-4 w-4 object-contain" />
              ) : (
                <span className="inline-block h-2 w-2 rounded-full bg-neutral-400" />
              )}
              {raw}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] text-neutral-900 relative overflow-hidden">
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-32 h-80 w-80 rounded-full bg-[#e8dcb8]/50 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-[#b7a373]/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[#3b2f22]/10 blur-3xl" />
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-neutral-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto w-full max-w-[90rem] px-[5vw] py-4 flex items-center gap-2 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/#work" className="hover:underline">
            Work
          </Link>
          <span>/</span>
          <span className="text-neutral-500">{meta.title}</span>
        </div>
      </div>

      {/* Header */}
      <header className="mx-auto w-full max-w-[90rem] px-[5vw] pt-10 pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {meta.tag ?? "Case Study"} {meta.year ? `• ${meta.year}` : ""}
        </p>
        <h1 className="mt-1 font-serif text-4xl md:text-5xl">{meta.title}</h1>
        {meta.subtitle && (
          <p className="mt-3 max-w-4xl text-neutral-600">{meta.subtitle}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {meta.role && (
            <span className="rounded-full border border-neutral-300 bg-white px-3 py-1">
              Role: {meta.role}
            </span>
          )}
          {meta.duration && (
            <span className="rounded-full border border-neutral-300 bg-white px-3 py-1">
              Duration: {meta.duration}
            </span>
          )}
          {meta.tools?.length ? (
            <span className="rounded-full border border-neutral-300 bg-white px-3 py-1">
              Tools: {meta.tools.join(" • ")}
            </span>
          ) : null}
          {prototypeUrl && (
            <button
              type="button"
              onClick={() => setProtoOpen(true)}
              className="rounded-full bg-neutral-900 px-3 py-1 font-medium text-white hover:bg-neutral-800"
            >
              Preview Prototype
            </button>
          )}
        </div>

        {renderToolIcons(meta.tools)}
      </header>

      {/* Content + TOC */}
      <div className="mx-auto w-full max-w-[90rem] px-[5vw] relative pb-20">
        {/* give room for TOC on large screens */}
        <div className="relative lg:pr-[340px]">
          {/* vertical guideline */}
          <div
            aria-hidden
            className="pointer-events-none hidden lg:block absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-300/60 to-transparent"
          />

          {/* children sections */}
          {children}

          {/* Auto Prototype section */}
          {prototypeUrl && (
            <section id="prototype" className="scroll-mt-24 mt-12">
              <h2 className="font-serif text-2xl md:text-3xl">Prototype</h2>
              <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border">
                <iframe
                  className="h-full w-full"
                  src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
                    prototypeUrl
                  )}`}
                  allowFullScreen
                />
              </div>
            </section>
          )}
        </div>

        {/* TOC + Quick Facts */}
        <aside className="hidden lg:block">
          <div className="absolute right-0 top-0 w-[300px]">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-4 z-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                On this page
              </p>
              <nav className="space-y-1">
                {TOC.map((t) => {
                  const isActive = active === t.id;
                  return (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      className={`block rounded-md px-2 py-1 text-sm hover:bg-neutral-50 ${
                        isActive
                          ? "bg-neutral-100 font-medium text-neutral-900"
                          : "text-neutral-700"
                      }`}
                    >
                      {t.label}
                    </a>
                  );
                })}
              </nav>
              {prototypeUrl && (
                <a
                  href={prototypeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                >
                  Open Prototype ↗
                </a>
              )}
            </div>

            {(quickFacts?.length || resumeHref) && (
              <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Quick Facts
                </p>
                {quickFacts?.length ? (
                  <ul className="mb-3 space-y-1 text-sm">
                    {quickFacts.map((q) => (
                      <li
                        key={`${q.label}-${q.value}`}
                        className="flex justify-between gap-3"
                      >
                        <span className="text-neutral-600">{q.label}</span>
                        <span className="font-medium text-neutral-900">
                          {q.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {resumeHref && (
                  <a
                    href={resumeHref}
                    className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                  >
                    Download Katalog (PDF)
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Prototype Modal */}
      {prototypeUrl && protoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setProtoOpen(false)}
          />
          <div className="relative z-10 w-[95vw] max-w-5xl rounded-2xl bg-white p-3 shadow-2xl">
            <div className="flex items-center justify-between px-1 pb-2">
              <h3 className="font-serif text-lg">Prototype Preview</h3>
              <button
                onClick={() => setProtoOpen(false)}
                className="rounded-md px-2 py-1 text-sm hover:bg-neutral-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border">
              <iframe
                className="h-full w-full"
                src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
                  prototypeUrl
                )}`}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* Section helper */
export function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>
      <div className="mt-3 prose prose-neutral max-w-none">{children}</div>
    </section>
  );
}
