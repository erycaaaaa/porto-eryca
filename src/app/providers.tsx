"use client";

import { ThemeProvider } from "next-themes";
import NowPlayingProvider from "@/components/sections/media/NowPlayingProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NowPlayingProvider>{children}</NowPlayingProvider>
    </ThemeProvider>
  );
}
