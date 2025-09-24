import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static"; // optional

// === Konfigurasi route saat ini ===
// Ubah jika kamu memindahkan halaman ini.
const THIS_ROUTE = "/makeup";

const CATEGORIES = [
  "All",
  "Acrylic",
  "Watercolor",
  "3D Crafting",
  "Poster",
  "Sketch",
  "Design",
] as const;
type Category = (typeof CATEGORIES)[number];

type Item = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  src: string;
  alt?: string;
  description: string;
};

// ganti dengan data asli
const ALL_ITEMS: Item[] = [
  {
    id: "ac-01",
    title: "Demon Slayer",
    category: "Acrylic",
    src: "/porto-eryca/2.jpg",
    description:
      "Demon Slayer (Kimetsu no Yaiba) tells the story of Tanjiro Kamado, a teenager whose family was slaughtered by demons, and his sister, Nezuko, who was turned into a demon. Tanjiro joins the Demon Slayer Corps to find a cure to turn Nezuko back into a human and to exterminate all demons. Set in Japan during the Taisho era, the anime depicts Tanjiro and his friends battling demons using special breathing techniques.",
  },
  {
    id: "wc-01",
    title: "Christmas Scene",
    category: "Watercolor",
    src: "/porto-eryca/1.jpg",
    description: "Watercolor: wet-on-wet glow & soft edges.",
  },
  {
    id: "dc-01",
    title: "Self Potrait",
    category: "3D Crafting",
    src: "/porto-eryca/4.jpg",
    description: "3D craft: stylized form, matte clay render.",
  },
  {
    id: "ac-06",
    title: "Commission",
    category: "Acrylic",
    src: "/porto-eryca/acy6.jpg",
    description: "Cat by Tesla Paint",
  },
  {
    id: "sk-01",
    title: "Gesture Study",
    category: "Sketch",
    src: "/porto-eryca/sket1.jpg",
    description: "Sketch: 60s gesture lines & proportions.",
  },
  {
    id: "wc-03",
    title: "A blue eye blooming on paper.",
    category: "Watercolor",
    src: "/porto-eryca/wate2.jpg",
    description:
      "A watercolor study of a blue eye—cool cobalt iris against a warm ochre glow, crisp brow and lashes, all breathing on textured paper beside a well-used palette.",
  },
];

export default function GalleryPage({
  searchParams,
}: {
  searchParams?: { cat?: string; q?: string };
}) {
  const activeCat = (searchParams?.cat ?? "All") as Category;
  const q = (searchParams?.q ?? "").toLowerCase();

  const filtered = ALL_ITEMS.filter((it) => {
    const byCat = activeCat === "All" || it.category === activeCat;
    const byQ = !q || it.title.toLowerCase().includes(q);
    return byCat && byQ;
  });

return (
  <main
    id="illustrations"
    className="relative min-h-screen text-neutral-900"
  >
    <div
      aria-hidden
      className="
        pointer-events-none absolute inset-0 -z-10
        bg-[url('/porto-eryca/bg-mua.png')] bg-no-repeat
        bg-top bg-cover
        md:bg-fixed md:bg-center md:bg-cover
        opacity-10
      "
    />
      <header className="border-b border-[#e6dccb] bg-[#fbf8f3]/0">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl text-[#3b2f22]">
                All Artworks
              </h1>
              <p className="mt-1 text-sm text-[#5a5246]">
                Telusuri karya. Filter berdasarkan kategori atau cari judul.
              </p>
            </div>

            {/* Search (GET) */}
            <form className="mt-3 sm:mt-0" action={THIS_ROUTE} method="get">
              <input
                name="q"
                defaultValue={searchParams?.q ?? ""}
                placeholder="Search title…"
                className="w-64 rounded-lg border border-[#e6dccb] bg-white px-3 py-2 text-sm text-[#3b2f22] outline-none placeholder:text-[#9a8f7e] focus:ring-2 focus:ring-[#d7c4a5]"
              />
              {activeCat !== "All" && (
                <input type="hidden" name="cat" value={activeCat} />
              )}
            </form>
          </div>

          {/* Filter Pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const href =
                cat === "All"
                  ? THIS_ROUTE
                  : `${THIS_ROUTE}?cat=${encodeURIComponent(cat)}`;
              const isActive = activeCat === cat;
              return (
                <Link
                  key={cat}
                  href={href}
                  className={[
                    "rounded-full border px-4 py-2 text-sm",
                    isActive
                      ? "border-[#5f3d24] bg-[#5f3d24] text-[#f8e6c9] shadow"
                      : "border-[#e6dccb] bg-white text-[#3b2f22] hover:bg-[#f4efe6]",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-8">
        {filtered.length === 0 ? (
          <p className="rounded-md border border-dashed border-[#decfb6] bg-[#fffdf8] p-6 text-sm text-[#6b6256]">
            Tidak ada karya untuk filter ini. Coba kategori lain atau hapus
            pencarian.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="group overflow-hidden rounded-xl border border-[#e6dccb] bg-white shadow-sm"
              >
                {/* Hover fade overlay untuk semua kartu */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt ?? item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4 text-center text-[#f8e6c9] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-xs opacity-90">
                      {item.description}
                    </p>
                    <span className="mt-2 rounded-full border border-[#e6dccb]/60 bg-[#fbf8f3]/10 px-3 py-1 text-[10px] tracking-wide">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* meta bawah (opsional) */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <h3 className="text-base font-medium text-[#3b2f22]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#7a6f62]">{item.category}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
