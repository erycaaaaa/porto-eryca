import React from "react";

type Col = {
  title: string;
  bullets: string[];
  image?: string;
};

export default function TimelineDuo({
  id,
  ux,
  ui,
  variant = "buttons",
}: {
  id?: string;
  ux: Col;
  ui: Col;
  variant?: "buttons" | "default";
}) {
  if (variant === "buttons") {
    return (
      <section id={id} className="scroll-mt-24 mb-10">
        <div className="grid gap-6 md:grid-cols-2">
          {[ux, ui].map((col, i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-4"
            >
              <h3 className="font-serif text-xl md:text-2xl">{col.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {col.bullets.map((b, j) => (
                  <span
                    key={j}
                    className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium bg-white hover:bg-neutral-50"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-24 mb-10">
      <div className="grid gap-6 md:grid-cols-2">
        {[ux, ui].map((col, i) => (
          <div key={i} className="rounded-2xl border bg-white/80 p-4">
            <h3 className="font-serif text-xl md:text-2xl">{col.title}</h3>
            <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
              {col.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
