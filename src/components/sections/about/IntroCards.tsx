// src/app/components/sections/intro/IntroCardsAnimated.tsx
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useReducedMotion,
  type Variants,
  type MotionValue,
} from "framer-motion";

/** ========= Types ========= */
type Item = {
  icon: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
};

/** ========= Hooks ========= */
function useIsPointerCoarse() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: coarse)");
    const set = () => setCoarse(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  return coarse;
}

/** ========= Component ========= */
export default function IntroCardsAnimated() {
  const items = useMemo<Item[]>(
    () => [
      {
        icon: "🎯",
        title: "Projects",
        desc: "Showcasing applications, websites, and systems I've built — highlighting process, technology, and impact.",
        cta: "View Projects",
        href: "#projects",
      },
      {
        icon: "🧰",
        title: "Skills & Tools",
        desc: "Proficient in modern technologies — React, Next.js, Tailwind, Node.js, and more for full-stack development.",
        cta: "See Skills",
        href: "#skills",
      },
      {
        icon: "📝",
        title: "About & Resume",
        desc: "My background, journey, and professional experience. Learn more about me or download my CV.",
        cta: "Read More",
        href: "#about",
      },
    ],
    []
  );

  const container: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVar: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // parallax
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const dir = useMotionValue(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastY.current;
    if (delta > 2) {
      dir.set(1);
      lastY.current = latest;
    } else if (delta < -2) {
      dir.set(-1);
      lastY.current = latest;
    }
  });
  const yDirRaw = useTransform(dir, [-1, 0, 1], [-12, 0, 12]);
  const yDir = useSpring(yDirRaw, { stiffness: 180, damping: 24, mass: 0.35 });

  return (
    <section className="relative z-10 -mt-10 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[24px] bg-[#fffdf8] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:p-10">
        <h2 className="mb-8 text-center font-serif leading-tight text-2xl sm:text-3xl md:text-4xl text-[#4c3e1f]">
          Thoughtful visuals & experiences that tell stories.
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {items.map((it, idx) => (
            <TiltCard
              key={it.title}
              variants={itemVar}
              item={it}
              yDir={yDir}
              idx={idx}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** ========= Tilt Card ========= */
function TiltCard({
  item,
  variants,
  yDir,
  idx,
}: {
  item: Item;
  variants: Variants;
  yDir: MotionValue<number>;
  idx: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 260, damping: 22, mass: 0.4 });
  const rotateY = useSpring(ry, { stiffness: 260, damping: 22, mass: 0.4 });

  const prefersReduced = useReducedMotion();
  const isCoarse = useIsPointerCoarse();
  const tiltEnabled = !prefersReduced && !isCoarse;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!tiltEnabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const max = 6;
    ry.set(clamp(((x - midX) / midX) * max, -max, max));
    rx.set(clamp((-(y - midY) / midY) * max, -max, max));
  };

  const onLeave = () => {
    if (!tiltEnabled) return;
    rx.set(0);
    ry.set(0);
  };

  const mult = [0.95, 1.1, 1.0][idx % 3];
  const yScroll = useTransform(yDir, (v) => v * mult);

  return (
    <motion.a
      ref={ref}
      href={item.href}
      aria-label={`${item.title} — ${item.cta}`}
      variants={variants}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={tiltEnabled ? { scale: 1.01 } : undefined}
      whileTap={tiltEnabled ? { scale: 0.995 } : undefined}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      style={{
        rotateX: tiltEnabled ? rotateX : 0,
        rotateY: tiltEnabled ? rotateY : 0,
        y: yScroll,
        transformPerspective: 900,
      }}
      className="group relative rounded-2xl p-[1.2px] bg-gradient-to-tr from-[#d6c8a3] via-[#f3e9c8] to-[#fffdf8] shadow-md hover:shadow-lg"
    >
      <div className="relative h-full rounded-[15px] bg-[#fffdf8] p-5 sm:p-6">
        <div className="relative z-10 flex h-full flex-col justify-between text-[#4c3e1f]">
          <div>
            {/* Icon chip */}
            <div className="mb-3 inline-flex items-center justify-center rounded-xl border border-[#d1c4a5] bg-[#fdfbf4] px-3 py-2 shadow-sm">
              <span className="text-2xl leading-none">{item.icon}</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4c3e1f]/80 sm:text-[15px]">
              {item.desc}
            </p>
          </div>

          <span className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-[#4c3e1f] px-4 py-2 text-sm font-medium text-white transition-all duration-200 group-hover:gap-3 group-active:scale-[0.98]">
            {item.cta} →
          </span>
        </div>
      </div>
    </motion.a>
  );
}
