// src/app/tarot/page.tsx
import NavbarGame from "@/app/game/NavbarGame";
import HeroGame from "@/app/game/HeroGame";

export const dynamic = "force-static";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      {/* Background + overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-center bg-cover md:bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(106,29,100,0.88), rgba(149,6,100,0.86), rgba(10,6,100,0.95)), url('/porto-eryca/bg13.png')",
        }}
      />

      <NavbarGame/>
      <HeroGame games={["MakeStory","PlayGame","TakesNotes"]} />

      <section id="games" className="py-16 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6">
    
        </div>
      </section>
    </main>
  );
}

function normalizeSrc(raw: string) {
  const s = (raw ?? "").trim();
  return s.startsWith("/") || s.startsWith("http") ? s : `/${s}`;
}
