import React from "react";

export default function TwoColSection({
  id,
  titleLeft,
  contentLeft,
  titleRight,
  contentRight,
}: {
  id?: string;
  titleLeft: string;
  contentLeft: React.ReactNode;
  titleRight: string;
  contentRight: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-6 shadow-sm">
          <h3 className="font-serif text-xl md:text-2xl">{titleLeft}</h3>
          <div className="prose prose-neutral max-w-none mt-3">
            {contentLeft}
          </div>
        </article>
        <article className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-6 shadow-sm">
          <h3 className="font-serif text-xl md:text-2xl">{titleRight}</h3>
          <div className="prose prose-neutral max-w-none mt-3">
            {contentRight}
          </div>
        </article>
      </div>
    </section>
  );
}
