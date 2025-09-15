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
        "bg-gradient-to-br from-[#f3ead2] via-white to-white",
        "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]",
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

        {/* MOCK BROWSER + POSTER */}
        <div className={`relative ${imgOrder}`}>
        <div className="relative mx-auto aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-2xl border bg-white">
            {/* simple chrome bar */}
            <div className="flex items-center gap-2 border-b bg-neutral-50/90 px-3 h-8">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />

            {(() => {
                const href = "https://erycaaaaa.github.io/toko-bunga-fajar/";
                const pretty = href
                .replace(/^https?:\/\//, "")
                .replace(/^www\./, "")
                .replace(/\/$/, "");
                return (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 line-clamp-1 text-[10px] text-neutral-10 hover:underline decoration-dotted"
                    aria-label={`Open ${pretty}`}
                    title={pretty}
                >
                    {pretty}
                </a>
                );
            })()}
            </div>

            {/* poster clickable ke situs */}
            <a
            href="https://erycaaaaa.github.io/toko-bunga-fajar/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open live website"
            title="Open live website"
            >
            <img
                src={poster}
                alt={`${title} preview`}
                className="h-[calc(100%-2rem)] w-full object-cover" // 2rem = h-8 bar
            />
            </a>
        </div>
        </div>

      </div>
    </section>
  );
}
