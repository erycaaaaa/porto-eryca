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

  /** 🔹 CANONICAL (ini yang sebelumnya missing secara audit) */
  alternates: {
    canonical: "/",
  },

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

  /** 🔹 ROBOTS META (eksplisit, bukan default asumsi) */
  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/porto-eryca/logo-pp.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],

  verification: {
    google: "9EzdfqNBwWzuZE-fC0BJL1PdeUYQaPXxtTQlSd00LCU",
  },

  /** 🔹 STRUCTURED DATA (Person schema) */
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Eryca Dhamma Shanty",
      url: "https://portfolio-erycadhamma.vercel.app",
      sameAs: [
        "https://github.com/erycaaaaa",
        "https://www.instagram.com/erycadhm/",
        "https://www.linkedin.com/in/eryca-dhamma-shanty-8a530a352",
      ],
      jobTitle: "Informatics Engineering Student",
      knowsAbout: [
        "UI/UX Design",
        "Front-End Development",
        "Quality Assurance",
        "Natural Language Processing",
      ],
    }),
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

          <SplashScreen minMs={900} hardTimeoutMs={1800} oncePerSession />
          <Navbar />
          <HashScrollFix />

          <main className="relative min-h-screen overflow-x-hidden bg-[url('/porto-eryca/bg12.png')] bg-cover bg-fixed bg-center">
            {children}
          </main>

          <StickySpotify />

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
