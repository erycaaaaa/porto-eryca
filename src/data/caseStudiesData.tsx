import Link from "next/link";
import React from "react";

/* ===== BASE PATH HELPER ===== */
export const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
export const asset = (p: string) => `${BASE}${p.startsWith("/") ? p : `/${p}`}`;

/* ===== KATEGORI ===== */
export const CATEGORIES = [
  "All",
  "Case Studies",
  "Paper",
  "UI/UX",
  "Front-End",
  "Design",
  "NoteBook",
  "Games",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function normalizeCat(v: string | null): Category {
  if (!v) return "All";
  const cleaned = decodeURIComponent(v).replace(/\+/g, " ").trim();
  const match = CATEGORIES.find(
    (c) => c.toLowerCase() === cleaned.toLowerCase()
  );
  return (match as Category) ?? "All";
}

/* ===== DATA ===== */
export type Item = {
  id: string;
  title: string;
  categories: Exclude<Category, "All">[];
  src: string;
  href?: string;
  alt?: string;
  description: string;
  tag?: string;
};

export const ALL_ITEMS: Item[] = [
  {
    id: "cs-parable",
    title: "Parable Floristry",
    categories: ["Case Studies"],
    src: "/porto-eryca/fajar2.jpg",
    href: "/case-studies/parable-floristry",
    tag: "Brand & Web",
    description:
      "Boutique floristry brand site with crisp UX, motion, and editorial storytelling.",
  },
  {
    id: "cs-tarumanagara",
    title: "Tarumanagara Enterprise",
    categories: ["Case Studies"],
    src: "/porto-eryca/untarx1.jpg",
    href: "/case-studies/tarumanagara-enterprise",
    tag: "UX Strategy",
    description: "Vision-led site with clean information flow and scalable IA.",
  },
  {
    id: "cs-eryca",
    title: "Website Wihara",
    categories: ["Front-End"],
    src: "/porto-eryca/wihara-mini.jpg",
    href: "/case-studies/eryca-portfolio",
    tag: "Design & Front-End",
    description:
      "Personal portfolio yang cepat, jelas, dan crafted—fokus scroll & storytelling.",
  },
  {
    id: "paper-sentiment",
    title: "Sentiment Analysis Paper",
    categories: ["Paper"],
    src: "/porto-eryca/analisa1.jpg",
    href: "/Paper-sentiment",
    tag: "Research & NLP",
    description:
      "Research on sentiment classification using NLP & deep learning pipelines.",
  },
  {
    id: "website-bot",
    title: "EduBot UI/UX Design",
    categories: ["UI/UX"],
    src: "/porto-eryca/edu1.jpg",
    href: "/case-studies/Paper-bot",
    tag: "UI/UX • Chatbot",
    description:
      "Design system & conversational flow for an educational chatbot.",
  },
  {
    id: "paper-bot-edu",
    title: "Perancangan Antarmuka Chatbot",
    categories: ["Paper"],
    src: "/porto-eryca/analisa2.jpg",
    href: "/case-studies/Paper-UI",
    tag: "Research",
    description:
      "Perancangan Antarmuka Chatbot Edukatif untuk Sistem Tanya Jawab SDN Kalideres 13 Petang",
  },
  {
    id: "poster-psikologi",
    title: "Perancangan Poster Psikologi",
    categories: ["Design"],
    src: "/porto-eryca/poster-psikologi.jpg",
    tag: "Design",
    description:
      "Perancangan Poster Psikologi - Peta Jalan Karir di Ekonomi AI",
  },
  {
    id: "poster-DKV",
    title: "Perancangan Poster Event",
    categories: ["Design"],
    src: "/porto-eryca/poster-dkv.jpg",
    tag: "Design",
    description: "Perancangan Poster Event - Animal",
  },
  {
    id: "Front-End-DKV",
    title: "Portfolio Website Me",
    categories: ["Front-End"],
    src: "/porto-eryca/po2.jpg",
    href: "/case-studies/portfolio",
    tag: "Front-End",
    description:
      "Merancang dan membangun website portfolio pribadi menggunakan typeScript, Next.js, dan Tailwind CSS.",
  },
  {
    id: "game-minnie",
    title: "Perancangan Game Unity Minnie Game",
    categories: ["Games"],
    src: "/porto-eryca/min.jpg",
    tag: "Games",
    description:
      "Perancangan Games Unity Minnie Game Mid Semester Mobile Programming.",
  },
];

/* ===== MaybeLink — wrapper Link/div ===== */
export function MaybeLink({
  href,
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  href?: string;
  children: React.ReactNode;
}) {
  if (href) {
    const anchorProps = rest as React.HTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={className} scroll={false} {...anchorProps}>
        {children}
      </Link>
    );
  }
  const divProps = rest as React.HTMLAttributes<HTMLDivElement>;
  return (
    <div className={className} {...divProps}>
      {children}
    </div>
  );
}
