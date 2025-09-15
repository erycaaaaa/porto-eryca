/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function FeatureCard({
  title,
  description,
  image,
  reverse = false, // kalau true, gambar di kanan
}: {
  title: string;
  description: React.ReactNode;
  image: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`
        flex flex-col items-center gap-6 rounded-2xl border border-neutral-200 bg-white p-6
        shadow-[0_8px_24px_rgba(0,0,0,0.04)] md:flex-row
        ${reverse ? "md:flex-row-reverse" : ""}
      `}
    >
      {/* Gambar */}
      <div className="w-full md:w-1/2">
        <img
          src={image}
          alt={title}
          className="w-full rounded-xl border border-neutral-200 object-cover aspect-[4/3]"
        />
      </div>

      {/* Teks */}
      <div className="w-full md:w-1/2">
        <h3 className="font-serif text-2xl">{title}</h3>
        <p className="mt-3 text-neutral-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
