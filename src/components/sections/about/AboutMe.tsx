
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** ======================== Shared Variants ======================== **/
const revealContainer: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: "easeOut" },
  },
};
const listContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const listItem: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 22, mass: 0.4 },
  },
};

/** ======================== CV Subcomponents (same file) ======================== **/
type SkillsProp =
  | string[]
  | {
      design: string[];
      programming: string[];
    };

type ResumeCVProps = {
  email: string;
  skills: SkillsProp; // ⬅️ sekarang bisa array atau object
  experiences: [string, string][];
};

/** ---- Normalisasi & Klasifikasi ---- **/
const aliasMap: Record<string, string> = {
  Ps: "Photoshop",
  Ai: "Illustrator",
  Pr: "Premiere Pro",
  Ae: "After Effects",
  JS: "JavaScript",
};
const normalize = (s: string) => aliasMap[s] ?? s;

const DESIGN_SET = new Set([
  "Figma",
  "Photoshop",
  "Illustrator",
  "Premiere Pro",
  "After Effects",
  "Ps",
  "Ai",
  "Pr",
  "Ae",
]);

const PROGRAMMING_SET = new Set([
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Python",
  "Git",
  "GitHub",
]);

function toCategorized(skills: SkillsProp) {
  if (!Array.isArray(skills)) {
    // sudah kategori – tetap normalisasi nama agar rapi
    const norm = (arr: string[]) => [...new Set(arr.map(normalize))];
    return {
      design: norm(skills.design),
      programming: norm(skills.programming),
      other: [] as string[],
    };
  }

  const design: string[] = [];
  const programming: string[] = [];
  const other: string[] = [];

  for (const raw of skills) {
    const s = normalize(raw);
    if (DESIGN_SET.has(s) || DESIGN_SET.has(raw)) design.push(s);
    else if (PROGRAMMING_SET.has(s) || PROGRAMMING_SET.has(raw))
      programming.push(s);
    else other.push(s);
  }

  const uniq = (arr: string[]) => [...new Set(arr)];
  return {
    design: uniq(design),
    programming: uniq(programming),
    other: uniq(other),
  };
}

/** ---- Header & Dots (tetap) ---- **/
function ResumeHeader({
  page,
  total,
  onPrev,
  onNext,
}: {
  page: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mb-1 relative -top-2 flex items-center justify-between">
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest text-neutral-500 uppercase">
        <span>Resume</span>
        <span className="inline-block h-[6px] w-[6px] rounded-full bg-neutral-900" />
        <span>
          Page {page + 1} / {total}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          aria-label="Previous page"
          className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-3 py-2 text-neutral-800 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={onNext}
          aria-label="Next page"
          className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-3 py-2 text-neutral-800 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ResumeDots({ page, total }: { page: number; total: number }) {
  return (
    <div className="mb-2 flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={`h-1.5 rounded-full transition-all ${
            page === i ? "w-6 bg-neutral-900" : "w-3 bg-neutral-300"
          }`}
        />
      ))}
    </div>
  );
}

/** ---- Page 1 (tetap) ---- **/
function ResumePage1({ email }: { email: string }) {
  return (
    <div className="space-y-7 rounded-[20px] bg-white/70 p-6 md:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.06)] ring-1 ring-black/5 backdrop-blur min-h-[320px]">
      {/* Profile & Contact */}
      <motion.section
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          whileTap={{ scale: 0.995 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="group relative overflow-hidden rounded-2xl bg-white/85 p-5 md:p-6 ring-1 ring-black/5 shadow-[0_10px_28px_rgba(0,0,0,0.06)]"
        >
          <motion.span
            aria-hidden
            initial={{ x: "-120%" }}
            whileHover={{ x: "120%" }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="pointer-events-none absolute inset-y-0 -skew-x-12 w-1/3 bg-gradient-to-r from-transparent via-amber-200/0 to-transparent"
          />
          <div className="mb-2 flex items-center gap-2">
            <span className="h-[6px] w-[90px] rounded-full bg-amber-900/50" />
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Profile & Contact
            </h4>
          </div>
          <div className="grid gap-1.5 text-sm md:text-[15px] sm:grid-cols-2">
            <p className="text-xl md:text-2xl font-semibold text-neutral-900 sm:col-span-2">
              Eryca Dhamma Shanty
            </p>
            <p>Jakarta, Indonesia</p>
            <p className="sm:col-span-2">
              <a
                href={`mailto:${email}`}
                className="underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800/20"
              >
                {email}
              </a>
            </p>
          </div>
          <motion.span
            aria-hidden
            initial={{ width: 0, opacity: 0.6 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="mt-4 block h-[2px] rounded-full bg-neutral-900/80"
          />
        </motion.div>
      </motion.section>

      {/* Education */}
      <motion.section
        variants={listContainer}
        initial="hidden"
        animate="visible"
      >
        <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Education
        </h4>
        <ul className="space-y-1.5">
          <motion.li
            variants={listItem}
            className="flex gap-2 text-sm md:text-[15px]"
          >
            <span className="mt-2 h-[6px] w-[6px] rounded-full bg-neutral-900" />
            <div>
              <p>
                <span className="font-medium">
                  B.Sc. in Informatics Engineering
                </span>{" "}
                — Universitas Tarumanagara
              </p>
              <p className="text-neutral-600">2023 — present</p>
            </div>
          </motion.li>
          <motion.li
            variants={listItem}
            className="flex gap-2 text-sm md:text-[15px]"
          >
            <span className="mt-2 h-[6px] w-[6px] rounded-full bg-neutral-900" />
            <div>
              <p>SMA BPK PENABUR Cianjur</p>
              <p className="text-neutral-600">2020 — 2023</p>
            </div>
          </motion.li>
        </ul>
      </motion.section>

      {/* Language */}
      <motion.section
        variants={listContainer}
        initial="hidden"
        animate="visible"
      >
        <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
          LANGUAGE
        </h4>
        <ul className="space-y-1.5">
          <motion.li
            variants={listItem}
            className="flex gap-2 text-sm md:text-[15px]"
          >
            <span className="mt-2 h-[6px] w-[6px] rounded-full bg-neutral-900" />
            <div>
              <p>
                <span className="font-medium">INDONESIA</span> — FLUENT
              </p>
            </div>
          </motion.li>
          <motion.li
            variants={listItem}
            className="flex gap-2 text-sm md:text-[15px]"
          >
            <span className="mt-2 h-[6px] w-[6px] rounded-full bg-neutral-900" />
            <div>
              <p>
                <span className="font-medium">ENGLISH</span> — INTERMEDIATE
              </p>
            </div>
          </motion.li>
        </ul>
      </motion.section>
    </div>
  );
}

/** ---- Page 2: Experience + Skills (kategori) ---- **/
function ResumePage2({
  experiences,
  groupedSkills,
}: {
  experiences: [string, string][];
  groupedSkills: { design: string[]; programming: string[]; other: string[] };
}) {
  const { design, programming, other } = groupedSkills;

  return (
    <div className="space-y-7 rounded-[20px] bg-white/70 p-6 md:p-7 shadow-[0_12px_32px_rgba(0,0,0,0.06)] ring-1 ring-black/5 backdrop-blur min-h-[320px]">
      {/* Experience */}
      <motion.section
        variants={listContainer}
        initial="hidden"
        animate="visible"
      >
        <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Experience
        </h4>
        <ul className="space-y-1.5">
          {experiences.map(([role, year]) => (
            <motion.li
              key={role}
              variants={listItem}
              className="relative pl-5 text-sm md:text-[15px]"
            >
              <span className="absolute left-0 top-2 h-[6px] w-[6px] rounded-full bg-neutral-900" />
              <p>
                <span className="font-medium">{role}</span>{" "}
                <span className="text-neutral-600">— {year}</span>
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Divider */}
      <motion.div
        initial={{ width: 0, opacity: 0.6 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-[2px] bg-neutral-900/90"
      />

      {/* Skills (kategori) */}
      <motion.section
        variants={listContainer}
        initial="hidden"
        animate="visible"
      >
        <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Skills
        </h4>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h5 className="text-xs font-bold mb-1">🎨 Design</h5>
            <div className="flex flex-wrap gap-2">
              {design.map((s) => (
                <motion.span
                  key={`d-${s}`}
                  variants={listItem}
                  whileHover={{ y: -2 }}
                  className="rounded-[10px] bg-[#713103] px-3 py-1 text-xs md:text-sm font-semibold text-white shadow-sm"
                >
                  {s}
                </motion.span>
              ))}
              {design.length === 0 && (
                <p className="text-xs text-neutral-500">—</p>
              )}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold mb-1">💻 Programming</h5>
            <div className="flex flex-wrap gap-2">
              {programming.map((s) => (
                <motion.span
                  key={`p-${s}`}
                  variants={listItem}
                  whileHover={{ y: -2 }}
                  className="rounded-[10px] bg-[#432c1c] px-3 py-1 text-xs md:text-sm font-semibold text-white shadow-sm"
                >
                  {s}
                </motion.span>
              ))}
              {programming.length === 0 && (
                <p className="text-xs text-neutral-500">—</p>
              )}
            </div>
          </div>
        </div>

        {other.length > 0 && (
          <div className="mt-3">
            <h5 className="text-xs font-bold mb-1">🧩 Other</h5>
            <div className="flex flex-wrap gap-2">
              {other.map((s) => (
                <motion.span
                  key={`o-${s}`}
                  variants={listItem}
                  whileHover={{ y: -2 }}
                  className="rounded-[10px] bg-amber-500 px-3 py-1 text-xs md:text-sm font-semibold text-white shadow-sm"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </motion.section>
    </div>
  );
}

/** ---- Wrapper CV ---- **/
function ResumeCV({ email, skills, experiences }: ResumeCVProps) {
  // Pager state (lokal untuk CV)
  const TOTAL_PAGES = 2;
  const [page, setPage] = React.useState(0);
  const [dir, setDir] = React.useState(0);
  const paginate = (d: number) => {
    setDir(d);
    setPage((p) => (p + d + TOTAL_PAGES) % TOTAL_PAGES);
  };

  // Animasi slide
  const slide: Variants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };
  const SWIPE_PX = 80;

  // Keyboard navigation
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(+1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ⬇️ di sini kita kategorikan
  const grouped = React.useMemo(() => toCategorized(skills), [skills]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.46, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.35 }}
      className="col-span-12 md:col-span-7"
    >
      <div className="relative">
        <ResumeHeader
          page={page}
          total={TOTAL_PAGES}
          onPrev={() => paginate(-1)}
          onNext={() => paginate(+1)}
        />
        <ResumeDots page={page} total={TOTAL_PAGES} />

        {/* Halaman (slide + swipe) */}
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={page}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
                mass: 0.6,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_PX) paginate(+1);
                else if (info.offset.x > SWIPE_PX) paginate(-1);
              }}
            >
              {page === 0 ? (
                <ResumePage1 email={email} />
              ) : (
                <ResumePage2
                  experiences={experiences}
                  groupedSkills={grouped}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/** ======================== Main Section ======================== **/
export default function AboutMe() {
  /** ---------- Parallax & visibility ---------- **/
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 78%", "end start"],
  });
  const prefersReduced = useReducedMotion();

  const yImg = useSpring(useTransform(scrollYProgress, [0, 1], [-16, 16]), {
    stiffness: 160,
    damping: 22,
    mass: 0.35,
  });
  const rImg = useSpring(useTransform(scrollYProgress, [0, 1], [1.2, -1.2]), {
    stiffness: 160,
    damping: 22,
    mass: 0.35,
  });
  const yQuote = useSpring(useTransform(scrollYProgress, [0, 1], [-6, 6]), {
    stiffness: 170,
    damping: 22,
    mass: 0.25,
  });

  // Kedekatan kursor → opacity
  const dist = useMotionValue<number>(9999);
  const [pointerCoarse, setPointerCoarse] = useState(false);
  useEffect(() => {
    setPointerCoarse(window.matchMedia?.("(pointer: coarse)").matches ?? false);
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX,
        y = e.clientY;
      const cx = Math.max(r.left, Math.min(x, r.right));
      const cy = Math.max(r.top, Math.min(y, r.bottom));
      dist.set(Math.hypot(x - cx, y - cy));
    };
    const onLeave = () => dist.set(9999);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [dist]);

  const nearRaw = useTransform(dist, [0, 180, 360, 720], [1, 0.9, 0.4, 0]);
  const near = useSpring(nearRaw, { stiffness: 200, damping: 24, mass: 0.4 });
  const visibleRaw = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );
  const visible = useSpring(visibleRaw, { stiffness: 180, damping: 26 });
  const opacityDesktop = useTransform(
    [near, visible],
    ([n, v]: number[]) => n * v
  );
  const opacityMV = pointerCoarse ? visible : opacityDesktop;
  const pe = useTransform(opacityMV, (v) => (v < 0.05 ? "none" : "auto"));

  /** ---------- Data (lengkap) ---------- **/
  const email = "eryca847@gmail.com";
  const skills = [
    "Figma",
    "Ps",
    "Ai",
    "Pr",
    "Ae",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Python",
  ];
  const experiences: [string, string][] = [
    ["Freelance Art Commissions", "2019 — present"],
    [
      "UI/UX Intern, Tarumanagara Enterprise",
      "May 2025 — Aug 27, 2025 · 4 months",
    ],
    ["Mini Projects", "2024 — 2025"],
    ["Junior Member, Public Relations (DPM FTI)", "2025"],
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative z-0 py-16 md:py-20"
      style={{ opacity: opacityMV, pointerEvents: pe }}
    >
      {/* Background blob */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ scale: 1, rotate: 0, opacity: 0.9 }}
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.05, 1], rotate: [0, 8, 0], opacity: [0.9, 1, 0.9] }
        }
        transition={
          prefersReduced
            ? undefined
            : { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div className="absolute left-1/2 top-[-80px] h-[420px] w-[720px] -translate-x-1/2 rounded-[48px] bg-gradient-to-b from-amber-100/60 to-transparent blur-2xl" />
      </motion.div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mb-8 md:mb-10"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-amber-700"
          >
            ABOUT <span className="h-[6px] w-[6px] rounded-full bg-amber-600" />
          </motion.span>
          <motion.h2
            variants={item}
            className="mt-2 text-2xl md:text-4xl font-serif leading-tight text-center text-neutral-950"
          >
            Designer & Front-End Developer crafting friendly, clear interfaces.
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-2 text-sm md:text-[24px] text-neutral-600/80 max-w-[60ch] mx-auto text-center"
          >
            Turning ideas into usable, delightful experiences with clarity,
            motion, and accessibility.
          </motion.p>
        </motion.div>

        {/* Grid 2 kolom */}
        <div className="grid items-start gap-8 md:gap-12 md:grid-cols-12">
          {/* Kiri: foto + sapaan */}
          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="col-span-12 md:col-span-5 space-y-4"
          >
            <motion.div
              variants={item}
              style={{ y: yImg, rotate: rImg }}
              whileHover={{ y: -6, scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative mx-auto w-56 md:w-64 aspect-[4/5] overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
            >
              <img
                src="/assets/mee.gif"
                alt="Eryca — Informatics student and designer"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <motion.div
                className="absolute left-3 top-3 rounded-full bg-neutral-900/85 px-2 py-1 text-[10px] font-medium text-white"
                animate={prefersReduced ? undefined : { y: [0, -2, 0] }}
                transition={
                  prefersReduced
                    ? undefined
                    : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                }
              >
                available
              </motion.div>
            </motion.div>

            <motion.div
              className="relative -mt-2 md:-mt-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* GIF naga: absolute, di kanan-atas, tidak menangkap pointer, z-index rendah */}
              <motion.img
                src="/assets/naga1.gif"
                alt="Wave animation"
                loading="lazy"
                className="absolute top-[-70] right-4 h-40 w-40 object-cover rounded-xl z-0 pointer-events-none"
                animate={prefersReduced ? undefined : { y: [0, -20, 0] }}
                transition={
                  prefersReduced
                    ? undefined
                    : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                }
              />

              {/* teks hey + deskripsi: naikkan z-index dan beri padding top & right agar tidak tertutup GIF */}
              <motion.div
                className="relative z-10 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h3 className="text-2xl md:text-[35px] font-serif leading-tight text-left">
                  Hi there,
                </h3>
                <p className="mt-1 mr-7 text-sm md:text-[15px] text-neutral-700 max-w-xl mx-auto">
                  4th-semester Informatics Engineering student specializing in
                  UI/UX design, front-end development, and digital illustration.
                </p>
              </motion.div>

              {/* kutipan: juga di atas GIF */}
              <motion.blockquote
                className="relative z-10 mt-4 border-l-4 border-neutral-200 pl-4 italic text-[13px] text-neutral-700"
                style={{ y: yQuote }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                “Be the change you wish to see in the world.”
                <span className="block not-italic text-neutral-600 mt-1">
                  — Mahatma Gandhi
                </span>
              </motion.blockquote>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-2 pt-1">
              <motion.a
                whileTap={{ scale: 0.98 }}
                href="/cv/Eryca-Dhamma-Shanty-CV.pdf"
                download="Eryca-Dhamma-Shanty-CV.pdf"
                aria-label="Download CV"
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-[#6f5d33] text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6f5d33]/40 dark:bg-[#bba46b] dark:text-black"
              >
                <ChevronRight className="h-4 w-4 rotate-90" />
                Download CV
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.98 }}
                href={`mailto:${email}`}
                aria-label="Contact via email"
                className="rounded-full border border-neutral-300 px-4 py-2 text-xs md:text-sm text-neutral-800 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
              >
                Contact
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Kanan: CV yang sudah dipisahkan sebagai sub‑komponen */}
          <ResumeCV email={email} skills={skills} experiences={experiences} />
        </div>
      </div>
    </motion.section>
  );
}
