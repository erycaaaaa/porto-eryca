// src/app/makeup/page.tsx
"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { SiReact, SiFigma } from "react-icons/si";

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
      {/* Topbar */}
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
            href="https://wa.me/6285871154799?text=Hi%20Eryca%2C%20saya%20ingin%20booking%20makeup."
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
              src="/porto-eryca/bg-baru.png"
              alt="Makeup monochrome hero"
              fill
              priority
              className="object-cover grayscale"
            />
            <div className="relative z-10 mx-auto flex min-h-[42vh] max-w-3xl flex-col items-center justify-center p-8 text-center sm:min-h-[56vh]">
              <h1 className="text-5xl sm:text-6xl leading-tight">
                <span className="block font-[Great_Vibes] text-4xl sm:text-5xl text-neutral-900 drop-shadow-md">
                  Muse
                </span>
                <span className="block font-serif font-bold tracking-wide text-black sm:text-7xl">
                  ERYCA
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-sm italic text-neutral-400">
                More than a face, <br />
                I am the canvas where beauty tells its story. <br />
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href="#services" className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white">
                  Explore Services
                </a>
                <a href="#portfolio" className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800">
                  View Works
                </a>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-500">About Eryca</p>
          <h2 className={`${SERIF} mt-2 text-3xl sm:text-4xl`}>Muse, based in Jakarta.</h2>
          <p className={`mt-4 ${MUTED}`}>
            Hello peps, kenalin aku newbie muse heheh
          </p>
          <a href="#contact" className="mt-6 inline-flex rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white">
            Learn More
          </a>
        </div>
        <div className="overflow-hidden rounded-[32px] border border-neutral-200 bg-neutral-100 shadow-sm">
          <Image
            src="/porto-eryca/pp.gif"
            alt="About image"
            width={1200}    
            height={800}   
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>

      </section>

      {/* LOGOS */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <ul className="flex flex-wrap items-center justify-center gap-12 opacity-80 grayscale hover:grayscale-0 transition">
          <li className="flex items-center justify-center text-4xl">
            <FaGithub title="GitHub" />
          </li>
          <li className="flex items-center justify-center text-4xl text-sky-500">
            <SiReact title="React" />
          </li>
          <li className="flex items-center justify-center text-4xl text-pink-500">
            <SiFigma title="Figma" />
          </li>
        </ul>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className={`${SERIF} text-3xl sm:text-4xl`}>Selected Works</h2>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs text-neutral-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Open for Collaboration
          </span>
        </div>
        <ul className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { src: "/porto-eryca/mua4.jpg", alt: "Makeup Artist by Marettadrie" },
            { src: "/porto-eryca/mua1.jpg", alt: "Makeup Artist by Vindy" },
            { src: "/porto-eryca/mua3.jpg", alt: "Makeup Artist by Azti" },
            { src: "/porto-eryca/mua2.jpg", alt: "Makeup Artist by Marettadrie" },
          ].map((g, i) => (
            <li key={i} className={`${CARD} relative aspect-square overflow-hidden rounded-xl bg-neutral-100`}>
              <Image
                src={g.src}
                alt={g.alt}
                width={800}
                height={1000}
                className="object-contain"
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                priority={i < 2}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              <span className={`${SERIF} absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-neutral-800 shadow`}>
                {g.alt}
              </span>
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
              href="https://wa.me/6285871154799?text=Hi%20Eryca%2C%20saya%20ingin%20booking%20makeup."
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
