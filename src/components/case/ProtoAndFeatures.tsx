/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function ProtoAndFeatures({
  id,
  protoSrc,
  features,
}: {
  id?: string;
  protoSrc: string; // full embed URL (sudah ada https://www.figma.com/embed?...)
  features: Array<{ title: string; description: React.ReactNode; image?: string }>;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Prototype */}
        <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-4">
          <h3 className="font-serif text-xl md:text-2xl">Prototype</h3>
          <div className="mt-3 aspect-[16/9] w-full overflow-hidden rounded-xl border">
            <iframe className="h-full w-full" src={protoSrc} allowFullScreen />
          </div>
        </div>

        {/* Primary Functions */}
        <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-4">
          <h3 className="font-serif text-xl md:text-2xl">Primary Functions</h3>
          <div className="mt-3 grid gap-4">
            {features.map((f) => (
              <article key={f.title} className="grid grid-cols-[1fr] gap-3 sm:grid-cols-[160px_1fr]">
                {f.image ? (
                  <img
                    src={f.image}
                    alt={f.title}
                    className="rounded-lg border object-cover aspect-[4/3]"
                  />
                ) : (
                  <div className="rounded-lg border border-dashed aspect-[4/3] grid place-items-center text-xs text-neutral-500">
                    (4:3 image)
                  </div>
                )}
                <div>
                  <h4 className="font-medium">{f.title}</h4>
                  <div className="prose prose-neutral max-w-none mt-1 text-sm">{f.description}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
