 
import React from "react";

export default function ProtoAndFeatures({
  id,
  protoSrc,
  features,
}: {
  id?: string;
  protoSrc: string;
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

    {/* Primary Functions  */}
    <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-4">
      <h3 className="font-serif text-xl md:text-2xl">Primary Functions</h3>

      <ol className="mt-3 space-y-3">
        {features.map((f, i) => (
          <li
            key={f.title}
            className="group rounded-xl border p-4 transition-shadow hover:shadow-sm"
          >
            <div className="grid grid-cols-[auto_1fr] items-start gap-3">
              {/* numbered badge */}
              <span className="grid h-8 w-8 place-items-center rounded-full border bg-white text-xs font-semibold">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h4 className="font-medium">{f.title}</h4>
                <div className="prose prose-neutral max-w-none mt-1 text-sm">
                  {f.description}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>


      </div>
    </section>
  );
}
