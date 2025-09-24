
"use client";
import { useEffect, useRef, useState } from "react";
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
  const effectiveMin = (minMs ?? defaultDurationMs ?? 700);
  const effectiveHard = (hardTimeoutMs ?? maxTotalMs ?? 1800);

 
  const [shouldRender, setShouldRender] = useState(true);  
  const [visible, setVisible] = useState(false);       

  const startedAtRef = useRef(0);
  const closedRef = useRef(false);
  const hardTimerRef = useRef<number | null>(null);

  useEffect(() => {

    if (closedRef.current) return;

    const already = oncePerSession && sessionStorage.getItem("splash:shown") === "1";
    if (already) {

      setShouldRender(false);
      return;
    }

    // Tampilkan overlay (fade in)
    setVisible(true);
    startedAtRef.current = performance.now();

    const close = () => {
      if (closedRef.current) return;
      closedRef.current = true;

      const elapsed = performance.now() - startedAtRef.current;
      const wait = Math.max(0, effectiveMin - elapsed);

      window.setTimeout(() => {
        setVisible(false);
        if (oncePerSession) sessionStorage.setItem("splash:shown", "1");
        window.setTimeout(() => setShouldRender(false), 320);
      }, wait);
    };

    if (document.readyState === "interactive" || document.readyState === "complete") {
      close();
    } else {
      const onReady = () => {
        document.removeEventListener("readystatechange", onReady);
        close();
      };
      document.addEventListener("readystatechange", onReady);
    }

    // Hard timeout cadangan
    hardTimerRef.current = window.setTimeout(close, effectiveHard);

    return () => {
      if (hardTimerRef.current) window.clearTimeout(hardTimerRef.current);
    };
  }, [effectiveMin, effectiveHard, oncePerSession]);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden
      className={[
        "fixed inset-0 z-[9999] grid place-items-center",
        "bg-[#fff2d6]",
        "transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="flex flex-col items-center gap-4">
        <Image src="/porto-eryca/logo-web.gif" alt="Logo" width={84} height={84} priority className="drop-shadow" />
        <p className="text-sm opacity-70">Tunggu Sebentar yaa…</p>
      </div>
    </div>
  );
}
