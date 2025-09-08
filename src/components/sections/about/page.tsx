"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, ExternalLink, Quote, Mail } from "lucide-react";

// One-Page Case Study Template
// — Tech: React (client component), TailwindCSS, Framer Motion (optional)
// — Style: clean, readable, focus on narrative
// How to use:
// 1) Drop this file into your Next.js app (e.g., src/app/case-study/page.tsx or as a component).
// 2) Replace all dummy content in "const data = { ... }" with your real project details.
// 3) Optional: swap images, add sections, or remove blocks you don't need.

const data = {
  brand: {
    title: "UntarX – Student Services Redesign",
    subtitle:
      "From discovery to delivery: designing a clearer, faster, and friendlier experience for students.",
    heroBadge: "UI/UX • Front‑End • Handoff",
    ctaPrimary: { label: "View Prototype", href: "#prototype" },
    ctaSecondary: { label: "Contact", href: "#contact" },
  },
  meta: {
    role: ["UI/UX Designer", "Front‑End Dev"],
    timeline: "Jan – Mar 2025 (8 weeks)",
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
        desc: "Low‑fidelity flow untuk beranda, pencarian, dan halaman layanan; iterasi cepat berdasarkan feedback mingguan.",
      },
      {
        title: "Visual Design System",
        desc: "Skala tipografi, grid, spacing, warna status, dan komponen (Tabs, Card, Alert, Empty State).",
      },
      {
        title: "Prototyping & Testing",
        desc: "High‑fidelity interaktif; validasi dengan 12 peserta dan perbaikan copy + affordance.",
      },
      {
        title: "Handoff & Front‑End",
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
      { label: "Waktu temukan info", value: "−32%" },
      { label: "Skor usability", value: "4.8/5" },
      { label: "Proyek dirilis", value: "6+" },
    ],
    quote:
      "Desain baru membuat mahasiswa jauh lebih cepat menemukan layanan penting dan mengurangi beban helpdesk.",
    quoteBy: "Product Manager, UntarX",
  },
  gallery: [
    { title: "Site Map Baru", img: "/assets/case/sitemap.png" },
    { title: "Wireframe Beranda", img: "/assets/case/wire-home.png" },
    { title: "UI Components", img: "/assets/case/ui-kit.png" },
  ],
  next: {
    items: [
      "Riset longitudinal pascaluncur (4–6 minggu)",
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

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function CaseStudyOnePage() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-zinc-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zinc-200/60 bg-[url('/assets/paper0.svg')] bg-[length:1200px] bg-center/cover bg-no-repeat">
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

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="mt-6 flex flex-wrap gap-3"
          >
            <a
              href={data.brand.ctaPrimary.href}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-white shadow hover:opacity-90"
            >
              {data.brand.ctaPrimary.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={data.brand.ctaSecondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2 hover:bg-zinc-50"
            >
              {data.brand.ctaSecondary.label}
            </a>
          </motion.div>

          {/* META */}
          <div className="mt-10 grid gap-4 rounded-2xl bg-white/80 p-5 ring-1 ring-black/5 md:grid-cols-4">
            <MetaItem label="Role" value={data.meta.role.join(" • ")} />
            <MetaItem label="Timeline" value={data.meta.timeline} />
            <MetaItem label="Team" value={data.meta.team} />
            <MetaItem label="Tools" value={data.meta.tools.join(", ")} />
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <Section id="overview" title="Overview">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Masalah
            </h4>
            <p className="mt-2 leading-relaxed text-zinc-800">
              {data.overview.problem}
            </p>
            <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Tujuan
            </h4>
            <ul className="mt-2 space-y-2">
              {data.overview.goals.map((g) => (
                <li key={g} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Audiens
            </h4>
            <p className="mt-2 text-zinc-800">{data.overview.audience}</p>
            <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Outcome
            </h4>
            <p className="mt-2 text-zinc-800">{data.overview.outcome}</p>
          </div>
        </div>
      </Section>

      {/* RESEARCH */}
      <Section id="research" title="Research & Insights">
        <div className="grid gap-8 md:grid-cols-2">
          <CardList title="Metode" items={data.research.methods} />
          <CardList
            title="Temuan Kunci"
            items={data.research.insights}
            numbered
          />
        </div>
      </Section>

      {/* APPROACH */}
      <Section id="approach" title="Approach & Design">
        <ol className="relative space-y-6 border-l-2 border-zinc-200 pl-6">
          {data.approach.steps.map((s, i) => (
            <li key={s.title} className="group">
              <span className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-zinc-400 bg-white group-hover:bg-zinc-900 group-hover:border-zinc-900" />
              <h4 className="font-medium">
                {i + 1}. {s.title}
              </h4>
              <p className="mt-1 text-zinc-700">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* CHALLENGES */}
      <Section id="challenges" title="Challenges & Solutions">
        <div className="grid gap-6 md:grid-cols-2">
          {data.challenges.map((c, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white p-5 ring-1 ring-black/5"
            >
              <p className="text-sm font-semibold text-amber-900">Tantangan</p>
              <p className="mt-1 text-zinc-800">{c.pain}</p>
              <p className="mt-4 text-sm font-semibold text-emerald-900">
                Solusi
              </p>
              <p className="mt-1 text-zinc-800">{c.solution}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* IMPACT */}
      <section
        id="impact"
        className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 py-14 text-white"
      >
        <div className="mx-auto max-w-6xl px-5">
          <h3 className="font-serif text-2xl md:text-3xl">
            Impact at a glance
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {data.impact.kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-2xl bg-white/10 p-6 text-center ring-1 ring-white/10"
              >
                <div className="text-3xl font-semibold">{k.value}</div>
                <div className="mt-1 text-sm opacity-80">{k.label}</div>
              </div>
            ))}
          </div>
          <figure className="mt-8 max-w-3xl">
            <blockquote className="rounded-2xl bg-white/5 p-5 leading-relaxed ring-1 ring-white/10">
              <Quote className="mb-2 h-5 w-5 opacity-60" />
              <em>“{data.impact.quote}”</em>
            </blockquote>
            <figcaption className="mt-2 text-sm opacity-80">
              — {data.impact.quoteBy}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* GALLERY */}
      <Section id="gallery" title="Design Gallery">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {data.gallery.map((g) => (
            <div
              key={g.title}
              className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5"
            >
              {/* Replace img with next/image if inside Next.js app */}
              <img
                src={g.img}
                alt={g.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <p className="font-medium">{g.title}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* NEXT STEPS */}
      <Section id="next" title="Next Steps">
        <ul className="space-y-2">
          {data.next.items.map((n) => (
            <li key={n} className="flex items-start gap-2">
              <ArrowRight className="mt-0.5 h-4 w-4" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* LINKS */}
      <Section id="links" title="Links & Prototype">
        <div className="flex flex-wrap gap-3">
          <a
            href={data.links.prototype}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 hover:bg-zinc-50"
          >
            <ExternalLink className="h-4 w-4" /> Prototype
          </a>
          <a
            href={data.links.repo}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 hover:bg-zinc-50"
          >
            <ExternalLink className="h-4 w-4" /> Repository
          </a>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-black/5">
          <Mail className="h-5 w-5" />
          <a
            href={`mailto:${data.contact.email}`}
            className="font-medium underline"
          >
            {data.contact.email}
          </a>
        </div>
      </Section>
    </div>
  );
}

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
