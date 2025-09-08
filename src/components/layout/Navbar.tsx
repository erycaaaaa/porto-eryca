// src/components/layout/Navbar.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import MobileSidebar from "./MobileSidebar";

const LEFT = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#footer" },
];

const RIGHT = [
  { label: "Work", href: "#work" },
  { label: "Illustrations", href: "#illustrations" },
  { label: "Services", href: "#services" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // trigger splash (mis. didengarkan oleh komponen lain)
  const showSplash = (ms = 5000) =>
    window.dispatchEvent(
      new CustomEvent("eryca:splash", { detail: { durationMs: ms } })
    );

  // helper anchor scroll (dengan offset tinggi navbar 72px)
  const handleAnchor =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      setOpen(false);
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", href);
    };

  // kunci body saat drawer open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <nav
      id="site-nav"
      aria-label="Primary"
      className="
        relative w-full border-t border-[#e8e0c2] bg-[#3b2f22] text-[#e8e0c2]
        shadow-[0_-4px_12px_rgba(0,0,0,0.4)]
        border-[var(--border)]
        dark:bg-[#95927573] dark:text-[#ffffff] dark:border-[#3b3526]
      "
    >
      {/* wadah konten navbar */}
      <div className="max-w-6xl px-4 sm:px-6 md:ml-[205px]">
        {/* DESKTOP */}
        <div className="hidden md:grid h-20 grid-cols-[auto_1fr_8rem_1fr] items-center gap-x-6">
          {/* Burger juga tampil di desktop */}
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
            <Image
              src="/eryca.gif"
              alt="Logo"
              width={48}
              height={48}
              unoptimized
            />
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
            <span className="block w-6 h-[2px] bg-[#6f5d33] mb-1.5" />
            <span className="block w-6 h-[2px] bg-[#6f5d33] mb-1.5" />
            <span className="block w-6 h-[2px] bg-[#6f5d33]" />
          </button>

          <button
            type="button"
            aria-label="Show splash"
            onClick={() => showSplash(1200)}
            className="hover:opacity-90"
          >
            <Image
              src="/eryca.gif"
              alt="Logo"
              width={36}
              height={36}
              unoptimized
            />
          </button>

          <div className="w-8" />
        </div>
      </div>

      <div className="h-[2px] bg-[#b7a373]/70 mx-6" />

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
