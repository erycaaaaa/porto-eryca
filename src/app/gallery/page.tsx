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
  { id: "wc-01", title: "Christmas Scene", category: "Watercolor", src: "/porto-eryca/1.jpg", description: "Watercolor: wet-on-wet glow & soft edges." },
  { id: "dc-01", title: "Self Potrait", category: "3D Crafting", src: "/porto-eryca/4.jpg", description: "3D craft: stylized form, matte clay render." },
  { id: "po-01", title: "Humaniora Poster", category: "Poster", src: "/porto-eryca/poster-thumb.jpg", description: "Poster: typographic rhythm & visual hierarchy." },
  { id: "sk-01", title: "Gesture Study", category: "Sketch", src: "/porto-eryca/sketch-1.jpg", description: "Sketch: 60s gesture lines & proportions." },
  { id: "de-01", title: "Brand Layout", category: "Design", src: "/porto-eryca/design-1.jpg", description: "Design: grid-based layout & color system." },
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
