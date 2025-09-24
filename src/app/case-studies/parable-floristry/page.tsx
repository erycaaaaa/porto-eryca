import CaseLayout, { CaseSection } from "@/components/case/CaseLayout";
import TimelineDuo from "@/components/case/TimelineDuo";
import TwoColSection from "@/components/case/TwoColSect";
import ProtoAndFeatures from "@/components/case/ProtoAndFeatures";
import TestimonialRow from "@/components/case/TestimonialRow";
import SiteHero from "@/components/case/SiteHero-Bunga";
import {
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaBootstrap,
  FaFigma,
} from "react-icons/fa";

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
        tools: ["JS", "CSS", "HTML", "Boostraps5"],
      }}
      quickFacts={[
        { label: "Screens", value: "24" },
        { label: "Components", value: "18+" },
        { label: "Lighthouse Perf", value: "95+" },
        { label: "Conversion CTAs", value: "↑ 22%" },
      ]}
      resumeHref="/resume-eryca.pdf"
    >
      {/* HERO WEBSITE */}
      <SiteHero
        title="Toko Bunga Fajar"
        tagline="Affordable boutique bouquets from Pasar Rawa Belong — crafted with a warm editorial touch."
        siteUrl="https://erycaaaaa.github.io/toko-bunga-fajar/"
        figmaUrl="https://embed.figma.com/design/B7aozMLHyu5r81GO0MhkVg/TOKO-BUNGA-FAJAR---ERYCA?node-id=0-1&embed-host=share"
        poster="/porto-eryca/faja1.jpg"
      />

      {/* LOGOS */}
      <section className="mt-8 mx-auto max-w-6xl px-6 pb-6">
        <ul className="flex flex-wrap items-center justify-center gap-12 opacity-80 grayscale hover:grayscale-0 transition">
          <li className="flex items-center justify-center text-4xl">
            <FaGithub title="GitHub" />
          </li>
          <li className="flex items-center justify-center text-4xl text-sky-500">
            <FaHtml5 title="HTML" />
          </li>
          <li className="flex items-center justify-center text-4xl text-pink-500">
            <FaCss3Alt title="CSS" />
          </li>
          <li className="flex items-center justify-center text-4xl text-pink-500">
            <FaBootstrap title="Bootstraps5" />
          </li>
          <li className="flex items-center justify-center text-4xl text-pink-500">
            <FaFigma title="Figma" />
          </li>
        </ul>
      </section>

      {/* ABOUT — lebar */}
      <div className="mt-10.5">
        <CaseSection id="about" title="About Project">
          <p>
            Perkenalan saya dengan Bapak Fajar dimulai secara tidak sengaja dari
            TikTok. Saat itu saya sedang mencari bunga yang affordable dan
            berkualitas, lalu menemukan akun beliau yang berjualan bunga di
            Pasar Rawa Belong. Bapak Fajar baru saja memanfaatkan TikTok dan
            WhatsApp untuk promosi serta menerima pemesanan langsung. Dari situ
            saya terpikir, sayang sekali kalau bunga-bunga cantik dan murah ini
            hanya diketahui oleh pengunjung pasar. Banyak orang di luar sana
            yang pasti ingin menikmati bunga berkualitas dengan harga
            terjangkau. Karena itu, saya membuat website ini agar usaha Bapak
            Fajar bisa dikenal lebih luas, memudahkan pemesanan, dan membantu
            memperluas jangkauan pelanggan. Website ini adalah langkah awal
            untuk membawa keindahan bunga dari Pasar Rawa Belong ke lebih banyak
            rumah, kantor, dan acara, di mana pun kamu berada. 🌷✨
          </p>
        </CaseSection>
      </div>

      {/* PROBLEM + SOLUTION — 2 kolom */}
      <TwoColSection
        id="ps"
        titleLeft="Problem Statement"
        contentLeft={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Media sosial Bapak Fajar belum menjangkau banyak audiens.</li>
            <li>Promosi hanya mengandalkan TikTok dan WhatsApp.</li>
            <li>
              Pelanggan harus datang langsung ke Pasar Rawa Belong untuk membeli
              bunga.
            </li>
          </ol>
        }
        titleRight="Solution"
        contentRight={
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              Mengembangkan Instagram untuk meningkatkan engagement dan
              jangkauan.
            </li>
            <li>
              Membangun website agar pembelian bunga bisa dilakukan dengan
              mudah.
            </li>
            <li>
              Membuat katalog produk agar pelanggan bisa melihat koleksi bunga
              dari mana saja.
            </li>
          </ol>
        }
      />

      {/* UX + UI TIMELINE */}
      <TimelineDuo
        id="process"
        ux={{
          title: "UX Timeline",
          bullets: [
            "Persona sketch & content audit",
            "User flow → wireframe → prototipe",
            "Usability check & iterasi 3 ronde",
          ],
        }}
        ui={{
          title: "UI Timeline",
          bullets: [
            "Tokens (warna, tipe, radius, shadow)",
            "UI kit: kartu koleksi, hero, CTA, gallery",
            "Motion & aksesibilitas (focus ring, contrast)",
          ],
        }}
        // variant="buttons" // aktifkan kalau kamu sudah buat varian tombol
      />

      {/* UI SOLUTION — kartu ringkas */}
      <CaseSection id="ui-solution" title="UI Solution">
        <p>
          Palet rustic brown, tipografi serif-sans, kartu produk dengan depth
          halus, grid editorial untuk storytelling, dan komponen reusable (Hero,
          Collection, Story).
        </p>
      </CaseSection>

      <ProtoAndFeatures
        id="prototype-and-features"
        protoSrc="https://embed.figma.com/design/B7aozMLHyu5r81GO0MhkVg/TOKO-BUNGA-FAJAR---ERYCA?node-id=0-1&embed-host=share"
        features={[
          {
            title: "Search & Curated Browse",
            description: <>Pencarian cepat + kategori kurasi…</>,
          },
          {
            title: "Timetables & Live Updates",
            description: <>Info ketersediaan & jadwal real-time…</>,
          },
          {
            title: "Pay Online & Share Details",
            description: <>Pembayaran populer + share detail…</>,
          },
        ]}
      />

      {/* UX CASE — contoh alur ringkas */}
      <CaseSection id="ux-case" title="UX Case">
        <p>
          Alur pemesanan bunga yang sederhana dan cepat, dari landing page
          hingga checkout, dengan fokus pada kemudahan navigasi dan konversi.
        </p>
      </CaseSection>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="scroll-mt-24 mb-10">
        <h2 className="font-serif text-2xl md:text-3xl mb-4">What They Say</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TestimonialRow
            quote="Kemarin saya pulang kampung dan saya ceritain tuh kaka bikinin katalog..."
            author="Bapak Fajar"
            avatar="/porto-eryca/ava-floristry-1.jpg"
          />
        </div>
      </section>
    </CaseLayout>
  );
}
