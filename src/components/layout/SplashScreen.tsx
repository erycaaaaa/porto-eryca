
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { publicUrl } from "@/utils/publicUrl";

type Props = {
  defaultDurationMs?: number; 
  maxTotalMs?: number;        
  oncePerSession?: boolean;   
};

export default function SplashScreen({
  defaultDurationMs = 1200,
  maxTotalMs = 2500,
  oncePerSession = true,
}: Props) {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (maxTimerRef.current) {
      clearTimeout(maxTimerRef.current);
      maxTimerRef.current = null;
    }
  }, []);

  const startTimers = useCallback(
    (durMs: number) => {
      clearTimers();
      setShouldRender(true);
      setVisible(true);

      // jika user prefer-reduced-motion, buat lebih cepat
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const effDur = prefersReduced ? Math.min(500, durMs) : durMs;

      hideTimerRef.current = setTimeout(() => setVisible(false), effDur);
      maxTimerRef.current = setTimeout(
        () => setVisible(false),
        Math.max(effDur, maxTotalMs)
      );
    },
    [clearTimers, maxTotalMs]
  );

  // pertama kali mount → cek sesi
  useEffect(() => {
    try {
      const alreadyShown = sessionStorage.getItem("splash:shown") === "1";
      if (oncePerSession && alreadyShown) {
        setVisible(false);
        setShouldRender(false);
        return;
      }
    } catch {
    }

    startTimers(defaultDurationMs);
    return clearTimers;
  }, [defaultDurationMs, oncePerSession, startTimers, clearTimers]);

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<{ durationMs?: number }>).detail?.durationMs ?? defaultDurationMs;
      startTimers(d);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };
    window.addEventListener("eryca:splash", handler as EventListener);
    return () => window.removeEventListener("eryca:splash", handler as EventListener);
  }, [defaultDurationMs, startTimers]);

  // ketika visible berubah ke false, tulis flag session & sediakan fallback jika transitionend tidak terpanggil
  useEffect(() => {
    if (!visible) {
      if (oncePerSession) {
        try { sessionStorage.setItem("splash:shown", "1"); } catch {}
      }
      // Fallback: kalau onTransitionEnd tidak terpanggil, pastikan ditutup 600ms kemudian
      const t = setTimeout(() => setShouldRender(false), 600);
      return () => clearTimeout(t);
    }
  }, [visible, oncePerSession]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center bg-[#fff2d6] transition-opacity duration-900 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
      onTransitionEnd={() => {
        if (!visible) setShouldRender(false);
      }}
    >
      {/* penting: pakai publicUrl agar jalan di GitHub Pages */}
      <Image
        src={publicUrl("/logo-web.gif")}
        alt="Loading"
        width={120}
        height={120}
        priority
      />
    </div>
  );
}
