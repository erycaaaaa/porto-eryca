// src/app/makeup/page.tsx
"use client";

import Image from "next/image";

// ---- tokens ----
const SERIF = "font-serif";
const BODY = "text-neutral-800";
const MUTED = "text-neutral-600";
const CARD = "rounded-3xl border border-neutral-200 bg-white shadow-sm";
const PANEL = "rounded-[32px] border border-neutral-200 bg-white shadow-sm";
const HERO_GRAD =
  "bg-[radial-gradient(1400px_900px_at_20%_-10%,#fafafa_0%,#f4f4f5_45%,#f9fafb_80%)]";

export default function MakeupPortfolioPage() {
  return (
    <main id="makeup" className={`min-h-screen ${BODY} ${HERO_GRAD}`}>
      {/* Topbar (simple) */}
      <header className="sticky top-0 z-30 border-b border-neutral-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="#makeup" className={`${SERIF} text-xl font-semibold`}>Eryca</a>
          <ul className="hidden items-center gap-6 text-sm sm:flex">
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#portfolio" className="hover:underline">Portfolio</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
          <a
            href="https://wa.me/6281234567890?text=Hi%20Eryca%2C%20saya%20ingin%20booking%20makeup."
            target="_blank"
            className="hidden rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white sm:inline-block"
          >
            Collaboration With Me ^^ →
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative isolate">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pt-16 pb-6 sm:pt-20">
          <div className="relative overflow-hidden rounded-[36px] border border-neutral-200 bg-neutral-50">
            <Image
              src="/porto-eryca/bg1.svg"
              alt="Makeup monochrome hero"
              fill
              priority
              className="object-cover grayscale"
            />
            <div className="relative z-10 mx-auto flex min-h-[42vh] max-w-3xl flex-col items-center justify-center p-8 text-center sm:min-h-[56vh]">
              <p className="mb-2 text-[11px] tracking-[0.28em] uppercase text-neutral-500">
                Built for Portfolio
              </p>
              <h1 className={`${SERIF} text-5xl leading-tight sm:text-6xl`}>
                Timeless Makeup
                <br />
                in Black & White
              </h1>
              <p className={`mt-4 max-w-2xl ${MUTED}`}>
                Soft glam, camera-ready looks with a skin-first approach. Minimal,
                elegant, and confidently you.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="#services"
                  className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
                >
                  Explore Services
                </a>
                <a
                  href="#portfolio"
                  className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800"
                >
                  View Works
                </a>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

 
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-500">About Eryca</p>
          <h2 className={`${SERIF} mt-2 text-3xl sm:text-4xl`}>Muse MUA, based in Jakarta.</h2>
          <p className={`mt-4 ${MUTED}`}>
            Mengutamakan kenyamanan kulit dengan hasil yang rapi dan tahan lama. Setiap
            look dirancang untuk terasa ringan dilihat langsung maupun di kamera.
          </p>
          <a href="#contact" className="mt-6 inline-flex rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white">Learn More</a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-neutral-200 bg-neutral-100">
          <Image src="/porto-eryca/profile.png" alt="About image" fill className="object-cover grayscale" />
        </div>
      </section>

      {/* LOGOS (optional) */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <ul className="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale">
          {['Meta','Peloton','Supreme','North','Prada','Chanel','Pandora'].map((n) => (
            <li key={n} className="h-6 w-28 rounded bg-neutral-200" aria-hidden />
          ))}
        </ul>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className={`${SERIF} text-3xl sm:text-4xl`}>Selected Works</h2>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs text-neutral-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Open for bookings
          </span>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { src: "/porto-eryca/mar.jpg", alt: "Soft glam — clean skin bu Marettadrie" },
            { src: "/porto-eryca/mua1.jpeg",           alt: "Dewy minimal eye by Vindy" },
            { src: "/porto-eryca/mua2.jpg",            alt: "Party Look by Azti" },
            { src: "/porto-eryca/mua4.png",            alt: "Party Look by Azti" },
          ].map((g, i) => (
            <li key={i} className={`${CARD} relative aspect-[4/5] overflow-hidden`}>
              {/* FOTO WAJIB ADA */}
              <Image
                src={g.src}
                alt={g.alt}
                fill
                className="object-cover grayscale"
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                priority={i < 2} // biar 2 pertama cepat
              />
              {/* overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            </li>
          ))}
        </ul>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-16">
        <div className={`${PANEL} p-10 text-center`}>
          <h3 className={`${SERIF} text-3xl sm:text-4xl`}>Ready to collaborate?</h3>
          <p className={`mx-auto mt-3 max-w-xl ${MUTED}`}>
            Available for bridal, prewedding, graduation and events. On-location by request.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:hello@yourmail.com?subject=Makeup%20Booking%20Inquiry"
              className="rounded-full bg-neutral-900 px-7 py-4 text-sm font-semibold text-white"
            >
              Email Inquiry
            </a>
            <a
              href="https://wa.me/6281234567890?text=Hi%20Eryca%2C%20saya%20ingin%20booking%20makeup."
              target="_blank"
              className="rounded-full border border-neutral-300 px-7 py-4 text-sm font-semibold text-neutral-800"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="pb-10 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Eryca — Makeup Portfolio
      </footer>
    </main>
  );
}
