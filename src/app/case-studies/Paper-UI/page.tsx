/* eslint-disable @next/next/no-img-element */
import CaseLayout, { CaseSection } from "@/components/case/CaseLayout";
import TwoColSection from "@/components/case/TwoColSect";
import { SiFigma, SiCanva} from "react-icons/si";
import { FaFileWord } from "react-icons/fa";

export default function Page() {
  return (
    <CaseLayout
      meta={{
        title: "Pengembangan Antarmuka Chatbot Edukatif",
        subtitle:
          "Fokus pengembangan UI/UX berbasis Figma, design system, dan usability untuk adopsi chatbot di sekolah dasar.",
        year: "2025",
        tag: "UI/UX • Research • Community Service",
        duration: "3 bulan",
        role: "Product Designer • UI/UX ",
        tools: ["Figma", "Auto-Layout & Variants", "Design Tokens", "Prototyping", "Usability Test"],
      }}
      quickFacts={[
        { label: "Siswa & Guru", value: "314 siswa • 20 guru" },
        { label: "Kegiatan", value: "Sosialisasi • Pelatihan • Pendampingan" },
        { label: "Fokus", value: "UI/UX, aksesibilitas, adopsi teknologi" },
        { label: "Hasil", value: "Keterlibatan naik, penerimaan positif" },
      ]}
      resumeHref="/resume-eryca.pdf"
    >
      {/* HERO IMAGE */}
      <img
        alt="EduBuddy Chatbot edukatif untuk SDN Kalideres 13 Petang"
        title="EduBuddy UI/UX"
        src="/porto-eryca/analisa2.jpg" 
        loading="eager"
        className="h-full w-full object-cover rounded-2xl border"
      />

      {/* LOGOS / STACK UI-UX */}
      <section className="mt-8 mx-auto max-w-7xl px-7 pb-7">
        <ul className="flex flex-wrap items-center justify-center gap-12 opacity-80 grayscale hover:grayscale-0 transition">
          <li className="flex items-center justify-center text-4xl"><SiFigma title="Figma" /></li>
          <li className="flex items-center justify-center text-4xl"><SiCanva title="Canva" /></li>
          <li className="flex items-center justify-center text-4xl"><FaFileWord title="Word" /></li>
        </ul>
      </section>

      {/* ABSTRAK */}
      <CaseSection id="abstrak" title="Abstrak">
        <p>
          Pengembangan kecerdasan buatan (AI) berpotensi meningkatkan efektivitas pembelajaran, namun keterbatasan
          infrastruktur serta pemahaman guru dan siswa masih menjadi hambatan dalam implementasinya di sekolah dasar.
          SDN Kalideres 13 Petang, dengan jumlah siswa 314 dari beragam latar belakang sosial ekonomi, menghadapi
          tantangan dalam meningkatkan interaksi siswa dan guru yang efektif. Tujuan kegiatan pengabdian masyarakat ini
          adalah memperkenalkan dan membantu penerapan chatbot edukatif EduBuddy sebagai media interaktif dalam proses
          pembelajaran. EduBuddy dirancang berbasis Large Language Model (LLM) dan teknologi Command R, yang
          memungkinkan chatbot merespons pertanyaan siswa secara otomatis, cepat, dan relevan. Kegiatan dilaksanakan
          melalui sosialisasi, pelatihan, dan pendampingan teknis kepada guru serta bimbingan penggunaan chatbot bagi
          siswa. Guru memperoleh keterampilan dalam integrasi chatbot dalam kegiatan belajar mengajar, sementara siswa
          diarahkan memanfaatkannya sebagai media belajar interaktif. Hasil kegiatan menunjukkan peningkatan
          keterlibatan siswa, perluasan akses informasi, serta dukungan signifikan bagi guru dalam menyampaikan materi.
          Evaluasi dilakukan melalui kuesioner dan observasi kelas, yang memperlihatkan penerimaan positif guru dan
          siswa. Diharapkan keberhasilan kegiatan ini dapat menjadi model transformasi digital pendidikan dasar serta
          mendorong penerapan teknologi AI lebih luas di dunia pendidikan.
        </p>
        <p className="mt-3"><b>Kata Kunci:</b> chatbot pendidikan, EduBuddy, interaksi belajar, kecerdasan buatan, SDN Kalideres 13 Petang</p>
      </CaseSection>

      {/* PENDAHULUAN */}
      <CaseSection id="pendahuluan" title="Pendahuluan">
        <p>
          Pemanfaatan AI dalam pendidikan berkembang pesat (pembelajaran adaptif, asisten virtual, evaluasi otomatis).
          Di SDN Kalideres 13 Petang (314 siswa), tantangan utama meliputi peningkatan partisipasi, keragaman latar
          belakang, kesiapan infrastruktur, dan literasi digital guru/siswa. Chatbot pendidikan berpotensi menjadi
          solusi interaktif untuk memperkuat proses belajar—namun adopsi memerlukan desain pengalaman yang tepat agar
          mudah dipahami dan diterima pengguna awal (guru & siswa).
        </p>
        <p className="mt-3">
          Kegiatan ini menitikberatkan pada perancangan UI/UX EduBuddy agar: 1) intuitif bagi siswa, 2) mendukung
          alur kerja guru (monitoring, kurasi materi), dan 3) adaptif dengan konteks kelas SD. Fokus UI/UX menjadi
          kunci keberhasilan implementasi teknologi, bukan hanya kapabilitas model AI.
        </p>
      </CaseSection>

      {/* FOKUS UI/UX: Figma & Prinsip Desain */}
      <TwoColSection
        id="uiux"
        titleLeft="Pendekatan UI/UX (Figma & Teknik)"
        contentLeft={
          <ul>
            <li><b>Discovery → Synthesis:</b> ringkas masalah & tujuan dari survei dan wawancara guru/siswa.</li>
            <li><b>Information Architecture:</b> pemetaan fitur per peran (Siswa, Guru, Admin) + prioritas konten.</li>
            <li><b>User Flows:</b> tanya–jawab</li>
            <li><b>Wireframe → Hi-fi:</b> Auto-Layout, Constraints, Variants, Component Properties.</li>
            <li><b>Design Tokens:</b> warna (kontras aman), tipe, spacing 8pt, radius, elevasi; siap diambil Front-End.</li>
          </ul>
        }
        titleRight="Prinsip Desain yang Diterapkan"
        contentRight={
          <ul>
            <li><b>Hierarchy & Clarity:</b> tipografi terstruktur; heading, body, helper yang konsisten.</li>
            <li><b>Consistency:</b> komponen reuse (Prompt Bar, Chat Bubble, Card Materi) dengan states lengkap.</li>
            <li><b>Feedback & Status:</b> loading skeleton, typing indicator, retry, empty state yang edukatif.</li>
          </ul>
        }
      />

      <CaseSection id="metode" title="Metode">
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <b>Analisis Kebutuhan:</b> survei & observasi tantangan belajar; identifikasi mata pelajaran prioritas.
          </li>
          <li>
            <b>Pengembangan & Integrasi:</b> EduBuddy berbasis LLM + Command R; integrasi ke antarmuka (server Labira,
            uji di Cohere Playground); fine-tuning dataset PJOK; validasi internal oleh asisten.
          </li>
          <li>
            <b>Pelatihan & Implementasi:</b> sosialisasi guru (login/peran), alur filter data, input/kurasi materi;
            pendampingan siswa untuk pemakaian mandiri dan tugas kelas.
          </li>
          <li>
            <b>Evaluasi & Umpan Balik:</b> kuesioner, wawancara, dan analisis interaksi untuk mengukur keterlibatan
            dan penerimaan; rekomendasi iterasi UI/UX.
          </li>
        </ol>
      </CaseSection>

      {/* HASIL & PEMBAHASAN (highlight temuan survei, fokus UI/UX) */}
      <CaseSection id="hasil" title="Hasil & Pembahasan">
        <p>
          Guru menunjukkan penerimaan sangat positif terhadap EduBuddy; mayoritas berada pada tingkat pemula dalam
          penggunaan AI sehingga antarmuka yang jelas dan sederhana krusial. Keterbatasan jaringan menjadi kendala
          utama, diikuti kebutuhan pelatihan berkala dan panduan penggunaan yang praktis.
        </p>
        <p className="mt-3">
          Dari kuesioner, guru memanfaatkan AI untuk referensi, pembuatan bahan ajar, latihan soal, hingga penilaian.
          EduBuddy dinilai memudahkan siswa mencari penjelasan tambahan dan belajar mandiri. Masukan inti terhadap UI/UX:
          perbaiki kejelasan label, permudah pencarian materi, berikan contoh pertanyaan, dan tampilkan ringkasan jawaban
          yang bisa disalin/dibagikan.
        </p>
      </CaseSection>

      {/* KESIMPULAN */}
      <CaseSection id="kesimpulan" title="Kesimpulan & Rencana Lanjutan">
        <p>
          EduBuddy efektif meningkatkan keterlibatan siswa dan membantu guru menyampaikan materi. Keberhasilan adopsi
          ditopang oleh desain UI/UX yang <i>learnable</i>, konsisten, dan aksesibel. Ke depan, rancangan akan
          dikembangkan ke <b>analisis berbasis aspek</b>, pelacakan progres belajar, dan <b>monitoring real-time</b>.
          Dari sisi desain, prioritas berikutnya: pengayaan <b>design system</b>, skenario <b>error/offline</b> yang
          lebih komprehensif, serta <b>usability testing</b> berkala dengan rubrik tugas kurikulum SD.
        </p>
      </CaseSection>
    </CaseLayout>
  );
}
