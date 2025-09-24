// src/components/layout/SplashScreen.tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  /** Minimal tampil (ms) sebelum boleh ditutup otomatis/oleh user */
  minMs?: number;
  /** Batas keras total splash (ms) — akan dipaksa hilang jika lewat */
  hardTimeoutMs?: number;
  /** Hanya sekali per sessionStorage */
  oncePerSession?: boolean;
  /** (Alias) Default durasi minimal jika minMs tak diisi */
  defaultDurationMs?: number; // ← tambahkan ini
  /** (Alias) Batas keras total jika hardTimeoutMs tak diisi */
  maxTotalMs?: number;
};

export default function SplashScreen({
  minMs,
  hardTimeoutMs,
  oncePerSession = true,
  defaultDurationMs,
  maxTotalMs,
}: Props) {
  // Resolusi nilai alias vs utama
  const effectiveMin = (minMs ?? defaultDurationMs ?? 700);
  const effectiveHard = (hardTimeoutMs ?? maxTotalMs ?? 1800);

  const [shouldRender, setShouldRender] = useState(true);
  const [visible, setVisible] = useState(false);

  const startedAtRef = useRef(0);
  const closedRef = useRef(false);
  const hardTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  // Contoh: fungsi “gateFull” dibikin stabil agar lolos ESLint
  const gateFull = useCallback(() => {
    if (closedRef.current) return;

    const already = oncePerSession && sessionStorage.getItem("splash:shown") === "1";
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
    gateFull(); // ← kita panggil fungsi stabil
    return () => {
      if (hardTimerRef.current) clearTimeout(hardTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [gateFull]); // ← deps ditambahkan agar tak ada warning

  // contoh close handler menjaga minimal durasi tampil
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
      <div className="rounded-2xl bg-[#f5f4ef] p-6 shadow-2xl">
        <Image src="/logo.png" alt="" width={96} height={96} />
        <p className="mt-3 text-sm text-zinc-700">Loading…</p>
      </div>
    </div>
  );
}
