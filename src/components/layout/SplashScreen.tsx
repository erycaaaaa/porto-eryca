// src/components/layout/SplashScreen.tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type Props = {
  minMs?: number;
  hardTimeoutMs?: number;
  oncePerSession?: boolean;
  defaultDurationMs?: number;
  maxTotalMs?: number;
};

export default function SplashScreen({
  minMs,
  hardTimeoutMs,
  oncePerSession = true,
  defaultDurationMs,
  maxTotalMs,
}: Props) {
  const effectiveMin = minMs ?? defaultDurationMs ?? 700;
  const effectiveHard = hardTimeoutMs ?? maxTotalMs ?? 1800;

  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [visible, setVisible] = useState(false);

  const startedAtRef = useRef(0);
  const closedRef = useRef(false);
  const hardTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  const markShown = useCallback(() => {
    try {
      if (oncePerSession) sessionStorage.setItem("splash:shown", "1");
    } catch {}
  }, [oncePerSession]);

  const closeNow = useCallback(() => {
    closedRef.current = true;
    setVisible(false);
    window.setTimeout(() => {
      setShouldRender(false);
      document.documentElement.classList.remove("overflow-hidden");
    }, 300);
    markShown();
  }, [markShown]);

  const open = useCallback(() => {
    if (closedRef.current) return;

    let already = false;
    try {
      already = oncePerSession && sessionStorage.getItem("splash:shown") === "1";
    } catch {}

    if (already) {
      setShouldRender(false);
      return;
    }
    startedAtRef.current = performance.now();
    setVisible(true);
    document.documentElement.classList.add("overflow-hidden");

    if (hardTimerRef.current) clearTimeout(hardTimerRef.current);
    hardTimerRef.current = window.setTimeout(closeNow, effectiveHard);
  }, [oncePerSession, effectiveHard, closeNow]);

  const close = useCallback(() => {
    if (closedRef.current) return;
    const elapsed = performance.now() - startedAtRef.current;
    const remain = Math.max(0, effectiveMin - elapsed);

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(closeNow, remain);
  }, [effectiveMin, closeNow]);

  useEffect(() => {
    if (!mounted) return;
    open();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      if (hardTimerRef.current) clearTimeout(hardTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [mounted, open, close]);

  if (!mounted || !shouldRender) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
      onClick={close}
      className={`fixed inset-0 grid place-items-center transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
        bg-black/55 backdrop-blur-sm z-[2147483647]`}
    >
      <div className="rounded-2xl p-6 shadow-2xl bg-white/90 ring-1 ring-black/5">
        <Image
          src="/porto-eryca/eryca.gif"
          alt="Loading..."
          width={144}
          height={144}
          priority
          className="h-24 w-24 sm:h-28 sm:w-28"
        />
      </div>
    </div>,
    document.body
  );
}
