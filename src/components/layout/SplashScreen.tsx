"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
 
  defaultDurationMs?: number;
  maxTotalMs?: number;
  oncePerSession?: boolean;
};

export default function SplashScreen({
  defaultDurationMs = 900,
  maxTotalMs = 2500,
  oncePerSession = true,
}: Props) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false; 
    if (oncePerSession && sessionStorage.getItem("splash:shown") === "1") return false;
    return true;
  });
  const [mounted, setMounted] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const maxTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!visible) return;
    maxTimerRef.current = window.setTimeout(() => setVisible(false), maxTotalMs);

    const raf = requestAnimationFrame(() => {
      hideTimerRef.current = window.setTimeout(() => setVisible(false), defaultDurationMs);
    });

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
      cancelAnimationFrame(raf);
    };

  }, []);

 
  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<{ durationMs?: number }>).detail?.durationMs ?? defaultDurationMs;
      // batalkan timer lama, tampilkan lagi sebentar
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
      setVisible(true);
      hideTimerRef.current = window.setTimeout(() => setVisible(false), d);
      maxTimerRef.current = window.setTimeout(() => setVisible(false), Math.max(d, maxTotalMs));
      window.scrollTo({ top: 0, behavior: "auto" }); // jangan 'smooth' agar tidak block
    };
    window.addEventListener("eryca:splash", handler as EventListener);
    return () => window.removeEventListener("eryca:splash", handler as EventListener);
  }, [defaultDurationMs, maxTotalMs]);

  
  useEffect(() => {
    if (!visible && oncePerSession && mounted) {
      try {
        sessionStorage.setItem("splash:shown", "1");
      } catch {}
    }
  }, [visible, oncePerSession, mounted]);

  const [shouldRender, setShouldRender] = useState(visible);
  useEffect(() => {
    if (visible) setShouldRender(true);
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center bg-[#fff2d6] transition-opacity duration-400 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
      onTransitionEnd={() => {
        if (!visible) setShouldRender(false);
      }}
    >
      <Image
        src="/porto-eryca/logo-web.gif"
        alt="Loading"
        width={120}
        height={120}
        priority
      
      />
    </div>
  );
}
