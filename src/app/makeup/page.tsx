// src/app/makeup/page.tsx
"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { SiReact, SiFigma } from "react-icons/si";
import { Playfair_Display, Great_Vibes } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const vibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SERIF = "font-serif";
const BODY = "text-neutral-800";
const MUTED = "text-neutral-700";
const CARD =
  "rounded-3xl border border-white/40 bg-white/80 shadow-sm backdrop-blur-sm";
const PANEL =
  "rounded-[32px] border border-white/40 bg-white/80 shadow-sm backdrop-blur-sm";

export default function MakeupPortfolioPage() {
  return (
    <main
      id="makeup"
      className={`
        relative min-h-screen ${BODY}
        bg-[url('/porto-eryca/bg12.png')] bg-center bg-cover bg-fixed
      `}
    >
      {/* overlay lembut agar teks kebaca */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-10%,#ffffffcc_0%,#fff7e6cc_60%,#faf6eacc_100%)]" />

      {/* Topbar transparan menyatu */}
      <header className="sticky top-0 z-30 w-full">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 bg-white/0 backdrop-blur-[2px]">
          <a href="#makeup" className="leading-none">
            <span
              className={`${playfair.className} block text-3xl font-bold text-black`}
            >
              EDS
            </span>
            <span
              className={`${vibes.className} -mt-1 block text-xl text-neutral-600`}
            >
              model makeup
            </span>
          </a>

          <ul className="hidden items-center gap-6 text-sm sm:flex">
            <li>
              <a href="#about" className="text-black hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="text-black hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="text-black hover:underline">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="text-black hover:underline">
                Contact
              </a>
            </li>
          </ul>

          <a
            href="https://wa.me/6285871154799?text=Hi%20Eryca%2C%20saya%20ingin%20booking%20makeup."
            target="_blank"
            className="hidden rounded-full px-4 py-2 text-xs font-medium text-black sm:inline-block"
          >
            Collaboration With Me ^^ →
          </a>
        </nav>
      </header>

      {/* HERO — BG sudah di <main> */}
      <section
        id="hero"
        className="relative grid h-[88vh] min-h-[560px] w-full place-items-center px-6 text-center text-black"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-sm tracking-widest opacity-90">Muse</p>
          <h1
            className={`${playfair.className} mt-1 text-4xl font-bold md:text-6xl`}
          >
            ERYCA
          </h1>
          <p className="mt-3 mx-auto max-w-xl opacity-90">
            More than a face,
            <br />I am the canvas where beauty tells its story.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#services"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:opacity-80"
            >
              Explore Services
            </a>
            <a
              href="#portfolio"
              className="rounded-full border border-black px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-white"
            >
              View Works
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2"
      >
        <div className={`${PANEL} p-8 md:p-10`}>
          <p className="text-xs uppercase tracking-widest text-neutral-600">
            About Eryca
          </p>
          <h2 className={`${vibes.className} mt-2 text-3xl sm:text-4xl`}>
            Muse, based in Jakarta.
          </h2>
          <p className={`mt-4 ${MUTED}`}>
            Hello peps, kenalin aku newbie muse heheh
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white"
          >
            Learn More
          </a>
        </div>

        <div className={`${PANEL} overflow-hidden`}>
          <Image
            src="/porto-eryca/pp.gif"
            alt="About image"
            width={1200}
            height={800}
            className="h-auto w-full object-contain"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* LOGOS */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <ul className="flex flex-wrap items-center justify-center gap-12 opacity-80 grayscale hover:grayscale-0 transition">
          <li className="flex items-center justify-center text-4xl text-black/80">
            <FaGithub title="GitHub" />
          </li>
          <li className="flex items-center justify-center text-4xl text-sky-600">
            <SiReact title="React" />
          </li>
          <li className="flex items-center justify-center text-4xl text-pink-600">
            <SiFigma title="Figma" />
          </li>
        </ul>
      </section>

      {/* SERVICES anchor */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-6" />

      {/* PORTFOLIO */}
      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-14">
        <div className={`${PANEL} flex items-end justify-between gap-4 p-6`}>
          <h2 className={`${vibes.className} text-3xl sm:text-4xl`}>
            Selected Works
          </h2>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs text-neutral-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Open for Collaboration
          </span>
        </div>
        <ul className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              src: "/porto-eryca/mua4.jpg",
              alt: "Makeup Artist by Marettadrie",
            },
            { src: "/porto-eryca/mua1.jpg", alt: "Makeup Artist by Vindy" },
            { src: "/porto-eryca/mua3.jpg", alt: "Makeup Artist by Azti" },
            {
              src: "/porto-eryca/mua2.jpg",
              alt: "Makeup Artist by Marettadrie",
            },
          ].map((g, i) => (
            <li
              key={i}
              className={`${CARD} relative aspect-square overflow-hidden`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={800}
                height={1000}
                className="object-cover"
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                priority={i < 2}
              />
              <span
                className={`${vibes.className} absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-neutral-800 shadow`}
              >
                {g.alt}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-16">
        <div className={`${PANEL} p-10 text-center`}>
          <h3 className={`${vibes.className} text-3xl sm:text-4xl`}>
            Ready to Collaborate?
          </h3>
          <p className={`mx-auto mt-3 max-w-xl ${MUTED}`}>
            Available for bridal, prewedding, graduation and events. On-location
            by request.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:eryca847@gmail.com?subject=Makeup%20Booking%20Inquiry"
              className="rounded-full bg-neutral-900 px-7 py-4 text-sm font-semibold text-white"
            >
              Email Inquiry
            </a>
            <a
              href="https://wa.me/6285871154799?text=Hi%20Eryca%2C%20saya%20ingin%20collab%20muse%20makeup%20artist."
              target="_blank"
              className="rounded-full border border-neutral-300 px-7 py-4 text-sm font-semibold text-neutral-800"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="pb-10 text-center text-xs text-neutral-700">
        © {new Date().getFullYear()} Eryca — Makeup Portfolio
      </footer>
    </main>
  );
}
