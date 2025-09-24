"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ScrollText,
  Paintbrush,
  FileText,
  BarChart3,
  Palette,
  Figma,
  Monitor,
  Server,
  Newspaper,
  BookOpen,
  Sparkles,
  UserRound,
  Share2,
} from "lucide-react";

/** =========================
 *  Commission Page with Intro Overlay (sessionStorage + ?intro=1)
 *  ========================= */
export default function OpenCommissionPage() {
  const STORAGE_KEY = "visitorName_v2";
  const [name, setName] = useState("Friend");
  const [gateOpen, setGateOpen] = useState(true); // overlay on until session checked

  // Cek sessionStorage + dukung ?intro=1
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const forceIntro = params.get("intro") === "1";
      if (forceIntro) {
        setGateOpen(true);
        return;
      }
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved && saved.trim()) {
        setName(saved);
        setGateOpen(false);
      } else {
        setGateOpen(true);
      }
    } catch {
      setGateOpen(true);
    }
  }, []);

  // Lock/unlock scroll saat overlay tampil
  useEffect(() => {
    const html = document.documentElement;
    if (gateOpen) html.classList.add("overflow-hidden");
    else html.classList.remove("overflow-hidden");
    return () => html.classList.remove("overflow-hidden");
  }, [gateOpen]);

  const closeGate = (n: string) => {
    const v = (n || "").trim() || "Friend";
    try {
      sessionStorage.setItem(STORAGE_KEY, v);
    } catch {}
    setName(v);
    setGateOpen(false); // unmount overlay
  };

  return (
    <main
      className={[
        "relative min-h-screen",
        "bg-[url('/porto-eryca/bg-mua.png')] bg-no-repeat",
        "bg-top bg-cover",
        "md:bg-fixed md:bg-center md:bg-cover",
        "text-neutral-900",
      ].join(" ")}
    >
      <StoryCover name={name} />
      <StorySpread />
      <Packages />
      <CTASection />

      {gateOpen && (
        <IntroGate onSubmit={closeGate} onSkip={() => closeGate("Friend")} />
      )}
    </main>
  );
}

/* ---------- Intro Gate (overlay fixed menutup navbar) ---------- */
function IntroGate({
  onSubmit,
  onSkip,
}: {
  onSubmit: (name: string) => void;
  onSkip: () => void;
}) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const handleContinue = () => {
    setTouched(true);
    if (value.trim().length >= 2) onSubmit(value);
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_0%,#fff5ea,transparent)]" />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />

      {/* card */}
      <div className="relative mx-auto w-[90%] max-w-lg rounded-3xl border border-[#ecd9c7] bg-white/90 p-8 shadow-[0_40px_120px_-40px_rgba(104,65,40,0.35)]">
        <h1 className="text-center font-serif text-3xl text-[#5a3b25]">
          Selamat datang ✨
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-700">
          Sebelum mulai, kenalan dulu yuk—tulis namamu biar halamannya terasa
          lebih personal.
        </p>

        <label className="mt-6 block text-sm font-medium text-[#6e482c]">
          Namamu
        </label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleContinue()}
          placeholder="mis. Eryca"
          className="mt-2 w-full rounded-xl border border-[#e6cbb4] bg-white/10 px-4 py-3 outline-none focus:border-[#c99a73]"
        />
        {touched && value.trim().length < 2 && (
          <p className="mt-2 text-xs text-rose-600">Minimal 2 huruf ya 😊</p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onSkip}
            className="text-sm text-neutral-600 underline underline-offset-4 hover:text-neutral-800"
          >
            Lewati saja
          </button>
          <button
            onClick={handleContinue}
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white
                       bg-gradient-to-r from-[#a66b3f] via-[#8f623e] to-[#6e482c]
                       shadow-md hover:shadow-lg transition-all"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Cover (halaman sampul) ---------- */
function StoryCover({ name }: { name: string }) {
  return (
    <header className="relative isolate overflow-hidden">
      {/* background kertas + noise */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_600px_at_10%_0%,#fdebdc,transparent),radial-gradient(900px_600px_at_90%_0%,#ffe9d3,transparent)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(3000px_1200px_at_50%_0%,#000_60%,transparent)] opacity-[0.15] bg-[url('/textures/noise.png')]" />
      </div>

      {/* bingkai ornament */}
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-28 md:pb-20">
        <OrnateFrame>
          <div className="grid items-center gap-10 md:grid-cols-12">
            {/* Judul kiri */}
            <div className="md:col-span-7">
              <p className="text-xs tracking-[0.35em] uppercase text-[#b08155]">
                Portfolio Commissions
              </p>
              <h1 className="mt-2 font-serif text-5xl leading-tight sm:text-6xl text-[#5a3b25]">
                Open <span className="italic">Commissions</span>
              </h1>

              {/* sapaan personal */}
              <p className="mt-2 text-sm text-[#8b6a4e]">Halo, {name}! 👋</p>

              {/* storytelling intro */}
              <p className="mt-3 max-w-prose text-[15px] leading-7 text-neutral-700">
                Seperti membuka halaman pertama sebuah buku dongeng, setiap
                komisi adalah perjalanan baru. Dari ilustrasi penuh warna hingga
                spot-art untuk desain modern, aku membantumu mewujudkan ide,
                brand, atau kisah pribadimu menjadi visual yang hangat dan
                bercerita—siap untuk layar digital maupun cetak.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white
                           bg-gradient-to-r from-[#a66b3f] via-[#8f623e] to-[#6e482c]
                           shadow-md hover:shadow-lg transition-all"
                >
                  <Sparkles size={16} /> Start a Project
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e6cbb4] bg-white/70 px-4 py-2 text-xs">
                  <Paintbrush size={14} /> Watercolor • Painterly • Soft-glow
                </span>
              </div>
            </div>

            {/* Ilustrasi kanan (sampul) */}
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-lg">
                <Image
                  src="/images/commission/cover.jpg"
                  alt="Storybook cover artwork"
                  fill
                  className="object-cover"
                  priority
                />
                {/* glare */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 mix-blend-overlay" />
              </div>
              <p className="mt-2 text-center text-[11px] text-neutral-500">
                by eryca dhm
              </p>
            </div>
          </div>
        </OrnateFrame>
      </div>

      {/* page number ala buku */}
      <div className="relative mx-auto max-w-6xl px-6 pb-6">
        <div className="flex items-center justify-between text-[11px] text-[#9a7a5b]">
          <span>Fairy Chronicle • Vol. 01</span>
          <span>p. 1</span>
        </div>
      </div>
    </header>
  );
}

/* ---------- Spread / Body (teks kiri, ilustrasi kanan) ---------- */
function StorySpread() {
  return (
    <section className="relative isolate">
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#f7efe7] to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* teks kiri */}
          <article className="md:col-span-6 lg:col-span-5">
            <p className="text-xs tracking-[0.3em] uppercase text-[#b08155]">
              Chapter I
            </p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl text-[#5a3b25]">
              The Garden of Hope
            </h2>

            <div className="prose prose-neutral mt-4 max-w-none text-[15px] leading-7">
              <p>
                Kamu bisa mulai dari coretan hitam-putih, atau langsung ke warna
                penuh. Untuk brand maupun karya pribadi, kita bisa membuat
                ilustrasi editorial yang pas untuk layout A4/A5, feed sosial,
                atau bahkan poster cetak.
              </p>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-neutral-700">
              <li className="flex gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#64a873]" />
                1–2 round revisi ringan per tahap (sketch → color)
              </li>
              <li className="flex gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#64a873]" />
                File akhir: PNG/JPG 4K + PDF cetak (bleed opsional)
              </li>
              <li className="flex gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#64a873]" />
                Lisensi personal/komersial fleksibel
              </li>
            </ul>
          </article>

          {/* ilustrasi kanan */}
          <figure className="md:col-span-6 lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-lg">
              <Image
                src="/images/commission/scene-1.jpg"
                alt="Story spread artwork"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(90deg,transparent,transparent_28px,#ffffff1a_28px,#ffffff1a_29px)] mix-blend-overlay opacity-40" />
            </div>
            <figcaption className="mt-2 text-center text-[11px] text-neutral-500">
              Layout mirip spread majalah: teks kiri, ilustrasi penuh di kanan.
            </figcaption>
          </figure>
        </div>

        {/* page number */}
        <div className="mt-6 flex items-center justify-between text-[11px] text-[#9a7a5b]">
          <span>Commission Guide</span>
          <span>p. 2</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Paket & Pricing (ikon + 4 kolom responsif) ---------- */
function Packages() {
  const items = [
    {
      title: "Story Portrait",
      desc: "Satu karakter dengan latar sederhana — cocok untuk profil, hadiah, atau cerita pribadimu.",
      price: "mulai dari IDR 250k",
      spec: ["A4 300dpi", "1x sketch + 1x color fix", "Personal use"],
      icon: <UserRound size={18} className="text-[#6e482c]" />,
    },
    {
      title: "Editorial Spot",
      desc: "Ilustrasi bergaya buku/majalah yang pas untuk artikel, konten brand, atau feed media sosial.",
      price: "mulai dari IDR 450k",
      spec: ["Custom ratio", "Brand palette", "Commercial add-on"],
      icon: <Newspaper size={18} className="text-[#6e482c]" />,
    },
    {
      title: "Full Spread",
      desc: "Dua halaman penuh layaknya majalah — teks di satu sisi, ilustrasi besar di sisi lain.",
      price: "mulai dari IDR 900k",
      spec: ["A4 x2 300dpi", "Print-ready PDF", "Layout assist"],
      icon: <BookOpen size={18} className="text-[#6e482c]" />,
    },
    {
      title: "Social Media Design",
      desc: "Desain feed, story, atau konten promo untuk Instagram, TikTok, dan platform lain.",
      price: "mulai dari IDR 50k",
      spec: ["1080x1080 px", "Format JPG/PNG", "1x revisi ringan"],
      icon: <Share2 size={18} className="text-[#6e482c]" />,
    },
    {
      title: "Presentation / PPT Design",
      desc: "Slide deck yang rapi & estetik untuk pitching, kuliah, atau laporan bisnis.",
      price: "mulai dari IDR 50k",
      spec: ["Template konsisten", "Ikon & visual custom", "Export PPTX + PDF"],
      icon: <FileText size={18} className="text-[#6e482c]" />,
    },
    {
      title: "Poster / Infografis",
      desc: "Poster event atau infografis informatif dengan layout jelas & warna kuat.",
      price: "mulai dari IDR 50k",
      spec: ["Ukuran A3/A4", "Siap cetak & digital", "2x revisi ringan"],
      icon: <BarChart3 size={18} className="text-[#6e482c]" />,
    },
    {
      title: "Custom Illustration",
      desc: "Ilustrasi bebas (karakter, scene, atau konsep unik) sesuai kebutuhan personal maupun komersial.",
      price: "mulai dari IDR 300k",
      spec: [
        "High-res PNG/JPG",
        "Pilihan gaya watercolor/digital",
        "Lisensi fleksibel",
      ],
      icon: <Paintbrush size={18} className="text-[#6e482c]" />,
    },
    {
      title: "Graphic Design Pack",
      desc: "Logo sederhana, banner, kartu nama, dan materi grafis ringan lainnya.",
      price: "mulai dari IDR 150k",
      spec: ["Vector-based", "Export PNG/SVG", "Brand color applied"],
      icon: <Palette size={18} className="text-[#6e482c]" />,
    },
    {
      title: "Mockup Prototype UI/UX",
      desc: "Desain interaktif untuk aplikasi mobile atau website sebelum development.",
      price: "mulai dari IDR 500k",
      spec: ["Figma/Adobe XD file", "Interactive prototype", "User flow basic"],
      icon: <Figma size={18} className="text-[#6e482c]" />,
    },
    {
      title: "Website Frontend",
      desc: "Landing page / portfolio / company profile dengan tampilan modern & responsif.",
      price: "mulai dari IDR 1.5jt",
      spec: ["React/Next.js", "Tailwind CSS", "Responsive layout"],
      icon: <Monitor size={18} className="text-[#6e482c]" />,
    },
    {
      title: "Website Backend",
      desc: "Sistem server-side untuk aplikasi, API, database, dan autentikasi.",
      price: "mulai dari IDR 2jt",
      spec: ["Node.js/Express", "REST API/GraphQL", "Database MySQL/MongoDB"],
      icon: <Server size={18} className="text-[#6e482c]" />,
    },
  ];

  return (
    <section className="relative isolate py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex items-center gap-2 text-[#5a3b25]">
          <ScrollText size={18} />
          <h3 className="font-serif text-2xl">Packages</h3>
        </div>

        {/* 1 → 2 → 3 → 4 kolom */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((it) => (
            <li
              key={it.title}
              className="rounded-2xl border border-[#ecd9c7] bg-white/70 p-4 md:p-5 shadow-[0_6px_30px_-20px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center gap-2">
                {it.icon}
                <h4 className="font-serif text-lg md:text-xl text-[#5a3b25]">
                  {it.title}
                </h4>
              </div>

              <p className="mt-1 text-[13px] md:text-sm leading-6 text-neutral-700">
                {it.desc}
              </p>

              <ul className="mt-3 space-y-1 text-[13px] md:text-sm text-neutral-700">
                {it.spec.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#64a873]" />
                    {s}
                  </li>
                ))}
              </ul>

              <p className="mt-3 md:mt-4 font-medium text-[#6e482c]">
                {it.price}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Call to Action ---------- */
function CTASection() {
  return (
    <section id="contact" className="relative isolate pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-[#ecd9c7] bg-gradient-to-br from-white to-[#fff3e7] p-6 md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <h3 className="font-serif text-2xl text-[#5a3b25]">
                Siap membuka lembar cerita barumu?
              </h3>
              <p className="mt-1 text-sm text-neutral-700">
                Kamu bisa DM aku di Instagram @erycadhm atau langsung kirim
                brief singkat: tema, ukuran, tujuan penggunaan, dan deadline.
                Mari kita mulai perjalanan kreatif ini bersama.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href="mailto:hello@example.com?subject=Commission%20Inquiry"
                className="inline-flex rounded-full bg-[#6e482c] px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-[#5a3b25]"
              >
                Email Brief
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ornamental frame (garis melengkung) ---------- */
function OrnateFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[28px] border border-[#e8d2bf] bg-white/70 p-6 md:p-8 shadow-[0_30px_120px_-60px_rgba(104,65,40,0.45)]">
      {/* sudut ornament sederhana */}
      <span className="pointer-events-none absolute -left-2 -top-2 h-6 w-6 rounded-full border border-[#e8d2bf] bg-[#fff6ee]" />
      <span className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 rounded-full border border-[#e8d2bf] bg-[#fff6ee]" />
      <span className="pointer-events-none absolute -left-2 -bottom-2 h-6 w-6 rounded-full border border-[#e8d2bf] bg-[#fff6ee]" />
      <span className="pointer-events-none absolute -right-2 -bottom-2 h-6 w-6 rounded-full border border-[#e8d2bf] bg-[#fff6ee]" />
      {children}
    </div>
  );
}
