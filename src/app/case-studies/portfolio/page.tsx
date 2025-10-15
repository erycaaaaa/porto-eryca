import React from "react";
import { SiFigma, SiGithub, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";

// Small UI primitives
function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6">{children}</div>;
}

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-10 md:py-14">
      <Container>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{title}</h2>
        <div className="text-base leading-relaxed text-zinc-700">{children}</div>
      </Container>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm">
      {children}
    </span>
  );
}

function ToolBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
      <span className="text-2xl"><Icon /></span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function StepCard({ order, title, children }: { order: number; title: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <span className="absolute -top-3 -left-3 grid size-8 place-items-center rounded-full bg-zinc-900 text-white text-sm font-semibold shadow">
        {order}
      </span>
      <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
      <div className="prose prose-zinc max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-1">
        {children}
      </div>
    </div>
  );
}

export default function PortfolioTutorialPage() {
  return (
    <main className="bg-[#f7f7f5] text-zinc-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-white to-zinc-50">
        <Container>
          <div className="py-12 md:py-16">
            <div className="mb-6 flex flex-wrap gap-2">
              <Badge>Wireframe</Badge>
              <Badge>Prototype</Badge>
              <Badge>Front‑End</Badge>
              <Badge>Deploy</Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Portfolio Tutorial: <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">Wireframe, Prototype, Front‑End, Deploy</span>
            </h1>
            <p className="mt-4 max-w-3xl text-zinc-700">
              Panduan ringkas namun lengkap untuk merancang portofolio dari nol: mulai dari sketsa di Figma, membuat prototipe UI/UX, membangun front‑end dengan Next.js + TypeScript + Tailwind, hingga publikasi ke Vercel.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#steps" className="rounded-xl bg-zinc-900 px-5 py-2.5 text-white shadow hover:bg-zinc-800">Mulai Langkah</a>
              <a href="#repo" className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 hover:bg-zinc-50">Lihat Contoh Kode</a>
            </div>

            {/* Tools Row */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <ToolBadge icon={SiFigma} label="Figma" />
              <ToolBadge icon={SiGithub} label="GitHub" />
              <ToolBadge icon={SiNextdotjs} label="Next.js" />
              <ToolBadge icon={SiReact} label="React" />
              <ToolBadge icon={SiTailwindcss} label="Tailwind CSS" />
              <ToolBadge icon={SiTypescript} label="TypeScript" />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-zinc-600">
              <div className="rounded-lg border border-zinc-200 bg-white p-3">Deploy target: <strong className="text-zinc-900">Vercel</strong> <span className="inline-block align-middle ml-2 text-xl"><SiVercel /></span></div>
              <div className="rounded-lg border border-zinc-200 bg-white p-3">Output: <strong className="text-zinc-900">Next.js App Router</strong>, Type‑safe</div>
              <div className="rounded-lg border border-zinc-200 bg-white p-3">Style: <strong className="text-zinc-900">Tailwind utility‑first</strong></div>
            </div>
          </div>
        </Container>
      </section>
{/* HERO (img biasa) */}
      <section className="mx-auto max-w-6xl px-6 mt-8">
        {/* HERO IMAGE */}
        <img
          alt="Portfolio Tutorial"
          title="portfolio sayeeee"
          src="/porto-eryca/por.jpg"
          className="h-full w-full object-cover rounded-2xl border"
        />
      </section>
      {/* OVERVIEW */}
      <Section id="overview" title="Ringkasan Alur">
        <ol className="grid gap-4 md:grid-cols-2">
          <StepCard order={1} title="Rancang Wireframe (Figma)">
            <ul>
              <li>Tentukan tujuan halaman: Hero, About, Projects, Contact.</li>
              <li>Atur grid/layout, sketsa low‑fidelity untuk fokus struktur.</li>
              <li>Buat komponen dasar: Navbar, Card, Footer.</li>
            </ul>
          </StepCard>
          <StepCard order={2} title="Prototype UI/UX (Figma)">
            <ul>
              <li>Naikkan fidelity: tipografi, warna (tokens), states & hover.</li>
              <li>Tambahkan flow interaksi (On click → Navigate, Variants).</li>
              <li>Uji klik cepat ke 3–5 orang, catat friksi lalu iterate.</li>
            </ul>
          </StepCard>
          <StepCard order={3} title="Setup Repo (GitHub)">
            <ul>
              <li>Init repo, buat branch <code>feat/initial-ui</code>.</li>
              <li>Aktifkan GitHub Actions (optional) untuk lint/test.</li>
            </ul>
            <Code>{`git init
git add -A
git commit -m "chore: init"
 git branch -M main
# ganti dengan repo kamu
 git remote add origin https://github.com/USER/REPO.git
 git push -u origin main`}</Code>
          </StepCard>
          <StepCard order={4} title="Scaffold Next.js + TypeScript + Tailwind">
            <p>Gunakan App Router + TypeScript + Tailwind.</p>
            <Code>{`npx create-next-app@latest portfolio \
  --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`}</Code>
            <ul>
              <li>Jalankan dev: <code>npm run dev</code> (default <code>http://localhost:3000</code>).</li>
              <li>Tambahkan react-icons (opsional): <code>npm i react-icons</code>.</li>
            </ul>
          </StepCard>
        </ol>
      </Section>

      {/* IMPLEMENTATION */}
      <Section id="steps" title="Implementasi Front‑End (Contoh Struktur)">
        <div className="grid gap-4 md:grid-cols-2">
          <StepCard order={5} title="Struktur Folder & Komponen">
            <Code>{`src/
  app/
    layout.tsx   // root layout, font, metadata
    page.tsx     // landing (Hero, Projects, Contact)
  components/
    ui/Button.tsx
    sections/Hero.tsx
    sections/ProjectGrid.tsx
    sections/Contact.tsx`}</Code>
            <ul>
              <li>Gunakan komponen kecil, reusable, dan typed props.</li>
              <li>Pastikan aksesibilitas: semantic HTML, <code>aria-*</code>, focus ring.</li>
            </ul>
          </StepCard>

          <StepCard order={6} title="Tailwind & Design Tokens">
            <ul>
              <li>Konfigurasi warna/spacing di <code>tailwind.config.ts</code>.</li>
              <li>Gunakan utility patterns: container, grid, aspect‑video.</li>
              <li>Tambahkan <code>hover</code>, <code>focus</code>, <code>motion-safe</code> untuk interaksi.</li>
            </ul>
          </StepCard>

          <StepCard order={7} title="SEO & Performance Dasar">
            <ul>
              <li>Isi <code>metadata</code> di <code>layout.tsx</code> (title, description, og:image).</li>
              <li>Optimalkan gambar (<code>&lt;Image /&gt;</code>), preload font, gunakan <code>font-display: swap</code>.</li>
              <li>Hindari CLS: set width/height atau gunakan <code>fill</code> + container fixed aspect.</li>
            </ul>
          </StepCard>

          <StepCard order={8} title="Deploy ke Vercel">
            <ul>
              <li>Push ke GitHub → Import Project di Vercel.</li>
              <li>Pilih framework: <strong>Next.js</strong>, set environment (jika ada).</li>
              <li>Auto Preview Deploy untuk setiap PR/branch.</li>
              <li>Set Custom Domain → aktifkan HTTPS (otomatis).</li>
            </ul>
          </StepCard>
        </div>
      </Section>

      {/* REPO & SNIPPETS */}
      <Section id="repo" title="Snippet Cepat Yang Berguna">
        <div className="grid gap-4 md:grid-cols-2">
          <StepCard order={9} title="Komponen Button (Contoh Tailwind)">
            <Code>{`type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2";
  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-400",
    ghost: "border border-zinc-300 bg-white hover:bg-zinc-50 focus:ring-zinc-300",
  } as const;
  return <button className={[base, variants[variant], className].join(" ")} {...props} />;
}`}</Code>
          </StepCard>

          <StepCard order={10} title="Section Hero (Contoh)">
            <Code>{`export function Hero() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Hi, I'm Eryca</h1>
        <p className="mt-3 text-zinc-600">Front‑End & UI/UX — I build reliable, fast, accessible web experiences.</p>
        <div className="mt-6 flex gap-3">
          <a className="rounded-xl bg-zinc-900 px-5 py-2.5 text-white" href="#projects">View Projects</a>
          <a className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5" href="#contact">Contact</a>
        </div>
      </div>
    </section>
  );
}`}</Code>
          </StepCard>
        </div>
      </Section>

      {/* CHECKLIST */}
      <Section id="checklist" title="Checklist Go‑Live">
        <ul className="grid gap-3 md:grid-cols-2">
          <li className="rounded-xl border border-zinc-200 bg-white p-3"><input type="checkbox" className="mr-2" />mengerti</li>
          <li className="rounded-xl border border-zinc-200 bg-white p-3"><input type="checkbox" className="mr-2" />paham</li>
          <li className="rounded-xl border border-zinc-200 bg-white p-3"><input type="checkbox" className="mr-2" />sangat paham</li>
          <li className="rounded-xl border border-zinc-200 bg-white p-3"><input type="checkbox" className="mr-2" />wow</li>
          <li className="rounded-xl border border-zinc-200 bg-white p-3"><input type="checkbox" className="mr-2" />keren</li>
          <li className="rounded-xl border border-zinc-200 bg-white p-3"><input type="checkbox" className="mr-2" />luar biasa</li>
        </ul>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ Singkat">
        <div className="space-y-4">
          <details className="rounded-xl border border-zinc-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">Kenapa Next.js + TypeScript + Tailwind?</summary>
            <p className="mt-2">Kombinasi ini cepat, aman (type‑safe), dan produktif. Tailwind mempercepat styling, TypeScript mencegah bug, Next.js memberi routing & optimasi built‑in.</p>
          </details>
          <details className="rounded-xl border border-zinc-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">Apakah perlu React terpisah?</summary>
            <p className="mt-2">Next.js sudah di atas React. Kamu tetap menulis komponen React, namun dengan fitur extra (routing, server components, API routes).</p>
          </details>
          <details className="rounded-xl border border-zinc-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">Apa alternatif Vercel?</summary>
            <p className="mt-2">Untuk static export bisa GitHub Pages. Namun untuk fitur Next.js lengkap (ISR/Edge/Server Actions), Vercel paling mulus.</p>
          </details>
        </div>
      </Section>

      {/* FOOTER CTA */}
      <section className="border-t border-zinc-200 bg-white py-10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Ayo Publish Website Pertamamu</h3>
              <p className="text-zinc-600">Push ke GitHub lalu Import ke Vercel uwalaaaa Go‑Live dalam hitungan detikkkk</p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-white hover:bg-zinc-800"
              >
                <SiVercel className="text-lg" /> Deploy on Vercel
              </a>
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 hover:bg-zinc-50"
              >
                <SiGithub className="text-lg" /> Create Repo
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
