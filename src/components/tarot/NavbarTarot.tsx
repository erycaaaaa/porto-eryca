"use client";

import Link from "next/link";

export default function NavbarTarot() {
  const items = [
    { label: "Tarot", href: "#tarot" },
    { label: "Love Tarot", href: "#love" },
    { label: "Yes / No", href: "#yesno" },
    { label: "Daily", href: "#daily" },
    { label: "One Card", href: "#one" },
    { label: "Three Card", href: "#three" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* brand kiri */}
        <Link href="/" className="font-serif text-2xl tracking-wide text-white">
          RuuChi Reading
        </Link>

        {/* links kanan */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-white">
          {items.map((it) => (
            <a key={it.label} href={it.href} className="hover:text-purple-300 transition">
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
