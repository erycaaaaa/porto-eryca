// src/components/layout/SplashScreen.tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

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

  const [shouldRender, setShouldRender] = useState(true);
  const [visible, setVisible] = useState(false);

  const startedAtRef = useRef(0);
  const closedRef = useRef(false);
  const hardTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const gateFull = useCallback(() => {
    if (closedRef.current) return;

    const already =
      oncePerSession && sessionStorage.getItem("splash:shown") === "1";
    if (already) {
      setShouldRender(false);
      return;
    }

    startedAtRef.current = performance.now();
    setVisible(true);

    // Hard timeout
    if (hardTimerRef.current) clearTimeout(hardTimerRef.current);
    hardTimerRef.current = window.setTimeout(() => {
      closedRef.current = true;
      setVisible(false);
      setShouldRender(false);
      if (oncePerSession) sessionStorage.setItem("splash:shown", "1");
    }, effectiveHard);
  }, [oncePerSession, effectiveHard]);

  useEffect(() => {
    gateFull();
    return () => {
      if (hardTimerRef.current) clearTimeout(hardTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [gateFull]);

  const close = useCallback(() => {
    if (closedRef.current) return;
    const elapsed = performance.now() - startedAtRef.current;
    const remain = Math.max(0, effectiveMin - elapsed);

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      closedRef.current = true;
      setVisible(false);
      setShouldRender(false);
      if (oncePerSession) sessionStorage.setItem("splash:shown", "1");
    }, remain);
  }, [effectiveMin, oncePerSession]);

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[9999] grid place-items-center transition-opacity
                  ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={close}
    >
      <div className="rounded-2xl p-6 shadow-2xl">
        <Image src="/porto-eryca/eryca.gif" alt="" width={96} height={96} />
      </div>
    </div>
  );
}
