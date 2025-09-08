// src/components/layout/SplashScreen.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SplashScreen({
  defaultDurationMs = 2000,
}: {
  defaultDurationMs?: number;
}) {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<number | null>(null);

  // util: show lalu auto-hide setelah durasi
  const showFor = (ms: number) => {
    setVisible(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setVisible(false), ms);
  };

  // tampil saat first load
  useEffect(() => {
    const onLoad = () => showFor(defaultDurationMs);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [defaultDurationMs]);

  // bisa dipanggil ulang: window.dispatchEvent(new CustomEvent('eryca:splash', {detail:{durationMs:1200}}))
  useEffect(() => {
    const handler = (e: Event) => {
      const d =
        (e as CustomEvent<{ durationMs?: number }>).detail?.durationMs ??
        defaultDurationMs;
      showFor(d);
      window.scrollTo({ top: 0, behavior: "smooth" }); // optional: scroll ke atas
    };
    window.addEventListener("eryca:splash", handler as EventListener);
    return () =>
      window.removeEventListener("eryca:splash", handler as EventListener);
  }, [defaultDurationMs]);

  return (
    <div
      className={`fixed inset-0 grid place-items-center bg-[#fff2d6] z-[9999] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <Image
        src="/porto-eryca/logo-web.gif" // GIF kamu
        alt="Loading"
        width={120}
        height={120}
        priority
        unoptimized
      />
    </div>
  );
}
