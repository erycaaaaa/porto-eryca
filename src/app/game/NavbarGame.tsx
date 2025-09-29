"use client";

import Link from "next/link";

export default function NavbarTarot() {
  const items = [
    { label: "all", href: "#AllGame" },
    { label: "Learning", href: "#Learning"},
    { label: "NotesBook", href: "#NotesBook"},
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* brand kiri */}
        <Link href="/" className="font-serif text-2xl tracking-wide text-white">
          RuuChi Game
        </Link>

        {/* links kanan */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-white">
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              className="hover:text-white
               transition"
            >
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
