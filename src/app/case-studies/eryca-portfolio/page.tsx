/* eslint-disable @next/next/no-img-element */
import CaseLayout from "@/components/case/CaseLayout";

import TwoColSection from "@/components/case/TwoColSect";
import TimelineDuo from "@/components/case/TimelineDuo";
import RoleStrip from "@/components/case/RoleStrip";
import ProtoAndFeatures from "@/components/case/ProtoAndFeatures";
// import FeatureCard tidak perlu langsung karena dipakai via ProtoAndFeatures

export const metadata = { title: "Eryca Portfolio — Case Study" };

export default function Page() {
  return (
    <CaseLayout
      meta={{
        title: "Eryca Portfolio",
        subtitle:
          "Personal portfolio yang cepat, jelas, dan crafted — fokus pada pengalaman scroll dan storytelling.",
        year: "2025",
        tag: "Design & Front-End",
        duration: "ongoing",
        role: "Product Designer • Front-End",
        tools: ["Next.js 15", "React 19", "Tailwind", "Framer Motion"],
      }}
      // coverImage="/porto-eryca/mock-portfolio.jpg"
      prototypeUrl="https://www.figma.com/proto/your-eryca"
    >

      {/* Problem + Solution = 2 kolom */}
      <TwoColSection
        id="ps"
        titleLeft="Problem Statement"
        contentLeft={
          <ul>
            <li>Versi lama sulit di-scaling dan tidak modular.</li>
            <li>Pengunjung tidak langsung paham value &amp; layanan.</li>
            <li>Perf &amp; LCP perlu ditingkatkan untuk mobile.</li>
          </ul>
        }
        titleRight="Solution"
        contentRight={
          <ul>
            <li>App Router + komponen reusable (Hero, Navbar, StickySpotify, dsb).</li>
            <li>Grid &amp; spacing mengikuti guideline Figma 12-kolom.</li>
            <li>Optimasi gambar &amp; motion “ringan”.</li>
          </ul>
        }
      />

      {/* UX + UI timeline 2 kolom, masing2 sisip gambar 4:3 */}
      <TimelineDuo
        id="process"
        ux={{
          title: "UX Timeline",
          bullets: [
            "Inventaris konten & pemetaan jalur user",
            "Wireframe → flow → prototipe interaktif",
            "Validasi cepat & iterasi",
          ],
          image: "/porto-eryca/ux-timeline.jpg", // ganti fotomu (4:3)
        }}
        ui={{
          title: "UI Timeline",
          bullets: [
            "Design tokens (warna, tipe, radius, shadow)",
            "UI kit & states",
            "Motion & polish aksesibilitas",
          ],
          image: "/porto-eryca/ui-timeline.jpg", // ganti fotomu (4:3)
        }}
      />

      {/* Role tanpa kartu + ikon tools */}
      <RoleStrip
        tools={[
          { label: "Figma", icon: "/icons/figma.svg" },
          { label: "React", icon: "/icons/react.svg" },
          { label: "Tailwind", icon: "/icons/tailwind.svg" },
          { label: "Framer Motion", icon: "/icons/framer.svg" },
        ]}
      />


      {/* Prototype + Primary Functions satu baris (2 kolom) */}
      <ProtoAndFeatures
        id="prototype-and-features"
        protoSrc="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/your-eryca"
        features={[
          {
            title: "Search",
            description: <>Pencarian dengan filter, cukup masukkan tujuan untuk mulai menelusuri karya/halaman terkait.</>,
            image: "/porto-eryca/feature1.jpg",
          },
          {
            title: "Timetables & Live Updates",
            description: <>Jadwal rilis/updates bisa dilihat per waktu, real-time agar info selalu akurat.</>,
            image: "/porto-eryca/feature2.jpg",
          },
          {
            title: "Pay Online & Share Details",
            description: <>Dukungan pembayaran dan berbagi detail proyek ke klien/teman secara mudah.</>,
            image: "/porto-eryca/feature3.jpg",
          },
        ]}
      />

      {/* Testimoni 1 baris + foto 1:1 */}
      {/* Bisa jadikan beberapa—ulang komponen ini untuk list */}
      <section id="testimonials" className="scroll-mt-24 mb-10">
        <h2 className="font-serif text-2xl md:text-3xl mb-4">Testimonials</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/50 bg-white/75 backdrop-blur p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-4">
              <img src="/porto-eryca/ava1.jpg" alt="Client" className="h-16 w-16 rounded-xl object-cover aspect-square border border-neutral-200" />
              <div>
                <p className="text-lg leading-relaxed">“Halaman kerjanya rapi, gampang paham fokus dan gaya visualnya.”</p>
                <p className="mt-1 text-sm text-neutral-600">— Client A</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/50 bg-white/75 backdrop-blur p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-4">
              <img src="/porto-eryca/ava2.jpg" alt="Reviewer" className="h-16 w-16 rounded-xl object-cover aspect-square border border-neutral-200" />
              <div>
                <p className="text-lg leading-relaxed">“Navigasi satset, performa cepat, dan enak dibaca.”</p>
                <p className="mt-1 text-sm text-neutral-600">— Reviewer B</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CaseLayout>
  );
}
