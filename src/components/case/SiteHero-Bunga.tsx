/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function SiteHero({
  title,
  tagline,
  siteUrl,
  figmaUrl,
  poster,
  imagePosition = "right", // "left" | "right"
}: {
  title: string;
  tagline?: string;
  siteUrl?: string;
  figmaUrl?: string;
  poster: string;           // screenshot hero (≥1200×750)
  imagePosition?: "left" | "right";
}) {
  const textOrder = imagePosition === "left" ? "md:order-2" : "md:order-1";
  const imgOrder  = imagePosition === "left" ? "md:order-1" : "md:order-2";

  return (
    <section
      className={[
        "relative mb-10 overflow-hidden rounded-3xl border border-neutral-200",
        "bg-gradient-to-br from-[#ffffff] via-white to-white",
        "shadow-[0_20px_10px_-90px_rgba(0,0,0,0.15)]",
      ].join(" ")}
    >
      <div className="grid items-center gap-8 p-6 md:grid-cols-2 md:p-10">
        {/* TEXT */}
        <div className={`space-y-4 ${textOrder}`}>
          <h1 className="font-serif text-3xl md:text-4xl">{title}</h1>
          {tagline && (
            <p className="text-neutral-700 leading-relaxed">{tagline}</p>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            {siteUrl && (
              <a
                href={siteUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                Visit Website
              </a>
            )}
            {figmaUrl && (
              <a
                href={figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                View Figma
              </a>
            )}
          </div>
        </div>

{/* POSTER — square 1:1 only */}
<div className={`relative ${imgOrder}`}>
  {(() => {
    const finalHref = siteUrl ?? "/porto-eryca/mokap2.png"; 
    const isExternal = /^https?:\/\//.test(finalHref);
    const pretty = isExternal
      ? finalHref.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "")
      : "Open image";

    return (
      <>
        <a
          href={finalHref}
          target={isExternal ? "_blank" : "_self"}
          rel={isExternal ? "noopener noreferrer" : undefined}
          aria-label={isExternal ? `Open ${pretty}` : "Open full image"}
          title={isExternal ? pretty : "Open full image"}
          className="block"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[28rem] overflow-hidden rounded-2xl border bg-white">
            <img
              src={poster}
              alt={`${title} preview`}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </a>

        {/* label/link kecil di bawah gambar */}
        <div className="mt-2 text-center text-[10px] text-neutral-500">
          <a
            href={finalHref}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="hover:underline decoration-dotted"
          >
            {pretty}
          </a>
        </div>
      </>
    );
  })()}
</div>


      </div>
    </section>
  );
}
