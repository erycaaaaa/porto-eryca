/* eslint-disable @next/next/no-img-element */
import React from "react";
import CaseLayout, { CaseSection } from "@/components/case/CaseLayout";
import TwoColSection from "@/components/case/TwoColSect";
import TimelineDuo from "@/components/case/TimelineDuo";
import RoleStrip from "@/components/case/RoleStrip";
import { FaGithub } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNetlify,
} from "react-icons/si";

export default function Page() {
  return (
    <CaseLayout
      meta={{
        title: "Website Wihara",
        subtitle:
          "Situs informasi vihara yang ringan, jelas, dan selalu terbarui — fokus pada akses mudah dan penyatuan kegiatan.",
        year: "2026",
        tag: "Design & Front-End",
        duration: "ongoing",
        role: "Product Designer • Front-End",
        tools: ["Boostraps5", "HTML", "CSS", "JS", "Netlify"], // + Netlify
      }}
    >
      {/* LOGOS */}
      <section className="mt-8 mx-auto max-w-6xl px-6 pb-6">
        <ul className="flex flex-wrap items-center justify-center gap-12 opacity-80 grayscale hover:grayscale-0 transition">
          <li className="flex items-center justify-center text-4xl">
            <FaGithub title="GitHub" />
          </li>
          <li className="flex items-center justify-center text-4xl">
            <SiNextdotjs title="Next.js" />
          </li>
          <li className="flex items-center justify-center text-4xl text-[#3178C6]">
            <SiTypescript title="TypeScript" />
          </li>
          <li className="flex items-center justify-center text-4xl text-[#06B6D4]">
            <SiTailwindcss title="Tailwind CSS" />
          </li>
          <li className="flex items-center justify-center text-4xl">
            <a
              href="https://wihara-chatra-dhammapanno.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka situs live di Netlify"
              className="text-[#00C7B7] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#00C7B7]/40 rounded-md"
            >
              <SiNetlify title="Netlify (Live)" />
            </a>
          </li>
        </ul>
      </section>
      {/* HERO (img biasa) */}
      {/* HERO (img biasa) */}
      <section className="mx-auto max-w-6xl px-6 mt-8">
        {/* HERO IMAGE */}
        <img
          alt="Website Wihara Chatra Dhammapanno"
          title="Website Wihara Chatra Dhammapanno"
          src="/porto-eryca/wihara-mini.jpg"
          loading="eager"
          className="h-full w-full object-cover rounded-2xl border"
        />

        {/* CTA */}
        <div className="mt-3 text-center">
          <a
            href="https://wihara-chatra-dhammapanno.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka situs live di Netlify"
            title="Buka situs live di Netlify"
            className="inline-flex items-center gap-2 rounded-b-full border border-[#000000] px-4 py-2 text-sm font-medium text-[#000000] hover:bg-[#ffff]"
          >
            View Website
          </a>
        </div>
      </section>



      {/* ABOUT — lebar */}
      <CaseSection id="about" title="About Website">
        <div className="prose prose-neutral max-w-none">
          <p>
            Website ini dibuat agar umat dan masyarakat bisa{" "}
            <strong>lebih mudah menjangkau informasi kegiatan vihara</strong>,
            meskipun vihara berada di lokasi yang jauh/terpencil dan jaringan
            internet terbatas. Semua pengumuman, jadwal ibadah, dan kegiatan
            sosial dihimpun dalam satu tempat yang ringan, jelas, dan selalu
            diperbarui.
          </p>
          <p>
            Tujuan kami sederhana: menjadi{" "}
            <em>pusat kegiatan (event center)</em> yang memudahkan komunikasi,
            pendaftaran acara, serta pengingat jadwal—sehingga siapa pun dapat
            mengikuti perkembangan vihara dari mana saja.
          </p>

          <h4>Yang kamu temukan di website ini</h4>
          <ul>
            <li>
              <strong>Jadwal Ibadah & Event</strong> — puja bakti, meditasi,
              kelas Dhamma, bakti sosial (terintegrasi kalender).
            </li>
            <li>
              <strong>Pengumuman Cepat</strong> — informasi terbaru di beranda
              (perubahan jam, cuaca, dsb.).
            </li>
            <li>
              <strong>Pendaftaran Online</strong> — formulir sederhana +
              konfirmasi via WhatsApp/SMS.
            </li>
            <li>
              <strong>Peta & Arah</strong> — link peta, titik kumpul, dan
              catatan transport.
            </li>
            <li>
              <strong>Kontak & Donasi</strong> — nomor admin, kanal tanya-jawab,
              dan QRIS/rek. donasi.
            </li>
          </ul>
        </div>
      </CaseSection>

      {/* Problem + Solution — 2 kolom */}
      <TwoColSection
        id="ps"
        titleLeft="Problem Statement"
        contentLeft={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Info kegiatan tersebar (grup WA/selebaran), sulit dilacak.</li>
            <li>Perubahan jadwal mendadak tidak cepat sampai ke semua umat.</li>
            <li>
              Lokasi terpencil & jaringan lemah menyulitkan akses informasi.
            </li>
          </ol>
        }
        titleRight="Solution"
        contentRight={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Website ringan sebagai pusat informasi & event vihara.</li>
            <li>Pendaftaran online, pengumuman cepat, peta & kontak admin.</li>
          </ol>
        }
      />

      {/* UX + UI timeline — varian tombol (tanpa gambar) */}
      <TimelineDuo
        id="process"
        variant="buttons"
        ux={{
          title: "UX Timeline",
          bullets: [
            "Inventaris konten & pemetaan jalur user",
            "Wireframe → flow → prototipe interaktif",
            "Validasi cepat & iterasi",
          ],
        }}
        ui={{
          title: "UI Timeline",
          bullets: [
            "Design tokens (warna, tipe, radius, shadow)",
            "UI kit & states",
            "Motion & polish aksesibilitas",
          ],
        }}
      />

      {/* Role — strip sederhana + ikon tools */}
      <RoleStrip
        tools={[
          { label: "Figma", icon: "/icons/figma.svg" },
          { label: "React", icon: "/icons/react.svg" },
          { label: "Tailwind", icon: "/icons/tailwind.svg" },
          { label: "Framer Motion", icon: "/icons/framer.svg" },
        ]}
      />

      {/* Testimoni */}
      <section id="testimonials" className="scroll-mt-24 mb-10">
        <h2 className="font-serif text-2xl md:text-3xl mb-4">Testimonials</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/50 bg-white/75 backdrop-blur p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-4">
              <img
                src="/porto-eryca/ava1.jpg"
                alt="Umat"
                className="h-16 w-16 rounded-xl object-cover aspect-square border border-neutral-200"
              />
              <div>
                <p className="text-lg leading-relaxed">
                  “Sekarang jadwal puja dan info acara mudah dicek, tidak
                  ketinggalan lagi.”
                </p>
                <p className="mt-1 text-sm text-neutral-600">— Umat A</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/50 bg-white/75 backdrop-blur p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-4">
              <img
                src="/porto-eryca/ava2.jpg"
                alt="Relawan"
                className="h-16 w-16 rounded-xl object-cover aspect-square border border-neutral-200"
              />
              <div>
                <p className="text-lg leading-relaxed">
                  “Pengumuman cepat dan pendaftaran online membantu kami
                  koordinasi relawan.”
                </p>
                <p className="mt-1 text-sm text-neutral-600">— Relawan B</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CaseLayout>
  );
}
