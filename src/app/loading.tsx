/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/layout.tsx
import "./globals.css";
import SplashScreen from "@/components/layout/SplashScreen";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full overflow-x-clip">
      <body className="min-h-screen bg-[#f5f4ef] text-zinc-900">
        <SplashScreen defaultDurationMs={900} />
      </body>
    </html>
  );
}
