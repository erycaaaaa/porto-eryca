/* eslint-disable @next/next/no-img-element */

"use client";
import { useState } from "react";
import SectionWrap from "@/components/sections/extras/SectionWrap";

type Item = { quote: string; name: string; role: string; avatar: string };
type Size = "xxs" | "xs" | "sm" | "md" | "lg";

const PEOPLE: Item[] = [
  {
    quote:
      "If you ask me what I came to do in this world… I am here to live out loud.",
    name: "Émile Zola",
    role: "French Novelist & Critic",
    avatar: "/porto-eryca/emile-zola.png",
  },
  {
    quote:
      "Every portrait that is painted with feeling is a portrait of the artist, not of the sitter.",
    name: "Oscar Wilde",
    role: "The Picture of Dorian Gray",
    avatar: "/porto-eryca/oscar-wilde.jpg",
  },
  {
    quote:
      "Learn to light a candle in the darkest moments of someone’s life. Be the light that helps others see it is what gives life its deepest significance.",
    name: "Roy T. Bennett",
    role: "Author of The Light in the Heart.",
    avatar: "/porto-eryca/rot.jpg",
  },
  {
    quote:
      "What you do makes a difference, and you have to decide what kind of difference you want to make.",
    name: "Jane Goodall",
    role: "The world's leading chimpanzee researcher.",
    avatar: "/porto-eryca/jane.jpeg",
  },
];

const AVATAR_SIZES: Record<Size, string> = {
  xxs: "h-10 w-10",
  xs: "h-12 w-12",
  sm: "h-14 w-14",
  md: "h-16 w-16",
  lg: "h-20 w-20",
};

const QUOTE_SIZES: Record<Size, string> = {
  xxs: "text-base",
  xs: "text-lg",
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
};

const GAPS: Record<Size, string> = {
  xxs: "gap-4",
  xs: "gap-6",
  sm: "gap-8",
  md: "gap-10",
  lg: "gap-12",
};

const PADY: Record<Size, string> = {
  xxs: "py-12",
  xs: "py-16",
  sm: "py-20",
  md: "py-24",
  lg: "py-28",
};

export default function TestimonialHover({ size = "xxs" }: { size?: Size }) {
  const [active, setActive] = useState(0);

  return (
    <SectionWrap
      className={`${PADY[size]} !bg-transparent !backdrop-blur-0 !shadow-none !ring-0 !border-0`}
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-6 h-7 w-7 rounded-full bg-emerald-500/15 text-emerald-600 grid place-items-center">
          <span className="text-lg">“</span>
        </div>

        {/* main quote */}
        <p
          className={`mx-auto max-w-3xl ${QUOTE_SIZES[size]} text-neutral-700`}
        >
          {PEOPLE[active].quote}
        </p>

        <div className="relative mx-auto my-8 h-px w-full max-w-3xl bg-transparent">
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-45 h-3 w-3 bg-transparent" />
        </div>

        <div className="mb-8">
          <p className="text-brand-brown font-semibold">
            {PEOPLE[active].name}
          </p>
          <p className="text-sm text-neutral-500">{PEOPLE[active].role}</p>
        </div>

        {/* avatars row */}
        <ul
          className={`flex flex-wrap items-center justify-center ${GAPS[size]}`}
        >
          {PEOPLE.map((p, i) => {
            const isActive = i === active;
            return (
              <li key={p.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  aria-label={`Tampilkan kutipan ${p.name}`}
                  className={`rounded-full p-1 transition ring-2
                    ${
                      isActive
                        ? "ring-emerald-500 ring-offset-2 ring-offset-emerald-50"
                        : "ring-transparent hover:ring-neutral-300"
                    }
                    focus:outline-none focus:ring-emerald-500
                    min-w-[40px] min-h-[40px] grid place-items-center`}
                >
                  <img
                    src={p.avatar}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className={`${AVATAR_SIZES[size]} rounded-full object-cover select-none`}
                    draggable={false}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionWrap>
  );
}
