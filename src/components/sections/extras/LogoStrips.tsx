"use client";
import React from "react";
// react-icons
import {
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaBootstrap,
} from "react-icons/fa";
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
  SiFramer,
} from "react-icons/si";

type Props = {
  tools?: string[];
  showLabels?: boolean;
  /** tinggi strip; default 72px (py-6) */
  heightClass?: string; // contoh: "py-5" | "py-4"
  className?: string;
};

const norm = (s: string) => s.trim().toLowerCase();

/** alias → kunci utama */
const ALIASES: Record<string, string> = {
  "next.js": "nextjs",
  nextjs: "nextjs",
  react: "react",
  figma: "figma",
  "framer motion": "framer",
  framer: "framer",
  tailwind: "tailwind",
  "tailwind css": "tailwind",
  typescript: "typescript",
  vite: "vite",
  node: "node",
  "node.js": "node",
  bootstrap: "bootstrap",
  bootsraps: "bootstrap",
  github: "github",
  python: "python",
  html5: "html5",
  css3: "css3",
  dart: "dart",
  "adobe illustrator": "ai",
  "adobe after effects": "ae",
  "google colab": "colab",
};

/** kunci utama → ikon react */
const ICONS: Record<string, React.ReactNode> = {
  nextjs: <SiNextdotjs size={28} title="Next.js" />,
  react: <SiReact size={28} title="React" />,
  figma: <SiFigma size={28} title="Figma" />,
  framer: <SiFramer size={28} title="Framer Motion" />,
  tailwind: <SiTailwindcss size={28} title="Tailwind CSS" />,
  typescript: <SiTypescript size={28} title="TypeScript" />,
  vite: <SiVite size={28} title="Vite" />,
  node: <SiNodedotjs size={28} title="Node.js" />,
  bootstrap: <FaBootstrap size={28} title="Bootstrap" />,
  github: <FaGithub size={28} title="GitHub" />,
  python: <FaPython size={28} title="Python" />,
  html5: <FaHtml5 size={28} title="HTML5" />,
  css3: <FaCss3Alt size={28} title="CSS3" />,
  dart: <SiDart size={28} title="Dart" />,
  ai: <SiAdobeillustrator size={28} title="Adobe Illustrator" />,
  ae: <SiAdobeaftereffects size={28} title="Adobe After Effects" />,
  colab: <SiGooglecolab size={28} title="Google Colab" />,
};

function IconFor({ label }: { label: string }) {
  const key = ALIASES[norm(label)];
  const comp = key ? ICONS[key] : undefined;

  if (comp) return <>{comp}</>;

  // fallback kalau label tidak dikenali
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

  const items = (tools && tools.length > 0 ? tools : defaults).map((t) => ({
    label: t,
  }));

  return (
    <section
      className={[
        "w-full overflow-x-clip bg-gradient-to-r from-[#ffffff4e] via-[#95927573] to-[#ffffff4e]",
        heightClass,
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
            <IconFor label={label} />
            {showLabels && (
              <span className="ml-2 text-xs text-[#f8e6c9]">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
