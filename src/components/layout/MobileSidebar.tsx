
"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Briefcase,
  Image as ImageIcon,
  User,
  Mail,
  X,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

type AnchorHandler = (
  href: string
) => (e: React.MouseEvent<HTMLAnchorElement>) => void;

type Props = {
  open: boolean;
  onCloseAction: () => void;                 // ✅ rename sesuai aturan Next 15
  onShowSplashAction: (ms?: number) => void; // ✅ sudah benar
  handleAnchorAction: AnchorHandler;         // ✅ pakai alias tipe biar rapi
};

const FULL_WIDTH = 420;
const RAIL_WIDTH = 80;

// media query helper: true di mobile (<=640px)
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = (m: MediaQueryList | MediaQueryListEvent) =>
      setIsMobile("matches" in m ? m.matches : (m as MediaQueryList).matches);
    apply(mq);
    const listener = (e: MediaQueryListEvent) => apply(e);
    if (mq.addEventListener) mq.addEventListener("change", listener);
    else mq.addListener(listener);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", listener);
      else mq.removeListener(listener);
    };
  }, []);
  return isMobile;
}

export default function MobileSidebar({
  open,
  onCloseAction,
  onShowSplashAction,
  handleAnchorAction,
}: Props) {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  // ESC untuk menutup
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCloseAction();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCloseAction]);

  // Kunci body scroll saat menu terbuka
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // klik item: buka penuh (jika rail) lalu jalankan anchor
  const onAnchor = useCallback<AnchorHandler>(
    (href: string) => (e) => {
      if (!isMobile && !expanded) setExpanded(true);
      handleAnchorAction(href)(e);
    },
    [handleAnchorAction, isMobile, expanded]
  );

  // width animatable (mobile = full screen)
  const width = isMobile ? "100vw" : expanded ? FULL_WIDTH : RAIL_WIDTH;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            aria-label="Close menu"
            className="fixed inset-0 z-[60] bg-black/35 backdrop-blur-sm"
            onClick={onCloseAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer (mobile: fullscreen, desktop: rail/panel) */}
          <motion.aside
            id="mobile-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            // mobile: geser ke kanan untuk menutup
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: -100, right: 0 }}
            dragElastic={0.06}
            onDragEnd={(_, info) => {
              if (info.offset.x > 80) onCloseAction();
            }}
            className="
              fixed right-0 top-0 bottom-0 md:right-2 md:top-2 md:bottom-2
              z-[61] overflow-hidden
              rounded-none md:rounded-3xl
              border shadow-xl flex
              bg-[var(--background)] text-[var(--foreground)]
              border-[#e8dcb8] dark:border-[#3b3526]
              pt-[env(safe-area-inset-top)]
              pb-[env(safe-area-inset-bottom)]
              pr-[env(safe-area-inset-right)]
              pl-[env(safe-area-inset-left)]
            "
            style={{ width }}
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1, width }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            {/* RAIL (sembunyikan di mobile) */}
            {!isMobile && (
              <div className="flex h-full w-[72px] flex-col items-center gap-2 border-r border-[#e8dcb8]/60 p-2 dark:border-[#2a2519]">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  aria-label={expanded ? "Collapse" : "Expand"}
                  className="mt-1 rounded-full p-2 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6f5d33]/30 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
                >
                  {expanded ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <ChevronLeft className="h-5 w-5" />
                  )}
                </button>

                <RailButton onClick={() => setExpanded(true)} title="Home">
                  <Home className="h-5 w-5" />
                </RailButton>
                <RailButton onClick={() => setExpanded(true)} title="Works">
                  <Briefcase className="h-5 w-5" />
                </RailButton>
                <RailButton
                  onClick={() => setExpanded(true)}
                  title="Illustrations"
                >
                  <ImageIcon className="h-5 w-5" />
                </RailButton>

                <div className="my-1 h-px w-8 bg-[#e8dcb8]/70 dark:bg-[#2a2519]" />

                <RailButton onClick={() => setExpanded(true)} title="About">
                  <User className="h-5 w-5" />
                </RailButton>
                <RailButton onClick={() => setExpanded(true)} title="Contact">
                  <Mail className="h-5 w-5" />
                </RailButton>

                <div className="mt-auto pb-1">
                  <button
                    onClick={onCloseAction}
                    aria-label="Close"
                    className="rounded-full p-2 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6f5d33]/30 dark:hover:bg-white/5 dark:focus-visible:ring-white/30"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* PANEL PENUH */}
            <div
              className={`flex h-full flex-1 flex-col ${
                !isMobile && !expanded ? "hidden" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 border-b border-[#e8dcb8]/70 px-4 py-3 dark:border-[#2a2519]">
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Show splash"
                    onClick={() => onShowSplashAction(1000)}   // ✅ panggilan benar
                    className="rounded-full border border-[#e8dcb8] bg-white/90 p-1.5 shadow dark:border-[#3b3526] dark:bg-[#18160f]"
                  >
                    <Image
                      src="/eryca.gif"
                      alt="Logo"
                      width={24}
                      height={24}
                      unoptimized
                    />
                  </button>
                  <span className="font-semibold tracking-wide text-[var(--foreground)]">
                    Menu
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <ThemeToggle />
                  <button
                    onClick={onCloseAction}
                    className="rounded-full p-2 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6f5d33]/30 dark:hover:bg-white/5 dark:focus-visible:ring-white/30"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Area scroll */}
              <nav
                className="
                  flex-1 overflow-y-auto overscroll-contain px-3 py-4
                  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                  [mask-image:linear-gradient(to_bottom,transparent,black_12px,black_calc(100%-12px),transparent)]
                "
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <Section title="Explore">
                  <Item icon={<Home />} href="#home" onClick={onAnchor("#home")}>
                    Home
                  </Item>
                  <Item
                    icon={<Briefcase />}
                    href="#work"
                    onClick={onAnchor("#work")}
                  >
                    Works
                  </Item>
                  <Item
                    icon={<ImageIcon />}
                    href="#illustrations"
                    onClick={onAnchor("#illustrations")}
                  >
                    Illustrations
                  </Item>
                </Section>

                <div className="my-3 h-px bg-[#e8dcb8]/70 dark:bg-[#2a2519]" />

                <Section title="About">
                  <Item icon={<User />} href="#about" onClick={onAnchor("#about")}>
                    About Me
                  </Item>
                  <Item icon={<Mail />} href="#contact" onClick={onAnchor("#contact")}>
                    Contact
                  </Item>
                </Section>

                {/* CTA */}
                <div className="mt-4 grid gap-2">
                  <a
                    href="/Curriculum Vitae  - Eryca Dhamma Shanty.pdf"
                    download="Eryca-Dhamma-Shanty-CV.pdf"
                    className="
                      inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                      bg-[#6f5d33] text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6f5d33]/40
                      dark:bg-[#bba46b] dark:text-black
                    "
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>

                  <a
                    href="https://www.linkedin.com/in/eryca-shanty-8a530a352"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium
                      border-[#cdbf97] bg-white text-[#6f5d33] hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6f5d33]/20
                      dark:border-[#3b3526] dark:bg-[#18160f] dark:text-[#e8e0c2] dark:hover:bg-white/5
                    "
                  >
                    <ExternalLink className="h-4 w-4" />
                    Hire Me
                  </a>
                </div>

                {/* Socials */}
                <div className="mt-5">
                  <p className="mb-2 text-xs uppercase tracking-widest text-[color:var(--foreground)]/60">
                    Social
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {[
                      {
                        label: "Instagram",
                        href:
                          "https://www.instagram.com/erycadhm?igsh=MWI3M2drN3R0ZmNwdA==",
                      },
                      {
                        label: "LinkedIn",
                        href: "https://www.linkedin.com/in/eryca-shanty-8a530a352",
                      },
                      { label: "Github", href: "https://github.com/erycaaaaa" },
                      {
                        label: "Behance",
                        href: "https://www.behance.net/erycads",
                      },
                    ].map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            rounded-full border px-3 py-1.5 text-xs
                            border-[#e8dcb8] bg-white text-[#6f5d33] hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6f5d33]/20
                            dark:border-[#3b3526] dark:bg-[#18160f] dark:text-[#e8e0c2] dark:hover:bg-white/5
                          "
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Separator */}
                <div className="relative my-5 flex items-center">
                  <div className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-gray-500 text-sm">✦</span>
                  <div className="flex-grow border-t border-gray-300" />
                </div>

                {/* Playing Spotify (iframe) */}
                <div className="mt-5">
                  <p className="mb-2 text-xs uppercase tracking-widest text-[color:var(--foreground)]/60">
                    Playing Spotify
                  </p>
                  <iframe
                    src="https://open.spotify.com/embed/playlist/5kajo3mgDkcaQr6RbNPSkR?utm_source=generator"
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg ring-1 ring-[#e8dcb8]/70 dark:ring-[#2a2519]"
                  />
                </div>

                {/* Separator */}
                <div className="relative my-5 flex items-center">
                  <div className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-gray-500 text-sm">✦</span>
                  <div className="flex-grow border-t border-gray-300" />
                </div>

                <div className="mt-6">
                  <p className="mb-2 text-xs uppercase tracking-widest text-[color:var(--foreground)]/60">
                    Quote
                  </p>

                  {/* Button/link to Quotes page */}
                  <div className="mt-6 text-center">
                    <Link
                      href="/quotes"
                      className="inline-block rounded-full bg-[color:var(--foreground)]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow hover:bg-[color:var(--foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--foreground)] transition"
                    >
                      More Quotes
                    </Link>
                  </div>

                  {/* GIF → pakai <Image /> biar lint bersih */}
                  <div className="flex justify-center mt-5">
                    <Image
                      src="/girl.gif"
                      alt="Inspiration GIF"
                      width={240}
                      height={128}
                      className="w-60 h-32 object-contain"
                      unoptimized
                    />
                  </div>

                  {/* Separator */}
                  <div className="my-8 h-[2px] w-2/3 mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent" />

                  {/* Quote */}
                  <div className="mt-6 border-l-4 border-gray-400 pl-4 italic text-sm text-[color:var(--foreground)]/80">
                    “Be the change that you wish to see in the world.”
                    <span className="block mt-1">— Mahatma Gandhi</span>
                  </div>
                </div>
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- sub-komponen ---------- */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2">
      <div className="mb-1.5 px-2 text-xs uppercase tracking-widest text-[color:var(--foreground)]/60">
        {title}
      </div>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

function Item({
  icon,
  href,
  children,
  onClick,
}: {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        className="
          flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px]
          hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6f5d33]/20
          dark:hover:bg-white/5 dark:focus-visible:ring-white/20
        "
      >
        <span className="[&>svg]:h-5 [&>svg]:w-5 text-[color:var(--foreground)]/80">
          {icon}
        </span>
        <span className="flex-1">{children}</span>
      </a>
    </li>
  );
}

/* Tombol di rail (desktop) */
function RailButton({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="rounded-xl p-2 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6f5d33]/30 dark:hover:bg-white/5 dark:focus-visible:ring-white/20"
    >
      {children}
    </button>
  );
}
