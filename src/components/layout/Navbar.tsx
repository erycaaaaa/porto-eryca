// src/components/layout/Navbar.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MobileSidebar from "./MobileSidebar";

const LEFT = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#footer" },
];

const RIGHT = [
  { label: "Work", href: "/#worked" },
  { label: "Illustrations", href: "/#illustrations" },
  { label: "Makeup", href: "/#makeup"}, 
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // optional: base path untuk GitHub Pages project site, contoh: /porto-eryca
  const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // trigger splash (mis. didengarkan oleh komponen lain)
  const showSplash = (ms = 5000) =>
    window.dispatchEvent(new CustomEvent("eryca:splash", { detail: { durationMs: ms } }));

  // ambil id dari "/#id" atau "#id"
  const getHash = (href: string) =>
    href.startsWith("/#") ? href.slice(2) : href.startsWith("#") ? href.slice(1) : null;

  // smooth scroll dengan offset tinggi navbar dinamis
  const smoothScrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.getElementById("site-nav");
    const offset = nav ? nav.getBoundingClientRect().height : 72; // fallback 72px
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  // handle klik anchor: scroll kalau di home, kalau tidak -> push ke /#id
  const handleAnchor =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const id = getHash(href);
      if (!id) return; // bukan anchor; biarkan default
      e.preventDefault();
      setOpen(false);

      if (pathname === "/" || pathname === `${BASE}/` || pathname === `${BASE}`) {
        // sudah di halaman Home -> cukup scroll
        smoothScrollToId(id);
      } else {
        // bukan di Home -> pindah route ke Home + hash
        router.push(`${BASE}/#${id}`);
      }
    };

  // kunci body saat drawer open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  // sticky style saat di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="site-nav"
      aria-label="Primary"
      className={[
        // STICKY!
        "sticky top-0 z-50 w-full",
        // warna dasar
        "bg-[#3b2f22] text-[#e8e0c2] dark:bg-[#95927573] dark:text-white",
        // border & shadow berubah saat scroll
        scrolled
          ? "border-b border-[#e8e0c2]/50 shadow-[0_6px_16px_rgba(0,0,0,0.18)] backdrop-blur"
          : "border-b border-transparent",
      ].join(" ")}
    >
      {/* wadah konten navbar */}
      <div className="mx-auto w-full max-w-[90rem] px-[5vw]">
        {/* DESKTOP */}
        <div className="hidden md:grid h-20 grid-cols-[auto_1fr_8rem_1fr] items-center gap-x-6">
          {/* Burger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-sidebar"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="p-2 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            title="Menu"
          >
            <span className="mb-1.5 block h-[2px] w-6 bg-[#f1e7c8]" />
            <span className="mb-1.5 block h-[2px] w-6 bg-[#f1e7c8]" />
            <span className="block h-[2px] w-6 bg-[#f1e7c8]" />
          </button>

          <ul className="flex gap-8 justify-self-end">
            {LEFT.map((i) => (
              <li key={i.label}>
                <a
                  className="hover:text-[#52451f] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  href={i.href}
                  onClick={handleAnchor(i.href)}
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Show splash"
            onClick={() => showSplash(5200)}
            className="justify-self-center hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Image src="/porto-eryca/eryca.gif" alt="Logo" width={48} height={48} unoptimized />
          </button>

          <ul className="flex gap-8 justify-self-start">
            {RIGHT.map((i) => (
              <li key={i.label}>
                <a
                  className="hover:text-[#52451f] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  href={i.href}
                  onClick={handleAnchor(i.href)}
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* MOBILE TOP BAR */}
        <div className="md:hidden h-16 flex items-center justify-between">
          <button
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-sidebar"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="p-2 -ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            title="Menu"
          >
            <span className="block w-6 h-[2px] bg-[#f1e7c8] mb-1.5" />
            <span className="block w-6 h-[2px] bg-[#f1e7c8] mb-1.5" />
            <span className="block w-6 h-[2px] bg-[#f1e7c8]" />
          </button>

          <button
            type="button"
            aria-label="Show splash"
            onClick={() => showSplash(1200)}
            className="hover:opacity-90"
          >
            <Image src="/porto-eryca/eryca.gif" alt="Logo" width={36} height={36} unoptimized />
          </button>

          <div className="w-8" />
        </div>
      </div>

      <div className="h-[2px] bg-[#b7a373]/70 mx-[5vw]" />

      {/* Drawer ala desain */}
      <MobileSidebar
        open={open}
        onCloseAction={() => setOpen(false)}
        onShowSplashAction={showSplash}
        handleAnchorAction={handleAnchor}
      />
    </nav>
  );
}
