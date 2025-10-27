import React from "react";
import {
  SiFigma,
  SiGithub,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiNetlify, // ✅ ditambahkan
} from "react-icons/si";

// Small UI primitives
function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6">{children}</div>;
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
    <section id={id} className="scroll-mt-24 py-10 md:py-14">
      <Container>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          {title}
        </h2>
        <div className="text-base leading-relaxed text-zinc-700">
          {children}
        </div>
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

function ToolBadge({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
      <span className="text-2xl">
        <Icon />
      </span>
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

function StepCard({
  order,
  title,
  children,
}: {
  order: number;
  title: string;
  children: React.ReactNode;
}) {
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
              <Badge>Front-End</Badge>
              <Badge>Deploy</Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Portfolio Tutorial:{" "}
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
                Wireframe, Prototype, Front-End, Deploy
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-zinc-700">
              Panduan ringkas namun lengkap untuk merancang portofolio dari nol:
              mulai dari sketsa di Figma, membuat prototipe UI/UX, membangun
              front-end dengan Next.js + TypeScript + Tailwind, hingga publikasi
              ke Vercel.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#steps"
                className="rounded-xl bg-zinc-900 px-5 py-2.5 text-white shadow hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              >
                Mulai Langkah
              </a>
              <a
                href="#repo"
                className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
              >
                Lihat Contoh Kode
              </a>
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
              <div className="rounded-lg border border-zinc-200 bg-white p-3">
                Deploy target: <strong className="text-zinc-900">Vercel</strong>{" "}
                <span className="inline-block align-middle ml-2 text-xl">
                  <SiVercel />
                </span>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-3">
                Output:{" "}
                <strong className="text-zinc-900">Next.js App Router</strong>,
                Type-safe
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-3">
                Style:{" "}
                <strong className="text-zinc-900">
                  Tailwind utility-first
                </strong>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HERO (img biasa) */}
      <section className="mx-auto max-w-6xl px-6 mt-8">
        <img
          alt="Portfolio Tutorial"
          title="Portfolio Tutorial Preview"
          src="/porto-eryca/por.jpg"
          className="h-full w-full object-cover rounded-2xl border"
        />
      </section>

      {/* Tahap Pertama  */}
      <Section
        id="overview"
        title="Tahap Pertama Merancang dan Membuat Project Portfolio"
      >
        <ol className="grid gap-4 md:grid-cols-2">
          <StepCard order={1} title="Riset & Sketsa (Blueprint)">
            <ul>
              <li>1. Mengumpulkan informasi apa yang mau dimasukkan dalam portfolio</li>
              <li>2. Mengumpulkan referensi desain yang sesuai dengan gaya yang diinginkan.</li>
              <li>3. Merancang Blueprint (sketsa kasar)</li>
            </ul>
          </StepCard>

          <StepCard order={2} title="Rancang Wireframe (Figma)">
            <ul>
              <li>1. Tentukan tujuan halaman: Hero, About, Projects, Contact.</li>
              <li>2. Atur grid/layout, sketsa low-fidelity untuk fokus struktur.</li>
              <li>3. Membagi ke dalam 3 bagian besar: Navbar, Body, Footer</li>
              <li>4. Membuat Komponen Reusable: Card, Button, Input, Logo</li>
            </ul>
          </StepCard>

          <StepCard order={3} title="Membuat Prototype UI/UX (Figma)">
            <ul>
              <li>1. Naikkan fidelity: tipografi, warna (tokens), states & hover.</li>
              <li>2. Tambahkan flow interaksi (On click → Navigate, Variants).</li>
              <li>3. Uji klik cepat ke 3–5 orang, catat friksi lalu iterate.</li>
            </ul>
          </StepCard>

          <StepCard order={4} title="Setup Repo (GitHub)">
            <ul>
              <li>1. Init repo, buat branch <code>feat/initial-ui</code>.</li>
              <li>2. Aktifkan GitHub Actions (opsional) untuk lint/test.</li>
            </ul>
            <Code>{`git init
git add -A
git commit -m "chore: init"
git branch -M main
# ganti dengan repo kamu
git remote add origin https://github.com/USER/REPO.git
git push -u origin main`}</Code>
          </StepCard>

          <StepCard order={5} title="Scaffold Next.js + TypeScript + Tailwind">
            <p>Gunakan App Router + TypeScript + Tailwind.</p>
            <Code>{`npx create-next-app@latest portfolio \
  --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`}</Code>
            <ul>
              <li>1. Jalankan dev: <code>npm run dev</code> (default <code>http://localhost:3000</code>).</li>
              <li>2. Tambahkan react-icons (opsional): <code>npm i react-icons</code>.</li>
            </ul>
          </StepCard>
        </ol>
      </Section>

     {/* IMPLEMENTATION 2 */}
      <Section id="steps" title="Tahap Kedua Implementasi FrontEnd">
        <div className="grid gap-4 md:grid-cols-2">
          <StepCard order={6} title="Struktur Folder & Komponen">
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
              <li>1. Gunakan komponen kecil, reusable, dan typed props.</li>
              <li>
                2. Pastikan aksesibilitas: semantic HTML, <code>aria-*</code>,
                focus ring.
              </li>
            </ul>
          </StepCard>

          <StepCard order={7} title="Tailwind & Design Tokens">
            <ul>
              <li>
                1. Konfigurasi warna/spacing di <code>tailwind.config.ts</code>.
              </li>
              <li>2. Gunakan utility patterns: container, grid, aspect‑video.</li>
              <li>
                3. Tambahkan <code>hover</code>, <code>focus</code>,{" "}
                <code>motion-safe</code> untuk interaksi.
              </li>
            </ul>
          </StepCard>

          <StepCard order={8} title="SEO & Performance Dasar">
            <ul>
              <li>
                1. Isi <code>metadata</code> di <code>layout.tsx</code> (title,
                description, og:image).
              </li>
              <li>
                2. Optimalkan gambar (<code>&lt;Image /&gt;</code>), preload font,
                gunakan <code>font-display: swap</code>.
              </li>
              <li>
                3. Hindari CLS: set width/height atau gunakan <code>fill</code> +
                container fixed aspect.
              </li>
            </ul>
          </StepCard>

        </div>
      </Section>

      {/* IMPLEMENTATION 3 */}
      <Section id="steps" title="Tahap Ketiga Deploy Website Portfolio">
        <div className="grid gap-4 md:grid-cols-2">
          <StepCard order={8} title="Testing & Debugging">
            <ul>
              <li>1. Cek linting: <code>npm run lint</code>.</li>
              <li>2. Jalankan test: <code>npm run test</code>.</li>
              <li>3. Periksa aksesibilitas: gunakan Lighthouse atau axe-core.</li>
            </ul>
          </StepCard>

          <StepCard order={9} title="Deploy ke Vercel atau GitHub Pages">
            <ul>
              <li>1. Push ke GitHub → Import Project di Vercel.</li>
              <li>2. Pilih framework: <strong>Next.js</strong>, set environment (jika ada).</li>
              <li>3. Auto Preview Deploy untuk setiap PR/branch.</li>
              <li>4. Set Custom Domain → aktifkan HTTPS (otomatis).</li>
            </ul>
          </StepCard>
        </div>
      </Section>

      {/* ===== Deploy Options (Responsive) ===== */}
      <section id="deploy" className="scroll-mt-24 my-12 mx-auto max-w-6xl px-6">
        <h2 className="font-serif text-2xl md:text-3xl mb-4">Deploy Options</h2>
        <p className="text-neutral-700 mb-6">
          Tiga cara mudah untuk menerbitkan situs. Pilih sesuai kebutuhan proyek.
          Semuanya <strong>mobile-friendly</strong> dan prosesnya sederhana.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* GitHub Pages */}
          <article className="rounded-2xl border bg-white/75 backdrop-blur p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <header className="flex items-center gap-3 mb-3">
              <SiGithub className="text-2xl" aria-hidden />
              <h3 className="text-lg font-semibold">GitHub Pages</h3>
            </header>
            <p className="text-sm text-neutral-700">
              Gratis & sederhana. Cocok untuk <em>static site</em> (HTML/CSS/JS)
              atau Next.js hasil <code>export</code>. Tidak mendukung SSR/Server Actions.
            </p>
            <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
              <li>Push kode ke repo GitHub (public/private).</li>
              <li>
                Aktifkan <em>Pages</em> dari <code>Settings → Pages</code> (branch <code>gh-pages</code> atau folder <code>/docs</code>).
              </li>
              <li>
                <strong>Next.js static export</strong> (opsional):
                <pre className="mt-2 overflow-auto rounded-md bg-neutral-100 p-3 text-xs">{`// next.config.ts
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // ganti sesuai nama repo:
  basePath: '/wihara-site',
  assetPrefix: '/wihara-site',
};
export default nextConfig;

// package.json
// "build": "next build && next export -o out"
// lalu salin folder out → docs, commit & push`}</pre>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://docs.github.com/pages"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs hover:bg-neutral-50"
                aria-label="Buka dokumentasi GitHub Pages"
              >
                Docs
              </a>
            </div>
          </article>

          {/* Vercel */}
          <article className="rounded-2xl border bg-white/75 backdrop-blur p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <header className="flex items-center gap-3 mb-3">
              <SiVercel className="text-2xl" aria-hidden />
              <h3 className="text-lg font-semibold">Vercel</h3>
            </header>
            <p className="text-sm text-neutral-700">
              Rekomendasi untuk Next.js: mendukung SSR, Edge Functions,
              Image Optimization, & Preview Deploy otomatis dari PR.
            </p>
            <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
              <li>Login, import repo GitHub, klik “Deploy”.</li>
              <li>Environment variable & domain custom mudah diatur dari dashboard.</li>
              <li>Untuk proyek static (HTML/CSS/JS) juga bisa — pilih <em>Other</em>.</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs hover:bg-neutral-50"
                aria-label="Buka Vercel deploy"
              >
                Deploy
              </a>
              <a
                href="https://vercel.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs hover:bg-neutral-50"
                aria-label="Buka dokumentasi Vercel"
              >
                Docs
              </a>
            </div>
          </article>

          {/* Netlify */}
          <article className="rounded-2xl border bg-white/75 backdrop-blur p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <header className="flex items-center gap-3 mb-3">
              <SiNetlify className="text-2xl" aria-hidden />
              <h3 className="text-lg font-semibold">Netlify</h3>
            </header>
            <p className="text-sm text-neutral-700">
              CI/CD sederhana, form handling, redirects, & functions. Opsi
              bagus untuk static site dan Next.js (tanpa fitur server-only).
            </p>
            <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
              <li>Hubungkan repo → pilih branch → Netlify build otomatis.</li>
              <li>
                Static site: atur <code>build command</code> &{" "}
                <code>publish directory</code> (misal <code>dist</code> atau <code>out</code>).
              </li>
              <li>
                Next.js static export: gunakan <code>next build && next export</code> lalu publish folder <code>out</code>.
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://app.netlify.com/start"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs hover:bg-neutral-50"
                aria-label="Mulai deploy di Netlify"
              >
                Deploy
              </a>
              <a
                href="https://docs.netlify.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs hover:bg-neutral-50"
                aria-label="Buka dokumentasi Netlify"
              >
                Docs
              </a>
            </div>
          </article>
        </div>

        {/* Catatan kompatibilitas singkat */}
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Catatan penting:</strong> Jika kamu memakai fitur Next.js yang
          <em> server-only</em> (SSR, Server Actions, Route Handlers dinamis, dsb.),
          pilih <u>Vercel</u>. Untuk GitHub Pages/Netlify dengan <code>export</code>,
          pastikan aplikasi bisa dibangun sebagai <em>static site</em> (atur <code>basePath</code>/<code>assetPrefix</code> bila perlu).
        </div>
      </section>
      {/* ===== /Deploy Options ===== */}

  
      {/* CHECKLIST */}
      <Section id="checklist" title="Checklist Go-Live">
        <ul className="grid gap-3 md:grid-cols-2">
          <li className="rounded-xl border border-zinc-200 bg-white p-3">
            <input type="checkbox" className="mr-2" /> Tahap 1
          </li>
          <li className="rounded-xl border border-zinc-200 bg-white p-3">
            <input type="checkbox" className="mr-2" /> Tahap 2
          </li>
          <li className="rounded-xl border border-zinc-200 bg-white p-3">
            <input type="checkbox" className="mr-2" /> Tahap 3
          </li>    
        </ul>
      </Section>

      {/* FAQ */}
   {/* FAQ */}
<Section id="faq" title="FAQ Singkat">
  <div className="space-y-4">
    <details className="rounded-xl border border-zinc-200 bg-white p-4">
      <summary className="cursor-pointer font-semibold">
        Kenapa Next.js + TypeScript + Tailwind?
      </summary>
      <p className="mt-2">
        Kombinasi ini cepat, aman (type-safe), dan produktif. Tailwind mempercepat
        styling, TypeScript mencegah bug, Next.js memberi routing & optimasi built-in.
      </p>
    </details>

    <details className="rounded-xl border border-zinc-200 bg-white p-4">
      <summary className="cursor-pointer font-semibold">Apakah perlu React terpisah?</summary>
      <p className="mt-2">
        Next.js sudah di atas React. Kamu tetap menulis komponen React, namun dengan fitur ekstra
        (routing, server components, API routes).
      </p>
    </details>

    <details className="rounded-xl border border-zinc-200 bg-white p-4">
      <summary className="cursor-pointer font-semibold">Apa alternatif Vercel?</summary>
      <p className="mt-2">
        Untuk static export bisa GitHub Pages. Namun untuk fitur Next.js lengkap
        (ISR/Edge/Server Actions), Vercel paling mulus.
      </p>
    </details>

    {/* NEW: GitHub Pages */}
    <details className="rounded-xl border border-zinc-200 bg-white p-4">
      <summary className="cursor-pointer font-semibold">Bagaimana deploy ke GitHub Pages?</summary>
      <div className="mt-2 space-y-2">
        <p>Gunakan <em>static export</em> (tanpa SSR/Server Actions):</p>
        <ul className="list-disc pl-5">
          <li>Set <code>output: export</code> di <code>next.config.ts</code> dan sesuaikan <code>basePath</code>/<code>assetPrefix</code> dengan nama repo.</li>
          <li>Build: <code>next build && next export -o out</code>.</li>
          <li>Pindah isi <code>out</code> ke folder <code>docs</code> (atau pakai branch <code>gh-pages</code>), aktifkan <strong>Settings → Pages</strong>.</li>
        </ul>
        <Code>{`// next.config.ts
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // ganti sesuai nama repo:
  basePath: '/nama-repo',
  assetPrefix: '/nama-repo',
}
export default nextConfig

// package.json
// "build": "next build && next export -o out"
// (opsi) salin isi 'out' ke 'docs' lalu push`}</Code>
        <p className="text-sm text-zinc-600">
          Catatan: GitHub Pages tidak mendukung SSR. Pastikan semua halaman dapat di-generate statis.
        </p>
      </div>
    </details>

    {/* NEW: Vercel */}
    <details className="rounded-xl border border-zinc-200 bg-white p-4">
      <summary className="cursor-pointer font-semibold">Bagaimana deploy ke Vercel?</summary>
      <div className="mt-2 space-y-2">
        <p>Langkah ringkas (paling cocok untuk Next.js penuh fitur):</p>
        <ul className="list-disc pl-5">
          <li>Push ke GitHub → <strong>Import Project</strong> di Vercel → pilih framework <strong>Next.js</strong>.</li>
          <li>Set environment variables (jika ada), lalu klik <strong>Deploy</strong>.</li>
          <li>Preview Deploy otomatis untuk setiap PR/branch; atur custom domain + HTTPS.</li>
        </ul>
        <p className="text-sm text-zinc-600">
          Kelebihan: dukung SSR, ISR, Edge Functions, Image Optimization, dan Server Actions.
        </p>
      </div>
    </details>

    {/* NEW: Netlify */}
    <details className="rounded-xl border border-zinc-200 bg-white p-4">
      <summary className="cursor-pointer font-semibold">Bagaimana deploy ke Netlify?</summary>
      <div className="mt-2 space-y-2">
        <p>Untuk proyek <em>static export</em> atau SPA:</p>
        <ul className="list-disc pl-5">
          <li>Connect repo → pilih branch → Netlify build otomatis.</li>
          <li>Set <strong>Build command</strong>: <code>next build && next export</code>, <strong>Publish directory</strong>: <code>out</code>.</li>
          <li>(Opsional SPA fallback) tambahkan file <code>_redirects</code> agar route client-side tetap aman.</li>
        </ul>
        <Code>{`# _redirects (opsional untuk SPA)
/*    /index.html   200`}</Code>
        <p className="text-sm text-zinc-600">
          Catatan: untuk fitur Next.js yang server-only, lebih cocok ke Vercel. Netlify unggul di CI/CD sederhana, forms, dan redirects.
        </p>
      </div>
    </details>
  </div>
</Section>


      {/* FOOTER CTA */}
      <section className="border-t border-zinc-200 bg-white py-10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Ayo Publish Website Pertamamu</h3>
              <p className="text-zinc-600">
                Push ke GitHub lalu Import ke Vercel — Go-Live dalam hitungan detik.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-white hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                aria-label="Deploy on Vercel"
              >
                <SiVercel className="text-lg" /> Deploy on Vercel
              </a>
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                aria-label="Create GitHub Repository"
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
