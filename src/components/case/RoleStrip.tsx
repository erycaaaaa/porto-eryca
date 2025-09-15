/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function RoleStrip({
  tools,
  title = "Roles & Tools",
  roles = ["Front-End", "UI/UX", "Illustration"],
}: {
  tools?: { label: string; icon?: string }[];
  title?: string;
  roles?: string[];
}) {
  return (
    <section className="scroll-mt-24 mb-12">
      <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl md:text-2xl">{title}</h3>
            <p className="mt-1 text-sm text-neutral-600">
              {roles.join(" • ")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {(tools ?? []).map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm"
                title={t.label}
              >
                {t.icon ? (
                  <img src={t.icon} alt="" className="h-4 w-4 object-contain" />
                ) : (
                  <span className="inline-block h-2 w-2 rounded-full bg-neutral-400" />
                )}
                {t.label}
              </span>
            ))}
            {!tools?.length && (
              <span className="text-sm text-neutral-500">(add tool icons)</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
