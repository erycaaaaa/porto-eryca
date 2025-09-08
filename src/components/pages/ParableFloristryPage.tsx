import IntroCardsAnimated from "@/components/sections/about/IntroCards";
import AboutMeAnimated from "@/components/sections/about/AboutMe";
import ApproachQrBlock from "@/components/sections/extras/ApproachVisual";
import ApproachSlider from "@/components/sections/extras/Approach";
import ExternalLogoStrip from "@/components/sections/extras/LogoStrips";
import Testimonial from "@/components/sections/extras/Testimonials";
import CaseStudiesSection from "@/components/sections/extras/CaseStudies";
import Hero from "@/components/sections/hero/Hero";

// ------ tipe kecil yang dipakai ImpactHighlights ------
type KPI = { kpi: string; label: string };

// ------ Page ------
export default function ParableFloristryPage() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-black">
      <main>
        <Hero name="ERYCA" subtitle="GRAPHIC DESIGNER" />   {/* pakai Hero global */}
        <IntroCardsAnimated />
        <AboutMeAnimated />
        <ExternalLogoStrip />
        <ApproachSlider />
        <ImpactHighlights />
        <CaseStudiesSection />
        <ApproachQrBlock />
        <Testimonial />
      </main>
    </div>
  );
}

// ------ ImpactHighlights ------
export function ImpactHighlights({
  items = [
    { kpi: "+18%", label: "Delivery speed" },
    { kpi: "-32%", label: "Redesign time" },
    { kpi: "4.8/5", label: "User testing score" },
    { kpi: "6+", label: "Shipped projects" },
  ],
}: {
  items?: KPI[];
}) {
  return (
    <section
      id="impact"
      className="py-12 bg-gradient-to-r from-[#ffffff17] via-[#3b2f22] to-[#ffffff17]"
      aria-labelledby="impact-heading"
    >
      <div className="container mx-auto max-w-7xl px-5">
        <h2
          id="impact-heading"
          className="text-center font-serif text-2xl text-[#f8e6c9] md:text-3xl"
        >
          Impact at a glance
        </h2>
        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.label}
              className="rounded-2xl bg-white/90 p-5 text-center ring-1 ring-black/5 shadow-md"
            >
              <dt className="sr-only">{it.label}</dt>
              <dd className="text-2xl font-semibold text-[#4c3e1f] md:text-3xl">
                {it.kpi}
              </dd>
              <div className="mt-1 text-xs text-neutral-700 md:text-sm">
                {it.label}
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
