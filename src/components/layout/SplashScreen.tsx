"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

  const hideTimerRef = useRef<number | null>(null);
  const maxTimerRef = useRef<number | null>(null);

  // Utility
  const clearTimers = () => {
    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
    if (maxTimerRef.current) { clearTimeout(maxTimerRef.current); maxTimerRef.current = null; }
  };

  const startTimers = (durMs: number) => {
    clearTimers();
    setVisible(true);
    hideTimerRef.current = window.setTimeout(() => setVisible(false), durMs);
    maxTimerRef.current = window.setTimeout(() => setVisible(false), Math.max(durMs, maxTotalMs));
  };

  
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultDurationMs, maxTotalMs, oncePerSession]);


  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<{ durationMs?: number }>).detail?.durationMs ?? defaultDurationMs;
      startTimers(d);
      window.scrollTo({ top: 0, behavior: "auto" });
      setShouldRender(true);
    };
    window.addEventListener("eryca:splash", handler as EventListener);
    return () => window.removeEventListener("eryca:splash", handler as EventListener);
  }, [defaultDurationMs]);

  useEffect(() => {
    if (!visible && oncePerSession) {
      try { sessionStorage.setItem("splash:shown", "1"); } catch {}
    }
  }, [visible, oncePerSession]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center bg-[#fff2d6] transition-opacity duration-1500 ${
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
