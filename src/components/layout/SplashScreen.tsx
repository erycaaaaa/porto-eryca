// src/components/layout/SplashScreen.tsx
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

  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === "undefined") return false;
    return oncePerSession ? sessionStorage.getItem("splash:shown") !== "1" : true;
  });
  const [visible, setVisible] = useState(shouldRender);

  const startedAtRef = useRef(0);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!shouldRender || ranRef.current) return;
    ranRef.current = true;
    startedAtRef.current = performance.now();

    const close = () => {
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
      const onReady = () => { document.removeEventListener("readystatechange", onReady); close(); };
      document.addEventListener("readystatechange", onReady);
    }

    const hard = window.setTimeout(close, effectiveHard);
    return () => window.clearTimeout(hard);
  }, [shouldRender, effectiveMin, effectiveHard, oncePerSession]);

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
