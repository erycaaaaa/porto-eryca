// src/components/system/HashScrollFix.tsx
"use client";

import { useEffect } from "react";

export default function HashScrollFix() {
  useEffect(() => {
    // Simpan nilai awal scrollRestoration tanpa pakai `any`
    let prevScrollRestoration: ScrollRestoration | undefined;

    try {
      if ("scrollRestoration" in history) {
        prevScrollRestoration = history.scrollRestoration as ScrollRestoration;
        history.scrollRestoration = "manual";
      }
    } catch {
      // ignore
    }

    const handle = () => {
      const hash = window.location.hash.replace(/^#/, "");
      const nav = document.getElementById("site-nav");
      const offset = nav ? nav.getBoundingClientRect().height : 72;

      // Khusus #home → selalu ke paling atas
      if (!hash || hash === "home") {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: "auto" });
          });
        });
        return;
      }

      // Hash lain → tunggu elemen muncul lalu offset
      let tries = 0;
      const max = 24; // ~1.2s total
      const step = 50;

      const attempt = () => {
        const el = document.getElementById(hash);
        tries++;

        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.height < 1 && tries < max) {
            window.setTimeout(attempt, step);
            return;
          }
          const y = rect.top + window.scrollY - offset;
          window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
          return;
        }

        if (tries < max) window.setTimeout(attempt, step);
      };

      requestAnimationFrame(() => window.setTimeout(attempt, 0));
    };

    // initial load
    handle();

    // bfcache/page restore (tanpa param supaya tidak ada 'unused var')
    const onPageShow = () => handle();
    window.addEventListener("pageshow", onPageShow as EventListener);

    return () => {
      window.removeEventListener("pageshow", onPageShow as EventListener);
      try {
        if ("scrollRestoration" in history) {
          history.scrollRestoration =
            (prevScrollRestoration ?? "auto") as ScrollRestoration;
        }
      } catch {
        // ignore
      }
    };
  }, []);

  return null;
}
