// src/app/loading.tsx
"use client";

import SplashScreen from "@/components/layout/SplashScreen";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-zinc-900 flex items-center justify-center">
      <SplashScreen defaultDurationMs={900} />
    </div>
  );
}
