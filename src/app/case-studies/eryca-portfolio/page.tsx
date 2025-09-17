/* eslint-disable @next/next/no-img-element */
import React from "react";
import CaseLayout, { CaseSection } from "@/components/case/CaseLayout";
import TwoColSection from "@/components/case/TwoColSect";
import TimelineDuo from "@/components/case/TimelineDuo";
import RoleStrip from "@/components/case/RoleStrip";
import { FaHtml5, FaCss3Alt, FaGithub, FaBootstrap } from "react-icons/fa";


export default function Page() {
  return (
    <CaseLayout
      meta={{
        title: "Website Wihara",
        subtitle:
          "Situs informasi vihara yang ringan, jelas, dan selalu terbarui — fokus pada akses mudah dan penyatuan kegiatan.",
        year: "2025",
        tag: "Design & Front-End",
        duration: "ongoing",
        role: "Product Designer • Front-End",
        tools: ["Boostraps5", "HTML", "CSS", "JS"],
      }}
      // coverImage="/porto-eryca/mock-portfolio.jpg"
      prototypeUrl="https://www.figma.com/proto/your-eryca"
    >
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
                </ul>
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
            Tujuan kami sederhana: menjadi <em>pusat kegiatan (event center)</em>{" "}
            yang memudahkan komunikasi, pendaftaran acara, serta pengingat
            jadwal—sehingga siapa pun dapat mengikuti perkembangan vihara dari
            mana saja.
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
              <strong>Pendaftaran Online</strong> — formulir sederhana + konfirmasi
              via WhatsApp/SMS.
            </li>
            <li>
              <strong>Notifikasi Ringan</strong> — pilihan pengingat lewat
              email/WhatsApp/Telegram.
            </li>
            <li>
              <strong>Peta & Arah</strong> — link peta, titik kumpul, dan catatan
              transport.
            </li>
            <li>
              <strong>Kontak & Donasi</strong> — nomor admin, kanal tanya-jawab,
              dan QRIS/rek. donasi.
            </li>
            <li>
              <strong>Aksesibilitas</strong> — font besar, kontras baik, mode
              gelap, bahasa Indonesia/daerah.
            </li>
            <li>
              <strong>Ramah Jaringan Lambat</strong> — gambar terkompresi,
              halaman ringan, cache (PWA).
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
            <li>Lokasi terpencil & jaringan lemah menyulitkan akses informasi.</li>
          </ol>
        }
        titleRight="Solution"
        contentRight={
          <ol className="list-decimal pl-5 space-y-1">
            <li>Website ringan sebagai pusat informasi & event vihara.</li>
            <li>Kalender terintegrasi + pengingat (WA/Telegram/email).</li>
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
