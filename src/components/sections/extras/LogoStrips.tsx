/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Image from "next/image";

// react-icons fallback
import { FaPython, FaHtml5, FaCss3Alt, FaGithub, FaBootstrap } from "react-icons/fa";
import {
  SiNextdotjs,
  SiFigma,
  SiAdobeillustrator,
  SiAdobeaftereffects,
  SiGooglecolab,
  SiTailwindcss,
  SiDart,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiVite,
} from "react-icons/si";

type Props = {
  tools?: string[];
  showLabels?: boolean;
  /** paksa pakai react-icons dan abaikan SVG lokal */
  preferReactIcons?: boolean;
  /** tinggi strip; default 72px (py-6) */
  heightClass?: string; // contoh: "py-5" | "py-4"
  className?: string;
};

const TOOL_ICON_MAP: Record<string, string> = {
  figma: "/icons/figma.svg",
  "framer motion": "/icons/framer.svg",
  react: "/icons/react.svg",
  "next.js": "/icons/nextjs.svg",
  nextjs: "/icons/nextjs.svg",
  tailwind: "/icons/tailwind.svg",
  "tailwind css": "/icons/tailwind.svg",
  typescript: "/icons/typescript.svg",
  vite: "/icons/vite.svg",
  node: "/icons/node.svg",
  "node.js": "/icons/node.svg",
  bootstrap: "/icons/bootstrap.svg",
  bootsraps: "/icons/bootstrap.svg",
  github: "/icons/github.svg",
  python: "/icons/python.svg",
  html5: "/icons/html5.svg",
  css3: "/icons/css3.svg",
  dart: "/icons/dart.svg",
  "adobe illustrator": "/icons/ai.svg",
  "adobe after effects": "/icons/ae.svg",
  "google colab": "/icons/colab.svg",
};

const ICON_COMPONENT_MAP: Record<string, React.ReactNode> = {
  figma: <SiFigma size={28} title="Figma" />,
  "framer motion": <img src="/icons/framer.svg" alt="Framer Motion" width={28} height={28} />,
  react: <SiReact size={28} title="React" />,
  "next.js": <SiNextdotjs size={28} title="Next.js" />,
  nextjs: <SiNextdotjs size={28} title="Next.js" />,
  tailwind: <SiTailwindcss size={28} title="Tailwind CSS" />,
  "tailwind css": <SiTailwindcss size={28} title="Tailwind CSS" />,
  typescript: <SiTypescript size={28} title="TypeScript" />,
  vite: <SiVite size={28} title="Vite" />,
  node: <SiNodedotjs size={28} title="Node.js" />,
  "node.js": <SiNodedotjs size={28} title="Node.js" />,
  bootstrap: <FaBootstrap size={28} title="Bootstrap" />,
  bootsraps: <FaBootstrap size={28} title="Bootstrap" />,
  github: <FaGithub size={28} title="GitHub" />,
  python: <FaPython size={28} title="Python" />,
  html5: <FaHtml5 size={28} title="HTML5" />,
  css3: <FaCss3Alt size={28} title="CSS3" />,
  dart: <SiDart size={28} title="Dart" />,
  "adobe illustrator": <SiAdobeillustrator size={28} title="Adobe Illustrator" />,
  "adobe after effects": <SiAdobeaftereffects size={28} title="Adobe After Effects" />,
  "google colab": <SiGooglecolab size={28} title="Google Colab" />,
};

const normKey = (s: string) => s.trim().toLowerCase();

function IconFor({ label, preferReactIcons = false }: { label: string; preferReactIcons?: boolean }) {
  const key = normKey(label);

  if (!preferReactIcons) {
    const localSrc = TOOL_ICON_MAP[key];
    if (localSrc) {
      return (
        <Image
          src={localSrc}
          alt={label}
          title={label}
          width={28}
          height={28}
          className="shrink-0"
        />
      );
    }
  }

  const comp = ICON_COMPONENT_MAP[key];
  if (comp) return <>{comp}</>;

  return (
    <span
      title={label}
      aria-label={label}
      className="grid h-7 w-7 place-items-center rounded-full border text-[10px] bg-white/70 text-neutral-700"
    >
      {label.slice(0, 2).toUpperCase()}
    </span>
  );
}

export default function LogoStrip({
  tools,
  showLabels = false,
  preferReactIcons = false,
  heightClass = "py-6",
  className = "",
}: Props) {
  const defaults = [
    "Google Colab",
    "Python",
    "HTML5",
    "CSS3",
    "Next.js",
    "Dart",
    "Figma",
    "Adobe Illustrator",
    "Adobe After Effects",
    "GitHub",
  ];

  const items = (tools && tools.length > 0 ? tools : defaults).map((t) => ({ label: t }));

  return (
    <section
      className={[
        "w-full overflow-x-clip bg-gradient-to-r from-[#ffffff4e] via-[#95927573] to-[#ffffff4e]",
        heightClass, // kontrol tinggi strip
        className,
      ].join(" ")}
      aria-label="Technology strip"
    >
      <ul
        className="
          mx-auto max-w-[100vw] w-full
          flex items-center justify-center gap-8
          whitespace-nowrap
          md:overflow-visible overflow-x-auto
          px-4
          opacity-90
          [filter:grayscale(1)] hover:[filter:grayscale(0)] transition
        "
      >
        {items.map(({ label }) => (
          <li
            key={label}
            className="flex items-center justify-center text-[#f8e6c9] min-w-0"
            aria-label={label}
            title={label}
          >
            <IconFor label={label} preferReactIcons={preferReactIcons} />
            {showLabels && <span className="ml-2 text-xs text-[#f8e6c9]">{label}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
