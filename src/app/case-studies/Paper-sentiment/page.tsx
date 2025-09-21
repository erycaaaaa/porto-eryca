/* eslint-disable @next/next/no-img-element */
import CaseLayout, { CaseSection } from "@/components/case/CaseLayout";
import TimelineDuo from "@/components/case/TimelineDuo";
import TwoColSection from "@/components/case/TwoColSect";
import { BiLogoPlayStore } from "react-icons/bi";
import { SiPandas,SiGooglecolab } from "react-icons/si";
import { FaPython, FaFileExcel, FaGithub, FaFileWord } from "react-icons/fa";

export default function Page() {
  return (
    <CaseLayout
      meta={{
        title: "Sentiment Analysis on Transport Apps",
        subtitle:
          "Academic research: INSET Lexicon, TF-IDF vectorization, and Support Vector Machine classification for Indonesian transport app reviews.",
        year: "2025",
        tag: "Research • Natural Language Processing ",
        duration: "8 weeks",
        role: "Lead Researcher • Data Engineer • Author",
        tools: ["Python", "Pandas", "scikit-learn", "INSET Lexicon", "NLTK"],
      }}
      quickFacts={[
        { label: "Reviews Analyzed", value: "1,783" },
        { label: "Apps", value: "Access KAI, MyMRTJ, MitraDarat" },
        { label: "Model Accuracy", value: "87% (MyMRTJ)" },
        { label: "Publication", value: "JMSTKIK Vol. 2025" },
      ]}
      resumeHref="/resume-eryca.pdf"
    >
      {/* HERO IMAGE */}
      <img
        alt="Analisis Sentimen Ulasan Aplikasi Transportasi"
        title="sentiment analysis"
        src="/porto-eryca/analisa1.jpg"
        loading="eager"
        className="h-full w-full object-cover rounded-2xl border"
      />
        {/* LOGOS */}
        <section className="mt-8 mx-auto max-w-7x1 px-7 pb-7">
          <ul className="flex flex-wrap items-center justify-center gap-12 opacity-80 grayscale hover:grayscale-0 transition">
             <li className="flex items-center justify-center text-4xl">
               <FaGithub title="GitHub" />
             </li>
            <li className="flex items-center justify-center text-4xl">
              <FaPython title="Python" />
            </li>
            <li className="flex items-center justify-center text-4xl">
              <SiGooglecolab title="GoogleCollab" />
            </li>
            <li className="flex items-center justify-center text-4xl">
              <BiLogoPlayStore title="LogoPlayStore" />
            </li>
            <li className="flex items-center justify-center text-4xl">
              <FaFileWord title="FaFileWord" />
            </li>
            <li className="flex items-center justify-center text-4xl">
              <SiPandas title="SiPandas" />
            </li>  
            <li className="flex items-center justify-center text-4xl">
              < FaFileExcel title=" FaFileExcel" />
            </li>  
          </ul>
        </section>
        
      {/* ABOUT PAPER */}
      <div className="mt-15">
        <CaseSection id="about" title="About the Research">
          <p>
            Studi ini merupakan penelitian akademik yang dipublikasikan dalam Jurnal
            Muara Sains, Teknologi, Kedokteran, dan Ilmu Kesehatan (JMSTKIK) 2025.
            Penelitian berfokus pada analisis sentimen ribuan ulasan aplikasi
            transportasi digital Indonesia, seperti Access by KAI, MyMRTJ, dan
            MitraDarat. Dengan memanfaatkan kombinasi <b>INSET Lexicon</b>—kamus
            sentimen bahasa Indonesia—dan algoritma <b>Support Vector Machine (SVM)</b>,
            penelitian ini bertujuan memberikan kerangka kerja untuk memahami persepsi
            pengguna dan memperbaiki layanan berbasis data.
          </p>
          <p className="mt-4">
            Latar belakang riset ini adalah tingginya volume ulasan berbahasa Indonesia
            yang kaya slang dan variasi ejaan, membuat analisis manual sulit dilakukan.
            Melalui pendekatan berbasis leksikon dan machine learning, penelitian ini
            mengusulkan pipeline otomatis mulai dari pengumpulan data, pra-pemrosesan,
            pelabelan sentimen, hingga evaluasi model. Selain kontribusi teknis, studi
            ini juga berperan dalam menghubungkan data analitik dengan keputusan desain
            dan pengalaman pengguna di sektor transportasi publik.
          </p>
        </CaseSection>
      </div>

      {/* GAP VS SOLUTION */}
      <TwoColSection
        id="gap-solution"
        titleLeft="Research Motivation"
        contentLeft={
          <ul>
            <li>
              Volume ulasan aplikasi transportasi digital terus bertambah dan
              berisi opini beragam, sehingga perlu metode analisis otomatis.
            </li>
            <li>
              Penelitian NLP bahasa Indonesia masih minim dataset dan benchmark
              khusus untuk aplikasi publik transportasi.
            </li>
            <li>
              Stakeholder memerlukan insight cepat berbasis data untuk meningkatkan
              performa aplikasi, kualitas pelayanan, dan pengalaman pengguna.
            </li>
          </ul>
        }
        titleRight="Research Contributions"
        contentRight={
          <ul>
            <li>
              Pengembangan pipeline analisis sentimen lengkap: scraping → cleaning →
              labeling → TF-IDF → SVM → evaluasi.
            </li>
            <li>
              Integrasi kamus <b>INSET Lexicon</b> untuk akurasi pelabelan yang lebih
              tinggi pada konteks lokal bahasa Indonesia.
            </li>
            <li>
              Visualisasi data dalam bentuk word cloud dan grafik distribusi sentimen
              untuk mendukung pengambilan keputusan berbasis bukti.
            </li>
          </ul>
        }
      />

      {/* PIPELINE TIMELINE */}
      <TimelineDuo
        id="pipeline"
        ux={{
          title: "Dataset & Pre-processing",
          bullets: [
            "Mengumpulkan 1,783 ulasan aplikasi dari Google Play Store menggunakan teknik scraping.",
            "Tahap cleaning mencakup normalisasi slang, penghapusan simbol/angka, dan tokenisasi kata.",
            "Proses stemming mengubah kata ke bentuk dasar untuk mengurangi variasi ejaan.",
          ],
          image: "/porto-eryca/pre-pro.png",
        }}
        ui={{
          title: "Modeling & Evaluation",
          bullets: [
            "TF-IDF digunakan untuk memberi bobot penting pada kata dalam dataset ulasan.",
            "Algoritma SVM dengan kernel linear dan RBF diuji dengan 5-fold cross validation.",
            "Evaluasi menggunakan akurasi, precision, recall, F1-score, dan Confusion Matrix.",
          ],
          image: "/porto-eryca/svm.png",
        }}
      />

      {/* RESULTS */}
      <CaseSection id="results" title="Key Findings">
        <p>
          Model SVM memberikan akurasi tertinggi sebesar <b>87%</b> pada ulasan MyMRTJ,
          diikuti Access by KAI dengan <b>84%</b> dan MitraDarat <b>82%</b>. Kata-kata
          positif yang mendominasi antara lain “bagus”, “mudah”, dan “baik”,
          menunjukkan kepuasan pengguna terhadap layanan, sedangkan kata “gagal”,
          “sulit”, dan “lambat” menyoroti masalah performa aplikasi yang sering
          dihadapi pengguna.
        </p>
        <p className="mt-4">
          Temuan ini memperkuat pentingnya analisis sentimen sebagai alat strategis
          untuk perbaikan produk. Dengan pipeline ini, tim pengembang dapat secara
          proaktif memonitor persepsi pengguna, merespons keluhan, dan memprioritaskan
          perbaikan fitur berdasarkan bukti nyata.
        </p>
      </CaseSection>

      {/* IMPACT */}
      <CaseSection id="impact" title="Impact and Significance">
        <p>
          Penelitian ini tidak hanya berkontribusi pada pengembangan model NLP bahasa
          Indonesia, tetapi juga menciptakan dampak langsung bagi industri transportasi
          digital. Insight yang diperoleh membantu tim produk mengidentifikasi titik
          friksi dalam perjalanan pengguna, memperbaiki stabilitas aplikasi, dan
          meningkatkan pengalaman belanja tiket transportasi publik.
        </p>
        <p className="mt-4">
          Pipeline ini dapat diadaptasi untuk sektor lain seperti e-commerce,
          perbankan digital, dan layanan publik, memberikan fondasi analitik yang
          dapat diskalakan. Secara akademik, penelitian ini memperkaya literatur NLP
          lokal dengan kombinasi pendekatan leksikon dan machine learning untuk
          bahasa Indonesia.
        </p>
      </CaseSection>

      {/* CONCLUSION */}
      <CaseSection id="conclusion" title="Conclusion & Future Work">
        <p>
          Dengan menggabungkan <b>INSET Lexicon</b> dan <b>SVM</b>, penelitian ini
          membuktikan bahwa analisis sentimen berbahasa Indonesia dapat mencapai
          akurasi tinggi dan memberikan insight praktis. Ke depan, framework ini dapat
          dikembangkan menjadi analisis berbasis aspek untuk mendeteksi sentimen
          per-fitur, serta diintegrasikan ke dalam sistem monitoring real-time untuk
          pengambilan keputusan cepat.
        </p>
      </CaseSection>

            {/* NEW: PRESENTATION GALLERY (ZOOM) */}
      <CaseSection id="presentation" title="Conference & Presentation (Zoom)">
        <ul className="grid gap-6 sm:grid-cols-2">
          {/* Card 1 */}
          <li className="overflow-hidden rounded-2xl border border-white/60 bg-white/75 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="relative aspect-video w-full">
              <img
                src="/porto-eryca/presenter-serina.jpg"
                alt="Presentasi jurnal ilmiah via Zoom — sesi 1"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium">Presentasi Daring — Sesi 1</h4>
              <p className="mt-1 text-sm text-neutral-600">
                Pemaparan metode INSET + TF-IDF + SVM dan ringkasan evaluasi model.
              </p>
            </div>
          </li>

          {/* Card 2 */}
          <li className="overflow-hidden rounded-2xl border border-white/60 bg-white/75 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="relative aspect-video w-full">
              <img
                src="/porto-eryca/peserta-serina.jpg"  /* ganti dengan fotomu */
                alt="Presentasi jurnal ilmiah via Zoom — sesi 2"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium">Sertifikat Peserta</h4>
              <p className="mt-1 text-sm text-neutral-600">
                Penerimaan Sertifikat Peserta 
              </p>
            </div>
          </li>
        </ul>
      </CaseSection>
    </CaseLayout>
  );
}
