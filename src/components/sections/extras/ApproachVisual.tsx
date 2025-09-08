/* eslint-disable @next/next/no-img-element */

export default function ApproachVisual() {
  return (
    // ⬅️ tambahkan id="illustrations"
    <section id="illustrations" className="w-full">
      {/* HERO STRIP rustic */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#ffffff4e] via-[#5d582bd3] to-[#ffffff4e]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="font-serif tracking-[0.08em] text-[38px] md:text-[46px] text-[#f8e6c9]">
            ART GALLERY
          </h2>
          <p
            className="mt-[-8] 
          max-w-2xl text-[#f3e5cfcc]"
          >
            A curated collection of artworks — from watercolor and oil painting
            to digital creations. Explore the textures, layers, and stories
            behind every piece.
          </p>

          <a
            href="#gallery"
            className="mt-3
            inline-block rounded-[6px] bg-[#a66b3f] px-5 py-2 font-semibold text-[#f8e6c9] shadow-[inset_0_-3px_0_rgba(0,0,0,0.25)] hover:bg-[#b27545]"
          >
            READ MORE…
          </a>
        </div>

        {/* subtle texture overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(transparent_0,transparent_6px,rgba(0,0,0,.2)_7px)] [background-size:16px_16px]" />
      </div>

      {/* GRID 3 CARDS */}
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        {/* CARD 1 */}
        <ArticleCard
          title="Acrylic"
          img="/assets/2.jpg"
          excerpt="Exploring color transparency, splashes, and soft layering techniques."
          href="#acrylic"
        />
        {/* CARD 2 */}
        <ArticleCard
          title="Watercolor"
          img="/assets/1.jpg"
          excerpt="Fluid brushstrokes, expressive tones, and the delicacy of water-based pigments."
          href="#watercolor"
        />
        {/* CARD 3 */}
        <ArticleCard
          title="3D Crafting"
          img="/assets/4.jpg"
          excerpt="Digital experiments — mixed media, collage, and stylized renderings."
          href="#3dCrafting"
        />
      </div>
    </section>
  );
}

/* ————— Single Card ————— */
function ArticleCard({
  title,
  img,
  excerpt,
  href,
}: {
  title: string;
  img: string;
  excerpt: string;
  href: string;
}) {
  return (
    <article className="rounded-[12px] bg-[#f4efe6] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-[#d8cfbf]">
      <h3 className="font-serif text-[22px] text-[#262016]">{title}</h3>

      {/* frame image + “tape” */}
      <div className="relative mt-4 rounded-[8px] bg-[#fbf8f3] p-3 ring-1 ring-[#e6dccb]">
        {/* tape left-top */}
        <span className="absolute left-4 top-2 h-3 w-16 rotate-6 rounded-[3px] bg-[#d7c4a5] opacity-90" />
        {/* tape right-top */}
        <span className="absolute right-4 top-2 h-3 w-16 -rotate-6 rounded-[3px] bg-[#d7c4a5] opacity-90" />

        <div className="overflow-hidden rounded-[6px] ring-1 ring-[#e6dccb]">
          <img
            src={img}
            alt={title}
            className="h-44 w-full object-cover md:h-48"
            loading="lazy"
          />
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-[#231e18]">
        {excerpt}
      </p>

      <a
        href={href}
        className="mt-4 inline-block rounded-[6px] bg-[#5f3d24] px-4 py-2 text-[13px] font-semibold text-[#f8e6c9] shadow-[inset_0_-3px_0_rgba(0,0,0,0.25)] hover:bg-[#b27545]"
      >
        READ MORE…
      </a>
    </article>
  );
}
