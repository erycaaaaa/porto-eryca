// src/components/layout/ThemeToggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // elak mismatch SSR/CSR

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs
        border-[var(--border)] bg-[var(--background)]/90 text-[var(--foreground)]
        hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/20
      "
      title={isDark ? "Switch to light" : "Switch to dark"}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
