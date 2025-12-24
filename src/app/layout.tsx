// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickySpotify from "@/components/sections/media/StickySpotify";
import SplashScreen from "@/components/layout/SplashScreen";
import HashScrollFix from "@/components/system/HashScrollFix";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-erycadhamma.vercel.app"),
  title: {
    default: "Eryca Dhamma Shanty | Portfolio",
    template: "%s | Eryca Dhamma Shanty",
  },
  description:
    "Eryca Dhamma Shanty is an Informatics Engineering student focusing on UI/UX, Front-End Development, Quality Assurance, and NLP.",
  keywords: [
    "Eryca Dhamma Shanty",
    "Eryca Dhamma",
    "UI UX Designer",
    "Front-End Developer",
    "Quality Assurance",
    "NLP",
    "Portfolio Eryca",
  ],
  icons: {
    icon: "/porto-eryca/logo-pp.svg",
    apple: "/porto-eryca/apple-touch-icon.png",
  },
    verification: {
    google: "9EzdfqNBwWzuZE-fC0BJL1PdeUYQaPXxtTQlSd00LCU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#f5f4ef] text-zinc-900 antialiased">
        <Providers>
          <div id="top" />

          {/* UI Components */}
          <SplashScreen minMs={900} hardTimeoutMs={1800} oncePerSession />
          <Navbar />
          <HashScrollFix />

          {/* Main Content */}
          <main className="relative min-h-screen overflow-x-hidden bg-[url('/porto-eryca/bg12.png')] bg-cover bg-fixed bg-center">
            {children}
          </main>

          <StickySpotify />

          {/* Analytics */}
          <Analytics />
          <SpeedInsights />
        </Providers>

        <Footer
          brandName="Eryca"
          brandLogoSrc="/porto-eryca/eryca.gif"
          brandHref="/"
          socials={{
            github: "https://github.com/erycaaaaa",
            instagram: "https://www.instagram.com/erycadhm/",
            linkedin:
              "https://www.linkedin.com/in/eryca-dhamma-shanty-8a530a352",
            email: "eryca847@gmail.com",
          }}
        />
      </body>
    </html>
  );
}
