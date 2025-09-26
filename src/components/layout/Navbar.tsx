/* eslint-disable @typescript-eslint/no-explicit-any */
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
  { label: "Makeup", href: "/makeup" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // ===== utils =====
  const showSplash = (ms = 5000) =>
    window.dispatchEvent(
      new CustomEvent("eryca:splash", { detail: { durationMs: ms } })
    );

  const getHash = (href: string) =>
    href.startsWith("/#")
      ? href.slice(2)
      : href.startsWith("#")
      ? href.slice(1)
      : null;

  const resolveHref = (href: string) => {
    if (href.startsWith("/#") || href.startsWith("#")) return href;
    if (href.startsWith("/")) return `${BASE}${href}`;
    return href;
  };

  const smoothScrollToId = (id: string) => {
    const nav = document.getElementById("site-nav");
    const offset = nav ? nav.getBoundingClientRect().height : 72;

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", "#home");
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  // handler nav
  const onClickNav =
    (rawHref: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const id = getHash(rawHref);
      if (id) {
        e.preventDefault();
        setOpen(false);
        if (
          pathname === "/" ||
          pathname === `${BASE}/` ||
          pathname === `${BASE}`
        ) {
          smoothScrollToId(id);
        } else {
          router.push(`${BASE}/#${id}`);
        }
        return;
      }
      if (rawHref.startsWith("/")) {
        e.preventDefault();
        setOpen(false);
        router.push(resolveHref(rawHref));
      }
    };

  // ===== effects =====

  useEffect(() => {
    setOpen(false);
  }, []);

  // lock body saat menu open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    const onHash = () => setOpen(false);
    const onLoad = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  // nav shadow saat scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ===== render =====
  return (
    <nav
      id="site-nav"
      aria-label="Primary"
      className={[
        "sticky top-0 z-50 w-full",
        "bg-[#5f3d24] text-[#e8e0c2] dark:bg-[#95927573] dark:text-white",
        scrolled
          ? "border-b border-[#e8e0c2]/50 shadow-[0_6px_16px_rgba(0,0,0,0.18)] backdrop-blur"
          : "border-b border-transparent",
      ].join(" ")}
    >
       <div className="mx-auto w-full max-w-[90rem] pl-[5vw] md:pr-[calc(5vw+2.5cm)]">
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
                  href={resolveHref(i.href)}
                  onClick={onClickNav(i.href)}
                  className="hover:text-[#52451f] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
              src="/porto-eryca/eryca.gif"
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
                  href={resolveHref(i.href)}
                  onClick={onClickNav(i.href)}
                  className="hover:text-[#52451f] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
            <Image
              src="/porto-eryca/eryca.gif"
              alt="Logo"
              width={36}
              height={36}
              unoptimized
            />
          </button>

          <div className="w-8" />
        </div>
      </div>

      <div className="h-[2px] bg-[#b7a373]/70 mx-[5vw]" />

      {/* Drawer / sidebar */}
      <MobileSidebar
        open={open}
        onCloseAction={() => setOpen(false)}
        onShowSplashAction={showSplash}
        handleAnchorAction={(href: string) => onClickNav(href) as any}
      />
    </nav>
  );
}
