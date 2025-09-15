
import CaseLayout, { CaseSection } from "@/components/case/CaseLayout";
import TimelineDuo from "@/components/case/TimelineDuo";
import TwoColSection from "@/components/case/TwoColSect";
import RoleStrip from "@/components/case/RoleStrip";
import ProtoAndFeatures from "@/components/case/ProtoAndFeatures";
import TestimonialRow from "@/components/case/TestimonialRow";

export const metadata = {
  title: "Parable Floristry — Case Study",
};

export default function Page() {
  return (
    <CaseLayout
      meta={{
        title: "Parable Floristry",
        subtitle:
          "Boutique floristry brand website with crisp UX, smooth motion, and warm editorial tone.",
        year: "2024",
        tag: "Brand & Web",
        duration: "6 weeks",
        role: "UI/UX • Front-End",
        tools: ["Figma", "Next.js", "Tailwind", "Framer Motion"],
      }}

      quickFacts={[
        { label: "Screens", value: "24" },
        { label: "Components", value: "18+" },
        { label: "Lighthouse Perf", value: "95+" },
        { label: "Conversion CTAs", value: "↑ 22%" },
      ]}
      resumeHref="/resume-eryca.pdf"
    >
      {/* ABOUT — lebar */}
      <CaseSection id="about" title="About Project">
        <p>
          Parable Floristry adalah butik florist dengan pengalaman belanja personal.
          Fokus studi kasus: arsitektur konten, narasi brand, dan micro-interaction
          yang membuat user betah mengeksplor koleksi buket & karya editorial.
        </p>
      </CaseSection>

      {/* PROBLEM + SOLUTION — 2 kolom */}
      <TwoColSection
        id="ps"
        titleLeft="Problem Statement"
        contentLeft={
          <ul>
            <li>Brand story belum tersampaikan kuat di laman utama.</li>
            <li>Pengunjung sulit menemukan koleksi unggulan & CTA.</li>
            <li>Kecepatan & konsistensi visual belum optimal.</li>
          </ul>
        }
        titleRight="Solution"
        contentRight={
          <ul>
            <li>Hero yang menonjolkan value & koleksi kurasi.</li>
            <li>Navigasi ringkas + grid 12 kolom untuk konten.</li>
            <li>Motion micro-interaction untuk hierarchy & feedback.</li>
          </ul>
        }
      />

      {/* UX + UI TIMELINE — 2 kolom + gambar 4:3 (placeholder, kamu isi sendiri) */}
      <TimelineDuo
        id="process"
        ux={{
          title: "UX Timeline",
          bullets: [
            "Persona sketch & content audit",
            "User flow → wireframe → prototipe",
            "Usability check & iterasi 3 ronde",
          ],
          image: "/porto-eryca/ux-parable.jpg", // 4:3 — kamu isi
        }}
        ui={{
          title: "UI Timeline",
          bullets: [
            "Tokens (warna, tipe, radius, shadow)",
            "UI kit: kartu koleksi, hero, CTA, gallery",
            "Motion & aksesibilitas (focus ring, contrast)",
          ],
          image: "/porto-eryca/ui-parable.jpg", // 4:3 — kamu isi
        }}
      />

      {/* ROLE — strip sederhana + ikon tools */}
      <RoleStrip
        tools={[
          { label: "Figma", icon: "/icons/figma.svg" },
          { label: "React", icon: "/icons/react.svg" },
          { label: "Tailwind", icon: "/icons/tailwind.svg" },
          { label: "Framer Motion", icon: "/icons/framer.svg" },
        ]}
      />

      {/* UI SOLUTION — kartu ringkas */}
      <CaseSection id="ui-solution" title="UI Solution">
        <p>
          Palet rustic brown, tipografi serif-sans, kartu produk dengan depth halus,
          grid editorial untuk storytelling, dan komponen reusable (Hero, Collection, Story).
        </p>
      </CaseSection>

      {/* PROTOTYPE + PRIMARY FUNCTIONS — 2 kolom */}
      <ProtoAndFeatures
        id="prototype-and-features"
        protoSrc="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/your-parable"
        features={[
          {
            title: "Search & Curated Browse",
            description: <>Pencarian cepat + kategori kurasi agar user menemukan buket sesuai tema/occasions.</>,
            image: "/porto-eryca/feature-parable-1.jpg", // 4:3 — kamu isi
          },
          {
            title: "Timetables & Live Updates",
            description: <>Informasi ketersediaan & jadwal pengiriman real-time, mengurangi friction checkout.</>,
            image: "/porto-eryca/feature-parable-2.jpg", // 4:3 — kamu isi
          },
          {
            title: "Pay Online & Share Details",
            description: <>Pembayaran populer + share detail pesanan untuk gift/ucapan khusus penerima.</>,
            image: "/porto-eryca/feature-parable-3.jpg", // 4:3 — kamu isi
          },
        ]}
      />

      {/* UX CASE — contoh alur ringkas */}
      <CaseSection id="ux-case" title="UX Case">
        <p>
          Alur “browse → detail bouquet → add to inquiry” diringkas menjadi 3 klik
          dengan CTA yang terbaca di atas fold & sticky di mobile.
        </p>
      </CaseSection>

      {/* TESTIMONIALS — 1 baris (2 item), foto 1:1 */}
      <section id="testimonials" className="scroll-mt-24 mb-10">
        <h2 className="font-serif text-2xl md:text-3xl mb-4">Testimonials</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TestimonialRow
            quote="Navigasinya gampang, foto bouquetnya ‘bercerita’ banget."
            author="Customer A"
            avatar="/porto-eryca/ava-floristry-1.jpg" // 1:1 — kamu isi
          />
          <TestimonialRow
            quote="Checkout lebih cepat dan informatif soal pengiriman."
            author="Customer B"
            avatar="/porto-eryca/ava-floristry-2.jpg" // 1:1 — kamu isi
          />
        </div>
      </section>
    </CaseLayout>
  );
}
