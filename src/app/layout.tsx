// src/app/layout.tsx
import "./globals.css";
import dynamic from "next/dynamic";
const StickySpotify = dynamic(() => import("@/components/sections/media/StickySpotify"), { ssr: false });
const SplashScreen  = dynamic(() => import("@/components/layout/SplashScreen"), { ssr: false });

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HashScrollFix from "@/components/system/HashScrollFix";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const bgUrl  = `${prefix}/bg12.png`; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-screen bg-[#f5f4ef] text-zinc-900 overflow-x-clip antialiased">
        <Providers>
          <div id="top" />
          <SplashScreen minMs={900} hardTimeoutMs={1800} oncePerSession />
          <Navbar />
          <HashScrollFix />
          <div
            aria-hidden
            className="fixed inset-0 -z-10"
            style={{
              backgroundImage: `url(${bgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              willChange: "transform",
            }}
          />

          <main className="relative min-h-screen">
            {children}
          </main>
          <Footer />
          <StickySpotify />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
