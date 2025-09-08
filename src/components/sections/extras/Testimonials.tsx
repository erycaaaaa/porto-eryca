
"use client";
import { useState } from "react";
import SectionWrap from "@/components/sections/extras/SectionWrap";

type Item = { quote: string; name: string; role: string; avatar: string };

const PEOPLE: Item[] = [
  {
    quote:
      "If you ask me what I came to do in this world… I am here to live out loud.",
    name: "Émile Zola",
    role: "French Novelist & Critic",
    avatar: "/assets/Émile Zola.png",
  },
  {
    quote:
      "Every portrait that is painted with feeling is a portrait of the artist, not of the sitter.",
    name: "Oscar Wilde",
    role: "The Picture of Dorian Gray",
    avatar: "/assets/Oscar Wilde.jpg",
  },
  {
    quote:
      "Learn to light a candle in the darkest moments of someone’s life. Be the light that helps others see it is what gives life its deepest significance.",
    name: "Roy T. Bennett",
    role: "Author of The Light in the Heart.",
    avatar: "/assets/rot.jpg",
  },
  {
    quote:
      "What you do makes a difference, and you have to decide what kind of difference you want to make.",
    name: "Jane Goodall",
    role: "The world’s leading chimpanzee researcher.",
    avatar: "/assets/jane.jpeg",
  },
];

export default function TestimonialHover() {
  const [active, setActive] = useState(0);

  return (
    <SectionWrap className="py-16">
      <div className="mx-auto max-w-4xl text-center">
        {/* quote icon */}
        <div className="mx-auto mb-6 h-7 w-7 rounded-full bg-emerald-500/15 text-emerald-600 grid place-items-center">
          <span className="text-lg">“</span>
        </div>

        {/* main quote */}
        <p className="mx-auto max-w-3xl text-[18px] md:text-[20px] leading-8 text-neutral-700">
          {PEOPLE[active].quote}
        </p>

        {/* divider w/ small pointer */}
        <div className="relative mx-auto my-8 h-px w-full max-w-3xl bg-neutral-200">
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-45 h-3 w-3 bg-neutral-200" />
        </div>

        {/* name & role */}
        <div className="mb-8">
          <p className="text-brand-brown font-semibold">
            {PEOPLE[active].name}
          </p>
          <p className="text-sm text-neutral-500">{PEOPLE[active].role}</p>
        </div>

        {/* avatars row */}
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {PEOPLE.map((p, i) => {
            const isActive = i === active;
            return (
              <li key={p.name}>
                {/* button tanpa efek hover ke foto; hanya ring berubah */}
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`rounded-full p-1 transition
                    ring-2 ${
                      isActive
                        ? "ring-emerald-500"
                        : "ring-transparent hover:ring-neutral-300"
                    }
                    focus:outline-none focus:ring-emerald-500`}
                >
                  <img
                    src={p.avatar}
                    alt={p.name}
                    loading="lazy"
                    className="h-16 w-16 md:h-18 md:w-18 rounded-full object-cover select-none"
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
