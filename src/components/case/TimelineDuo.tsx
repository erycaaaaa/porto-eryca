/* eslint-disable @next/next/no-img-element */
import React from "react";

type Card = {
  title?: string;
  bullets?: string[];
  image?: string; // 4:3
};

function normalizeCard(card?: Card): Required<Card> {
  return {
    title: card?.title?.trim() || "Untitled",
    bullets: Array.isArray(card?.bullets) ? card!.bullets! : [],
    image: (card?.image && card.image.trim()) || "",
  };
}

export default function TimelineDuo({
  id,
  ux,
  ui,
  className = "",
}: {
  id?: string;
  ux?: Card;
  ui?: Card;
  className?: string;
}) {
  const cards = [normalizeCard(ux), normalizeCard(ui)];
  return (
    <section id={id} className={`scroll-mt-24 mb-12 ${className}`}>
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((c, i) => (
          <div
            key={`${c.title}-${i}`}
            className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-6 shadow-sm"
          >
            <h3 className="font-serif text-xl md:text-2xl">{c.title}</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2 items-start">
              <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                {c.bullets.length > 0 ? (
                  c.bullets.map((b, idx) => <li key={idx}>{b}</li>)
                ) : (
                  <li className="text-neutral-500">Coming soon…</li>
                )}
              </ul>
              <div>
                {c.image ? (
                  <img
                    src={c.image}
                    alt={`${c.title} illustration`}
                    className="w-full rounded-xl border object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full rounded-xl border border-dashed h-full aspect-[4/3] grid place-items-center text-sm text-neutral-500">
                    (4:3 image placeholder)
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
