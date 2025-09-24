/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function TestimonialRow({
  quote,
  author,
  avatar,
}: {
  quote: string;
  author: string;
  avatar?: string; // 1:1
}) {
  return (
    <figure className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="h-12 w-12 rounded-full object-cover border"
          />
        ) : (
          <div className="h-12 w-12 rounded-full border border-dashed grid place-items-center text-xs text-neutral-500">
            1:1
          </div>
        )}
        <blockquote className="text-neutral-800">“{quote}”</blockquote>
      </div>
      <figcaption className="mt-3 text-sm text-neutral-600">
        — {author}
      </figcaption>
    </figure>
  );
}
