// src/app/layout.tsx
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickySpotify from "@/components/sections/media/StickySpotify";
import SplashScreen from "@/components/layout/SplashScreen";
import Providers from "./providers";
import HashScrollFix from "@/components/system/HashScrollFix";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://erycaaaaa.github.io/porto-eryca"),
  title: {
    default: "Eryca Dhamma S",
    template: "%s • Eryca",
  },
  description: "Creator • UI/UX • Front-End",
  icons: {
    icon: [
      { url: "/logo-web.gif", type: "image/gif" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full overflow-x-clip">
      <body className="min-h-screen bg-[#f5f4ef] text-zinc-900">
        <Providers>
          <div id="top" />
          <SplashScreen minMs={900} hardTimeoutMs={1800} oncePerSession />
          <Navbar />
          <HashScrollFix />
          <main
            className={[
              "overflow-x-hidden",
              "relative min-h-screen",
              "bg-[url('/porto-eryca/bg12.png')] bg-center bg-cover bg-fixed",
            ].join(" ")}
          >
            {children}
          </main>

          <StickySpotify />
          <Analytics />
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
