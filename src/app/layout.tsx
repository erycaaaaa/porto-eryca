// src/app/layout.tsx
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickySpotify from "@/components/sections/media/StickySpotify";
import SplashScreen from "@/components/layout/SplashScreen";
import Providers from "./providers";
import HashScrollFix from "@/components/system/HashScrollFix";

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
              "bg-[url('/porto-eryca/bg-mua.png')] bg-no-repeat",
              "bg-top bg-cover",
              "md:bg-fixed md:bg-center md:bg-cover",
              "text-neutral-900",
            ].join(" ")}
          ></main>
          <Footer />
          <StickySpotify />
        </Providers>
      </body>
    </html>
  );
}
