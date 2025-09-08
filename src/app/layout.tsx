// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SplashScreen from "@/components/layout/SplashScreen";
import Providers from "./providers";
import StickySpotify from "@/components/sections/media/StickySpotify";
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Eryca",
  description:
    "Clean, usable, and scalable design — from research to polished handoff.",
  icons: { icon: [{ url: "/porto-eryca/logo-pp.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full overflow-x-hidden"
    >
      {/* id="top" supaya link 'Back to top' di footer berfungsi */}
      <body
            >
        <Providers>
          <SplashScreen />
          <Navbar />

          {/* clip any accidental wide child */}
          <main className=" w-full overflow-x-clip">{children}</main>

          {/* FOOTER di-global di sini */}
          <Footer
            brandName="Eryca Portfolio"
            brandLogoSrc="/porto-eryca/logo-pp.svg
            " // opsional
            decorativeGifSrc="/porto-eryca/logo-web.gif
            "
            // ⬅️ taruh file di public/mee.gif
            decorativeAlt="" // dekoratif → alt kosong
            socials={{
              github: "https://github.com/erycaaaaa",
              instagram: "https://instagram.com/yourhandle",
              linkedin: "https://www.linkedin.com/in/yourhandle/",
              email: "hello@yourdomain.com",
            }}
          />

          {/* fixed widget – fine; won’t cause overflow */}
          <StickySpotify />
        </Providers>
      </body>
    </html>
  );
}
