import NavbarGame from "@/app/game/NavbarGame";
import HeroGame from "@/app/game/HeroGame";

export const dynamic = "force-static";

type GameKey = "MakeStory" | "PlayGame" | "TakesNotes";
type GameTheme = {
  surface: string;
  ring: string;
  chip: string;
  glow: string;
  hover: string;
};

const GAME_THEMES: Record<GameKey, GameTheme> = {
  MakeStory: {
    surface: "bg-rose-500/10 border-rose-300/25",
    ring: "ring-1 ring-rose-300/30",
    chip: "bg-rose-500/20 text-rose-100",
    glow: "from-rose-400/0 via-rose-300/60 to-rose-400/0",
    hover: "hover:bg-rose-500/15 hover:border-rose-300/35",
  },
  PlayGame: {
    surface: "bg-violet-500/10 border-violet-300/25",
    ring: "ring-1 ring-violet-300/30",
    chip: "bg-violet-500/20 text-violet-100",
    glow: "from-violet-400/0 via-violet-300/60 to-violet-400/0",
    hover: "hover:bg-violet-500/15 hover:border-violet-300/35",
  },
  TakesNotes: {
    surface: "bg-amber-500/10 border-amber-300/25",
    ring: "ring-1 ring-amber-300/30",
    chip: "bg-amber-500/20 text-amber-100",
    glow: "from-amber-400/0 via-amber-300/60 to-amber-400/0",
    hover: "hover:bg-amber-500/15 hover:border-amber-300/35",
  },
};

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      {/* Background + overlay (TIDAK DIUBAH) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-center bg-cover md:bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(106,29,100,0.88), rgba(149,6,100,0.86), rgba(10,6,100,0.95)), url('/porto-eryca/bg13.png')",
        }}
      />

      <NavbarGame />
      <HeroGame
        games={["MakeStory", "PlayGame", "TakesNotes"]}
        themes={GAME_THEMES}  
      />

      <section id="games" className="py-16 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6"></div>
      </section>
    </main>
  );
}

// (hapus normalizeSrc jika tidak dipakai)
// Atau kalau mau disimpan:
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function normalizeSrc(raw: string) { ... }
