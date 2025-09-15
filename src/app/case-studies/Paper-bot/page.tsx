// app/(case)/edubot/page.tsx
import CaseLayout, { CaseSection } from "@/components/case/CaseLayout";
import ProtoAndFeatures from "@/components/case/ProtoAndFeatures";
import Image from "next/image";

export const metadata = {
  title: "EduBot UI/UX Design — Case Study",
};

export default function Page() {
  return (
    <CaseLayout
      meta={{
        title: "EduBot UI/UX Design",
        subtitle:
          "Design system & conversational flow for an educational chatbot.",
        year: "2025",
        tag: "UI/UX • Chatbot",
        duration: "8 weeks",
        role: "Designer • Researcher",
        tools: ["Figma", "Next.js", "Tailwind", "Framer Motion"],
      }}
      quickFacts={[
        { label: "Screens", value: "30" },
        { label: "Usability Tests", value: "5 rounds" },
        { label: "Components", value: "25+" },
      ]}
    >
      {/* ABOUT */}
      <CaseSection id="about" title="About Project">
        <p className="mb-3">
          EduBot is a chatbot platform for schools to provide Q&amp;A services
          for students and teachers. The design focused on conversational UI,
          accessibility, and a scalable component system.
        </p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          <li className="rounded-lg border bg-white/70 p-3 text-sm">
            🎯 <strong>Goal:</strong> faster answers for students, less admin load.
          </li>
          <li className="rounded-lg border bg-white/70 p-3 text-sm">
            ♿ <strong>A11y:</strong> high contrast, keyboard & screen reader friendly.
          </li>
          <li className="rounded-lg border bg-white/70 p-3 text-sm">
            🔁 <strong>System:</strong> tokenized theme + reusable chat atoms.
          </li>
          <li className="rounded-lg border bg-white/70 p-3 text-sm">
            🔍 <strong>Validation:</strong> 5 rounds of hallway tests.
          </li>
        </ul>
      </CaseSection>

      {/* PROTOTYPE + PRIMARY FUNCTIONS */}
      <ProtoAndFeatures
        id="prototype-and-features"
        protoSrc="https://embed.figma.com/design/sh3UMrLlHhoAcHHWTiFEi2/EduBuddy-Chatbot?node-id=0-1&embed-host=share"
        features={[
          {
            title: "Conversational UI states",
            description: (
              <>
                Bubble variants (user/bot), typing indicators, retry/error,
                and message grouping to keep context clear.
              </>
            ),
          },
          {
            title: "Quick actions & intents",
            description: (
              <>
                Suggestion chips, semantic slots, and shortcuts (e.g. “Ask
                teacher”, “Schedule info”) to reduce friction.
              </>
            ),
          },
          {
            title: "Design tokens & components",
            description: (
              <>
                Color/typography/radius/spacing tokens + composable chat atoms
                (Bubble, InputBar, Chip, Banner) for rapid scaling.
              </>
            ),
          },
        ]}
      />

      {/* ⬇️ PKM MOMENTS — 2 foto */}
      <CaseSection id="pkm" title="PKM Moments">
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

          {/* Card 1 */}
          <li className="overflow-hidden rounded-2xl border border-white/60 bg-white/75 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/porto-eryca/pkm1.png"       // ganti path fotomu
                alt="PKM — sesi foto bersama"
                fill
                priority={false}
                className="object-cover"
                sizes="(min-width:1024px) 50vw, 100vw"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium">Sesi Presentasi</h4>
              <p className="mt-1 text-sm text-neutral-600">
                Memaparkan alur percakapan EduBot dan feedback awal pengguna.
              </p>
            </div>
          </li>

          {/* Card 2 */}
          <li className="overflow-hidden rounded-2xl border border-white/60 bg-white/75 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/porto-eryca/pkm2.png"       // ganti path fotomu
                alt="PKM — uji coba bersama guru"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 50vw, 100vw"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium">Uji Coba Lapangan</h4>
              <p className="mt-1 text-sm text-neutral-600">
                Validasi fitur quick intents & aksesibilitas pada perangkat siswa.
              </p>
            </div>
          </li>

            {/* Card 3 */}
          <li className="overflow-hidden rounded-2xl border border-white/60 bg-white/75 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/porto-eryca/hki-edu.png"       // ganti path fotomu
                alt="Hak Cipta Desain Antarmuka EduBuddy Bot"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 50vw, 100vw"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium">Uji Coba Lapangan</h4>
              <p className="mt-1 text-sm text-neutral-600">
                HKI Pengembangan Antarmuka ChatBot EduBuddy
              </p>
            </div>
          </li>

        </ul>
      </CaseSection>
    </CaseLayout>
  );
}
