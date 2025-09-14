import GalleryClient from "./GalleryClient";

type Category = "All" | "Acrylic" | "Watercolor" | "3D Crafting" | "Poster" | "Sketch" | "Design";
type Item = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  src: string;
  alt?: string;
  description: string;
};

// Data contoh
const ALL_ITEMS: Item[] = [
  { id: "ac-01", title: "Demon Slayer", category: "Acrylic", src: "/porto-eryca/2.jpg", description: "Demon Slayer refers to the popular Japanese media franchise..." },
  { id: "ac-02", title: "Your Name", category: "Acrylic", src: "/porto-eryca/kimi.jpg", description: "Anime Kimi no Na wa ." },
  { id: "ac-03", title: "Pak Muh Family", category: "Acrylic", src: "/porto-eryca/acy1.jpg", description: "Pak Muh Team" },
  { id: "ac-04", title: "Joker", category: "Acrylic", src: "/porto-eryca/acy2.jpg", description: "Arthur Fleck" },
  { id: "ac-05", title: "WindBreaker", category: "Acrylic", src: "/porto-eryca/acy5.jpg", description: "South Korean webtoon about a talented student named Jay who joins a school bicycle racing team called Hummingbird Crew, only for the series to be abruptly stopped by the Webtoon platform after the author, Jo Yong Seok" },
  { id: "ac-06", title: "Commission", category: "Acrylic", src: "/porto-eryca/acy6.jpg", description: "Cat by Tesla Paint" },
  { id: "ac-07", title: "Waseda Boys", category: "Acrylic", src: "/porto-eryca/acy3.jpg", description: "Waseda Boys" },
  { id: "ac-08", title: "Himiko Toga", category: "Acrylic", src: "/porto-eryca/acy7.jpg", description: "My Hero Academia (Boku no Hero Academia)" },

  { id: "wc-01", title: "Christmas Scene", category: "Watercolor", src: "/porto-eryca/1.jpg", description: "Watercolor: wet-on-wet glow & soft edges." },
  { id: "wc-02", title: "A tiny shrimp alive on paper", category: "Watercolor", src: "/porto-eryca/wate1.jpg", description: "layered washes of orange and blue, with fine ink lines tracing the curve of its antennae and segmented body." },
  { id: "wc-03", title: "A blue eye blooming on paper.", category: "Watercolor", src: "/porto-eryca/wate2.jpg", description: "A watercolor study of a blue eye—cool cobalt iris against a warm ochre glow, crisp brow and lashes, all breathing on textured paper beside a well-used palette." },

  { id: "dc-01", title: "Self Potrait", category: "3D Crafting", src: "/porto-eryca/4.jpg", description: "3D craft: stylized form, matte clay render." },

  { id: "po-01", title: "Humaniora Poster", category: "Poster", src: "/porto-eryca/Poster-Humaniora-TIC_page-0001.jpg", description: "Poster: typographic rhythm & visual hierarchy." },

  { id: "sk-01", title: "Gesture Study", category: "Sketch", src: "/porto-eryca/sket1.jpg", description: "Sketch: 60s gesture lines & proportions." },

  { id: "de-01", title: "Brand Layout", category: "Design", src: "/porto-eryca/untarx.png", description: "Design: grid-based layout & color system." },
];

// statically exported page
export const dynamic = "force-static";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#faf8f3]">
      <header className="border-b border-[#e6dccb] bg-[#fbf8f3]">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <h1 className="font-serif text-3xl text-[#3b2f22]">All Artworks</h1>
          <p className="mt-1 text-sm text-[#5a5246]">
            Telusuri karya. Filter berdasarkan kategori atau cari judul.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <GalleryClient items={ALL_ITEMS} />
      </section>
    </main>
  );
}
