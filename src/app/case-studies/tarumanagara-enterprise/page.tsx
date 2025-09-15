/* eslint-disable @next/next/no-img-element */
import CaseLayout, { CaseSection } from "@/components/case/CaseLayout";

export const metadata = {
  title: "Tarumanagara Enterprise — Case Study",
};

export default function Page() {
  return (
    <CaseLayout
      meta={{
        title: "Tarumanagara Enterprise",
        subtitle:
          "Vision-led site yang menonjolkan Why/How/What dan arsitektur informasi yang bersih.",
        year: "2024",
        tag: "UX Strategy",
        duration: "4 weeks",
        role: "UX • Copy • Front-End",
        tools: ["Figma", "Next.js", "Tailwind"],
      }}
      // coverImage="/porto-eryca/mock-te.jpg"
      prototypeUrl="https://www.figma.com/proto/your-te"
    >
      <CaseSection id="about" title="About Project">
        <p>
          Situs organisasi untuk menyampaikan arah, nilai, dan aktivitas dengan
          struktur yang memudahkan stakeholder menemukan informasi kunci.
        </p>
      </CaseSection>

      <CaseSection id="problem" title="Problem Statement">
        <ul>
          <li>Konten Why/How/What tersebar dan berulang.</li>
          <li>Halaman program sulit di-scan cepat.</li>
          <li>Kredibilitas visual belum konsisten.</li>
        </ul>
      </CaseSection>

      <CaseSection id="solution" title="Solution">
        <ul>
          <li>Struktur piramida: Why &gt; How &gt; What dalam 1 flow naratif.</li>
          <li>Komponen “Highlights” + “Our Path Forward”.</li>
          <li>Sistem tipografi &amp; token warna konsisten.</li>
        </ul>
      </CaseSection>

      <CaseSection id="process" title="Thinking Process">
        <ol>
          <li>Content audit &amp; card sorting.</li>
          <li>IA + wireframe → design tokens.</li>
          <li>Prototipe, assess, refine.</li>
        </ol>
      </CaseSection>

      <CaseSection id="ux-case" title="UX Case">
        <p>
          Dibuat “decision trail” yang jelas dari landing ke program detail
          dengan CTA yang tetap terlihat pada scroll panjang.
        </p>
      </CaseSection>

      <CaseSection id="roles" title="Role Model">
        <p>UX strategist, content design, dan implementasi front-end.</p>
      </CaseSection>

      <CaseSection id="timeline" title="Timeline & Duration">
        <ul>
          <li>W1: Audit &amp; IA</li>
          <li>W2: Wireframe</li>
          <li>W3: UI &amp; copy</li>
          <li>W4: Prototipe &amp; testing</li>
        </ul>
      </CaseSection>

      <CaseSection id="ui-solution" title="UI Solution">
        <p>
          Layout grid 12 kolom, header sticky dengan progres, komponen kartu
          program, dan ikonografi ringan untuk scanability.
        </p>
      </CaseSection>

      <CaseSection id="testimonials" title="Testimoni User">
        <blockquote>
          “Sekarang alurnya jelas, cepat dapat info ‘kenapa’ dan ‘bagaimana’.”
        </blockquote>
      </CaseSection>

      <CaseSection id="prototype" title="Prototype">
        <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border">
          <iframe
            className="h-full w-full"
            src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/your-te"
            allowFullScreen
          />
        </div>
      </CaseSection>
    </CaseLayout>
  );
}
