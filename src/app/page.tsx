import ParableFloristryPage from "@/components/pages/ParableFloristryPage";
import { TarotButtonLink } from "@/components/case/TarrotButton";

export default function HomePage() {
  return (
    <>
      <ParableFloristryPage />

      {/* Taruh tombol tarot di bawah page */}
      <div className="fixed bottom-6 right-6">
        <TarotButtonLink />
      </div>
    </>
  );
}
