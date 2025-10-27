import ParableFloristryPage from "@/components/pages/ParableFloristryPage";
// import { TarotButtonLink } from "@/components/case/TarrotButton";
// import { GameButtonLink } from "@/components/case/GameButton";
import CommissionAdSection from "@/components/sections/extras/ButtonCommissions";
import { Analytics } from "@vercel/analytics/react";
export default function HomePage() {
  return (
    <>
      <ParableFloristryPage />
      <CommissionAdSection />
      <div className="fixed bottom-6 right-6">
        {/* <TarotButtonLink /> */}
        {/* <GameButtonLink /> */}
            <Analytics />
      </div>
    </>
  );
}
