"use client";

import { motion, type Variants, type Easing } from "framer-motion";
import React from "react";

// =====================
// Framer Motion Variants
// =====================
const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as Easing,
    },
  },
};

// =====================
// Data Proyek (Dummy)
// =====================
const data = {
  brand: {
    title: "UntarX Student Services Redesign",
    subtitle:
      "From discovery to delivery: designing a clearer, faster, and friendlier experience for students.",
    heroBadge: "UI/UX • FrontEnd • Handoff",
  },
  meta: {
    role: ["UI/UX Designer", "FrontEnd Dev"],
    timeline: "Jan - Mar 2026 (8 weeks)",
    team: "2 Designers, 1 PM, 2 Engineers",
    tools: ["Figma", "Next.js", "React", "Tailwind", "Framer Motion"],
  },
  overview: {
    problem:
      "Mahasiswa kesulitan menemukan layanan akademik karena navigasi membingungkan dan informasi tersebar.",
    goals: [
      "Mempercepat waktu temukan informasi layanan",
      "Menyederhanakan navigasi dan arsitektur informasi",
      "Meningkatkan konsistensi visual & aksesibilitas",
    ],
    outcome:
      "Peluncuran beta dengan arsitektur informasi baru dan komponen UI reusable untuk tim dev.",
  },
  research: {
    methods: [
      "Wawancara 10 mahasiswa (30 menit)",
      "Usability test pada versi lama (n=8)",
      "Audit konten & card sorting",
    ],
    insights: [
      "70% pengguna bingung karena label menu tidak konsisten",
      "Beranda penuh teks, tidak ada jalur cepat (quick actions)",
      "Halaman detail layanan terlalu panjang dan sulit discan",
    ],
  },
};

// =====================
// Halaman Utama
// =====================
export default function CaseStudyOnePage() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-zinc-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zinc-200/60 bg-[url('/porto-eryca/paper0.svg')] bg-[length:1200px] bg-center/cover bg-no-repeat">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="inline-block rounded-full border border-zinc-300/70 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
          >
            {data.brand.heroBadge}
          </motion.span>
          <motion.h1
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="mt-4 font-serif text-4xl leading-tight md:text-5xl"
          >
            {data.brand.title}
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="mt-3 max-w-2xl text-zinc-700"
          >
            {data.brand.subtitle}
          </motion.p>
        </div>
      </section>

      {/* OVERVIEW */}
      <Section id="overview" title="Project Overview">
        <div className="grid md:grid-cols-2 gap-6">
          <CardList title="Goals" items={data.overview.goals} />
          <MetaItem label="Timeline" value={data.meta.timeline} />
        </div>
        <p className="mt-6 text-zinc-800">{data.overview.problem}</p>
        <p className="mt-4 text-zinc-800 font-semibold">
          Outcome: {data.overview.outcome}
        </p>
      </Section>

      {/* RESEARCH */}
      <Section id="research" title="Research Insights">
        <div className="grid md:grid-cols-2 gap-6">
          <CardList title="Research Methods" items={data.research.methods} />
          <CardList title="Key Insights" items={data.research.insights} />
        </div>
      </Section>
    </div>
  );
}

// =====================
// Utility Components
// =====================
function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-14">
      <div className="mx-auto max-w-6xl px-5">
        <motion.h3
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fade}
          className="font-serif text-2xl md:text-3xl"
        >
          {title}
        </motion.h3>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fade}
          className="mt-6"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-black/5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-zinc-900">{value}</p>
    </div>
  );
}

function CardList({
  title,
  items,
  numbered = false,
}: {
  title: string;
  items: string[];
  numbered?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
      <p className="text-sm font-semibold text-zinc-700">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={it} className="flex gap-2 text-zinc-800">
            {numbered ? (
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-semibold text-white">
                {i + 1}
              </span>
            ) : (
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-zinc-900" />
            )}
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
