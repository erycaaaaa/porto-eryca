import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/layout/SplashScreen";
import Providers from "./providers";
import StickySpotify from "@/components/sections/media/StickySpotify";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full overflow-x-clip">
      <body className="min-h-screen bg-[#f5f4ef] text-zinc-900">
        <Providers>
          <SplashScreen defaultDurationMs={1200} />
          <Navbar />
          <main className="pt-0">{children}</main>
          <Footer />
          <StickySpotify />
        </Providers>
      </body>
    </html>
  );
}
