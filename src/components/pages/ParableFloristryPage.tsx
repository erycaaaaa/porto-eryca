// --- types ---
type KPI = { label: string; kpi: string | number };
type ServiceItem = { title: string; blurb: string };

// --- Section (KPI <-> Services) ---
function Section({
  variant = "services",
  items = [],
  services = [],
  title,
}: {
  variant?: "kpi" | "services";
  items?: KPI[];
  services?: ServiceItem[];
  title?: string;
}) {
  const isKPI = variant === "kpi";
  const heading = title ?? (isKPI ? "Impact at a glance" : "What I do at a glance");

  return (
    <section
      id={isKPI ? "impact" : "services"}
      className="relative overflow-hidden py-12 rounded-3xl bg-gradient-to-r from-[#ffffff17] via-[#5f3d24] to-[#ffffff17]"
      aria-labelledby="impact-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_0%,rgba(95,61,36,.25),transparent_60%)]" />

      <div className="relative container mx-auto max-w-7xl px-5">
        <h2 id="impact-heading" className="text-center font-serif text-2xl md:text-3xl text-[#f8e6c9]">
          {heading}
        </h2>

        {isKPI ? (
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {items.map((it) => (
              <div
                key={it.label}
                className="rounded-2xl bg-white/90 p-5 text-center ring-1 ring-black/5 shadow-md transition-transform hover:-translate-y-0.5"
              >
                <dt className="sr-only">{it.label}</dt>
                <dd className="text-2xl md:text-3xl font-semibold text-[#4c3e1f]">{it.kpi}</dd>
                <div className="mt-1 text-xs md:text-sm text-neutral-700">{it.label}</div>
              </div>
            ))}
          </dl>
        ) : (
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="rounded-2xl bg-white/95 p-5 text-center ring-1 ring-black/5 shadow-md transition-transform hover:-translate-y-0.5"
              >
                <dt className="text-lg md:text-xl font-semibold text-primary">{svc.title}</dt>
                <dd className="mt-1 text-xs md:text-sm text-neutral-700">{svc.blurb}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

// ------ Page ------
import IntroCardsAnimated from "@/components/sections/about/IntroCards";
import AboutMeAnimated from "@/components/sections/about/AboutMe";
import ApproachSlider from "@/components/sections/extras/Approach";
import ExternalLogoStrip from "@/components/sections/extras/LogoStrips";
import Testimonial from "@/components/sections/extras/Testimonials";
import CaseStudiesSection from "@/components/sections/extras/CaseStudies";
import ApproachVisual from "@/components/sections/extras/ApproachVisual";
import Hero from "@/components/sections/hero/Hero";

export default function ParableFloristryPage() {
  return (
    <div className="min-h-screen bg-[#f5f4ef]/70 text-black">
      <main>
        <Hero name="ERYCA DHAMMA SHANTY" subtitle="UI/UX & Frontend Enthusiast" />
        <IntroCardsAnimated />
        <AboutMeAnimated />
        <ExternalLogoStrip />
        <ApproachSlider />
        <Section
          variant="services"
          services={[
            { title: "Web Design", blurb: "Landing pages, e-commerce, UX flow" },
            { title: "Graphic Design", blurb: "Logo, poster, social media assets" },
            { title: "Illustration", blurb: "Digital & hand-drawn untuk brand & campaign" },
            { title: "Frontend Development", blurb: "Next.js · React · Tailwind — UI responsif & aksesibel" },
          ]}
          title="What I do at a glance"
        />
        <CaseStudiesSection />
        <ApproachVisual />
        <Testimonial />
         
      </main>
    </div>
  );
}
