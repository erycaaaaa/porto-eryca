"use client";

import { motion, type Variants, type Easing } from "framer-motion";
import {
  Check,
  ArrowRight,
  ExternalLink,
  Quote,
  Mail,
} from "lucide-react";
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
      ease: "easeOut" as Easing, // ✅ Fix tipe easing
    },
  },
};

// =====================
// Dummy Data (Contoh)
// =====================
const data = {
  brand: {
    title: "UntarX Student Services Redesign",
    subtitle:
      "From discovery to delivery: designing a clearer, faster, and friendlier experience for students.",
    heroBadge: "UI/UX • FrontEnd • Handoff",
    ctaPrimary: { label: "View Prototype", href: "#prototype" },
    ctaSecondary: { label: "Contact", href: "#contact" },
  },
  meta: {
    role: ["UI/UX Designer", "FrontEnd Dev"],
    timeline: "Jan - Mar 2025 (8 weeks)",
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
    audience:
      "Mahasiswa S1—S2 yang menggunakan portal untuk jadwal, administrasi, beasiswa, dan pengumuman.",
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
  approach: {
    steps: [
      {
        title: "Information Architecture",
        desc: "Merapikan struktur navigasi utama menjadi 4 klaster dan menamai ulang label berdasarkan mental model pengguna.",
      },
      {
        title: "Wireframing",
        desc: "Low-fidelity flow untuk beranda, pencarian, dan halaman layanan; iterasi cepat berdasarkan feedback mingguan.",
      },
      {
        title: "Visual Design System",
        desc: "Skala tipografi, grid, spacing, warna status, dan komponen (Tabs, Card, Alert, Empty State).",
      },
      {
        title: "Prototyping & Testing",
        desc: "High-fidelity interaktif; validasi dengan 12 peserta dan perbaikan copy + affordance.",
      },
      {
        title: "Handoff & Front-End",
        desc: "Spesifikasi di Figma, token Tailwind, dan implementasi komponen di Next.js/Tailwind.",
      },
    ],
  },
  challenges: [
    {
      pain: "Terlalu banyak informasi di halaman layanan.",
      solution:
        "Memecah konten menjadi section pendek + anchor link, menambah highlights ringkas (FAQ, persyaratan, langkah).",
    },
    {
      pain: "Ikon dan label tidak konsisten di seluruh halaman.",
      solution:
        "Membangun library ikon dan guideline penamaan; audit dan refactor 30+ label yang ambigu.",
    },
  ],
  impact: {
    kpis: [
      { label: "Waktu temukan info", value: "-32%" },
      { label: "Skor usability", value: "4.8/5" },
      { label: "Proyek dirilis", value: "6+" },
    ],
    quote:
      "Desain baru membuat mahasiswa jauh lebih cepat menemukan layanan penting dan mengurangi beban helpdesk.",
    quoteBy: "Product Manager, UntarX",
  },
  gallery: [
    { title: "Site Map Baru", img: "/case/sitemap.png" },
    { title: "Wireframe Beranda", img: "/case/wire-home.png" },
    { title: "UI Components", img: "/case/ui-kit.png" },
  ],
  next: {
    items: [
      "Riset longitudinal pascaluncur (4-6 minggu)",
      "Integrasi analytics event untuk jalur kritis",
      "A/B test hero + quick actions",
    ],
  },
  links: {
    prototype: "https://figma.com/file/your-prototype",
    repo: "https://github.com/your-repo",
  },
  contact: {
    email: "eryca@email.com",
  },
};

// =====================
// Main Component
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

      {/* Tambahkan section lain seperti Overview, Research, Approach, dll */}
      {/* ... (konten sama seperti kode asli kamu) */}
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
